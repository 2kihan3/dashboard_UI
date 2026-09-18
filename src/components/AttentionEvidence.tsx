import { dayOffset, demoDailyData, formatNumber, relative, type LinkSummary, type OpsRules } from '../data/linkOperationsDemo'
import { EvidenceBadge, EvidenceCard, EvidenceCardContent, EvidenceCardFooter, EvidenceCardHeader } from './EvidenceCard'

export default function AttentionEvidence({ item, hit, rules, end }: { item: LinkSummary; hit: LinkSummary['hits'][number]; rules: OpsRules; end: string }) {
  const opportunity = hit.reason === '增长候选' || hit.reason === '新品自然流关注'
  let label = '', value = '', reference = '', delta = '', sample = ''
  if (hit.reason === '点击待检查' || hit.reason === '承接待检查') {
    const click = hit.reason === '点击待检查'
    const rate = click ? item.ctr : item.cvr
    const threshold = click ? rules.lowCtr : rules.lowCvr
    label = click ? '点击率 CTR' : '成交转化率 CVR'
    value = rate === null ? '无有效样本' : `${rate.toFixed(2)}%`
    reference = `关注线 ${threshold.toFixed(2)}%`
    delta = rate === null ? '' : `低于 ${(threshold - rate).toFixed(2)} 个百分点`
    sample = click ? `点击 ${formatNumber(item.clicks)} / 曝光 ${formatNumber(item.exposure)}` : `订单 ${formatNumber(item.orders)} / 点击 ${formatNumber(item.clicks)} · CTR ${item.ctr?.toFixed(2)}% ≥ 优秀线 ${rules.goodCtr}%`
  } else if (hit.reason === '增长候选' || hit.reason === '存量下滑') {
    const change = relative(item.current.amount, item.baseline.amount)
    const difference = item.current.amount === null || item.baseline.amount === null ? null : item.current.amount - item.baseline.amount
    label = '成交变化'
    value = change === null ? '无有效基准' : `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
    reference = `波动线 ±${rules.change}%`
    delta = difference === null ? '' : `${difference >= 0 ? '增加' : '减少'} ${formatNumber(Math.abs(difference), true)} 元`
    sample = `本期 ${formatNumber(item.current.amount, true)} 元 / 基准 ${formatNumber(item.baseline.amount, true)} 元 · 基准订单 ${formatNumber(item.baseline.orders)}`
  } else if (hit.reason === '退货异常' && item.cohort) {
    label = '成熟批次退货率'
    value = `${item.cohort.rate.toFixed(2)}%`
    reference = `品类基准 ${item.cohort.benchmark.toFixed(2)}%`
    delta = `高于 ${(item.cohort.rate - item.cohort.benchmark).toFixed(2)} 个百分点`
    sample = `退货 ${item.cohort.returned} / 售出 ${item.cohort.sold} · 异常线：品类基准 +5 个百分点`
  } else if (hit.reason === '新品自然流关注') {
    label = '自然曝光'
    value = formatNumber(item.natural)
    reference = `关注线 ${formatNumber(rules.natural)}`
    const age = item.link.launched ? Math.round((new Date(end).getTime() - new Date(item.link.launched).getTime()) / 86400000) + 1 : null
    delta = age === null ? '上架日期缺失' : `上架第 ${age} 天`
    sample = `新品观察窗 ${rules.newDays} 天 · 达线仅进入观察，不代表趋势已确认`
  } else if (hit.reason === '曝光异常') {
    const last = item.rows.find((row) => row.date === end)
    const previous = demoDailyData.find((row) => row.key === item.link.key && row.date === dayOffset(end, -1))
    const change = relative(last?.exposure ?? null, previous?.exposure ?? null)
    label = '单日曝光变化'
    value = change === null ? '无有效基准' : `+${change.toFixed(1)}%`
    reference = '异常线 >100%'
    delta = '流量来源待核查'
    sample = `最近业务日 ${formatNumber(last?.exposure ?? null)} / 前日 ${formatNumber(previous?.exposure ?? null)}`
  }
  return <EvidenceCard opportunity={opportunity}>
    <EvidenceCardHeader><EvidenceBadge>{hit.reason}</EvidenceBadge><span>{label}</span></EvidenceCardHeader>
    <EvidenceCardContent>
      <div className="lw-evidence-values"><strong>{value}</strong><span>{reference}</span></div>
      <div className="lw-evidence-delta">{delta}</div>
    </EvidenceCardContent>
    <EvidenceCardFooter>{sample}</EvidenceCardFooter>
  </EvidenceCard>
}
