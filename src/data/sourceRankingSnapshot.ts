// 用户提供的 2026-09-18 两张截图。两个榜单独立保存，不推算全量分母。
export interface SourceRankingRow {
  id: string; name: string; sku?: string; owner?: string; group?: string; department?: string
  orders?: number; payment: number; share: number; spend: number | null; refund?: number; refundRate?: number
}
const cottonWoman = { id: '3739848395423089014', name: '猫人不夹臀内裤女士纯棉100%全棉抗菌档透气中腰开叉少女生三角裤' }
const iceMan = { id: '3618904625081654802', name: '猫人冰丝男士内裤夏季薄款无痕新款宽松透气男款平角裤软黑色短裤' }
const cottonMan = { id: '3697551933226221726', name: '猫人男士纯棉内裤全棉100%大码抑菌短裤男款四角裤宽松透气平角裤', sku: 'YS-28006-WML724', owner: '王明亮', group: '男士内裤组', department: '抖音事业一部' }
const child = { id: '3824465964028789066', name: '猫人儿童防晒衣冰丝夏季防晒罩透气轻薄UPF50+防紫外线外套夏女童', sku: 'UPF50+ / KM-MRPT23-GJY', owner: '高佳怡', group: '儿童内裤组', department: '抖音事业一部' }
const manBrief = { id: '3761557721950847106', name: '猫人男士内裤纯棉男生防阴囊潮湿四角裤2026新款男生平角短裤男款', sku: 'MR8814-WML7.4', owner: '王明亮', group: '男士内裤组', department: '抖音事业一部' }
const nightdress = { id: '3827947754571825153', name: '猫人吊带睡衣女冰丝螺纹带胸垫免穿Bra可外穿防走光家居服背心夏', sku: '22M361-swq', owner: '申文琪', group: '家居服组', department: '抖音事业一部' }
const lowBra = { id: '3831320048992125004', name: '猫人低领半杯内衣女夏薄款小胸聚拢细肩带吊带低胸文胸', owner: '高亦栋', group: '女士内衣组', department: '抖音事业一部' }
const printed = { id: '3808337906641272869', name: '猫人冰丝男士内裤夏季男生印花四角裤男式大码男款平角裤2026新款', owner: '王明亮', group: '男士内裤组', department: '抖音事业一部' }
export const sourceProductRanking: SourceRankingRow[] = [
  { ...cottonWoman, orders: 374, payment: 10295.67, share: 1.7, spend: 1380.69, refund: 0 },
  { ...iceMan, orders: 150, payment: 7021.83, share: 1.1, spend: 900, refund: 0 },
  { ...cottonMan, orders: 149, payment: 6174.55, share: 1, spend: 1727.93, refund: 0 },
  { id: '3810524994165932422', name: '猫人丰胯安全裤女士高腰收腹无痕防走光打底假跨胯塑形服提臀内裤', orders: 173, payment: 5934.70, share: 1, spend: null, refund: 0 },
  { id: '3744644230866403787', name: '猫人连体塑身衣夏季超薄免穿文胸束腰美体无痕塑身衣强力提臀收腹', orders: 24, payment: 4860.10, share: .8, spend: .61, refund: 0 },
  { ...child, orders: 92, payment: 4286.42, share: .7, spend: 1422.44, refund: 0 },
  { id: '3816108017749983540', name: '猫人奶底液内衣女冰丝无痕隐形美背吊带文胸一体防走光背心夏薄款', sku: 'MR-HZ252C022-LXN-12', owner: '李秀年', group: '女士内衣组', department: '抖音事业一部', orders: 33, payment: 3489.38, share: .6, spend: 768.29, refund: 0 },
  { ...manBrief, orders: 69, payment: 3310.32, share: .5, spend: 1138.96, refund: 0 },
  { id: '3830404508027060248', name: '猫人低领无痕抹胸奶底液内衣女夏薄款小胸聚拢细肩带吊带低胸文胸', sku: 'MR-2668R-GYD', owner: '高亦栋', group: '女士内衣组', department: '抖音事业一部', orders: 33, payment: 3168.70, share: .5, spend: 1371.46, refund: 0 },
  { ...nightdress, orders: 37, payment: 3011.65, share: .5, spend: 1195.66, refund: 0 },
]
export const sourceSpendRanking: SourceRankingRow[] = [
  { ...cottonMan, payment: 6174.55, spend: 1727.93, share: 1.4, refundRate: 0 },
  { ...child, payment: 4286.42, spend: 1422.44, share: 1.1, refundRate: 0 },
  { ...cottonWoman, payment: 10295.67, spend: 1380.69, share: 1.1, refundRate: 0 },
  { ...sourceProductRanking[8], payment: 3168.70, spend: 1371.46, share: 1.1, refundRate: 0 },
  { ...nightdress, payment: 3011.65, spend: 1195.66, share: .9, refundRate: 0 },
  { ...manBrief, payment: 3310.32, spend: 1138.96, share: .9, refundRate: 0 },
  { id: '3813527768919048351', name: '猫人无痕收腹内裤女高腰强力收小肚子产后大码提臀裤夏季薄款新款', payment: 2439.44, spend: 1104.39, share: .9, refundRate: 0 },
  { ...lowBra, payment: 2704.23, spend: 1029.17, share: .8, refundRate: 0 },
  { id: '3815380888561254731', name: '猫人大肩带内衣女前扣扶副小胸聚拢防滑无痕软底液隐形美背文胸夏', owner: '高亦栋', group: '女士内衣组', department: '抖音事业一部', payment: 1504.20, spend: 1000, share: .8, refundRate: 0 },
  { ...printed, payment: 1711.66, spend: 947, share: .7, refundRate: 0 },
]
