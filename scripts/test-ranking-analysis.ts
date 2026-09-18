import assert from 'node:assert/strict'
import { productAnalysisDemo, spendAnalysisDemo, ratio } from '../src/data/rankingAnalysisDemo.ts'
assert.equal(ratio(10, 0), null)
assert.equal(ratio(10, null), null)
assert.equal(ratio(0, 100), 0)
assert.equal(ratio(100, 20), 5)
for (const row of [...productAnalysisDemo, ...spendAnalysisDemo]) {
  assert.ok(row.demo.paidOrders <= row.demo.totalOrders)
  assert.ok(row.demo.paidPayment <= row.payment)
  assert.equal(row.demo.roi, ratio(row.demo.paidPayment, row.spend))
  assert.equal(row.demo.cost, ratio(row.spend, row.demo.paidOrders))
}
for (const product of productAnalysisDemo) {
  const spend = spendAnalysisDemo.find(row => row.id === product.id)
  if (spend) assert.deepEqual(spend.demo, product.demo)
}
assert.equal(productAnalysisDemo[0].payment, 10295.67)
assert.equal(spendAnalysisDemo[0].spend, 1727.93)
console.log('PASS: ratios, missing/zero denominators, attribution bounds, matching products and source values')
