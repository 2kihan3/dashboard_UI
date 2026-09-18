import assert from 'node:assert/strict'
import { rankTraffic } from '../src/data/trafficRanking.ts'
const date = '2026-09-17'
const row = (id:string, clicks:number|null, buyers:number, orders:number, payment:number) => ({ id, estimatedOrders:orders, payment, days: [{date:'2026-09-16',exposure:100,clicks:10,buyers:2},{date,exposure:100,clicks,buyers}] })
const rows = [row('a',20,1,3,100),row('b',10,4,8,50),row('c',5,1,2,200),row('missing',null,0,0,0)]
assert.equal(rankTraffic(rows,date,'ctr','rate')[0].id,'a')
assert.equal(rankTraffic(rows,date,'cvr','rate')[0].id,'b')
assert.equal(rankTraffic(rows,date,'exposureConversion','rate')[0].id,'b')
assert.equal(rankTraffic(rows,date,'ctr','orders')[0].id,'b')
assert.equal(rankTraffic(rows,date,'ctr','payment')[0].id,'c')
assert.equal(rankTraffic(rows,date,'ctr','dailyDelta')[0].id,'a')
assert.equal(rankTraffic(rows,date,'cvr','dailyDelta')[0].id,'b')
assert.equal(rankTraffic(rows,date,'ctr','dailyDelta').at(-1)!.id,'missing')
assert.equal(rows[0].id,'a')
assert.equal(rankTraffic([],date,'ctr','rate').length,0)
assert.equal(rankTraffic(Array.from({length:120},(_,index)=>row(`id-${index}`,index,1,index,index)),date,'ctr','orders').length,100)
console.log('PASS: separate traffic metrics, orders/payment sorting, percentage-point gain, null last, Top100 cap and unchanged input')
