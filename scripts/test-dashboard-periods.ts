import assert from 'node:assert/strict'
import { amountTrend, periodScope, periodProducts, periodMovements, periodTraffic, sortProducts, shiftDate } from '../src/data/dashboardPeriods.ts'
import { rate } from '../src/data/trafficComparison.ts'
const end = '2026-09-17'
assert.deepEqual(periodScope(end, 7), { start: '2026-09-11', end, previousStart: '2026-09-04', previousEnd: '2026-09-10', label: '2026-09-11—2026-09-17', previousLabel: '2026-09-04—2026-09-10' })
assert.equal(periodScope(end, 14).previousStart, '2026-08-21')
assert.equal(periodScope(end, 1).previousEnd, '2026-09-16')
for (const days of [1, 7, 14] as const) {
  const rows = periodProducts(end, days)
  const previousRows = periodProducts(shiftDate(end, -days), days)
  rows.forEach((row, index) => {
    const daily = Array.from({ length: days }, (_, offset) => periodProducts(shiftDate(end, -offset), 1)[index])
    assert.equal(row.estimatedOrders, daily.reduce((sum, d) => sum + d.estimatedOrders, 0))
    assert.ok(Math.abs(row.payment - daily.reduce((sum,d)=>sum+d.payment,0)) < 1e-8)
    assert.equal(row.previous.payment, previousRows[index].payment)
    assert.equal(row.conversion, row.buyers / row.clicks)
    assert.equal(row.demo.roi, row.spend === null ? null : row.paidPayment / row.spend)
  })
  for (const metric of ['payment', 'estimatedOrders', 'conversion'] as const) {
    const ranked = sortProducts(rows, metric)
    assert.ok(ranked.every((row,index)=>index === 0 || (ranked[index-1][metric] ?? -1) >= (row[metric] ?? -1)))
  }
  const movements = periodMovements(end, days)
  const trend = amountTrend(end, days)
  assert.equal(trend.length, days)
  assert.equal(trend[0].date, periodScope(end, days).start)
  assert.equal(trend.at(-1)?.date, end)
  assert.ok(trend.every(row => row.gmv > 0 && row.refund >= 0 && row.spend >= 0 && row.missingSpend > 0))
  assert.ok(movements.up.length > 0)
  assert.ok(movements.down.length > 0)
  assert.ok(movements.up.every(row=>row.previousPayment > 0 && row.payment > row.previousPayment))
  assert.ok(movements.down.every(row=>row.payment < row.previousPayment))
  const traffic = periodTraffic(end)[0].days.filter(day=>day.date >= periodScope(end,days).start)
  assert.equal(traffic.length, days)
  assert.equal(rate(traffic,'cvr'), rows[0].conversion! * 100)
}
assert.notDeepEqual(periodProducts(end,1), periodProducts('2026-09-16',1))
assert.equal(sortProducts([{id:'missing', payment:1, estimatedOrders:1, conversion:null}, {id:'zero', payment:0, estimatedOrders:0, conversion:0}], 'conversion')[0].id, 'zero')
console.log('PASS: equal non-overlapping windows, daily aggregation, weighted conversion/ROI, three sorts, changed dates and movement classification')
