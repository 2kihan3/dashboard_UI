import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileSpreadsheet,
  Pencil,
  RotateCcw,
  ScrollText,
  Upload,
} from 'lucide-react'
import { type PlatformName, reportDataWithHaoyiku as reportData } from '../data/dailyReport'
import { formatPrecise } from '../lib/metrics'
import * as XLSX from 'xlsx'

type DailyReportStatus = '待发布' | '已发布' | '未发布'
type TaskSource = '定时任务' | '指令' | '人工上传文件' | '人工上传'
type TaskResult = '完成' | '失败'
type DataTab = 'tasks' | 'dailyData'
export type DataCenterView = 'task-records' | 'daily-data'
type LedgerPlatform = Exclude<PlatformName, '总计'> | '抖店' | '得物'
type DataPlatformFilter = '全部' | LedgerPlatform
type DataStoreFilter = '全部' | string

const LIST_PAGE_SIZE = 10

interface DailyTaskRecord {
  id: string
  taskId: string
  fileName: string
  source: TaskSource
  platform: LedgerPlatform
  store: string
  taskDate: string
  businessDate: string
  resultPreview: string
  taskResult: TaskResult
  reportStatus: DailyReportStatus
  taskLog: string
  isUnbound: boolean
  metrics: { gmv: number; platformFee: number; managementFee: number }
  reviewedFields?: Record<string, number>
  reviewNote?: string
  manualEditCount?: number
  peaCost: number // 豌豆消耗
  owner: string // 任务归属人员
  reviewer: string // 审核人
  brandSkuCount?: number // 唯品会产品上新统计表 D 列解析结果
}

interface DailyDataRecord {
  taskId: string
  businessDate: string
  platform: LedgerPlatform
  store: string
  gmv: number
  salesRevenue: number | null
  actualRevenue: number | null
  refundAmount: number | null
  activityDiscount: number | null
  salesCost: number | null
  platformFee: number
  promotionFee: number | null
  shippingFee: number | null
  managementFee: number
  wage: number | null
  rent: number | null
  officeExpense: number | null
  otherExpense: number | null
  financeExpense: number | null
  taxes: number | null
  estimatedCostTax: number | null
  platformRebate: number | null
  netProfit: number | null
  netProfitMargin: number | null
  allocatedNetProfit: number | null
  technicalServiceFee: number | null
  revenueShareCommission: number | null
  platformOtherFee: number | null
  returnShippingFee: number | null
  transitFee: number | null
  consumerCompensation: number | null
  freightInsurance: number | null
  platformServiceFee: number | null
  allianceCommission: number | null
  evaluationReward: number | null
  otherDeduction: number | null
  qianchuanPromotion: number | null
  transactionFee: number | null
  merchantDirect: number | null
  superProductDeduction: number | null
  technicalOperationServiceFee: number | null
  expressInformationServiceFee: number | null
}

type DailyDataMetricKey = Exclude<keyof DailyDataRecord, 'taskId' | 'businessDate' | 'platform' | 'store'>

interface DailyDataField {
  key: DailyDataMetricKey
  label: string
  valueType?: 'amount' | 'ratio'
  sourceField?: string
  category?: string
}

interface ManualUploadRequirement {
  id: string
  label: string
  description: string
  multiple?: boolean
}

interface MockPublishedTaskInput {
  id: string
  taskId: string
  platform: LedgerPlatform
  store: string
  taskDate: string
  businessDate: string
  metrics: DailyTaskRecord['metrics']
  peaCost: number
  owner: string
  reviewer?: string
  source?: TaskSource
  reviewedFields?: Record<string, number>
  manualEditCount?: number
  brandSkuCount?: number
}

function createMockPublishedTask(input: MockPublishedTaskInput): DailyTaskRecord {
  return {
    id: input.id,
    taskId: input.taskId,
    fileName: `${input.platform}-${input.businessDate}-日报结果.json`,
    source: input.source ?? '定时任务',
    platform: input.platform,
    store: input.store,
    taskDate: input.taskDate,
    businessDate: input.businessDate,
    resultPreview: '任务完成',
    taskResult: '完成',
    reportStatus: '已发布',
    taskLog: `${input.taskDate.slice(11, 16)} 完成数据拉取与字段校验；日报已发布。`,
    isUnbound: false,
    metrics: input.metrics,
    reviewedFields: input.reviewedFields,
    manualEditCount: input.manualEditCount,
    peaCost: input.peaCost,
    owner: input.owner,
    reviewer: input.reviewer ?? '王财务',
    brandSkuCount: input.brandSkuCount,
  }
}

const taskColumns = ['任务 ID', '任务来源', '平台', '店铺', '任务日期', '业务日期', '豌豆消耗', '归属人员', '审核人', '结果预览', '任务结果', '日报状态', '修改', '任务日志', '操作项']
const dailyDataFieldsByPlatform: Record<LedgerPlatform, DailyDataField[]> = {
  快手: [
    { key: 'gmv', label: '平台成交GMV', category: '销售' },
    { key: 'technicalServiceFee', label: '技术服务费', category: '平台费用' },
    { key: 'revenueShareCommission', label: '分账佣金', category: '平台费用' },
    { key: 'platformOtherFee', label: '其他费用', category: '平台费用' },
    { key: 'returnShippingFee', label: '退货补运费', category: '平台费用' },
    { key: 'transitFee', label: '集运扣款（中转费）', category: '平台费用' },
    { key: 'consumerCompensation', label: '消费者赔付', category: '平台费用' },
    { key: 'managementFee', label: '后台管理费', category: '管理费用' },
  ],
  抖店: [
    { key: 'gmv', label: '平台成交GMV', category: '销售' },
    { key: 'freightInsurance', label: '运费险', category: '平台费用' },
    { key: 'consumerCompensation', label: '消费者赔付', category: '平台费用' },
    { key: 'platformServiceFee', label: '平台服务费', category: '平台费用' },
    { key: 'allianceCommission', label: '联盟佣金', category: '平台费用' },
    { key: 'evaluationReward', label: '评价有礼', category: '平台费用' },
    { key: 'otherDeduction', label: '其他扣款', category: '平台费用' },
    { key: 'qianchuanPromotion', label: '千川推广', category: '推广费用' },
    { key: 'managementFee', label: '后台管理费', category: '管理费用' },
  ],
  唯品会: [
    { key: 'gmv', label: '平台成交GMV', category: '核心指标' },
    { key: 'activityDiscount', label: '活动折扣', category: '核心指标' },
  ],
  爱库存: [
    { key: 'gmv', label: '平台成交GMV', category: '销售' },
    { key: 'activityDiscount', label: '营销活动优惠', sourceField: '营销活动优惠', category: '销售' },
    { key: 'transactionFee', label: '交易手续费', category: '平台费用' },
    { key: 'freightInsurance', label: '运费险', category: '平台费用' },
    { key: 'consumerCompensation', label: '消费者赔付', category: '平台费用' },
    { key: 'merchantDirect', label: '商家直客', category: '平台费用' },
    { key: 'superProductDeduction', label: '超品扣点费', category: '平台费用' },
    { key: 'otherDeduction', label: '其他扣费', category: '平台费用' },
    { key: 'managementFee', label: '后台管理费', category: '管理费用' },
  ],
  好衣库: [
    { key: 'gmv', label: '平台成交GMV', category: '销售' },
    { key: 'technicalOperationServiceFee', label: '技术运营服务费', category: '平台费用' },
    { key: 'expressInformationServiceFee', label: '快递信息服务费', category: '平台费用' },
  ],
  得物: [
    { key: 'gmv', label: '平台成交GMV' }, { key: 'salesRevenue', label: '销售收入' }, { key: 'refundAmount', label: '退货金额' },
    { key: 'platformFee', label: '平台费用' }, { key: 'promotionFee', label: '推广费' }, { key: 'shippingFee', label: '运费' },
    { key: 'netProfit', label: '净利润' }, { key: 'netProfitMargin', label: '净利润率', valueType: 'ratio' },
  ],
}

const seedTaskRows: DailyTaskRecord[] = [
  {
    id: 'task-1',
    taskId: '20260714KSGFGJ001',
    fileName: '快手日报自动化结果.json',
    source: '定时任务',
    platform: '快手',
    store: '官方旗舰店',
    taskDate: '2026-07-14 08:05:14',
    businessDate: '2026-07-13',
    resultPreview: '任务完成',
    taskResult: '完成',
    reportStatus: '待发布',
    taskLog: '08:05 拉取快手日报；08:06 完成字段校验；08:05:14 任务结束。',
    isUnbound: false,
    metrics: { gmv: 12722.86, platformFee: 1658.79, managementFee: 116.76 },
    peaCost: 320,
    owner: '李运营',
    reviewer: '张管理员',
  },
  {
    id: 'task-2',
    taskId: '20260714AKJBSP001',
    fileName: '爱库存日报自动化结果.json',
    source: '定时任务',
    platform: '爱库存',
    store: '京倍店铺',
    taskDate: '2026-07-14 08:11:27',
    businessDate: '2026-07-13',
    resultPreview: '任务完成',
    taskResult: '完成',
    reportStatus: '待发布',
    taskLog: '08:11 拉取爱库存费用数据；品牌推广费为空，等待人工复核。',
    isUnbound: false,
    metrics: { gmv: 5519.9, platformFee: 573.06, managementFee: 0 },
    reviewedFields: { '平台成交GMV': 5500 },
    reviewNote: '已按人工复核结果修正 GMV。',
    manualEditCount: 1,
    peaCost: 280,
    owner: '陈分析',
    reviewer: '',
  },
  {
    id: 'task-3',
    taskId: '20260714WPPPJH001',
    fileName: '--',
    source: '人工上传',
    platform: '唯品会',
    store: '品牌集合店',
    taskDate: '2026-07-14 08:18:42',
    businessDate: '2026-07-13',
    resultPreview: '--',
    taskResult: '失败',
    reportStatus: '未发布',
    taskLog: '等待上传前一天更新的产品上新统计表（仅解析 D 列品牌款号）。',
    isUnbound: false,
    metrics: { gmv: 0, platformFee: 0, managementFee: 0 },
    peaCost: 0,
    owner: '系统',
    reviewer: '',
  },
  {
    id: 'task-4',
    taskId: '20260714DYDYSP001',
    fileName: '--',
    source: '定时任务',
    platform: '抖店',
    store: '抖店旗舰店',
    taskDate: '2026-07-14 08:24:08',
    businessDate: '2026-07-13',
    resultPreview: '--',
    taskResult: '失败',
    reportStatus: '未发布',
    taskLog: '08:24 调用抖店任务失败：授权令牌失效。',
    isUnbound: false,
    metrics: { gmv: 0, platformFee: 0, managementFee: 0 },
    peaCost: 80,
    owner: '李运营',
    reviewer: '',
  },
  {
    id: 'task-5',
    taskId: '20260714HYKSP001',
    fileName: '好衣库日报自动化结果.json',
    source: '定时任务',
    platform: '好衣库',
    store: '好衣库店铺',
    taskDate: '2026-07-14 08:30:15',
    businessDate: '2026-07-13',
    resultPreview: '任务完成',
    taskResult: '完成',
    reportStatus: '待发布',
    taskLog: '08:30 拉取好衣库日报；08:31 完成字段校验；08:30:15 任务结束。',
    isUnbound: false,
    metrics: { gmv: 13680.5, platformFee: 1820.3, managementFee: 0 },
    reviewedFields: { '平台成交GMV': 13700 },
    reviewNote: '已完成两次人工修正。',
    manualEditCount: 2,
    peaCost: 360,
    owner: '张管理员',
    reviewer: '王财务',
  },
  createMockPublishedTask({
    id: 'task-6', taskId: '20260713KSGFGJ001', platform: '快手', store: '官方旗舰店',
    taskDate: '2026-07-13 08:04:18', businessDate: '2026-07-12',
    metrics: { gmv: 14286.34, platformFee: 1708.52, managementFee: 124.8 }, peaCost: 326, owner: '李运营', reviewer: '张管理员',
  }),
  createMockPublishedTask({
    id: 'task-7', taskId: '20260712KSGFGJ001', platform: '快手', store: '官方旗舰店',
    taskDate: '2026-07-12 08:05:02', businessDate: '2026-07-11',
    metrics: { gmv: 11968.2, platformFee: 1492.16, managementFee: 110.2 }, peaCost: 312, owner: '李运营', reviewer: '张管理员',
  }),
  createMockPublishedTask({
    id: 'task-8', taskId: '20260713AKJBSP001', platform: '爱库存', store: '京倍店铺',
    taskDate: '2026-07-13 08:10:36', businessDate: '2026-07-12',
    metrics: { gmv: 6180.56, platformFee: 642.33, managementFee: 76.5 }, peaCost: 288, owner: '陈分析', reviewer: '王财务',
  }),
  createMockPublishedTask({
    id: 'task-9', taskId: '20260712AKJBSP001', platform: '爱库存', store: '京倍店铺',
    taskDate: '2026-07-12 08:10:58', businessDate: '2026-07-11',
    metrics: { gmv: 5746.8, platformFee: 598.94, managementFee: 72.1 }, peaCost: 276, owner: '陈分析', reviewer: '王财务',
  }),
  createMockPublishedTask({
    id: 'task-10', taskId: '20260713WPPPJH001', platform: '唯品会', store: '品牌集合店',
    taskDate: '2026-07-13 08:18:42', businessDate: '2026-07-12', source: '人工上传',
    metrics: { gmv: 21840.75, platformFee: 0, managementFee: 0 }, peaCost: 90, owner: '周运营', reviewer: '王财务', brandSkuCount: 186,
  }),
  createMockPublishedTask({
    id: 'task-11', taskId: '20260712WPPPJH001', platform: '唯品会', store: '品牌集合店',
    taskDate: '2026-07-12 08:18:10', businessDate: '2026-07-11', source: '人工上传',
    metrics: { gmv: 19562.3, platformFee: 0, managementFee: 0 }, peaCost: 86, owner: '周运营', reviewer: '王财务', brandSkuCount: 172,
  }),
  createMockPublishedTask({
    id: 'task-12', taskId: '20260711WPPPJH001', platform: '唯品会', store: '品牌集合店',
    taskDate: '2026-07-11 08:19:05', businessDate: '2026-07-10', source: '人工上传',
    metrics: { gmv: 18420.68, platformFee: 0, managementFee: 0 }, peaCost: 84, owner: '周运营', reviewer: '王财务', brandSkuCount: 161,
  }),
  createMockPublishedTask({
    id: 'task-13', taskId: '20260713HYHYKS001', platform: '好衣库', store: '好衣库店铺',
    taskDate: '2026-07-13 08:30:21', businessDate: '2026-07-12',
    metrics: { gmv: 15482.6, platformFee: 2014.3, managementFee: 0 }, peaCost: 368, owner: '张管理员', reviewer: '王财务',
  }),
  createMockPublishedTask({
    id: 'task-14', taskId: '20260712HYHYKS001', platform: '好衣库', store: '好衣库店铺',
    taskDate: '2026-07-12 08:30:08', businessDate: '2026-07-11',
    metrics: { gmv: 14876.4, platformFee: 1938.8, managementFee: 0 }, peaCost: 354, owner: '张管理员', reviewer: '王财务',
  }),
  createMockPublishedTask({
    id: 'task-15', taskId: '20260713DYDYSP001', platform: '抖店', store: '抖店旗舰店',
    taskDate: '2026-07-13 08:24:40', businessDate: '2026-07-12',
    metrics: { gmv: 9820.44, platformFee: 1408.3, managementFee: 108 }, peaCost: 302, owner: '李运营', reviewer: '王财务', manualEditCount: 1,
    reviewedFields: { '平台成交GMV': 9820.44, '运费险': 182.4, '消费者赔付': 35, '平台服务费': 442.1, '联盟佣金': 617.8, '评价有礼': 86, '其他扣款': 45, '千川推广': 880, '后台管理费': 108 },
  }),
  createMockPublishedTask({
    id: 'task-16', taskId: '20260713DWDWSP001', platform: '得物', store: '得物店铺',
    taskDate: '2026-07-13 08:36:14', businessDate: '2026-07-12',
    metrics: { gmv: 7640, platformFee: 322, managementFee: 0 }, peaCost: 196, owner: '赵运营', reviewer: '王财务', manualEditCount: 1,
    reviewedFields: { '平台成交GMV': 7640, '销售收入': 7060, '退货金额': 120, '平台费用': 322, '推广费': 470, '运费': 88, '净利润': 1110, '净利润率': 0.145 },
  }),
]

const ledgerPlatforms: LedgerPlatform[] = ['快手', '抖店', '唯品会', '爱库存', '好衣库', '得物']
const manualUploadRequirements: Record<LedgerPlatform, ManualUploadRequirement[]> = {
  快手: [
    { id: 'kuaishou-bill-detail', label: '账单明细表', description: '请上传与当前业务日期一致的账单明细。' },
    { id: 'kuaishou-settlement-detail', label: '结算明细表', description: '请上传与当前业务日期一致的结算明细。' },
  ],
  好衣库: [{ id: 'haoyiku-payment-daily', label: '好衣库货款日明细表', description: '请上传当前业务日期对应的货款日明细。' }],
  抖店: [{ id: 'douyin-fund-daily-summary', label: '资金账单日汇总报表', description: '请上传当前业务日期对应的资金账单日汇总。' }],
  爱库存: [{ id: 'aikucun-daily-template', label: '爱库存店铺日报模板表', description: '请上传当前业务日期对应的店铺日报模板。' }],
  唯品会: [
    { id: 'vip-product-new', label: '产品上新统计表', description: '上传每日最新版本，系统将读取 D 列品牌款号。' },
    { id: 'vip-product-detail', label: '商品明细-货号力度-跨天不去重', description: '支持上传多个明细表，至少需要一份有效文件。', multiple: true },
  ],
  得物: [{ id: 'dewu-daily-report', label: '得物店铺日报表', description: '请上传当前业务日期对应的日报表。' }],
}

function uniqueValues(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)))
}

function dateMinusOne() {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString().slice(0, 10)
}

function dateMinusDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`)
  date.setDate(date.getDate() - days)
  return date.toISOString().slice(0, 10)
}

function datePlusDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

function canDownloadSourceTable(task: DailyTaskRecord) {
  return task.taskResult === '完成' && task.source !== '人工上传文件' && !task.isUnbound
}

function sourceTableFileName(task: DailyTaskRecord) {
  return `${task.platform}-${task.store}-${task.businessDate}-源表.xlsx`
}

function platformAbbreviation(platform: LedgerPlatform) {
  return { 快手: 'KS', 抖店: 'DY', 唯品会: 'WP', 爱库存: 'AK', 好衣库: 'HY', 得物: 'DW' }[platform]
}

function storeAbbreviation(store: string) {
  const known: Record<string, string> = { 官方旗舰店: 'GFGJ', 京倍店铺: 'JBSP', 万顷店铺: 'WQSP', 品牌集合店: 'PPJH', 抖店旗舰店: 'DYSP', 好衣库店铺: 'HYKS', 得物店铺: 'DWSP' }
  return known[store] ?? store.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 4).padEnd(4, 'X')
}

function makeTaskId(platform: LedgerPlatform, store: string, records: DailyTaskRecord[], taskDate = new Date()) {
  const date = taskDate.toISOString().slice(0, 10).replaceAll('-', '')
  const prefix = `${date}${platformAbbreviation(platform)}${storeAbbreviation(store)}`
  const sequence = records.filter((record) => record.platform === platform && record.store === store).length + 1
  return `${prefix}${String(sequence).padStart(3, '0')}`
}

function scaleMockFieldValues(values: Record<string, number> | undefined, factor: number) {
  if (!values) return undefined
  return Object.fromEntries(Object.entries(values).map(([field, value]) => [
    field,
    field === '净利润率' ? value : Math.round(value * factor * 100) / 100,
  ]))
}

function extendPublishedTaskRows(seedRows: DailyTaskRecord[]) {
  const targetDates = ['2026-07-12', '2026-07-11', '2026-07-10', '2026-07-09', '2026-07-08', '2026-07-07', '2026-07-06', '2026-07-05', '2026-07-04', '2026-07-03']
  const publishedGroups = Array.from(new Map(
    seedRows
      .filter((task) => task.reportStatus === '已发布')
      .map((task) => [`${task.platform}::${task.store}`, task]),
  ).values())
  const generated: DailyTaskRecord[] = []

  publishedGroups.forEach((template) => {
    const existingDates = new Set(seedRows
      .filter((task) => task.reportStatus === '已发布' && task.platform === template.platform && task.store === template.store)
      .map((task) => task.businessDate))

    targetDates.filter((date) => !existingDates.has(date)).forEach((businessDate, index) => {
      const factor = 0.84 + ((index * 7 + template.platform.length) % 15) / 100
      const taskDate = `${datePlusDays(businessDate, 1)} ${String(8 + (index % 2)).padStart(2, '0')}:${String(4 + index).padStart(2, '0')}:20`
      const taskId = `${businessDate.replaceAll('-', '')}${platformAbbreviation(template.platform)}${storeAbbreviation(template.store)}9${String(index + 1).padStart(2, '0')}`
      generated.push(createMockPublishedTask({
        id: `task-seed-${template.platform}-${template.store}-${businessDate}`,
        taskId,
        platform: template.platform,
        store: template.store,
        taskDate,
        businessDate,
        source: template.source,
        metrics: {
          gmv: Math.round(template.metrics.gmv * factor * 100) / 100,
          platformFee: Math.round(template.metrics.platformFee * factor * 100) / 100,
          managementFee: Math.round(template.metrics.managementFee * factor * 100) / 100,
        },
        peaCost: Math.max(0, Math.round(template.peaCost * factor)),
        owner: template.owner,
        reviewer: template.reviewer,
        reviewedFields: scaleMockFieldValues(template.reviewedFields, factor),
        manualEditCount: template.manualEditCount,
        brandSkuCount: template.brandSkuCount ? Math.round(template.brandSkuCount * factor) : undefined,
      }))
    })
  })

  return [...seedRows, ...generated]
}

const taskRows = extendPublishedTaskRows(seedTaskRows)

// 任务预览与日报数据共用同一份平台字段配置，避免一个页面展示明细、另一个页面展示合计。
function getPlatformPreviewFields(platform: LedgerPlatform) {
  return dailyDataFieldsByPlatform[platform]
}

interface TaskPreviewField {
  field: string
  valueType: 'amount' | 'ratio'
  originalValue: number
  modifiedValue?: number
}

interface TaskPreviewGroup {
  category: string
  fields: TaskPreviewField[]
}

function taskPreviewGroups(task: DailyTaskRecord): TaskPreviewGroup[] {
  const report = reportData.find((item) => item.platform === task.platform)
  const dateIndex = report ? (() => {
    const matchedIndex = report.dates.findIndex((point) => point.date === task.businessDate)
    return matchedIndex >= 0 ? matchedIndex : Math.min(1, report.dates.length - 1)
  })() : -1
  const configuredFields = getPlatformPreviewFields(task.platform)
  const categoryOrder = ['核心指标', '销售', '平台费用', '推广费用', '管理费用']
  const groupMap = new Map<string, TaskPreviewField[]>()

  configuredFields.forEach((field) => {
    const sourceField = field.sourceField ?? field.label
    const row = report?.rows.find((reportRow) => reportRow.field === sourceField)
    const category = field.category ?? row?.category ?? '核心指标'
    const originalValue = row
      ? (sourceField === '平台成交GMV'
          ? task.metrics.gmv
          : sourceField === '后台管理费'
              ? task.metrics.managementFee
              : row.daily[dateIndex]?.value ?? 0)
      : field.key === 'gmv' ? task.metrics.gmv : field.key === 'managementFee' ? task.metrics.managementFee : 0
    const fieldType = row?.valueType ?? 'amount'

    if (!groupMap.has(category)) groupMap.set(category, [])
    groupMap.get(category)!.push({
      field: field.label,
      valueType: fieldType,
      originalValue,
      modifiedValue: task.reviewedFields?.[field.label],
    })
  })

  return Array.from(groupMap.entries())
    .sort((a, b) => {
      const ai = categoryOrder.indexOf(a[0])
      const bi = categoryOrder.indexOf(b[0])
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
    })
    .map(([category, fields]) => ({ category, fields }))
}

function taskFieldValues(task: DailyTaskRecord) {
  return Object.fromEntries(taskPreviewGroups({ ...task, reviewedFields: undefined }).flatMap((group) => group.fields.map((field) => [field.field, field.originalValue])))
}

function reportFieldValue(task: DailyTaskRecord, fieldName: string) {
  const reviewedValue = task.reviewedFields?.[fieldName]
  if (reviewedValue !== undefined) return reviewedValue

  const report = reportData.find((item) => item.platform === task.platform)
  const dateIndex = report?.dates.findIndex((point) => point.date === task.businessDate) ?? -1
  if (!report || dateIndex < 0) return null
  return report.rows.find((row) => row.field === fieldName)?.daily[dateIndex]?.value ?? null
}

function metricsForPublish(task: DailyTaskRecord) {
  const gmv = task.reviewedFields?.['平台成交GMV'] ?? task.metrics.gmv
  const platformFeeTotal = task.reviewedFields?.['平台费用合计']
  const managementFee = task.reviewedFields?.['后台管理费'] ?? task.reviewedFields?.['管理费用合计'] ?? task.metrics.managementFee
  // platformFee 仅为得物保留的兼容字段；其他平台写入各自的费用明细，不再由前端汇总。
  const platformFee = task.platform === '得物' ? platformFeeTotal ?? task.metrics.platformFee : 0

  return {
    gmv,
    salesRevenue: reportFieldValue(task, '销售收入'),
    actualRevenue: reportFieldValue(task, '实发收入'),
    refundAmount: reportFieldValue(task, '退货金额'),
    activityDiscount: reportFieldValue(task, task.platform === '爱库存' ? '营销活动优惠' : '活动折扣'),
    salesCost: reportFieldValue(task, '销售成本'),
    platformFee,
    promotionFee: reportFieldValue(task, '推广费'),
    shippingFee: reportFieldValue(task, '运费'),
    managementFee,
    wage: reportFieldValue(task, '工资'),
    rent: reportFieldValue(task, '房租'),
    officeExpense: reportFieldValue(task, '办公费用'),
    otherExpense: reportFieldValue(task, '其他费用支出'),
    financeExpense: reportFieldValue(task, '财务费用'),
    taxes: reportFieldValue(task, '税金及附加'),
    estimatedCostTax: reportFieldValue(task, '预估成本税（6.5%）'),
    platformRebate: reportFieldValue(task, '平台返点及优惠券'),
    netProfit: reportFieldValue(task, '净利润'),
    netProfitMargin: reportFieldValue(task, '净利润率'),
    allocatedNetProfit: reportFieldValue(task, '公摊后净利润'),
    technicalServiceFee: reportFieldValue(task, '技术服务费'),
    revenueShareCommission: reportFieldValue(task, '分账佣金'),
    platformOtherFee: reportFieldValue(task, '其他费用'),
    returnShippingFee: reportFieldValue(task, '退货补运费'),
    transitFee: reportFieldValue(task, '集运扣款（中转费）'),
    consumerCompensation: reportFieldValue(task, '消费者赔付'),
    freightInsurance: reportFieldValue(task, '运费险'),
    platformServiceFee: reportFieldValue(task, '平台服务费'),
    allianceCommission: reportFieldValue(task, '联盟佣金'),
    evaluationReward: reportFieldValue(task, '评价有礼'),
    otherDeduction: reportFieldValue(task, task.platform === '爱库存' ? '其他扣费' : '其他扣款'),
    qianchuanPromotion: reportFieldValue(task, '千川推广'),
    transactionFee: reportFieldValue(task, '交易手续费'),
    merchantDirect: reportFieldValue(task, '商家直客'),
    superProductDeduction: reportFieldValue(task, '超品扣点费'),
    technicalOperationServiceFee: reportFieldValue(task, '技术运营服务费'),
    expressInformationServiceFee: reportFieldValue(task, '快递信息服务费'),
  }
}

// 演示数据只从“已发布”任务生成，任务 ID、平台、店铺和业务日期均可一一回查。
const initialDailyData: DailyDataRecord[] = taskRows
  .filter((task) => task.reportStatus === '已发布')
  .map((task) => ({
    taskId: task.taskId,
    businessDate: task.businessDate,
    platform: task.platform,
    store: task.store,
    ...metricsForPublish(task),
  }))

function formatDailyDataValue(value: number | null, valueType: 'amount' | 'ratio' = 'amount') {
  return value === null ? '—' : formatPrecise(value, valueType)
}

function TaskPreviewDialog({ task, onClose, onEdit }: { task: DailyTaskRecord; onClose: () => void; onEdit: (task: DailyTaskRecord) => void }) {
  const groups = taskPreviewGroups(task)
  const canEdit = task.taskResult === '完成' && task.reportStatus !== '已发布' && !task.isUnbound
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="ledger-dialog task-preview-dialog">
        <header><div><span className="eyebrow">task_preview</span><h3>任务结果预览</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={onClose}>×</button></header>
        <div className="task-preview-grid"><span>任务 ID</span><strong>{task.taskId}</strong><span>平台 / 店铺</span><strong>{task.platform} · {task.store}</strong><span>业务日期</span><strong>{task.businessDate}</strong></div>
        <p className="task-preview-note">按平台字段展示任务结果；费用字段保持明细，不汇总为单一平台管理费。</p>
        {groups.length ? <div className="task-detail-groups">{groups.map((group) => <section key={group.category}><h4>{group.category}</h4><div>{group.fields.map((field) => <p key={field.field} className={field.modifiedValue === undefined ? '' : 'is-modified'}><span>{field.field}</span><strong>{formatPrecise(field.originalValue, field.valueType)}</strong>{field.modifiedValue === undefined ? null : <strong className="task-field-modified">{formatPrecise(field.modifiedValue, field.valueType)}</strong>}</p>)}</div></section>)}</div> : <div className="task-detail-empty">该平台暂未配置日报字段映射。</div>}
        {task.reviewedFields && Object.keys(task.reviewedFields).length ? <p className="task-preview-revision">已保存修正字段。字段顺序为“字段名称 / 原始数据 / 修改数据”，原始任务结果和日志保持不变。</p> : null}
        <footer className="task-preview-actions">
          <span className={`task-preview-edit-control ${canEdit ? '' : 'is-disabled'}`}>
            <button className="secondary-action" type="button" disabled={!canEdit} onClick={() => onEdit(task)}><Pencil aria-hidden="true" />修改</button>
            {!canEdit ? <span className="task-preview-edit-tooltip" role="tooltip">当前状态无法对本条数据进行修改！</span> : null}
          </span>
        </footer>
      </section>
    </div>
  )
}

function DailyDataDetailDialog({
  rows,
  fields,
  platform,
  store,
  startDate,
  endDate,
  onClose,
}: {
  rows: DailyDataRecord[]
  fields: DailyDataField[]
  platform: LedgerPlatform
  store: string
  startDate: string
  endDate: string
  onClose: () => void
}) {
  const dateRange = startDate && endDate ? `${startDate} 至 ${endDate}` : startDate || endDate || '全部已发布日期'

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="ledger-dialog daily-data-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="daily-data-detail-title">
        <header>
          <div>
            <span className="eyebrow">daily_data_detail</span>
            <h3 id="daily-data-detail-title">日报数据明细</h3>
          </div>
          <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={onClose}>×</button>
        </header>
        <div className="daily-data-detail-dialog__meta">
          <span>平台：{platform}</span>
          <span>店铺：{store}</span>
          <span>业务日期：{dateRange}</span>
          <span>共 {rows.length} 条</span>
        </div>
        <div className="daily-data-detail-dialog__table-wrap">
          <div className="table-scroll">
            <table className="daily-data-detail-dialog__table">
              <thead>
                <tr>
                  <th>业务日期</th>
                  {fields.map((field) => <th key={field.key}>{field.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.length ? rows.map((row) => (
                  <tr key={row.taskId}>
                    <td>{row.businessDate}</td>
                    {fields.map((field) => <td key={field.key}>{formatDailyDataValue(row[field.key], field.valueType)}</td>)}
                  </tr>
                )) : <tr><td className="daily-data-detail-dialog__empty" colSpan={fields.length + 1}>当前筛选条件下暂无已发布日报数据。</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        <footer>
          <button className="primary-action" type="button" onClick={onClose}>关闭</button>
        </footer>
      </section>
    </div>
  )
}

function ListPagination({
  currentPage,
  totalItems,
  onPageChange,
  label,
}: {
  currentPage: number
  totalItems: number
  onPageChange: (page: number) => void
  label: string
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / LIST_PAGE_SIZE))
  const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
  const endPage = Math.min(totalPages, startPage + 4)
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)

  return (
    <nav className="ledger-pagination" aria-label={`${label}分页`}>
      <span className="ledger-pagination__summary">共 {totalItems} 条，每页 {LIST_PAGE_SIZE} 条</span>
      <div className="ledger-pagination__controls">
        <button type="button" className="ledger-pagination__arrow" aria-label="上一页" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft aria-hidden="true" />
        </button>
        {pageNumbers.map((page) => (
          <button key={page} type="button" className={page === currentPage ? 'active' : ''} aria-current={page === currentPage ? 'page' : undefined} onClick={() => onPageChange(page)}>
            {page}
          </button>
        ))}
        <button type="button" className="ledger-pagination__arrow" aria-label="下一页" disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </nav>
  )
}

export default function TasksPage({ view = 'task-records' }: { view?: DataCenterView }) {
  const [tasks, setTasks] = useState<DailyTaskRecord[]>(taskRows)
  const [dailyData, setDailyData] = useState<DailyDataRecord[]>(() => initialDailyData)
  const dataTab: DataTab = view === 'daily-data' ? 'dailyData' : 'tasks'
  const [taskPlatform, setTaskPlatform] = useState<DataPlatformFilter>('全部')
  const [taskStore, setTaskStore] = useState<DataStoreFilter>('全部')
  const [taskStartDate, setTaskStartDate] = useState('')
  const [taskEndDate, setTaskEndDate] = useState(dateMinusOne())
  const [taskSourceFilter, setTaskSourceFilter] = useState<'全部' | TaskSource>('全部')
  const [taskOwnerFilter, setTaskOwnerFilter] = useState('全部')
  const [taskReviewerFilter, setTaskReviewerFilter] = useState('全部')
  const [taskResultFilter, setTaskResultFilter] = useState<'全部' | TaskResult>('全部')
  const [taskStatusFilter, setTaskStatusFilter] = useState<'全部' | DailyReportStatus>('全部')
  const [dailyPlatform, setDailyPlatform] = useState<LedgerPlatform>('唯品会')
  const [dailyStore, setDailyStore] = useState('品牌集合店')
  const [dailyStartDate, setDailyStartDate] = useState('')
  const [dailyEndDate, setDailyEndDate] = useState(dateMinusOne())
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [manualUploadStep, setManualUploadStep] = useState<'template' | 'upload'>('template')
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [templatePlatform, setTemplatePlatform] = useState<LedgerPlatform>('快手')
  const [batchSourceDialogOpen, setBatchSourceDialogOpen] = useState(false)
  const [batchSourcePlatform, setBatchSourcePlatform] = useState<LedgerPlatform>('快手')
  const [batchSourceStore, setBatchSourceStore] = useState('')
  const [batchSourceStartDate, setBatchSourceStartDate] = useState('')
  const [batchSourceEndDate, setBatchSourceEndDate] = useState('')
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [previewTask, setPreviewTask] = useState<DailyTaskRecord | null>(null)
  const [dailyDetailDialogOpen, setDailyDetailDialogOpen] = useState(false)
  const [logTask, setLogTask] = useState<DailyTaskRecord | null>(null)
  const [reviewingTaskId, setReviewingTaskId] = useState<string | null>(null)
  const [taskPage, setTaskPage] = useState(1)
  const [dailyDataPage, setDailyDataPage] = useState(1)
  const [manualUploadFiles, setManualUploadFiles] = useState<Record<string, File[]>>({})
  const [uploadStoreName, setUploadStoreName] = useState('')
  const [uploadPlatformName, setUploadPlatformName] = useState<LedgerPlatform>('快手')
  const [uploadTargetTaskId, setUploadTargetTaskId] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState('')
  const [reviewNote, setReviewNote] = useState('')
  const [reviewFields, setReviewFields] = useState<Record<string, number>>({})
  const [ledgerNotice, setLedgerNotice] = useState('')
  const [createMode, setCreateMode] = useState<'auto' | null>(null)
  const [autoPlatform, setAutoPlatform] = useState<LedgerPlatform>('快手')
  const [autoStore, setAutoStore] = useState('')
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false)
  const [downloadPlatform, setDownloadPlatform] = useState<DataPlatformFilter>('全部')
  const [downloadStore, setDownloadStore] = useState<DataStoreFilter>('全部')
  const [downloadStartDate, setDownloadStartDate] = useState('')
  const [downloadEndDate, setDownloadEndDate] = useState(dateMinusOne())
  const [editingDailyData, setEditingDailyData] = useState<DailyDataRecord | null>(null)
  const [dailyFillValues, setDailyFillValues] = useState<Partial<Record<DailyDataMetricKey, string>>>({})

  useEffect(() => {
    setTaskPage(1)
  }, [taskPlatform, taskStore, taskStartDate, taskEndDate, taskSourceFilter, taskOwnerFilter, taskReviewerFilter, taskResultFilter, taskStatusFilter])

  useEffect(() => {
    setDailyDataPage(1)
  }, [dailyPlatform, dailyStore, dailyStartDate, dailyEndDate])

  const taskStoreOptions = uniqueValues(tasks.filter((task) => taskPlatform === '全部' || task.platform === taskPlatform).map((task) => task.store))
  const taskOwners = uniqueValues(tasks.map((task) => task.owner))
  const taskReviewers = uniqueValues(tasks.map((task) => task.reviewer))
  const dailyStoreOptions = uniqueValues(dailyData.filter((row) => row.platform === dailyPlatform).map((row) => row.store))
  const downloadStoreOptions = uniqueValues(dailyData.filter((row) => downloadPlatform === '全部' || row.platform === downloadPlatform).map((row) => row.store))
  const batchSourceStoreOptions = uniqueValues(tasks.filter((task) => canDownloadSourceTable(task) && task.platform === batchSourcePlatform).map((task) => task.store))
  const batchSourceCandidates = tasks
    .filter((task) => canDownloadSourceTable(task) && task.platform === batchSourcePlatform && task.store === batchSourceStore)
    .sort((left, right) => right.businessDate.localeCompare(left.businessDate))
  const defaultBatchSourceEndDate = batchSourceCandidates[0]?.businessDate ?? ''
  const resolvedBatchSourceEndDate = batchSourceEndDate || (batchSourceStartDate ? datePlusDays(batchSourceStartDate, 9) : defaultBatchSourceEndDate)
  const resolvedBatchSourceStartDate = batchSourceStartDate || (resolvedBatchSourceEndDate ? dateMinusDays(resolvedBatchSourceEndDate, 9) : '')
  const batchSourceRangeError = Boolean(batchSourceStartDate && batchSourceEndDate && batchSourceStartDate < dateMinusDays(batchSourceEndDate, 9))
  const batchSourceRecords = batchSourceCandidates
    .filter((task) => !resolvedBatchSourceStartDate || !resolvedBatchSourceEndDate || (task.businessDate >= resolvedBatchSourceStartDate && task.businessDate <= resolvedBatchSourceEndDate))
    .slice(0, 10)
  const uploadTargetTask = tasks.find((task) => task.taskId === uploadTargetTaskId) ?? null
  const uploadRequirements = manualUploadRequirements[uploadPlatformName]
  const isManualUploadComplete = uploadRequirements.every((requirement) => (manualUploadFiles[requirement.id] ?? []).length > 0)

  // 报告统计
  const totalTaskCount = tasks.length
  const unpublishedCount = tasks.filter((task) => task.reportStatus === '待发布' || task.reportStatus === '未发布').length
  const failureCount = tasks.filter((task) => task.taskResult === '失败').length
  const manualUploadCount = tasks.filter((task) => task.source === '人工上传文件' || task.source === '人工上传').length
  const manualEditCount = tasks.reduce((sum, task) => sum + (task.manualEditCount ?? 0), 0)
  const totalPeaCost = tasks.reduce((sum, t) => sum + t.peaCost, 0)
  const visibleTasks = tasks
    .filter((task) => (taskPlatform === '全部' || task.platform === taskPlatform) && (taskStore === '全部' || task.store === taskStore))
    .filter((task) => !taskStartDate || task.taskDate.slice(0, 10) >= taskStartDate)
    .filter((task) => !taskEndDate || task.taskDate.slice(0, 10) <= taskEndDate)
    .filter((task) => taskSourceFilter === '全部' || task.source === taskSourceFilter)
    .filter((task) => taskOwnerFilter === '全部' || task.owner === taskOwnerFilter)
    .filter((task) => taskReviewerFilter === '全部' || task.reviewer === taskReviewerFilter)
    .filter((task) => taskResultFilter === '全部' || task.taskResult === taskResultFilter)
    .filter((task) => taskStatusFilter === '全部' || task.reportStatus === taskStatusFilter)
    .sort((left, right) => right.taskDate.localeCompare(left.taskDate))
  const visibleDailyData = dailyData
    .filter((row) => row.platform === dailyPlatform && row.store === dailyStore)
    .filter((row) => !dailyStartDate || row.businessDate >= dailyStartDate)
    .filter((row) => !dailyEndDate || row.businessDate <= dailyEndDate)
    .sort((left, right) => right.businessDate.localeCompare(left.businessDate))
  const taskTotalPages = Math.max(1, Math.ceil(visibleTasks.length / LIST_PAGE_SIZE))
  const dailyDataTotalPages = Math.max(1, Math.ceil(visibleDailyData.length / LIST_PAGE_SIZE))
  const currentTaskPage = Math.min(taskPage, taskTotalPages)
  const currentDailyDataPage = Math.min(dailyDataPage, dailyDataTotalPages)
  const pagedTasks = visibleTasks.slice((currentTaskPage - 1) * LIST_PAGE_SIZE, currentTaskPage * LIST_PAGE_SIZE)
  const pagedDailyData = visibleDailyData.slice((currentDailyDataPage - 1) * LIST_PAGE_SIZE, currentDailyDataPage * LIST_PAGE_SIZE)
  const reviewingTask = tasks.find((task) => task.taskId === reviewingTaskId) ?? null
  const dailyDataFields = dailyDataFieldsByPlatform[dailyPlatform]
  const dailyDataColumns = ['业务日期', '平台名称', '店铺名称', ...dailyDataFields.map((field) => field.label), '操作项']

  function openDailyDataFill(row: DailyDataRecord) {
    const fields = dailyDataFieldsByPlatform[row.platform]
    setDailyFillValues(Object.fromEntries(fields.map((field) => {
      const value = row[field.key]
      const displayValue = value === null ? '' : field.valueType === 'ratio' ? String(value * 100) : String(value)
      return [field.key, displayValue]
    })))
    setEditingDailyData(row)
  }

  function saveDailyDataFill() {
    if (!editingDailyData) return
    const fields = dailyDataFieldsByPlatform[editingDailyData.platform]
    const updates = Object.fromEntries(fields.flatMap((field) => {
      const input = dailyFillValues[field.key]?.trim()
      const value = Number(input)
      if (!input || !Number.isFinite(value)) return []
      return [[field.key, field.valueType === 'ratio' ? value / 100 : value]]
    })) as Partial<DailyDataRecord>
    setDailyData((rows) => rows.map((row) => row.taskId === editingDailyData.taskId ? { ...row, ...updates } : row))
    setEditingDailyData(null)
    setLedgerNotice('日报数据已手动更新')
  }

  function publishTask(taskId: string) {
    const task = tasks.find((item) => item.taskId === taskId)
    if (!task || task.taskResult === '失败' || task.isUnbound) return
    setTasks((rows) => rows.map((row) => row.taskId === taskId ? { ...row, reportStatus: '已发布' } : row))
    const publishedMetrics = metricsForPublish(task)
    setDailyData((rows) => [
      { taskId: task.taskId, businessDate: task.businessDate, platform: task.platform, store: task.store, ...publishedMetrics },
      ...rows.filter((row) => !(row.businessDate === task.businessDate && row.platform === task.platform && row.store === task.store)),
    ])
    setLedgerNotice('日报已发布，并已写入日报数据')
  }

  function openReview(task: DailyTaskRecord) {
    if (task.taskResult !== '完成' || task.reportStatus === '已发布' || task.isUnbound) return
    setReviewingTaskId(task.taskId)
    setReviewNote(task.reviewNote ?? '')
    setReviewFields({ ...taskFieldValues(task), ...task.reviewedFields })
    setIsReviewDialogOpen(true)
  }

  function completeReview() {
    if (!reviewingTaskId) return
    const task = tasks.find((item) => item.taskId === reviewingTaskId)
    if (!task) return
    const originalFields = taskFieldValues(task)
    const modifiedFields = Object.fromEntries(Object.entries(reviewFields).filter(([field, value]) => value !== originalFields[field]))
    const hasManualChanges = Object.keys(modifiedFields).length > 0
    setTasks((rows) =>
      rows.map((row) =>
        row.taskId === reviewingTaskId
          ? { ...row, reviewedFields: modifiedFields, reviewNote: reviewNote.trim() || '人工复核完成', manualEditCount: (row.manualEditCount ?? 0) + (hasManualChanges ? 1 : 0) }
          : row,
      ),
    )
    setIsReviewDialogOpen(false)
    setLedgerNotice('复核完成，原始结果已保留；发布时将写入修正后数据')
  }

  function openRetry(task: DailyTaskRecord) {
    setAutoPlatform(task.platform)
    setAutoStore(task.store)
    setCreateMode('auto')
  }

  function submitRetry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!autoStore) return
    const record: DailyTaskRecord = {
      id: `task-${Date.now()}`,
      taskId: makeTaskId(autoPlatform, autoStore, tasks),
      fileName: `${autoPlatform}日报自动化结果.json`,
      source: '指令',
      platform: autoPlatform,
      store: autoStore,
      taskDate: new Date().toLocaleString('zh-CN', { hour12: false }).replaceAll('/', '-'),
      businessDate: dateMinusOne(),
      resultPreview: '任务完成',
      taskResult: '完成',
      reportStatus: '待发布',
      taskLog: '由重试操作重新发起自动化任务；已完成数据拉取，等待发布。',
      isUnbound: false,
      metrics: { gmv: 0, platformFee: 0, managementFee: 0 },
      peaCost: 320,
      owner: '李运营',
      reviewer: '',
    }
    setTasks((rows) => [record, ...rows])
    setTaskPlatform(autoPlatform)
    setTaskStore(autoStore)
    setCreateMode(null)
    setLedgerNotice('已重新发起自动化任务，并生成一条待发布任务记录')
  }

  function openManualUpload(task: DailyTaskRecord) {
    setUploadPlatformName(task.platform)
    setUploadStoreName(task.store)
    setManualUploadFiles({})
    setUploadTargetTaskId(task.taskId)
    setUploadError('')
    setManualUploadStep('template')
    setIsUploadDialogOpen(true)
  }

  function downloadDailyTemplate(platform: LedgerPlatform, store?: string, businessDate = dateMinusOne()) {
    const headers = ['业务日期', '平台名称', '店铺名称', ...dailyDataFieldsByPlatform[platform].map((field) => field.label)]
    const placeholder = [businessDate, platform, store ?? '请填写店铺名称', ...dailyDataFieldsByPlatform[platform].map(() => '')]
    const csv = `\uFEFF${headers.join(',')}\n${placeholder.join(',')}\n`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${platform}${store ? `-${store}` : ''}日报模板.csv`
    anchor.click()
    URL.revokeObjectURL(url)
    setLedgerNotice(`${platform}日报模板已下载`)
  }

  function downloadManualUploadTemplate(task: DailyTaskRecord, requirement: ManualUploadRequirement) {
    const headers = requirement.id === 'vip-product-new'
      ? ['业务日期', '平台名称', '店铺名称', '品牌款号']
      : ['业务日期', '平台名称', '店铺名称', `${requirement.label}数据`]
    const placeholder = [task.businessDate, task.platform, task.store, '']
    const csv = `\uFEFF${headers.join(',')}\n${placeholder.join(',')}\n`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${task.platform}-${task.store}-${task.businessDate}-${requirement.label}模板.csv`
    anchor.click()
    URL.revokeObjectURL(url)
    setLedgerNotice(`已下载${requirement.label}模板`)
  }

  function downloadSourceTables(records: DailyTaskRecord[], isBatch = false) {
    if (!records.length) return
    const workbook = XLSX.utils.book_new()
    records.forEach((task, index) => {
      const sourceRows = Object.entries(taskFieldValues(task)).map(([field, value]) => ({
        '任务 ID': task.taskId,
        '平台': task.platform,
        '店铺': task.store,
        '业务日期': task.businessDate,
        '源表字段': field,
        '原始值': value,
      }))
      if (task.brandSkuCount !== undefined) {
        sourceRows.push({
          '任务 ID': task.taskId,
          '平台': task.platform,
          '店铺': task.store,
          '业务日期': task.businessDate,
          '源表字段': 'D 列品牌款号数量',
          '原始值': task.brandSkuCount,
        })
      }
      const worksheet = XLSX.utils.json_to_sheet(sourceRows)
      XLSX.utils.book_append_sheet(workbook, worksheet, `${task.businessDate.replaceAll('-', '')}-${index + 1}`.slice(0, 31))
    })
    const fileName = isBatch
      ? `${records[0].platform}-${records[0].store}-近${records.length}天源表.xlsx`
      : sourceTableFileName(records[0])
    XLSX.writeFile(workbook, fileName)
    setLedgerNotice(isBatch ? `已下载 ${records.length} 份源表，已合并为一个 Excel 工作簿` : `已下载源表：${fileName}`)
  }

  function openBatchSourceDialog() {
    const firstRecord = tasks.find((task) => canDownloadSourceTable(task))
    if (!firstRecord) {
      setLedgerNotice('当前没有可下载的自动化任务源表')
      return
    }
    setBatchSourcePlatform(firstRecord.platform)
    setBatchSourceStore(firstRecord.store)
    setBatchSourceStartDate('')
    setBatchSourceEndDate('')
    setBatchSourceDialogOpen(true)
  }

  async function submitManualUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!uploadTargetTask || !isManualUploadComplete) return
    setUploadError('')
    const files = Object.values(manualUploadFiles).flat()
    if (files.some((file) => !/\.(xlsx|xls)$/i.test(file.name))) {
      setUploadError('请上传 Excel 格式文件（.xlsx 或 .xls）。')
      return
    }

    let brandSkuCount: number | undefined
    if (uploadPlatformName === '唯品会') {
      const productNewFile = manualUploadFiles['vip-product-new']?.[0]
      if (!productNewFile) return
      try {
        const workbook = XLSX.read(await productNewFile.arrayBuffer(), { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const sheetRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' }) as unknown[][]
        brandSkuCount = sheetRows.slice(1).map((row) => String(row[3] ?? '').trim()).filter(Boolean).length
        if (!brandSkuCount) {
          setUploadError('未识别到产品上新统计表 D 列的品牌款号，请检查文件格式。')
          return
        }
      } catch {
        setUploadError('产品上新统计表解析失败，请确认文件未损坏。')
        return
      }
    }

    const requirementSummary = uploadRequirements.map((requirement) => `${requirement.label} ${manualUploadFiles[requirement.id].length} 份`).join('；')
    setTasks((rows) => rows.map((row) => row.taskId === uploadTargetTask.taskId ? {
      ...row,
      fileName: files.map((file) => file.name).join('、'),
      source: '人工上传',
      resultPreview: '资料已提交',
      taskResult: '完成',
      reportStatus: '待发布',
      taskLog: `已按业务日期 ${row.businessDate} 提交人工资料：${requirementSummary}。文件日期与模板校验将由服务端处理。`,
      brandSkuCount,
    } : row))
    setTaskPlatform(uploadTargetTask.platform)
    setTaskStore(uploadTargetTask.store)
    setManualUploadFiles({})
    setUploadTargetTaskId(null)
    setIsUploadDialogOpen(false)
    setLedgerNotice(`已提交 ${files.length} 份资料，已绑定任务 ${uploadTargetTask.taskId}`)
  }

  return (
    <section className="data-page page-stack">
      <section className="data-scope-note">
        <div className="data-center-heading">
          <h2>数据中心</h2>
          <p>{dataTab === 'tasks' ? '查看日报任务的执行、复核、发布和日志。' : '查看已发布日报数据，并按平台、店铺和业务日期筛选。'}</p>
        </div>
      </section>

      {dataTab === 'tasks' ? <section className="report-stats" data-prd-anchor="tasks-summary">
        <article className="report-stat-card">
          <span className="report-stat-card__icon"><CalendarDays aria-hidden="true" /></span>
          <div>
            <strong>{totalTaskCount}</strong>
            <span>日报任务总数</span>
          </div>
        </article>
        <article className="report-stat-card">
          <span className="report-stat-card__icon report-stat-card__icon--success"><Upload aria-hidden="true" /></span>
          <div>
            <strong>{manualUploadCount}</strong>
            <span>人工上传次数</span>
          </div>
        </article>
        <article className="report-stat-card">
          <span className="report-stat-card__icon report-stat-card__icon--warning"><ScrollText aria-hidden="true" /></span>
          <div>
            <strong>{unpublishedCount}</strong>
            <span>未发布条数</span>
          </div>
        </article>
        <article className="report-stat-card">
          <span className="report-stat-card__icon report-stat-card__icon--danger"><AlertTriangle aria-hidden="true" /></span>
          <div>
            <strong>{failureCount}</strong>
            <span>失败次数</span>
          </div>
        </article>
        <article className="report-stat-card">
          <span className="report-stat-card__icon"><Pencil aria-hidden="true" /></span>
          <div>
            <strong>{manualEditCount}</strong>
            <span>手动修改次数</span>
          </div>
        </article>
        <article className="report-stat-card">
          <span className="report-stat-card__icon report-stat-card__icon--pea">
            <img src={`${import.meta.env.BASE_URL}pea-consumption-icon.png`} alt="" aria-hidden="true" />
          </span>
          <div>
            <strong>{totalPeaCost}</strong>
            <span>豌豆消耗</span>
          </div>
        </article>
      </section> : null}

      <section className="data-toolbar" data-prd-anchor="tasks-filters">
        <div className="ledger-common-filters" aria-label="常用筛选">
          <div className="data-subtabs platform-filter">
            {dataTab === 'tasks' ? (
              <button
                className={taskPlatform === '全部' ? 'selected' : ''}
                type="button"
                onClick={() => {
                  setTaskPlatform('全部')
                  setTaskStore('全部')
                }}
              >
                全部
              </button>
            ) : null}
            {ledgerPlatforms.map((item) => (
              <button
                className={(dataTab === 'tasks' ? taskPlatform : dailyPlatform) === item ? 'selected' : ''}
                key={item}
                type="button"
                onClick={() => {
                  if (dataTab === 'tasks') {
                    setTaskPlatform(item)
                    setTaskStore('全部')
                    return
                  }
                  setDailyPlatform(item)
                  setDailyStore(uniqueValues(dailyData.filter((row) => row.platform === item).map((row) => row.store))[0] ?? '')
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="store-filter">
            <span>店铺</span>
            <select
              value={dataTab === 'tasks' ? taskStore : dailyStore}
              onChange={(event) => {
                if (dataTab === 'tasks') {
                  setTaskStore(event.target.value)
                  return
                }
                setDailyStore(event.target.value)
              }}
            >
              {dataTab === 'tasks' ? <option value="全部">全部店铺</option> : null}
              {(dataTab === 'tasks' ? taskStoreOptions : dailyStoreOptions).map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="ledger-advanced-filters" aria-label="高级筛选">
        <span className="ledger-advanced-filters__label">{dataTab === 'tasks' ? '任务筛选' : '日期筛选'}</span>
        {dataTab === 'tasks' ? <><label className="store-filter date-range-filter"><span>任务日期</span><input type="date" value={taskStartDate} onChange={(event) => setTaskStartDate(event.target.value)} /><b>至</b><input type="date" value={taskEndDate} onChange={(event) => setTaskEndDate(event.target.value)} /></label><label className="store-filter"><span>来源</span><select value={taskSourceFilter} onChange={(event) => setTaskSourceFilter(event.target.value as '全部' | TaskSource)}><option value="全部">全部</option><option value="定时任务">定时任务</option><option value="指令">指令</option><option value="人工上传">人工上传</option><option value="人工上传文件">人工上传文件</option></select></label><label className="store-filter"><span>归属人</span><select value={taskOwnerFilter} onChange={(event) => setTaskOwnerFilter(event.target.value)}><option value="全部">全部</option>{taskOwners.map((owner) => <option key={owner} value={owner}>{owner}</option>)}</select></label><label className="store-filter"><span>审核人</span><select value={taskReviewerFilter} onChange={(event) => setTaskReviewerFilter(event.target.value)}><option value="全部">全部</option>{taskReviewers.map((reviewer) => <option key={reviewer} value={reviewer}>{reviewer}</option>)}</select></label><label className="store-filter"><span>任务结果</span><select value={taskResultFilter} onChange={(event) => setTaskResultFilter(event.target.value as '全部' | TaskResult)}><option value="全部">全部</option><option value="完成">完成</option><option value="失败">失败</option></select></label><label className="store-filter"><span>日报状态</span><select value={taskStatusFilter} onChange={(event) => setTaskStatusFilter(event.target.value as '全部' | DailyReportStatus)}><option value="全部">全部</option><option value="待发布">待发布</option><option value="已发布">已发布</option><option value="未发布">未发布</option></select></label></> : <div className="daily-detail-filter"><label className="store-filter date-range-filter"><span>业务日期</span><input type="date" max={dateMinusOne()} value={dailyStartDate} onChange={(event) => setDailyStartDate(event.target.value)} /><b>至</b><input type="date" max={dateMinusOne()} value={dailyEndDate} onChange={(event) => setDailyEndDate(event.target.value)} /></label><button className="secondary-action" type="button" disabled={!visibleDailyData.length} onClick={() => setDailyDetailDialogOpen(true)}><Eye aria-hidden="true" />查看明细</button></div>}
      </section>

      <article className={`data-table-card upload-record-card task-record-card ${dataTab === 'dailyData' ? 'daily-data-table' : ''}`} data-prd-anchor="tasks-ledger">
        <header>
          <div>
            <span className="eyebrow">{dataTab === 'tasks' ? 'daily_task_records' : 'daily_data'}</span>
            <h3>{dataTab === 'tasks' ? '日报任务记录' : '日报数据'}</h3>
          </div>
          {dataTab === 'tasks' ? (
            <div className="table-header-actions">
              <span className="table-count">{visibleTasks.length} 条任务记录</span>
              <button className="primary-action" type="button" onClick={openBatchSourceDialog}>
                <Download aria-hidden="true" />批量下载源表
              </button>
              <button className="secondary-action" type="button" onClick={() => { setTemplatePlatform(ledgerPlatforms[0]); setTemplateDialogOpen(true) }}>
                <Download aria-hidden="true" />下载模板
              </button>
            </div>
          ) : (
            <div className="table-header-actions">
              <span className="table-count">{visibleDailyData.length} 条日报数据</span>
              <button className="primary-action" type="button" onClick={() => { setDownloadDialogOpen(true); setDownloadPlatform('全部'); setDownloadStore('全部'); setDownloadStartDate(''); setDownloadEndDate(dateMinusOne()) }}>
                <Download aria-hidden="true" />
                下载
              </button>
            </div>
          )}
        </header>
        {ledgerNotice ? (
          <div className="ledger-notice" role="status">
            <AlertTriangle aria-hidden="true" />
            <span>{ledgerNotice}</span>
            <button type="button" aria-label="关闭提示" onClick={() => setLedgerNotice('')}>×</button>
          </div>
        ) : null}
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {(dataTab === 'tasks' ? taskColumns : dailyDataColumns).map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataTab === 'tasks'
                ? pagedTasks.map((row) => (
                    <tr key={row.id}>
                      <td><span className="batch-id">{row.taskId}</span></td>
                      <td><span className={`data-pill ${row.source === '人工上传文件' || row.source === '人工上传' ? 'warning' : 'normal'}`}>{row.source}</span></td>
                      <td>{row.platform}</td>
                      <td>{row.store}</td>
                      <td>{row.taskDate}</td>
                      <td>{row.businessDate}</td>
                      <td><span className="data-pill pea-cost">{row.peaCost}</span></td>
                      <td>{row.owner}</td>
                      <td>{row.reviewer || '—'}</td>
                      <td>{row.taskResult === '完成' ? <button className="preview-link" type="button" onClick={() => setPreviewTask(row)}><Eye aria-hidden="true" />查看</button> : '--'}</td>
                      <td><span className={`data-pill ${row.taskResult === '完成' ? 'normal' : 'danger'}`}>{row.taskResult}</span></td>
                      <td><span className={`data-pill ${row.reportStatus === '已发布' ? 'normal' : 'warning'}`}>{row.reportStatus}</span></td>
                      <td><span className={`data-pill ${row.reviewedFields && Object.keys(row.reviewedFields).length ? 'warning' : 'neutral'}`}>{row.reviewedFields && Object.keys(row.reviewedFields).length ? '是' : '否'}</span></td>
                      <td><button className="log-link" type="button" onClick={() => setLogTask(row)}><ScrollText aria-hidden="true" />查看日志</button></td>
                      <td>
                        <div className="row-actions">
                          <button className="table-action publish" type="button" disabled={row.taskResult === '失败' || row.reportStatus === '已发布' || row.isUnbound} onClick={() => publishTask(row.taskId)}>
                            <CheckCircle2 aria-hidden="true" />发布
                          </button>
                          <button className="table-action" type="button" disabled={row.taskResult !== '完成' || row.reportStatus === '已发布' || row.isUnbound} onClick={() => openReview(row)}>
                            <Pencil aria-hidden="true" />修改
                          </button>
                          <button className="table-action" type="button" disabled={row.isUnbound || row.platform === '唯品会'} title={row.platform === '唯品会' ? '唯品会任务仅可通过人工上传产品上新统计表触发' : undefined} onClick={() => openRetry(row)}>
                            <RotateCcw aria-hidden="true" />重试
                          </button>
                          <button className="table-action" type="button" disabled={row.isUnbound} onClick={() => openManualUpload(row)}>
                            <Upload aria-hidden="true" />人工上传
                          </button>
                          <button className="table-action" type="button" disabled={!canDownloadSourceTable(row)} title={canDownloadSourceTable(row) ? `下载 ${sourceTableFileName(row)}` : '仅已完成的自动化任务支持下载源表'} onClick={() => downloadSourceTables([row])}>
                            <Download aria-hidden="true" />下载源表
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : pagedDailyData.map((row) => (
                    <tr key={row.taskId}>
                      <td>{row.businessDate}</td>
                      <td>{row.platform}</td>
                      <td>{row.store}</td>
                      {dailyDataFields.map((field) => (
                        <td key={field.key}>{formatDailyDataValue(row[field.key], field.valueType)}</td>
                      ))}
                      <td><button className="table-action" type="button" onClick={() => openDailyDataFill(row)}><Pencil aria-hidden="true" />手动填写</button></td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <ListPagination
          label={dataTab === 'tasks' ? '日报任务记录' : '日报数据'}
          currentPage={dataTab === 'tasks' ? currentTaskPage : currentDailyDataPage}
          totalItems={dataTab === 'tasks' ? visibleTasks.length : visibleDailyData.length}
          onPageChange={dataTab === 'tasks' ? setTaskPage : setDailyDataPage}
        />
      </article>

      {templateDialogOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setTemplateDialogOpen(false)}>
          <section className="ledger-dialog create-task-dialog template-dialog">
            <header>
              <div>
                <span className="eyebrow">daily_report_template</span>
                <h3>下载日报模板</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setTemplateDialogOpen(false)}>×</button>
            </header>
            <p>选择平台后，下载对应字段的日报模板。</p>
            <label className="dialog-field">
              <span>平台</span>
              <select value={templatePlatform} onChange={(event) => setTemplatePlatform(event.target.value as LedgerPlatform)}>
                {ledgerPlatforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
              </select>
            </label>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setTemplateDialogOpen(false)}>取消</button>
              <button className="primary-action" type="button" onClick={() => { downloadDailyTemplate(templatePlatform); setTemplateDialogOpen(false) }}><Download aria-hidden="true" />下载模板</button>
            </footer>
          </section>
        </div>
      ) : null}

      {batchSourceDialogOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setBatchSourceDialogOpen(false)}>
          <section className="ledger-dialog create-task-dialog batch-source-dialog" role="dialog" aria-modal="true" aria-labelledby="batch-source-title">
            <header>
              <div>
                <span className="eyebrow">batch_source_tables</span>
                <h3 id="batch-source-title">批量下载源表</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setBatchSourceDialogOpen(false)}>×</button>
            </header>
            <p>仅合并同一平台、同一店铺的自动化任务源表。业务日期可不填，系统默认取最新 10 天。</p>
            <label className="dialog-field">
              <span>平台</span>
              <select value={batchSourcePlatform} onChange={(event) => {
                const platform = event.target.value as LedgerPlatform
                const firstStore = uniqueValues(tasks.filter((task) => canDownloadSourceTable(task) && task.platform === platform).map((task) => task.store))[0] ?? ''
                setBatchSourcePlatform(platform)
                setBatchSourceStore(firstStore)
                setBatchSourceStartDate('')
                setBatchSourceEndDate('')
              }}>
                {ledgerPlatforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}
              </select>
            </label>
            <label className="dialog-field">
              <span>店铺</span>
              <select value={batchSourceStore} onChange={(event) => setBatchSourceStore(event.target.value)}>
                {batchSourceStoreOptions.length ? batchSourceStoreOptions.map((store) => <option key={store} value={store}>{store}</option>) : <option value="">暂无可下载源表</option>}
              </select>
            </label>
            <label className="dialog-field">
              <span>业务日期（可选，最多 10 天）</span>
              <div className="date-range-inputs">
                <input type="date" value={batchSourceStartDate} onChange={(event) => setBatchSourceStartDate(event.target.value)} />
                <b>至</b>
                <input type="date" value={batchSourceEndDate} onChange={(event) => setBatchSourceEndDate(event.target.value)} />
              </div>
            </label>
            {batchSourceRangeError ? <p className="dialog-field-hint">时间范围不能超过 10 天，请缩短所选日期。</p> : null}
            <div className="dialog-meta"><span>可下载：{batchSourceRecords.length} 份源表</span><span>范围：{resolvedBatchSourceStartDate && resolvedBatchSourceEndDate ? `${resolvedBatchSourceStartDate} 至 ${resolvedBatchSourceEndDate}` : '暂无可下载日期'}</span></div>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setBatchSourceDialogOpen(false)}>取消</button>
              <button className="primary-action" type="button" disabled={!batchSourceRecords.length || batchSourceRangeError} onClick={() => { downloadSourceTables(batchSourceRecords, true); setBatchSourceDialogOpen(false) }}><Download aria-hidden="true" />下载源表</button>
            </footer>
          </section>
        </div>
      ) : null}

      {createMode === 'auto' ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCreateMode(null) }}>
          <form className="ledger-dialog create-task-dialog retry-dialog" onSubmit={submitRetry}>
            <header>
              <div>
                <span className="eyebrow">auto_task</span>
                <h3>重新发起自动化任务</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setCreateMode(null)}>×</button>
            </header>
            <p>选择目标平台与店铺，系统将调用 skill 自动拉取数据并生成日报。</p>
            <label className="dialog-field">
              <span>平台</span>
              <select value={autoPlatform} onChange={(event) => {
                const plat = event.target.value as LedgerPlatform
                setAutoPlatform(plat)
                const firstStore = tasks.filter((t) => t.platform === plat).map((t) => t.store)[0] ?? ''
                setAutoStore(firstStore)
              }}>
                {ledgerPlatforms.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="dialog-field">
              <span>店铺名称</span>
              <select value={autoStore} onChange={(event) => setAutoStore(event.target.value)} required>
                {tasks.filter((t) => t.platform === autoPlatform).map((t) => t.store).filter((v, i, arr) => arr.indexOf(v) === i).map((store) => <option key={store} value={store}>{store}</option>)}
              </select>
            </label>
            <div className="dialog-meta"><span>来源：自动化任务</span><span>业务日期：{dateMinusOne()}</span><span>预计消耗：320 豌豆</span></div>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setCreateMode(null)}>取消</button>
              <button className="primary-action" type="submit"><RotateCcw aria-hidden="true" />重新发起</button>
            </footer>
          </form>
        </div>
      ) : null}

      {isUploadDialogOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsUploadDialogOpen(false)}>
          <form className="ledger-dialog manual-upload-dialog manual-upload-dialog--requirements" onSubmit={submitManualUpload}>
            <header>
              <div>
                <span className="eyebrow">manual_import</span>
                <h3>人工上传日报资料</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setIsUploadDialogOpen(false)}>×</button>
            </header>
            <div className="manual-upload-steps" role="tablist" aria-label="人工上传步骤">
              <button type="button" role="tab" aria-selected={manualUploadStep === 'template'} className={manualUploadStep === 'template' ? 'active' : ''} onClick={() => setManualUploadStep('template')}>1 下载模板</button>
              <button type="button" role="tab" aria-selected={manualUploadStep === 'upload'} className={manualUploadStep === 'upload' ? 'active' : ''} onClick={() => setManualUploadStep('upload')}>2 上传资料</button>
            </div>
            {uploadTargetTask ? <>
              <section className="manual-upload-context" aria-label="当前任务信息">
                <div><span>任务编号</span><strong>{uploadTargetTask.taskId}</strong></div>
                <div><span>平台 / 店铺</span><strong>{uploadPlatformName} / {uploadStoreName}</strong></div>
                <div><span>业务日期</span><strong>{uploadTargetTask.businessDate}</strong></div>
              </section>
              {manualUploadStep === 'template' ? <section className="manual-upload-template-list" aria-label="模板下载清单">
                <header><div><strong>下载模板</strong><small>本次上传需要 {uploadRequirements.length} 份资料，对应提供 {uploadRequirements.length} 份模板。</small></div></header>
                {uploadRequirements.map((requirement) => <article key={requirement.id} className="manual-upload-template-step">
                  <span className="manual-upload-template-step__icon"><FileSpreadsheet aria-hidden="true" /></span>
                  <div><strong>{requirement.label}</strong><small>{requirement.multiple ? '该资料支持多文件上传，下载一份模板后可按需复制填报。' : '模板已预填当前店铺与业务日期。'}</small></div>
                  <button className="secondary-action" type="button" onClick={() => downloadManualUploadTemplate(uploadTargetTask, requirement)}><Download aria-hidden="true" />下载模板</button>
                </article>)}
              </section> : <><p className="manual-upload-dialog__notice"><AlertTriangle aria-hidden="true" />文件中的业务日期需与当前任务一致；日期、表头和文件格式将在提交后校验。</p>
              <section className="manual-upload-list" aria-label="必传资料清单">
                <header><div><strong>上传清单</strong><small>已完成 {uploadRequirements.filter((requirement) => (manualUploadFiles[requirement.id] ?? []).length > 0).length} / {uploadRequirements.length} 项</small></div><span>仅支持 .xlsx / .xls</span></header>
                {uploadRequirements.map((requirement) => {
                  const files = manualUploadFiles[requirement.id] ?? []
                  return <article className="manual-upload-requirement" key={requirement.id}>
                    <div className="manual-upload-requirement__head"><div><strong>{requirement.label}</strong><small>{requirement.description}</small></div><span className={`data-pill ${files.length ? 'good' : 'warning'}`}>{files.length ? `已选择 ${files.length} 份` : '待上传'}</span></div>
                    {files.length ? <div className="manual-upload-requirement__files">{files.map((file, index) => <span key={`${file.name}-${index}`}><FileSpreadsheet aria-hidden="true" /><strong>{file.name}</strong><button type="button" aria-label={`移除 ${file.name}`} onClick={() => setManualUploadFiles((current) => ({ ...current, [requirement.id]: current[requirement.id].filter((_, fileIndex) => fileIndex !== index) }))}>移除</button></span>)}</div> : null}
                    <label className="manual-upload-requirement__picker"><Upload aria-hidden="true" /><span>{requirement.multiple && files.length ? '继续添加文件' : '选择文件'}</span><input type="file" accept=".xlsx,.xls" multiple={requirement.multiple} onChange={(event) => { const nextFiles = Array.from(event.target.files ?? []); if (!nextFiles.length) return; setManualUploadFiles((current) => ({ ...current, [requirement.id]: requirement.multiple ? [...(current[requirement.id] ?? []), ...nextFiles] : [nextFiles[0]] })); setUploadError(''); event.currentTarget.value = '' }} /></label>
                  </article>
                })}
              </section></>}
            </> : <p className="manual-upload-dialog__notice">未找到当前任务，请关闭弹窗后重新进入。</p>}
            {uploadError ? <p className="manual-upload-error" role="alert">{uploadError}</p> : null}
            <footer>
              <button className="secondary-action" type="button" onClick={() => { setIsUploadDialogOpen(false); setManualUploadFiles({}); setUploadTargetTaskId(null) }}>取消</button>
              {manualUploadStep === 'template' ? <button className="primary-action" type="button" onClick={() => setManualUploadStep('upload')}>下一步：上传资料</button> : <button className="primary-action" type="submit" disabled={!uploadTargetTask || !isManualUploadComplete}><Upload aria-hidden="true" />提交资料并校验</button>}
            </footer>
          </form>
        </div>
      ) : null}

      {isReviewDialogOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsReviewDialogOpen(false)}>
          <form className="ledger-dialog review-dialog" onSubmit={(event) => { event.preventDefault(); completeReview() }}>
            <header>
              <div>
                <span className="eyebrow">manual_review</span>
                <h3>人工复核修改</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setIsReviewDialogOpen(false)}>×</button>
            </header>
            <p>完成复核后会保留原始结果，并在发布时写入修正后的数据。</p>
            {reviewingTask ? <div className="review-field-groups">{taskPreviewGroups({ ...reviewingTask, reviewedFields: undefined }).map((group) => (
              <section key={group.category} className="review-field-group">
                <h4>{group.category}</h4>
                <div className="review-metric-grid">
                  {group.fields.map((field) => (
                    <label key={field.field} className="dialog-field">
                      <span>修正后 {field.field}</span>
                      <input type="number" step="0.01" value={reviewFields[field.field] ?? field.originalValue} onChange={(event) => setReviewFields((fields) => ({ ...fields, [field.field]: Number(event.target.value) || 0 }))} />
                    </label>
                  ))}
                </div>
              </section>
            ))}</div> : null}
            <p className="review-original-note">原始任务结果和运行日志将保留；仅修正后数据会在发布时写入日报数据。</p>
            <label className="dialog-field">
              <span>复核说明</span>
              <textarea value={reviewNote} onChange={(event) => setReviewNote(event.target.value)} placeholder="请输入修正后的说明" rows={4} />
            </label>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setIsReviewDialogOpen(false)}>取消</button>
              <button className="primary-action" type="submit"><CheckCircle2 aria-hidden="true" />完成复核</button>
            </footer>
          </form>
        </div>
      ) : null}

      {editingDailyData ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingDailyData(null)}>
          <form className="ledger-dialog manual-daily-dialog" onSubmit={(event) => { event.preventDefault(); saveDailyDataFill() }}>
            <header>
              <div>
                <span className="eyebrow">manual_daily_data</span>
                <h3>手动填写日报数据</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setEditingDailyData(null)}>×</button>
            </header>
            <div className="dialog-meta"><span>业务日期：{editingDailyData.businessDate}</span><span>平台：{editingDailyData.platform}</span><span>店铺：{editingDailyData.store}</span></div>
            <p>仅填写当前平台适用字段；留空的字段将保留原值。</p>
            <div className="manual-daily-fields">
              {dailyDataFieldsByPlatform[editingDailyData.platform].map((field) => (
                <label key={field.key} className="dialog-field">
                  <span>{field.label}{field.valueType === 'ratio' ? '（%）' : ''}</span>
                  <input type="number" step="0.01" value={dailyFillValues[field.key] ?? ''} onChange={(event) => setDailyFillValues((values) => ({ ...values, [field.key]: event.target.value }))} />
                </label>
              ))}
            </div>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setEditingDailyData(null)}>取消</button>
              <button className="primary-action" type="submit"><CheckCircle2 aria-hidden="true" />保存数据</button>
            </footer>
          </form>
        </div>
      ) : null}

      {previewTask ? <TaskPreviewDialog task={previewTask} onClose={() => setPreviewTask(null)} onEdit={(task) => { setPreviewTask(null); openReview(task) }} /> : null}
      {dailyDetailDialogOpen ? <DailyDataDetailDialog rows={visibleDailyData} fields={dailyDataFields} platform={dailyPlatform} store={dailyStore} startDate={dailyStartDate} endDate={dailyEndDate} onClose={() => setDailyDetailDialogOpen(false)} /> : null}
      {logTask ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setLogTask(null)}><section className="ledger-dialog"><header><div><span className="eyebrow">task_log</span><h3>任务运行日志</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setLogTask(null)}>×</button></header><pre className="task-log">{logTask.taskLog}</pre></section></div> : null}

      {/* 下载日报数据弹窗 */}
      {downloadDialogOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDownloadDialogOpen(false)}>
          <form className="ledger-dialog create-task-dialog" onSubmit={(event) => {
            event.preventDefault()
            setDownloadDialogOpen(false)
            setLedgerNotice('日报数据下载任务已创建，请稍后在下载中心查看')
          }}>
            <header>
              <div>
                <span className="eyebrow">download_daily_data</span>
                <h3>下载日报数据</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setDownloadDialogOpen(false)}>×</button>
            </header>
            <p>选择时间范围、平台与店铺，下载对应的日报数据。</p>
            <label className="dialog-field">
              <span>业务日期</span>
              <div className="date-range-inputs">
                <input type="date" max={dateMinusOne()} value={downloadStartDate} onChange={(event) => setDownloadStartDate(event.target.value)} />
                <b>至</b>
                <input type="date" max={dateMinusOne()} value={downloadEndDate} onChange={(event) => setDownloadEndDate(event.target.value)} />
              </div>
            </label>
            <label className="dialog-field">
              <span>平台</span>
              <select value={downloadPlatform} onChange={(event) => { setDownloadPlatform(event.target.value as DataPlatformFilter); setDownloadStore('全部') }}>
                <option value="全部">全部平台</option>
                {ledgerPlatforms.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="dialog-field">
              <span>店铺</span>
              <select value={downloadStore} onChange={(event) => setDownloadStore(event.target.value)}>
                <option value="全部">全部店铺</option>
                {downloadStoreOptions.map((store) => <option key={store} value={store}>{store}</option>)}
              </select>
            </label>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setDownloadDialogOpen(false)}>取消</button>
              <button className="primary-action" type="submit"><Download aria-hidden="true" />下载</button>
            </footer>
          </form>
        </div>
      ) : null}
    </section>
  )
}
