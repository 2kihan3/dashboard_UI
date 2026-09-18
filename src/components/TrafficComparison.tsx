import { compareTraffic, observationDate, trafficDemo, type TrafficMetric, type TrafficCounts } from '../data/trafficComparison'
import TrafficQuadrant from './TrafficQuadrant'

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
function Reference({ value, current, counts, metric, label }: { value: number | null; current: number | null; counts: TrafficCounts; metric: TrafficMetric; label: string }) {
  const delta = value === null || current === null ? null : current - value
  return <div className="tc-reference"><span className="tc-mobile-period">{label}</span><strong>{percent(value)}</strong><Counts counts={counts} metric={metric} /><small data-direction={delta === null ? 'missing' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'}>{delta === null ? '数据不足' : `${delta > 0 ? '+' : ''}${delta.toFixed(2)} 个百分点`}</small></div>
}
export default function TrafficComparison({ search, owner, group, top }: { search: string; owner: string; group: string; top: number }) {
  const products = trafficDemo.filter(product => `${product.name} ${product.sku ?? ''} ${product.id}`.toLowerCase().includes(search.trim().toLowerCase()) && (owner === '全部' || (owner === '未归因' ? !product.owner : product.owner === owner)) && (group === '全部' || product.group === group)).slice(0, top)
  return <section className="tc-section" aria-label="流量效率时间对比">
    <div className="os-section-label"><h2>流量与承接</h2><span>观察日：{observationDate}（昨日） · 非实时数据</span></div>
    <p className="tc-note">布局演示数据 · 7天：09.10—09.16 · 14天：09.03—09.16，均不含昨日。基准按人数加权计算，不是每日比率的简单平均。</p>
    <div className="os-grid">{(['ctr', 'cvr', 'exposureConversion'] as TrafficMetric[]).map(metric => <article className="os-panel tc-panel" data-slot="card" key={metric}>
      <header data-slot="card-header"><h3 data-slot="card-title">{metricLabels[metric].title}</h3><p data-slot="card-description">{metricLabels[metric].formula} · 差值均为昨日减去参照值</p></header>
      <div data-slot="card-content" className="tc-content"><div className="tc-columns"><span>昨日 · 09.17<small>单日人数</small></span><span>前天 · 09.16<small>单日人数</small></span><span>7天基准<small>周期累计 · 加权比率</small></span><span>14天基准<small>周期累计 · 加权比率</small></span></div>
        {products.map(product => { const result = compareTraffic(product.days, observationDate, metric); return <div className="tc-product" key={product.id}>
          <div className="tc-product-title"><strong>{product.name}</strong><span>{product.owner ?? '未归因'}</span></div>
          <div className="tc-values"><div className="tc-current"><span className="tc-mobile-period">昨日 · 09.17</span><strong>{percent(result.yesterday)}</strong><Counts counts={result.counts.yesterday} metric={metric} /></div><Reference value={result.previous} current={result.yesterday} counts={result.counts.previous} metric={metric} label="前天 · 09.16" /><Reference value={result.seven} current={result.yesterday} counts={result.counts.seven} metric={metric} label="7天 · 周期累计" /><Reference value={result.fourteen} current={result.yesterday} counts={result.counts.fourteen} metric={metric} label="14天 · 周期累计" /></div>
        </div> })}
        {!products.length && <p className="os-no-rows">没有匹配商品，请调整顶部筛选。</p>}
      </div><footer data-slot="card-footer">演示商品样本 {products.length} 条 · 人数按日累计加权，非周期去重人数 · 缺失数据不补零</footer>
    </article>)}<TrafficQuadrant products={products} /></div>
  </section>
}
