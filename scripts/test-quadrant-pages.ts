import assert from 'node:assert/strict'
import { filterQuadrantPoints, quadrantPoints, quadrantScale, type QuadrantSort } from '../src/data/quadrantPoints.ts'
import { topRankingPage } from '../src/data/topRankingPage.ts'
import { periodTraffic } from '../src/data/dashboardPeriods.ts'

const end = '2026-09-17'
const source = periodTraffic(end)
const fixture = Array.from({length:125},(_,index)=>({ ...source[index % source.length], id: `fixture-${index}`, sku: `SKU-${index}`, days: [{date:end,exposure:1000+index*100,clicks:100+index,buyers:10+index%9}] }))
const points = quadrantPoints(fixture,end,1)
assert.equal(points.length,100)
assert.ok(points.every((point,index)=>point.rank === index+1))
const first = topRankingPage(points,1,10)
const second = topRankingPage(points,2,10)
assert.equal(first.rows[0].rank,1)
assert.equal(second.rows[0].rank,11)
assert.equal(second.rows.at(-1)!.rank,20)
assert.ok(second.rows.every(point=>!first.rows.some(other=>other.id === point.id)))
const larger = topRankingPage(points,2,20)
assert.equal(larger.rows[0].rank,21)
assert.equal(larger.rows.at(-1)!.rank,40)
larger.rows.forEach(point=>{
  const original = fixture.find(row=>row.id === point.id)!
  assert.equal(point.sku,original.sku)
  assert.equal(point.name,original.name)
  assert.equal(point.owner,original.owner)
  assert.equal(point.exposure,original.days[0].exposure)
})
const scale = quadrantScale(points)
for (const sort of ['exposure', 'clicks', 'buyers', 'ctr', 'cvr'] as QuadrantSort[]) {
  const sorted = filterQuadrantPoints(points, 'all', sort)
  assert.ok(sorted.every((point, index) => point.rank === index + 1 && (!index || sorted[index - 1][sort] >= point[sort])))
}
for (const filter of ['lowHigh', 'highHigh', 'lowLow', 'highLow'] as const) {
  const filtered = filterQuadrantPoints(points, filter, 'exposure')
  assert.equal(filtered.length, points.filter(point => point.quadrant === filter).length)
  assert.ok(filtered.every((point, index) => point.quadrant === filter && point.rank === index + 1))
}
assert.deepEqual(filterQuadrantPoints([], 'all', 'ctr'), [])
assert.equal(points[0].rank, 1)
assert.ok(second.rows.every(point=>point.ctr <= scale.xMax && point.cvr <= scale.yMax && point.exposure <= scale.exposureMax))
assert.equal(topRankingPage(points,10,10).rows[0].rank,91)
assert.deepEqual(quadrantScale([]),{xMax:12,yMax:20,exposureMax:1})
assert.equal(quadrantPoints([{ ...fixture[0], days:[{date:end,exposure:100,clicks:null,buyers:10}] }],end,1).length,0)
assert.equal(quadrantPoints(source,end,14).length,10)
assert.equal(quadrantPoints([{...source[0], days:source[0].days.slice(2)}],end,14).length,0)
console.log('PASS: Top100 ranks, page-only points, 10/20 item page changes, source SKU/ID mapping, shared scale and invalid/incomplete data')
