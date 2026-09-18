import { sourceProductRanking, sourceSpendRanking, type SourceRankingRow } from './sourceRankingSnapshot.ts'

export function ratio(numerator: number | null, denominator: number | null) {
  return numerator === null || denominator === null || denominator <= 0 ? null : numerator / denominator
}
// 仅用于前端设计审核：归因订单、归因金额及对比区间均为合成数据，不是截图采集值。
export function rankingDemo(row: SourceRankingRow, seedIndex: number) {
  const sourceIndex = sourceProductRanking.findIndex(product => product.id === row.id)
  const index = sourceIndex >= 0 ? sourceIndex : seedIndex
  const totalOrders = 60 + index * 23
  const orderShare = [.32, .71, .83, .15, .05, .62, .48, .88, .76, .57][index % 10]
  const paidOrders = Math.round(totalOrders * orderShare)
  const paidPayment = Math.round(row.payment * [.38, .68, .79, .21, .04, .59, .53, .86, .73, .61][index % 10] * 100) / 100
  const spendChange = [.24, -.12, .08, .32, -.06, .18, -.19, .27, .11, -.03][index % 10]
  const previousSpend = row.spend === null ? null : row.spend / (1 + spendChange)
  const previousRoi = [4.9, 1.8, 5.4, 3.3, 2.2, 3.1, 1.7, 2.8, 1.9, 1.3][index % 10]
  return { totalOrders, paidOrders, paidPayment, orderShare: ratio(paidOrders, totalOrders), paymentShare: ratio(paidPayment, row.payment), roi: ratio(paidPayment, row.spend), cost: ratio(row.spend, paidOrders), spendChange: previousSpend === null ? null : ratio(row.spend! - previousSpend, previousSpend), previousRoi }
}
export const productAnalysisDemo = sourceProductRanking.map((row, index) => ({ ...row, demo: rankingDemo(row, index) }))
export const spendAnalysisDemo = sourceSpendRanking.map((row, index) => ({ ...row, demo: rankingDemo(row, index) }))
