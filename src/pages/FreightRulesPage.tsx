import { type FormEvent, useMemo, useState } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  Calculator,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Copy,
  Eye,
  FileSpreadsheet,
  GitBranch,
  Layers3,
  MapPinned,
  PackageCheck,
  Pencil,
  Plus,
  Power,
  RotateCcw,
  Search,
  Tags,
  Trash2,
  Truck,
  Upload,
  X,
} from 'lucide-react'

type ConfigStatus = 'active' | 'draft' | 'disabled'
type PageView = 'schemes' | 'dimensions' | 'calculators' | 'exceptions' | 'simulator'
type ConfigKind = 'dimension' | 'calculator' | 'exception'

interface FreightScheme {
  id: string
  supplierId: string
  supplierName: string
  version: number
  dimensionCount: number
  calculatorCount: number
  exceptionCount: number
  baseFreight: number
  handlingFee: number
  materialFee: number
  effectiveStart: string
  status: ConfigStatus
  updatedBy: string
  updatedAt: string
}

interface SchemeDraft {
  id: string
  supplierId: string
  supplierName: string
  version: number
  baseFreight: string
  handlingFee: string
  materialFee: string
  effectiveStart: string
  status: ConfigStatus
}

interface DimensionStage {
  id: string
  order: number
  title: string
  code: string
  source: string
  logic: string
  output: string
  description: string
  enabled: boolean
}

interface CalculatorPlan {
  id: string
  title: string
  code: string
  supplier: string
  method: string
  formula: string
  output: string
  description: string
  enabled: boolean
}

interface ExceptionRule {
  id: string
  title: string
  code: string
  supplier: string
  condition: string
  action: string
  output: string
  description: string
  enabled: boolean
}

interface ConfigDraft {
  kind: ConfigKind
  id: string
  title: string
  code: string
  primary: string
  secondary: string
  output: string
  description: string
  enabled: boolean
}

interface PendingDelete {
  kind: 'scheme' | ConfigKind
  id: string
  title: string
}

const initialSchemes: FreightScheme[] = [
  { id: 'scheme-001', supplierId: 'SUP-0012', supplierName: '花厘子服饰', version: 3, dimensionCount: 5, calculatorCount: 3, exceptionCount: 1, baseFreight: 3, handlingFee: 1.25, materialFee: 0, effectiveStart: '2026-07-01', status: 'active', updatedBy: '王财务', updatedAt: '2026-08-28 16:40' },
  { id: 'scheme-002', supplierId: 'SUP-0038', supplierName: '汉兴泰服饰', version: 2, dimensionCount: 3, calculatorCount: 3, exceptionCount: 0, baseFreight: 3.2, handlingFee: 0, materialFee: 0, effectiveStart: '2026-06-01', status: 'active', updatedBy: '李运营', updatedAt: '2026-08-25 10:12' },
  { id: 'scheme-003', supplierId: 'SUP-0046', supplierName: '曼之伴服饰', version: 1, dimensionCount: 5, calculatorCount: 4, exceptionCount: 2, baseFreight: 3, handlingFee: 0.5, materialFee: 0.35, effectiveStart: '2026-09-01', status: 'draft', updatedBy: '王财务', updatedAt: '2026-08-30 09:16' },
  { id: 'scheme-004', supplierId: 'SUP-0065', supplierName: '飞虹针织', version: 4, dimensionCount: 4, calculatorCount: 3, exceptionCount: 1, baseFreight: 3.5, handlingFee: 0, materialFee: 0.18, effectiveStart: '2026-04-01', status: 'active', updatedBy: '张管理员', updatedAt: '2026-08-21 18:03' },
  { id: 'scheme-005', supplierId: 'SUP-0119', supplierName: '建卓针纺', version: 2, dimensionCount: 4, calculatorCount: 3, exceptionCount: 0, baseFreight: 3, handlingFee: 0, materialFee: 0.2, effectiveStart: '2026-07-15', status: 'disabled', updatedBy: '李运营', updatedAt: '2026-08-16 11:24' },
]

const initialDimensions: DimensionStage[] = [
  { id: 'dim-region', order: 1, title: '地区鉴定', code: 'region_group', source: '收货省 / 市 / 区', logic: '按地区字典逐级归类', output: '核心地区、普通地区、偏远地区', description: '只输出地区标签，不直接计算价格。', enabled: true },
  { id: 'dim-carrier', order: 2, title: '快递鉴定', code: 'carrier_group', source: '快递公司编码', logic: '按承运商分组', output: '普通快递、顺丰、其他快递', description: '同一快递公司的别名统一到标准编码。', enabled: true },
  { id: 'dim-brand', order: 3, title: '品牌鉴定', code: 'brand_group', source: '包裹明细.brand', logic: '任一商品命中指定品牌', output: '默认品牌、指定品牌', description: '包裹存在多个品牌时保留全部命中标签。', enabled: true },
  { id: 'dim-material', order: 4, title: '材质鉴定', code: 'material_metrics', source: '包裹明细.material', logic: '按材质分组并汇总件数', output: '材质集合、各材质商品件数', description: '例如输出羊绒 2 件、棉 1 件，供计费公式读取。', enabled: true },
  { id: 'dim-package', order: 5, title: '包裹指标', code: 'package_metrics', source: '快递单号关联明细', logic: '按快递单号聚合', output: '总件数、总重量、SKU 数', description: '平台订单号只保留关联，快递单号才是费用计算单元。', enabled: true },
]

const initialCalculators: CalculatorPlan[] = [
  { id: 'calc-freight', title: '地区基础运费', code: 'freight_by_region', supplier: '花厘子服饰', method: '地区标签取价', formula: '普通地区 ¥3；偏远地区 ¥15', output: '运费', description: '地区鉴定完成后读取对应基础价。', enabled: true },
  { id: 'calc-handling', title: '代发费计算', code: 'handling_by_quantity', supplier: '花厘子服饰', method: '固定价 + 超件价', formula: '¥1.25/包；超过 2 件后每件 +¥0.50', output: '代发费', description: '金额为 0 时按免费记录，不省略费用字段。', enabled: true },
  { id: 'calc-material', title: '特殊材质辅料费', code: 'material_item_fee', supplier: '花厘子服饰', method: '按命中材质件数', formula: '羊绒件数 × ¥1.00', output: '辅料费', description: '只使用羊绒商品件数，不使用包裹总件数。', enabled: true },
  { id: 'calc-fixed', title: '固定三项费用', code: 'fixed_package_fee', supplier: '汉兴泰服饰', method: '固定每包', formula: '运费 ¥3.20；代发费 ¥0；辅料费 ¥0', output: '三项费用', description: '适用于当前没有额外备注的固定规则供应商。', enabled: true },
]

const initialExceptions: ExceptionRule[] = [
  { id: 'exp-remote-sf', title: '偏远地区顺丰一口价', code: 'remote_sf_fixed', supplier: '花厘子服饰', condition: '地区=偏远地区 且 快递=顺丰', action: '运费直接取 ¥25.00', output: '运费', description: '只有明确存在跨维度联动价格时才配置。', enabled: true },
  { id: 'exp-brand-material', title: '指定品牌辅料封顶', code: 'brand_material_cap', supplier: '曼之伴服饰', condition: '品牌=品牌X 且 材质包含皮革', action: '辅料费最高 ¥8.00', output: '辅料费', description: '备注确认后再启用；当前保留为停用示例。', enabled: false },
]

const statusText: Record<ConfigStatus, string> = { active: '已启用', draft: '草稿', disabled: '已停用' }

const pipeline = [
  { label: '包裹聚合', note: '快递单号', icon: PackageCheck },
  { label: '供应商路由', note: '选择方案', icon: Truck },
  { label: '维度鉴定', note: '标签与指标', icon: Tags },
  { label: '计费方案', note: '读取中间结果', icon: Calculator },
  { label: '特殊联动', note: '少量例外', icon: GitBranch },
  { label: '费用输出', note: '三字段分开', icon: BadgeDollarSign },
]

const navItems: Array<{ id: PageView; label: string; icon: typeof Layers3 }> = [
  { id: 'schemes', label: '方案管理', icon: Layers3 },
  { id: 'dimensions', label: '维度鉴定', icon: Tags },
  { id: 'calculators', label: '计费方案', icon: Calculator },
  { id: 'exceptions', label: '特殊规则', icon: GitBranch },
  { id: 'simulator', label: '费用试算', icon: CircleDollarSign },
]

function formatMoney(value: number) {
  return `¥${value.toFixed(2)}`
}

function MoneyValue({ value }: { value: number }) {
  return <span className={value === 0 ? 'freight-money is-free' : 'freight-money'}>{value === 0 ? '免费' : formatMoney(value)}</span>
}

function createSchemeDraft(scheme?: FreightScheme): SchemeDraft {
  return {
    id: scheme?.id ?? '', supplierId: scheme?.supplierId ?? '', supplierName: scheme?.supplierName ?? '', version: scheme?.version ?? 1,
    baseFreight: String(scheme?.baseFreight ?? 0), handlingFee: String(scheme?.handlingFee ?? 0), materialFee: String(scheme?.materialFee ?? 0),
    effectiveStart: scheme?.effectiveStart ?? '2026-09-01', status: scheme?.status ?? 'draft',
  }
}

function FreightStatus({ status }: { status: ConfigStatus }) {
  return <span className={`freight-status freight-status--${status}`}><i aria-hidden="true" />{statusText[status]}</span>
}

export default function FreightRulesPage() {
  const [view, setView] = useState<PageView>('schemes')
  const [schemes, setSchemes] = useState(initialSchemes)
  const [dimensions, setDimensions] = useState(initialDimensions)
  const [calculators, setCalculators] = useState(initialCalculators)
  const [exceptions, setExceptions] = useState(initialExceptions)
  const [keyword, setKeyword] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | ConfigStatus>('all')
  const [schemeEditor, setSchemeEditor] = useState<SchemeDraft | null>(null)
  const [configEditor, setConfigEditor] = useState<ConfigDraft | null>(null)
  const [detailScheme, setDetailScheme] = useState<FreightScheme | null>(null)
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [importOpen, setImportOpen] = useState(false)
  const [importFileName, setImportFileName] = useState('')
  const [notice, setNotice] = useState('')
  const [calcSupplierId, setCalcSupplierId] = useState(initialSchemes[0].supplierId)
  const [calcRegion, setCalcRegion] = useState('XJ')
  const [calcCarrier, setCalcCarrier] = useState('SF')
  const [calcBrand, setCalcBrand] = useState('DEFAULT')
  const [calcMaterial, setCalcMaterial] = useState('CASHMERE')
  const [calcQuantity, setCalcQuantity] = useState(2)
  const [calcWeight, setCalcWeight] = useState(1.6)

  const filteredSchemes = useMemo(() => schemes.filter((scheme) => {
    const query = keyword.trim().toLowerCase()
    const matchesKeyword = !query || `${scheme.supplierName}${scheme.supplierId}`.toLowerCase().includes(query)
    return matchesKeyword && (statusFilter === 'all' || scheme.status === statusFilter)
  }), [keyword, schemes, statusFilter])

  const activeSchemes = schemes.filter((scheme) => scheme.status === 'active')
  const selectedScheme = schemes.find((scheme) => scheme.supplierId === calcSupplierId) ?? schemes[0] ?? initialSchemes[0]
  const regionLabel = ['XJ', 'XZ'].includes(calcRegion) ? '偏远地区' : ['SH', 'ZJ', 'JS'].includes(calcRegion) ? '核心地区' : '普通地区'
  const carrierLabel = calcCarrier === 'SF' ? '顺丰' : '普通快递'
  const materialLabel = calcMaterial === 'CASHMERE' ? `羊绒 ${calcQuantity} 件` : calcMaterial === 'LEATHER' ? `皮革 ${calcQuantity} 件` : `普通材质 ${calcQuantity} 件`
  const hasRemoteSfException = selectedScheme.supplierId === 'SUP-0012' && regionLabel === '偏远地区' && carrierLabel === '顺丰'
  const baseFreight = regionLabel === '偏远地区' ? 15 : selectedScheme.baseFreight
  const freight = hasRemoteSfException ? 25 : baseFreight + (carrierLabel === '顺丰' ? 3 : 0)
  const handlingFee = selectedScheme.handlingFee + Math.max(0, calcQuantity - 2) * 0.5
  const materialFee = calcMaterial === 'CASHMERE' ? calcQuantity : selectedScheme.materialFee

  const showNotice = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }

  const saveScheme = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!schemeEditor) return
    const previous = schemes.find((item) => item.id === schemeEditor.id)
    const next: FreightScheme = {
      id: schemeEditor.id || `scheme-${Date.now()}`,
      supplierId: schemeEditor.supplierId.trim(), supplierName: schemeEditor.supplierName.trim(), version: schemeEditor.version,
      dimensionCount: previous?.dimensionCount ?? 3, calculatorCount: previous?.calculatorCount ?? 3, exceptionCount: previous?.exceptionCount ?? 0,
      baseFreight: Number(schemeEditor.baseFreight), handlingFee: Number(schemeEditor.handlingFee), materialFee: Number(schemeEditor.materialFee),
      effectiveStart: schemeEditor.effectiveStart, status: schemeEditor.status, updatedBy: '当前用户', updatedAt: '刚刚',
    }
    setSchemes((current) => schemeEditor.id ? current.map((item) => item.id === schemeEditor.id ? next : item) : [next, ...current])
    setSchemeEditor(null)
    showNotice(schemeEditor.id ? '方案已更新' : '方案已创建')
  }

  const openConfigEditor = (kind: ConfigKind, item?: DimensionStage | CalculatorPlan | ExceptionRule) => {
    if (kind === 'dimension') {
      const value = item as DimensionStage | undefined
      setConfigEditor({ kind, id: value?.id ?? '', title: value?.title ?? '', code: value?.code ?? '', primary: value?.source ?? '', secondary: value?.logic ?? '', output: value?.output ?? '', description: value?.description ?? '', enabled: value?.enabled ?? true })
    } else if (kind === 'calculator') {
      const value = item as CalculatorPlan | undefined
      setConfigEditor({ kind, id: value?.id ?? '', title: value?.title ?? '', code: value?.code ?? '', primary: value?.supplier ?? '', secondary: value?.method ?? '', output: value?.formula ?? '', description: value?.description ?? '', enabled: value?.enabled ?? true })
    } else {
      const value = item as ExceptionRule | undefined
      setConfigEditor({ kind, id: value?.id ?? '', title: value?.title ?? '', code: value?.code ?? '', primary: value?.supplier ?? '', secondary: value?.condition ?? '', output: value?.action ?? '', description: value?.description ?? '', enabled: value?.enabled ?? true })
    }
  }

  const saveConfig = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!configEditor) return
    const id = configEditor.id || `${configEditor.kind}-${Date.now()}`
    if (configEditor.kind === 'dimension') {
      const next: DimensionStage = { id, order: dimensions.find((item) => item.id === id)?.order ?? dimensions.length + 1, title: configEditor.title, code: configEditor.code, source: configEditor.primary, logic: configEditor.secondary, output: configEditor.output, description: configEditor.description, enabled: configEditor.enabled }
      setDimensions((current) => configEditor.id ? current.map((item) => item.id === id ? next : item) : [...current, next])
    } else if (configEditor.kind === 'calculator') {
      const next: CalculatorPlan = { id, title: configEditor.title, code: configEditor.code, supplier: configEditor.primary, method: configEditor.secondary, formula: configEditor.output, output: calculators.find((item) => item.id === id)?.output ?? '运费', description: configEditor.description, enabled: configEditor.enabled }
      setCalculators((current) => configEditor.id ? current.map((item) => item.id === id ? next : item) : [...current, next])
    } else {
      const next: ExceptionRule = { id, title: configEditor.title, code: configEditor.code, supplier: configEditor.primary, condition: configEditor.secondary, action: configEditor.output, output: exceptions.find((item) => item.id === id)?.output ?? '运费', description: configEditor.description, enabled: configEditor.enabled }
      setExceptions((current) => configEditor.id ? current.map((item) => item.id === id ? next : item) : [...current, next])
    }
    setConfigEditor(null)
    showNotice(configEditor.id ? '配置已更新' : '配置已创建')
  }

  const toggleScheme = (scheme: FreightScheme) => {
    setSchemes((current) => current.map((item) => item.id === scheme.id ? { ...item, status: item.status === 'active' ? 'disabled' : 'active', updatedBy: '当前用户', updatedAt: '刚刚' } : item))
    showNotice(scheme.status === 'active' ? '方案已停用' : '方案已启用')
  }

  const toggleConfig = (kind: ConfigKind, id: string) => {
    if (kind === 'dimension') setDimensions((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item))
    if (kind === 'calculator') setCalculators((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item))
    if (kind === 'exception') setExceptions((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item))
    showNotice('状态已更新')
  }

  const deleteItem = () => {
    if (!pendingDelete) return
    if (pendingDelete.kind === 'scheme') setSchemes((current) => current.filter((item) => item.id !== pendingDelete.id))
    if (pendingDelete.kind === 'dimension') setDimensions((current) => current.filter((item) => item.id !== pendingDelete.id))
    if (pendingDelete.kind === 'calculator') setCalculators((current) => current.filter((item) => item.id !== pendingDelete.id))
    if (pendingDelete.kind === 'exception') setExceptions((current) => current.filter((item) => item.id !== pendingDelete.id))
    setPendingDelete(null)
    showNotice('配置已删除')
  }

  const renderConfigActions = (kind: ConfigKind, item: DimensionStage | CalculatorPlan | ExceptionRule) => <div className="freight-row-actions">
    <button type="button" title="查看" aria-label={`查看${item.title}`} onClick={() => showNotice(`${item.title}：${item.description}`)}><Eye aria-hidden="true" /></button>
    <button type="button" title="编辑" aria-label={`编辑${item.title}`} onClick={() => openConfigEditor(kind, item)}><Pencil aria-hidden="true" /></button>
    <button type="button" title={item.enabled ? '停用' : '启用'} aria-label={`${item.enabled ? '停用' : '启用'}${item.title}`} onClick={() => toggleConfig(kind, item.id)}><Power aria-hidden="true" /></button>
    <button className="danger" type="button" title="删除" aria-label={`删除${item.title}`} onClick={() => setPendingDelete({ kind, id: item.id, title: item.title })}><Trash2 aria-hidden="true" /></button>
  </div>

  return <main className="platform-admin-main freight-rules-page" id="main-content" tabIndex={-1} aria-labelledby="freight-rules-title">
    <header className="freight-rules-head">
      <div><p className="freight-rules-head__kicker"><Truck aria-hidden="true" />包裹费用决策</p><h1 id="freight-rules-title">运费规则</h1><p>按快递单号聚合包裹，再逐层鉴定供应商、地区、快递和商品特征，最后分别计算运费、代发费、辅料费。</p></div>
      <div className="freight-rules-head__actions"><button className="freight-button freight-button--secondary" type="button" onClick={() => setImportOpen(true)}><Upload aria-hidden="true" />导入配置</button><button className="freight-button freight-button--primary" type="button" onClick={() => setSchemeEditor(createSchemeDraft())}><Plus aria-hidden="true" />新增方案</button></div>
    </header>

    <section className="freight-pipeline" aria-labelledby="freight-pipeline-title">
      <header><div><span>执行模型</span><h2 id="freight-pipeline-title">分层决策流水线</h2></div><small>每层只处理自己的维度，输出标签或指标后继续向下流转</small></header>
      <div className="freight-pipeline__steps">{pipeline.map((step, index) => { const Icon = step.icon; return <div className="freight-pipeline__step" key={step.label}><span><Icon aria-hidden="true" /></span><div><strong>{step.label}</strong><small>{step.note}</small></div>{index < pipeline.length - 1 ? <ArrowRight aria-hidden="true" /> : null}</div> })}</div>
    </section>

    <nav className="freight-view-tabs" aria-label="运费规则配置模块">{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" className={view === item.id ? 'active' : ''} aria-current={view === item.id ? 'page' : undefined} onClick={() => setView(item.id)}><Icon aria-hidden="true" />{item.label}</button> })}</nav>

    {view === 'schemes' ? <>
      <section className="freight-summary-grid" aria-label="方案概览"><article><span>供应商方案</span><strong>{schemes.length}</strong><small>每家供应商独立版本</small></article><article><span>启用中</span><strong>{activeSchemes.length}</strong><small>当前参与包裹计算</small></article><article><span>维度鉴定器</span><strong>{dimensions.filter((item) => item.enabled).length}</strong><small>输出标签和计费指标</small></article><article><span>特殊联动</span><strong>{exceptions.filter((item) => item.enabled).length}</strong><small>只维护不可拆分的组合价</small></article></section>
      <section className="freight-rule-card" aria-label="供应商方案列表">
        <div className="freight-filters"><label className="freight-search"><Search aria-hidden="true" /><span className="sr-only">搜索供应商</span><input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="搜索供应商名称或编码" /></label><label><span>状态</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}><option value="all">全部状态</option><option value="active">已启用</option><option value="draft">草稿</option><option value="disabled">已停用</option></select></label><button className="freight-filter-reset" type="button" onClick={() => { setKeyword(''); setStatusFilter('all') }}><RotateCcw aria-hidden="true" />重置</button><span className="freight-filter-count">共 {filteredSchemes.length} 个方案</span></div>
        <div className="freight-table-scroll"><table className="freight-rule-table freight-scheme-table"><thead><tr><th>供应商方案</th><th>维度鉴定</th><th>计费方案</th><th>特殊规则</th><th>默认三项费用</th><th>版本</th><th>状态</th><th>操作</th></tr></thead><tbody>{filteredSchemes.map((scheme) => <tr key={scheme.id}><td><div className="freight-supplier-cell"><span>{scheme.supplierName.slice(0, 1)}</span><div><strong>{scheme.supplierName}</strong><small>{scheme.supplierId}</small></div></div></td><td><button className="freight-stage-link" type="button" onClick={() => setView('dimensions')}>{scheme.dimensionCount} 个维度<ChevronRight aria-hidden="true" /></button></td><td><button className="freight-stage-link" type="button" onClick={() => setView('calculators')}>{scheme.calculatorCount} 个计算器<ChevronRight aria-hidden="true" /></button></td><td>{scheme.exceptionCount ? <button className="freight-stage-link" type="button" onClick={() => setView('exceptions')}>{scheme.exceptionCount} 条联动<ChevronRight aria-hidden="true" /></button> : <span className="freight-muted">无</span>}</td><td><div className="freight-fee-inline"><span>运 <MoneyValue value={scheme.baseFreight} /></span><span>代 <MoneyValue value={scheme.handlingFee} /></span><span>辅 <MoneyValue value={scheme.materialFee} /></span></div></td><td><div className="freight-version-cell"><strong>V{scheme.version}</strong><span>{scheme.effectiveStart} 起</span><small>{scheme.updatedBy} · {scheme.updatedAt}</small></div></td><td><FreightStatus status={scheme.status} /></td><td><div className="freight-row-actions"><button type="button" title="查看方案" aria-label={`查看${scheme.supplierName}方案`} onClick={() => setDetailScheme(scheme)}><Eye aria-hidden="true" /></button><button type="button" title="复制为新版本" aria-label={`复制${scheme.supplierName}方案`} onClick={() => setSchemeEditor({ ...createSchemeDraft(scheme), id: '', version: scheme.version + 1, status: 'draft', effectiveStart: '2026-09-01' })}><Copy aria-hidden="true" /></button><button type="button" title="编辑" aria-label={`编辑${scheme.supplierName}方案`} onClick={() => setSchemeEditor(createSchemeDraft(scheme))}><Pencil aria-hidden="true" /></button><button type="button" title={scheme.status === 'active' ? '停用' : '启用'} aria-label={`${scheme.status === 'active' ? '停用' : '启用'}${scheme.supplierName}方案`} onClick={() => toggleScheme(scheme)}><Power aria-hidden="true" /></button><button className="danger" type="button" title="删除" aria-label={`删除${scheme.supplierName}方案`} onClick={() => setPendingDelete({ kind: 'scheme', id: scheme.id, title: scheme.supplierName })}><Trash2 aria-hidden="true" /></button></div></td></tr>)}</tbody></table></div>
      </section>
    </> : null}

    {view === 'dimensions' ? <section className="freight-config-workspace"><header className="freight-section-head"><div><span>DIMENSION PIPELINE</span><h2>维度鉴定</h2><p>每一层独立执行 if / else，只输出标准标签或聚合指标，不在这里决定最终金额。</p></div><button className="freight-button freight-button--primary" type="button" onClick={() => openConfigEditor('dimension')}><Plus aria-hidden="true" />新增维度</button></header><div className="freight-stage-list">{[...dimensions].sort((a, b) => a.order - b.order).map((item, index) => <article className={item.enabled ? 'freight-stage-card' : 'freight-stage-card is-disabled'} key={item.id}><div className="freight-stage-card__order"><span>{String(index + 1).padStart(2, '0')}</span>{index < dimensions.length - 1 ? <i aria-hidden="true" /> : null}</div><div className="freight-stage-card__body"><header><div><h3>{item.title}</h3><code>{item.code}</code></div><span className={item.enabled ? 'freight-config-state' : 'freight-config-state is-disabled'}>{item.enabled ? '启用' : '停用'}</span></header><p>{item.description}</p><dl><div><dt>输入字段</dt><dd>{item.source}</dd></div><div><dt>if / else 鉴定</dt><dd>{item.logic}</dd></div><div><dt>阶段输出</dt><dd>{item.output}</dd></div></dl></div>{renderConfigActions('dimension', item)}</article>)}</div></section> : null}

    {view === 'calculators' ? <section className="freight-config-workspace"><header className="freight-section-head"><div><span>CALCULATION PLANS</span><h2>计费方案</h2><p>读取各维度的鉴定结果，分别计算运费、代发费和辅料费；金额为 0 仍按有效结果保存。</p></div><button className="freight-button freight-button--primary" type="button" onClick={() => openConfigEditor('calculator')}><Plus aria-hidden="true" />新增计算器</button></header><div className="freight-config-grid">{calculators.map((item) => <article className={item.enabled ? 'freight-config-card' : 'freight-config-card is-disabled'} key={item.id}><header><span><Calculator aria-hidden="true" /></span><div><h3>{item.title}</h3><code>{item.code}</code></div><span className={item.enabled ? 'freight-config-state' : 'freight-config-state is-disabled'}>{item.enabled ? '启用' : '停用'}</span></header><p>{item.description}</p><dl><div><dt>适用供应商</dt><dd>{item.supplier}</dd></div><div><dt>计费方式</dt><dd>{item.method}</dd></div><div><dt>计算公式</dt><dd>{item.formula}</dd></div><div><dt>写入字段</dt><dd><span className="freight-output-tag">{item.output}</span></dd></div></dl><footer>{renderConfigActions('calculator', item)}</footer></article>)}</div></section> : null}

    {view === 'exceptions' ? <section className="freight-config-workspace"><header className="freight-section-head"><div><span>SPECIAL LINKS</span><h2>特殊联动规则</h2><p>只有价格无法拆成独立维度时才在这里配置，例如“偏远地区 + 顺丰”使用一口价。</p></div><button className="freight-button freight-button--primary" type="button" onClick={() => openConfigEditor('exception')}><Plus aria-hidden="true" />新增特殊规则</button></header><div className="freight-exception-list">{exceptions.map((item) => <article className={item.enabled ? 'freight-exception-card' : 'freight-exception-card is-disabled'} key={item.id}><span className="freight-exception-card__icon"><GitBranch aria-hidden="true" /></span><div><header><h3>{item.title}</h3><code>{item.code}</code><span className={item.enabled ? 'freight-config-state' : 'freight-config-state is-disabled'}>{item.enabled ? '启用' : '停用'}</span></header><p>{item.description}</p><div className="freight-exception-flow"><span><small>IF</small>{item.condition}</span><ArrowRight aria-hidden="true" /><span><small>THEN</small>{item.action}</span><strong>{item.output}</strong></div></div>{renderConfigActions('exception', item)}</article>)}</div></section> : null}

    {view === 'simulator' ? <section className="freight-simulator"><div className="freight-simulator__form"><header><span><Calculator aria-hidden="true" /></span><div><h2>包裹费用试算</h2><p>输入一个快递包裹，查看每一层的鉴定结果和最终三项费用。</p></div></header><div className="freight-simulator__fields"><label><span>供应商</span><select value={calcSupplierId} onChange={(event) => setCalcSupplierId(event.target.value)}>{schemes.map((scheme) => <option key={scheme.id} value={scheme.supplierId}>{scheme.supplierName} · V{scheme.version}</option>)}</select></label><label><span>收货地区</span><select value={calcRegion} onChange={(event) => setCalcRegion(event.target.value)}><option value="SH">上海</option><option value="ZJ">浙江</option><option value="GD">广东</option><option value="XJ">新疆</option><option value="XZ">西藏</option></select></label><label><span>快递公司</span><select value={calcCarrier} onChange={(event) => setCalcCarrier(event.target.value)}><option value="SF">顺丰</option><option value="NORMAL">圆通 / 申通 / 韵达</option></select></label><label><span>品牌</span><select value={calcBrand} onChange={(event) => setCalcBrand(event.target.value)}><option value="DEFAULT">普通品牌</option><option value="BRAND_X">品牌X</option></select></label><label><span>商品材质</span><select value={calcMaterial} onChange={(event) => setCalcMaterial(event.target.value)}><option value="NORMAL">普通材质</option><option value="CASHMERE">羊绒</option><option value="LEATHER">皮革</option></select></label><label><span>包裹商品件数</span><input type="number" min="1" value={calcQuantity} onChange={(event) => setCalcQuantity(Math.max(1, Number(event.target.value)))} /></label><label><span>包裹重量（kg）</span><input type="number" min="0" step="0.1" value={calcWeight} onChange={(event) => setCalcWeight(Math.max(0, Number(event.target.value)))} /></label><label><span>快递单号</span><input value="SF2026090100286" readOnly /></label></div><div className="freight-simulator__note"><MapPinned aria-hidden="true" /><p>平台订单可能拆成多条 SKU 明细；试算前仍按快递单号聚合为一个包裹。</p></div></div><aside className="freight-trace" aria-live="polite"><header><div><span>本次执行轨迹</span><small>{selectedScheme.supplierName} · V{selectedScheme.version}</small></div><CheckCircle2 aria-hidden="true" /></header><ol><li><span>01</span><div><strong>供应商路由</strong><small>{selectedScheme.supplierId} → {selectedScheme.supplierName}</small></div></li><li><span>02</span><div><strong>地区鉴定</strong><small>{calcRegion} → {regionLabel}</small></div></li><li><span>03</span><div><strong>快递鉴定</strong><small>{calcCarrier} → {carrierLabel}</small></div></li><li><span>04</span><div><strong>商品特征</strong><small>{calcBrand === 'BRAND_X' ? '品牌X' : '普通品牌'} · {materialLabel}</small></div></li><li><span>05</span><div><strong>包裹指标</strong><small>{calcQuantity} 件 · {calcWeight.toFixed(1)} kg</small></div></li><li className={hasRemoteSfException ? 'is-hit' : ''}><span>06</span><div><strong>特殊联动</strong><small>{hasRemoteSfException ? '命中“偏远地区 + 顺丰”一口价' : '未命中，使用标准计费方案'}</small></div></li></ol><dl><div><dt>运费<small>{hasRemoteSfException ? '特殊联动一口价' : `${regionLabel}基础价${carrierLabel === '顺丰' ? ' + 顺丰附加' : ''}`}</small></dt><dd><MoneyValue value={freight} /></dd></div><div><dt>代发费<small>固定价 + 超件价</small></dt><dd><MoneyValue value={handlingFee} /></dd></div><div><dt>辅料费<small>{calcMaterial === 'CASHMERE' ? '羊绒商品件数 × ¥1' : '默认方案'}</small></dt><dd><MoneyValue value={materialFee} /></dd></div></dl><footer><span>参考合计<small>三个费用字段独立落库</small></span><strong>{formatMoney(freight + handlingFee + materialFee)}</strong></footer></aside></section> : null}

    {schemeEditor ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSchemeEditor(null)}><form className="ledger-dialog freight-rule-dialog" role="dialog" aria-modal="true" aria-labelledby="freight-editor-title" onSubmit={saveScheme}><header><div><span className="eyebrow">supplier_scheme</span><h3 id="freight-editor-title">{schemeEditor.id ? '编辑供应商方案' : schemeEditor.version > 1 ? '创建新版本' : '新增供应商方案'}</h3></div><button className="dialog-close" type="button" aria-label="关闭方案编辑弹窗" onClick={() => setSchemeEditor(null)}><X aria-hidden="true" /></button></header><div className="freight-rule-dialog__body"><section><h4>供应商与版本</h4><div className="freight-rule-dialog__grid"><label className="dialog-field"><span>供应商编码</span><input value={schemeEditor.supplierId} onChange={(event) => setSchemeEditor({ ...schemeEditor, supplierId: event.target.value })} required /></label><label className="dialog-field"><span>供应商名称</span><input value={schemeEditor.supplierName} onChange={(event) => setSchemeEditor({ ...schemeEditor, supplierName: event.target.value })} required /></label><label className="dialog-field"><span>生效日期</span><input type="date" value={schemeEditor.effectiveStart} onChange={(event) => setSchemeEditor({ ...schemeEditor, effectiveStart: event.target.value })} required /></label><label className="dialog-field"><span>版本号</span><input type="number" min="1" value={schemeEditor.version} onChange={(event) => setSchemeEditor({ ...schemeEditor, version: Number(event.target.value) })} required /></label></div></section><section><div className="freight-section-title"><div><h4>默认兜底费用</h4><p>维度没有产生其他价格时使用；0 表示免费。</p></div><span>三字段分开</span></div><div className="freight-fee-grid">{([['baseFreight', '默认运费'], ['handlingFee', '默认代发费'], ['materialFee', '默认辅料费']] as const).map(([key, label]) => <label className="dialog-field freight-money-input" key={key}><span>{label}</span><div><i>¥</i><input type="number" min="0" step="0.01" value={schemeEditor[key]} onChange={(event) => setSchemeEditor({ ...schemeEditor, [key]: event.target.value })} required /></div><small>{schemeEditor[key] === '0' ? '免费' : '兜底价格'}</small></label>)}</div></section><label className="freight-rule-dialog__status"><input type="checkbox" checked={schemeEditor.status === 'active'} onChange={(event) => setSchemeEditor({ ...schemeEditor, status: event.target.checked ? 'active' : 'draft' })} /><span>保存后立即启用</span><small>关闭时保存为草稿</small></label></div><footer><button className="secondary-action" type="button" onClick={() => setSchemeEditor(null)}>取消</button><button className="primary-action" type="submit">保存方案</button></footer></form></div> : null}

    {configEditor ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setConfigEditor(null)}><form className="ledger-dialog freight-rule-dialog freight-config-dialog" role="dialog" aria-modal="true" aria-labelledby="freight-config-editor-title" onSubmit={saveConfig}><header><div><span className="eyebrow">{configEditor.kind}_config</span><h3 id="freight-config-editor-title">{configEditor.id ? '编辑配置' : '新增配置'}</h3></div><button className="dialog-close" type="button" aria-label="关闭配置编辑弹窗" onClick={() => setConfigEditor(null)}><X aria-hidden="true" /></button></header><div className="freight-rule-dialog__body"><div className="freight-rule-dialog__grid"><label className="dialog-field"><span>配置名称</span><input value={configEditor.title} onChange={(event) => setConfigEditor({ ...configEditor, title: event.target.value })} required /></label><label className="dialog-field"><span>配置编码</span><input value={configEditor.code} onChange={(event) => setConfigEditor({ ...configEditor, code: event.target.value })} required /></label><label className="dialog-field"><span>{configEditor.kind === 'dimension' ? '输入字段' : '适用供应商'}</span><input value={configEditor.primary} onChange={(event) => setConfigEditor({ ...configEditor, primary: event.target.value })} required /></label><label className="dialog-field"><span>{configEditor.kind === 'dimension' ? '鉴定逻辑' : configEditor.kind === 'calculator' ? '计费方式' : 'IF 条件'}</span><input value={configEditor.secondary} onChange={(event) => setConfigEditor({ ...configEditor, secondary: event.target.value })} required /></label><label className="dialog-field freight-rule-dialog__full"><span>{configEditor.kind === 'dimension' ? '阶段输出' : configEditor.kind === 'calculator' ? '计算公式' : 'THEN 动作'}</span><input value={configEditor.output} onChange={(event) => setConfigEditor({ ...configEditor, output: event.target.value })} required /></label><label className="dialog-field freight-rule-dialog__full"><span>说明</span><textarea value={configEditor.description} onChange={(event) => setConfigEditor({ ...configEditor, description: event.target.value })} /></label></div><label className="freight-rule-dialog__status"><input type="checkbox" checked={configEditor.enabled} onChange={(event) => setConfigEditor({ ...configEditor, enabled: event.target.checked })} /><span>启用这项配置</span><small>停用后不参与计算</small></label></div><footer><button className="secondary-action" type="button" onClick={() => setConfigEditor(null)}>取消</button><button className="primary-action" type="submit">保存配置</button></footer></form></div> : null}

    {detailScheme ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setDetailScheme(null)}><section className="ledger-dialog freight-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="freight-detail-title"><header><div><span className="eyebrow">scheme_detail</span><h3 id="freight-detail-title">{detailScheme.supplierName}</h3></div><button className="dialog-close" type="button" aria-label="关闭方案详情弹窗" onClick={() => setDetailScheme(null)}><X aria-hidden="true" /></button></header><div className="freight-detail-meta"><span>{detailScheme.supplierId}</span><span>版本 V{detailScheme.version}</span><FreightStatus status={detailScheme.status} /></div><div className="freight-detail-fees"><article><span>默认运费</span><MoneyValue value={detailScheme.baseFreight} /></article><article><span>默认代发费</span><MoneyValue value={detailScheme.handlingFee} /></article><article><span>默认辅料费</span><MoneyValue value={detailScheme.materialFee} /></article></div><section className="freight-detail-pipeline"><h4>方案结构</h4><div><span>{detailScheme.dimensionCount} 个维度鉴定器</span><ArrowRight aria-hidden="true" /><span>{detailScheme.calculatorCount} 个费用计算器</span><ArrowRight aria-hidden="true" /><span>{detailScheme.exceptionCount} 条特殊联动</span></div></section><footer><button className="secondary-action" type="button" onClick={() => setDetailScheme(null)}>关闭</button><button className="primary-action" type="button" onClick={() => { setSchemeEditor(createSchemeDraft(detailScheme)); setDetailScheme(null) }}>编辑方案</button></footer></section></div> : null}

    {pendingDelete ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setPendingDelete(null)}><section className="ledger-dialog freight-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="freight-delete-title" aria-describedby="freight-delete-description"><header><div><span className="eyebrow">delete_config</span><h3 id="freight-delete-title">删除这项配置？</h3></div><button className="dialog-close" type="button" aria-label="关闭删除确认弹窗" onClick={() => setPendingDelete(null)}><X aria-hidden="true" /></button></header><p id="freight-delete-description">将删除“{pendingDelete.title}”。当前页面是前端演示，操作不会影响真实数据。</p><footer><button className="secondary-action" type="button" onClick={() => setPendingDelete(null)}>取消</button><button className="danger-action" type="button" onClick={deleteItem}>确认删除</button></footer></section></div> : null}

    {importOpen ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setImportOpen(false)}><form className="ledger-dialog freight-import-dialog" role="dialog" aria-modal="true" aria-labelledby="freight-import-title" onSubmit={(event) => { event.preventDefault(); setImportOpen(false); showNotice('导入完成，已按三层配置生成草稿') }}><header><div><span className="eyebrow">excel_import</span><h3 id="freight-import-title">导入运费配置</h3></div><button className="dialog-close" type="button" aria-label="关闭导入弹窗" onClick={() => setImportOpen(false)}><X aria-hidden="true" /></button></header><div className="freight-import-dialog__body"><label className="freight-file-picker"><FileSpreadsheet aria-hidden="true" /><strong>{importFileName || '选择 Excel 文件'}</strong><span>支持 .xlsx；先提取维度、计费和特殊联动草稿，不会直接启用。</span><input type="file" accept=".xlsx" required onChange={(event) => setImportFileName(event.target.files?.[0]?.name ?? '')} /></label><p>无备注的固定规则可直接形成计费方案；备注内容只进入待整理区，确认后再转成维度或特殊规则。</p></div><footer><button className="secondary-action" type="button" onClick={() => setImportOpen(false)}>取消</button><button className="primary-action" type="submit">开始导入</button></footer></form></div> : null}

    {notice ? <div className="freight-toast" role="status">{notice}</div> : null}
  </main>
}
