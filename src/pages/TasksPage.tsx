import { useState } from 'react'
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  FileSpreadsheet,
  FolderOpen,
  Pencil,
  RotateCcw,
  ScrollText,
  Sparkles,
  Unlink,
  Upload,
} from 'lucide-react'
import { type PlatformName, type ReportRow, reportDataWithHaoyiku as reportData } from '../data/dailyReport'
import { formatPrecise } from '../lib/metrics'
import * as XLSX from 'xlsx'

type DailyReportStatus = '待发布' | '已发布' | '未发布'
type TaskSource = '定时任务' | '指令' | '人工上传文件' | '人工上传'
type TaskResult = '完成' | '失败'
type DataTab = 'tasks' | 'dailyData'
type LedgerPlatform = Exclude<PlatformName, '总计'> | '抖店' | '得物'
type DataPlatformFilter = '全部' | LedgerPlatform
type DataStoreFilter = '全部' | string

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
}

type DailyDataMetricKey = Exclude<keyof DailyDataRecord, 'taskId' | 'businessDate' | 'platform' | 'store'>

interface DailyDataField {
  key: DailyDataMetricKey
  label: string
  valueType?: 'amount' | 'ratio'
}

const taskColumns = ['任务 ID', '任务来源', '平台', '店铺', '任务日期', '业务日期', '豌豆消耗', '归属人员', '审核人', '结果预览', '任务结果', '日报状态', '修改', '任务日志', '操作项']
const dailyDataFieldsByPlatform: Record<LedgerPlatform, DailyDataField[]> = {
  快手: [
    { key: 'gmv', label: '平台成交GMV' }, { key: 'actualRevenue', label: '实发收入' }, { key: 'refundAmount', label: '退货金额' },
    { key: 'platformFee', label: '平台费用' }, { key: 'promotionFee', label: '推广费' }, { key: 'shippingFee', label: '运费' },
    { key: 'managementFee', label: '后台管理费' }, { key: 'otherExpense', label: '其他费用支出' }, { key: 'taxes', label: '税金及附加' },
    { key: 'netProfit', label: '净利润' }, { key: 'netProfitMargin', label: '净利润率', valueType: 'ratio' }, { key: 'allocatedNetProfit', label: '公摊后净利润' },
  ],
  抖店: [
    { key: 'gmv', label: '平台成交GMV' }, { key: 'salesRevenue', label: '销售收入' }, { key: 'actualRevenue', label: '实发收入' },
    { key: 'refundAmount', label: '退货金额' }, { key: 'platformFee', label: '平台费用' }, { key: 'promotionFee', label: '推广费' },
    { key: 'shippingFee', label: '运费' }, { key: 'netProfit', label: '净利润' }, { key: 'netProfitMargin', label: '净利润率', valueType: 'ratio' },
  ],
  唯品会: [
    { key: 'gmv', label: '平台成交GMV' }, { key: 'salesRevenue', label: '销售收入' }, { key: 'actualRevenue', label: '实发收入' },
    { key: 'refundAmount', label: '退货金额' }, { key: 'activityDiscount', label: '活动折扣' }, { key: 'salesCost', label: '销售成本' },
    { key: 'platformFee', label: '平台费用' }, { key: 'promotionFee', label: '推广费' }, { key: 'shippingFee', label: '运费' },
    { key: 'otherExpense', label: '其他费用支出' }, { key: 'taxes', label: '税金及附加' }, { key: 'netProfit', label: '净利润' },
    { key: 'netProfitMargin', label: '净利润率', valueType: 'ratio' }, { key: 'allocatedNetProfit', label: '公摊后净利润' },
  ],
  爱库存: [
    { key: 'gmv', label: '平台成交GMV' }, { key: 'actualRevenue', label: '实发收入' }, { key: 'refundAmount', label: '退货金额' },
    { key: 'platformFee', label: '平台费用' }, { key: 'promotionFee', label: '推广费' }, { key: 'managementFee', label: '后台管理费' },
    { key: 'otherExpense', label: '其他费用支出' }, { key: 'taxes', label: '税金及附加' }, { key: 'netProfit', label: '净利润' },
    { key: 'netProfitMargin', label: '净利润率', valueType: 'ratio' }, { key: 'allocatedNetProfit', label: '公摊后净利润' },
  ],
  好衣库: [
    { key: 'gmv', label: '平台成交GMV' }, { key: 'platformFee', label: '平台费用' }, { key: 'promotionFee', label: '推广活动费' },
    { key: 'shippingFee', label: '快递信息服务费' }, { key: 'otherExpense', label: '其他费用支出' }, { key: 'netProfit', label: '净利润' },
    { key: 'netProfitMargin', label: '净利润率', valueType: 'ratio' }, { key: 'allocatedNetProfit', label: '公摊后净利润' },
  ],
  得物: [
    { key: 'gmv', label: '平台成交GMV' }, { key: 'salesRevenue', label: '销售收入' }, { key: 'refundAmount', label: '退货金额' },
    { key: 'platformFee', label: '平台费用' }, { key: 'promotionFee', label: '推广费' }, { key: 'shippingFee', label: '运费' },
    { key: 'netProfit', label: '净利润' }, { key: 'netProfitMargin', label: '净利润率', valueType: 'ratio' },
  ],
}

const taskRows: DailyTaskRecord[] = [
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
    peaCost: 360,
    owner: '张管理员',
    reviewer: '王财务',
  },
]

const ledgerPlatforms: LedgerPlatform[] = ['快手', '抖店', '唯品会', '爱库存', '好衣库', '得物']

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

// 各平台任务结果预览字段白名单
function getPlatformPreviewFields(platform: string, report: { rows: ReportRow[] }): string[] {
  if (platform === '唯品会') {
    return ['平台成交GMV', '活动折扣', 'BD佣金']
  }
  if (platform === '好衣库') {
    return ['平台成交GMV', '技术运营服务费', '推广活动费', '快递信息服务费', '佣金', '罚款', '消费者赔付']
  }
  // 快手 / 爱库存：销售仅成交GMV + 平台费用全部 + 管理费用仅后台管理费
  const fields: string[] = ['平台成交GMV']
  report.rows
    .filter((row) => row.category === '平台费用' && row.field.trim())
    .forEach((row) => fields.push(row.field))
  fields.push('后台管理费')
  return fields
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
  if (!report) return []

  const matchedIndex = report.dates.findIndex((point) => point.date === task.businessDate)
  const dateIndex = matchedIndex >= 0 ? matchedIndex : Math.min(1, report.dates.length - 1)

  const whitelist = getPlatformPreviewFields(task.platform, report)
  // 唯品会字段跨多个 category，统一归入「核心指标」分组避免出现「聚水潭-实发毛利」等不友好分组名
  const isUnifiedGroup = task.platform === '唯品会'
  const categoryOrder = ['核心指标', '销售', '聚水潭-实发毛利', '平台费用', '推广费', '管理费用']
  const groupMap = new Map<string, TaskPreviewField[]>()

  whitelist.forEach((fieldName) => {
    const row = report.rows.find((r) => r.field === fieldName)
    const category = isUnifiedGroup ? '核心指标' : (row?.category ?? '平台费用')
    const originalValue = row
      ? (row.field === '平台成交GMV'
          ? task.metrics.gmv
          : row.field === '平台费用合计'
            ? task.metrics.platformFee
            : row.field === '管理费用合计'
              ? task.metrics.managementFee
              : row.daily[dateIndex]?.value ?? 0)
      : 0
    const fieldType = row?.valueType ?? 'amount'

    if (!groupMap.has(category)) groupMap.set(category, [])
    groupMap.get(category)!.push({
      field: fieldName,
      valueType: fieldType,
      originalValue,
      modifiedValue: task.reviewedFields?.[fieldName],
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
  const fields = taskPreviewGroups(task)
  const gmv = task.reviewedFields?.['平台成交GMV'] ?? task.metrics.gmv
  const platformFeeTotal = task.reviewedFields?.['平台费用合计']
  const managementFee = task.reviewedFields?.['后台管理费'] ?? task.reviewedFields?.['管理费用合计'] ?? task.metrics.managementFee
  const platformFee = platformFeeTotal ?? task.metrics.platformFee + fields
    .flatMap((group) => group.category === '平台费用' ? group.fields : [])
    .filter((field) => field.field !== '平台费用合计' && field.modifiedValue !== undefined)
    .reduce((sum, field) => sum + (field.modifiedValue! - field.originalValue), 0)

  return {
    gmv,
    salesRevenue: reportFieldValue(task, '销售收入'),
    actualRevenue: reportFieldValue(task, '实发收入'),
    refundAmount: reportFieldValue(task, '退货金额'),
    activityDiscount: reportFieldValue(task, '活动折扣'),
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
  }
}

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
        <p className="task-preview-original">原始任务指标：GMV {formatPrecise(task.metrics.gmv)}，平台费用 {formatPrecise(task.metrics.platformFee)}，管理费用 {formatPrecise(task.metrics.managementFee)}</p>
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<DailyTaskRecord[]>(taskRows)
  const [dailyData, setDailyData] = useState<DailyDataRecord[]>([])
  const [dataTab, setDataTab] = useState<DataTab>('tasks')
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
  const [logTask, setLogTask] = useState<DailyTaskRecord | null>(null)
  const [reviewingTaskId, setReviewingTaskId] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
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

  // 报告统计
  const totalDailyReports = tasks.filter((task) => task.source === '定时任务' || task.source === '人工上传文件' || task.source === '人工上传').length
  const totalOtherTasks = tasks.filter((task) => task.source === '指令').length
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
  const reviewingTask = tasks.find((task) => task.taskId === reviewingTaskId) ?? null
  const dailyDataFields = dailyDataFieldsByPlatform[dailyPlatform]
  const dailyDataColumns = ['业务日期', '平台名称', '店铺名称', ...dailyDataFields.map((field) => field.label), '查看明细', '操作项']

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
    setTasks((rows) =>
      rows.map((row) =>
        row.taskId === reviewingTaskId
          ? { ...row, reviewedFields: modifiedFields, reviewNote: reviewNote.trim() || '人工复核完成' }
          : row,
      ),
    )
    setIsReviewDialogOpen(false)
    setLedgerNotice('复核完成，原始结果已保留；发布时将写入修正后数据')
  }

  function unbindTask(taskId: string) {
    setTasks((rows) => rows.map((row) => row.taskId === taskId ? { ...row, isUnbound: true } : row))
    setDailyData((rows) => rows.filter((row) => row.taskId !== taskId))
    setLedgerNotice('任务已与对应业务日期和店铺的日报数据解绑')
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
    setSelectedFile(null)
    setUploadTargetTaskId(task.platform === '唯品会' ? task.taskId : null)
    setUploadError('')
    setManualUploadStep(task.platform === '唯品会' ? 'upload' : 'template')
    setIsUploadDialogOpen(true)
  }

  function downloadDailyTemplate(platform: LedgerPlatform, store?: string) {
    const headers = ['业务日期', '平台名称', '店铺名称', ...dailyDataFieldsByPlatform[platform].map((field) => field.label)]
    const placeholder = [dateMinusOne(), platform, store ?? '请填写店铺名称', ...dailyDataFieldsByPlatform[platform].map(() => '')]
    const csv = `\uFEFF${headers.join(',')}\n${placeholder.join(',')}\n`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${platform}${store ? `-${store}` : ''}日报模板.csv`
    anchor.click()
    URL.revokeObjectURL(url)
    setLedgerNotice(`${platform}日报模板已下载`)
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
    if (!selectedFile || !uploadStoreName.trim()) return
    setUploadError('')

    if (uploadPlatformName === '唯品会') {
      if (!uploadTargetTaskId) {
        setUploadError('未找到对应的唯品会待执行任务，请刷新后重试。')
        return
      }
      if (!/\.(xlsx|xls)$/i.test(selectedFile.name)) {
        setUploadError('请上传 Excel 格式的产品上新统计表（.xlsx 或 .xls）。')
        return
      }
      try {
        const workbook = XLSX.read(await selectedFile.arrayBuffer(), { type: 'array' })
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
        const sheetRows = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' }) as unknown[][]
        const brandSkuCodes = sheetRows
          .slice(1)
          .map((row) => String(row[3] ?? '').trim())
          .filter(Boolean)
        if (!brandSkuCodes.length) {
          setUploadError('未识别到 D 列品牌款号，请检查产品上新统计表格式。')
          return
        }
        setTasks((rows) => rows.map((row) => row.taskId === uploadTargetTaskId ? {
          ...row,
          fileName: selectedFile.name,
          source: '人工上传',
          resultPreview: '任务完成',
          taskResult: '完成',
          reportStatus: '待发布',
          taskLog: `已上传产品上新统计表，提取 D 列品牌款号 ${brandSkuCodes.length} 个；自动化处理完成，等待发布。`,
          metrics: { gmv: 57911.59, platformFee: 1501.65, managementFee: 0 },
          peaCost: 450,
          owner: '王财务',
          reviewer: '',
          brandSkuCount: brandSkuCodes.length,
        } : row))
        setTaskPlatform('唯品会')
        setTaskStore(uploadStoreName.trim())
        setSelectedFile(null)
        setUploadTargetTaskId(null)
        setIsUploadDialogOpen(false)
        setLedgerNotice(`已解析 ${brandSkuCodes.length} 个品牌款号，唯品会自动化任务已完成，等待发布`)
      } catch {
        setUploadError('文件解析失败，请确认上传的是未损坏的产品上新统计表。')
      }
      return
    }

    const record: DailyTaskRecord = {
      id: `task-${Date.now()}`,
      taskId: makeTaskId(uploadPlatformName, uploadStoreName.trim(), tasks),
      fileName: selectedFile.name,
      source: '人工上传文件',
      platform: uploadPlatformName,
      store: uploadStoreName.trim(),
      taskDate: new Date().toLocaleString('zh-CN', { hour12: false }).replaceAll('/', '-'),
      businessDate: dateMinusOne(),
      resultPreview: '任务完成',
      taskResult: '完成',
      reportStatus: '待发布',
      taskLog: '人工上传文件完成，等待发布。',
      isUnbound: false,
      metrics: { gmv: 0, platformFee: 0, managementFee: 0 },
      peaCost: 0,
      owner: '李运营',
      reviewer: '',
    }
    setTasks((rows) => [record, ...rows])
    setTaskPlatform(uploadPlatformName)
    setTaskStore(uploadStoreName.trim())
    setSelectedFile(null)
    setUploadStoreName('')
    setIsUploadDialogOpen(false)
    setLedgerNotice('人工上传任务已创建，待发布')
  }

  return (
    <section className="data-page page-stack">
      <section className="data-scope-note">
        <div className="data-center-heading">
          <h2>数据中心</h2>
          <p>管理日报任务记录与日报数据，支持发布、复核、重试、人工上传、作废与日志回查。</p>
        </div>
      </section>

      <section className="report-stats" data-prd-anchor="tasks-summary">
        <article className="report-stat-card">
          <span className="report-stat-card__icon"><CalendarDays aria-hidden="true" /></span>
          <div>
            <strong>{totalDailyReports}</strong>
            <span>日报数量</span>
          </div>
        </article>
        <article className="report-stat-card">
          <span className="report-stat-card__icon report-stat-card__icon--success"><FolderOpen aria-hidden="true" /></span>
          <div>
            <strong>{totalOtherTasks}</strong>
            <span>其他任务数量</span>
          </div>
        </article>
        <article className="report-stat-card">
          <span className="report-stat-card__icon report-stat-card__icon--pea"><Sparkles aria-hidden="true" /></span>
          <div>
            <strong>{totalPeaCost}</strong>
            <span>豌豆消耗</span>
          </div>
        </article>
      </section>

      <section className="data-toolbar" data-prd-anchor="tasks-filters">
        <div className="data-subtabs ledger-tabs" aria-label="数据表切换">
          <button
            className={dataTab === 'tasks' ? 'selected' : ''}
            type="button"
            onClick={() => setDataTab('tasks')}
          >
            日报任务记录
          </button>
          <button
            className={dataTab === 'dailyData' ? 'selected' : ''}
            type="button"
            onClick={() => setDataTab('dailyData')}
          >
            日报数据
          </button>
        </div>

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
        {dataTab === 'tasks' ? <><label className="store-filter date-range-filter"><span>任务日期</span><input type="date" value={taskStartDate} onChange={(event) => setTaskStartDate(event.target.value)} /><b>至</b><input type="date" value={taskEndDate} onChange={(event) => setTaskEndDate(event.target.value)} /></label><label className="store-filter"><span>来源</span><select value={taskSourceFilter} onChange={(event) => setTaskSourceFilter(event.target.value as '全部' | TaskSource)}><option value="全部">全部</option><option value="定时任务">定时任务</option><option value="指令">指令</option><option value="人工上传">人工上传</option><option value="人工上传文件">人工上传文件</option></select></label><label className="store-filter"><span>归属人</span><select value={taskOwnerFilter} onChange={(event) => setTaskOwnerFilter(event.target.value)}><option value="全部">全部</option>{taskOwners.map((owner) => <option key={owner} value={owner}>{owner}</option>)}</select></label><label className="store-filter"><span>审核人</span><select value={taskReviewerFilter} onChange={(event) => setTaskReviewerFilter(event.target.value)}><option value="全部">全部</option>{taskReviewers.map((reviewer) => <option key={reviewer} value={reviewer}>{reviewer}</option>)}</select></label><label className="store-filter"><span>任务结果</span><select value={taskResultFilter} onChange={(event) => setTaskResultFilter(event.target.value as '全部' | TaskResult)}><option value="全部">全部</option><option value="完成">完成</option><option value="失败">失败</option></select></label><label className="store-filter"><span>日报状态</span><select value={taskStatusFilter} onChange={(event) => setTaskStatusFilter(event.target.value as '全部' | DailyReportStatus)}><option value="全部">全部</option><option value="待发布">待发布</option><option value="已发布">已发布</option><option value="未发布">未发布</option></select></label></> : <label className="store-filter date-range-filter"><span>业务日期</span><input type="date" max={dateMinusOne()} value={dailyStartDate} onChange={(event) => setDailyStartDate(event.target.value)} /><b>至</b><input type="date" max={dateMinusOne()} value={dailyEndDate} onChange={(event) => setDailyEndDate(event.target.value)} /></label>}
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
                ? visibleTasks.map((row) => (
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
                          <button className="table-action danger-action" type="button" disabled={row.isUnbound} onClick={() => unbindTask(row.taskId)}>
                            <Unlink aria-hidden="true" />{row.isUnbound ? '已解绑' : '作废'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : visibleDailyData.map((row) => (
                    <tr key={row.taskId}>
                      <td>{row.businessDate}</td>
                      <td>{row.platform}</td>
                      <td>{row.store}</td>
                      {dailyDataFields.map((field) => (
                        <td key={field.key}>{formatDailyDataValue(row[field.key], field.valueType)}</td>
                      ))}
                      <td><button className="preview-link" type="button" onClick={() => setPreviewTask(tasks.find((task) => task.taskId === row.taskId) ?? null)}><Eye aria-hidden="true" />查看明细</button></td>
                      <td><button className="table-action" type="button" onClick={() => openDailyDataFill(row)}><Pencil aria-hidden="true" />手动填写</button></td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </article>

      {templateDialogOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setTemplateDialogOpen(false)}>
          <section className="ledger-dialog create-task-dialog">
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
          <section className="ledger-dialog create-task-dialog" role="dialog" aria-modal="true" aria-labelledby="batch-source-title">
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
          <form className="ledger-dialog create-task-dialog" onSubmit={submitRetry}>
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
          <form className="ledger-dialog" onSubmit={submitManualUpload}>
            <header>
              <div>
                <span className="eyebrow">manual_import</span>
                <h3>{uploadPlatformName === '唯品会' ? '上传产品上新统计表' : '人工上传任务'}</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setIsUploadDialogOpen(false)}>×</button>
            </header>
            {uploadPlatformName !== '唯品会' ? <div className="manual-upload-mode" role="tablist" aria-label="人工上传方式">
              <button type="button" role="tab" aria-selected={manualUploadStep === 'template'} className={manualUploadStep === 'template' ? 'active' : ''} onClick={() => setManualUploadStep('template')}><Download aria-hidden="true" />下载模板</button>
              <button type="button" role="tab" aria-selected={manualUploadStep === 'upload'} className={manualUploadStep === 'upload' ? 'active' : ''} onClick={() => setManualUploadStep('upload')}><Upload aria-hidden="true" />上传文件</button>
            </div> : null}
            <div className="dialog-meta"><span>平台：{uploadPlatformName}</span><span>店铺：{uploadStoreName}</span><span>业务日期：{dateMinusOne()}</span></div>
            {uploadPlatformName === '唯品会' ? <><section className="vip-upload-requirement"><FileSpreadsheet aria-hidden="true" /><div><strong>上传前一天更新的产品上新统计表</strong><small>仅支持 .xlsx / .xls 文件；系统只解析 D 列的品牌款号，并以解析结果触发自动化任务。</small></div></section><label className="dialog-field"><span>产品上新统计表</span><span className="file-picker"><FileSpreadsheet aria-hidden="true" /><strong>{selectedFile?.name ?? '选择 .xlsx / .xls 文件'}</strong><input type="file" accept=".xlsx,.xls" required onChange={(event) => { setSelectedFile(event.target.files?.[0] ?? null); setUploadError('') }} /></span></label>{uploadError ? <p className="dialog-field-hint">{uploadError}</p> : null}</> : manualUploadStep === 'template' ? <section className="manual-upload-template"><FileSpreadsheet aria-hidden="true" /><div><strong>先下载 {uploadPlatformName} 对应模板</strong><small>模板已预填当前店铺，字段与该平台日报口径一致。</small></div><button className="primary-action" type="button" onClick={() => downloadDailyTemplate(uploadPlatformName, uploadStoreName)}><Download aria-hidden="true" />下载模板</button></section> : <><label className="dialog-field"><span>平台</span><input value={uploadPlatformName} disabled /></label><label className="dialog-field"><span>店铺名称</span><input value={uploadStoreName} disabled /></label><label className="dialog-field"><span>Excel 文件</span><span className="file-picker"><FileSpreadsheet aria-hidden="true" /><strong>{selectedFile?.name ?? '选择 .xlsx / .xls / .csv 文件'}</strong><input type="file" accept=".xlsx,.xls,.csv" required onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} /></span></label></>}
            <footer>
              <button className="secondary-action" type="button" onClick={() => setIsUploadDialogOpen(false)}>取消</button>
              {uploadPlatformName === '唯品会' ? <button className="primary-action" type="submit"><Upload aria-hidden="true" />解析并执行任务</button> : manualUploadStep === 'upload' ? <button className="primary-action" type="submit"><Upload aria-hidden="true" />创建任务</button> : <button className="primary-action" type="button" onClick={() => setManualUploadStep('upload')}>下一步：上传文件</button>}
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
