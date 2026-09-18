import { useState, type ReactNode } from 'react'
import { AlertTriangle, RotateCcw, Search } from 'lucide-react'
import ProductMovement from './ProductMovement'
import Ranking from './CompactRanking'
import TrafficComparison from './TrafficComparison'
import SourceRankingTables from './SourceRankingTables'
import RankingAnalysisTables from './RankingAnalysisTables'
import { operationsSnapshot as snapshot, snapshotGroupRanking, snapshotOwnerRanking, snapshotProducts } from '../data/operationsSnapshot'
import './OperationsSnapshotDashboard.css'

const amount = (value: number | null) => value === null ? '未采集' : value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
const compact = (value: number) => Math.abs(value) >= 10000 ? `${(value / 10000).toFixed(2)}万` : amount(value)
type Metric = 'payment' | 'estimatedOrders'

// 沿用项目的 CSS-native Card，使用 shadcn 的 Header / Content / Footer 分层。
function Panel({ title, description, children, footer }: { title: string; description: string; children: ReactNode; footer?: ReactNode }) {
  return <article className="os-panel" data-slot="card"><header data-slot="card-header"><h3 data-slot="card-title">{title}</h3><p data-slot="card-description">{description}</p></header><div className="os-panel-body" data-slot="card-content">{children}</div>{footer && <footer data-slot="card-footer">{footer}</footer>}</article>
}
export default function OperationsSnapshotDashboard() {
  const [search, setSearch] = useState('')
  const [owner, setOwner] = useState('全部')
  const [group, setGroup] = useState('全部')
  const [metric, setMetric] = useState<Metric>('payment')
  const [top, setTop] = useState(10)
  const [teamGrain, setTeamGrain] = useState<'group' | 'owner'>('group')
  const reset = () => { setSearch(''); setOwner('全部'); setGroup('全部'); setMetric('payment'); setTop(10) }
  const owners = [...new Set(snapshotProducts.flatMap((row) => row.owner ? [row.owner] : []))]
  const groups = [...new Set(snapshotProducts.flatMap((row) => row.group ? [row.group] : []))]
  const teamRows = (teamGrain === 'group' ? snapshotGroupRanking : snapshotOwnerRanking).slice(0, top)
  const kpis = [
    { label: '成交金额 GMV', value: compact(snapshot.gmv), unit: '元', note: '全店铺区间合计 · 原页面口径' },
    { label: '成交订单', value: amount(snapshot.orders), unit: '单', note: '全店铺订单数 · 非商品折算值' },
    { label: '退款金额', value: compact(snapshot.refund), unit: '元', note: '支付时间口径 · 非成熟批次退货' },
    { label: '推广金额', value: compact(snapshot.spend), unit: '元', note: '千川消耗 · 非赠款' },
    { label: '曝光 → 点击率', value: `${(snapshot.clickPeople / snapshot.exposurePeople * 100).toFixed(1)}%`, unit: '', note: `${compact(snapshot.clickPeople)} / ${compact(snapshot.exposurePeople)} 人 · 跨日去重待确认` },
    { label: '点击 → 成交率', value: snapshot.cvrDisplay, unit: '', note: '成交人数 / 点击人数 · 原页面展示值' },
  ]
  return <div className="os-dashboard">
    <div className="os-toolbar"><div className="os-filter-row"><span className="os-period">抖音 · 2026 年 8 月<small>页面快照范围固定，非实时查询</small></span><><label>人员<select value={owner} onChange={(event) => { setOwner(event.target.value) }}><option>全部</option><option>未归因</option>{owners.map((name) => <option key={name}>{name}</option>)}</select></label><label>小组<select value={group} onChange={(event) => { setGroup(event.target.value) }}><option>全部</option>{groups.map((name) => <option key={name}>{name}</option>)}</select></label><label className="os-search">商品 / 货号 / ID<div><Search /><input aria-label="筛选快照商品" value={search} onChange={(event) => { setSearch(event.target.value) }} placeholder="输入关键词" /></div></label></><label>排序依据<select aria-label="商品排序依据" value={metric} onChange={(event) => { setMetric(event.target.value as Metric) }}><option value="payment">支付金额</option><option value="estimatedOrders">订单数（估算）</option></select></label><label>排名数量<select value={top} onChange={(event) => setTop(Number(event.target.value))}><option value={5}>Top 5</option><option value={10}>Top 10</option></select></label><button type="button" onClick={reset} className="os-reset"><RotateCcw />重置</button></div></div>
      <details className="os-coverage"><summary><AlertTriangle /><strong>数据覆盖不完整</strong><span>趋势覆盖 19 家店铺 · 08.01—08.03</span><b>54 条缺口提示</b></summary><div><p>原页面筛选范围为 08.01—08.31，但趋势标注仅覆盖 08.01—08.03。总览、商品排行和人员排行来自不同模块，不用同一个分母计算贡献。</p><ul><li>猫人MiiOW青荇童装专卖店 · 08.02 · 成交分析明细解析失败</li><li>猫人MiiOW橘鸢童装专卖店 · 08.01 · 成交分析明细解析失败</li><li>猫人朔耀内衣专卖店 · 08.01 · 成交分析明细解析失败</li></ul><p>这里展示已读取的提示样例；未导出完整 54 条日志。退款为 0 不代表缺口内也没有退款。</p></div></details>
      <><div className="os-section-label"><h2>经营概况</h2><span>全店铺原页面汇总 · 不随下方商品样本筛选变化</span></div><div className="os-kpis">{kpis.map((item) => <article key={item.label}><span>{item.label}</span><strong title={item.label === '成交金额 GMV' ? amount(snapshot.gmv) : undefined}>{item.value}<small>{item.unit}</small></strong><p>{item.note}</p></article>)}</div></>
      <ProductMovement metric={metric} search={search} owner={owner} group={group} />
      <TrafficComparison search={search} owner={owner} group={group} top={top} />
      <RankingAnalysisTables />
      <details className="ra-source"><summary>查看原表对照 · 截图字段与原始顺序</summary><SourceRankingTables /></details>
      <><div className="os-section-label"><h2>经营归因</h2><div className="os-switch" aria-label="归因维度"><button type="button" aria-pressed={teamGrain === 'group'} onClick={() => setTeamGrain('group')}>小组</button><button type="button" aria-pressed={teamGrain === 'owner'} onClick={() => setTeamGrain('owner')}>个人</button></div></div><div className="os-grid"><Panel title={teamGrain === 'group' ? '小组支付金额排名' : '个人支付金额排名'} description={teamGrain === 'group' ? '一人多组时各组分别计入，仅比较排名，不计算占比。' : '按商品负责人归因，非人员实际广告产出。'}><Ranking title={teamGrain === 'group' ? '小组支付金额排名' : '个人支付金额排名'} rows={teamRows} /></Panel><Panel title="归因覆盖说明" description="未归因不代表没有成交。归属缺失与采集缺失应分别处理。"><div className="os-attribution"><span>个人未归因支付金额</span><strong>{snapshot.unattributedDisplay}<small> 元</small></strong><p>原页面展示值，未取得完整归因分母，不生成覆盖率或饼图。</p><div><span>一人多组</span><b>可能重复计入</b></div><div><span>未映射商品</span><b>不计入人员排行</b></div><div><span>达人账号归因</span><b>本次未提取</b></div></div></Panel></div><Panel title="归因明细" description="保留精确金额，不把 Top 10 合计当作全店铺总额。"><div className="os-table-scroll"><table><thead><tr><th>排名</th><th>{teamGrain === 'group' ? '小组' : '人员'}</th><th>支付金额 / 元</th></tr></thead><tbody>{teamRows.map((row, index) => <tr key={row.name}><td>{index + 1}</td><td>{row.name}</td><td>{amount(row.value)}</td></tr>)}</tbody></table></div></Panel></>
      <p className="os-footnote">来源：测试环境运营面板的可见页面快照 · 读取于 2026-09-17 · 未连接后端 / 未写入数据库 · 商品、流量与归因样本分别展示，不混算总额。</p>
  </div>
}
