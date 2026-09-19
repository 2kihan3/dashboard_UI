import { useState } from 'react'
import { Cell, CartesianGrid, LabelList, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'
import {  quadrantLabels, trafficThresholds, type trafficDemo } from '../data/trafficComparison'
import { defaultEnd, periodScope } from '../data/dashboardPeriods'
import { filterQuadrantPoints, quadrantSortLabels, quadrantPoints, quadrantScale, type QuadrantFilter, type QuadrantSort, type QuadrantPoint } from '../data/quadrantPoints'
import ProductId from './ProductId'
import TopRankingDetails from './TopRankingDetails'
import TimeWindowSwitch from './TimeWindowSwitch'
import { analysisWindows } from './timeWindowOptions'

function QuadrantChart({ points, scale, height = 420, activeId, onHover }: { points: QuadrantPoint[]; scale: ReturnType<typeof quadrantScale>; height?: number; activeId: string | null; onHover: (id: string | null) => void }) {
  if (!points.length) return <p className="os-no-rows">没有可分类的商品。</p>
  return <div role="img" aria-label={`商品四象限气泡图，共${points.length}个商品。横轴曝光点击率，纵轴点击成交率。点编号与商品明细排名对应。`}>
    <ResponsiveContainer width="100%" height={height}><ScatterChart margin={{ top: 24, right: 24, bottom: 24, left: 4 }}>
      <CartesianGrid stroke="var(--os-border)" strokeOpacity={0.45} />
      <XAxis dataKey="ctr" type="number" name="曝光点击率" domain={[0, scale.xMax]} unit="%" tick={{ fill: 'var(--os-muted)', fontSize: 12 }} label={{ value: '曝光点击率 →', position: 'insideBottom', offset: -18, fill: 'var(--os-muted)' }} />
      <YAxis dataKey="cvr" type="number" name="点击成交率" domain={[0, scale.yMax]} unit="%" tick={{ fill: 'var(--os-muted)', fontSize: 12 }} width={48} />
      <ZAxis dataKey="exposure" name="曝光人数" domain={[0, scale.exposureMax]} range={[70, 280]} />
      <ReferenceLine x={trafficThresholds.ctr} stroke="var(--os-purple)" strokeDasharray="5 5" />
      <ReferenceLine y={trafficThresholds.cvr} stroke="var(--os-purple)" strokeDasharray="5 5" />
      <Tooltip content={({ active, payload }) => {
        const point = payload?.[0]?.payload as QuadrantPoint | undefined
        return active && point ? <div className="tq-tooltip">
          <strong><span className="os-rank-number">#{point.rank}</span>{point.name}</strong>
          <dl className="tq-tooltip-fields">
            <div><dt>货号</dt><dd>{point.sku ?? '未匹配'}</dd></div>
            <div><dt>商品 ID</dt><dd>{point.id}</dd></div>
            <div><dt>负责人 / 小组</dt><dd>{point.owner ?? '未归因'} / {point.group ?? '未归因'}</dd></div>
            <div><dt>曝光 / 点击 / 成交</dt><dd>{point.exposure.toLocaleString('zh-CN')} / {point.clicks.toLocaleString('zh-CN')} / {point.buyers.toLocaleString('zh-CN')} 人</dd></div>
            <div><dt>CTR / 点击成交率</dt><dd>{point.ctr.toFixed(2)}% / {point.cvr.toFixed(2)}%</dd></div>
            <div><dt>象限</dt><dd>{quadrantLabels[point.quadrant].name}</dd></div>
          </dl>
        </div> : null
      }} />
      <Scatter data={points} fill="var(--os-blue)" fillOpacity={0.85} isAnimationActive={false} onMouseEnter={data => onHover(data.payload?.id ?? null)} onMouseLeave={() => onHover(null)}>
        {points.map(point => <Cell key={point.id} fill={activeId === point.id ? "var(--os-purple)" : "var(--os-blue)"} fillOpacity={activeId && activeId !== point.id ? 0.3 : 0.9} stroke={activeId === point.id ? "var(--os-purple)" : "none"} strokeWidth={2} />)}
        {points.length <= 20 && <LabelList dataKey="rank" position="top" fill="var(--os-muted)" fontSize={12} />}
      </Scatter>
    </ScatterChart></ResponsiveContainer>
  </div>
}

function QuadrantTable({ points, activeId, onHover }: { points: QuadrantPoint[]; activeId: string | null; onHover: (id: string | null) => void }) {
  if (!points.length) return <p className="os-no-rows">当前象限没有商品，请切换其他象限。</p>
  return <div className="os-table-scroll" role="region" aria-label="四象限商品明细，支持横向滚动" tabIndex={0}><table className="tq-table"><thead><tr><th scope="col">商品</th><th scope="col">曝光人数</th><th scope="col">点击人数</th><th scope="col">成交人数</th><th scope="col">CTR</th><th scope="col">点击成交率</th><th scope="col">象限</th></tr></thead><tbody>{points.map(point => <tr key={point.id} tabIndex={0} data-active={activeId === point.id} onMouseEnter={() => onHover(point.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(point.id)} onBlur={() => onHover(null)}>
    <td><span className="os-rank-number">{point.rank}</span>{point.name}<ProductId id={point.id} /><small className="tq-product-sku">货号：{point.sku ?? '未匹配'}</small></td><td>{point.exposure.toLocaleString('zh-CN')}</td><td>{point.clicks.toLocaleString('zh-CN')}</td><td>{point.buyers.toLocaleString('zh-CN')}</td><td><b>{point.ctr.toFixed(2)}%</b></td><td><b>{point.cvr.toFixed(2)}%</b></td><td>{quadrantLabels[point.quadrant].name}</td>
  </tr>)}</tbody></table></div>
}

export default function TrafficQuadrant({ products, end = defaultEnd }: { products: typeof trafficDemo; end?: string }) {
  const [days, setDays] = useState<1 | 7 | 14>(1)
  const [filter, setFilter] = useState<QuadrantFilter>('all')
  const [sort, setSort] = useState<QuadrantSort>('exposure')
  const [activeId, setActiveId] = useState<string | null>(null)
  const scope = periodScope(end, days)
  const source = quadrantPoints(products, end, days)
  const points = filterQuadrantPoints(source, filter, sort)
  const scale = quadrantScale(source)
  const controls = (label: string) => <div className="tq-controls">
    <div className="tq-filters" role="group" aria-label={label + '象限筛选'}>
      {(['all', 'lowHigh', 'highHigh', 'lowLow', 'highLow'] as const).map(key => <button type="button" key={key} aria-pressed={filter === key} onClick={() => { setFilter(key); setActiveId(null) }}>
        <strong>{key === 'all' ? '全部商品' : quadrantLabels[key].name}<b>{key === 'all' ? source.length : source.filter(point => point.quadrant === key).length}<small> 个</small></b></strong>
        <span>{key === 'all' ? '查看完整分布' : quadrantLabels[key].note}</span>
      </button>)}
    </div>
    <label className="tq-sort">排序<select aria-label={label + '排序指标'} value={sort} onChange={event => { setSort(event.target.value as QuadrantSort); setActiveId(null) }}>{Object.entries(quadrantSortLabels).map(([key, name]) => <option key={key} value={key}>{name}从高到低</option>)}</select></label>
  </div>
  const table = (items: QuadrantPoint[]) => <QuadrantTable points={items} activeId={activeId} onHover={setActiveId} />
  const chart = (items: QuadrantPoint[], height = 420) => <QuadrantChart points={items} scale={scale} height={height} activeId={items.some(point => point.id === activeId) ? activeId : null} onHover={setActiveId} />
  return <article className="os-panel tq-panel" data-slot="card">
    <header data-slot="card-header" className="tq-card-header"><div><h3 data-slot="card-title">点击率 × 成交率四象限</h3><p data-slot="card-description">{scope.label} · 周期累计比率 · CTR 阈值 6% · 点击成交率阈值 10% · 等于阈值归入高值</p></div><TimeWindowSwitch value={days} options={analysisWindows} label="四象限时间范围" onChange={setDays} /></header>
    <div className="os-panel-body" data-slot="card-content">{controls('看板')}<div className="tq-layout">
      <div className="tq-visual">{chart(points)}<p className="tq-chart-hint">悬停坐标点或商品行，可高亮对应商品</p></div>
      <div className="tq-details"><div className="tq-details-heading"><h4>商品明细</h4><span>{quadrantSortLabels[sort]}降序 · 默认10条</span></div>
        <TopRankingDetails preview={10} defaultPageSize={20} resetKey={[end, days, filter, sort].join(':')} rows={points} title="四象限商品明细" note={scope.label + ' · ' + quadrantSortLabels[sort] + '降序 · 演示数据'} modalControls={controls('弹窗')} renderModal={items => <div className="tq-modal-layout">
          <section className="tq-modal-chart"><div className="tq-details-heading"><h4>本页商品坐标</h4><span>{items.length ? '序号 ' + items[0].rank + '–' + items[items.length - 1].rank : '本页无商品'}</span></div>{chart(items, 360)}<p className="tq-chart-hint">仅显示当前页商品 · 翻页后坐标同步更新</p></section>
          <section className="tq-modal-table"><div className="tq-details-heading"><h4>商品明细</h4><span>{items.length} 个商品 · 编号与坐标对应</span></div>{table(items)}</section>
        </div>}>{items => table(items)}</TopRankingDetails>
      </div>
    </div></div><footer data-slot="card-footer">演示数据 · 气泡面积表示曝光量 · 无效比率排除 {Math.max(0, products.length - source.length)} 个 · 象限仅用于排查，不代表因果结论</footer>
  </article>
}
