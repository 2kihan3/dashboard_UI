import type { PeriodProduct } from './dashboardPeriods.ts'

export type AttributionGrain = 'group' | 'owner' | 'creator'

export interface GroupAttributionRow {
  key: string
  name: string
  people: number
  gmv: number
  refund: number
}

export interface OwnerAttributionRow {
  key: string
  name: string
  group: string
  products: number
  gmv: number
  refundRate: number | null
}

export function groupAttributionRows(rows: PeriodProduct[]): GroupAttributionRow[] {
  const grouped = new Map<string, { owners: Set<string>; gmv: number; refund: number }>()
  rows.forEach(row => {
    if (!row.group) return
    const current = grouped.get(row.group) ?? { owners: new Set<string>(), gmv: 0, refund: 0 }
    if (row.owner) current.owners.add(row.owner)
    current.gmv += row.payment
    current.refund += row.refund
    grouped.set(row.group, current)
  })
  return [...grouped].map(([name, value]) => ({ key: name, name, people: value.owners.size, gmv: value.gmv, refund: value.refund })).sort((a, b) => b.gmv - a.gmv || a.name.localeCompare(b.name, 'zh-CN')).slice(0, 100)
}

export function ownerAttributionRows(rows: PeriodProduct[]): OwnerAttributionRow[] {
  const grouped = new Map<string, { groups: Set<string>; products: Set<string>; gmv: number; refund: number }>()
  rows.forEach(row => {
    if (!row.owner) return
    const current = grouped.get(row.owner) ?? { groups: new Set<string>(), products: new Set<string>(), gmv: 0, refund: 0 }
    if (row.group) current.groups.add(row.group)
    current.products.add(row.id)
    current.gmv += row.payment
    current.refund += row.refund
    grouped.set(row.owner, current)
  })
  return [...grouped].map(([name, value]) => ({
    key: name,
    name,
    group: value.groups.size === 0 ? '—' : value.groups.size === 1 ? [...value.groups][0] : '多组',
    products: value.products.size,
    gmv: value.gmv,
    refundRate: value.gmv > 0 ? value.refund / value.gmv * 100 : null,
  })).sort((a, b) => b.gmv - a.gmv || a.name.localeCompare(b.name, 'zh-CN')).slice(0, 100)
}

export function unattributedPayment(rows: PeriodProduct[]) {
  return rows.filter(row => !row.owner).reduce((total, row) => total + row.payment, 0)
}
