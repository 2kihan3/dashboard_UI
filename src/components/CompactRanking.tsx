import { ArrowUpRight } from 'lucide-react'
import TopRankingDetails from './TopRankingDetails'

interface RankingRow { name: string; value: number; key?: string; meta?: string }
export default function CompactRanking({ rows, onSelect, unit = '元', title = '排行榜' }: { rows: RankingRow[]; onSelect?: (key: string) => void; unit?: string; title?: string }) {
  const list = (items: RankingRow[], offset = 0) => <ol className="os-ranking-list" start={offset + 1}>{items.map((row, index) => {
    const content = <><span className="os-ranking-position" data-leading={offset + index < 3}>{String(offset + index + 1).padStart(2, '0')}</span><span className="os-ranking-name"><strong>{row.name}</strong>{row.meta && <small>{row.meta}</small>}</span><span className="os-ranking-value"><strong>{row.value.toLocaleString('zh-CN', { minimumFractionDigits: unit === '元' ? 2 : 0, maximumFractionDigits: 2 })}</strong><small>{unit}</small></span>{onSelect && <ArrowUpRight aria-hidden="true" />}</>
    return <li key={row.key ?? `${row.name}-${index}`}>{onSelect ? <button type="button" className="os-ranking-row" aria-label={`查看${row.name}明细`} onClick={() => { onSelect(row.key ?? row.name) }}>{content}</button> : <div className="os-ranking-row">{content}</div>}</li>
  })}</ol>
  if (!rows.length) return <p className="os-no-rows">没有匹配的数据</p>
  return <div className="os-ranking"><TopRankingDetails rows={rows} title={title} note="已读取页面样本 · 按支付金额降序">{(items, offset) => <><div className="os-ranking-column-label"><span>排名 / 名称</span><span>{unit === '%' ? '比率' : unit.startsWith('单') ? '订单数' : '支付金额'}</span></div>{list(items, offset)}</>}</TopRankingDetails></div>
}
