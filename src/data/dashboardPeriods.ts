import { snapshotProducts } from './operationsSnapshot.ts'
import { ratio } from './rankingAnalysisDemo.ts'

export type PeriodDays = 1 | 7 | 14
export type ProductSort = 'payment' | 'estimatedOrders' | 'conversion'
export const defaultEnd = '2026-09-17'
export const shiftDate = (date: string, days: number) => new Date(Date.parse(`${date}T00:00:00Z`) + days * 86400000).toISOString().slice(0, 10)
export function periodScope(end: string, days: PeriodDays) {
  const start = shiftDate(end, 1 - days)
  const previousEnd = shiftDate(start, -1)
  return { start, end, previousStart: shiftDate(previousEnd, 1 - days), previousEnd, label: `${start}—${end}`, previousLabel: `${shiftDate(previousEnd, 1 - days)}—${previousEnd}` }
}
// 独立的确定性日级演示数据。源表快照不变；不会把模拟值当成采集值。
function daily(index: number, date: string) {
  const day = Math.floor(Date.parse(`${date}T00:00:00Z`) / 86400000)
  const exposure = 4000 + index * 1600 + (day * (127 + index * 11) % 2400)
  const clicks = Math.round(exposure * (.035 + index % 10 * .006 + (day + index) % 5 * .004))
  const buyers = Math.round(clicks * (.025 + index % 8 * .015 + (day + index) % 4 * .008))
  const orders = buyers + Math.round(buyers * .08)
  const payment = orders * (35 + index % 10 * 7) * (1 + day % 3 * .04)
  const spend = (index % 10 === 3) ? null : payment * (.12 + index % 7 * .04) * (1 + day % 6 * .05)
  return { date, exposure, clicks, buyers, orders, payment, spend, refund: payment * (index % 5 * .025), paidOrders: Math.round(orders * (.2 + index % 7 * .1)), paidPayment: payment * (.25 + index % 6 * .1) }
}
function aggregate(index: number, end: string, days: PeriodDays) {
  const rows = Array.from({ length: days }, (_, offset) => daily(index, shiftDate(end, -offset)))
  const sum = (key: 'exposure' | 'clicks' | 'buyers' | 'orders' | 'payment' | 'refund' | 'paidOrders' | 'paidPayment') => rows.reduce((total, row) => total + row[key], 0)
  return { exposure: sum('exposure'), clicks: sum('clicks'), buyers: sum('buyers'), payment: sum('payment'), estimatedOrders: sum('orders'), refund: sum('refund'), spend: rows.some(row => row.spend === null) ? null : rows.reduce((total, row) => total + row.spend!, 0), paidOrders: sum('paidOrders'), paidPayment: sum('paidPayment') }
}
export function periodProducts(end: string, days: PeriodDays) {
  const rows = snapshotProducts.map((source, index) => {
    const current = aggregate(index, end, days)
    const previous = aggregate(index, shiftDate(end, -days), days)
    return { ...source, ...current, conversion: ratio(current.buyers, current.clicks), previous, demo: { totalOrders: current.estimatedOrders, paidOrders: current.paidOrders, paidPayment: current.paidPayment, orderShare: ratio(current.paidOrders, current.estimatedOrders), paymentShare: ratio(current.paidPayment, current.payment), roi: ratio(current.paidPayment, current.spend), cost: ratio(current.spend, current.paidOrders), previousRoi: ratio(previous.paidPayment, previous.spend), spendChange: current.spend === null || previous.spend === null ? null : ratio(current.spend - previous.spend, previous.spend) }, share: 0 }
  })
  const total = rows.reduce((sum, row) => sum + row.payment, 0)
  return rows.map(row => ({ ...row, share: total > 0 ? row.payment / total * 100 : 0 }))
}
export type PeriodProduct = ReturnType<typeof periodProducts>[number]
export function sortProducts<T extends { id: string; payment: number; estimatedOrders: number; conversion: number | null }>(rows: T[], sort: ProductSort) {
  return [...rows].sort((a, b) => (b[sort] ?? -1) - (a[sort] ?? -1) || a.id.localeCompare(b.id)).slice(0, 100)
}
export function periodTraffic(end: string) {
  return snapshotProducts.map((source, index) => ({ ...source, days: Array.from({ length: 15 }, (_, offset) => daily(index, shiftDate(end, offset - 14))) }))
}
export function periodMovements(end: string, days: PeriodDays) {
  const rows = Array.from({ length: 100 }, (_, index) => {
    const source = snapshotProducts[index % snapshotProducts.length]
    const current = aggregate(index, end, days)
    const previous = aggregate(index, shiftDate(end, -days), days)
    // 模拟零基数用于检验新增分支；不把“新增成交”解释成新上架。
    const newlySelling = index % 9 === 0
    return { ...source, ...current, id: `demo-${index + 1}`, name: `${source.name} · 款 ${index + 1}`, sku: `DEMO-${index + 1}`, conversion: ratio(current.buyers, current.clicks), previousPayment: newlySelling ? 0 : previous.payment, previousOrders: newlySelling ? 0 : previous.estimatedOrders }
  })
  return { new: rows.filter(row => row.previousPayment === 0 && row.payment > 0), down: rows.filter(row => row.payment < row.previousPayment) }
}
