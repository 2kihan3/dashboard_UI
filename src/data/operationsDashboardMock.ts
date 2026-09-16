export const operationsPlatforms = ['抖音', '快手', '得物', '唯品会', '拼多多', '京东'] as const

export const operationsPlatformColors: Record<string, string> = {
  抖音: '#185FA5',
  快手: '#BA7517',
  得物: '#0F6E56',
  唯品会: '#993C1D',
  拼多多: '#A32D2D',
  京东: '#534AB7',
}

export const operationsKpis = [
  { label: '曝光量', value: '2,846.3万', delta: 12.8, note: '较上期' },
  { label: '点击量', value: '184.6万', delta: 9.6, note: '较上期' },
  { label: '点击率', value: '6.49%', delta: -0.18, note: '较上期' },
  { label: '成交订单数', value: '12.84万', delta: 14.2, note: '较上期' },
  { label: '点击转化率', value: '6.96%', delta: 0.32, note: '较上期' },
  { label: '净成交金额', value: '1,286.4万', delta: 11.7, note: '较上期' },
  { label: '成交件数', value: '16.92万', delta: 13.1, note: '较上期' },
  { label: '退款率', value: '8.37%', delta: -0.74, note: '较上期' },
]

const dates = ['08-01', '08-03', '08-05', '08-07', '08-09', '08-11', '08-13', '08-15', '08-17', '08-19', '08-21', '08-23']

export const operationsTrend = dates.map((date, index) => ({
  date,
  net: 78 + index * 3.8 + [0, 7, -4, 10, 5, 14, 2, 18, 9, 21, 12, 25][index],
  previousNet: 72 + index * 3.4 + [2, 4, 1, 7, 3, 9, 5, 10, 6, 13, 8, 15][index],
  impressions: 168 + index * 5.4 + [0, 10, -8, 12, 4, 17, 2, 20, 8, 24, 13, 28][index],
  previousImpressions: 158 + index * 4.8 + [3, 5, 1, 8, 4, 10, 6, 12, 8, 14, 10, 16][index],
  clicks: 10.8 + index * .45 + [0, .7, -.3, .9, .2, 1.1, .4, 1.3, .6, 1.5, .8, 1.7][index],
  previousClicks: 10.1 + index * .4 + [0, .3, .1, .5, .2, .6, .3, .7, .4, .8, .5, .9][index],
  ctr: 6.1 + [0.1, .2, -.1, .4, .15, .35, .05, .28, .12, .32, .18, .39][index],
  previousCtr: 6 + [0, .1, .05, .18, .08, .2, .1, .22, .12, .24, .14, .26][index],
  cvr: 6.4 + [0.1, -.1, .2, .3, .05, .35, .12, .42, .16, .38, .22, .47][index],
  previousCvr: 6.2 + [0, .04, .08, .12, .06, .14, .1, .16, .12, .18, .14, .2][index],
}))

const styleNames = ['保暖内衣套装', '无痕文胸', '德绒打底衫', '高腰收腹裤', '轻暖家居服', '男士保暖套装', '薄款防晒衣', '冰丝打底裤', '纯棉家居服', '运动文胸', '儿童秋衣套装', '无痕打底背心', '莫代尔睡衣', '女士塑形衣', '轻薄保暖背心', '男士家居裤', '羊毛打底衫', '儿童家居服', '蕾丝文胸', '纯棉打底衫']

export const styleRanking = styleNames.map((name, index) => ({
  name,
  net: Math.round(96 - index * 3.35 + (index % 3) * 1.4),
  impressions: Math.round(210 - index * 6.4 + (index % 4) * 8),
  clicks: Number((15.8 - index * .43 + (index % 3) * .4).toFixed(1)),
  qty: Math.round(1980 - index * 61 + (index % 4) * 50),
  ctr: Number((7.8 - index * .13 + (index % 4) * .16).toFixed(2)),
  cvr: Number((8.4 - index * .16 + (index % 3) * .2).toFixed(2)),
  refund: Number((5.8 + index * .18 + (index % 3) * .15).toFixed(2)),
  delta: Number((18 - index * 1.7 + (index % 4) * 2.1).toFixed(1)),
}))

let paretoCumulative = 0
const paretoTotal = styleRanking.reduce((sum, item) => sum + item.net, 0)
export const paretoData = styleRanking.slice(0, 15).map((item) => {
  paretoCumulative += item.net
  return { ...item, cumulative: Number((paretoCumulative / paretoTotal * 100).toFixed(1)) }
})

export const conversionFunnel = [
  { label: '曝光量', value: 28463000, display: '2,846.3万', conversion: '100%' },
  { label: '点击量', value: 1846000, display: '184.6万', conversion: '6.49%' },
  { label: '加购人数', value: 398000, display: '39.8万', conversion: '21.56%' },
  { label: '成交订单', value: 128400, display: '12.84万', conversion: '32.26%' },
]

export const quadrantData = styleRanking.map((item, index) => ({
  name: item.name,
  ctr: Number((4.4 + (index * .43) % 5.2).toFixed(2)),
  cvr: Number((3.6 + (index * .67) % 6.3).toFixed(2)),
  impressions: 32 + (index * 29) % 190,
  z: 30 + (index * 29) % 190,
}))

export const platformStructure = operationsPlatforms.map((platform, index) => ({
  platform,
  exposure: [34, 22, 13, 11, 12, 8][index],
  click: [38, 19, 12, 10, 13, 8][index],
  net: [42, 17, 11, 12, 10, 8][index],
  netValue: [540, 219, 141, 154, 129, 103][index],
  ctr: [7.12, 6.38, 5.91, 5.62, 6.04, 5.48][index],
  cvr: [7.86, 6.91, 6.42, 6.17, 5.88, 6.03][index],
  refund: [7.16, 8.02, 6.88, 8.74, 9.31, 7.62][index],
  unitPrice: [128, 112, 169, 136, 92, 148][index],
  cartRate: [22.4, 20.1, 18.7, 19.3, 17.9, 18.8][index],
  adCost: [82, 31, 18, 22, 19, 17][index],
  adRate: [12.8, 10.4, 9.8, 11.7, 8.9, 9.5][index],
}))

export const platformDailyNet = dates.map((date, day) => {
  const row: Record<string, string | number> = { date }
  operationsPlatforms.forEach((platform, index) => {
    row[platform] = Number((8 + index * 1.7 + day * .55 + ((day + index) % 4) * 1.2).toFixed(1))
  })
  return row
})

export const styleStatusData = [
  { name: '上升', value: 38, color: '#36B37E' },
  { name: '平稳', value: 54, color: '#378ADD' },
  { name: '下滑', value: 27, color: '#E5A642' },
  { name: '衰退', value: 16, color: '#D65745' },
  { name: '新品', value: 21, color: '#8067C7' },
]

export const netDistribution = [
  { bucket: '≤0', count: 9 },
  { bucket: '0~1千', count: 18 },
  { bucket: '1千~5千', count: 46 },
  { bucket: '5千~1万', count: 34 },
  { bucket: '1万~5万', count: 40 },
  { bucket: '>5万', count: 9 },
]

export const carrierData = [
  { name: '曝光占比', 商品卡: 31, 直播: 42, 短视频: 21, 图文: 6 },
  { name: '点击占比', 商品卡: 27, 直播: 38, 短视频: 28, 图文: 7 },
  { name: '成交占比', 商品卡: 34, 直播: 35, 短视频: 25, 图文: 6 },
]
