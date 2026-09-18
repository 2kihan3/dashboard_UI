import assert from 'node:assert/strict'
import { dayOffset, demoDailyData, demoEndDate, demoLinks, initialRules, relative, summarizeLinks } from '../src/data/linkOperationsDemo.ts'

const run = (days: 1 | 7 | 14 = 1, enabled = true, incomplete = false) => summarizeLinks(demoLinks.filter((link) => link.platform === '京东'), demoEndDate, days, { ...initialRules, enabled }, incomplete)
const daily = run()
assert.equal(demoLinks.length, 30)
assert.equal(new Set(demoLinks.map((link) => link.store)).size, 5)
assert(demoDailyData.every((row) => Object.values(row).every((value) => typeof value !== 'number' || Number.isFinite(value))))
assert(demoDailyData.every((row) => row.orders <= row.clicks && row.clicks <= row.exposure && (row.natural === null || row.natural <= row.exposure)))
const added = daily.filter((item) => Number(item.link.id) >= 1000200)
assert(added.some((item) => item.hits.some((hit) => hit.reason === '退货异常')))
assert(added.some((item) => item.hits.some((hit) => hit.reason === '承接待检查')))
assert(added.some((item) => item.hits.some((hit) => hit.reason === '新品自然流关注')))
assert(added.some((item) => item.hits.length === 0))
assert(daily.every((item) => item.rows.every((row) => row.date === demoEndDate)))
assert(daily.every((item) => item.baseRows.every((row) => row.date === dayOffset(demoEndDate, -1))))
assert.equal(new Set(demoLinks.map((link) => link.key)).size, demoLinks.length)
assert(demoLinks.some((a) => demoLinks.some((b) => a.key !== b.key && a.id === b.id)))
assert(demoLinks.some((a) => demoLinks.some((b) => a.key !== b.key && a.sku === b.sku)))
assert.equal(relative(120, 100), 20)
assert.equal(relative(1, 0), null)
assert.equal(relative(null, 1), null)
assert(run(1, false).every((item) => item.hits.length === 0))
assert(daily.filter((item) => item.link.category === '家居服').every((item) => item.hits.length === 0))
assert(daily.some((item) => item.hits.some((hit) => hit.reason === '增长候选')))
assert(daily.some((item) => item.hits.some((hit) => hit.reason === '存量下滑')))
assert(daily.some((item) => item.hits.length > 1))
const newItem = daily.find((item) => item.link.name === '柔暖家居服')!
assert(newItem.hits.some((hit) => hit.reason === '新品自然流关注'))
assert(newItem.hits.some((hit) => hit.reason === '点击待检查'))
assert.equal(newItem.cohort?.mature, false)
assert(!newItem.hits.some((hit) => hit.reason === '退货异常'))
const noNatural = daily.find((item) => item.natural === null)!
assert.equal(noNatural.current.spend, null)
assert(!noNatural.hits.some((hit) => hit.reason === '新品自然流关注'))
assert(daily.some((item) => item.current.spend === 0))
const clickLow = daily.find((item) => item.link.name === '高领打底衫')!
assert(clickLow.hits.some((hit) => hit.reason === '点击待检查'))
assert(!clickLow.hits.some((hit) => hit.reason === '承接待检查'))
const conversionLow = daily.find((item) => item.link.name === '男士秋衣套装')!
assert(conversionLow.hits.some((hit) => hit.reason === '承接待检查'))
assert(!conversionLow.hits.some((hit) => hit.reason === '点击待检查'))
assert.equal(run(1, true, true).find((item) => item.link.key === newItem.link.key)?.rows.length, 0)
assert(run(1, true, true).filter((item) => item.link.store === '猫人万芬专卖店').every((item) => !item.complete && item.hits.length === 0))
assert(run(7).some((item) => !item.complete && item.hits.length === 0))
assert(run(14).every((item) => item.rows.length <= 14 && item.baseRows.length <= 14))
assert(demoDailyData.every((row) => { const link = demoLinks.find((link) => link.key === row.key)!; return !link.launched || row.date >= link.launched }))

const sampleLink = demoLinks[0]
const currentRow = demoDailyData.find((row) => row.key === sampleLink.key && row.date === demoEndDate)!
const baseRow = demoDailyData.find((row) => row.key === sampleLink.key && row.date === dayOffset(demoEndDate, -1))!
const originalCurrent = currentRow.amount, originalBase = baseRow.amount
try {
  baseRow.amount = 100
  for (const [amount, expected] of [[120, false], [121, true], [79, true]] as const) {
    currentRow.amount = amount
    const hits = run().find((item) => item.link.key === sampleLink.key)!.hits
    assert.equal(hits.some((hit) => hit.reason === '增长候选' || hit.reason === '存量下滑'), expected)
  }
} finally { currentRow.amount = originalCurrent; baseRow.amount = originalBase }
console.log('PASS: T-1、等长窗口、链接去重、配置范围、缺失与零、规则边界、自然流、样本与售后成熟条件')
