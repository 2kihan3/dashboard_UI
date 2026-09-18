import assert from 'node:assert/strict'
import { compareTraffic, rate, trafficDemo, observationDate } from '../src/data/trafficComparison.ts'
const days = trafficDemo[0].days
const result = compareTraffic(days, observationDate, 'ctr')
assert.equal(result.seven, rate(days.slice(7, 14), 'ctr'))
assert.equal(result.fourteen, rate(days.slice(0, 14), 'ctr'))
assert.equal(result.previous, rate([days[13]], 'ctr'))
assert.equal(result.yesterday, rate([days[14]], 'ctr'))
assert.equal(compareTraffic(days.slice(1), observationDate, 'ctr').fourteen, null)
assert.equal(rate([{ date: observationDate, exposure: 0, clicks: 0, buyers: 0 }], 'ctr'), null)
assert.equal(rate([{ date: observationDate, exposure: null, clicks: 1, buyers: 0 }], 'ctr'), null)
assert.equal(rate([{ date: 'a', exposure: 100, clicks: 10, buyers: 1 }, { date: 'b', exposure: 900, clicks: 180, buyers: 18 }], 'ctr'), 19)
assert.equal(compareTraffic(days, observationDate, 'cvr').seven, rate(days.slice(7, 14), 'cvr'))
assert.equal(rate([{ date: observationDate, exposure: 10000, clicks: 1000, buyers: 10 }], 'exposureConversion'), 0.1)
assert.equal(compareTraffic(days, observationDate, 'exposureConversion').fourteen, rate(days.slice(0, 14), 'exposureConversion'))
assert.equal(rate([{ date: observationDate, exposure: 100, clicks: null, buyers: 2 }], 'exposureConversion'), 2)
assert.equal(rate([{ date: observationDate, exposure: 0, clicks: 0, buyers: 0 }], 'exposureConversion'), null)
assert.equal(rate([{ date: observationDate, exposure: 100, clicks: 10, buyers: null }], 'exposureConversion'), null)
console.log('PASS: weighted rates, date windows, observation exclusion, missing data and zero denominators')
