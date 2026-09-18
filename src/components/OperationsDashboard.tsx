import { useMemo, useState } from 'react'
import OperationsSnapshotDashboard from './OperationsSnapshotDashboard'
import { ArrowDownRight, ArrowUpRight, Info } from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, LabelList, Legend, Line, LineChart,
  Pie, PieChart, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis,
} from 'recharts'
import {
  carrierData, conversionFunnel, netDistribution, operationsKpis, operationsPlatformColors, operationsPlatforms,
  operationsTrend, paretoData, platformDailyNet, platformStructure, quadrantData, styleRanking, styleStatusData,
} from '../data/operationsDashboardMock'

const tooltipStyle = { background: '#202022', border: '1px solid #444448', borderRadius: 8, color: '#ededf0', fontSize: 12 }
const axis = { tickLine: false, axisLine: false, stroke: '#85858c', fontSize: 10 }
const gridStroke = 'rgba(255,255,255,.07)'

type RankingMetric = 'net' | 'impressions' | 'clicks' | 'qty' | 'ctr' | 'cvr' | 'refund'
type EfficiencyMetric = 'ctr' | 'cvr' | 'refund' | 'unitPrice' | 'cartRate'

const rankingMetrics: Array<{ key: RankingMetric; label: string; unit: string }> = [
  { key: 'net', label: '净成交金额', unit: '万' }, { key: 'impressions', label: '曝光量', unit: '万' },
  { key: 'clicks', label: '点击量', unit: '万' }, { key: 'qty', label: '成交件数', unit: '件' },
  { key: 'ctr', label: '点击率', unit: '%' }, { key: 'cvr', label: '点击转化率', unit: '%' },
  { key: 'refund', label: '退款率', unit: '%' },
]

const efficiencyMetrics: Array<{ key: EfficiencyMetric; label: string; unit: string }> = [
  { key: 'ctr', label: '点击率', unit: '%' }, { key: 'cvr', label: '点击转化率', unit: '%' },
  { key: 'refund', label: '退款率', unit: '%' }, { key: 'unitPrice', label: '成交均价', unit: '元' },
  { key: 'cartRate', label: '加购率', unit: '%' },
]

function SectionHead({ code, title, description }: { code: string; title: string; description: string }) {
  return <header className="ops-section-head"><div><span>{code}</span><h2>{title}</h2></div><p>{description}</p></header>
}

function ChartCard({ title, subtitle, wide = false, actions, children }: { title: string; subtitle: string; wide?: boolean; actions?: React.ReactNode; children: React.ReactNode }) {
  return <article className={`ops-chart-card ${wide ? 'ops-chart-card--wide' : ''}`}><header><div><h3>{title}</h3><p>{subtitle}</p></div>{actions}</header><div className="ops-chart-card__body">{children}</div></article>
}

function MetricSwitch<T extends string>({ items, value, onChange }: { items: Array<{ key: T; label: string }>; value: T; onChange: (value: T) => void }) {
  return <div className="ops-metric-switch" role="group" aria-label="指标切换">{items.map((item) => <button type="button" className={value === item.key ? 'active' : ''} key={item.key} onClick={() => onChange(item.key)}>{item.label}</button>)}</div>
}

function KpiOverview() {
  return <div className="ops-kpi-grid">{operationsKpis.map((item) => {
    const positive = item.delta >= 0
    return <article className="ops-kpi-card" key={item.label}><span>{item.label}</span><strong>{item.value}</strong><footer className={positive ? 'is-up' : 'is-down'}>{positive ? <ArrowUpRight /> : <ArrowDownRight />}<b>{Math.abs(item.delta)}%</b><small>{item.note}</small></footer></article>
  })}</div>
}

function MainTrend() {
  const [metric, setMetric] = useState<'net' | 'impressions' | 'clicks' | 'ctr' | 'cvr'>('net')
  const meta = {
    net: { label: '净成交金额', unit: '万', previous: 'previousNet' }, impressions: { label: '曝光量', unit: '万', previous: 'previousImpressions' },
    clicks: { label: '点击量', unit: '万', previous: 'previousClicks' }, ctr: { label: '点击率', unit: '%', previous: 'previousCtr' },
    cvr: { label: '点击转化率', unit: '%', previous: 'previousCvr' },
  }[metric]
  return <ChartCard title="核心经营趋势" subtitle="本期实线 · 上期同等周期虚线" wide actions={<MetricSwitch items={[{ key: 'net', label: '净成交' }, { key: 'impressions', label: '曝光' }, { key: 'clicks', label: '点击' }, { key: 'ctr', label: '点击率' }, { key: 'cvr', label: '转化率' }]} value={metric} onChange={setMetric} />}>
    <ResponsiveContainer width="100%" height={300}><LineChart data={operationsTrend}><CartesianGrid stroke={gridStroke} strokeDasharray="4 6" vertical={false} /><XAxis dataKey="date" {...axis} /><YAxis {...axis} width={48} unit={meta.unit} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}${meta.unit}`, meta.label]} /><Legend wrapperStyle={{ fontSize: 11, color: '#96969c' }} /><Line type="monotone" dataKey={metric} name={`本期${meta.label}`} stroke="#378ADD" strokeWidth={2.5} dot={{ r: 2.5 }} /><Line type="monotone" dataKey={meta.previous} name={`上期${meta.label}`} stroke="#7f8996" strokeWidth={2} strokeDasharray="6 5" dot={false} /></LineChart></ResponsiveContainer>
  </ChartCard>
}

function StyleRanking() {
  const [metric, setMetric] = useState<RankingMetric>('net')
  const [topN, setTopN] = useState(10)
  const selected = rankingMetrics.find((item) => item.key === metric) ?? rankingMetrics[0]
  const data = useMemo(() => [...styleRanking].sort((a, b) => b[metric] - a[metric]).slice(0, topN), [metric, topN])
  return <ChartCard title="款号表现排名" subtitle="横向比较重点款号，末端标注较上期变化" actions={<select className="ops-select" value={topN} onChange={(event) => setTopN(Number(event.target.value))} aria-label="排名数量"><option value={10}>TOP 10</option><option value={20}>TOP 20</option></select>}>
    <MetricSwitch items={rankingMetrics.map(({ key, label }) => ({ key, label }))} value={metric} onChange={setMetric} />
    <ResponsiveContainer width="100%" height={390}><BarChart data={data} layout="vertical" margin={{ left: 18, right: 44 }}><CartesianGrid stroke={gridStroke} horizontal={false} /><XAxis type="number" {...axis} unit={selected.unit} /><YAxis type="category" dataKey="name" width={88} {...axis} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}${selected.unit}`, selected.label]} /><Bar dataKey={metric} fill="#378ADD" radius={[0, 4, 4, 0]}><LabelList dataKey="delta" position="right" formatter={(value) => `${Number(value) >= 0 ? '+' : ''}${value}%`} fill="#aeb1b8" fontSize={9} /></Bar></BarChart></ResponsiveContainer>
  </ChartCard>
}

function ParetoChart() {
  const contribution = paretoData[paretoData.length - 1]?.cumulative ?? 0
  return <ChartCard title="净成交金额帕累托" subtitle={`前 15 个款号贡献 ${contribution}%`}>
    <ResponsiveContainer width="100%" height={435}><ComposedChart data={paretoData} margin={{ bottom: 46 }}><CartesianGrid stroke={gridStroke} vertical={false} /><XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} height={70} {...axis} /><YAxis yAxisId="amount" {...axis} unit="万" width={46} /><YAxis yAxisId="percent" orientation="right" domain={[0, 100]} {...axis} unit="%" width={40} /><Tooltip contentStyle={tooltipStyle} /><Bar yAxisId="amount" dataKey="net" name="净成交金额" fill="#378ADD" radius={[3, 3, 0, 0]} /><Line yAxisId="percent" type="monotone" dataKey="cumulative" name="累计贡献" stroke="#E5A642" strokeWidth={2.4} dot={{ r: 3 }} /></ComposedChart></ResponsiveContainer>
  </ChartCard>
}

function FunnelChart() {
  const max = conversionFunnel[0].value
  return <ChartCard title="经营转化漏斗" subtitle="曝光 → 点击 → 加购 → 成交"><div className="ops-funnel">{conversionFunnel.map((item, index) => <div className="ops-funnel__row" key={item.label}><span>{item.label}</span><div><i style={{ width: `${Math.max(30, Math.sqrt(item.value / max) * 100)}%` }}><b>{item.display}</b></i></div><small>{index === 0 ? '起始流量' : `环节转化 ${item.conversion}`}</small></div>)}</div></ChartCard>
}

function ConversionTrend() {
  return <ChartCard title="点击与转化趋势" subtitle="双轴观察流量质量与承接效率"><ResponsiveContainer width="100%" height={300}><LineChart data={operationsTrend}><CartesianGrid stroke={gridStroke} strokeDasharray="4 6" vertical={false} /><XAxis dataKey="date" {...axis} /><YAxis yAxisId="ctr" domain={[5.5, 7]} {...axis} unit="%" width={42} /><YAxis yAxisId="cvr" orientation="right" domain={[6, 7.5]} {...axis} unit="%" width={42} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}%`} /><Legend wrapperStyle={{ fontSize: 11 }} /><Line yAxisId="ctr" type="monotone" dataKey="ctr" name="点击率" stroke="#378ADD" strokeWidth={2.4} dot={{ r: 2 }} /><Line yAxisId="cvr" type="monotone" dataKey="cvr" name="点击转化率" stroke="#36B37E" strokeWidth={2.4} dot={{ r: 2 }} /></LineChart></ResponsiveContainer></ChartCard>
}

function QuadrantChart() {
  return <ChartCard title="款号点击率 × 转化率诊断" subtitle="气泡面积代表曝光量；虚线为曝光加权均值" wide><div className="ops-quadrant-wrap"><span className="q-label q-label--tl">流量待优</span><span className="q-label q-label--tr">主推</span><span className="q-label q-label--bl">观察或砍</span><span className="q-label q-label--br">转化待优</span><ResponsiveContainer width="100%" height={360}><ScatterChart margin={{ top: 18, right: 24, bottom: 12, left: 10 }}><CartesianGrid stroke={gridStroke} /><XAxis type="number" dataKey="ctr" name="点击率" domain={[4, 10]} {...axis} unit="%" /><YAxis type="number" dataKey="cvr" name="转化率" domain={[3, 10]} {...axis} unit="%" /><ZAxis type="number" dataKey="z" range={[40, 360]} /><ReferenceLine x={6.8} stroke="#8f9298" strokeDasharray="5 5" /><ReferenceLine y={6.7} stroke="#8f9298" strokeDasharray="5 5" /><Tooltip cursor={{ strokeDasharray: '4 4' }} contentStyle={tooltipStyle} /><Scatter name="款号" data={quadrantData} fill="#378ADD" fillOpacity={.78} /></ScatterChart></ResponsiveContainer></div><p className="ops-chart-note"><Info />已排除曝光或点击为空、为 0 的款号 3 个；标签仅展示曝光量较高的款号。</p></ChartCard>
}

function PlatformShare() {
  const data = ['exposure', 'click', 'net'].map((key) => ({ name: key === 'exposure' ? '曝光占比' : key === 'click' ? '点击占比' : '净成交占比', ...Object.fromEntries(platformStructure.map((item) => [item.platform, item[key as 'exposure' | 'click' | 'net']])) }))
  return <ChartCard title="平台贡献结构" subtitle="结构占比用于比较来源，不代表绝对规模"><ResponsiveContainer width="100%" height={285}><BarChart data={data} layout="vertical" stackOffset="expand" margin={{ left: 12, right: 12 }}><XAxis type="number" domain={[0, 1]} tickFormatter={(value) => `${Math.round(value * 100)}%`} {...axis} /><YAxis type="category" dataKey="name" width={74} {...axis} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => `${Number(value).toFixed(1)}%`} /><Legend wrapperStyle={{ fontSize: 10 }} />{operationsPlatforms.map((item) => <Bar key={item} dataKey={item} stackId="share" fill={operationsPlatformColors[item]} />)}</BarChart></ResponsiveContainer></ChartCard>
}

function PlatformArea() {
  return <ChartCard title="平台净成交金额趋势" subtitle="按平台堆叠，观察增长来源"><ResponsiveContainer width="100%" height={285}><AreaChart data={platformDailyNet}><CartesianGrid stroke={gridStroke} vertical={false} /><XAxis dataKey="date" {...axis} /><YAxis {...axis} unit="万" width={44} /><Tooltip contentStyle={tooltipStyle} /><Legend wrapperStyle={{ fontSize: 10 }} />{operationsPlatforms.map((item) => <Area key={item} type="monotone" dataKey={item} stackId="net" stroke={operationsPlatformColors[item]} fill={operationsPlatformColors[item]} fillOpacity={.72} />)}</AreaChart></ResponsiveContainer></ChartCard>
}

function Heatmap() {
  const max = styleRanking[0].net
  return <ChartCard title="款号 × 平台表现热力图" subtitle="TOP 20 款号 · 净成交金额" wide><div className="ops-heatmap"><div className="ops-heatmap__head"><span>款号</span>{operationsPlatforms.map((platform) => <b key={platform}>{platform}</b>)}</div>{styleRanking.map((style, row) => <div className="ops-heatmap__row" key={style.name}><span>{style.name}</span>{operationsPlatforms.map((platform, column) => { const value = Math.max(0, Math.round(style.net * (.18 - column * .016 + ((row + column) % 4) * .014))); const opacity = .16 + value / max * 2.5; return <i key={platform} style={{ background: `rgba(55,138,221,${Math.min(.92, opacity)})` }}>{value}</i> })}</div>)}</div></ChartCard>
}

function StatusDonut() {
  const total = styleStatusData.reduce((sum, item) => sum + item.value, 0)
  return <ChartCard title="款号经营状态" subtitle="近 7 日与前 7 日表现对比"><div className="ops-donut"><ResponsiveContainer width="58%" height={285}><PieChart><Pie data={styleStatusData} dataKey="value" nameKey="name" innerRadius={68} outerRadius={98} paddingAngle={2}>{styleStatusData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer><div className="ops-donut__center"><strong>{total}</strong><span>款号总数</span></div><ul>{styleStatusData.map((item) => <li key={item.name}><i style={{ background: item.color }} /><span>{item.name}</span><b>{item.value}</b></li>)}</ul></div></ChartCard>
}

function EfficiencyChart() {
  const [metric, setMetric] = useState<EfficiencyMetric>('ctr')
  const selected = efficiencyMetrics.find((item) => item.key === metric) ?? efficiencyMetrics[0]
  const data = [...platformStructure].sort((a, b) => b[metric] - a[metric])
  return <ChartCard title="平台经营效率" subtitle="同口径横向比较，不混合缩放不同指标"><MetricSwitch items={efficiencyMetrics.map(({ key, label }) => ({ key, label }))} value={metric} onChange={setMetric} /><ResponsiveContainer width="100%" height={300}><BarChart data={data} layout="vertical" margin={{ right: 36 }}><XAxis type="number" {...axis} unit={selected.unit} /><YAxis type="category" dataKey="platform" {...axis} width={54} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}${selected.unit}`} /><Bar dataKey={metric} fill="#36B37E" radius={[0, 4, 4, 0]}><LabelList dataKey={metric} position="right" formatter={(value) => `${value}${selected.unit}`} fill="#b7bac0" fontSize={10} /></Bar></BarChart></ResponsiveContainer><p className="ops-chart-note"><Info />点击率与转化率仅统计具备有效流量链路的平台样本。</p></ChartCard>
}

function DistributionChart() {
  return <ChartCard title="款号净成交金额分布" subtitle="保留非正向净成交款号，识别长尾结构"><ResponsiveContainer width="100%" height={330}><BarChart data={netDistribution}><CartesianGrid stroke={gridStroke} vertical={false} /><XAxis dataKey="bucket" {...axis} /><YAxis {...axis} allowDecimals={false} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} 个`, '款号数']} /><Bar dataKey="count" fill="#8067C7" radius={[4, 4, 0, 0]}><LabelList dataKey="count" position="top" fill="#b9bbc2" fontSize={10} /></Bar></BarChart></ResponsiveContainer></ChartCard>
}

function CarrierChart() {
  const colors: Record<string, string> = { 商品卡: '#378ADD', 直播: '#D65745', 短视频: '#36B37E', 图文: '#E5A642' }
  return <ChartCard title="内容载体贡献结构" subtitle="抖音、快手等内容平台的流量与成交来源"><ResponsiveContainer width="100%" height={285}><BarChart data={carrierData} layout="vertical" stackOffset="expand"><XAxis type="number" domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} {...axis} /><YAxis type="category" dataKey="name" width={68} {...axis} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => `${value}%`} /><Legend wrapperStyle={{ fontSize: 10 }} />{Object.keys(colors).map((item) => <Bar key={item} dataKey={item} stackId="carrier" fill={colors[item]} />)}</BarChart></ResponsiveContainer></ChartCard>
}

function AdvertisingChart() {
  return <ChartCard title="广告投入与费率" subtitle="平台广告消耗及其占成交金额比例"><div className="ops-ad-summary"><span>广告消耗合计</span><strong>189.0 万</strong><small>广告费率 11.2%</small></div><ResponsiveContainer width="100%" height={230}><BarChart data={platformStructure} layout="vertical" margin={{ right: 42 }}><XAxis type="number" {...axis} unit="万" /><YAxis type="category" dataKey="platform" {...axis} width={52} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value} 万`, '广告消耗']} /><Bar dataKey="adCost" fill="#D65745" radius={[0, 4, 4, 0]}><LabelList dataKey="adRate" position="right" formatter={(value) => `${value}%`} fill="#c7c9ce" fontSize={10} /></Bar></BarChart></ResponsiveContainer></ChartCard>
}

export function LegacyOperationsDashboard() {
  return <div className="operations-dashboard" data-prd-anchor="operations-dashboard-mock">
    <section className="ops-section"><SectionHead code="A · OVERVIEW" title="经营总览" description="先看规模与效率，再判断变化来自流量、转化还是退款。" /><KpiOverview /><div className="ops-chart-grid"><MainTrend /></div></section>
    <section className="ops-section"><SectionHead code="B · RANKING" title="款号排名" description="聚焦贡献最大的款号，并观察头部集中度。" /><div className="ops-chart-grid"><StyleRanking /><ParetoChart /></div></section>
    <section className="ops-section"><SectionHead code="C · CONVERSION" title="转化诊断" description="沿曝光到成交链路定位损耗环节，再落到具体款号。" /><div className="ops-chart-grid"><FunnelChart /><ConversionTrend /><QuadrantChart /></div></section>
    <section className="ops-section"><SectionHead code="D · STRUCTURE" title="结构对比" description="从平台、款号和经营状态三个维度检查结构健康度。" /><div className="ops-chart-grid"><PlatformShare /><PlatformArea /><Heatmap /><StatusDonut /><EfficiencyChart /><DistributionChart /></div></section>
    <section className="ops-section"><SectionHead code="E · OPTIONAL" title="扩展经营视角" description="在具备载体和广告消耗字段时，补充内容贡献与投放效率。" /><div className="ops-chart-grid"><CarrierChart /><AdvertisingChart /></div></section>
  </div>
}

export default function OperationsDashboard() {
  return <OperationsSnapshotDashboard />
}
