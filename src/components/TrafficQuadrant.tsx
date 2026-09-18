import { CartesianGrid, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import { classifyTraffic, compareTraffic, observationDate, quadrantLabels, trafficThresholds, type trafficDemo } from '../data/trafficComparison'

export default function TrafficQuadrant({ products }: { products: typeof trafficDemo }) {
  const points = products.flatMap(product => {
    const ctr = compareTraffic(product.days, observationDate, 'ctr').yesterday
    const cvr = compareTraffic(product.days, observationDate, 'cvr').yesterday
    const quadrant = classifyTraffic(ctr, cvr)
    const sample = product.days.find(day => day.date === observationDate)
    return quadrant && sample ? [{ id: product.id, name: product.name, ctr: ctr!, cvr: cvr!, exposure: sample.exposure ?? 0, quadrant }] : []
  })
  const xMax = Math.max(12, ...points.map(point => point.ctr * 1.15))
  const yMax = Math.max(20, ...points.map(point => point.cvr * 1.15))
  return <article className="os-panel tq-panel" data-slot="card">
    <header data-slot="card-header"><h3 data-slot="card-title">点击率 × 成交率四象限</h3><p data-slot="card-description">昨日数据 · CTR 阈值 6% · 点击成交率阈值 10% · 等于阈值归入高值</p></header>
    <div className="os-panel-body" data-slot="card-content">
      <div className="tq-summary">{(['lowHigh', 'highHigh', 'lowLow', 'highLow'] as const).map(key => <div key={key}><strong>{quadrantLabels[key].name}<b>{points.filter(point => point.quadrant === key).length} 个</b></strong><small>{quadrantLabels[key].note}</small></div>)}</div>
      {points.length ? <div role="img" aria-label="商品四象限气泡图，横轴曝光点击率，纵轴点击成交率。下方表格提供完整数值。"><ResponsiveContainer width="100%" height={280}><ScatterChart margin={{ top: 16, right: 20, bottom: 24, left: 4 }}>
        <CartesianGrid stroke="var(--os-border)" strokeOpacity={0.45} />
        <XAxis dataKey="ctr" type="number" name="曝光点击率" domain={[0, xMax]} unit="%" tick={{ fill: 'var(--os-muted)', fontSize: 12 }} label={{ value: '曝光点击率 →', position: 'insideBottom', offset: -18, fill: 'var(--os-muted)' }} />
        <YAxis dataKey="cvr" type="number" name="点击成交率" domain={[0, yMax]} unit="%" tick={{ fill: 'var(--os-muted)', fontSize: 12 }} width={48} />
        <ZAxis dataKey="exposure" name="曝光人数" range={[70, 280]} />
        <ReferenceLine x={trafficThresholds.ctr} stroke="var(--os-purple)" strokeDasharray="5 5" />
        <ReferenceLine y={trafficThresholds.cvr} stroke="var(--os-purple)" strokeDasharray="5 5" />
        <Tooltip content={({ active, payload }) => { const point = payload?.[0]?.payload as typeof points[number] | undefined; return active && point ? <div className="tq-tooltip"><strong>{point.name}</strong><p>CTR {point.ctr.toFixed(2)}% · 点击成交率 {point.cvr.toFixed(2)}%</p><p>曝光 {point.exposure.toLocaleString()} 人 · {quadrantLabels[point.quadrant].name}</p></div> : null }} />
        <Scatter data={points} fill="var(--os-blue)" fillOpacity={0.85} />
      </ScatterChart></ResponsiveContainer></div> : <p className="os-no-rows">没有可分类的商品。</p>}
      <div className="os-table-scroll"><table><thead><tr><th>商品</th><th>CTR</th><th>点击成交率</th><th>象限</th></tr></thead><tbody>{points.map(point => <tr key={point.id}><td>{point.name}</td><td>{point.ctr.toFixed(2)}%</td><td>{point.cvr.toFixed(2)}%</td><td>{quadrantLabels[point.quadrant].name}</td></tr>)}</tbody></table></div>
    </div><footer data-slot="card-footer">演示数据 · 气泡面积表示曝光量 · 无效比率排除 {products.length - points.length} 个 · 象限仅用于排查，不代表因果结论</footer>
  </article>
}
