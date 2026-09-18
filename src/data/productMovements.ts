import { snapshotProducts } from './operationsSnapshot.ts'

export type MovementKind = 'new' | 'down'
export type MovementMetric = 'payment' | 'estimatedOrders'
export interface ProductMovementRow {
  id: string; name: string; sku: string; owner: string | null; group: string | null
  conversion?: number | null
  payment: number; previousPayment: number; estimatedOrders: number; previousOrders: number
}
// 独立虚拟样本，仅验证 TOP100 / 分页。不能计入测试环境快照的汇总。
export const demoMovements: Record<MovementKind, ProductMovementRow[]> = {
  new: [], down: [],
}
for (let index = 0; index < 100; index++) {
  const product = snapshotProducts[index % snapshotProducts.length]
  const payment = Math.round((420 + (index * 791 % 12800)) * 100) / 100
  const orders = 12 + index * 37 % 280
  const base = { id: `demo-${index + 1}`, name: `${product.name} · 款 ${index + 1}`, sku: `DEMO-${String(index + 1).padStart(3, '0')}`, owner: product.owner, group: product.group, payment, estimatedOrders: orders }
  demoMovements.new.push({ ...base, previousPayment: 0, previousOrders: 0 })
  demoMovements.down.push({ ...base, previousPayment: Math.round(payment * (1.2 + index % 7 / 10) * 100) / 100, previousOrders: orders + 10 + index % 50 })
}
export function rankMovements(rows: ProductMovementRow[], metric: MovementMetric) {
  return [...rows].sort((a, b) => b[metric] - a[metric] || a.id.localeCompare(b.id)).slice(0, 100)
}
export function movementPage(rows: ProductMovementRow[], page: number, size: number) {
  const pages = Math.max(1, Math.ceil(rows.length / size))
  const current = Math.max(1, Math.min(page, pages))
  return { rows: rows.slice((current - 1) * size, current * size), current, pages }
}
