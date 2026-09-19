import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { amountTrend, periodScope, type PeriodDays } from '../data/dashboardPeriods'
import { useState } from 'react'
import TimeWindowSwitch from './TimeWindowSwitch'
import { trendWindows } from './timeWindowOptions'

const money = (value: number) => value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
const compactMoney = (value: number) => Math.abs(value) >= 10000 ? `${(value / 10000).toFixed(1)}万` : value.toLocaleString('zh-CN', { maximumFractionDigits: 0 })
const metricNames: Record<string, string> = { gmv: 'GMV', refund: '退款金额', spend: '推广金额' }

export default function AmountTrendChart({ end }: { end: string }) {
  const [days, setDays] = useState<7 | 14 | 30>(14)
  const rows = amountTrend(end, days)
  const scope = periodScope(end, days as PeriodDays)
  return <article className="os-amount-trend os-panel" data-slot="card">
    <header data-slot="card-header"><div><h3 data-slot="card-title">GMV / 退款 / 推广金额趋势</h3><p data-slot="card-description">{scope.label} · 按业务日期统计 · 推广金额仅汇总已知消耗</p></div><TimeWindowSwitch value={days} options={trendWindows} label="金额趋势时间范围" onChange={setDays} /></header>
    <div className="os-amount-trend-body" data-slot="card-content" role="img" aria-label={`${scope.label} GMV、退款金额和推广金额折线趋势图`}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={rows} margin={{ top: 12, right: 10, bottom: 2, left: 4 }}>
          <CartesianGrid stroke="var(--os-border)" strokeOpacity={0.5} strokeDasharray="4 6" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: 'var(--os-muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis yAxisId="gmv" tickFormatter={compactMoney} tick={{ fill: 'var(--os-muted)', fontSize: 12 }} tickLine={false} axisLine={false} width={58} />
          <YAxis yAxisId="cost" orientation="right" tickFormatter={compactMoney} tick={{ fill: 'var(--os-muted)', fontSize: 12 }} tickLine={false} axisLine={false} width={58} />
          <Tooltip contentStyle={{ background: 'var(--os-surface)', border: '1px solid var(--os-border)', borderRadius: 8, color: '#f1f1f5', fontSize: 13 }} labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ''} formatter={(value, name) => [`${money(Number(value))} 元`, metricNames[String(name)] ?? String(name)]} />
          <Legend formatter={value => metricNames[value] ?? value} wrapperStyle={{ color: 'var(--os-muted)', fontSize: 13, paddingTop: 10 }} />
          <Line yAxisId="gmv" type="monotone" dataKey="gmv" name="gmv" stroke="var(--os-blue)" strokeWidth={2.5} dot={{ r: 2.5 }} activeDot={{ r: 5 }} />
          <Line yAxisId="cost" type="monotone" dataKey="refund" name="refund" stroke="#e1a263" strokeWidth={2.2} dot={{ r: 2.5 }} activeDot={{ r: 5 }} />
          <Line yAxisId="cost" type="monotone" dataKey="spend" name="spend" stroke="var(--os-purple)" strokeWidth={2.2} dot={{ r: 2.5 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <footer data-slot="card-footer">左轴：GMV · 右轴：退款与推广金额{rows.some(row => row.missingSpend > 0) ? ' · 部分商品推广消耗缺失，未补零' : ''}</footer>
  </article>
}
