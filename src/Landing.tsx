import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleAlert,
  Database,
  FileCheck2,
  Layers3,
  Network,
  Play,
  ScanSearch,
  Sparkles,
} from 'lucide-react'
import './Landing.css'

type Scenario = 'growth' | 'finance' | 'connect'

const scenarios: Record<Scenario, {
  label: string
  eyebrow: string
  engine: string
  statement: string
  outputs: Array<{ label: string; value: string; detail: string; tone?: 'alert' | 'good' }>
  dashboard: { title: string; value: string; delta: string; alert: string; bars: number[] }
}> = {
  growth: {
    label: '经营增长',
    eyebrow: 'OPERATING INTELLIGENCE',
    engine: '经营引擎',
    statement: '每天把分散的平台数据，整理成能判断、能追溯的经营结论。',
    outputs: [
      { label: '今日利润', value: '¥ 38,420', detail: '较昨日 +12.6%', tone: 'good' },
      { label: '待处理动作', value: '03', detail: '优先处理退款波动' },
      { label: '店铺健康度', value: '89', detail: '4 个店铺数据已确认', tone: 'good' },
    ],
    dashboard: { title: '经营结果总览', value: '¥ 38,420', delta: '+12.6%', alert: '退款率高于近 7 日均值', bars: [42, 58, 46, 71, 62, 84, 74, 92] },
  },
  finance: {
    label: '财务核验',
    eyebrow: 'TRACEABLE FINANCE',
    engine: '核验引擎',
    statement: '每个数字都能回到来源、口径和审核记录，不再靠人工翻表确认。',
    outputs: [
      { label: '已验证金额', value: '¥ 1,284,900', detail: '规则与复核结果一致', tone: 'good' },
      { label: '待复核差异', value: '02', detail: '涉及两笔平台费用', tone: 'alert' },
      { label: '数据完整度', value: '98.4%', detail: '缺少 1 个来源字段', tone: 'good' },
    ],
    dashboard: { title: '费用核验台账', value: '98.4%', delta: '已验证', alert: '品牌推广费等待人工确认', bars: [70, 66, 72, 52, 82, 79, 88, 91] },
  },
  connect: {
    label: '数据接入',
    eyebrow: 'DATA FOUNDATION',
    engine: '接入引擎',
    statement: '先接住混乱的账单和日报，再让经营团队看到同一份可信的数据。',
    outputs: [
      { label: '今日入库批次', value: '12', detail: '4 类平台数据已处理', tone: 'good' },
      { label: '字段映射异常', value: '01', detail: '等待确认别名字段', tone: 'alert' },
      { label: '可发布指标', value: '286', detail: '已写入经营事实表', tone: 'good' },
    ],
    dashboard: { title: '数据接入状态', value: '12', delta: '批次完成', alert: '1 条字段映射需要确认', bars: [34, 44, 61, 54, 78, 72, 88, 95] },
  },
}

const platformNodes = ['内容电商', '货架电商', '分销 / 特卖', '私域 / 独立站']

export default function Landing() {
  const [scenario, setScenario] = useState<Scenario>('growth')
  const [demoOpen, setDemoOpen] = useState(false)
  const content = scenarios[scenario]

  useEffect(() => {
    document.title = '澄明 · 电商经营智能体'
  }, [])

  const scrollToPreview = () => document.querySelector('#workbench-preview')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main className="landing-shell">
      <section className="landing-hero" aria-labelledby="landing-title">
        <nav className="landing-nav" aria-label="主导航">
          <a className="landing-brand" href="#top" aria-label="澄明首页"><span className="brand-sigil">C</span><span>澄明</span></a>
          <div className="scenario-tabs" role="tablist" aria-label="使用场景">
            {(Object.keys(scenarios) as Scenario[]).map((key) => (
              <button key={key} type="button" role="tab" aria-selected={scenario === key} className={scenario === key ? 'is-active' : ''} onClick={() => setScenario(key)}>{scenarios[key].label}</button>
            ))}
          </div>
          <div className="nav-actions">
            <a className="nav-workbench" href="#workbench"><span className="nav-workbench-full">数据看板</span><span className="nav-workbench-short">看板</span><ArrowUpRight aria-hidden="true" /></a>
            <button className="nav-demo" type="button" onClick={() => setDemoOpen(true)}>申请演示 <ArrowUpRight aria-hidden="true" /></button>
          </div>
        </nav>

        <div className="hero-copy" id="top">
          <p className="kicker"><span />{content.eyebrow}</p>
          <h1 id="landing-title">把电商经营<br />放到一张<strong>清楚的桌面</strong>上。</h1>
          <p className="hero-statement">{content.statement}</p>
          <div className="hero-actions">
            <button className="button-primary" type="button" onClick={() => setDemoOpen(true)}>申请演示 <ArrowUpRight aria-hidden="true" /></button>
            <button className="button-quiet" type="button" onClick={scrollToPreview}><Play aria-hidden="true" />查看工作台示例</button>
          </div>
          <p className="sample-note"><Sparkles aria-hidden="true" />以下数据均为产品演示示例</p>
        </div>

        <div className="engine-stage" aria-label="多平台数据进入运营引擎的示意图">
          <div className="orbital-grid" />
          <p className="stage-caption">SOURCE → VERIFY → DECIDE</p>
          <div className="platform-cluster">
            {platformNodes.map((node, index) => <div className={`platform-node node-${index + 1}`} key={node}><span className="node-dot" />{node}</div>)}
          </div>
          <div className="signal-lines" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="engine-core">
            <div className="engine-rings"><i /><i /><i /></div>
            <div className="engine-center"><Network aria-hidden="true" /><span>{content.engine}</span><small>DATA / 01</small></div>
          </div>
          <div className="output-rail">
            {content.outputs.map((output, index) => (
              <article className="engine-output" key={output.label} style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}>
                <span className={`output-icon ${output.tone ?? ''}`}>{output.tone === 'alert' ? <CircleAlert aria-hidden="true" /> : <BadgeCheck aria-hidden="true" />}</span>
                <div><p>{output.label}</p><strong>{output.value}</strong><small>{output.detail}</small></div>
              </article>
            ))}
          </div>
        </div>
        <a className="scroll-cue" href="#workbench-preview">向下查看系统如何判断 <ArrowDownRight aria-hidden="true" /></a>
      </section>

      <section className="proof-strip" aria-label="产品能力摘要">
        <span><Database aria-hidden="true" />多来源数据汇入</span><span><FileCheck2 aria-hidden="true" />规则与 AI 双重核验</span><span><ScanSearch aria-hidden="true" />每项结论可追溯</span>
      </section>

      <section className="workbench-section" id="workbench-preview" aria-labelledby="workbench-title">
        <div className="section-heading"><p className="kicker"><span />THE WORKBENCH</p><h2 id="workbench-title">镜头推进，问题才浮出来。</h2><p>从今天的经营结果，看到异常费用，再回到来源批次和审核记录。</p></div>
        <div className="dashboard-scene">
          <div className="scene-glow" />
          <article className="dashboard-frame">
            <header><div className="window-dots"><i /><i /><i /></div><span>澄明 / {content.dashboard.title}</span><span className="frame-date">2026.07.14 · 示例</span></header>
            <div className="dashboard-body">
              <section className="dashboard-main">
                <p className="dashboard-label">{content.dashboard.title}</p><strong className="dashboard-value">{content.dashboard.value}</strong><span className="positive"><ArrowUpRight aria-hidden="true" />{content.dashboard.delta}</span>
                <div className="chart-bars">{content.dashboard.bars.map((height, index) => <i key={index} style={{ '--bar-height': `${height}%`, '--bar-delay': `${index * 70}ms` } as React.CSSProperties} />)}</div>
                <div className="chart-axis"><span>07/07</span><span>07/10</span><span>07/14</span></div>
              </section>
              <aside className="dashboard-side"><p>需要处理</p><div className="alert-card"><CircleAlert aria-hidden="true" /><div><strong>{content.dashboard.alert}</strong><small>已关联到来源批次 · 可继续追问</small></div><ChevronRight aria-hidden="true" /></div><p className="side-title">核验状态</p><div className="verification"><span><Check aria-hidden="true" />规则计算</span><b>通过</b><span><Check aria-hidden="true" />AI 复核</span><b>通过</b><span><Layers3 aria-hidden="true" />人工确认</span><b>待处理</b></div></aside>
            </div>
          </article>
          <div className="scene-label scene-label-a"><span>01</span>经营总览</div><div className="scene-label scene-label-b"><span>02</span>异常定位</div><div className="scene-label scene-label-c"><span>03</span>追溯来源</div>
        </div>
      </section>

      <section className="trust-section">
        <article><p className="kicker"><span />DATA YOU CAN CHECK</p><h2>数据不是结论。<br />能回查才算。</h2><p>从原始账单、字段规则到人工确认，每个数字都保留自己的来处。智能体负责发现和解释，不替你跳过审核。</p><a href="#workbench-preview">看看核验过程 <ArrowUpRight aria-hidden="true" /></a></article>
        <div className="trust-path"><div><span>01</span><strong>来源</strong><small>账单、日报、平台接口</small></div><div><span>02</span><strong>规则</strong><small>统一日期和金额口径</small></div><div><span>03</span><strong>复核</strong><small>差异自动进入待办</small></div><div><span>04</span><strong>确认</strong><small>发布可信经营数据</small></div></div>
      </section>

      <section className="closing-cta"><p className="kicker"><span />START WITH ONE REPORT</p><h2>先把一份日报看明白。</h2><p>带上你们正在用的表，我们用真实的经营问题演示这张桌面能做什么。</p><button className="button-primary" type="button" onClick={() => setDemoOpen(true)}>申请演示 <ArrowUpRight aria-hidden="true" /></button></section>

      {demoOpen ? <div className="demo-dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDemoOpen(false)}><section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="demo-title"><button type="button" aria-label="关闭" onClick={() => setDemoOpen(false)}>×</button><p className="kicker"><span />REQUEST A DEMO</p><h2 id="demo-title">带一份正在使用的日报来。</h2><p>演示申请入口已准备好；接入流程会根据平台、店铺数量和当前数据来源确认。</p><a className="button-primary" href="mailto:hello@example.com?subject=申请澄明演示">发送演示申请 <ArrowUpRight aria-hidden="true" /></a></section></div> : null}
    </main>
  )
}
