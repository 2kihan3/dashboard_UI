import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { topRankingPage } from '../data/topRankingPage'

export default function TopRankingDetails<T>({ rows, title, note, preview = 5, defaultPageSize = 10, resetKey = '', modalControls, renderModal, pageHeader, children }: { rows: T[]; title: string; note: string; preview?: number; defaultPageSize?: number; resetKey?: string; modalControls?: ReactNode; renderModal?: (items: T[], offset: number) => ReactNode; pageHeader?: (items: T[], offset: number) => ReactNode; children: (items: T[], offset: number) => ReactNode }) {
  const [open, setOpen] = useState(false)
  const [pagination, setPagination] = useState({ key: resetKey, page: 1 })
  const page = pagination.key === resetKey ? pagination.page : 1
  const setPage = (value: number) => setPagination({ key: resetKey, page: value })
  const [size, setSize] = useState(defaultPageSize)
  const dialog = useRef<HTMLDialogElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const noteId = useId()
  const paged = topRankingPage(rows, page, size)
  const count = preview === 10 ? 10 : 5
  useEffect(() => {
    if (!open) return
    const node = dialog.current
    node?.showModal()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { node?.close(); document.body.style.overflow = overflow }
  }, [open])
  useEffect(() => { if (body.current) body.current.scrollTop = 0 }, [paged.current, size, open, resetKey])
  return <>
    {children(rows.slice(0, count), 0)}
    <div className="os-top-more"><span>展示 {Math.min(count, paged.total)} / {paged.total} 条 · 最多 Top 100</span><button type="button" disabled={!paged.total} onClick={() => { setPage(1); setSize(defaultPageSize); setOpen(true) }}>查看更多<ArrowUpRight aria-hidden="true" /></button></div>
    <dialog ref={dialog} className="os-movement-dialog os-top-dialog" aria-labelledby={titleId} aria-describedby={noteId} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setOpen(false) } }}>
      <header><div><h2 id={titleId}>{title} · TOP100</h2><p id={noteId}>{note} · 当前 {paged.total} 条{paged.total < 100 ? '，不足100条按实际数量展示' : ''}</p></div><button type="button" aria-label={`关闭${title}`} onClick={() => setOpen(false)}><X aria-hidden="true" /></button></header>
      <div ref={body} className="os-top-dialog-body">{open && <>{modalControls}{renderModal ? renderModal(paged.rows, paged.offset) : <>{pageHeader?.(paged.rows, paged.offset)}{children(paged.rows, paged.offset)}</>}</>}</div>
      <footer><label>每页 <select aria-label={`${title}每页条数`} value={size} onChange={event => { setSize(Number(event.target.value)); setPage(1) }}><option value={10}>10 条</option><option value={20}>20 条</option><option value={50}>50 条</option></select></label><span role="status">第 {paged.current} / {paged.pages} 页 · 共 {paged.total} 条</span><nav aria-label={`${title}分页`}><button type="button" disabled={paged.current === 1} onClick={() => setPage(paged.current - 1)}>上一页</button>{Array.from({ length: paged.pages }, (_, index) => <button type="button" key={index} aria-current={paged.current === index + 1 ? 'page' : undefined} onClick={() => setPage(index + 1)}>{index + 1}</button>)}<button type="button" disabled={paged.current === paged.pages} onClick={() => setPage(paged.current + 1)}>下一页</button></nav></footer>
    </dialog>
  </>
}
