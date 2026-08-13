import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { type PlatformName, type ReportRow, reportDataWithHaoyiku as reportData } from '../data/dailyReport'
import {
  type DetailPlatform,
  type DateRange,
  type MetricSpec,
  type Period,
  categoryColors,
  feeBuckets,
  feeColor,
  fieldPeriodValue,
  fieldSummaryValue,
  formatAmount,
  formatPrecise,
  managementFeeFields,
  periodBuckets,
  platformFeeFields,
  platformFieldBuckets,
  storeFieldDetailSeries,
  storeShares,
  resolvePeriodBuckets,
  tooltipAmount,
} from '../lib/metrics'

export function ChartShell({
  title,
  subtitle,
  summary,
  children,
}: {
  title: string
  subtitle: string
  summary?: { label: string; value: string }
  children: React.ReactNode
}) {
  return (
    <section className="chart-shell">
      <header className="chart-shell__header">
        <div className="chart-shell__heading">
          <span className="eyebrow">{subtitle}</span>
          <h3>{title}</h3>
        </div>
        {summary ? <div className="chart-shell__summary"><span>{summary.label}</span><strong>{summary.value}</strong></div> : null}
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

const managementFeeColors = ['#5fb7e6', '#79dbc4', '#b794f6']

function DailyMetricCards({ platform, store, field, title, totalValue }: { platform: DetailPlatform; store?: string; field: string; title: string; totalValue: number }) {
  const day = periodBuckets('day')[0]
  const stores = store ? storeShares[platform].filter((item) => item.name === store) : storeShares[platform]
  return (
    <ChartShell title={title} subtitle={`${platform} · ${store ? '单店铺' : '每个店铺'}`} summary={{ label: '当日汇总', value: formatPrecise(totalValue) }}>
      <div className="daily-gmv-grid">
        {stores.map((item) => {
          const value = fieldPeriodValue(platform, field, 'day', day.indexes) * item.share
          return <article className="daily-gmv-card" key={item.name}><header><h3>{item.name}</h3><span className="eyebrow">{title}</span></header><strong>{formatPrecise(value)}</strong><footer>{day.label}</footer></article>
        })}
      </div>
      <p className="global-chart-note">日维度下按店铺展示 {title}；选择店铺后仅展示该店铺的当日数值。</p>
    </ChartShell>
  )
}

export function MetricChart({ platform, period, spec, indicator = false, store, dateRange }: { platform: PlatformName; period: Period; spec: MetricSpec; indicator?: boolean; store?: string; dateRange?: DateRange }) {
  const [detailView, setDetailView] = useState(true)
  const [feeView, setFeeView] = useState<'summary' | 'daily' | 'weekly'>('summary')
  const color = categoryColors[spec.category] ?? '#5fb7e6'
  const buckets = resolvePeriodBuckets(period, dateRange)
  const isGmv = spec.field === '平台成交GMV'
  const isFee = spec.field === '平台费用合计' || spec.field === '技术运营服务费' || spec.field === '快递信息服务费'
  const summaryLabel = dateRange ? '筛选汇总' : period === 'day' ? '当日汇总' : '周期汇总'

  if (platform === '总计') {
    const totalValue = fieldSummaryValue('总计', spec.field, period, buckets)
    if (isGmv) {
      const data = buckets.map((bucket) => {
        const point: Record<string, string | number> = { label: bucket.label }
        reportData.forEach((report) => { point[report.platform] = fieldPeriodValue(report.platform, spec.field, period, bucket.indexes) })
        return point
      })
      return (
        <ChartShell title="GMV" subtitle="总计 · 所有平台日GMV" summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}>
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
        fields.forEach((field) => { point[field] = fieldSummaryValue(report.platform, field, period, buckets) })
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
        <ChartShell title="平台费用合计" subtitle="总计 · 每个平台一根费用堆叠柱" summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}>
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
      <ChartShell title="管理费用合计" subtitle="总计 · 各平台管理费用叠加" summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}>
        <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={data}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{reportData.map((report, index) => <Bar key={report.platform} dataKey={report.platform} stackId="mgmt" fill={['#9aa8a0', '#b9c6c0', '#0f766e', '#e9ae64'][index]} />)}</BarChart></ResponsiveContainer>
      </ChartShell>
    )
  }

  const storeShare = store ? storeShares[platform as DetailPlatform].find((item) => item.name === store)?.share ?? 1 : 1
  const totalValue = fieldSummaryValue(platform, spec.field, period, buckets) * storeShare
  const usesDailyCards = ['活动折扣', '技术运营服务费', '快递信息服务费'].includes(spec.field)
  if (period === 'day' && usesDailyCards) {
    return <DailyMetricCards platform={platform as DetailPlatform} store={store} field={spec.field} title={spec.chartTitle} totalValue={totalValue} />
  }
  if (isGmv) {
    const dailyData = storeFieldDetailSeries(platform as DetailPlatform, spec.field, period, buckets).filter((item) => !store || item.name === store)
    const combinedDailyData = buckets.map((bucket, index) => {
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
    const visibleGmvData = period === 'month' && !dateRange && !detailView ? weeklyData : combinedDailyData
    return (
      <ChartShell title="GMV" subtitle={`${platform} · ${store ?? '按店铺'}`} summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}>
        {period === 'month' && !dateRange ? <div className="chart-tabs"><button className={detailView ? 'selected' : ''} type="button" onClick={() => setDetailView(true)}>按日趋势</button><button className={!detailView ? 'selected' : ''} type="button" onClick={() => setDetailView(false)}>按周趋势</button></div> : null}
        <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><LineChart data={visibleGmvData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" type="category" allowDuplicatedCategory={false} tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{dailyData.map((item, index) => <Line key={item.name} type="monotone" dataKey={item.name} name={item.name} stroke={['#79dbc4', '#5fb7e6', '#e9ae64'][index]} strokeWidth={2.5} />)}</LineChart></ResponsiveContainer>
      </ChartShell>
    )
  }
  if (isFee && spec.field === '平台费用合计') {
    const fields = platformFeeFields(platform)
    const pieData = fields.map((field) => ({ name: field, value: fieldSummaryValue(platform, field, period, buckets) * storeShare })).filter((item) => item.value !== 0)
    const data = feeBuckets(platform, period, buckets).map((point) => Object.fromEntries(Object.entries(point).map(([key, value]) => [key, key === 'label' ? value : Number(value) * storeShare])))
    const stores = storeShares[platform as DetailPlatform].filter((item) => !store || item.name === store)
    const storeSummaryData = stores.map((item) => {
      const point: Record<string, string | number> = { label: item.name }
      fields.forEach((field) => { point[field] = fieldSummaryValue(platform, field, period, buckets) * item.share })
      return point
    })
    const storeTrendData = buckets.map((bucket) => {
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
      <ChartShell title="平台费用合计" subtitle={`${platform} · ${store ?? '具体费用组成'}`} summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}>
        <div className="chart-tabs"><button className={isSummary ? 'selected' : ''} type="button" onClick={() => setFeeView('summary')}>费用构成</button>{period !== 'day' ? <button className={feeView === 'daily' || (feeView === 'weekly' && period !== 'month') ? 'selected' : ''} type="button" onClick={() => setFeeView('daily')}>{period === 'year' ? '按月趋势' : '按日趋势'}</button> : null}{period === 'month' ? <button className={feeView === 'weekly' ? 'selected' : ''} type="button" onClick={() => setFeeView('weekly')}>按周趋势</button> : null}</div>
        {isSummary ? (store ? <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><PieChart><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} stroke="rgba(213,234,225,.16)">{pieData.map((item, index) => <Cell key={item.name} fill={['#5fb7e6', '#79dbc4', '#34d6b3', '#e9ae64', '#b794f6', '#f87171'][index % 6]} />)}</Pie></PieChart></ResponsiveContainer> : <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={storeSummaryData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{fields.map((field, index) => <Bar key={field} dataKey={field} stackId="fees" fill={['#5fb7e6', '#79dbc4', '#34d6b3', '#e9ae64', '#b794f6', '#f87171'][index % 6]} />)}</BarChart></ResponsiveContainer>) : (store ? <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={visibleFeeData}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{fields.map((field, index) => <Bar key={field} dataKey={field} stackId="fees" fill={['#5fb7e6', '#79dbc4', '#34d6b3', '#e9ae64', '#b794f6', '#f87171'][index % 6]} />)}</BarChart></ResponsiveContainer> : <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><LineChart data={visibleStoreTrend}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{stores.map((item, index) => <Line key={item.name} type="monotone" dataKey={item.name} stroke={['#79dbc4', '#5fb7e6', '#e9ae64'][index]} strokeWidth={2.5} />)}</LineChart></ResponsiveContainer>)}
      </ChartShell>
    )
  }
  if (spec.field === '管理费用合计') {
    const fields = managementFeeFields(platform)
    const data = buckets.map((bucket) => {
      const point: Record<string, string | number> = { label: bucket.label }
      fields.forEach((field) => { point[field] = fieldPeriodValue(platform, field, period, bucket.indexes) * storeShare })
      return point
    })
    const pieData = fields.map((field) => ({ name: field, value: Number(data[0]?.[field] ?? 0) })).filter((item) => item.value !== 0)
    if (buckets.length === 1 && store) {
      return (
        <ChartShell title="管理费用合计" subtitle={`${platform} · ${store} · 费用构成`} summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}>
          <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><PieChart><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82} stroke="rgba(213,234,225,.16)">{pieData.map((item, index) => <Cell key={item.name} fill={managementFeeColors[index % managementFeeColors.length]} />)}</Pie></PieChart></ResponsiveContainer>
        </ChartShell>
      )
    }
    return (
      <ChartShell title="管理费用合计" subtitle={`${platform} · ${store ?? '费用构成叠加'}`} summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}>
        <ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={data}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Legend wrapperStyle={{ color: '#8da39b', fontSize: 11 }} />{fields.map((field, index) => <Bar key={field} dataKey={field} stackId="mgmt" fill={managementFeeColors[index % managementFeeColors.length]} />)}</BarChart></ResponsiveContainer>
      </ChartShell>
    )
  }
  void color
  const data = platformFieldBuckets(platform as DetailPlatform, spec.field, period, buckets).map((item) => ({ ...item, value: item.value * storeShare }))
  return <ChartShell title={spec.chartTitle} subtitle={`${platform} · ${store ?? spec.field}`} summary={{ label: summaryLabel, value: formatPrecise(totalValue) }}><ResponsiveContainer width="100%" height={indicator ? 220 : 280}><BarChart data={data}><CartesianGrid stroke="rgba(213,234,225,.08)" strokeDasharray="4 6" vertical={false} /><XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8da39b" fontSize={11} /><YAxis tickFormatter={formatAmount} tickLine={false} axisLine={false} width={56} stroke="#8da39b" fontSize={11} /><Tooltip contentStyle={{ background: '#101a18', border: '1px solid rgba(121,219,196,.24)', borderRadius: 6, color: '#d7e8e1', fontSize: 12 }} labelStyle={{ color: '#79dbc4' }} formatter={tooltipAmount} /><Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></ChartShell>
}

// 仅用于消除 ReportRow 类型未使用警告（保留以便未来扩展）
export type { ReportRow }
