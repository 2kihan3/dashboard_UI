import { type FormEvent, useMemo, useRef, useState } from 'react'
import {
  Check,
  FileArchive,
  FileCode2,
  Pencil,
  Plus,
  Power,
  Search,
  Settings2,
  ShieldCheck,
  Trash2,
  Upload,
  UsersRound,
  X,
} from 'lucide-react'

type SkillStatus = 'enabled' | 'disabled' | 'review' | 'rejected'
type SkillSource = 'official' | 'uploaded'
type SkillConfigTab = 'basic' | 'teams'

interface SkillRecord {
  skillId: string
  name: string
  description: string
  owner: string
  version: string
  status: SkillStatus
  source: SkillSource
  sourceReviewPending?: boolean
  teamIds: string[]
  updatedAt: string
}

const availableTeams = [
  { id: 'team-1', name: '澄明电商运营团队', merchant: '杭州思辰电子商务有限公司' },
  { id: 'team-2', name: '京倍数字营销团队', merchant: '京倍数字科技有限公司' },
  { id: 'team-3', name: '万顷品牌管理团队', merchant: '万顷品牌管理有限公司' },
  { id: 'team-4', name: '星途内容增长团队', merchant: '星途内容科技有限公司' },
]

const initialSkills: SkillRecord[] = [
  {
    skillId: 'daily_report_query',
    name: '日报查询',
    description: '查询指定店铺与日期的日报状态，并返回已生成的日报结果。',
    owner: '经营引擎产品组',
    version: '1.2.0',
    status: 'enabled',
    source: 'official',
    teamIds: ['team-1', 'team-2', 'team-3'],
    updatedAt: '2026-08-27 18:20',
  },
  {
    skillId: 'daily_report_dispatch',
    name: '日报任务下发',
    description: '按固定模板创建或补发日报任务，并调用已有抓取与计算流程。',
    owner: '经营引擎产品组',
    version: '1.1.3',
    status: 'enabled',
    source: 'official',
    teamIds: ['team-1'],
    updatedAt: '2026-08-26 11:45',
  },
  {
    skillId: 'business_overview',
    name: '经营概览分析',
    description: '汇总核心经营指标，识别近期变化并生成简要经营结论。',
    owner: '数据产品组',
    version: '0.9.5',
    status: 'enabled',
    source: 'official',
    teamIds: ['team-1', 'team-3'],
    updatedAt: '2026-08-25 16:08',
  },
  {
    skillId: 'sales_decline_diagnosis',
    name: '销售下滑诊断',
    description: '按流量、转化和客单等维度定位销售下滑的主要原因。',
    owner: '数据产品组',
    version: '0.6.0',
    status: 'disabled',
    source: 'official',
    teamIds: [],
    updatedAt: '2026-08-22 09:30',
  },
  {
    skillId: 'inventory_health_review',
    name: '库存健康检查',
    description: '识别库存积压与缺货风险，输出需要优先处理的商品清单。',
    owner: '生态合作方',
    version: '0.1.0',
    status: 'review',
    source: 'uploaded',
    sourceReviewPending: true,
    teamIds: [],
    updatedAt: '2026-08-27 14:12',
  },
]

const statusCopy: Record<SkillStatus, string> = {
  enabled: '已启用',
  disabled: '已停用',
  review: '待审核',
  rejected: '已驳回',
}

export default function SkillManagementPage() {
  const [skills, setSkills] = useState(initialSkills)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | SkillStatus>('all')
  const [editingSkill, setEditingSkill] = useState<SkillRecord | null>(null)
  const [configTab, setConfigTab] = useState<SkillConfigTab>('basic')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [createDraft, setCreateDraft] = useState({ name: '', skillId: '', version: '1.0.0', owner: '', description: '' })
  const [createError, setCreateError] = useState('')
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadTargetSkillId, setUploadTargetSkillId] = useState('')
  const [uploadDescription, setUploadDescription] = useState('')
  const [reviewingSkillId, setReviewingSkillId] = useState('')
  const [notice, setNotice] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return skills.filter((skill) => {
      const matchesStatus = statusFilter === 'all' || skill.status === statusFilter
      const matchesQuery = !normalizedQuery || `${skill.name} ${skill.skillId} ${skill.owner}`.toLowerCase().includes(normalizedQuery)
      return matchesStatus && matchesQuery
    })
  }, [query, skills, statusFilter])

  const enabledCount = skills.filter((skill) => skill.status === 'enabled').length
  const reviewCount = skills.filter((skill) => skill.status === 'review' || skill.sourceReviewPending).length
  const coveredTeamCount = new Set(skills.flatMap((skill) => skill.teamIds)).size
  const uploadTargetSkill = skills.find((skill) => skill.skillId === uploadTargetSkillId)
  const reviewingSkill = skills.find((skill) => skill.skillId === reviewingSkillId)

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const openConfig = (skill: SkillRecord, tab: SkillConfigTab = 'basic') => {
    setEditingSkill({ ...skill, teamIds: [...skill.teamIds] })
    setConfigTab(tab)
  }

  const saveConfig = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingSkill) return
    const name = editingSkill.name.trim()
    const description = editingSkill.description.trim()
    if (!name || !description) return
    const nextSkill = { ...editingSkill, name, description, updatedAt: new Date().toLocaleString('zh-CN', { hour12: false }).replaceAll('/', '-') }
    setSkills((current) => current.map((skill) => skill.skillId === nextSkill.skillId ? nextSkill : skill))
    setEditingSkill(null)
    showNotice(`已保存「${name}」的配置`)
  }

  const toggleSkillStatus = (skill: SkillRecord) => {
    if (skill.status === 'review' || skill.status === 'rejected') return
    const nextStatus: SkillStatus = skill.status === 'enabled' ? 'disabled' : 'enabled'
    setSkills((current) => current.map((item) => item.skillId === skill.skillId ? { ...item, status: nextStatus, updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') } : item))
    showNotice(`「${skill.name}」已${nextStatus === 'enabled' ? '启用' : '停用'}`)
  }

  const deleteSkill = (skill: SkillRecord) => {
    if (skill.status === 'enabled') return
    if (window.confirm(`确定删除「${skill.name}」吗？删除后无法恢复。`)) {
      setSkills((current) => current.filter((item) => item.skillId !== skill.skillId))
      showNotice(`已删除「${skill.name}」`)
    }
  }

  const handleFile = (file: File | undefined) => {
    if (!file) return
    setUploadFile(file)
  }

  const isValidSkillId = (skillId: string) => /^[a-z][a-z0-9_]*$/.test(skillId)

  const submitCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const skillId = createDraft.skillId.trim()
    if (!isValidSkillId(skillId)) {
      setCreateError('唯一 ID 需以小写字母开头，仅使用小写字母、数字和下划线。')
      return
    }
    if (skills.some((skill) => skill.skillId === skillId)) {
      setCreateError('该唯一 ID 已存在，请更换后再创建。')
      return
    }
    const nextSkill: SkillRecord = {
      skillId,
      name: createDraft.name.trim(),
      description: createDraft.description.trim(),
      owner: createDraft.owner.trim(),
      version: createDraft.version.trim() || '1.0.0',
      status: 'disabled',
      source: 'official',
      teamIds: [],
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    }
    setSkills((current) => [nextSkill, ...current])
    setIsCreateOpen(false)
    setCreateDraft({ name: '', skillId: '', version: '1.0.0', owner: '', description: '' })
    setCreateError('')
    showNotice(`已创建「${nextSkill.name}」，请继续配置团队可用性`)
  }

  const submitUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!uploadFile || !uploadTargetSkill) return
    setSkills((current) => current.map((skill) => skill.skillId === uploadTargetSkill.skillId
      ? { ...skill, status: skill.status === 'rejected' ? 'review' : skill.status, sourceReviewPending: true, updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
      : skill))
    setIsUploadOpen(false)
    setUploadFile(null)
    setUploadTargetSkillId('')
    setUploadDescription('')
    showNotice(`「${uploadTargetSkill.name}」的新源码已提交审核，当前版本继续生效`)
  }

  const approveReview = () => {
    if (!reviewingSkill) return
    const isInitialReview = reviewingSkill.status === 'review'
    setSkills((current) => current.map((skill) => skill.skillId === reviewingSkill.skillId
      ? {
          ...skill,
          status: isInitialReview ? 'disabled' : skill.status,
          source: 'uploaded',
          sourceReviewPending: false,
          updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        }
      : skill))
    setReviewingSkillId('')
    showNotice(`「${reviewingSkill.name}」已审核通过`)
  }

  const rejectReview = () => {
    if (!reviewingSkill) return
    const isInitialReview = reviewingSkill.status === 'review'
    setSkills((current) => current.map((skill) => skill.skillId === reviewingSkill.skillId
      ? {
          ...skill,
          status: isInitialReview ? 'rejected' : skill.status,
          sourceReviewPending: false,
          updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        }
      : skill))
    setReviewingSkillId('')
    showNotice(`「${reviewingSkill.name}」已驳回，可修改后重新上传`)
  }

  const toggleEditingTeam = (teamId: string) => {
    setEditingSkill((current) => {
      if (!current) return current
      const nextTeamIds = current.teamIds.includes(teamId)
        ? current.teamIds.filter((id) => id !== teamId)
        : [...current.teamIds, teamId]
      return { ...current, teamIds: nextTeamIds }
    })
  }

  return (
    <main className="platform-admin-main skill-management-page" id="main-content" tabIndex={-1} aria-labelledby="skill-management-title">
      <header className="skill-management-header">
        <div>
          <span>AI 配置 / 经营引擎</span>
          <h1 id="skill-management-title">Skill 管理</h1>
          <p>维护 Skill 唯一 ID、基础信息和团队可用范围。调用时按 ID 与用户有效权限集合完成权鉴。</p>
        </div>
        <div className="skill-management-header__actions">
          <button className="skill-management-secondary" type="button" onClick={() => setIsUploadOpen(true)}><Upload aria-hidden="true" />上传源码</button>
          <button className="skill-management-primary" type="button" onClick={() => setIsCreateOpen(true)}><Plus aria-hidden="true" />新增 Skill</button>
        </div>
      </header>

      <section className="skill-management-summary" aria-label="Skill 概览">
        <article><span>Skill 总数</span><strong>{skills.length}</strong><small>包含官方与上传来源</small></article>
        <article><span>已启用</span><strong>{enabledCount}</strong><small>可进入 Agent Runtime</small></article>
        <article><span>待审核</span><strong>{reviewCount}</strong><small>尚未对生产环境开放</small></article>
        <article><span>覆盖团队</span><strong>{coveredTeamCount}</strong><small>至少拥有一个可用 Skill</small></article>
      </section>

      <section className="skill-management-list" aria-label="Skill 列表">
        <header className="skill-management-toolbar">
          <div>
            <h2>Skill 列表</h2>
            <span>共 {filteredSkills.length} 条</span>
          </div>
          <div className="skill-management-filters">
            <label className="skill-search">
              <span className="sr-only">搜索 Skill</span>
              <Search aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索名称、唯一 ID 或负责人" />
            </label>
            <label className="skill-status-filter">
              <span className="sr-only">按状态筛选</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | SkillStatus)}>
                <option value="all">全部状态</option>
                <option value="enabled">已启用</option>
                <option value="disabled">已停用</option>
                <option value="review">待审核</option>
                <option value="rejected">已驳回</option>
              </select>
            </label>
          </div>
        </header>

        <div className="skill-management-table-wrap">
          <table className="skill-management-table">
            <thead>
              <tr><th>Skill</th><th>唯一 ID</th><th>状态</th><th>版本与来源</th><th>可用团队</th><th>更新时间</th><th>操作</th></tr>
            </thead>
            <tbody>
              {filteredSkills.map((skill) => {
                const teamNames = availableTeams.filter((team) => skill.teamIds.includes(team.id)).map((team) => team.name)
                return (
                  <tr key={skill.skillId}>
                    <td>
                      <div className="skill-list-identity">
                        <span aria-hidden="true"><FileCode2 /></span>
                        <div><strong>{skill.name}</strong><small>{skill.description}</small></div>
                      </div>
                    </td>
                    <td><code className="skill-id-cell">{skill.skillId}</code></td>
                    <td><span className={`skill-status skill-status--${skill.status}`}>{statusCopy[skill.status]}</span></td>
                    <td><div className="skill-version-cell"><strong>v{skill.version}</strong><span>{skill.sourceReviewPending ? '新源码审核中' : skill.source === 'official' ? '平台维护' : '源码上传'}</span></div></td>
                    <td>
                      <button className="skill-team-summary" type="button" disabled={skill.status === 'review'} title={skill.status === 'review' ? '审核通过后才能配置团队' : '配置可用团队'} onClick={() => openConfig(skill, 'teams')} aria-label={`配置${skill.name}的可用团队`}>
                        <UsersRound aria-hidden="true" />
                        <span>{teamNames.length ? `${teamNames.length} 个团队` : '未分配'}</span>
                      </button>
                    </td>
                    <td><span className="skill-updated-at">{skill.updatedAt}</span></td>
                    <td>
                      <div className="skill-row-actions">
                        {skill.status === 'review' || skill.sourceReviewPending ? <button className="skill-row-review" type="button" aria-label={`审核${skill.name}`} onClick={() => setReviewingSkillId(skill.skillId)}><ShieldCheck aria-hidden="true" />审核</button> : null}
                        <button className="skill-row-maintain" type="button" aria-label={`维护${skill.name}`} onClick={() => openConfig(skill)}><Pencil aria-hidden="true" />维护</button>
                        <button type="button" title={skill.status === 'review' || skill.status === 'rejected' ? '审核通过后才能启停' : skill.status === 'enabled' ? '停用 Skill' : '启用 Skill'} aria-label={`${skill.status === 'enabled' ? '停用' : '启用'}${skill.name}`} disabled={skill.status === 'review' || skill.status === 'rejected'} onClick={() => toggleSkillStatus(skill)}><Power aria-hidden="true" /></button>
                        <button className="danger" type="button" title={skill.status === 'enabled' ? '请先停用后再删除' : '删除 Skill'} aria-label={`删除${skill.name}`} disabled={skill.status === 'enabled'} onClick={() => deleteSkill(skill)}><Trash2 aria-hidden="true" /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filteredSkills.length === 0 ? <div className="skill-management-empty"><Search aria-hidden="true" /><strong>没有匹配的 Skill</strong><span>换个名称、编码或状态试试。</span></div> : null}
        </div>
      </section>

      {notice ? <div className="skill-management-notice" role="status"><Check aria-hidden="true" />{notice}</div> : null}

      {editingSkill ? (
        <div className="skill-config-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingSkill(null)}>
          <form className="skill-config-panel" onSubmit={saveConfig} role="dialog" aria-modal="true" aria-labelledby="skill-config-title">
            <header>
              <div><span>Skill 维护</span><h2 id="skill-config-title">{editingSkill.name}</h2><code>{editingSkill.skillId}</code></div>
              <button type="button" aria-label="关闭 Skill 配置" onClick={() => setEditingSkill(null)}><X aria-hidden="true" /></button>
            </header>

            <nav className="skill-config-tabs" aria-label="Skill 配置分类">
              <button type="button" className={configTab === 'basic' ? 'active' : ''} onClick={() => setConfigTab('basic')}><Settings2 aria-hidden="true" />基础信息</button>
              <button type="button" className={configTab === 'teams' ? 'active' : ''} disabled={editingSkill.status === 'review' || editingSkill.status === 'rejected'} title={editingSkill.status === 'review' || editingSkill.status === 'rejected' ? '审核通过后才能配置团队' : '配置团队可用性'} onClick={() => setConfigTab('teams')}><UsersRound aria-hidden="true" />团队可用性<span>{editingSkill.teamIds.length}</span></button>
            </nav>

            <div className="skill-config-body">
              {configTab === 'basic' ? (
                <fieldset className="skill-config-fields">
                  <legend>基础信息</legend>
                  <label><span>Skill 名称</span><input value={editingSkill.name} onChange={(event) => setEditingSkill({ ...editingSkill, name: event.target.value })} required /></label>
                  <label><span>Skill 唯一 ID</span><input value={editingSkill.skillId} readOnly /><small>用于调用路由和权限匹配，创建后不可修改。</small></label>
                  <div className="skill-config-grid">
                    <label><span>当前版本</span><input value={editingSkill.version} onChange={(event) => setEditingSkill({ ...editingSkill, version: event.target.value })} /></label>
                    <label><span>维护负责人</span><input value={editingSkill.owner} onChange={(event) => setEditingSkill({ ...editingSkill, owner: event.target.value })} /></label>
                  </div>
                  <label><span>能力说明</span><textarea value={editingSkill.description} onChange={(event) => setEditingSkill({ ...editingSkill, description: event.target.value })} rows={5} required /></label>
                  <label className="skill-config-status"><input type="checkbox" checked={editingSkill.status === 'enabled'} disabled={editingSkill.status === 'review' || editingSkill.status === 'rejected'} onChange={(event) => setEditingSkill({ ...editingSkill, status: event.target.checked ? 'enabled' : 'disabled' })} /><span><strong>启用 Skill</strong><small>{editingSkill.status === 'review' ? '该 Skill 仍在审核，暂不能启用。' : editingSkill.status === 'rejected' ? '该 Skill 已被驳回，需要重新上传源码并审核。' : '启用后，已分配团队可以在 Agent 中调用。'}</small></span></label>
                </fieldset>
              ) : (
                <fieldset className="skill-team-config">
                  <legend>团队可用性</legend>
                  <div className="skill-team-config__summary">
                    <div><ShieldCheck aria-hidden="true" /><span><strong>已选择 {editingSkill.teamIds.length} 个团队</strong><small>团队开通后，可由商户管理员继续分配给小组或成员。</small></span></div>
                    <div><button type="button" onClick={() => setEditingSkill({ ...editingSkill, teamIds: availableTeams.map((team) => team.id) })}>全选</button><button type="button" onClick={() => setEditingSkill({ ...editingSkill, teamIds: [] })}>清空</button></div>
                  </div>
                  <div className="skill-team-options">
                    {availableTeams.map((team) => (
                      <label key={team.id}>
                        <input type="checkbox" checked={editingSkill.teamIds.includes(team.id)} onChange={() => toggleEditingTeam(team.id)} />
                        <span><strong>{team.name}</strong><small>{team.merchant}</small></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>

            <footer><button type="button" onClick={() => setEditingSkill(null)}>取消</button><button type="submit">保存配置</button></footer>
          </form>
        </div>
      ) : null}

      {isCreateOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsCreateOpen(false)}>
          <form className="ledger-dialog skill-upload-dialog" onSubmit={submitCreate} role="dialog" aria-modal="true" aria-labelledby="skill-create-title">
            <header><div><span>经营引擎</span><h2 id="skill-create-title">新增 Skill</h2></div><button className="dialog-close" type="button" aria-label="关闭新增弹窗" onClick={() => setIsCreateOpen(false)}><X aria-hidden="true" /></button></header>
            <div className="skill-upload-dialog__body">
              <label className="dialog-field"><span>Skill 名称</span><input value={createDraft.name} onChange={(event) => setCreateDraft({ ...createDraft, name: event.target.value })} placeholder="例如：经营概览分析" required /></label>
              <label className="dialog-field"><span>Skill 唯一 ID</span><input value={createDraft.skillId} onChange={(event) => { setCreateDraft({ ...createDraft, skillId: event.target.value.trim().toLowerCase() }); setCreateError('') }} placeholder="例如：business_overview" required /><small>作为调用和权限匹配的唯一标识，创建后不可修改。</small></label>
              <div className="skill-create-grid">
                <label className="dialog-field"><span>初始版本</span><input value={createDraft.version} onChange={(event) => setCreateDraft({ ...createDraft, version: event.target.value })} required /></label>
                <label className="dialog-field"><span>维护负责人</span><input value={createDraft.owner} onChange={(event) => setCreateDraft({ ...createDraft, owner: event.target.value })} placeholder="团队或负责人" required /></label>
              </div>
              <label className="dialog-field"><span>能力说明</span><textarea value={createDraft.description} onChange={(event) => setCreateDraft({ ...createDraft, description: event.target.value })} placeholder="说明适用场景、输入和预期结果" rows={4} required /></label>
              {createError ? <div className="skill-form-error" role="alert">{createError}</div> : null}
              <div className="skill-create-note"><ShieldCheck aria-hidden="true" /><span><strong>默认保持停用</strong><small>创建后可从列表进入“维护”，配置基础信息和团队可用范围，再决定是否启用。</small></span></div>
            </div>
            <footer><button className="secondary-action" type="button" onClick={() => setIsCreateOpen(false)}>取消</button><button className="primary-action" type="submit" disabled={!createDraft.name.trim() || !createDraft.skillId.trim() || !createDraft.owner.trim() || !createDraft.description.trim()}>创建 Skill</button></footer>
          </form>
        </div>
      ) : null}

      {reviewingSkill ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setReviewingSkillId('')}>
          <section className="ledger-dialog skill-review-dialog" role="dialog" aria-modal="true" aria-labelledby="skill-review-title">
            <header><div><span>Skill 审核</span><h2 id="skill-review-title">{reviewingSkill.name}</h2></div><button className="dialog-close" type="button" aria-label="关闭审核弹窗" onClick={() => setReviewingSkillId('')}><X aria-hidden="true" /></button></header>
            <div className="skill-review-dialog__body">
              <div className="skill-review-summary"><ShieldCheck aria-hidden="true" /><span><strong>{reviewingSkill.status === 'review' ? 'Skill 上线审核' : '源码版本审核'}</strong><small>{reviewingSkill.status === 'review' ? '通过后进入已停用状态，完成团队配置后再启用。' : '通过后更新已审核源码，当前启停状态和权限关系保持不变。'}</small></span></div>
              <dl>
                <div><dt>Skill 名称</dt><dd>{reviewingSkill.name}</dd></div>
                <div><dt>唯一 ID</dt><dd><code>{reviewingSkill.skillId}</code></dd></div>
                <div><dt>当前版本</dt><dd>v{reviewingSkill.version}</dd></div>
                <div><dt>维护负责人</dt><dd>{reviewingSkill.owner}</dd></div>
              </dl>
              <div className="skill-review-checklist"><strong>审核确认项</strong><span><Check aria-hidden="true" />Skill 结构与基础信息完整</span><span><Check aria-hidden="true" />Tool 调用范围符合平台白名单</span><span><Check aria-hidden="true" />未发现越权读取或高风险执行逻辑</span></div>
            </div>
            <footer><button className="skill-review-reject" type="button" onClick={rejectReview}>驳回</button><button className="secondary-action" type="button" onClick={() => setReviewingSkillId('')}>取消</button><button className="primary-action" type="button" onClick={approveReview}><Check aria-hidden="true" />审核通过</button></footer>
          </section>
        </div>
      ) : null}

      {isUploadOpen ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsUploadOpen(false)}>
          <form className="ledger-dialog skill-upload-dialog" onSubmit={submitUpload} role="dialog" aria-modal="true" aria-labelledby="skill-upload-title">
            <header><div><span>经营引擎</span><h2 id="skill-upload-title">上传 Skill 源码</h2></div><button className="dialog-close" type="button" aria-label="关闭上传弹窗" onClick={() => setIsUploadOpen(false)}><X aria-hidden="true" /></button></header>
            <div className="skill-upload-dialog__body">
              <label className="dialog-field"><span>选择已有 Skill</span><select value={uploadTargetSkillId} onChange={(event) => setUploadTargetSkillId(event.target.value)} required><option value="">请选择需要更新源码的 Skill</option>{skills.map((skill) => <option key={skill.skillId} value={skill.skillId}>{skill.name}</option>)}</select><small>源码只能关联到已创建的 Skill，不会生成新的权限对象。</small></label>
              <label className="dialog-field"><span>Skill 唯一 ID</span><input value={uploadTargetSkill?.skillId ?? ''} placeholder="选择 Skill 后自动回显" readOnly /></label>
              <label className="skill-upload-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files[0]) }}>
                <input ref={fileInputRef} type="file" accept=".md,.zip" onChange={(event) => handleFile(event.target.files?.[0])} required />
                {uploadFile ? <><FileArchive aria-hidden="true" /><strong>{uploadFile.name}</strong><span>{Math.max(1, Math.round(uploadFile.size / 1024))} KB，点击可重新选择</span></> : <><Upload aria-hidden="true" /><strong>选择或拖入 Skill 文件</strong><span>支持 SKILL.md 或 ZIP 源码包，单文件不超过 20 MB</span></>}
              </label>
              <label className="dialog-field"><span>本次变更说明</span><textarea value={uploadDescription} onChange={(event) => setUploadDescription(event.target.value)} placeholder="说明新增能力、修复内容或依赖变化" rows={4} /></label>
              <div className="skill-upload-review-note"><ShieldCheck aria-hidden="true" /><span><strong>审核期间不影响当前版本</strong><small>新源码将进入结构、安全和 Tool 兼容性审核。审核通过后再形成可发布版本，原有权限关系保持不变。</small></span></div>
            </div>
            <footer><button className="secondary-action" type="button" onClick={() => setIsUploadOpen(false)}>取消</button><button className="primary-action" type="submit" disabled={!uploadFile || !uploadTargetSkillId}>提交审核</button></footer>
          </form>
        </div>
      ) : null}
    </main>
  )
}
