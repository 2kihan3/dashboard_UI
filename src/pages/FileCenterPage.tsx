import { type ChangeEvent, type DragEvent, useMemo, useState } from 'react'
import {
  Bot,
  Check,
  ChevronRight,
  Clock3,
  Download,
  FileArchive,
  FileChartColumn,
  FileImage,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  HardDrive,
  Link2,
  MessageSquarePlus,
  MoreHorizontal,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Upload,
  UserRound,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react'

type FileView = 'all' | 'personal' | 'team' | 'generated' | 'recent' | 'trash'
type ArtifactKind = 'xlsx' | 'csv' | 'pdf' | 'docx' | 'png' | 'zip'
type ArtifactStatus = 'ready' | 'processing' | 'failed'

interface ArtifactRecord {
  id: string
  name: string
  kind: ArtifactKind
  size: string
  source: '用户上传' | 'Agent 生成' | '自动化任务'
  space: '个人空间' | '澄明电商运营团队'
  visibility: '仅自己' | '团队成员' | '指定成员'
  owner: string
  task: string
  skill?: string
  updatedAt: string
  status: ArtifactStatus
  trashed?: boolean
}

const initialArtifacts: ArtifactRecord[] = [
  { id: 'art-1008', name: '8月全渠道经营分析报告.pdf', kind: 'pdf', size: '4.8 MB', source: 'Agent 生成', space: '澄明电商运营团队', visibility: '团队成员', owner: '李运营', task: '8月经营复盘', skill: 'excel_business_analysis', updatedAt: '今天 09:42', status: 'ready' },
  { id: 'art-1007', name: '8月销售明细.xlsx', kind: 'xlsx', size: '12.6 MB', source: '用户上传', space: '个人空间', visibility: '仅自己', owner: '李运营', task: '8月经营复盘', updatedAt: '今天 09:31', status: 'ready' },
  { id: 'art-1006', name: '经营指标 Fact Pack.xlsx', kind: 'xlsx', size: '1.3 MB', source: 'Agent 生成', space: '澄明电商运营团队', visibility: '团队成员', owner: '小万同学', task: '8月经营复盘', skill: 'excel_business_analysis', updatedAt: '今天 09:40', status: 'ready' },
  { id: 'art-1005', name: '渠道销售趋势图.png', kind: 'png', size: '680 KB', source: 'Agent 生成', space: '澄明电商运营团队', visibility: '团队成员', owner: '小万同学', task: '8月经营复盘', skill: 'excel_business_analysis', updatedAt: '今天 09:39', status: 'ready' },
  { id: 'art-1004', name: '唯品会日报源表_20260828.xlsx', kind: 'xlsx', size: '7.2 MB', source: '自动化任务', space: '澄明电商运营团队', visibility: '团队成员', owner: '日报自动化', task: '唯品会日报任务', skill: 'daily_report_dispatch', updatedAt: '8月29日 08:12', status: 'ready' },
  { id: 'art-1003', name: '库存异常商品清单.csv', kind: 'csv', size: '920 KB', source: 'Agent 生成', space: '个人空间', visibility: '仅自己', owner: '李运营', task: '库存健康检查', skill: 'excel_data_validation', updatedAt: '8月27日 17:46', status: 'ready' },
  { id: 'art-1002', name: '平台招商资料.zip', kind: 'zip', size: '28.4 MB', source: '用户上传', space: '澄明电商运营团队', visibility: '指定成员', owner: '陈分析', task: '平台招商资料整理', updatedAt: '8月26日 14:20', status: 'processing' },
  { id: 'art-1001', name: '旧版费用核验表.xlsx', kind: 'xlsx', size: '3.1 MB', source: '用户上传', space: '个人空间', visibility: '仅自己', owner: '李运营', task: '费用核验', updatedAt: '8月18日 11:05', status: 'ready', trashed: true },
]

const kindIcons: Record<ArtifactKind, LucideIcon> = {
  xlsx: FileSpreadsheet,
  csv: FileChartColumn,
  pdf: FileText,
  docx: FileText,
  png: FileImage,
  zip: FileArchive,
}

const statusLabels: Record<ArtifactStatus, string> = {
  ready: '可用',
  processing: '解析中',
  failed: '处理失败',
}

const navigation: Array<{ key: FileView; label: string; icon: LucideIcon }> = [
  { key: 'all', label: '全部文件', icon: FolderOpen },
  { key: 'personal', label: '我的文件', icon: UserRound },
  { key: 'team', label: '团队文件', icon: UsersRound },
  { key: 'generated', label: 'Agent 产物', icon: Bot },
  { key: 'recent', label: '最近使用', icon: Clock3 },
  { key: 'trash', label: '回收站', icon: Trash2 },
]

export default function FileCenterPage() {
  const [artifacts, setArtifacts] = useState(initialArtifacts)
  const [view, setView] = useState<FileView>('all')
  const [query, setQuery] = useState('')
  const [kindFilter, setKindFilter] = useState<'all' | ArtifactKind>('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [previewId, setPreviewId] = useState('')
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<File[]>([])
  const [uploadSpace, setUploadSpace] = useState<ArtifactRecord['space']>('个人空间')
  const [notice, setNotice] = useState('')

  const counts = useMemo(() => ({
    all: artifacts.filter((item) => !item.trashed).length,
    personal: artifacts.filter((item) => !item.trashed && item.space === '个人空间').length,
    team: artifacts.filter((item) => !item.trashed && item.space !== '个人空间').length,
    generated: artifacts.filter((item) => !item.trashed && item.source === 'Agent 生成').length,
    recent: artifacts.filter((item) => !item.trashed).slice(0, 5).length,
    trash: artifacts.filter((item) => item.trashed).length,
  }), [artifacts])

  const visibleArtifacts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return artifacts.filter((item, index) => {
      const matchesView = view === 'trash' ? item.trashed
        : !item.trashed && (view === 'all'
          || view === 'personal' && item.space === '个人空间'
          || view === 'team' && item.space !== '个人空间'
          || view === 'generated' && item.source === 'Agent 生成'
          || view === 'recent' && index < 5)
      const matchesKind = kindFilter === 'all' || item.kind === kindFilter
      const matchesQuery = !normalizedQuery || `${item.name} ${item.task} ${item.skill ?? ''} ${item.owner}`.toLowerCase().includes(normalizedQuery)
      return matchesView && matchesKind && matchesQuery
    })
  }, [artifacts, kindFilter, query, view])

  const previewArtifact = artifacts.find((item) => item.id === previewId)
  const allVisibleSelected = visibleArtifacts.length > 0 && visibleArtifacts.every((item) => selectedIds.includes(item.id))

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const toggleSelection = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const moveToTrash = (ids: string[]) => {
    setArtifacts((current) => current.map((item) => ids.includes(item.id) ? { ...item, trashed: true } : item))
    setSelectedIds([])
    setPreviewId('')
    showNotice(`已将 ${ids.length} 个文件移入回收站`)
  }

  const restoreArtifact = (id: string) => {
    setArtifacts((current) => current.map((item) => item.id === id ? { ...item, trashed: false } : item))
    showNotice('文件已恢复到原空间')
  }

  const handleUploadFiles = (event: ChangeEvent<HTMLInputElement>) => {
    setUploadFiles(Array.from(event.target.files ?? []))
  }

  const handleUploadDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setUploadFiles(Array.from(event.dataTransfer.files))
  }

  const submitUpload = () => {
    if (!uploadFiles.length) return
    const now = new Date().toLocaleString('zh-CN', { hour12: false }).replaceAll('/', '-')
    const nextArtifacts: ArtifactRecord[] = uploadFiles.map((file, index) => {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? 'xlsx'
      const kind: ArtifactKind = ['xlsx', 'csv', 'pdf', 'docx', 'png', 'zip'].includes(extension) ? extension as ArtifactKind : 'zip'
      return {
        id: `art-${Date.now()}-${index}`,
        name: file.name,
        kind,
        size: file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(file.size / 1024))} KB`,
        source: '用户上传',
        space: uploadSpace,
        visibility: uploadSpace === '个人空间' ? '仅自己' : '团队成员',
        owner: '李运营',
        task: '尚未关联任务',
        updatedAt: now,
        status: 'processing',
      }
    })
    setArtifacts((current) => [...nextArtifacts, ...current])
    setUploadFiles([])
    setIsUploadOpen(false)
    setView(uploadSpace === '个人空间' ? 'personal' : 'team')
    showNotice(`已上传 ${nextArtifacts.length} 个文件，正在解析`)
  }

  return (
    <section className="page-stack file-center-page" aria-labelledby="file-center-title">
      <header className="file-center-header">
        <div>
          <span className="eyebrow">artifact_center</span>
          <h1 id="file-center-title">文件中心</h1>
          <p>集中管理上传文件、Agent 产物及其任务来源和权限范围。</p>
        </div>
        <button className="primary-action file-center-upload" type="button" onClick={() => setIsUploadOpen(true)}><Upload aria-hidden="true" />上传文件</button>
      </header>

      <section className="file-center-metrics" aria-label="文件概览">
        <div><FolderOpen aria-hidden="true" /><span><strong>{counts.all}</strong><small>可用文件</small></span></div>
        <div><Bot aria-hidden="true" /><span><strong>{counts.generated}</strong><small>Agent 产物</small></span></div>
        <div><HardDrive aria-hidden="true" /><span><strong>58.7 MB</strong><small>已使用 / 10 GB</small></span></div>
        <div className="file-storage-progress" aria-label="存储空间已使用百分之一"><i><b /></i><small>当前空间充足</small></div>
      </section>

      <div className="file-center-workspace">
        <aside className="file-space-nav" aria-label="文件空间">
          <div className="file-space-nav__title"><span>空间</span><button type="button" aria-label="空间管理"><MoreHorizontal aria-hidden="true" /></button></div>
          <nav>
            {navigation.map(({ key, label, icon: Icon }) => <button key={key} type="button" className={view === key ? 'active' : ''} onClick={() => { setView(key); setSelectedIds([]) }}><Icon aria-hidden="true" /><span>{label}</span><small>{counts[key]}</small></button>)}
          </nav>
          <section className="file-space-policy"><ShieldCheck aria-hidden="true" /><div><strong>权限由空间继承</strong><small>团队产物不会因对话分享而扩大可见范围。</small></div></section>
        </aside>

        <section className="file-browser" aria-label={navigation.find((item) => item.key === view)?.label}>
          <header className="file-browser-toolbar">
            <div>
              <h2>{navigation.find((item) => item.key === view)?.label}</h2>
              <span>{visibleArtifacts.length} 个文件</span>
            </div>
            <div className="file-browser-filters">
              <label className="file-search"><span className="sr-only">搜索文件</span><Search aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索文件、任务或 Skill" /></label>
              <label><span className="sr-only">文件类型</span><select value={kindFilter} onChange={(event) => setKindFilter(event.target.value as 'all' | ArtifactKind)}><option value="all">全部类型</option><option value="xlsx">Excel</option><option value="csv">CSV</option><option value="pdf">PDF</option><option value="png">图片</option><option value="zip">压缩包</option></select></label>
            </div>
          </header>

          {selectedIds.length ? <div className="file-bulk-toolbar" role="status"><span>已选择 {selectedIds.length} 个文件</span><button type="button" onClick={() => showNotice('已开始批量下载')}><Download aria-hidden="true" />下载</button>{view !== 'trash' ? <button className="danger" type="button" onClick={() => moveToTrash(selectedIds)}><Trash2 aria-hidden="true" />移入回收站</button> : null}<button type="button" onClick={() => setSelectedIds([])}>取消选择</button></div> : null}

          <div className="file-table-wrap">
            <table className="file-table">
              <thead><tr><th><input type="checkbox" aria-label="选择当前列表全部文件" checked={allVisibleSelected} onChange={() => setSelectedIds(allVisibleSelected ? [] : visibleArtifacts.map((item) => item.id))} /></th><th>文件名称</th><th>来源</th><th>所属空间与权限</th><th>关联任务</th><th>更新时间</th><th>操作</th></tr></thead>
              <tbody>
                {visibleArtifacts.map((artifact) => {
                  const Icon = kindIcons[artifact.kind]
                  return <tr key={artifact.id} className={selectedIds.includes(artifact.id) ? 'selected' : ''}>
                    <td><input type="checkbox" aria-label={`选择${artifact.name}`} checked={selectedIds.includes(artifact.id)} onChange={() => toggleSelection(artifact.id)} /></td>
                    <td><button className="file-name-cell" type="button" onClick={() => setPreviewId(artifact.id)}><span className={`file-kind-icon file-kind-icon--${artifact.kind}`}><Icon aria-hidden="true" /></span><span><strong>{artifact.name}</strong><small>{artifact.kind.toUpperCase()} · {artifact.size}<i className={`file-state file-state--${artifact.status}`}>{statusLabels[artifact.status]}</i></small></span></button></td>
                    <td><span className="file-source"><i className={`file-source__icon file-source__icon--${artifact.source === 'Agent 生成' ? 'agent' : artifact.source === '自动化任务' ? 'auto' : 'upload'}`}>{artifact.source === 'Agent 生成' ? <Bot aria-hidden="true" /> : artifact.source === '自动化任务' ? <RefreshCw aria-hidden="true" /> : <Upload aria-hidden="true" />}</i>{artifact.source}</span></td>
                    <td><div className="file-scope-cell"><strong>{artifact.space}</strong><small><ShieldCheck aria-hidden="true" />{artifact.visibility}</small></div></td>
                    <td><button className="file-task-link" type="button" onClick={() => showNotice(`打开任务：${artifact.task}`)}><Link2 aria-hidden="true" />{artifact.task}</button></td>
                    <td><span className="file-updated">{artifact.updatedAt}</span></td>
                    <td><div className="file-row-actions">{view === 'trash' ? <button type="button" title="恢复文件" aria-label={`恢复${artifact.name}`} onClick={() => restoreArtifact(artifact.id)}><RefreshCw aria-hidden="true" /></button> : <><button type="button" title="下载" aria-label={`下载${artifact.name}`} onClick={() => showNotice(`正在下载「${artifact.name}」`)}><Download aria-hidden="true" /></button><button type="button" title="在对话中使用" aria-label={`在对话中使用${artifact.name}`} onClick={() => { window.location.hash = '#chatbot' }}><MessageSquarePlus aria-hidden="true" /></button><button type="button" title="移入回收站" aria-label={`删除${artifact.name}`} onClick={() => moveToTrash([artifact.id])}><Trash2 aria-hidden="true" /></button></>}</div></td>
                  </tr>
                })}
              </tbody>
            </table>
            {!visibleArtifacts.length ? <div className="file-empty"><FolderOpen aria-hidden="true" /><strong>这里还没有文件</strong><span>{query ? '没有找到匹配的文件，换个关键词试试。' : '上传文件或让 Agent 生成一份新产物。'}</span>{view !== 'trash' ? <button type="button" onClick={() => setIsUploadOpen(true)}><Upload aria-hidden="true" />上传文件</button> : null}</div> : null}
          </div>
        </section>
      </div>

      {previewArtifact ? <div className="file-preview-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setPreviewId('')}><aside className="file-preview-panel" role="dialog" aria-modal="true" aria-labelledby="file-preview-title"><header><div><span>文件详情</span><h2 id="file-preview-title">{previewArtifact.name}</h2></div><button type="button" aria-label="关闭文件详情" onClick={() => setPreviewId('')}><X aria-hidden="true" /></button></header><div className="file-preview-body"><FilePreview artifact={previewArtifact} /><dl><div><dt>Artifact ID</dt><dd><code>{previewArtifact.id}</code></dd></div><div><dt>所属空间</dt><dd>{previewArtifact.space}</dd></div><div><dt>可见范围</dt><dd>{previewArtifact.visibility}</dd></div><div><dt>创建人</dt><dd>{previewArtifact.owner}</dd></div><div><dt>来源任务</dt><dd>{previewArtifact.task}</dd></div>{previewArtifact.skill ? <div><dt>来源 Skill</dt><dd><code>{previewArtifact.skill}</code></dd></div> : null}</dl><section className="file-lineage"><strong>产物关系</strong><div><span>8月销售明细.xlsx</span><ChevronRight aria-hidden="true" /><span>{previewArtifact.name}</span></div></section></div><footer><button type="button" onClick={() => showNotice(`正在下载「${previewArtifact.name}」`)}><Download aria-hidden="true" />下载</button><button className="primary-action" type="button" onClick={() => { window.location.hash = '#chatbot' }}><MessageSquarePlus aria-hidden="true" />在对话中使用</button></footer></aside></div> : null}

      {isUploadOpen ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsUploadOpen(false)}><section className="ledger-dialog file-upload-dialog" role="dialog" aria-modal="true" aria-labelledby="file-upload-title"><header><div><span>文件中心</span><h2 id="file-upload-title">上传文件</h2></div><button className="dialog-close" type="button" aria-label="关闭上传弹窗" onClick={() => setIsUploadOpen(false)}><X aria-hidden="true" /></button></header><div className="file-upload-dialog__body"><label className="dialog-field"><span>保存空间</span><select value={uploadSpace} onChange={(event) => setUploadSpace(event.target.value as ArtifactRecord['space'])}><option value="个人空间">个人空间 · 仅自己</option><option value="澄明电商运营团队">澄明电商运营团队 · 团队成员</option></select><small>上传后仍可由空间管理员调整可见范围。</small></label><label className="file-upload-dropzone" onDragOver={(event) => event.preventDefault()} onDrop={handleUploadDrop}><input type="file" multiple accept=".xlsx,.xls,.csv,.pdf,.docx,.png,.jpg,.zip" onChange={handleUploadFiles} /><Upload aria-hidden="true" /><strong>{uploadFiles.length ? `已选择 ${uploadFiles.length} 个文件` : '选择或拖入文件'}</strong><span>{uploadFiles.length ? uploadFiles.map((file) => file.name).join('、') : '支持 Excel、CSV、PDF、Word、图片和 ZIP，单文件不超过 100 MB'}</span></label><div className="file-upload-policy"><ShieldCheck aria-hidden="true" /><span><strong>文件按空间隔离</strong><small>上传完成后将进行安全扫描和格式解析，Agent 只能读取当前任务明确授权的文件。</small></span></div></div><footer><button className="secondary-action" type="button" onClick={() => setIsUploadOpen(false)}>取消</button><button className="primary-action" type="button" disabled={!uploadFiles.length} onClick={submitUpload}>开始上传</button></footer></section></div> : null}

      {notice ? <div className="file-center-notice" role="status"><Check aria-hidden="true" />{notice}</div> : null}
    </section>
  )
}

function FilePreview({ artifact }: { artifact: ArtifactRecord }) {
  const Icon = kindIcons[artifact.kind]
  if (artifact.kind === 'xlsx' || artifact.kind === 'csv') {
    return <section className="file-preview-canvas file-preview-sheet" aria-label="表格预览"><header><FileSpreadsheet aria-hidden="true" /><span>Sheet1</span></header><table><thead><tr><th>日期</th><th>渠道</th><th>销售额</th><th>转化率</th></tr></thead><tbody><tr><td>2026-08-26</td><td>唯品会</td><td>¥128,430</td><td>3.82%</td></tr><tr><td>2026-08-27</td><td>抖店</td><td>¥156,820</td><td>4.13%</td></tr><tr><td>2026-08-28</td><td>快手</td><td>¥96,540</td><td>3.47%</td></tr></tbody></table></section>
  }
  return <section className="file-preview-canvas file-preview-document" aria-label={`${artifact.kind.toUpperCase()} 文件预览`}><Icon aria-hidden="true" /><strong>{artifact.name}</strong><span>{artifact.kind.toUpperCase()} · {artifact.size}</span><button type="button"><Download aria-hidden="true" />下载后查看完整内容</button></section>
}
