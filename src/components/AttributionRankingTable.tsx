import { UsersRound } from 'lucide-react'
import TopRankingDetails from './TopRankingDetails'
import { groupAttributionRows, ownerAttributionRows, unattributedPayment, type AttributionGrain, type GroupAttributionRow, type OwnerAttributionRow } from '../data/attributionRanking'
import type { PeriodProduct } from '../data/dashboardPeriods'

const money = (value: number) => value.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const compactMoney = (value: number) => Math.abs(value) >= 10000 ? `${(value / 10000).toFixed(2)}万` : `${money(value)} 元`
const rate = (value: number | null) => value === null ? '—' : `${value.toFixed(1)}%`

function Rank({ value }: { value: number }) {
  return <span className="ar-rank" data-leading={value <= 3}>{value}</span>
}

function GroupTable({ rows, offset }: { rows: GroupAttributionRow[]; offset: number }) {
  return <div className="os-table-scroll"><table className="ar-table"><thead><tr><th>排名</th><th>小组</th><th>人数</th><th>GMV / 元</th><th>退款金额 / 元</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.key}><td><Rank value={offset + index + 1} /></td><td><strong>{row.name}</strong></td><td>{row.people}</td><td><b>{money(row.gmv)}</b></td><td>{money(row.refund)}</td></tr>)}</tbody></table></div>
}

function OwnerTable({ rows, offset }: { rows: OwnerAttributionRow[]; offset: number }) {
  return <div className="os-table-scroll"><table className="ar-table"><thead><tr><th>排名</th><th>人员</th><th>组别</th><th>商品数</th><th>GMV / 元</th><th>退款率</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.key}><td><Rank value={offset + index + 1} /></td><td><strong>{row.name}</strong></td><td>{row.group}</td><td>{row.products}</td><td><b>{money(row.gmv)}</b></td><td>{rate(row.refundRate)}</td></tr>)}</tbody></table></div>
}

export default function AttributionRankingTable({ rows, grain, onGrainChange, scopeLabel }: { rows: PeriodProduct[]; grain: AttributionGrain; onGrainChange: (grain: AttributionGrain) => void; scopeLabel: string }) {
  const groupRows = groupAttributionRows(rows)
  const ownerRows = ownerAttributionRows(rows)
  const unattributed = unattributedPayment(rows)
  const description = grain === 'group'
    ? '按商品负责人的组别归因支付金额；一人多组时分别计入，未映射负责人的商品不计入。'
    : grain === 'owner'
      ? `按商品负责人归因支付金额 · 未归因部分 ${compactMoney(unattributed)}`
      : '达人账号归因成交金额，统计直播和短视频带货账号，不含无账号归因的商品卡成交。'

  return <article className="os-panel ar-panel" data-slot="card">
    <header data-slot="card-header" className="ar-header"><div><h3 data-slot="card-title">GMV 排行</h3><p data-slot="card-description">{description}</p></div><div className="os-switch" role="group" aria-label="GMV归因维度"><button type="button" aria-pressed={grain === 'group'} onClick={() => onGrainChange('group')}>小组</button><button type="button" aria-pressed={grain === 'owner'} onClick={() => onGrainChange('owner')}>个人</button><button type="button" aria-pressed={grain === 'creator'} onClick={() => onGrainChange('creator')}>达人账号</button></div></header>
    <div className="os-panel-body" data-slot="card-content">
      {grain === 'group' && <TopRankingDetails rows={groupRows} title="GMV 排行 · 小组" note={`${scopeLabel} · 按 GMV 降序`} preview={10} resetKey={`${scopeLabel}-group`}>{(items, offset) => <GroupTable rows={items} offset={offset} />}</TopRankingDetails>}
      {grain === 'owner' && <TopRankingDetails rows={ownerRows} title="GMV 排行 · 个人" note={`${scopeLabel} · 按 GMV 降序`} preview={10} resetKey={`${scopeLabel}-owner`}>{(items, offset) => <OwnerTable rows={items} offset={offset} />}</TopRankingDetails>}
      {grain === 'creator' && <div className="os-empty ar-empty"><UsersRound aria-hidden="true" /><strong>暂无账号数据</strong><p>当前演示数据没有达人账号归因记录。</p></div>}
    </div>
    <footer data-slot="card-footer">{scopeLabel} · 当前为日级演示聚合，未归因金额不计入个人和小组排行。</footer>
  </article>
}
