import { compareTraffic, observationDate, trafficDemo, type TrafficMetric } from '../data/trafficComparison'

const percent = (value: number | null) => value === null ? '—' : `${value.toFixed(2)}%`
const metricLabels: Record<TrafficMetric, { title: string; formula: string }> = {
  ctr: { title: '曝光点击率', formula: '点击人数 ÷ 曝光人数' },
  cvr: { title: '点击成交率', formula: '成交人数 ÷ 点击人数' },
  exposureConversion: { title: '曝光成交率', formula: '成交人数 ÷ 曝光人数' },
}
function Reference({ value, current }: { value: number | null; current: number | null }) {
  const delta = value === null || current === null ? null : current - value
  return <div className="tc-reference"><strong>{percent(value)}</strong><small data-direction={delta === null ? 'missing' : delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat'}>{delta === null ? '数据不足' : `${delta > 0 ? '+' : ''}${delta.toFixed(2)} 个百分点`}</small></div>
}
export default function TrafficComparison({ search, owner, group, top }: { search: string; owner: string; group: string; top: number }) {
  const products = trafficDemo.filter(product => `${product.name} ${product.sku ?? ''} ${product.id}`.toLowerCase().includes(search.trim().toLowerCase()) && (owner === '全部' || (owner === '未归因' ? !product.owner : product.owner === owner)) && (group === '全部' || product.group === group)).slice(0, top)
  return <section className="tc-section" aria-label="流量效率时间对比">
    <div className="os-section-label"><h2>流量与承接</h2><span>观察日：{observationDate}（昨日） · 非实时数据</span></div>
    <p className="tc-note">布局演示数据 · 7天：09.10—09.16 · 14天：09.03—09.16，均不含昨日。基准按人数加权计算，不是每日比率的简单平均。</p>
    <div className="os-grid">{(['ctr', 'cvr', 'exposureConversion'] as TrafficMetric[]).map(metric => <article className="os-panel tc-panel" data-slot="card" key={metric}>
      <header data-slot="card-header"><h3 data-slot="card-title">{metricLabels[metric].title}</h3><p data-slot="card-description">{metricLabels[metric].formula} · 差值均为昨日减去参照值</p></header>
      <div data-slot="card-content" className="tc-content"><div className="tc-columns"><span>昨日 · 09.17</span><span>前天 · 09.16</span><span>7天基准</span><span>14天基准</span></div>
        {products.map(product => { const result = compareTraffic(product.days, observationDate, metric); const sample = result.sample; return <div className="tc-product" key={product.id}>
          <div className="tc-product-title"><strong>{product.name}</strong><span>{product.owner ?? '未归因'}</span></div>
          <div className="tc-values"><div className="tc-current"><strong>{percent(result.yesterday)}</strong><small>{metric === 'ctr' ? `曝光 ${sample?.exposure?.toLocaleString() ?? '—'} · 点击 ${sample?.clicks?.toLocaleString() ?? '—'}` : metric === 'cvr' ? `点击 ${sample?.clicks?.toLocaleString() ?? '—'} · 成交 ${sample?.buyers?.toLocaleString() ?? '—'}` : `曝光 ${sample?.exposure?.toLocaleString() ?? '—'} · 成交 ${sample?.buyers?.toLocaleString() ?? '—'}`} 人</small></div><Reference value={result.previous} current={result.yesterday} /><Reference value={result.seven} current={result.yesterday} /><Reference value={result.fourteen} current={result.yesterday} /></div>
        </div> })}
        {!products.length && <p className="os-no-rows">没有匹配商品，请调整顶部筛选。</p>}
      </div><footer data-slot="card-footer">演示商品样本 {products.length} 条 · 人数按日累计加权，非周期去重人数 · 缺失数据不补零</footer>
    </article>)}</div>
  </section>
}
