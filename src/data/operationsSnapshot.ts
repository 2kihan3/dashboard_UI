// 2026-09-17 读取测试环境运营面板的可见值。不是全量导出，也不实时请求生产接口。
export const operationsSnapshot = {
  requestedStart: '2026-08-01', requestedEnd: '2026-08-31',
  coveredStart: '2026-08-01', coveredEnd: '2026-08-03', stores: 19, gaps: 54,
  orders: 251510, gmv: 12298884.56, refund: 4383883.28, spend: 1034595.97,
  exposurePeople: 80355418, clickPeople: 2885677, cvrDisplay: '0.8%',
  unattributedDisplay: '21.68万',
}
export interface SnapshotProduct {
  id: string; name: string; sku: string | null; owner: string | null; group: string | null
  payment: number; estimatedOrders: number; spend: number | null; refund: number | null
  sourceShare: number; exposurePeople?: number; clickPeople?: number
}
export const snapshotProducts: SnapshotProduct[] = [
  { id: '3739848395423089014', name: '女士纯棉抗菌三角裤', sku: null, owner: null, group: null, payment: 13750.70, estimatedOrders: 267, spend: 1380.69, refund: 0, sourceShare: 2.3 },
  { id: '3697551933226221726', name: '男士纯棉宽松平角裤', sku: 'YS-28006-WML724', owner: '王明亮', group: '男士内裤组', payment: 6993.94, estimatedOrders: 133, spend: 1727.93, refund: 0, sourceShare: 1.1 },
  { id: '3618904625081654802', name: '男士冰丝无痕平角裤', sku: null, owner: null, group: null, payment: 6852.96, estimatedOrders: 122, spend: 900, refund: 0, sourceShare: 1.1 },
  { id: '3810524994165932422', name: '女士高腰收腹安全裤', sku: null, owner: null, group: null, payment: 5844.29, estimatedOrders: 169, spend: null, refund: 0, sourceShare: 1, exposurePeople: 22544, clickPeople: 3802 },
  { id: '3831320048992125004', name: '女士低领无痕文胸', sku: 'MR-Y15Y9389-GYD', owner: '高亦栋', group: '女士内衣组', payment: 5256.20, estimatedOrders: 45, spend: 1029.17, refund: 0, sourceShare: .9 },
  { id: '3824465964028789066', name: '儿童冰丝防晒衣', sku: 'UPF50+ / KM-MRPT23-GJY', owner: '高佳怡', group: '儿童内裤组', payment: 4682.01, estimatedOrders: 92, spend: 1422.44, refund: 0, sourceShare: .8 },
  { id: '3818136324855169312', name: '女士带胸垫冰丝背心', sku: 'LX-MRA29-MGZ', owner: '慕广钊', group: '女士内衣组', payment: 3831.61, estimatedOrders: 43, spend: 599.21, refund: 0, sourceShare: .6 },
  { id: '3808337906641272869', name: '男士冰丝印花四角裤', sku: 'MRJ2504D-WML3.12', owner: '王明亮', group: '男士内裤组', payment: 3607.76, estimatedOrders: 32, spend: 947, refund: 0, sourceShare: .6 },
  { id: '3761557721950847106', name: '男士纯棉亲肤四角裤', sku: 'MR8814-WML7.4', owner: '王明亮', group: '男士内裤组', payment: 3133.83, estimatedOrders: 53, spend: 1138.96, refund: 0, sourceShare: .5 },
  { id: '3773800818462032144', name: '青少年纯棉四角裤', sku: 'MR1293-WML9.8', owner: '王明亮', group: '男士内裤组', payment: 3048.54, estimatedOrders: 37, spend: 900.37, refund: 0, sourceShare: .5 },
]
export const snapshotGroupRanking = [
  ['女士内衣组', 180865.21], ['男士内裤组', 55021.90], ['家居服组', 35025.58], ['儿童家居组', 28574.69],
  ['女士内裤组', 28217.70], ['全品类', 26207.72], ['少女文胸组', 24860.92], ['儿童内裤组', 12702.28], ['儿童组', 729.11], ['儿童二组', 530.90],
].map(([name, value]) => ({ name: String(name), value: Number(value) }))
export const snapshotOwnerRanking = [
  ['慕广钊', 56642.39], ['高亦栋', 53601.70], ['李秀年', 49026.51], ['王明亮', 35020.18], ['戴松涛', 26207.72],
  ['张士佳', 21378.01], ['黄梦萍', 18175.82], ['申文琪', 15333.54], ['刘嘉豪', 15023.43], ['周振扬', 13196.80],
].map(([name, value]) => ({ name: String(name), value: Number(value) }))
export const snapshotClickRanking = [
  { name: '男士超薄保暖套装', exposure: 3377, clicks: 796, payment: 0 },
  { name: '女士冰丝吊带睡袍', exposure: 102, clicks: 22, payment: 0 },
  { name: '女士无痕三角裤', exposure: 117, clicks: 24, payment: 0 },
  { name: '女士软支撑文胸', exposure: 246, clicks: 43, payment: 67.15 },
  { name: '女士高腰收腹安全裤', exposure: 22544, clicks: 3802, payment: 5844.29 },
  { name: '女士连体塑身衣', exposure: 120, clicks: 20, payment: 178.2 },
].map((row) => ({ ...row, rate: row.clicks / row.exposure * 100 }))
export const snapshotConversionRanking = [
  { name: '男士纯棉抗菌平角裤', clicks: 13, buyers: 5, payment: 310.5 },
  { name: '女士纯棉短袜', clicks: 212, buyers: 75, payment: 518.4 },
  { name: '男士莫代尔平角裤', clicks: 16, buyers: 5, payment: 116 },
  { name: '女士薄款收腹腰封', clicks: 16, buyers: 5, payment: 49 },
  { name: '男士冰丝家居套装', clicks: 10, buyers: 3, payment: 89 },
  { name: '孕妇低腰托腹内裤', clicks: 10, buyers: 3, payment: 53.1 },
].map((row) => ({ ...row, rate: row.buyers / row.clicks * 100 }))
export type ProductGrain = 'product' | 'sku'
export function groupSnapshotProducts(rows: SnapshotProduct[], grain: ProductGrain) {
  const groups = new Map<string, SnapshotProduct & { count: number }>()
  for (const row of rows) {
    // 无货号的商品不归并为一款；原始货号不擅自截断姓名或日期后缀。
    const key = grain === 'sku' && row.sku ? `sku:${row.sku}` : `product:${row.id}`
    const before = groups.get(key)
    if (!before) groups.set(key, { ...row, id: key, name: grain === 'sku' && row.sku ? row.sku : row.name, count: 1 })
    else {
      before.payment += row.payment; before.estimatedOrders += row.estimatedOrders; before.count++
      before.spend = before.spend === null || row.spend === null ? null : before.spend + row.spend
      before.refund = before.refund === null || row.refund === null ? null : before.refund + row.refund
      if (before.owner !== row.owner) before.owner = '多负责人'
      if (before.group !== row.group) before.group = '多小组'
    }
  }
  return [...groups.values()]
}
