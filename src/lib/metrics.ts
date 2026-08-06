import { type PlatformName, type ReportRow, reportDataWithHaoyiku as reportData } from '../data/dailyReport'

export type Period = 'day' | 'week' | 'month' | 'year'
export type DetailPlatform = Exclude<PlatformName, '总计'>

export interface MetricSpec {
  field: string
  category: string
  chartTitle: string
}

export const periods: Array<{ key: Period; label: string }> = [
  { key: 'year', label: '年' },
  { key: 'month', label: '月' },
  { key: 'week', label: '周' },
  { key: 'day', label: '日' },
]

export const platforms: PlatformName[] = ['总计', ...reportData.map((item) => item.platform)]

export const categoryColors: Record<string, string> = {
  '聚水潭-实发毛利': '#79dbc4',
  平台费用: '#5fb7e6',
  推广费: '#b794f6',
  运费: '#5fd9e6',
  管理费用: '#9aa8a0',
  其他费用支出: '#e9ae64',
  财务费用: '#f87171',
  税金及附加: '#34d6b3',
  返利: '#22c55e',
  利润: '#79dbc4',
  净利润: '#79dbc4',
  公摊净利润: '#5fb7e6',
  销售: '#5fb7e6',
  占比: '#e9ae64',
}

export const platformMetricSpecs: Record<PlatformName, MetricSpec[]> = {
  总计: [
    { field: '平台成交GMV', category: '销售', chartTitle: 'GMV' },
    { field: '平台费用合计', category: '平台费用', chartTitle: '平台费用合计' },
    { field: '管理费用合计', category: '管理费用', chartTitle: '管理费用合计' },
  ],
  快手: [
    { field: '平台成交GMV', category: '销售', chartTitle: 'GMV' },
    { field: '平台费用合计', category: '平台费用', chartTitle: '平台费用合计' },
    { field: '管理费用合计', category: '管理费用', chartTitle: '管理费用合计' },
  ],
  爱库存: [
    { field: '平台成交GMV', category: '销售', chartTitle: 'GMV' },
    { field: '平台费用合计', category: '平台费用', chartTitle: '平台费用合计' },
    { field: '管理费用合计', category: '管理费用', chartTitle: '管理费用合计' },
  ],
  唯品会: [
    { field: '平台成交GMV', category: '销售', chartTitle: 'GMV' },
    { field: '活动折扣', category: '聚水潭-实发毛利', chartTitle: '活动折扣' },
  ],
  好衣库: [
    { field: '平台成交GMV', category: '销售', chartTitle: 'GMV' },
    { field: '技术运营服务费', category: '平台费用', chartTitle: '技术运营服务费' },
    { field: '快递信息服务费', category: '平台费用', chartTitle: '快递信息服务费' },
  ],
}

export const feeColors = ['#5fb7e6', '#79dbc4', '#34d6b3', '#e9ae64', '#b794f6', '#f87171']

export const storeShares: Record<DetailPlatform, Array<{ name: string; share: number }>> = {
  快手: [{ name: '官方旗舰店', share: 1 }],
  爱库存: [
    { name: '京倍店铺', share: 0.58 },
    { name: '万顷店铺', share: 0.42 },
  ],
  唯品会: [{ name: '品牌集合店', share: 1 }],
  好衣库: [{ name: '好衣库店铺', share: 1 }],
}

export function formatAmount(value: number) {
  const abs = Math.abs(value)
  if (abs >= 10000) return `${(value / 10000).toFixed(1)}万`
  return value.toLocaleString('zh-CN', { maximumFractionDigits: 0 })
}

export function formatPrecise(value: number, type: 'amount' | 'ratio' = 'amount') {
  if (type === 'ratio') return `${(value * 100).toFixed(2)}%`
  return value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
}

export function tooltipAmount(value: unknown) {
  return formatPrecise(typeof value === 'number' ? value : Number(value) || 0)
}

export function getPlatformReports(platform: PlatformName) {
  return platform === '总计' ? reportData : reportData.filter((item) => item.platform === platform)
}

export function collectRows(platform: PlatformName, predicate: (row: ReportRow) => boolean) {
  return getPlatformReports(platform).flatMap((report) =>
    report.rows.filter(predicate).map((row) => ({ row, platform: report.platform })),
  )
}

// 今天（demo 固定日期，方便演示"不展示未来时间"）
export const TODAY = '2026-07-23'

function formatShortDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${parseInt(month, 10)}/${parseInt(day, 10)}`
}

// 数据集的真实日期序列（所有平台一致，取第一个平台的 dates）
function datePoints() {
  return reportData[0].dates.map((point, index) => ({ ...point, dailyIndex: index }))
}

export function periodBuckets(period: Period) {
  const today = TODAY
  // 过滤未来日期，仅保留 date ≤ today 的点
  const validPoints = datePoints().filter((point) => point.date <= today)

  if (period === 'day') {
    // 最近一天
    const latest = validPoints[validPoints.length - 1]
    return [{ label: formatShortDate(latest.date), indexes: [latest.dailyIndex] }]
  }

  if (period === 'week') {
    // 最近 7 天，时间倒序（最新在最前）
    return validPoints.slice(-7).reverse().map((point) => ({
      label: formatShortDate(point.date),
      indexes: [point.dailyIndex],
    }))
  }

  if (period === 'month') {
    // 当前自然月（1日到今天），按天倒序；当前月无数据时 fallback 到最近 30 天
    const currentMonth = today.slice(0, 7) // "2026-07"
    const monthPoints = validPoints.filter((p) => p.date.startsWith(currentMonth))
    const points = monthPoints.length > 0 ? monthPoints : validPoints.slice(-30)
    return points.reverse().map((point) => ({
      label: formatShortDate(point.date),
      indexes: [point.dailyIndex],
    }))
  }

  // year: 当前年的所有月（1月~当前月），按月聚合，倒序
  const currentYear = today.slice(0, 4) // "2026"
  const yearMonths = Array.from(new Set(
    validPoints.filter((p) => p.date.startsWith(currentYear)).map((p) => p.date.slice(0, 7)),
  ))
  return yearMonths.reverse().map((month) => {
    const monthPoints = validPoints.filter((p) => p.date.startsWith(month))
    return {
      label: `${parseInt(month.slice(5, 7), 10)}月`,
      indexes: monthPoints.map((p) => p.dailyIndex),
    }
  })
}

export function rowPeriodValue(row: ReportRow, period: Period, indexes: number[]) {
  // 统一基于 daily 数组按 indexes 取值，不再依赖 monthTotal/yearTotal
  void period
  return indexes.reduce((sum, index) => sum + (row.daily[index]?.value ?? 0), 0)
}

export function fieldPeriodValue(platform: PlatformName, field: string, period: Period, indexes: number[]) {
  // 当前接入源尚未提供可用于看板聚合的管理费用字段，按 PRD 统一以 0 展示。
  if (field === '管理费用合计') return 0
  return collectRows(platform, (row) => row.field === field).reduce((sum, item) => sum + rowPeriodValue(item.row, period, indexes), 0)
}

export function fieldSummaryValue(platform: PlatformName, field: string, period: Period) {
  // 统一基于 periodBuckets 计算，指标卡与图表口径完全一致
  if (field === '管理费用合计') return 0
  const rows = collectRows(platform, (row) => row.field === field)
  const allIndexes = periodBuckets(period).flatMap((bucket) => bucket.indexes)
  return rows.reduce((sum, item) => sum + allIndexes.reduce((subtotal, index) => subtotal + (item.row.daily[index]?.value ?? 0), 0), 0)
}

export function platformFieldBuckets(platform: DetailPlatform, field: string, period: Period) {
  return periodBuckets(period).map((bucket) => ({
    label: bucket.label,
    value: fieldPeriodValue(platform, field, period, bucket.indexes),
  }))
}

export function storeFieldBuckets(platform: DetailPlatform, field: string, period: Period) {
  return storeShares[platform].map((store) => ({
    name: store.name,
    value: fieldPeriodValue(platform, field, period, periodBuckets(period).reduce((all, bucket) => all.concat(bucket.indexes), [] as number[])) * store.share,
  }))
}

export function storeFieldDetailSeries(platform: DetailPlatform, field: string, period: Period) {
  return storeShares[platform].map((store) => ({
    name: store.name,
    data: periodBuckets(period).map((bucket) => ({
      label: bucket.label,
      value: fieldPeriodValue(platform, field, period, bucket.indexes) * store.share,
    })),
  }))
}

export function platformFeeFields(platform: PlatformName) {
  return Array.from(new Set(collectRows(platform, (row) => row.category === '平台费用' && !row.isTotal).map((item) => item.row.field)))
}

export function feeColor(field: string) {
  return feeColors[Math.max(0, platformFeeFields('总计').indexOf(field)) % feeColors.length]
}

export function feeBuckets(platform: PlatformName, period: Period) {
  return periodBuckets(period).map((bucket) => {
    const point: Record<string, string | number> = { label: bucket.label }
    platformFeeFields(platform).forEach((field) => {
      point[field] = fieldPeriodValue(platform, field, period, bucket.indexes)
    })
    return point
  })
}

export function statusClass(value: string) {
  if (value === '无') return 'neutral'
  if (['不通过', '待确认', '待复核', '规则待补', '人工审核', '暂缓接入'].some((word) => value.includes(word))) {
    return 'warning'
  }
  if (['字段缺失', '失败', '异常'].some((word) => value.includes(word))) return 'danger'
  if (['通过', '已确认', '已发布', '已修正'].some((word) => value.includes(word))) return 'normal'
  return 'neutral'
}
