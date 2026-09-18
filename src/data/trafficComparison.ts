import { snapshotProducts } from './operationsSnapshot.ts'

export interface TrafficDay { date: string; exposure: number | null; clicks: number | null; buyers: number | null }
export type TrafficCounts = Pick<TrafficDay, 'exposure' | 'clicks' | 'buyers'>
export function trafficCounts(days: (TrafficDay | undefined)[]): TrafficCounts {
  const sum = (field: keyof TrafficCounts) => !days.length || days.some(day => !day || day[field] === null) ? null : days.reduce((total, day) => total + day![field]!, 0)
  return { exposure: sum('exposure'), clicks: sum('clicks'), buyers: sum('buyers') }
}
export type TrafficMetric = 'ctr' | 'cvr' | 'exposureConversion'
export const observationDate = '2026-09-17'
export const trafficThresholds = { ctr: 6, cvr: 10 }
export const quadrantLabels = {
  highHigh: { name: '高点击 · 高转化', note: '两段效率均达标' },
  highLow: { name: '高点击 · 低转化', note: '检查成交承接' },
  lowHigh: { name: '低点击 · 高转化', note: '检查点击吸引力' },
  lowLow: { name: '低点击 · 低转化', note: '两段均需排查' },
}
export function classifyTraffic(ctr: number | null, cvr: number | null): keyof typeof quadrantLabels | null {
  if (ctr === null || cvr === null || !Number.isFinite(ctr) || !Number.isFinite(cvr)) return null
  return ctr >= trafficThresholds.ctr ? cvr >= trafficThresholds.cvr ? 'highHigh' : 'highLow' : cvr >= trafficThresholds.cvr ? 'lowHigh' : 'lowLow'
}
export function rate(days: TrafficDay[], metric: TrafficMetric): number | null {
  const denominator = metric === 'cvr' ? 'clicks' : 'exposure'
  const numerator = metric === 'ctr' ? 'clicks' : 'buyers'
  if (!days.length || days.some(day => day[denominator] === null || day[numerator] === null)) return null
  const total = days.reduce((sum, day) => sum + day[denominator]!, 0)
  return total > 0 ? days.reduce((sum, day) => sum + day[numerator]!, 0) / total * 100 : null
}
export function compareTraffic(days: TrafficDay[], date: string, metric: TrafficMetric) {
  const offset = (n: number) => new Date(Date.parse(`${date}T00:00:00Z`) - n * 86400000).toISOString().slice(0, 10)
  const window = (n: number) => Array.from({ length: n }, (_, index) => days.find(day => day.date === offset(index + 1)))
  const baseline = (n: number) => { const rows = window(n); return rows.some(row => !row) ? null : rate(rows as TrafficDay[], metric) }
  return { yesterday: rate(days.filter(day => day.date === date), metric), previous: rate(days.filter(day => day.date === offset(1)), metric), seven: baseline(7), fourteen: baseline(14), sample: days.find(day => day.date === date), counts: { yesterday: trafficCounts(days.filter(day => day.date === date)), previous: trafficCounts(days.filter(day => day.date === offset(1))), seven: trafficCounts(window(7)), fourteen: trafficCounts(window(14)) } }
}
// 仅用于审核新布局：历史人数为确定性演示数据，不是测试站采集值。
export const trafficDemo = snapshotProducts.slice(0, 6).map((product, index) => ({ ...product,
  days: Array.from({ length: 15 }, (_, day) => {
    const exposure = 4200 + index * 1900 + ((day * 127 + index * 73) % 1300)
    const ctr = day === 14 ? [0.034, 0.073, 0.055, 0.12, 0.046, 0.085][index] : 0.052 + index * 0.009 + (day % 4 - 1.5) * 0.004
    const clicks = Math.round(exposure * ctr)
    const cvr = day === 14 ? [0.026, 0.055, 0.038, 0.022, 0.074, 0.046][index] : 0.041 + index * 0.005 + (day % 3 - 1) * 0.006
    return { date: `2026-09-${String(day + 3).padStart(2, '0')}`, exposure, clicks, buyers: Math.round(clicks * cvr) }
  }),
}))
