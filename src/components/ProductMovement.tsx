import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { movementPage, type MovementKind, type MovementMetric, type ProductMovementRow } from '../data/productMovements'

import { periodMovements, periodScope } from '../data/dashboardPeriods'
import TimeWindowSwitch from './TimeWindowSwitch'
import { analysisWindows } from './timeWindowOptions'

const money = (n: number) => n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const labels = { up: '增长商品', down: '下滑商品' }
const sortLabels = { paymentChange: '支付金额变化率', ordersChange: '订单变化率' }
const changeRate = (row: ProductMovementRow, metric: MovementMetric) => metric === 'paymentChange' ? row.payment / row.previousPayment - 1 : row.estimatedOrders / row.previousOrders - 1
function MovementTable({ rows, offset = 0 }: { rows: ProductMovementRow[]; offset?: number }) {
  return <div className="os-table-scroll"><table><thead><tr><th>排名 / 商品</th><th>支付金额 / 元</th><th>订单数</th><th>支付金额变化率</th><th>订单变化率</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.id}><td><strong><span className="os-rank-number">{offset + index + 1}</span>{row.name}</strong><small>{row.sku} · {row.owner ?? '未归因'}</small></td><td>{money(row.payment)}</td><td>{row.estimatedOrders}</td><td><span className={row.payment >= row.previousPayment ? 'os-positive' : 'os-negative'}>{`${((row.payment / row.previousPayment - 1) * 100).toFixed(1)}%`}</span><small>上一周期 {money(row.previousPayment)} 元</small></td><td><span className={row.estimatedOrders >= row.previousOrders ? 'os-positive' : 'os-negative'}>{`${((row.estimatedOrders / row.previousOrders - 1) * 100).toFixed(1)}%`}</span><small>上一周期 {row.previousOrders} 单</small></td></tr>)}</tbody></table>{!rows.length && <p className="os-no-rows">当前指标下没有匹配商品。</p>}</div>
}
export default function ProductMovement({ search, owner, group, end }: { search: string; owner: string; group: string; end: string }) {
  const [days, setDays] = useState<1 | 7 | 14>(1)
  const [preview, setPreview] = useState(10)
  const [kind, setKind] = useState<MovementKind | null>(null)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [sorts, setSorts] = useState<Record<MovementKind, MovementMetric>>({ up: 'paymentChange', down: 'paymentChange' })
  const dialog = useRef<HTMLDialogElement>(null)
  const scope = periodScope(end, days)
  const demoMovements = periodMovements(end, days)
  const data = (key: MovementKind) => {
    const selected = sorts[key]
    return [...demoMovements.up, ...demoMovements.down].filter(row => {
      const previous = selected === 'paymentChange' ? row.previousPayment : row.previousOrders
      const rate = previous > 0 ? changeRate(row, selected) : 0
      return previous > 0 && (key === 'up' ? rate > 0 : rate < 0) && (owner === '全部' || (owner === '未归因' ? !row.owner : row.owner === owner)) && (group === '全部' || row.group === group) && `${row.name} ${row.sku} ${row.id}`.toLowerCase().includes(search.trim().toLowerCase())
    }).sort((a, b) => Math.abs(changeRate(b, selected)) - Math.abs(changeRate(a, selected)) || a.id.localeCompare(b.id)).slice(0, 100)
  }
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
    <div className="os-section-label"><div><h2>商品数据波动</h2><span className="os-section-range">{scope.label} 对比 {scope.previousLabel}</span></div><div className="os-section-actions"><TimeWindowSwitch value={days} options={analysisWindows} label="商品波动时间范围" onChange={value => { setDays(value); setPage(1) }} /><label>展示 <select aria-label="波动默认展示条数" value={preview} onChange={event => setPreview(Number(event.target.value))}><option value={5}>5 条</option><option value={10}>10 条</option></select></label></div></div>
    <p className="os-movement-note">按所选指标重新判断增长或下滑，零基数数据不进入变化率排行；不计入概况。</p>
    <div className="os-grid">{(['up', 'down'] as const).map(key => { const rows = data(key); const sort = sorts[key]; return <article className="os-panel" key={key}><header className="os-movement-head"><div><h3>{labels[key]}<span className="os-count">{rows.length} 条</span></h3><p>按{sortLabels[sort]}{key === 'up' ? '从高到低' : '按跌幅从大到小'}排列</p></div><label>排序<select aria-label={`${labels[key]}排序指标`} value={sort} onChange={event => { setSorts(current => ({ ...current, [key]: event.target.value as MovementMetric })); setPage(1) }}><option value="paymentChange">支付金额变化率</option><option value="ordersChange">订单变化率</option></select></label></header><MovementTable rows={rows.slice(0, preview)} /><footer className="os-more-footer"><span>展示前 {Math.min(preview, rows.length)} 条 / 最多 100 条</span><button type="button" disabled={!rows.length} onClick={() => open(key)}>查看更多</button></footer></article> })}</div>
    <dialog ref={dialog} className="os-movement-dialog" aria-labelledby="movement-title" aria-describedby="movement-description" onCancel={() => setKind(null)} onClose={() => setKind(null)} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) setKind(null) } }}>
      {kind && <><header><div><h2 id="movement-title">{labels[kind]} TOP100</h2><p id="movement-description">虚拟数据 · {results.length} 条 · 按{sortLabels[sorts[kind]]}{kind === 'up' ? '从高到低' : '按跌幅从大到小'}</p></div><button type="button" aria-label="关闭波动明细" onClick={() => setKind(null)}><X /></button></header><MovementTable rows={paged.rows} offset={(paged.current - 1) * size} /><footer><label>每页 <select aria-label="波动每页条数" value={size} onChange={event => { setSize(Number(event.target.value)); setPage(1) }}><option value={10}>10 条</option><option value={20}>20 条</option><option value={50}>50 条</option></select></label><span role="status">第 {paged.current} / {paged.pages} 页，共 {results.length} 条</span><nav aria-label="波动列表分页"><button type="button" disabled={paged.current === 1} onClick={() => setPage(paged.current - 1)}>上一页</button>{Array.from({ length: paged.pages }, (_, index) => <button type="button" key={index} aria-current={paged.current === index + 1 ? 'page' : undefined} onClick={() => setPage(index + 1)}>{index + 1}</button>)}<button type="button" disabled={paged.current === paged.pages} onClick={() => setPage(paged.current + 1)}>下一页</button></nav></footer></>}
    </dialog>
  </section>
}
