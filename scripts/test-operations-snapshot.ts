import assert from 'node:assert/strict'
import { groupSnapshotProducts, snapshotProducts, operationsSnapshot, snapshotClickRanking, snapshotConversionRanking } from '../src/data/operationsSnapshot.ts'

assert.equal(new Set(snapshotProducts.map((row) => row.id)).size, 10)
assert.equal(snapshotProducts.filter((row) => row.spend === null).length, 1)
const grouped = groupSnapshotProducts(snapshotProducts, 'sku')
assert.equal(grouped.length, 10) // 无货号的三个商品分别保留，不能合并为一个“未知款”。
assert.equal(grouped.reduce((sum, row) => sum + row.payment, 0), snapshotProducts.reduce((sum, row) => sum + row.payment, 0))
assert.equal(snapshotProducts[0].payment, 13750.7)
const sameSku = [
  { ...snapshotProducts[0], sku: 'TEST', spend: 100 },
  { ...snapshotProducts[1], sku: 'TEST', spend: null },
]
const result = groupSnapshotProducts(sameSku, 'sku')[0]
assert.equal(result.count, 2)
assert.equal(result.spend, null)
assert.equal(result.payment, 20744.64)
assert.equal(result.owner, '多负责人')
assert.equal(snapshotProducts[0].sku, null) // 聚合不改原始样例。
assert(snapshotClickRanking.every((row) => row.exposure >= row.clicks && row.rate <= 100))
assert(snapshotConversionRanking.every((row) => row.clicks >= row.buyers && row.rate <= 100))
assert.equal(operationsSnapshot.gaps, 54)
assert.notEqual(operationsSnapshot.requestedEnd, operationsSnapshot.coveredEnd)
console.log('PASS: 快照值、独立商品、货号聚合、缺失传播、源数据不可变、人数口径、筛选与覆盖区分')
