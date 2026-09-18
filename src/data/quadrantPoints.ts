import { classifyTraffic, rate, trafficCounts, type TrafficDay } from './trafficComparison.ts'
import { periodScope, type PeriodDays } from './dashboardPeriods.ts'

export function quadrantPoints(products: { id: string; name: string; sku: string | null; owner: string | null; group: string | null; days: TrafficDay[] }[], end: string, days: PeriodDays) {
  const scope = periodScope(end, days)
  return products.flatMap(product => {
    const selected = product.days.filter(day => day.date >= scope.start && day.date <= end)
    const ctr = rate(selected, 'ctr')
    const cvr = rate(selected, 'cvr')
    const quadrant = classifyTraffic(ctr, cvr)
    const counts = trafficCounts(selected)
    return quadrant && selected.length === days ? [{ id: product.id, name: product.name, sku: product.sku, owner: product.owner, group: product.group, ctr: ctr!, cvr: cvr!, exposure: counts.exposure!, clicks: counts.clicks!, buyers: counts.buyers!, quadrant }] : []
  }).sort((a,b) => b.exposure - a.exposure || a.id.localeCompare(b.id)).slice(0,100).map((point,index) => ({ ...point, rank: index + 1 }))
}
export type QuadrantPoint = ReturnType<typeof quadrantPoints>[number]
export type QuadrantFilter = 'all' | QuadrantPoint['quadrant']
export type QuadrantSort = 'exposure' | 'clicks' | 'buyers' | 'ctr' | 'cvr'
export const quadrantSortLabels: Record<QuadrantSort, string> = { exposure: '曝光人数', clicks: '点击人数', buyers: '成交人数', ctr: '曝光点击率', cvr: '点击成交率' }
export function filterQuadrantPoints(points: QuadrantPoint[], filter: QuadrantFilter, sort: QuadrantSort) {
  return points.filter(point => filter === 'all' || point.quadrant === filter)
    .sort((a, b) => b[sort] - a[sort] || a.id.localeCompare(b.id))
    .map((point, index) => ({ ...point, rank: index + 1 }))
}
export function quadrantScale(points: QuadrantPoint[]) {
  return { xMax: Math.max(12, ...points.map(point=>point.ctr * 1.15)), yMax: Math.max(20, ...points.map(point=>point.cvr * 1.15)), exposureMax: Math.max(1, ...points.map(point=>point.exposure)) }
}
