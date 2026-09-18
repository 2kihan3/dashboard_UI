export type WindowDays = 1 | 7 | 14
export type OpsMetric = 'amount' | 'orders' | 'exposure' | 'spend' | 'refund'
export type Reason = '增长候选' | '存量下滑' | '点击待检查' | '承接待检查' | '新品自然流关注' | '曝光异常' | '退货异常'
export const reasons: Reason[] = ['增长候选', '存量下滑', '点击待检查', '承接待检查', '新品自然流关注', '曝光异常', '退货异常']
export interface LinkItem {
  key: string; id: string; sku: string; name: string; platform: string; store: string; category: string; owner: string
  launched: string | null; backendUrl: string | null
}
export interface DailyLink {
  date: string; key: string; exposure: number; natural: number | null; clicks: number; orders: number
  amount: number; spend: number | null; refund: number | null; qty: number
}
export interface OpsRules {
  enabled: boolean; platform: string; category: string; change: number; lowCtr: number; goodCtr: number
  lowCvr: number; goodCvr: number; natural: number; minExposure: number; minClicks: number; newDays: number
}
export const initialRules: OpsRules = { enabled: true, platform: '京东', category: '保暖内衣', change: 20, lowCtr: 4, goodCtr: 6, lowCvr: 8, goodCvr: 10, natural: 100, minExposure: 500, minClicks: 30, newDays: 14 }

export function dayOffset(date: string, offset: number) {
  const value = new Date(`${date}T12:00:00+08:00`)
  value.setUTCDate(value.getUTCDate() + offset)
  return value.toISOString().slice(0, 10)
}
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
export const demoEndDate = dayOffset(today, -1)
const names = ['德绒保暖套装', '轻暖无痕内衣', '高领打底衫', '男士秋衣套装', '柔暖家居服', '女士暖绒背心', '儿童保暖套装', '男士纯棉睡衣', '舒适秋裤', '轻薄打底背心', '莫代尔家居裤', '无痕文胸']
const originalLinks: LinkItem[] = names.map((name, index) => {
  const platform = index === 11 ? '抖音' : '京东'
  const store = index < 4 ? '猫人京东旗舰店' : index < 8 ? '猫人万芬专卖店' : index < 11 ? '猫人京倍专卖店' : '猫人抖音旗舰店'
  const id = `1000${100 + index % 4}`
  return { key: `${platform}|${store}|${id}`, id, sku: `MR-${200 + index % 6}`, name, platform, store, category: index === 7 || index === 10 ? '家居服' : '保暖内衣', owner: index % 2 ? '王运营' : '李运营', launched: index === 2 ? null : dayOffset(demoEndDate, index === 4 || index === 5 ? -6 : -80), backendUrl: null }
})

// 固定样例，刷新时不随机变动；诊断结论仍从每日数据计算。
const extraNames = ['女士德绒秋衣', '男士加绒打底衫', '儿童暖绒秋裤', '女士无痕秋裤', '轻暖吊带背心', '男士薄绒套装', '半高领保暖衫', '女士加厚保暖套装', '儿童纯棉秋衣', '男士弹力秋裤', '女士暖肤打底衫', '儿童轻绒内衣', '女士珊瑚绒睡衣', '男士莫代尔睡衣', '儿童居家套装', '女士薄绒保暖衫', '男士无痕背心', '儿童暖绒背心']
const extraProfiles = extraNames.map((name, index) => ({
  name,
  platform: index < 12 ? '京东' : '抖音',
  store: index < 12 ? ['猫人京东旗舰店', '猫人万芬专卖店', '猫人京倍专卖店'][index % 3] : index < 15 ? '猫人抖音旗舰店' : '猫人抖音内衣专卖店',
  category: index >= 12 && index < 15 ? '家居服' : '保暖内衣',
  ctr: [2.4, 7.8, 7.2, 5.1, 3.2, 6.8][index % 6],
  cvr: [12, 4.2, 13, 9, 6, 11][index % 6],
  growth: [0.58, 0.78, 1.52, 1.03, 1.28, 1.16][index % 6],
  age: [4, 5, 10, 11, 16, 17].includes(index) ? 10 + index % 3 : 65 + index,
  returnRate: [0.065, 0.19, 0.09, 0.042, 0.12, 0.075][index % 6],
}))
export const demoLinks: LinkItem[] = [...originalLinks, ...extraProfiles.map((profile, index) => {
  const id = `1000${200 + index}`
  return { key: `${profile.platform}|${profile.store}|${id}`, id, sku: `MR-${300 + index}`, name: profile.name, platform: profile.platform, store: profile.store, category: profile.category, owner: index % 2 ? '王运营' : '李运营', launched: dayOffset(demoEndDate, -profile.age), backendUrl: null }
})]

export const demoDailyData: DailyLink[] = demoLinks.flatMap((link, index) => Array.from({ length: 28 }, (_, day) => {
  const date = dayOffset(demoEndDate, day - 27)
  const profile = extraProfiles[index - originalLinks.length]
  if (profile) {
    const sample = index - originalLinks.length
    const wave = 1 + Math.sin((day + sample * 2) * 0.65) * 0.09
    const trend = day >= 21 ? profile.growth : 1
    const finalDay = day === 27 ? sample === 8 ? 2.8 : profile.growth : 1
    const exposure = Math.round((2600 + sample % 7 * 650) * wave * trend * finalDay)
    const clicks = Math.round(exposure * profile.ctr / 100)
    const orders = Math.round(clicks * profile.cvr / 100)
    const price = 89 + sample % 8 * 20
    return { date, key: link.key, exposure, natural: Math.round(exposure * (profile.age <= 14 ? 0.82 : 0.55)), clicks, orders, amount: orders * price, spend: Math.round(clicks * (0.45 + sample % 4 * 0.2)), refund: Math.round(orders * price * profile.returnRate * 0.6), qty: Math.round(orders * 1.25) }
  }
  const wave = 1 + ((day + index) % 5 - 2) * .035
  const lastPeriod = day >= 21
  const growth = (lastPeriod ? [1.38, .62, 1.05, 1.08, 1.6, 1.25, .74, 1.1, 1.01, 1.2, .88, 1.12][index] : 1) * (day === 27 ? index === 0 ? 1.38 : index === 1 ? .62 : 1 : 1)
  const exposure = Math.round((1500 + index * 480) * wave * (index === 8 && day === 27 ? 2.6 : growth))
  const ctr = [6.8, 5.2, 2.7, 7.4, 2.8, 7.6, 3.4, 5.8, 4.9, 5.1, 6.5, 5.4][index]
  const clicks = index === 6 && day === 27 ? 0 : Math.round(exposure * ctr / 100)
  const orders = index === 9 && day === 26 ? 0 : Math.round(clicks * [12, 9.2, 12.5, 4.8, 7, 11.8, 8, 9, 8.6, 9.2, 10.4, 8.6][index] / 100)
  return { date, key: link.key, exposure, natural: index === 9 ? null : Math.round(exposure * (index === 4 ? .8 : .62)), clicks, orders, amount: orders * (109 + index * 6), spend: index === 9 ? null : Math.round(orders * (index === 5 ? 0 : 15)), refund: index === 10 ? null : Math.round(orders * (index === 1 ? 25 : 8)), qty: Math.round(orders * 1.3) }
})).filter((row) => {
  const link = demoLinks.find((link) => link.key === row.key)!
  return (!link.launched || row.date >= link.launched) && !(row.key === demoLinks[3].key && row.date === dayOffset(demoEndDate, -5))
})

export interface LinkSummary {
  link: LinkItem; rows: DailyLink[]; baseRows: DailyLink[]; complete: boolean
  current: Record<OpsMetric, number | null>; baseline: Record<OpsMetric, number | null>
  exposure: number; natural: number | null; clicks: number; orders: number; qty: number; ctr: number | null; cvr: number | null
  hits: Array<{ reason: Reason; evidence: string; suggestion: string }>; cohort: { sold: number; returned: number; mature: boolean; rate: number; benchmark: number } | null
}
export const metricNames: Record<OpsMetric, string> = { amount: '成交金额', orders: '成交订单', exposure: '总曝光', spend: '投放消耗', refund: '平台发起退款金额' }
export function total(rows: DailyLink[], field: keyof DailyLink) {
  if (!rows.length || rows.some((row) => row[field] === null)) return null
  return rows.reduce((sum, row) => sum + Number(row[field]), 0)
}
export function relative(current: number | null, baseline: number | null) {
  return current === null || baseline === null || baseline === 0 ? null : (current - baseline) / baseline * 100
}
export function formatNumber(value: number | null, money = false): string {
  if (value === null) return '未接入'
  if (Math.abs(value) >= 10000) return `${(value / 10000).toFixed(2)}万`
  return value.toLocaleString('zh-CN', { maximumFractionDigits: money ? 2 : 0 })
}
export function summarizeLinks(links: LinkItem[], end: string, days: WindowDays, rules: OpsRules, incomplete = false): LinkSummary[] {
  const start = dayOffset(end, 1 - days)
  const baseStart = dayOffset(end, 1 - days * 2)
  const baseEnd = dayOffset(start, -1)
  return links.map((link) => {
    const rows = demoDailyData.filter((row) => row.key === link.key && row.date >= start && row.date <= end && !(incomplete && row.date === end && link.store === '猫人万芬专卖店'))
    const baseRows = demoDailyData.filter((row) => row.key === link.key && row.date >= baseStart && row.date <= baseEnd)
    const complete = rows.length === days && baseRows.length === days
    const current = Object.fromEntries(Object.keys(metricNames).map((key) => [key, total(rows, key as OpsMetric)])) as LinkSummary['current']
    const baseline = Object.fromEntries(Object.keys(metricNames).map((key) => [key, total(baseRows, key as OpsMetric)])) as LinkSummary['baseline']
    const exposure = total(rows, 'exposure') ?? 0, clicks = total(rows, 'clicks') ?? 0, orders = total(rows, 'orders') ?? 0
    const natural = total(rows, 'natural'), ctr = exposure ? clicks / exposure * 100 : null, cvr = clicks ? orders / clicks * 100 : null
    const index = demoLinks.findIndex((item) => item.key === link.key)
    const profile = extraProfiles[index - originalLinks.length]
    const sold = 320 + index * 30
    const cohort = index === 9 ? null : { sold, returned: profile ? Math.round(sold * profile.returnRate) : index === 1 ? 90 : 18 + index * 2, mature: profile ? profile.age >= 30 : index !== 4 && index !== 5, rate: 0, benchmark: link.category === '保暖内衣' ? 8.5 : 10.2 }
    if (cohort) cohort.rate = cohort.returned / cohort.sold * 100
    const hits: LinkSummary['hits'] = []
    if (complete && rules.enabled && rules.platform === link.platform && rules.category === link.category) {
      const change = relative(current.amount, baseline.amount)
      if (change !== null && Math.abs(change) > rules.change && (baseline.orders ?? 0) >= 5) hits.push({ reason: change > 0 ? '增长候选' : '存量下滑', evidence: `成交 ${formatNumber(current.amount)} / 基准 ${formatNumber(baseline.amount)}，${change > 0 ? '+' : ''}${change.toFixed(1)}%`, suggestion: change > 0 ? '结合连续表现检查增长来源' : '检查曝光、点击、承接及投放变化' })
      if (exposure >= rules.minExposure && ctr !== null && ctr < rules.lowCtr) hits.push({ reason: '点击待检查', evidence: `点击 ${clicks} / 曝光 ${exposure}，CTR ${ctr.toFixed(2)}% < ${rules.lowCtr}%`, suggestion: '检查主图、标题及曝光入口；不排除采集问题' })
      if (clicks >= rules.minClicks && ctr !== null && ctr >= rules.goodCtr && cvr !== null && cvr < rules.lowCvr) hits.push({ reason: '承接待检查', evidence: `订单 ${orders} / 点击 ${clicks}，CVR ${cvr.toFixed(2)}% < ${rules.lowCvr}%`, suggestion: '检查详情、评价、尺码与卖点一致性' })
      const age = link.launched ? Math.round((new Date(end).getTime() - new Date(link.launched).getTime()) / 86400000) : null
      if (age !== null && age >= 0 && age <= rules.newDays && natural !== null && natural >= rules.natural) hits.push({ reason: '新品自然流关注', evidence: `上架第 ${age + 1} 天，自然曝光 ${formatNumber(natural)} ≥ ${rules.natural}`, suggestion: '加入连续日观察；点击差时同时检查展示' })
      const last = rows.find((row) => row.date === end), prev = demoDailyData.find((row) => row.key === link.key && row.date === dayOffset(end, -1))
      const expChange = relative(last?.exposure ?? null, prev?.exposure ?? null)
      if (expChange !== null && expChange > 100 && (prev?.exposure ?? 0) >= rules.minExposure) hits.push({ reason: '曝光异常', evidence: `昨日总曝光 ${last?.exposure} / 前日 ${prev?.exposure}，+${expChange.toFixed(1)}%`, suggestion: '核查流量来源与消耗变化，继续跟踪' })
      if (cohort?.mature && cohort.sold >= 100 && cohort.rate > cohort.benchmark + 5) hits.push({ reason: '退货异常', evidence: `成熟批次 ${cohort.returned}/${cohort.sold}，退货率 ${cohort.rate.toFixed(2)}%，品类基准 ${cohort.benchmark}%`, suggestion: '检查尺码、质量、售后原因与供应端' })
    }
    return { link, rows, baseRows, complete, current, baseline, exposure, natural, clicks, orders, qty: total(rows, 'qty') ?? 0, ctr, cvr, hits, cohort }
  })
}
