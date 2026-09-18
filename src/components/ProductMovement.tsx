import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { movementPage, type MovementKind, type ProductMovementRow } from '../data/productMovements'

import { periodMovements, periodScope, sortProducts, type PeriodDays, type ProductSort } from '../data/dashboardPeriods'

const money = (n: number) => n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const labels = { new: '新增商品', down: '下滑商品' }
function MovementTable({ rows, kind, offset = 0 }: { rows: ProductMovementRow[]; kind: MovementKind; offset?: number }) {
  return <div className="os-table-scroll"><table><thead><tr><th>排名 / 商品</th><th>支付金额 / 元</th><th>订单数</th><th>支付变化</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.id}><td><strong><span className="os-rank-number">{offset + index + 1}</span>{row.name}</strong><small>{row.sku} · {row.owner ?? '未归因'}</small></td><td>{money(row.payment)}</td><td>{row.estimatedOrders}</td><td><span className={kind === 'new' ? 'os-positive' : 'os-negative'}>{kind === 'new' ? '新增成交' : `${((row.payment / row.previousPayment - 1) * 100).toFixed(1)}%`}</span><small>上一周期 {money(row.previousPayment)} 元</small></td></tr>)}</tbody></table>{!rows.length && <p className="os-no-rows">没有匹配商品，调整上方筛选后再查看。</p>}</div>
}
export default function ProductMovement({ metric, search, owner, group, end, days }: { metric: ProductSort; search: string; owner: string; group: string; end: string; days: PeriodDays }) {
  const [preview, setPreview] = useState(10)
  const [kind, setKind] = useState<MovementKind | null>(null)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const dialog = useRef<HTMLDialogElement>(null)
  const scope = periodScope(end, days)
  const demoMovements = periodMovements(end, days)
  const sortLabel = metric === 'payment' ? '支付金额' : metric === 'conversion' ? '点击成交率' : '订单数'
  const data = (key: MovementKind) => sortProducts(demoMovements[key].filter(row => (owner === '全部' || (owner === '未归因' ? !row.owner : row.owner === owner)) && (group === '全部' || row.group === group) && `${row.name} ${row.sku} ${row.id}`.toLowerCase().includes(search.trim().toLowerCase())), metric)
  const results = kind ? data(kind) : []
  const paged = movementPage(results, page, size)
  useEffect(() => {
    if (!kind) return
    const node = dialog.current
    node?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { node?.close(); document.body.style.overflow = overflow }
  }, [kind])
  const open = (key: MovementKind) => { setPage(1); setSize(10); setKind(key) }
  return <section className="os-movement" aria-label="商品数据波动">
    <div className="os-section-label"><h2>商品数据波动</h2><label>默认展示 <select aria-label="波动默认展示条数" value={preview} onChange={event => setPreview(Number(event.target.value))}><option value={5}>5 条</option><option value={10}>10 条</option></select></label></div>
    <p className="os-movement-note">{scope.label} 对比 {scope.previousLabel} · 独立虚拟商品样本，新增指上一周期无成交，本周期有成交；不计入概况。</p>
    <div className="os-grid">{(['new', 'down'] as const).map(key => { const rows = data(key); return <article className="os-panel" key={key}><header><h3>{labels[key]}<span className="os-count">{rows.length} 条</span></h3><p>{key === 'new' ? '上一周期无成交、本周期有成交' : '本周期支付金额低于上一周期'} · 按{sortLabel}降序</p></header><MovementTable rows={rows.slice(0, preview)} kind={key} /><footer className="os-more-footer"><span>展示前 {Math.min(preview, rows.length)} 条 / 最多 100 条</span><button type="button" disabled={!rows.length} onClick={() => open(key)}>查看更多</button></footer></article> })}</div>
    <dialog ref={dialog} className="os-movement-dialog" aria-labelledby="movement-title" aria-describedby="movement-description" onCancel={() => setKind(null)} onClose={() => setKind(null)} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setKind(null) } }}>
      {kind && <><header><div><h2 id="movement-title">{labels[kind]} TOP100</h2><p id="movement-description">虚拟数据 · {results.length} 条 · 按{sortLabel}降序</p></div><button type="button" aria-label="关闭波动明细" onClick={() => setKind(null)}><X /></button></header><MovementTable rows={paged.rows} kind={kind} offset={(paged.current - 1) * size} /><footer><label>每页 <select aria-label="波动每页条数" value={size} onChange={event => { setSize(Number(event.target.value)); setPage(1) }}><option value={10}>10 条</option><option value={20}>20 条</option><option value={50}>50 条</option></select></label><span role="status">第 {paged.current} / {paged.pages} 页，共 {results.length} 条</span><nav aria-label="波动列表分页"><button type="button" disabled={paged.current === 1} onClick={() => setPage(paged.current - 1)}>上一页</button>{Array.from({ length: paged.pages }, (_, index) => <button type="button" key={index} aria-current={paged.current === index + 1 ? 'page' : undefined} onClick={() => setPage(index + 1)}>{index + 1}</button>)}<button type="button" disabled={paged.current === paged.pages} onClick={() => setPage(paged.current + 1)}>下一页</button></nav></footer></>}
    </dialog>
  </section>
}
