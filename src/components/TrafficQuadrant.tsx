import { CartesianGrid, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import { classifyTraffic, rate, trafficCounts, quadrantLabels, trafficThresholds, type trafficDemo } from '../data/trafficComparison'
import { defaultEnd, periodScope, type PeriodDays } from '../data/dashboardPeriods'
import ProductId from './ProductId'
import TopRankingDetails from './TopRankingDetails'

export default function TrafficQuadrant({ products, end = defaultEnd, days = 1 }: { products: typeof trafficDemo; end?: string; days?: PeriodDays }) {
  const scope = periodScope(end, days)
  const points = products.flatMap(product => {
    const selectedDays = product.days.filter(day => day.date >= scope.start && day.date <= end)
    const ctr = rate(selectedDays, 'ctr')
    const cvr = rate(selectedDays, 'cvr')
    const quadrant = classifyTraffic(ctr, cvr)
    const counts = trafficCounts(selectedDays)
    return quadrant && selectedDays.length === days ? [{ id: product.id, name: product.name, ctr: ctr!, cvr: cvr!, exposure: counts.exposure!, clicks: counts.clicks!, buyers: counts.buyers!, quadrant }] : []
  })
  const xMax = Math.max(12, ...points.map(point => point.ctr * 1.15))
  const yMax = Math.max(20, ...points.map(point => point.cvr * 1.15))
  return <article className="os-panel tq-panel" data-slot="card">
    <header data-slot="card-header"><h3 data-slot="card-title">点击率 × 成交率四象限</h3><p data-slot="card-description">{scope.label} · 周期累计比率 · CTR 阈值 6% · 点击成交率阈值 10% · 等于阈值归入高值</p></header>
    <div className="os-panel-body tq-layout" data-slot="card-content"><div className="tq-visual">
      <div className="tq-summary">{(['lowHigh', 'highHigh', 'lowLow', 'highLow'] as const).map(key => <div key={key}><strong>{quadrantLabels[key].name}<b>{points.filter(point => point.quadrant === key).length} 个</b></strong><small>{quadrantLabels[key].note}</small></div>)}</div>
      {points.length ? <div role="img" aria-label="商品四象限气泡图，横轴曝光点击率，纵轴点击成交率。商品明细提供完整数值。"><ResponsiveContainer width="100%" height={420}><ScatterChart margin={{ top: 16, right: 20, bottom: 24, left: 4 }}>
        <CartesianGrid stroke="var(--os-border)" strokeOpacity={0.45} />
        <XAxis dataKey="ctr" type="number" name="曝光点击率" domain={[0, xMax]} unit="%" tick={{ fill: 'var(--os-muted)', fontSize: 12 }} label={{ value: '曝光点击率 →', position: 'insideBottom', offset: -18, fill: 'var(--os-muted)' }} />
        <YAxis dataKey="cvr" type="number" name="点击成交率" domain={[0, yMax]} unit="%" tick={{ fill: 'var(--os-muted)', fontSize: 12 }} width={48} />
        <ZAxis dataKey="exposure" name="曝光人数" range={[70, 280]} />
        <ReferenceLine x={trafficThresholds.ctr} stroke="var(--os-purple)" strokeDasharray="5 5" />
        <ReferenceLine y={trafficThresholds.cvr} stroke="var(--os-purple)" strokeDasharray="5 5" />
        <Tooltip content={({ active, payload }) => { const point = payload?.[0]?.payload as typeof points[number] | undefined; return active && point ? <div className="tq-tooltip"><strong>{point.name}</strong><p>CTR {point.ctr.toFixed(2)}% · 点击成交率 {point.cvr.toFixed(2)}%</p><p>曝光 {point.exposure.toLocaleString()} · 点击 {point.clicks.toLocaleString()} · 成交 {point.buyers.toLocaleString()} 人</p><p>{quadrantLabels[point.quadrant].name}</p></div> : null }} />
        <Scatter data={points} fill="var(--os-blue)" fillOpacity={0.85} />
      </ScatterChart></ResponsiveContainer></div> : <p className="os-no-rows">没有可分类的商品。</p>}
      </div><div className="tq-details"><div className="tq-details-heading"><h4>商品明细</h4><span>按周期曝光人数降序 · 默认10条</span></div><TopRankingDetails preview={10} rows={[...points].sort((a, b) => b.exposure - a.exposure)} title="四象限商品明细" note={`${scope.label} · 按周期曝光人数降序 · 演示数据`}>{(items, offset) => <div className="os-table-scroll" role="region" aria-label="四象限商品明细，支持横向滚动" tabIndex={0}><table className="tq-table"><thead><tr><th scope="col">商品</th><th scope="col">曝光人数</th><th scope="col">点击人数</th><th scope="col">成交人数</th><th scope="col">CTR</th><th scope="col">点击成交率</th><th scope="col">象限</th></tr></thead><tbody>{items.map((point, index) => <tr key={point.id}><td><span className="os-rank-number">{offset + index + 1}</span>{point.name}<ProductId id={point.id} /></td><td>{point.exposure.toLocaleString("zh-CN")}</td><td>{point.clicks.toLocaleString("zh-CN")}</td><td>{point.buyers.toLocaleString("zh-CN")}</td><td><b>{point.ctr.toFixed(2)}%</b></td><td><b>{point.cvr.toFixed(2)}%</b></td><td>{quadrantLabels[point.quadrant].name}</td></tr>)}</tbody></table></div>}</TopRankingDetails></div>
    </div><footer data-slot="card-footer">演示数据 · 气泡面积表示曝光量 · 无效比率排除 {products.length - points.length} 个 · 象限仅用于排查，不代表因果结论</footer>
  </article>
}
