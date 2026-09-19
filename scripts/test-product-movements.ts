import assert from 'node:assert/strict'
import { demoMovements, movementPage, rankMovements } from '../src/data/productMovements.ts'

for (const kind of ['up', 'down'] as const) {
  assert.equal(demoMovements[kind].length, 100)
  assert.equal(new Set(demoMovements[kind].map(row => row.id)).size, 100)
  for (const metric of ['paymentChange', 'ordersChange'] as const) {
    const rows = rankMovements(demoMovements[kind], metric)
    const rate = (row: typeof rows[number]) => metric === 'paymentChange' ? row.payment / row.previousPayment - 1 : row.estimatedOrders / row.previousOrders - 1
    assert.ok(rows.every((row, i) => !i || Math.abs(rate(rows[i - 1])) >= Math.abs(rate(row))))
    assert.equal(movementPage(rows, 1, 10).rows.length, 10)
    assert.equal(movementPage(rows, 2, 10).rows[0].id, rows[10].id)
    assert.equal(movementPage(rows, 10, 10).rows.at(-1)?.id, rows[99].id)
    assert.equal(movementPage(rows, 99, 20).current, 5)
  }
  assert.ok(demoMovements[kind].every(row => kind === 'up' ? row.previousPayment < row.payment : row.previousPayment > row.payment))
}
assert.equal(movementPage([], 1, 10).pages, 1)
assert.equal(rankMovements([...demoMovements.up, ...demoMovements.down], 'paymentChange').length, 100)
console.log('PASS: TOP100 sorting, pagination, boundaries and movement fixtures')
