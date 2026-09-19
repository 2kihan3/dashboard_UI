import assert from 'node:assert/strict'
import { groupAttributionRows, ownerAttributionRows, unattributedPayment } from '../src/data/attributionRanking.ts'
import { periodProducts } from '../src/data/dashboardPeriods.ts'

const rows = periodProducts('2026-09-17', 1)
const groups = groupAttributionRows(rows)
const owners = ownerAttributionRows(rows)

assert.ok(groups.length > 0)
assert.ok(owners.length > 0)
assert.ok(groups.every((row, index) => index === 0 || groups[index - 1].gmv >= row.gmv))
assert.ok(owners.every((row, index) => index === 0 || owners[index - 1].gmv >= row.gmv))
assert.ok(groups.every(row => row.people >= 1 && row.refund >= 0))
assert.ok(owners.every(row => row.products >= 1 && row.group.length > 0 && row.refundRate !== null))
assert.equal(unattributedPayment(rows), rows.filter(row => !row.owner).reduce((sum, row) => sum + row.payment, 0))

console.log('PASS: group/person attribution fields, GMV sorting, refund metrics and unattributed payment')
