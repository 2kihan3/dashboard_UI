import { useState } from 'react'
import { rankTraffic, trafficSortLabels, type TrafficSort } from '../data/trafficRanking'
import { compareTraffic, type TrafficMetric, type TrafficCounts } from '../data/trafficComparison'
import { defaultEnd, periodTraffic, periodProducts, shiftDate } from '../data/dashboardPeriods'
import TrafficQuadrant from './TrafficQuadrant'
import ProductId from './ProductId'
import TopRankingDetails from './TopRankingDetails'

const percent = (value: number | null) => value === null ? '—' : `${value.toFixed(2)}%`
const metricLabels: Record<TrafficMetric, { title: string; formula: string }> = {
  ctr: { title: '曝光点击率', formula: '点击人数 ÷ 曝光人数' },
  cvr: { title: '点击成交率', formula: '成交人数 ÷ 点击人数' },
  exposureConversion: { title: '曝光成交率', formula: '成交人数 ÷ 曝光人数' },
}
function Counts({ counts, metric }: { counts: TrafficCounts; metric: TrafficMetric }) {
  const fields: [keyof TrafficCounts, string][] = metric === 'ctr' ? [['exposure', '曝光'], ['clicks', '点击']] : metric === 'cvr' ? [['clicks', '点击'], ['buyers', '成交']] : [['exposure', '曝光'], ['buyers', '成交']]
  return <dl className="tc-counts">{fields.map(([field, label]) => <div key={field}><dt>{label}</dt><dd>{counts[field] === null ? '—' : counts[field].toLocaleString('zh-CN')}<span> 人</span></dd></div>)}</dl>
}
function Reference({ value, current, counts, metric, label, rateLabel }: { value: number | null; current: number | null; counts: TrafficCounts; metric: TrafficMetric; label: string; rateLabel: string }) {
  const delta = value === null || current === null ? null : current - value
  return <div className="tc-reference"><span className="tc-mobile-period">{label}</span><div className="tc-delta" data-direction={delta === null ? 'missing' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'} aria-label={`${label}，基准日差值${delta === null ? '数据不足' : `${delta.toFixed(2)}个百分点`}`}><b>{delta === null ? '—' : `${delta > 0 ? '+' : ''}${delta.toFixed(2)}`}</b><span>{delta === null ? '数据不足' : '个百分点'}</span></div><div className="tc-baseline-rate"><span>{rateLabel}</span><strong>{percent(value)}</strong></div><Counts counts={counts} metric={metric} /></div>
}
export default function TrafficComparison({ search, owner, group, top, end = defaultEnd }: { search: string; owner: string; group: string; top: number; end?: string }) {
  const [sorts, setSorts] = useState<Record<TrafficMetric, TrafficSort>>({ ctr: 'rate', cvr: 'rate', exposureConversion: 'rate' })
  const dailyProducts = new Map(periodProducts(end, 1).map(row => [row.id, row]))
  const observationDate = end
  const dateLabel = (offset: number) => shiftDate(end, offset).slice(5).replace('-', '.')
  const products = periodTraffic(end).map(row => ({ ...row, payment: dailyProducts.get(row.id)!.payment, estimatedOrders: dailyProducts.get(row.id)!.estimatedOrders })).filter(product => `${product.name} ${product.sku ?? ''} ${product.id}`.toLowerCase().includes(search.trim().toLowerCase()) && (owner === '全部' || (owner === '未归因' ? !product.owner : product.owner === owner)) && (group === '全部' || product.group === group)).slice(0, 100)
  return <section className="tc-section" aria-label="流量效率时间对比">
    <div className="os-section-label"><h2>流量与承接</h2><span>业务日期：{observationDate}（观察基准） · 固定展示前一日、7日与14日参照</span></div>
    <p className="tc-note">演示数据 · 7天、14天参照均不含观察日，整体比率由周期累计人数计算。</p>
    <div className="os-grid tc-grid">{(['ctr', 'cvr', 'exposureConversion'] as TrafficMetric[]).map(metric => <article className="os-panel tc-panel" data-slot="card" key={metric}>
      <header data-slot="card-header" className="tc-card-heading"><div><h3 data-slot="card-title">{metricLabels[metric].title}</h3><p data-slot="card-description">{metricLabels[metric].formula} · 差值＝基准日比率－参照比率，单位为百分点</p></div><label>排序<select aria-label={`${metricLabels[metric].title}排序`} value={sorts[metric]} onChange={event => setSorts(current => ({ ...current, [metric]: event.target.value as TrafficSort }))}>{(Object.keys(trafficSortLabels) as TrafficSort[]).map(key => <option key={key} value={key}>{trafficSortLabels[key]} · 降序</option>)}</select></label></header>
      <div data-slot="card-content" className="tc-content"><TopRankingDetails key={`${metric}-${sorts[metric]}`} rows={rankTraffic(products, observationDate, metric, sorts[metric])} preview={top} title={metricLabels[metric].title} note={`${observationDate} · 按${trafficSortLabels[sorts[metric]]}降序 · 演示数据`}>{(items, offset) => <><div className="tc-columns"><span className="tc-product-column">商品<small>{trafficSortLabels[sorts[metric]]}降序</small></span><span>基准日<small>{dateLabel(0)} · 单日</small></span><span>对比前一日<small>{dateLabel(-1)} · 单日</small></span><span>对比7天<small>{dateLabel(-7)}—{dateLabel(-1)} · 累计</small></span><span>对比14天<small>{dateLabel(-14)}—{dateLabel(-1)} · 累计</small></span></div>
        {items.map((product, index) => { const result = compareTraffic(product.days, observationDate, metric); return <div className="tc-product" key={product.id}>
          <div className="tc-product-title"><div><strong><span className="os-rank-number">{offset + index + 1}</span>{product.name}</strong><ProductId id={product.id} /><small className="tc-product-meta">{product.estimatedOrders.toLocaleString("zh-CN")} 单 · ¥{product.payment.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}</small></div><span>{product.owner ?? '未归因'}</span></div>
          <div className="tc-values"><div className="tc-current"><span className="tc-mobile-period">基准日 · {dateLabel(0)}</span><div className="tc-observed-rate"><span>基准日比率</span><strong>{percent(result.yesterday)}</strong></div><span className="tc-observed-note">观察基准</span><Counts counts={result.counts.yesterday} metric={metric} /></div><Reference value={result.previous} current={result.yesterday} counts={result.counts.previous} metric={metric} label={`前一日 · ${dateLabel(-1)}`} rateLabel="前一日比率" /><Reference value={result.seven} current={result.yesterday} counts={result.counts.seven} metric={metric} label={`7天 · ${dateLabel(-7)}—${dateLabel(-1)}`} rateLabel="7天整体比率" /><Reference value={result.fourteen} current={result.yesterday} counts={result.counts.fourteen} metric={metric} label={`14天 · ${dateLabel(-14)}—${dateLabel(-1)}`} rateLabel="14天整体比率" /></div>
        </div> })}
        {!items.length && <p className="os-no-rows">没有匹配商品，请调整顶部筛选。</p>}
        </>}</TopRankingDetails>
      </div><footer data-slot="card-footer">{products.length} 个演示商品 · 基准日/前一日为单日人数，7/14天为按日累计人数，非周期去重 · 缺失显示“—”，不补零</footer>
    </article>)}<TrafficQuadrant key={end} products={products} end={end} /></div>
  </section>
}
