import assert from 'node:assert/strict'
import { demoMovements, movementPage, rankMovements } from '../src/data/productMovements.ts'

for (const kind of ['new', 'down'] as const) {
  assert.equal(demoMovements[kind].length, 100)
  assert.equal(new Set(demoMovements[kind].map(row => row.id)).size, 100)
  for (const metric of ['payment', 'estimatedOrders'] as const) {
    const rows = rankMovements(demoMovements[kind], metric)
    assert.ok(rows.every((row, i) => !i || rows[i - 1][metric] >= row[metric]))
    assert.equal(movementPage(rows, 1, 10).rows.length, 10)
    assert.equal(movementPage(rows, 2, 10).rows[0].id, rows[10].id)
    assert.equal(movementPage(rows, 10, 10).rows.at(-1)?.id, rows[99].id)
    assert.equal(movementPage(rows, 99, 20).current, 5)
  }
  assert.ok(demoMovements[kind].every(row => kind === 'new' ? row.previousPayment === 0 : row.previousPayment > row.payment))
}
assert.equal(movementPage([], 1, 10).pages, 1)
assert.equal(rankMovements([...demoMovements.new, ...demoMovements.down], 'payment').length, 100)
console.log('PASS: TOP100 sorting, pagination, boundaries and movement fixtures')
