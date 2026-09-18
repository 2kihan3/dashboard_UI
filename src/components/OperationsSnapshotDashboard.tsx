import { useMemo, useState, type ReactNode } from 'react'
import { AlertTriangle, ArrowUpRight, Database, Filter, RotateCcw, Search, X } from 'lucide-react'
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import ProductMovement from './ProductMovement'
import Ranking from './CompactRanking'
import TrafficComparison from './TrafficComparison'
import { groupSnapshotProducts, operationsSnapshot as snapshot, snapshotGroupRanking, snapshotOwnerRanking, snapshotProducts, type ProductGrain } from '../data/operationsSnapshot'
import './OperationsSnapshotDashboard.css'

const amount = (value: number | null) => value === null ? '未采集' : value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
const compact = (value: number) => Math.abs(value) >= 10000 ? `${(value / 10000).toFixed(2)}万` : amount(value)
const axis = { tickLine: false, axisLine: false, tick: { fill: '#c4c4ce', fontSize: 13 } }
const tooltip = { background: '#26262e', border: '1px solid #54545f', borderRadius: 8, color: '#f4f4f7', fontSize: 14 }
type Metric = 'payment' | 'estimatedOrders'

// 沿用项目的 CSS-native Card，使用 shadcn 的 Header / Content / Footer 分层。
function Panel({ title, description, children, footer }: { title: string; description: string; children: ReactNode; footer?: ReactNode }) {
  return <article className="os-panel" data-slot="card"><header data-slot="card-header"><h3 data-slot="card-title">{title}</h3><p data-slot="card-description">{description}</p></header><div className="os-panel-body" data-slot="card-content">{children}</div>{footer && <footer data-slot="card-footer">{footer}</footer>}</article>
}
function Empty({ title, description }: { title: string; description: string }) {
  return <div className="os-empty"><Database aria-hidden="true" /><strong>{title}</strong><p>{description}</p></div>
}
export default function OperationsSnapshotDashboard() {
  const [search, setSearch] = useState('')
  const [owner, setOwner] = useState('全部')
  const [group, setGroup] = useState('全部')
  const [grain, setGrain] = useState<ProductGrain>('product')
  const [metric, setMetric] = useState<Metric>('payment')
  const [top, setTop] = useState(10)
  const [selected, setSelected] = useState('')
  const [teamGrain, setTeamGrain] = useState<'group' | 'owner'>('group')
  const [tableMode, setTableMode] = useState<'all' | 'unmatched' | 'missing'>('all')
  const rows = useMemo(() => snapshotProducts.filter((row) => (owner === '全部' || (owner === '未归因' ? !row.owner : row.owner === owner)) && (group === '全部' || row.group === group) && `${row.name} ${row.sku ?? ''} ${row.id}`.toLowerCase().includes(search.trim().toLowerCase())), [owner, group, search])
  const grouped = groupSnapshotProducts(rows, grain).sort((a, b) => (b[metric] ?? -1) - (a[metric] ?? -1))
  const ranking = grouped.filter((row) => row[metric] !== null).slice(0, top).map((row) => ({ name: row.name, value: Number(row[metric]), key: row.id, meta: [row.sku ?? '货号未匹配', row.owner ?? '未归因'].join(' · ') }))
  const detail = grouped.find((row) => row.id === selected)
  const visibleRows = grouped.filter((row) => tableMode === 'unmatched' ? !row.owner : tableMode === 'missing' ? row.spend === null : true)
  const spendRows = rows.filter((row) => row.spend !== null).map((row) => ({ ...row, spend: Number(row.spend) }))
  const sum = rows.reduce((value, row) => value + row.payment, 0)
  const reset = () => { setSearch(''); setOwner('全部'); setGroup('全部'); setSelected(''); setTableMode('all'); setGrain('product'); setMetric('payment'); setTop(10) }
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
    <div className="os-toolbar"><div className="os-filter-row"><span className="os-period">抖音 · 2026 年 8 月<small>页面快照范围固定，非实时查询</small></span><><label>展示粒度<select value={grain} onChange={(event) => { setGrain(event.target.value as ProductGrain); setSelected('') }}><option value="product">商品链接</option><option value="sku">原始货号</option></select></label><label>人员<select value={owner} onChange={(event) => { setOwner(event.target.value); setSelected('') }}><option>全部</option><option>未归因</option>{owners.map((name) => <option key={name}>{name}</option>)}</select></label><label>小组<select value={group} onChange={(event) => { setGroup(event.target.value); setSelected('') }}><option>全部</option>{groups.map((name) => <option key={name}>{name}</option>)}</select></label><label className="os-search">商品 / 货号 / ID<div><Search /><input aria-label="筛选快照商品" value={search} onChange={(event) => { setSearch(event.target.value); setSelected('') }} placeholder="输入关键词" /></div></label></><label>排序依据<select aria-label="商品排序依据" value={metric} onChange={(event) => { setMetric(event.target.value as Metric); setSelected('') }}><option value="payment">支付金额</option><option value="estimatedOrders">订单数（估算）</option></select></label><label>排名数量<select value={top} onChange={(event) => setTop(Number(event.target.value))}><option value={5}>Top 5</option><option value={10}>Top 10</option></select></label><button type="button" onClick={reset} className="os-reset"><RotateCcw />重置</button></div></div>
      <details className="os-coverage"><summary><AlertTriangle /><strong>数据覆盖不完整</strong><span>趋势覆盖 19 家店铺 · 08.01—08.03</span><b>54 条缺口提示</b></summary><div><p>原页面筛选范围为 08.01—08.31，但趋势标注仅覆盖 08.01—08.03。总览、商品排行和人员排行来自不同模块，不用同一个分母计算贡献。</p><ul><li>猫人MiiOW青荇童装专卖店 · 08.02 · 成交分析明细解析失败</li><li>猫人MiiOW橘鸢童装专卖店 · 08.01 · 成交分析明细解析失败</li><li>猫人朔耀内衣专卖店 · 08.01 · 成交分析明细解析失败</li></ul><p>这里展示已读取的提示样例；未导出完整 54 条日志。退款为 0 不代表缺口内也没有退款。</p></div></details>
      <><div className="os-section-label"><h2>经营概况</h2><span>全店铺原页面汇总 · 不随下方商品样本筛选变化</span></div><div className="os-kpis">{kpis.map((item) => <article key={item.label}><span>{item.label}</span><strong title={item.label === '成交金额 GMV' ? amount(snapshot.gmv) : undefined}>{item.value}<small>{item.unit}</small></strong><p>{item.note}</p></article>)}</div></>
      <ProductMovement metric={metric} search={search} owner={owner} group={group} />
      <TrafficComparison search={search} owner={owner} group={group} top={top} />
      <><div className="os-section-label"><h2>商品贡献与投放</h2><span>已读取商品排行 10 条 · 当前筛选 {rows.length} 条 · 支付金额 {compact(sum)} 元</span></div><div className="os-grid"><Panel title={metric === 'payment' ? '商品支付金额排名' : '商品订单数排名'} description="来自已读取的商品排行样本，不代表全量商品榜。点击商品查看对应明细。" footer="商品排行、明细和波动列表按顶部排序依据同步排列；订单数为估算值。"><Ranking title={metric === 'payment' ? '商品支付金额排名' : '商品订单数排名'} rows={ranking} onSelect={setSelected} unit={metric === "payment" ? "元" : "单（估算）"} /></Panel><Panel title="推广金额 × 支付金额" description="同商品两项金额对照。支付金额包含自然成交，不把比值称为广告 ROI。" footer={`${spendRows.length} 个匹配样本 · ${rows.length - spendRows.length} 个商品推广字段未采集`}>{spendRows.length ? <ResponsiveContainer width="100%" height={330}><ScatterChart margin={{ right: 12, top: 18, bottom: 18 }}><CartesianGrid stroke="#ffffff0d" /><XAxis type="number" dataKey="spend" name="推广金额" {...axis} tickFormatter={compact} label={{ value: '推广金额 / 元', position: 'insideBottom', offset: -12, fill: '#c4c4ce' }} /><YAxis type="number" dataKey="payment" name="支付金额" {...axis} width={66} tickFormatter={compact} /><Tooltip contentStyle={tooltip} formatter={(value, name) => [`${amount(Number(value))} 元`, name]} /><Scatter data={spendRows} fill="var(--os-purple)" onClick={(point) => { setGrain('product'); setSelected(`product:${point.payload?.id}`) }} /></ScatterChart></ResponsiveContainer> : <Empty title="缺少匹配投放数据" description="不把未采集的推广金额补成 0。" />}</Panel></div>
      {detail && <section className="os-detail" aria-label="选中商品明细"><header><div><span>已选商品 / 货号</span><h3>{detail.name}</h3></div><button type="button" aria-label="关闭商品明细" onClick={() => setSelected('')}><X /></button></header><dl><div><dt>支付金额</dt><dd>{amount(detail.payment)} 元</dd></div><div><dt>推广金额</dt><dd>{amount(detail.spend)}{detail.spend !== null && ' 元'}</dd></div><div><dt>估算订单数</dt><dd>{amount(detail.estimatedOrders)}</dd></div><div><dt>负责人</dt><dd>{detail.owner ?? '未归因'}</dd></div></dl><p>货号：{detail.sku ?? '未匹配'} · 小组：{detail.group ?? '未归因'} · {detail.count} 个商品样本。估算订单来自支付金额 / 成交笔单价，不用于人数转化率。</p></section>}
      <Panel title="商品明细" description="图表看规模，列表核对金额、货号与归属。名称为便于图表阅读的简称，ID 保留原值。"><div className="os-table-controls"><Filter /><button type="button" aria-pressed={tableMode === 'all'} onClick={() => setTableMode('all')}>全部样本</button><button type="button" aria-pressed={tableMode === 'unmatched'} onClick={() => setTableMode('unmatched')}>未归因</button><button type="button" aria-pressed={tableMode === 'missing'} onClick={() => setTableMode('missing')}>推广缺失</button><span>{visibleRows.length} 条</span></div><div className="os-table-scroll"><table><thead><tr><th>商品 / 原始货号</th><th>人员 / 小组</th><th>支付金额 / 元</th><th>推广金额 / 元</th><th>估算订单</th><th>退款金额 / 元</th><th>查看</th></tr></thead><tbody>{visibleRows.map((row) => <tr key={row.id}><td><strong>{row.name}</strong><small>{row.sku ?? '货号未匹配'}<br />{grain === 'product' ? row.id.replace('product:', '') : `${row.count} 个商品样本`}</small></td><td>{row.owner ?? '未归因'}<small>{row.group ?? '组别未匹配'}</small></td><td>{amount(row.payment)}</td><td>{amount(row.spend)}</td><td>{row.estimatedOrders}</td><td>{amount(row.refund)}</td><td><button type="button" aria-label={`查看${row.name}明细`} onClick={() => setSelected(row.id)}><ArrowUpRight /></button></td></tr>)}</tbody></table>{!visibleRows.length && <Empty title="没有匹配样本" description="可清除筛选或切换明细分类。" />}</div></Panel></>
      <><div className="os-section-label"><h2>经营归因</h2><div className="os-switch" aria-label="归因维度"><button type="button" aria-pressed={teamGrain === 'group'} onClick={() => setTeamGrain('group')}>小组</button><button type="button" aria-pressed={teamGrain === 'owner'} onClick={() => setTeamGrain('owner')}>个人</button></div></div><div className="os-grid"><Panel title={teamGrain === 'group' ? '小组支付金额排名' : '个人支付金额排名'} description={teamGrain === 'group' ? '一人多组时各组分别计入，仅比较排名，不计算占比。' : '按商品负责人归因，非人员实际广告产出。'}><Ranking title={teamGrain === 'group' ? '小组支付金额排名' : '个人支付金额排名'} rows={teamRows} /></Panel><Panel title="归因覆盖说明" description="未归因不代表没有成交。归属缺失与采集缺失应分别处理。"><div className="os-attribution"><span>个人未归因支付金额</span><strong>{snapshot.unattributedDisplay}<small> 元</small></strong><p>原页面展示值，未取得完整归因分母，不生成覆盖率或饼图。</p><div><span>一人多组</span><b>可能重复计入</b></div><div><span>未映射商品</span><b>不计入人员排行</b></div><div><span>达人账号归因</span><b>本次未提取</b></div></div></Panel></div><Panel title="归因明细" description="保留精确金额，不把 Top 10 合计当作全店铺总额。"><div className="os-table-scroll"><table><thead><tr><th>排名</th><th>{teamGrain === 'group' ? '小组' : '人员'}</th><th>支付金额 / 元</th></tr></thead><tbody>{teamRows.map((row, index) => <tr key={row.name}><td>{index + 1}</td><td>{row.name}</td><td>{amount(row.value)}</td></tr>)}</tbody></table></div></Panel></>
      <p className="os-footnote">来源：测试环境运营面板的可见页面快照 · 读取于 2026-09-17 · 未连接后端 / 未写入数据库 · 商品、流量与归因样本分别展示，不混算总额。</p>
  </div>
}
