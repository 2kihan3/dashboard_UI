import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

interface RankingRow { name: string; value: number; key?: string; meta?: string }
export default function CompactRanking({ rows, onSelect, unit = '元', title = '排行榜' }: { rows: RankingRow[]; onSelect?: (key: string) => void; unit?: string; title?: string }) {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const pages = Math.max(1, Math.ceil(rows.length / 5))
  const current = Math.min(page, pages)
  useEffect(() => {
    if (!open) return
    const node = dialog.current
    node?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { node?.close(); document.body.style.overflow = overflow }
  }, [open])
  const list = (items: RankingRow[], offset = 0) => <ol className="os-ranking-list" start={offset + 1}>{items.map((row, index) => {
    const content = <><span className="os-ranking-position" data-leading={offset + index < 3}>{String(offset + index + 1).padStart(2, '0')}</span><span className="os-ranking-name"><strong>{row.name}</strong>{row.meta && <small>{row.meta}</small>}</span><span className="os-ranking-value"><strong>{row.value.toLocaleString('zh-CN', { minimumFractionDigits: unit === '元' ? 2 : 0, maximumFractionDigits: 2 })}</strong><small>{unit}</small></span>{onSelect && <ArrowUpRight aria-hidden="true" />}</>
    return <li key={row.key ?? `${row.name}-${index}`}>{onSelect ? <button type="button" className="os-ranking-row" aria-label={`查看${row.name}明细`} onClick={() => { if (open) setOpen(false); onSelect(row.key ?? row.name) }}>{content}</button> : <div className="os-ranking-row">{content}</div>}</li>
  })}</ol>
  if (!rows.length) return <p className="os-no-rows">没有匹配的数据</p>
  return <div className="os-ranking"><div className="os-ranking-column-label"><span>排名 / 名称</span><span>{unit === '%' ? '比率' : unit.startsWith('单') ? '订单数' : '支付金额'}</span></div>{list(rows.slice(0, 5))}<div className="os-ranking-more"><span>展示 {Math.min(rows.length, 5)} / {rows.length} 条样本</span>{rows.length > 5 && <button type="button" onClick={() => { setPage(1); setOpen(true) }}>查看更多 <ArrowUpRight aria-hidden="true" /></button>}</div><dialog ref={dialog} className="os-movement-dialog" aria-labelledby={titleId} onCancel={() => setOpen(false)} onClose={() => setOpen(false)}><header><div><h2 id={titleId}>{title}</h2><p>当前已读取样本 {rows.length} 条</p></div><button type="button" aria-label="关闭排行榜" onClick={() => setOpen(false)}><X /></button></header><div className="os-ranking-modal-body">{list(rows.slice((current - 1) * 5, current * 5), (current - 1) * 5)}</div><footer><span role="status">第 {current} / {pages} 页 · 每页 5 条</span><nav aria-label="排行榜分页"><button type="button" disabled={current === 1} onClick={() => setPage(current - 1)}>上一页</button>{Array.from({ length: pages }, (_, i) => <button type="button" key={i} aria-current={current === i + 1 ? 'page' : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>)}<button type="button" disabled={current === pages} onClick={() => setPage(current + 1)}>下一页</button></nav></footer></dialog></div>
}
