import { useState } from 'react'
import {
  BarChart3,
  Check,
  FileText,
  PackageCheck,
  Scale,
  Sparkles,
  Target,
  TrendingUp,
  Undo2,
  type LucideIcon,
  Link2,
} from 'lucide-react'
import { skillCards, skillCategoryLabels, type SkillCard } from '../data/skillMarketMock'

const skillIconMap: Record<string, LucideIcon> = {
  FileText,
  Scale,
  TrendingUp,
  Target,
  PackageCheck,
  Link2,
  BarChart3,
  Undo2,
}

const statusLabels: Record<SkillCard['status'], { label: string; tone: 'normal' | 'warning' | 'neutral' }> = {
  official: { label: '官方', tone: 'normal' },
  beta: { label: 'Beta', tone: 'warning' },
  community: { label: '社区', tone: 'neutral' },
}

function SkillCardItem({ skill }: { skill: SkillCard }) {
  const Icon = skillIconMap[skill.icon] ?? FileText
  const status = statusLabels[skill.status]
  return (
    <article className="skill-card">
      <header className="skill-card__head">
        <div>
          <span className={`skill-card__category skill-card__category--${status.tone}`}>{skill.category} · {status.label}</span>
          <h3>{skill.name}</h3>
        </div>
        <span className="skill-card__icon"><Icon aria-hidden="true" /></span>
      </header>
      <p className="skill-card__desc">{skill.description}</p>
      <div className="skill-card__io">
        <div>
          <small>输入</small>
          <div className="skill-card__tags">
            {skill.inputs.map((input) => <span key={input} className="skill-tag">{input}</span>)}
          </div>
        </div>
      </div>
      <footer className="skill-card__foot">
        <div className="skill-card__meta">
          <span className="skill-card__pea">
            <Sparkles aria-hidden="true" />{skill.peaCost} 豌豆/次
          </span>
        </div>
        <button type="button" className="primary-action skill-card__run">
          <Check aria-hidden="true" />立即使用
        </button>
      </footer>
    </article>
  )
}

export default function SkillsPage() {
  const [category, setCategory] = useState<SkillCard['category'] | '全部'>('全部')

  const visibleCards = category === '全部' ? skillCards : skillCards.filter((card) => card.category === category)

  return (
    <section className="page-stack skills-page">
      <section className="data-scope-note">
        <div>
          <span className="eyebrow">skill_market</span>
          <h2>skill 市场</h2>
        </div>
        <p>沉淀电商经营场景的可复用技能，按平台/费用/库存等维度组织，可一键触发或接入对话。</p>
      </section>

      <section className="skills-summary">
        <article>
          <span className="skills-summary__icon"><BarChart3 aria-hidden="true" /></span>
          <div>
            <strong>{skillCards.length}</strong>
            <small>技能总数</small>
          </div>
        </article>
      </section>

      <section className="skills-toolbar">
        <div className="data-subtabs">
          {skillCategoryLabels.map((item) => (
            <button
              key={item.key}
              type="button"
              className={category === item.key ? 'selected' : ''}
              onClick={() => setCategory(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="skills-grid">
        {visibleCards.map((skill) => <SkillCardItem key={skill.id} skill={skill} />)}
      </section>
    </section>
  )
}
