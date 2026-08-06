import { Database } from 'lucide-react'

export default function ProvenancePage() {
  return (
    <section className="page-stack provenance-page">
      <section className="data-scope-note">
        <div>
          <span className="eyebrow">data_provenance</span>
          <h2>数据溯源</h2>
        </div>
        <p>每个经营数字都能回到来源、口径与审核记录，相关能力正在筹备中。</p>
      </section>

      <section className="provenance-placeholder">
        <div className="provenance-icon">
          <Database aria-hidden="true" />
        </div>
        <h3>溯源能力筹备中</h3>
        <p>将支持「指标 → 字段 → 来源批次 → 审核记录」的全链路回查，敬请期待。</p>
      </section>
    </section>
  )
}
