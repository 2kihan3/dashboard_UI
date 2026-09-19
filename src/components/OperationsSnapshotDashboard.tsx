import { useState } from 'react'
import { AlertTriangle, RotateCcw, Search } from 'lucide-react'
import ProductMovement from './ProductMovement'
import TrafficComparison from './TrafficComparison'
import AmountTrendChart from './AmountTrendChart'
import SourceRankingTables from './SourceRankingTables'
import RankingAnalysisTables from './RankingAnalysisTables'
import AttributionRankingTable from './AttributionRankingTable'
import TimeWindowSwitch from './TimeWindowSwitch'
import { analysisWindows } from './timeWindowOptions'
import { snapshotProducts } from '../data/operationsSnapshot'
import { defaultEnd, periodProducts, periodScope, type ProductSort } from '../data/dashboardPeriods'
import type { AttributionGrain } from '../data/attributionRanking'
import './OperationsSnapshotDashboard.css'

const amount = (value: number | null) => value === null ? '未采集' : value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
const compact = (value: number) => Math.abs(value) >= 10000 ? `${(value / 10000).toFixed(2)}万` : amount(value)
type Metric = ProductSort

export default function OperationsSnapshotDashboard() {
  const [end, setEnd] = useState(defaultEnd)
  const [overviewDays, setOverviewDays] = useState<1 | 7 | 14>(1)
  const [rankingDays, setRankingDays] = useState<1 | 7 | 14>(1)
  const [attributionDays, setAttributionDays] = useState<1 | 7 | 14>(1)
  const [resetVersion, setResetVersion] = useState(0)
  const overviewScope = periodScope(end, overviewDays)
  const rankingScope = periodScope(end, rankingDays)
  const attributionScope = periodScope(end, attributionDays)
  const overviewProducts = periodProducts(end, overviewDays)
  const rankingProducts = periodProducts(end, rankingDays)
  const attributionProducts = periodProducts(end, attributionDays)
  const filterProducts = (rows: typeof rankingProducts) => rows.filter(row => `${row.name} ${row.sku ?? ''} ${row.id}`.toLowerCase().includes(search.trim().toLowerCase()) && (owner === '全部' || (owner === '未归因' ? !row.owner : row.owner === owner)) && (group === '全部' || row.group === group))
  const [search, setSearch] = useState('')
  const [owner, setOwner] = useState('全部')
  const [group, setGroup] = useState('全部')
  const [metric, setMetric] = useState<Metric>('payment')
  const [top, setTop] = useState(10)
  const [attributionGrain, setAttributionGrain] = useState<AttributionGrain>('owner')
  const reset = () => { setSearch(''); setOwner('全部'); setGroup('全部'); setMetric('payment'); setTop(10); setEnd(defaultEnd); setOverviewDays(1); setRankingDays(1); setAttributionDays(1); setAttributionGrain('owner'); setResetVersion(value => value + 1) }
  const owners = [...new Set(snapshotProducts.flatMap((row) => row.owner ? [row.owner] : []))]
  const groups = [...new Set(snapshotProducts.flatMap((row) => row.group ? [row.group] : []))]
  const products = filterProducts(rankingProducts)
  const sum = (field: 'payment' | 'estimatedOrders' | 'refund' | 'exposure' | 'clicks' | 'buyers') => overviewProducts.reduce((total,row)=>total+row[field],0)
  const snapshot = { gmv: sum('payment'), orders: sum('estimatedOrders'), refund: sum('refund'), spend: overviewProducts.reduce((total,row)=>total+(row.spend ?? 0),0), clickPeople: sum('clicks'), exposurePeople: sum('exposure'), cvrDisplay: `${(sum('buyers') / sum('clicks') * 100).toFixed(2)}%` }
  const previousTotal = (field: 'payment' | 'estimatedOrders' | 'refund' | 'exposure' | 'clicks' | 'buyers') => overviewProducts.reduce((total,row)=>total+row.previous[field],0)
  const growth = (current:number, previous:number) => previous > 0 ? (current / previous - 1) * 100 : null
  const kpis = [
    { label: '成交金额 GMV', value: compact(snapshot.gmv), unit: '元', note: '全部演示商品合计', change: growth(snapshot.gmv, previousTotal('payment')) },
    { label: '成交订单', value: amount(snapshot.orders), unit: '单', note: '日级演示订单累计', change: growth(snapshot.orders, previousTotal('estimatedOrders')) },
    { label: '退款金额', value: compact(snapshot.refund), unit: '元', note: '支付时间口径 · 演示', change: growth(snapshot.refund, previousTotal('refund')) },
    { label: '推广金额', value: compact(snapshot.spend), unit: '元', note: '缺失消耗不补零 · 已知消耗合计', change: growth(snapshot.spend, overviewProducts.reduce((sum,row)=>sum+(row.previous.spend ?? 0),0)) },
    { label: '曝光 → 点击率', value: `${(snapshot.clickPeople / snapshot.exposurePeople * 100).toFixed(1)}%`, unit: '', note: `${compact(snapshot.clickPeople)} / ${compact(snapshot.exposurePeople)} 人 · 按日累计，非周期去重` },
    { label: '点击 → 成交率', value: snapshot.cvrDisplay, unit: '', note: '成交人数 / 点击人数 · 周期整体比率' },
  ]
  return <div className="os-dashboard">
    <div className="os-toolbar"><div className="os-filter-row"><span className="os-period">抖音 · 运营看板<small>最新完整数据日 T-1 · 非实时</small></span><label>业务日期<input type="date" value={end} min="2026-09-01" max={defaultEnd} onChange={event => { const value = event.target.value; if (value >= "2026-09-01" && value <= defaultEnd) setEnd(value) }} /></label><><label>人员<select value={owner} onChange={(event) => { setOwner(event.target.value) }}><option>全部</option><option>未归因</option>{owners.map((name) => <option key={name}>{name}</option>)}</select></label><label>小组<select value={group} onChange={(event) => { setGroup(event.target.value) }}><option>全部</option>{groups.map((name) => <option key={name}>{name}</option>)}</select></label><label className="os-search">商品 / 货号 / ID<div><Search /><input aria-label="筛选快照商品" value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder="输入关键词" /></div></label></><label>排序依据<select aria-label="商品排序依据" value={metric} onChange={(event) => { setMetric(event.target.value as Metric) }}><option value="payment">支付金额</option><option value="estimatedOrders">订单数</option></select></label><label>看板条数<select value={top} onChange={(event) => setTop(Number(event.target.value))}><option value={5}>5 条</option><option value={10}>10 条</option></select></label><button type="button" onClick={reset} className="os-reset"><RotateCcw />重置</button></div></div>
      <details className="os-coverage"><summary><AlertTriangle /><strong>数据覆盖不完整</strong><span>趋势覆盖 19 家店铺 · 08.01—08.03</span><b>54 条缺口提示</b></summary><div><p>原页面筛选范围为 08.01—08.31，但趋势标注仅覆盖 08.01—08.03。总览、商品排行和人员排行来自不同模块，不用同一个分母计算贡献。</p><ul><li>猫人MiiOW青荇童装专卖店 · 08.02 · 成交分析明细解析失败</li><li>猫人MiiOW橘鸢童装专卖店 · 08.01 · 成交分析明细解析失败</li><li>猫人朔耀内衣专卖店 · 08.01 · 成交分析明细解析失败</li></ul><p>本区仅保留8月原快照提示，不受日期切换影响。这里展示已读取的提示样例；未导出完整 54 条日志。退款为 0 不代表缺口内也没有退款。</p></div></details>
      <><div className="os-section-label"><div><h2>经营概况</h2><span className="os-section-range">{overviewScope.label} 对比 {overviewScope.previousLabel}</span></div><TimeWindowSwitch value={overviewDays} options={analysisWindows} label="经营概况时间范围" onChange={setOverviewDays} /></div><div className="os-kpis">{kpis.map((item) => <article key={item.label}><span>{item.label}</span><strong title={item.label === '成交金额 GMV' ? amount(snapshot.gmv) : undefined}>{item.value}<small>{item.unit}</small></strong><p>{item.note}</p>{item.change !== undefined && <span className={item.change !== null && item.change < 0 ? "os-negative" : "os-positive"}>{item.change === null ? "无可比基数" : `${item.change > 0 ? "+" : ""}${item.change.toFixed(1)}%`} · 较上一等长周期</span>}</article>)}</div><AmountTrendChart key={`trend-${resetVersion}`} end={end} /></>
      <ProductMovement key={`movement-${end}-${resetVersion}`} search={search} owner={owner} group={group} end={end} />
      <TrafficComparison key={`${end}-${resetVersion}`} search={search} owner={owner} group={group} top={top} end={end} />
      <RankingAnalysisTables key={`rankings-${end}-${metric}`} rows={products} metric={metric} scope={rankingScope} top={top} days={rankingDays} onDaysChange={setRankingDays} />
      <details className="ra-source"><summary>查看原表对照 · 截图字段与原始顺序</summary><SourceRankingTables /></details>
      <><div className="os-section-label"><div><h2>经营归因</h2><span className="os-section-range">{attributionScope.label}</span></div><TimeWindowSwitch value={attributionDays} options={analysisWindows} label="经营归因时间范围" onChange={setAttributionDays} /></div><AttributionRankingTable rows={attributionProducts} grain={attributionGrain} onGrainChange={setAttributionGrain} scopeLabel={attributionScope.label} /></>
      <p className="os-footnote">时间切换使用独立日级演示数据 · 未连接后端 / 未写入数据库 · 原表对照和8月采集提示保持快照不变。</p>
  </div>
}
