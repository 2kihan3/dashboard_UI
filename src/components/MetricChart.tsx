import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { type PlatformName, type ReportRow, reportDataWithHaoyiku as reportData } from '../data/dailyReport'
import {
  type DetailPlatform,
  type MetricSpec,
  type Period,
  categoryColors,
  feeBuckets,
  feeColor,
  fieldPeriodValue,
  fieldSummaryValue,
  formatAmount,
  formatPrecise,
  periodBuckets,
  platformFeeFields,
  platformFieldBuckets,
  storeFieldDetailSeries,
  storeShares,
  tooltipAmount,
} from '../lib/metrics'

export function ChartShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="chart-shell">
      <header className="chart-shell__header">
        <div>
          <span className="eyebrow">{subtitle}</span>
          <h3>{title}</h3>
        </div>
      </header>
      <div className="chart-shell__body">{children}</div>
    </section>
  )
}

interface PlatformFeeTooltipEntry {
  color?: string
  dataKey?: string | number
  value?: string | number
}

function PlatformFeeTooltip({ active, label, payload }: { active?: boolean; label?: string | number; payload?: PlatformFeeTooltipEntry[] }) {
  const platform = typeof label === 'string' && reportData.some((report) => report.platform === label) ? label as PlatformName : null
  if (!active || !platform) return null
  const fields = platformFeeFields(platform)
  const entries = fields.map((field) => payload?.find((item) => item.dataKey === field)).filter(Boolean) as PlatformFeeTooltipEntry[]
  return (
    <div className="platform-fee-tooltip">
      <strong>{platform} · 平台费用</strong>
      {entries.map((item) => (
        <span key={String(item.dataKey)}>
          <i style={{ background: item.color ?? feeColor(String(item.dataKey)) }} />
          {item.dataKey}：{formatPrecise(Number(item.value) || 0)}
        </span>
      ))}
    </div>
  )
}

function PlatformFeeLegend() {
  return (
    <div className="platform-fee-legend">
      {reportData.map((report) => {
        const fields = platformFeeFields(report.platform)
        if (!fields.length) return null
        return (
          <section key={report.platform}>
            <strong>{report.platform}</strong>
            <div>
              {fields.map((field) => <span key={field}><i style={{ background: feeColor(field) }} />{field}</span>)}
            </div>
          </section>
        )
      })}
    </div>
  )
}

export function MetricChart({ platform, period, spec, indicator = false, store }: { platform: PlatformName; period: Period; spec: MetricSpec; indicator?: boolean; store?: string }) {
  const [detailView, setDetailView] = useState(true)
  const [feeView, setFeeView] = useState<'summary' | 'daily' | 'weekly'>('summary')
  const color = categoryColors[spec.category] ?? '#5fb7e6'
  const isGmv = spec.field === '平台成交GMV'
  const isFee = spec.field === '平台费用合计' || spec.field === '技术运营服务费' || spec.field === '快递信息服务费'

  if (platform === '总计') {
    const buckets = periodBuckets(period)
    const totalValue = fieldSummaryValue('总计', spec.field, period)
    if (isGmv) {
      const data = buckets.map((bucket) => {
        const point: Record<string, string | number> = { label: bucket.label }
        reportData.forEach((report) => { point[report.platform] = fieldPeriodValue(report.platform, spec.field, period, bucket.indexes) })
        return point
      })
      return (
        <ChartShell title="GMV" subtitle="总计 · 所有平台日GMV">
          <div className="chart-summary-value">{formatPrecise(totalValue)}</div>
          <ResponsiveContainer width="100%" height={indicator ? 220 : 280}>
            <LineChart data={data}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{reportData.map((report, index) => <Line key={report.platform} type="monotone" dataKey={report.platform} stroke={['#79dbc4', '#5fb7e6', '#34d6b3', '#e9ae64'][index]} strokeWidth={2.5} dot={{ r: 3 }} />)}</LineChart>
          </ResponsiveContainer>
        </ChartShell>
      )
    }
    if (isFee) {
      const fields = platformFeeFields('总计')
      const data = reportData.map((report) => {
        const point: Record<string, string | number> = { name: report.platform }
        fields.forEach((field) => { point[field] = fieldSummaryValue(report.platform, field, period) })
        return point
      })
      const trendData = buckets.map((bucket) => {
        const point: Record<string, string | number> = { label: bucket.label }
        reportData.forEach((report) => { point[report.platform] = fields.reduce((sum, field) => sum + fieldPeriodValue(report.platform, field, period, bucket.indexes), 0) })
        return point
      })
      const weeklyTrendData = trendData.reduce<Array<Record<string, string | number>>>((groups, point, index) => {
        const weekIndex = Math.floor(index / 7)
        const group = groups[weekIndex] ?? { label: `第 ${weekIndex + 1} 周` }
        reportData.forEach((report) => { group[report.platform] = Number(group[report.platform] ?? 0) + Number(point[report.platform] ?? 0) })
        groups[weekIndex] = group
        return groups
      }, [])
      const isSummary = feeView === 'summary' || period === 'day'
      const visibleTrendData = feeView === 'weekly' && period === 'month' ? weeklyTrendData : trendData
      return (
        <ChartShell title="平台费用合计" subtitle="总计 · 每个平台一根费用堆叠柱">
          <div className="chart-summary-value">{formatPrecise(totalValue)}</div>
          <div className="chart-tabs"><button className={isSummary ? 'selected' : ''} type="button" onClick={() => setFeeView('summary')}>费用构成</button>{period !== 'day' ? <button className={feeView === 'daily' || (feeView === 'weekly' && period !== 'month') ? 'selected' : ''} type="button" onClick={() => setFeeView('daily')}>{period === 'year' ? '按月趋势' : '按日趋势'}</button> : null}{period === 'month' ? <button className={feeView === 'weekly' ? 'selected' : ''} type="button" onClick={() => setFeeView('weekly')}>按周趋势</button> : null}</div>
          {isSummary ? <ResponsiveContainer width="100%" height={indicator ? 220 : 280}>
            <BarChart data={data} stackOffset="none">
              <CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} />
              <YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} />
              <Tooltip content={<PlatformFeeTooltip />} wrapperStyle={{ zIndex: 30, pointerEvents: 'none' }} />
              {fields.map((field) => <Bar key={field} dataKey={field} stackId="fees" fill={feeColor(field)} />)}
            </BarChart>
          </ResponsiveContainer> : <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><LineChart data={visibleTrendData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{reportData.map((report, index) => <Line key={report.platform} type="monotone" dataKey={report.platform} stroke={['#79dbc4', '#5fb7e6', '#34d6b3', '#e9ae64'][index]} strokeWidth={2.5} />)}</LineChart></ResponsiveContainer>}
          {isSummary ? <PlatformFeeLegend /> : null}
        </ChartShell>
      )
    }
    const data = buckets.map((bucket) => {
      const point: Record<string, string | number> = { label: bucket.label }
      reportData.forEach((report) => { point[report.platform] = fieldPeriodValue(report.platform, spec.field, period, bucket.indexes) })
      return point
    })
    return (
      <ChartShell title="管理费用合计" subtitle="总计 · 各平台管理费用叠加">
        <div className="chart-summary-value">{formatPrecise(totalValue)}</div>
        <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={data}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{reportData.map((report, index) => <Bar key={report.platform} dataKey={report.platform} stackId="mgmt" fill={['#9aa8a0', '#b9c6c0', '#0f766e', '#e9ae64'][index]} />)}</BarChart></ResponsiveContainer>
      </ChartShell>
    )
  }

  const storeShare = store ? storeShares[platform as DetailPlatform].find((item) => item.name === store)?.share ?? 1 : 1
  const totalValue = fieldSummaryValue(platform, spec.field, period) * storeShare
  if (isGmv) {
    const dailyData = storeFieldDetailSeries(platform as DetailPlatform, spec.field, period).filter((item) => !store || item.name === store)
    const combinedDailyData = periodBuckets(period).map((bucket, index) => {
      const point: Record<string, string | number> = { label: bucket.label }
      dailyData.forEach((store) => { point[store.name] = store.data[index]?.value ?? 0 })
      return point
    })
    const weeklyData = combinedDailyData.reduce<Array<Record<string, string | number>>>((groups, point, index) => {
      const weekIndex = Math.floor(index / 7)
      const group = groups[weekIndex] ?? { label: `第 ${weekIndex + 1} 周` }
      dailyData.forEach((item) => { group[item.name] = Number(group[item.name] ?? 0) + Number(point[item.name] ?? 0) })
      groups[weekIndex] = group
      return groups
    }, [])
    const visibleGmvData = period === 'month' && !detailView ? weeklyData : combinedDailyData
    return (
      <ChartShell title="GMV" subtitle={`${platform} · ${store ?? '按店铺'}`}>
        <div className="chart-summary-value">{formatPrecise(totalValue)}</div>
        {period === 'month' ? <div className="chart-tabs"><button className={detailView ? 'selected' : ''} type="button" onClick={() => setDetailView(true)}>按日趋势</button><button className={!detailView ? 'selected' : ''} type="button" onClick={() => setDetailView(false)}>按周趋势</button></div> : null}
        <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><LineChart data={visibleGmvData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" type="category" allowDuplicatedCategory={false} tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{dailyData.map((item, index) => <Line key={item.name} type="monotone" dataKey={item.name} name={item.name} stroke={['#79dbc4', '#5fb7e6', '#e9ae64'][index]} strokeWidth={2.5} />)}</LineChart></ResponsiveContainer>
      </ChartShell>
    )
  }
  if (isFee && spec.field === '平台费用合计') {
    const fields = platformFeeFields(platform)
    const pieData = fields.map((field) => ({ name: field, value: fieldSummaryValue(platform, field, period) * storeShare })).filter((item) => item.value !== 0)
    const data = feeBuckets(platform, period).map((point) => Object.fromEntries(Object.entries(point).map(([key, value]) => [key, key === 'label' ? value : Number(value) * storeShare])))
    const stores = storeShares[platform as DetailPlatform].filter((item) => !store || item.name === store)
    const storeSummaryData = stores.map((item) => {
      const point: Record<string, string | number> = { label: item.name }
      fields.forEach((field) => { point[field] = fieldSummaryValue(platform, field, period) * item.share })
      return point
    })
    const storeTrendData = periodBuckets(period).map((bucket) => {
      const point: Record<string, string | number> = { label: bucket.label }
      stores.forEach((item) => { point[item.name] = fields.reduce((sum, field) => sum + fieldPeriodValue(platform, field, period, bucket.indexes) * item.share, 0) })
      return point
    })
    const weeklyData = data.reduce<Array<Record<string, string | number>>>((groups, point, index) => {
      const weekIndex = Math.floor(index / 7)
      const group = groups[weekIndex] ?? { label: `第 ${weekIndex + 1} 周` }
      fields.forEach((field) => { group[field] = Number(group[field] ?? 0) + Number(point[field] ?? 0) })
      groups[weekIndex] = group
      return groups
    }, [])
    const storeWeeklyData = storeTrendData.reduce<Array<Record<string, string | number>>>((groups, point, index) => {
      const weekIndex = Math.floor(index / 7)
      const group = groups[weekIndex] ?? { label: `第 ${weekIndex + 1} 周` }
      stores.forEach((item) => { group[item.name] = Number(group[item.name] ?? 0) + Number(point[item.name] ?? 0) })
      groups[weekIndex] = group
      return groups
    }, [])
    const visibleFeeData = feeView === 'weekly' && period === 'month' ? weeklyData : data
    const visibleStoreTrend = feeView === 'weekly' && period === 'month' ? storeWeeklyData : storeTrendData
    const isSummary = feeView === 'summary' || period === 'day'
    return (
      <ChartShell title="平台费用合计" subtitle={`${platform} · ${store ?? '具体费用组成'}`}>
        <div className="chart-summary-value">{formatPrecise(totalValue)}</div>
        <div className="chart-tabs"><button className={isSummary ? 'selected' : ''} type="button" onClick={() => setFeeView('summary')}>费用构成</button>{period !== 'day' ? <button className={feeView === 'daily' || (feeView === 'weekly' && period !== 'month') ? 'selected' : ''} type="button" onClick={() => setFeeView('daily')}>{period === 'year' ? '按月趋势' : '按日趋势'}</button> : null}{period === 'month' ? <button className={feeView === 'weekly' ? 'selected' : ''} type="button" onClick={() => setFeeView('weekly')}>按周趋势</button> : null}</div>
        {isSummary ? (store ? <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><PieChart><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} stroke="rgba(213,234,225,.16)">{pieData.map((item, index) => <Cell key={item.name} fill={['#5fb7e6', '#79dbc4', '#34d6b3', '#e9ae64', '#b794f6', '#f87171'][index % 6]} />)}</Pie></PieChart></ResponsiveContainer> : <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={storeSummaryData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{fields.map((field, index) => <Bar key={field} dataKey={field} stackId="fees" fill={['#5fb7e6', '#79dbc4', '#34d6b3', '#e9ae64', '#b794f6', '#f87171'][index % 6]} />)}</BarChart></ResponsiveContainer>) : (store ? <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={visibleFeeData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{fields.map((field, index) => <Bar key={field} dataKey={field} stackId="fees" fill={['#5fb7e6', '#79dbc4', '#34d6b3', '#e9ae64', '#b794f6', '#f87171'][index % 6]} />)}</BarChart></ResponsiveContainer> : <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><LineChart data={visibleStoreTrend}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{stores.map((item, index) => <Line key={item.name} type="monotone" dataKey={item.name} stroke={['#79dbc4', '#5fb7e6', '#e9ae64'][index]} strokeWidth={2.5} />)}</LineChart></ResponsiveContainer>)}
      </ChartShell>
    )
  }
  if (spec.field === '管理费用合计') {
    if (period === 'day') {
      return (
        <ChartShell title="管理费用合计" subtitle={`${platform} · 期间费用`}>
          <div className="daily-metric normal"><span>当日数值</span><strong>{formatPrecise(totalValue)}</strong><p>管理费用合计</p></div>
        </ChartShell>
      )
    }
    const dailyData = storeFieldDetailSeries(platform as DetailPlatform, spec.field, period).filter((item) => !store || item.name === store)
    const combinedData = periodBuckets(period).map((bucket, index) => {
      const point: Record<string, string | number> = { label: bucket.label }
      dailyData.forEach((store) => { point[store.name] = store.data[index]?.value ?? 0 })
      return point
    })
    return (
      <ChartShell title="管理费用合计" subtitle={`${platform} · ${store ?? '各店铺叠加'}`}>
        <div className="chart-summary-value">{formatPrecise(totalValue)}</div>
        <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={combinedData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{dailyData.map((store, index) => <Bar key={store.name} dataKey={store.name} stackId="mgmt" fill={['#79dbc4', '#5fb7e6', '#e9ae64'][index % 3]} />)}</BarChart></ResponsiveContainer>
      </ChartShell>
    )
  }
  void color
  const data = platformFieldBuckets(platform as DetailPlatform, spec.field, period).map((item) => ({ ...item, value: item.value * storeShare }))
  return <ChartShell title={spec.chartTitle} subtitle={`${platform} · ${store ?? spec.field}`}><div className="chart-summary-value">{formatPrecise(totalValue)}</div><ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={data}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></ChartShell>
}

// 仅用于消除 ReportRow 类型未使用警告（保留以便未来扩展）
export type { ReportRow }
