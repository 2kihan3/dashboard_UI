import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function ProductId({ id }: { id: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  useEffect(() => { setStatus('idle'); clearTimeout(timer.current) }, [id])
  const copy = async () => {
    clearTimeout(timer.current)
    try { await navigator.clipboard.writeText(id); setStatus('copied') }
    catch { setStatus('error') }
    timer.current = setTimeout(() => setStatus('idle'), 2000)
  }
  return <span className="os-product-id"><span>商品 ID {id}</span><button type="button" className="os-copy-id" aria-label={`复制商品 ID ${id}`} title="复制商品 ID" onClick={event => { event.stopPropagation(); void copy() }}>{status === 'copied' ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}</button><span className="os-copy-status" role="status">{status === 'copied' ? '已复制' : status === 'error' ? '复制失败，请手动复制' : ''}</span></span>
}
