import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { sourceProductRanking, sourceSpendRanking, type SourceRankingRow } from '../data/sourceRankingSnapshot'

const money = (value: number | null | undefined) => value == null ? '—' : value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
function Product({ row }: { row: SourceRankingRow }) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(row.id); setCopied(true); setError(false) }
    catch { setError(true) }
  }
  return <div className="sr-product"><strong>{row.name}</strong><small>{row.sku && `货号 ${row.sku} · `}ID {row.id}<button type="button" aria-label={`复制商品 ID ${row.id}`} onClick={copy}>{copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</button><span role="status">{copied ? '已复制' : error ? '复制失败，请手动复制' : ''}</span></small></div>
}
export default function SourceRankingTables() {
  return <section className="sr-section" aria-label="测试环境源表">
    <div className="os-section-label"><h2>商品与推广源表</h2><span>2026.09.18 截图快照 · 各10条 · 未接入后端</span></div>
    {(['product', 'spend'] as const).map(kind => {
      const isProduct = kind === 'product'
      const title = isProduct ? '商品排行' : '推广金额排行'
      const rows = isProduct ? sourceProductRanking : sourceSpendRanking
      const columns = isProduct ? ['排名', '商品', '人员', '小组', '部门', '订单数', '支付金额', '占比', '推广金额', '退款金额'] : ['排名', '商品', '人员', '小组', '部门', '推广金额', '推广占比', '支付金额', '退款率']
      return <article key={kind} className="os-panel sr-panel" data-slot="card">
        <header data-slot="card-header"><h3 data-slot="card-title">{title}</h3><p data-slot="card-description">{isProduct ? '按用户支付金额汇总（罗盘成交分析-商品构成）· 订单数为折算值（支付金额/成交笔单价）' : '按商品投放消耗降序（罗盘商品列表-店铺投放口径，来自商品分析明细采集）· 占比为占全部商品推广消耗的比例'}</p></header>
        <div className="os-panel-body" data-slot="card-content"><div className="os-table-scroll" tabIndex={0} role="region" aria-label={`${title}，窄屏可横向滚动`}><table><caption className="sr-caption">{title} · 金额单位：元</caption><thead><tr>{columns.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row.id}>
          <td><span className="sr-rank" data-rank={index + 1}>{index + 1}</span></td><td><Product row={row} /></td><td>{row.owner ?? '—'}</td><td>{row.group ?? '—'}</td><td>{row.department ?? '—'}</td>
          {isProduct ? <><td className="sr-number">{row.orders}</td><td className="sr-number">{money(row.payment)}</td><td className="sr-number">{row.share.toFixed(1)}%</td><td className="sr-number">{money(row.spend)}</td><td className="sr-number sr-refund">{money(row.refund)}</td></> : <><td className="sr-number">{money(row.spend)}</td><td className="sr-number">{row.share.toFixed(1)}%</td><td className="sr-number">{money(row.payment)}</td><td className="sr-number">{row.refundRate?.toFixed(1)}%</td></>}
        </tr>)}</tbody></table></div></div>
        <footer data-slot="card-footer">截图原始顺序与占比保留 · 两个榜单独立展示 · “—”为未展示值，不补零 · 暂不计算 ROI</footer>
      </article>
    })}
  </section>
}
