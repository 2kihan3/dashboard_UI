import { compareTraffic, type TrafficDay, type TrafficMetric } from './trafficComparison.ts'

export type TrafficSort = 'rate' | 'orders' | 'payment' | 'dailyDelta'
export const trafficSortLabels: Record<TrafficSort, string> = { rate: '基准日比率', orders: '基准日订单数', payment: '基准日支付金额', dailyDelta: '较前一日提升（百分点）' }
export function rankTraffic<T extends { id: string; days: TrafficDay[]; estimatedOrders: number; payment: number }>(rows: T[], date: string, metric: TrafficMetric, sort: TrafficSort) {
  const value = (row: T) => {
    if (sort === 'orders') return row.estimatedOrders
    if (sort === 'payment') return row.payment
    const result = compareTraffic(row.days, date, metric)
    if (sort === 'dailyDelta') return result.yesterday === null || result.previous === null ? null : result.yesterday - result.previous
    return result.yesterday
  }
  return rows.map(row => ({ row, value: value(row) })).sort((a,b) => a.value === null ? b.value === null ? a.row.id.localeCompare(b.row.id) : 1 : b.value === null ? -1 : b.value - a.value || a.row.id.localeCompare(b.row.id)).slice(0,100).map(item=>item.row)
}
