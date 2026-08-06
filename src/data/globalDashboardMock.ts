import type { Period } from '../lib/metrics'

export const globalStoreLabels = [
  '快手\n官方旗舰店',
  '爱库存\n京倍店铺',
  '爱库存\n万顷店铺',
  '唯品会\n品牌集合店',
  '好衣库\n好衣库店铺',
]

const periodMeta: Record<Period, { labels: string[]; multiplier: number }> = {
  day: { labels: ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'], multiplier: 0.18 },
  week: { labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], multiplier: 0.72 },
  month: { labels: ['7/01', '7/05', '7/09', '7/13', '7/17', '7/21', '7/25', '7/29'], multiplier: 1 },
  year: { labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'], multiplier: 5.8 },
}

const wave = [0.88, 0.95, 0.91, 1.04, 1.12, 1.07, 1.18, 1.14]

function valueAt(base: number, index: number, multiplier: number, drift = 1) {
  return Math.round(base * multiplier * wave[index % wave.length] * (1 + index * drift * 0.012))
}

export function operatingTrendData(period: Period) {
  const { labels, multiplier } = periodMeta[period]
  return labels.map((label, index) => {
    const platformGmv = valueAt(156000, index, multiplier, 1.2)
    const gmv = Math.round(platformGmv * (1.055 + (index % 3) * 0.006))
    const actualSales = Math.round(platformGmv * (0.79 + (index % 4) * 0.008))
    const netProfit = Math.round(actualSales * (0.145 + (index % 3) * 0.007))
    return { label, gmv, platformGmv, actualSales, netProfit }
  })
}

export function costCompositionData(period: Period) {
  const { multiplier } = periodMeta[period]
  return globalStoreLabels.map((name, index) => {
    const scale = multiplier * (0.86 + index * 0.1)
    return {
      name,
      managementFee: Math.round(7300 * scale),
      otherExpense: Math.round(4200 * scale * (1 + (index % 2) * 0.13)),
      financialExpense: Math.round(1800 * scale),
      taxes: Math.round(2600 * scale * (1 + index * 0.04)),
      rebate: Math.round(1100 * scale * (index === 3 ? 1.5 : 1)),
    }
  })
}

export function ratioTrendData(period: Period) {
  const { labels } = periodMeta[period]
  return labels.map((label, index) => ({
    label,
    platformFeeRatio: Number((0.102 + (index % 3) * 0.004).toFixed(3)),
    promotionRatio: Number((0.071 + (index % 4) * 0.003).toFixed(3)),
    returnRatio: Number((0.043 + (index % 3) * 0.0025).toFixed(3)),
    variableCostRatio: Number((0.118 + (index % 4) * 0.003).toFixed(3)),
    actualRevenueRatio: Number((0.802 + (index % 3) * 0.006).toFixed(3)),
  }))
}

export function globalPeriodLabel(period: Period) {
  return period === 'day' ? '当日分时' : period === 'week' ? '本周按日' : period === 'month' ? '本月按日' : '本年按月'
}
