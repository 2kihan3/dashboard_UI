import { useState } from 'react'
import { productAnalysisDemo, spendAnalysisDemo } from '../data/rankingAnalysisDemo'

const money = (value: number | null | undefined) => value == null ? '—' : value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const percentage = (value: number | null) => value === null ? '—' : `${(value * 100).toFixed(1)}%`
function Change({ value, unit = '%' }: { value: number | null; unit?: string }) {
  return <small className="ra-change" data-direction={value === null ? 'missing' : value > 0 ? 'up' : value < 0 ? 'down' : 'flat'}>{value === null ? '对比数据不足' : `${value > 0 ? '+' : ''}${value.toFixed(1)}${unit}`}</small>
}
export default function RankingAnalysisTables() {
  const [sort, setSort] = useState<'payment' | 'orders'>('payment')
  const products = [...productAnalysisDemo].sort((a, b) => sort === 'payment' ? b.payment - a.payment : b.demo.totalOrders - a.demo.totalOrders)
  return <section className="sr-section" aria-label="商品销售与投放分析">
    <div className="os-section-label"><h2>商品销售与投放分析</h2><span>销售看贡献 · 投放看效率</span></div>
    <p className="ra-demo-note">设计演示：支付金额、推广金额、原始占比来自截图；推广归因、实际订单与历史对比为模拟数据。不是实际经营结论，不受顶部日期筛选影响。</p>
    <article className="os-panel sr-panel ra-panel" data-slot="card">
      <header data-slot="card-header"><div className="ra-heading"><div><h3 data-slot="card-title">商品排行 <span>销售贡献与成交结构</span></h3><p data-slot="card-description">看销售规模，以及其中多少成交依赖推广。</p></div><label>排序<select aria-label="销售商品排行排序" value={sort} onChange={event => setSort(event.target.value as typeof sort)}><option value="payment">支付金额</option><option value="orders">实际订单（演示）</option></select></label></div></header>
      <div className="os-panel-body" data-slot="card-content"><div className="os-table-scroll" role="region" tabIndex={0} aria-label="商品销售贡献表，支持横向滚动"><table><thead><tr>{['排名', '商品 / 归属', '订单数¹', '支付金额', '销售占比', '推广订单占比¹', '推广金额占比¹', '退款金额'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{products.map((row, index) => <tr key={row.id}>
        <td><span className="sr-rank" data-rank={index + 1}>{index + 1}</span></td><td><strong>{row.name}</strong><small>{row.sku ?? `ID ${row.id}`} · {row.owner ?? '未归因'} / {row.group ?? '—'}</small></td><td className="sr-number">{row.demo.totalOrders}<small>实际订单 · 演示</small></td><td className="sr-number"><b>{money(row.payment)}</b></td><td className="sr-number">{row.share.toFixed(1)}%</td><td className="sr-number"><b className="ra-emphasis">{percentage(row.demo.orderShare)}</b><small>{row.demo.paidOrders} / {row.demo.totalOrders} 单</small></td><td className="sr-number">{percentage(row.demo.paymentShare)}<small>推广成交 {money(row.demo.paidPayment)} 元</small></td><td className="sr-number sr-refund">{money(row.refund)}</td>
      </tr>)}</tbody></table></div></div>
      <footer data-slot="card-footer">金额单位：元 · ¹演示字段 · 推广订单占比＝归因订单÷实际总订单，不使用原表折算订单 · 推广金额占比＝归因支付金额÷总支付金额 · 自然与推广未覆盖部分不自动归为自然成交</footer>
    </article>
    <article className="os-panel sr-panel ra-panel" data-slot="card">
      <header data-slot="card-header"><h3 data-slot="card-title">推广金额排行 <span>预算分配与投放效率</span></h3><p data-slot="card-description">按消耗降序，看预算流向、归因产出，以及花费增加时效率是否下降。</p></header>
      <div className="os-panel-body" data-slot="card-content"><div className="os-table-scroll" role="region" tabIndex={0} aria-label="商品投放效率表，支持横向滚动"><table><thead><tr>{['排名', '商品 / 归属', '推广消耗', '消耗占比', '归因成交金额¹', '投放 ROI¹', '推广订单成本¹', '消耗变化¹ / ROI变化¹'].map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{spendAnalysisDemo.map((row, index) => {
        const roiDelta = row.demo.roi === null ? null : row.demo.roi - row.demo.previousRoi
        const warning = row.demo.spendChange !== null && row.demo.spendChange > 0 && roiDelta !== null && roiDelta < 0
        return <tr key={row.id}><td><span className="sr-rank" data-rank={index + 1}>{index + 1}</span></td><td><strong>{row.name}</strong><small>{row.sku ?? `ID ${row.id}`} · {row.owner ?? '未归因'} / {row.group ?? '—'}</small></td><td className="sr-number"><b>{money(row.spend)}</b></td><td className="sr-number">{row.share.toFixed(1)}%</td><td className="sr-number">{money(row.demo.paidPayment)}</td><td className="sr-number"><b className="ra-emphasis">{money(row.demo.roi)}</b><small>归因金额 ÷ 消耗</small></td><td className="sr-number">{money(row.demo.cost)}<small>元 / 推广订单</small></td><td className="sr-number"><div className="ra-comparison"><span>消耗</span><Change value={row.demo.spendChange === null ? null : row.demo.spendChange * 100} /><span>ROI</span><Change value={roiDelta} unit="" /></div>{warning && <small className="ra-warning">消耗增加 · 效率下降</small>}</td></tr>
      })}</tbody></table></div></div>
      <footer data-slot="card-footer">¹归因与对比均为演示 · 对比上一个等长区间，不是累计金额与单日比较 · ROI变化为绝对差值，非百分点 · 未设置盈亏阈值，不把高低 ROI 直接判定为盈利或亏损</footer>
    </article>
  </section>
}
