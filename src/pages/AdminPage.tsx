import { useState } from 'react'
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  KeyRound,
  Link2,
  Pencil,
  Plus,
  QrCode,
  ScrollText,
  Sparkles,
  Store,
  Trash2,
  Unlink,
  UserRoundPlus,
  Users,
  X,
} from 'lucide-react'

// ===================== 类型定义 =====================

export type AdminTab = 'team' | 'tasks' | 'platforms'
type AdminTaskTab = 'pea'
type PeaTab = 'all' | 'daily' | 'other'
type TaskSource = '定时任务' | '指令' | '人工上传文件'
type TaskResult = '完成' | '失败'
type DailyReportStatus = '待发布' | '已发布' | '未发布'

interface Team {
  id: string
  name: string
  memberCount: number
  createdAt: string
  desc: string
}

interface TeamPlatformAccount {
  id: string
  platform: string
  accountName: string
  boundAt: string
  stores: string[]
  status: 'connected' | 'expired' | 'unbound'
}

interface SupportedPlatform {
  id: string
  name: string
  status: '已启用' | '已停用'
  updatedAt: string
}

interface PeaRecord {
  id: string
  taskId: string
  taskType: 'daily' | 'other' // 仅用于 tab 筛选，不作为列展示
  featureType: string // 功能类型
  source: TaskSource // 任务来源
  platform: string
  store: string
  taskDate: string
  businessDate: string
  peaCost: number
  team: string // 所属团队
  owner: string // 归属人员
  reviewer: string // 审核人
  resultPreview: string // 结果预览
  taskResult: TaskResult // 任务结果
  reportStatus: DailyReportStatus // 日报状态
  taskLog: string // 任务日志
}

// ===================== Mock 数据 =====================

const peaRecords: PeaRecord[] = [
  {
    id: 'pr-1', taskId: '20260714KSGFGJ001', taskType: 'daily', featureType: '日报生成', source: '定时任务', platform: '快手', store: '官方旗舰店',
    taskDate: '2026-07-14 08:05', businessDate: '2026-07-13', peaCost: 320, team: '澄明电商运营团队', owner: '李运营', reviewer: '张管理员',
    resultPreview: '任务完成', taskResult: '完成', reportStatus: '待发布',
    taskLog: '08:05 拉取快手日报；08:06 完成字段校验；08:05:14 任务结束。',
  },
  {
    id: 'pr-2', taskId: '20260714AKJBSP001', taskType: 'daily', featureType: '日报生成', source: '定时任务', platform: '爱库存', store: '京倍店铺',
    taskDate: '2026-07-14 08:11', businessDate: '2026-07-13', peaCost: 280, team: '京倍数字营销团队', owner: '陈分析', reviewer: '',
    resultPreview: '任务完成', taskResult: '完成', reportStatus: '待发布',
    taskLog: '08:11 拉取爱库存费用数据；品牌推广费为空，等待人工复核。',
  },
  {
    id: 'pr-3', taskId: '20260714WPPPJH001', taskType: 'daily', featureType: '日报生成', source: '指令', platform: '唯品会', store: '品牌集合店',
    taskDate: '2026-07-14 08:18', businessDate: '2026-07-13', peaCost: 450, team: '澄明电商运营团队', owner: '王财务', reviewer: '张管理员',
    resultPreview: '任务完成', taskResult: '完成', reportStatus: '已发布',
    taskLog: '08:18 接收补数指令；08:19 完成唯品会字段复核并发布。',
  },
  {
    id: 'pr-4', taskId: '20260714DYDYSP001', taskType: 'daily', featureType: '日报生成', source: '定时任务', platform: '抖店', store: '抖店旗舰店',
    taskDate: '2026-07-14 08:24', businessDate: '2026-07-13', peaCost: 80, team: '京倍数字营销团队', owner: '李运营', reviewer: '',
    resultPreview: '--', taskResult: '失败', reportStatus: '未发布',
    taskLog: '08:24 调用抖店任务失败：授权令牌失效。',
  },
  {
    id: 'pr-5', taskId: '20260714HYKSP001', taskType: 'daily', featureType: '日报生成', source: '定时任务', platform: '好衣库', store: '好衣库店铺',
    taskDate: '2026-07-14 08:30', businessDate: '2026-07-13', peaCost: 360, team: '澄明电商运营团队', owner: '张管理员', reviewer: '王财务',
    resultPreview: '任务完成', taskResult: '完成', reportStatus: '待发布',
    taskLog: '08:30 拉取好衣库日报；08:31 完成字段校验；08:30:15 任务结束。',
  },
  {
    id: 'pr-6', taskId: '20260714FEE001', taskType: 'other', featureType: '费用差异排查', source: '指令', platform: '快手', store: '官方旗舰店',
    taskDate: '2026-07-14 09:15', businessDate: '2026-07-13', peaCost: 180, team: '澄明电商运营团队', owner: '陈分析', reviewer: '张管理员',
    resultPreview: '任务完成', taskResult: '完成', reportStatus: '已发布',
    taskLog: '09:15 执行费用差异排查任务；09:16 生成报告。',
  },
  {
    id: 'pr-7', taskId: '20260714ROI001', taskType: 'other', featureType: 'ROI 拆解', source: '指令', platform: '快手', store: '官方旗舰店',
    taskDate: '2026-07-14 10:30', businessDate: '2026-07-13', peaCost: 220, team: '澄明电商运营团队', owner: '李运营', reviewer: '王财务',
    resultPreview: '任务完成', taskResult: '完成', reportStatus: '已发布',
    taskLog: '10:30 执行 ROI 拆解任务；10:31 生成报告。',
  },
  {
    id: 'pr-8', taskId: '20260714PROFIT001', taskType: 'other', featureType: '利润归因分析', source: '指令', platform: '唯品会', store: '品牌集合店',
    taskDate: '2026-07-14 14:00', businessDate: '2026-07-13', peaCost: 260, team: '澄明电商运营团队', owner: '王财务', reviewer: '张管理员',
    resultPreview: '任务完成', taskResult: '完成', reportStatus: '已发布',
    taskLog: '14:00 执行利润归因分析；14:01 生成报告并修正。',
  },
]

const peaTabs: Array<{ key: PeaTab; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'daily', label: '日报' },
  { key: 'other', label: '其他报告' },
]

const bindablePlatforms = ['快手', '爱库存', '唯品会', '好衣库', '抖店', '得物']

const teams: Team[] = [
  { id: 'team-1', name: '澄明电商运营团队', memberCount: 4, createdAt: '2026-05-01', desc: '主营快手、唯品会、好衣库平台' },
  { id: 'team-2', name: '京倍数字营销团队', memberCount: 6, createdAt: '2026-04-15', desc: '主营爱库存、抖店平台' },
  { id: 'team-3', name: '万顷品牌管理团队', memberCount: 3, createdAt: '2026-06-10', desc: '主营得物、抖店平台' },
]

const initialTeamAccounts: Record<string, TeamPlatformAccount[]> = {
  'team-1': [
    { id: 'ta-1-1', platform: '快手', accountName: '快手官方企业号', boundAt: '2026-06-15 10:30', stores: ['官方旗舰店', '闪购店'], status: 'connected' },
    { id: 'ta-1-2', platform: '唯品会', accountName: '唯品会品牌服务商', boundAt: '2026-06-20 14:00', stores: ['品牌集合店'], status: 'connected' },
    { id: 'ta-1-3', platform: '好衣库', accountName: '好衣库商家账号', boundAt: '2026-05-10 09:15', stores: ['好衣库店铺'], status: 'expired' },
  ],
  'team-2': [
    { id: 'ta-2-1', platform: '爱库存', accountName: '爱库存商家账号', boundAt: '2026-06-01 11:20', stores: ['京倍店铺', '万顷店铺'], status: 'connected' },
    { id: 'ta-2-2', platform: '抖店', accountName: '抖店旗舰店账号', boundAt: '2026-06-05 15:45', stores: ['抖店旗舰店'], status: 'connected' },
  ],
  'team-3': [
    { id: 'ta-3-1', platform: '得物', accountName: '得物品牌账号', boundAt: '2026-06-12 10:00', stores: ['得物店铺'], status: 'connected' },
  ],
}

type TeamDetailTab = 'members' | 'groups' | 'platforms' | 'dashboards' | 'permissions' | 'logs'
type PermissionTab = 'organization' | 'business'

interface TeamMemberRecord {
  id: string
  avatar: string
  username?: string
  name: string
  email: string
  phone: string
  employeeId?: string
  initialPassword?: string
  orgInfo: string
  organizationRole: '系统管理员' | '商户管理员' | '小组长' | '普通员工'
  group: string
  businessRole: string
  merchantAdmin: boolean
  groupRole: 'leader' | 'member' | 'none'
  status: '正常' | '已禁用'
  peaBalance: number
  modules: string[]
}

type TeamOperatorRole = 'merchant-admin' | 'group-leader'
type TeamMemberDialogMode = 'create' | 'invite' | 'edit'

interface TeamGroupRecord {
  id: string
  name: string
  leader: string
  balance: number
  status: '正常' | '已停用'
  createdAt: string
  stores: string[]
  modules: string[]
}

interface OrganizationPermissionRecord {
  role: '小组长' | '普通员工'
  actions: string[]
}

const teamModuleOptions = ['电商生图', '商智引擎', '小万同学', 'AI开品', 'AI媒体流', 'LORA美人']
const globalDirectoryUsers = [
  { id: 'directory-li', username: 'li.ops', name: '李运营', email: 'li.ops@example.com', phone: '13800001122', employeeId: 'F-1001' },
  { id: 'directory-wang', username: 'wang.finance', name: '王财务', email: 'wang.finance@example.com', phone: '13900002233', employeeId: 'F-1002' },
  { id: 'directory-chen', username: 'chen.data', name: '陈分析', email: 'chen.data@example.com', phone: '13600003308', employeeId: 'F-1003' },
  { id: 'directory-lin', username: 'lin.design', name: '林设计', email: 'lin.design@example.com', phone: '13700004421', employeeId: 'F-1021' },
  { id: 'directory-zhao', username: 'zhao.ops', name: '赵运营', email: 'zhao.ops@example.com', phone: '13500005196', employeeId: 'F-1035' },
]
const dataPermissionPlatforms = ['快手', '爱库存', '唯品会', '好衣库', '抖店']
const dailyTaskPermissionFields = ['任务 ID', '任务来源', '平台', '店铺', '任务日期', '业务日期', '豌豆消耗', '归属人员', '审核人', '结果预览', '任务结果', '日报状态', '任务日志']
const dailyDataPermissionFields = ['业务日期', '平台名称', '店铺名称', 'GMV', '销售收入', '实收收入', '退款金额', '活动折扣', '销售成本', '平台费用', '推广费用', '运费', '管理费用', '净利润']

interface PermissionTreeNode {
  id: string
  label: string
  children?: PermissionTreeNode[]
}

const createPlatformPermissionNodes = (scope: 'task' | 'data'): PermissionTreeNode[] => {
  const fields = scope === 'task' ? dailyTaskPermissionFields : dailyDataPermissionFields
  return dataPermissionPlatforms.map((platform) => ({
    id: `${scope}-${platform}`,
    label: platform,
    children: fields.map((field) => ({ id: `${scope}-${platform}-${field}`, label: field })),
  }))
}

const productionPermissionTree: PermissionTreeNode[] = [{
  id: 'production-ecommerce-image',
  label: '电商生图',
  children: [
    {
      id: 'production-ecommerce-tasks',
      label: '任务生产',
      children: ['创建任务', '编辑任务', '终止任务', '查看任务'].map((item) => ({ id: `production-ecommerce-task-${item}`, label: item })),
    },
    {
      id: 'production-ecommerce-assets',
      label: '素材资产',
      children: ['查看素材', '上传素材', '管理素材'].map((item) => ({ id: `production-ecommerce-asset-${item}`, label: item })),
    },
  ],
}, {
  id: 'production-business-engine',
  label: '商智引擎',
  children: [
    { id: 'production-business-dashboard', label: '经营看板', children: ['查看看板', '导出报表'].map((item) => ({ id: `production-business-dashboard-${item}`, label: item })) },
    { id: 'production-business-report', label: '日报管理', children: ['查看日报', '编辑日报', '发布日报'].map((item) => ({ id: `production-business-report-${item}`, label: item })) },
  ],
}, {
  id: 'production-xiaowan',
  label: '小万同学',
  children: [{ id: 'production-xiaowan-chat', label: '对话服务', children: ['发起对话', '管理知识库'].map((item) => ({ id: `production-xiaowan-${item}`, label: item })) }],
}]

const managerGroupOperationTree: PermissionTreeNode[] = [{
  id: 'manager-group-members',
  label: '成员管理',
  children: ['查看本组成员', '邀请本组成员', '编辑本组成员', '移除本组成员'].map((item) => ({ id: `manager-group-member-${item}`, label: item })),
}, {
  id: 'manager-group-roles',
  label: '角色分配',
  children: ['查看本组角色', '分配本组业务角色'].map((item) => ({ id: `manager-group-role-${item}`, label: item })),
}, {
  id: 'manager-group-workspace',
  label: '小组协作',
  children: ['查看本组任务', '分配本组任务', '查看本组操作日志'].map((item) => ({ id: `manager-group-workspace-${item}`, label: item })),
}]

const dataPermissionTree: PermissionTreeNode[] = [{
  id: 'data-center',
  label: '数据中心',
  children: [
    { id: 'data-daily-tasks', label: '日报任务记录', children: createPlatformPermissionNodes('task') },
    { id: 'data-daily-data', label: '日报数据', children: createPlatformPermissionNodes('data') },
  ],
}]

const getPermissionLeafIds = (node: PermissionTreeNode): string[] => node.children?.flatMap(getPermissionLeafIds) ?? [node.id]

const getPermissionTreeLeafIds = (nodes: PermissionTreeNode[]) => nodes.flatMap(getPermissionLeafIds)

function getMemberOrganizationLabel(member: TeamMemberRecord) {
  if (member.merchantAdmin && member.groupRole === 'leader') return '商户管理员 / 小组长'
  if (member.merchantAdmin) return '商户管理员'
  if (member.groupRole === 'leader') return '小组长'
  return '普通成员'
}

function PermissionTree({
  nodes,
  selectedIds,
  onSelectedIdsChange,
  defaultExpandedIds,
}: {
  nodes: PermissionTreeNode[]
  selectedIds: Set<string>
  onSelectedIdsChange: (nextIds: Set<string>) => void
  defaultExpandedIds: string[]
}) {
  const [expandedIds, setExpandedIds] = useState(() => new Set(defaultExpandedIds))

  const toggleNode = (node: PermissionTreeNode) => {
    const leafIds = getPermissionLeafIds(node)
    const isFullySelected = leafIds.every((id) => selectedIds.has(id))
    const nextIds = new Set(selectedIds)
    leafIds.forEach((id) => isFullySelected ? nextIds.delete(id) : nextIds.add(id))
    onSelectedIdsChange(nextIds)
  }

  const renderNode = (node: PermissionTreeNode, depth = 0) => {
    const hasChildren = Boolean(node.children?.length)
    const leafIds = getPermissionLeafIds(node)
    const isChecked = leafIds.every((id) => selectedIds.has(id))
    const isPartial = !isChecked && leafIds.some((id) => selectedIds.has(id))
    const isExpanded = expandedIds.has(node.id)

    return <div className="permission-tree__node" key={node.id}>
      <div className="permission-tree__row" style={{ paddingLeft: `${depth * 18}px` }}>
        {hasChildren ? <button className="permission-tree__toggle" type="button" aria-label={`${isExpanded ? '收起' : '展开'}${node.label}`} aria-expanded={isExpanded} onClick={() => setExpandedIds((ids) => {
          const nextIds = new Set(ids)
          if (isExpanded) nextIds.delete(node.id)
          else nextIds.add(node.id)
          return nextIds
        })}>{isExpanded ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}</button> : <span className="permission-tree__toggle-spacer" aria-hidden="true" />}
        <label className="permission-tree__label">
          <input type="checkbox" checked={isChecked} ref={(element) => { if (element) element.indeterminate = isPartial }} onChange={() => toggleNode(node)} />
          <span>{node.label}</span>
        </label>
      </div>
      {hasChildren && isExpanded ? <div className="permission-tree__children">{node.children!.map((child) => renderNode(child, depth + 1))}</div> : null}
    </div>
  }

  return <div className="permission-tree" role="tree">{nodes.map((node) => renderNode(node))}</div>
}

function BusinessPermissionDialog({
  role,
  businessRoles,
  groups,
  selectedGroupIds,
  onClose,
  onSave,
}: {
  role: string
  businessRoles: string[]
  groups: TeamGroupRecord[]
  selectedGroupIds: string[]
  onClose: () => void
  onSave: (name: string, groupIds: string[]) => void
}) {
  const [roleName, setRoleName] = useState(role)
  const [groupIds, setGroupIds] = useState(selectedGroupIds)
  const [operationSelections, setOperationSelections] = useState(() => new Set(getPermissionTreeLeafIds(productionPermissionTree)))
  const [dataSelections, setDataSelections] = useState(() => new Set(dataPermissionPlatforms.flatMap((platform) => ['业务日期', '平台名称', '店铺名称'].map((field) => `data-${platform}-${field}`))))

  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <form className="ledger-dialog create-task-dialog permission-dialog" onSubmit={(event) => { event.preventDefault(); onSave(roleName, groupIds) }}>
      <header>
        <div>
          <span className="eyebrow">business_role</span>
          <h3>{businessRoles.includes(role) ? '编辑业务角色' : '新增业务角色'}</h3>
        </div>
        <button type="button" className="dialog-close" onClick={onClose}>×</button>
      </header>
      <label className="dialog-field">
        <span>角色名称</span>
        <input value={roleName} onChange={(event) => setRoleName(event.target.value)} required />
      </label>
      <section className="dialog-field merchant-role-groups">
        <span>可用小组</span>
        <small className="dialog-field-hint">商户管理员只能在本团队的小组范围内配置该角色。</small>
        <div className="merchant-role-groups__list">{groups.map((group) => <label key={group.id}><input type="checkbox" checked={groupIds.includes(group.id)} onChange={() => setGroupIds((current) => current.includes(group.id) ? current.filter((id) => id !== group.id) : [...current, group.id])} /><span>{group.name}</span><small>{group.modules.join('、') || '暂未开通模块'}</small></label>)}</div>
      </section>
      <div className="permission-dialog__grids">
        <section className="dialog-field">
          <span>生产端功能</span>
          <PermissionTree nodes={productionPermissionTree} selectedIds={operationSelections} onSelectedIdsChange={setOperationSelections} defaultExpandedIds={['production-ecommerce-image', 'production-ecommerce-tasks', 'production-ecommerce-assets', 'production-business-engine', 'production-business-dashboard', 'production-business-report']} />
        </section>
        <section className="dialog-field">
          <span>数据权限</span>
          <PermissionTree nodes={dataPermissionTree} selectedIds={dataSelections} onSelectedIdsChange={setDataSelections} defaultExpandedIds={['data-center', 'data-daily-tasks', 'data-daily-data']} />
          <small className="dialog-field-hint">展开平台后，可单独配置该平台下的字段可见范围。</small>
        </section>
      </div>
      <footer>
        <button className="secondary-action" type="button" onClick={onClose}>取消</button>
        <button className="primary-action" type="submit">保存</button>
      </footer>
    </form>
  </div>
}

function TeamDetailPage({ team, onBack, supportedPlatforms }: { team: Team; onBack: () => void; supportedPlatforms: string[] }) {
  const [tab, setTab] = useState<TeamDetailTab>('members')
  const [permissionTab, setPermissionTab] = useState<PermissionTab>('organization')
  const [organizationPermissions, setOrganizationPermissions] = useState<OrganizationPermissionRecord[]>([
    { role: '小组长', actions: getPermissionTreeLeafIds(managerGroupOperationTree) },
    { role: '普通员工', actions: ['manager-group-member-查看本组成员'] },
  ])
  const [editingOrganizationPermission, setEditingOrganizationPermission] = useState<OrganizationPermissionRecord | null>(null)
  const [members, setMembers] = useState<TeamMemberRecord[]>([
    { id: 'member-1', avatar: '李', name: '李运营', email: 'li.ops@example.com', phone: '138****1122', orgInfo: '澄明电商 / 运营部 / 运营专员', organizationRole: '小组长', group: '运营组', businessRole: '运营', merchantAdmin: false, groupRole: 'leader', status: '正常', peaBalance: 1260, modules: [] },
    { id: 'member-2', avatar: '王', name: '王财务', email: 'wang.finance@example.com', phone: '139****2233', orgInfo: '澄明电商 / 财务部 / 财务主管', organizationRole: '小组长', group: '财务组', businessRole: '财务', merchantAdmin: false, groupRole: 'leader', status: '正常', peaBalance: 980, modules: [] },
    { id: 'member-3', avatar: '陈', name: '陈分析', email: 'chen.data@example.com', phone: '136****3308', orgInfo: '澄明电商 / 数据部 / 数据分析师', organizationRole: '普通员工', group: '运营组', businessRole: '运营', merchantAdmin: false, groupRole: 'member', status: '正常', peaBalance: 640, modules: [] },
  ])
  const [groups, setGroups] = useState<TeamGroupRecord[]>([
    { id: 'group-1', name: '运营组', leader: '李运营', balance: 3200, status: '正常', createdAt: '2026-05-12', stores: ['官方旗舰店', '品牌集合店'], modules: ['电商生图', '商智引擎'] },
    { id: 'group-2', name: '财务组', leader: '王财务', balance: 1800, status: '正常', createdAt: '2026-05-20', stores: ['官方旗舰店', '京倍店铺'], modules: ['商智引擎'] },
  ])
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null)
  const [editingMember, setEditingMember] = useState<TeamMemberRecord | null>(null)
  const [memberDialogMode, setMemberDialogMode] = useState<TeamMemberDialogMode | null>(null)
  const [operatorRole, setOperatorRole] = useState<TeamOperatorRole>('merchant-admin')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteBusinessRole, setInviteBusinessRole] = useState('')
  const [inviteMerchantAdmin, setInviteMerchantAdmin] = useState(false)
  const [groupAssignmentRequested, setGroupAssignmentRequested] = useState(false)
  const [permissionMember, setPermissionMember] = useState<TeamMemberRecord | null>(null)
  const [editingGroup, setEditingGroup] = useState<TeamGroupRecord | null>(null)
  const [managingGroup, setManagingGroup] = useState<TeamGroupRecord | null>(null)
  const [joiningMemberId, setJoiningMemberId] = useState('')
  const [joiningGroupRole, setJoiningGroupRole] = useState<'leader' | 'member'>('member')
  const [inviteTargetGroupName, setInviteTargetGroupName] = useState<string | null>(null)
  const [adjusting, setAdjusting] = useState<{ type: 'member' | 'group'; id: string; direction: 'add' | 'subtract'; amount: number } | null>(null)
  const [businessRoles, setBusinessRoles] = useState(['老板', '财务', '运营', '其他'])
  const [businessRoleGroupIds, setBusinessRoleGroupIds] = useState<Record<string, string[]>>({
    '老板': ['group-1', 'group-2'],
    '财务': ['group-2'],
    '运营': ['group-1'],
    '其他': [],
  })
  const [editingBusinessRole, setEditingBusinessRole] = useState<string | null>(null)
  const [teamDashboards, setTeamDashboards] = useState([
    { id: 'team-dashboard-1', name: '经营日报总览', group: '运营组', status: '已发布' },
    { id: 'team-dashboard-2', name: '费用与利润分析', group: '财务组', status: '草稿' },
  ])
  const availableStores = ['官方旗舰店', '品牌集合店', '京倍店铺', '万顷店铺']
  const [teamPlatformAccounts, setTeamPlatformAccounts] = useState<TeamPlatformAccount[]>(initialTeamAccounts[team.id] ?? [])
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [addingPlatform, setAddingPlatform] = useState(false)
  const [newPlatformName, setNewPlatformName] = useState('')
  const [bindingStore, setBindingStore] = useState(false)
  const [storeBindMode, setStoreBindMode] = useState<'scan' | 'password'>('scan')
  const [storeName, setStoreName] = useState('')
  const [storeAccount, setStoreAccount] = useState('')
  const [storePassword, setStorePassword] = useState('')
  const teamPlatforms = Array.from(new Set(teamPlatformAccounts.map((account) => account.platform)))
  const selectedPlatformAccounts = teamPlatformAccounts.filter((account) => account.platform === selectedPlatform)
  const groupLeader = permissionMember?.group ? members.find((member) => member.group === permissionMember.group && member.groupRole === 'leader')?.name ?? '暂无组长' : '—'
  const leaderGroup = groups.find((group) => group.leader === '李运营') ?? groups[0]
  const matchedInvitee = globalDirectoryUsers.find((user) => user.email.toLowerCase() === inviteEmail.trim().toLowerCase())

  const openMemberCreation = () => {
    const isGroupLeader = operatorRole === 'group-leader'
    setEditingMember({ id: '', avatar: '', username: '', name: '', email: '', phone: '', employeeId: '', initialPassword: '', orgInfo: '', organizationRole: '普通员工', group: isGroupLeader ? leaderGroup?.name ?? '' : '', businessRole: '', merchantAdmin: false, groupRole: isGroupLeader ? 'member' : 'none', status: '正常', peaBalance: 0, modules: [] })
    setGroupAssignmentRequested(isGroupLeader)
    setMemberDialogMode('create')
  }

  const saveMember = () => {
    if (!editingMember || !editingMember.name.trim() || (!editingMember.id && !editingMember.businessRole)) return
    const organizationRole: TeamMemberRecord['organizationRole'] = editingMember.merchantAdmin ? '商户管理员' : editingMember.groupRole === 'leader' ? '小组长' : '普通员工'
    const nextMember = { ...editingMember, organizationRole }
    setMembers((rows) => nextMember.id ? rows.map((row) => row.id === nextMember.id ? nextMember : row) : [...rows, { ...nextMember, id: `member-${Date.now()}`, avatar: nextMember.name.trim().slice(0, 1) }])
    setEditingMember(null)
    setMemberDialogMode(null)
  }
  const saveInvitation = () => {
    if (!matchedInvitee || !inviteBusinessRole) return
    const isGroupLeader = operatorRole === 'group-leader'
    const group = inviteTargetGroupName ?? (isGroupLeader ? leaderGroup?.name ?? '' : '')
    const mustJoinGroup = Boolean(group)
    const nextMember: TeamMemberRecord = { id: `member-${Date.now()}`, avatar: matchedInvitee.name.slice(0, 1), username: matchedInvitee.username, name: matchedInvitee.name, email: matchedInvitee.email, phone: matchedInvitee.phone, employeeId: matchedInvitee.employeeId, orgInfo: '待补充', organizationRole: inviteMerchantAdmin && !mustJoinGroup ? '商户管理员' : '普通员工', group, businessRole: inviteBusinessRole, merchantAdmin: inviteMerchantAdmin && !mustJoinGroup, groupRole: mustJoinGroup ? 'member' : 'none', status: '正常', peaBalance: 0, modules: [] }
    setMembers((rows) => {
      const existingMember = rows.find((member) => member.email === nextMember.email)
      if (!existingMember) return [...rows, nextMember]
      return rows.map((member) => member.id !== existingMember.id ? member : mustJoinGroup
        ? { ...member, group, groupRole: 'member', businessRole: inviteBusinessRole, organizationRole: member.merchantAdmin ? '商户管理员' : '普通员工' }
        : { ...member, merchantAdmin: inviteMerchantAdmin, businessRole: inviteBusinessRole, organizationRole: inviteMerchantAdmin ? '商户管理员' : member.groupRole === 'leader' ? '小组长' : '普通员工' })
    })
    setMemberDialogMode(null)
    setInviteEmail('')
    setInviteBusinessRole('')
    setInviteMerchantAdmin(false)
    setInviteTargetGroupName(null)
  }
  const savePermission = () => {
    if (!permissionMember) return
    setMembers((rows) => rows.map((row) => row.id === permissionMember.id ? permissionMember : row))
    setPermissionMember(null)
  }
  const saveGroup = () => {
    if (!editingGroup || !editingGroup.name.trim()) return
    setGroups((rows) => editingGroup.id ? rows.map((row) => row.id === editingGroup.id ? editingGroup : row) : [...rows, { ...editingGroup, id: `group-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }])
    setEditingGroup(null)
  }

  const openGroupManager = (group: TeamGroupRecord) => {
    setManagingGroup(group)
    setJoiningMemberId('')
    setJoiningGroupRole('member')
  }
  const setMemberGroupRole = (group: TeamGroupRecord, member: TeamMemberRecord, role: 'leader' | 'member') => {
    const priorGroup = member.group
    const priorRole = member.groupRole
    setMembers((rows) => rows.map((row) => {
      if (role === 'leader' && row.group === group.name && row.groupRole === 'leader' && row.id !== member.id) {
        return { ...row, groupRole: 'member', organizationRole: row.merchantAdmin ? '商户管理员' : '普通员工' }
      }
      if (row.id !== member.id) return row
      return { ...row, group: group.name, groupRole: role, organizationRole: row.merchantAdmin ? '商户管理员' : role === 'leader' ? '小组长' : '普通员工' }
    }))
    setGroups((rows) => rows.map((row) => {
      if (row.id === group.id) return { ...row, leader: role === 'leader' ? member.name : row.leader === member.name ? '' : row.leader }
      if (row.name === priorGroup && priorRole === 'leader') return { ...row, leader: '' }
      return row
    }))
  }
  const addMemberToGroup = () => {
    if (!managingGroup || !joiningMemberId) return
    const member = members.find((item) => item.id === joiningMemberId)
    if (!member) return
    setMemberGroupRole(managingGroup, member, joiningGroupRole)
    setJoiningMemberId('')
    setJoiningGroupRole('member')
  }
  const removeMemberFromGroup = (group: TeamGroupRecord, member: TeamMemberRecord) => {
    setMembers((rows) => rows.map((row) => row.id === member.id ? { ...row, group: '', groupRole: 'none', organizationRole: row.merchantAdmin ? '商户管理员' : '普通员工' } : row))
    if (member.groupRole === 'leader') setGroups((rows) => rows.map((row) => row.id === group.id ? { ...row, leader: '' } : row))
  }

  return <>
    <article className="data-table-card">
      <header><div><span className="eyebrow">team_console</span><h3>{team.name}</h3></div><button className="secondary-action" type="button" onClick={onBack}><ArrowLeft aria-hidden="true" />返回团队列表</button></header>
      <div className="dialog-meta"><span>{team.desc}</span><span>创建时间：{team.createdAt}</span></div>
    </article>
    <div className="admin-sub-tabs">{([{ id: 'members', label: '成员管理' }, { id: 'groups', label: '小组管理' }, { id: 'platforms', label: '平台管理' }, { id: 'dashboards', label: '仪表盘管理' }, { id: 'permissions', label: '权限管理' }, { id: 'logs', label: '操作日志' }] as Array<{ id: TeamDetailTab; label: string }>).filter((item) => operatorRole === 'merchant-admin' || item.id === 'members').map((item) => <button key={item.id} type="button" className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)}>{item.label}</button>)}</div>
    {tab === 'members' ? <article className="data-table-card">
      <header><div><span className="eyebrow">team_members</span><h3>成员管理</h3></div><div className="table-header-actions"><button type="button" className="secondary-action" onClick={openMemberCreation}><Plus aria-hidden="true" />创建成员</button><button type="button" className="primary-action" onClick={() => { setMemberDialogMode('invite'); setInviteEmail(''); setInviteBusinessRole(''); setInviteMerchantAdmin(false) }}><Plus aria-hidden="true" />邀请已有用户</button></div></header>
      <div className="team-member-scope"><span>当前操作身份</span><div><button type="button" className={operatorRole === 'merchant-admin' ? 'active' : ''} onClick={() => setOperatorRole('merchant-admin')}>商户管理员</button><button type="button" className={operatorRole === 'group-leader' ? 'active' : ''} onClick={() => setOperatorRole('group-leader')}>小组长</button></div><small>{operatorRole === 'merchant-admin' ? '可管理团队内成员、小组与组织角色。' : `仅能管理 ${leaderGroup?.name ?? '当前小组'}，新建和邀请的账号会直接加入该小组。`}</small></div>
      <div className="table-scroll"><table><thead><tr><th>成员</th><th>手机号</th><th>公司 / 部门 / 岗位</th><th>组织角色</th><th>业务角色</th><th>账号状态</th><th>豌豆余额</th><th>小组可见模块</th><th>操作项</th></tr></thead><tbody>{members.filter((member) => operatorRole === 'merchant-admin' || member.group === leaderGroup?.name).map((member) => { const groupModules = groups.find((group) => group.name === member.group)?.modules ?? []; return <tr key={member.id}><td><div className="team-member-cell"><span>{member.avatar}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div></td><td>{member.phone}</td><td>{member.orgInfo}</td><td>{getMemberOrganizationLabel(member)}</td><td>{member.businessRole}</td><td><span className={`data-pill ${member.status === '正常' ? 'good' : 'warning'}`}>{member.status}</span></td><td>{member.peaBalance}</td><td>{groupModules.join('、') || '—'}</td><td><div className="row-actions">{operatorRole === 'merchant-admin' ? <><button type="button" className="table-action" onClick={() => { setEditingMember({ ...member }); setGroupAssignmentRequested(Boolean(member.group)); setMemberDialogMode('edit') }}>编辑信息</button><button type="button" className="table-action" onClick={() => setAdjusting({ type: 'member', id: member.id, direction: 'add', amount: 0 })}>豌豆分配/回收</button><button type="button" className="table-action" onClick={() => setPermissionMember({ ...member })}>权限管理</button><button type="button" className="table-action" onClick={() => setMembers((rows) => rows.map((row) => row.id === member.id ? { ...row, status: row.status === '正常' ? '已禁用' : '正常' } : row))}>{member.status === '正常' ? '禁用账号' : '启用账号'}</button><button type="button" className="table-action danger-action" onClick={() => setMembers((rows) => rows.filter((row) => row.id !== member.id))}>删除账号</button></> : <span className="table-action team-member-scope__readonly">仅可通过创建或邀请加入本组</span>}</div></td></tr> })}</tbody></table></div>
    </article> : null}
    {tab === 'groups' ? <article className="data-table-card">
      <header>
        <div><span className="eyebrow">team_groups</span><h3>小组管理</h3></div>
        <button type="button" className="primary-action" onClick={() => setEditingGroup({ id: '', name: '', leader: '', balance: 0, status: '正常', createdAt: '', stores: [], modules: [] })}><Plus aria-hidden="true" />创建小组</button>
      </header>
      <div className="table-scroll"><table><thead><tr><th>小组</th><th>小组长</th><th>可见模块</th><th>成员数</th><th>小组余额</th><th>状态</th><th>创建时间</th><th>关联店铺</th><th>操作</th></tr></thead><tbody>
        {groups.map((group) => {
          const groupMembers = members.filter((member) => member.group === group.name)
          const isExpanded = expandedGroupId === group.id
          return <>
            <tr key={group.id}>
              <td><button type="button" className="preview-link team-group-name" onClick={() => setExpandedGroupId(isExpanded ? null : group.id)}>{isExpanded ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}{group.name}</button></td>
              <td>{group.leader || '—'}</td><td>{group.modules.join('、') || '—'}</td><td>{groupMembers.length}</td><td>{group.balance}</td>
              <td><span className={`data-pill ${group.status === '正常' ? 'good' : 'warning'}`}>{group.status}</span></td><td>{group.createdAt}</td><td>{group.stores.join('、') || '—'}</td>
              <td><div className="row-actions"><button type="button" className="table-action" onClick={() => openGroupManager(group)}><Users aria-hidden="true" />成员管理</button><button type="button" className="table-action" onClick={() => setEditingGroup({ ...group, stores: [...group.stores], modules: [...group.modules] })}>编辑</button><button type="button" className="table-action" onClick={() => setAdjusting({ type: 'group', id: group.id, direction: 'add', amount: 0 })}>豌豆分配/回收</button><button type="button" className="table-action danger-action" onClick={() => { setGroups((rows) => rows.filter((row) => row.id !== group.id)); setMembers((rows) => rows.map((member) => member.group === group.name ? { ...member, group: '', groupRole: 'none', organizationRole: member.merchantAdmin ? '商户管理员' : '普通员工' } : member)) }}>解散小组</button></div></td>
            </tr>
            {isExpanded ? <tr key={`${group.id}-members`}><td colSpan={9} className="team-group-expand-cell"><section className="team-group-members">
              <header className="team-group-members__head"><div><strong>{group.name}成员列表</strong><small>可见模块：{group.modules.join('、') || '暂未配置'}</small></div><button type="button" className="secondary-action" onClick={() => openGroupManager(group)}><Users aria-hidden="true" />管理成员</button></header>
              <div className="team-group-members__table-wrap"><table><thead><tr><th>成员</th><th>业务角色</th><th>小组身份</th><th>状态</th><th>豌豆余额</th><th>成员操作</th></tr></thead><tbody>
                {groupMembers.map((member) => <tr key={member.id}><td><div className="team-member-cell"><span>{member.avatar}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div></td><td>{member.businessRole || '—'}</td><td><span className={`data-pill ${member.groupRole === 'leader' ? 'warning' : 'normal'}`}>{member.groupRole === 'leader' ? '小组长' : '组员'}</span></td><td><span className={`data-pill ${member.status === '正常' ? 'good' : 'warning'}`}>{member.status}</span></td><td>{member.peaBalance}</td><td><div className="row-actions"><button type="button" className="table-action" onClick={() => openGroupManager(group)}>管理</button><button type="button" className="table-action danger-action" onClick={() => removeMemberFromGroup(group, member)}>移出小组</button></div></td></tr>)}
                {groupMembers.length === 0 ? <tr><td colSpan={6} className="empty-table-cell">该小组暂无成员，请通过“成员管理”加入团队成员。</td></tr> : null}
              </tbody></table></div>
            </section></td></tr> : null}
          </>
        })}
      </tbody></table></div>
    </article> : null}
    {tab === 'platforms' ? <article className="data-table-card"><header><div><span className="eyebrow">team_platforms</span><h3>{selectedPlatform ? `${selectedPlatform} · 店铺管理` : '平台管理'}</h3></div><div className="table-header-actions">{selectedPlatform ? <button type="button" className="secondary-action" onClick={() => setSelectedPlatform(null)}><ArrowLeft aria-hidden="true" />返回平台列表</button> : null}<button type="button" className="primary-action" onClick={() => selectedPlatform ? (setBindingStore(true), setStoreBindMode('scan'), setStoreName(''), setStoreAccount(''), setStorePassword('')) : (setNewPlatformName(supportedPlatforms[0] ?? ''), setAddingPlatform(true))}><Plus aria-hidden="true" />{selectedPlatform ? '绑定店铺' : '新增平台'}</button></div></header>{selectedPlatform ? <div className="table-scroll"><table><thead><tr><th>店铺名称</th><th>绑定账号</th><th>绑定方式</th><th>绑定时间</th><th>状态</th><th>操作</th></tr></thead><tbody>{selectedPlatformAccounts.map((account) => { const isUnbound = account.status === 'unbound'; const statusLabel = account.status === 'connected' ? '已连接' : isUnbound ? '已解绑' : '已过期'; return <tr key={account.id}><td>{account.stores.join('、') || '—'}</td><td>{account.accountName}</td><td>平台授权</td><td>{account.boundAt}</td><td><span className={`data-pill ${account.status === 'connected' ? 'good' : isUnbound ? 'neutral' : 'warning'}`}>{statusLabel}</span></td><td><button type="button" className="table-action danger-action" disabled={isUnbound} onClick={() => setTeamPlatformAccounts((rows) => rows.map((row) => row.id === account.id ? { ...row, status: 'unbound' } : row))}>{isUnbound ? '已解绑' : '解绑店铺'}</button></td></tr> })}{selectedPlatformAccounts.length === 0 ? <tr><td colSpan={6} className="empty-table-cell">暂未绑定店铺</td></tr> : null}</tbody></table></div> : <div className="table-scroll"><table><thead><tr><th>平台</th><th>已绑定店铺</th><th>已连接账号</th><th>状态</th><th>操作</th></tr></thead><tbody>{teamPlatforms.map((platform) => { const accounts = teamPlatformAccounts.filter((account) => account.platform === platform); return <tr key={platform}><td><strong>{platform}</strong></td><td>{accounts.flatMap((account) => account.stores).join('、') || '—'}</td><td>{accounts.filter((account) => account.status === 'connected').length}</td><td><span className="data-pill good">已启用</span></td><td><button type="button" className="table-action" onClick={() => setSelectedPlatform(platform)}>进入平台</button></td></tr> })}{teamPlatforms.length === 0 ? <tr><td colSpan={5} className="empty-table-cell">暂无平台，请先新增平台</td></tr> : null}</tbody></table></div>}</article> : null}
    {tab === 'dashboards' ? <article className="data-table-card"><header><div><span className="eyebrow">team_dashboard_templates</span><h3>仪表盘管理</h3></div><button type="button" className="primary-action" onClick={() => setTeamDashboards((rows) => [...rows, { id: `team-dashboard-${Date.now()}`, name: `新仪表盘模板 ${rows.length + 1}`, group: '未分配', status: '草稿' }])}><Plus aria-hidden="true" />新建仪表盘</button></header><div className="table-scroll"><table><thead><tr><th>仪表盘名称</th><th>归属小组</th><th>状态</th><th>操作</th></tr></thead><tbody>{teamDashboards.map((dashboard) => <tr key={dashboard.id}><td><strong>{dashboard.name}</strong></td><td>{dashboard.group}</td><td><span className={`data-pill ${dashboard.status === '已发布' ? 'good' : 'neutral'}`}>{dashboard.status}</span></td><td><div className="row-actions"><button type="button" className="table-action" onClick={() => setTeamDashboards((rows) => rows.map((row) => row.id === dashboard.id ? { ...row, status: row.status === '已发布' ? '已停用' : '已发布' } : row))}>{dashboard.status === '已发布' ? '停用' : '发布'}</button><button type="button" className="table-action">编辑</button><button type="button" className="table-action danger-action" onClick={() => setTeamDashboards((rows) => rows.filter((row) => row.id !== dashboard.id))}>删除</button></div></td></tr>)}</tbody></table></div></article> : null}
    {tab === 'permissions' ? <>
      <div className="admin-sub-tabs"><button type="button" className={permissionTab === 'organization' ? 'active' : ''} onClick={() => setPermissionTab('organization')}>组织权限</button><button type="button" className={permissionTab === 'business' ? 'active' : ''} onClick={() => setPermissionTab('business')}>业务权限</button></div>
      {permissionTab === 'organization' ? <article className="data-table-card"><header><div><span className="eyebrow">manager_operations</span><h3>组织权限</h3><p className="dialog-field-hint">用于配置 Manager 端的小组管理操作，不再按页面可见性授权。</p></div></header><div className="table-scroll"><table><thead><tr><th>组织角色</th><th>可执行操作</th><th>管理范围</th><th>操作</th></tr></thead><tbody>{organizationPermissions.map((permission) => <tr key={permission.role}><td>{permission.role}</td><td>{permission.actions.length ? `${permission.actions.length} 项小组管理操作` : '—'}</td><td>{permission.role === '小组长' ? '仅所属小组' : '仅本人'}</td><td><button type="button" className="table-action" onClick={() => setEditingOrganizationPermission({ ...permission, actions: [...permission.actions] })}>配置操作</button></td></tr>)}</tbody></table></div></article> : <article className="data-table-card"><header><div><span className="eyebrow">production_roles</span><h3>业务角色</h3><p className="dialog-field-hint">配置生产端功能与数据范围；实际可用模块仍受小组模块范围限制。</p></div><button type="button" className="primary-action" onClick={() => setEditingBusinessRole('')}><Plus aria-hidden="true" />新增业务角色</button></header><div className="table-scroll"><table><thead><tr><th>业务角色名称</th><th>使用成员</th><th>生产端权限</th><th>操作项</th></tr></thead><tbody>{businessRoles.map((role) => <tr key={role}><td>{role}</td><td>{members.filter((member) => member.businessRole === role).length}</td><td>按角色配置</td><td><div className="row-actions"><button type="button" className="table-action" onClick={() => setEditingBusinessRole(role)}>编辑权限</button><button type="button" className="table-action">禁用</button><button type="button" className="table-action danger-action" onClick={() => setBusinessRoles((roles) => roles.filter((item) => item !== role))}>删除</button></div></td></tr>)}</tbody></table></div></article>}
    </> : null}
    {tab === 'logs' ? <article className="data-table-card"><header><div><span className="eyebrow">team_audit_log</span><h3>操作日志</h3></div></header><div className="table-scroll"><table><thead><tr><th>时间</th><th>操作人</th><th>操作内容</th><th>对象</th></tr></thead><tbody><tr><td>2026-07-28 10:20</td><td>张管理员</td><td>调整成员豌豆余额</td><td>李运营</td></tr><tr><td>2026-07-27 15:32</td><td>王财务</td><td>更新小组店铺权限</td><td>运营组</td></tr><tr><td>2026-07-26 09:10</td><td>张管理员</td><td>创建成员</td><td>陈分析</td></tr></tbody></table></div></article> : null}
    {addingPlatform ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setAddingPlatform(false)}><form className="ledger-dialog create-task-dialog" onSubmit={(event) => { event.preventDefault(); const platform = newPlatformName; if (platform && !teamPlatforms.includes(platform)) { setTeamPlatformAccounts((rows) => [...rows, { id: `platform-${Date.now()}`, platform, accountName: '待绑定', boundAt: '—', stores: [], status: 'expired' }]); setNewPlatformName('') }; setAddingPlatform(false) }}><header><div><span className="eyebrow">add_platform</span><h3>新增平台</h3></div><button type="button" className="dialog-close" onClick={() => setAddingPlatform(false)}>×</button></header><label className="dialog-field"><span>平台名称</span><select value={newPlatformName} onChange={(event) => setNewPlatformName(event.target.value)} required><option value="" disabled>请选择已启用平台</option>{supportedPlatforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}</select></label><footer><button className="secondary-action" type="button" onClick={() => setAddingPlatform(false)}>取消</button><button className="primary-action" type="submit">新增平台</button></footer></form></div> : null}
    {bindingStore && selectedPlatform ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setBindingStore(false)}><form className="ledger-dialog create-task-dialog" onSubmit={(event) => { event.preventDefault(); setTeamPlatformAccounts((rows) => [...rows, { id: `store-${Date.now()}`, platform: selectedPlatform, accountName: storeBindMode === 'password' ? storeAccount : `${selectedPlatform}扫码授权账号`, boundAt: new Date().toISOString().slice(0, 16).replace('T', ' '), stores: [storeName.trim() || `${selectedPlatform}店铺`], status: 'connected' }]); setBindingStore(false) }}><header><div><span className="eyebrow">bind_store</span><h3>绑定 {selectedPlatform} 店铺</h3></div><button type="button" className="dialog-close" onClick={() => setBindingStore(false)}>×</button></header><label className="dialog-field"><span>店铺名称</span><input value={storeName} onChange={(event) => setStoreName(event.target.value)} placeholder="请输入店铺名称" required /></label><div className="dialog-field"><span>绑定方式</span><div className="bind-mode-list"><button type="button" className={`bind-mode-card ${storeBindMode === 'scan' ? 'active' : ''}`} onClick={() => setStoreBindMode('scan')}><span className="bind-mode-card__icon"><QrCode aria-hidden="true" /></span><div><strong>扫码绑定</strong><small>使用平台 App 授权</small></div></button><button type="button" className={`bind-mode-card ${storeBindMode === 'password' ? 'active' : ''}`} onClick={() => setStoreBindMode('password')}><span className="bind-mode-card__icon"><KeyRound aria-hidden="true" /></span><div><strong>账号密码绑定</strong><small>使用后台账号授权</small></div></button></div></div>{storeBindMode === 'scan' ? <div className="bind-scan-area"><div className="bind-qr-placeholder"><QrCode aria-hidden="true" /></div><small>请使用 {selectedPlatform} App 扫码确认授权。</small></div> : <><label className="dialog-field"><span>平台账号</span><input value={storeAccount} onChange={(event) => setStoreAccount(event.target.value)} required /></label><label className="dialog-field"><span>平台密码</span><input type="password" value={storePassword} onChange={(event) => setStorePassword(event.target.value)} required /></label></>}<footer><button className="secondary-action" type="button" onClick={() => setBindingStore(false)}>取消</button><button className="primary-action" type="submit">确认绑定</button></footer></form></div> : null}
    {editingMember ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && (setEditingMember(null), setMemberDialogMode(null))}>
      <form className="ledger-dialog platform-user-dialog team-member-dialog" role="dialog" aria-modal="true" aria-labelledby="team-member-dialog-title" onSubmit={(event) => { event.preventDefault(); saveMember() }}>
        <header><div><span className="eyebrow">team_member</span><h3 id="team-member-dialog-title">{memberDialogMode === 'edit' ? '编辑成员' : operatorRole === 'group-leader' ? '创建小组成员' : '创建成员'}</h3></div><button type="button" className="dialog-close" aria-label="关闭弹窗" onClick={() => { setEditingMember(null); setMemberDialogMode(null) }}>×</button></header>
        <div className="platform-user-dialog__fields">
          <label className="dialog-field"><span>用户名</span><input value={editingMember.username ?? ''} onChange={(event) => setEditingMember({ ...editingMember, username: event.target.value })} placeholder="请输入用户名" autoFocus required /></label>
          <label className="dialog-field"><span>昵称</span><input value={editingMember.name} onChange={(event) => setEditingMember({ ...editingMember, name: event.target.value })} placeholder="请输入昵称" required /></label>
          <label className="dialog-field"><span>邮箱</span><input type="email" value={editingMember.email} onChange={(event) => setEditingMember({ ...editingMember, email: event.target.value })} placeholder="请输入邮箱" required /></label>
          <label className="dialog-field"><span>员工编号</span><input value={editingMember.employeeId ?? ''} onChange={(event) => setEditingMember({ ...editingMember, employeeId: event.target.value })} placeholder="选填" /></label>
          <label className="dialog-field"><span>联系电话</span><input type="tel" value={editingMember.phone} onChange={(event) => setEditingMember({ ...editingMember, phone: event.target.value })} placeholder="请输入联系电话" required /></label>
          {memberDialogMode !== 'edit' ? <label className="dialog-field"><span>初始密码</span><input type="password" autoComplete="new-password" value={editingMember.initialPassword ?? ''} onChange={(event) => setEditingMember({ ...editingMember, initialPassword: event.target.value })} placeholder="请输入初始密码" required /></label> : <label className="dialog-field"><span>公司 / 部门 / 岗位</span><input value={editingMember.orgInfo} onChange={(event) => setEditingMember({ ...editingMember, orgInfo: event.target.value })} placeholder="选填" /></label>}
          <label className="dialog-field platform-user-dialog__full"><span>业务角色</span><select value={editingMember.businessRole} onChange={(event) => setEditingMember({ ...editingMember, businessRole: event.target.value })} required><option value="" disabled>请选择业务角色</option>{businessRoles.map((role) => <option key={role} value={role}>{role}</option>)}</select><small>业务角色为必填项，实际功能范围仍受小组开通模块限制。</small></label>
          {operatorRole === 'group-leader' ? <div className="dialog-field platform-user-dialog__full"><span>所属小组</span><p className="team-member-dialog__fixed-value">{leaderGroup?.name ?? '当前小组'} · 组员（创建后不可在此处修改）</p></div> : <>
            <label className="dialog-field platform-user-dialog__full platform-user-dialog__choice"><span>分配商户管理员</span><div><button type="button" className={editingMember.merchantAdmin ? 'active' : ''} onClick={() => setEditingMember({ ...editingMember, merchantAdmin: true })}>是</button><button type="button" className={!editingMember.merchantAdmin ? 'active' : ''} onClick={() => setEditingMember({ ...editingMember, merchantAdmin: false })}>否</button></div></label>
            <label className="dialog-field platform-user-dialog__full platform-user-dialog__choice"><span>分配小组</span><div><button type="button" className={groupAssignmentRequested ? 'active' : ''} onClick={() => { setGroupAssignmentRequested(true); if (groups.length) setEditingMember({ ...editingMember, group: groups[0].name, groupRole: 'member' }) }}>是</button><button type="button" className={!groupAssignmentRequested ? 'active' : ''} onClick={() => { setGroupAssignmentRequested(false); setEditingMember({ ...editingMember, group: '', groupRole: 'none' }) }}>否</button></div></label>
            {groupAssignmentRequested && groups.length === 0 ? <p className="team-member-dialog__notice">当前商户团队中没有小组，请到小组管理中进行创建。</p> : groupAssignmentRequested && editingMember.group ? <><label className="dialog-field"><span>小组名称</span><select value={editingMember.group} onChange={(event) => setEditingMember({ ...editingMember, group: event.target.value })}>{groups.map((group) => <option key={group.id} value={group.name}>{group.name}</option>)}</select></label><label className="dialog-field"><span>小组角色</span><select value={editingMember.groupRole} onChange={(event) => setEditingMember({ ...editingMember, groupRole: event.target.value as TeamMemberRecord['groupRole'] })}><option value="leader">小组长</option><option value="member">组员</option></select></label></> : null}
          </>}
        </div>
        <footer><button className="secondary-action" type="button" onClick={() => { setEditingMember(null); setMemberDialogMode(null) }}>取消</button><button className="primary-action" type="submit">{memberDialogMode === 'edit' ? '保存' : '创建成员'}</button></footer>
      </form>
    </div> : null}
    {memberDialogMode === 'invite' ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setMemberDialogMode(null)}>
      <form className="ledger-dialog platform-user-dialog team-invite-dialog" role="dialog" aria-modal="true" aria-labelledby="team-invite-dialog-title" onSubmit={(event) => { event.preventDefault(); saveInvitation() }}>
        <header><div><span className="eyebrow">invite_existing_user</span><h3 id="team-invite-dialog-title">邀请已有用户</h3></div><button className="dialog-close" type="button" aria-label="关闭邀请弹窗" onClick={() => setMemberDialogMode(null)}>×</button></header>
        <div className="platform-user-dialog__fields">
          {inviteTargetGroupName ? <div className="team-member-dialog__notice platform-user-dialog__full">将邀请账号直接加入「{inviteTargetGroupName}」，并固定为组员。</div> : null}
          <label className="dialog-field platform-user-dialog__full"><span>用户邮箱</span><input type="email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="请输入完整邮箱地址" autoFocus required /><small>仅支持完整邮箱精确匹配，不提供模糊搜索。</small></label>
          {inviteEmail ? matchedInvitee ? <div className="team-invite-dialog__result platform-user-dialog__full"><strong>{matchedInvitee.name}</strong><span>{matchedInvitee.email}</span><small>{members.some((member) => member.email === matchedInvitee.email) ? '该账号已在当前团队，可继续为其补充小组归属。' : '已找到全局账号，可邀请加入当前团队。'}</small></div> : <p className="team-member-dialog__notice platform-user-dialog__full">未找到完全匹配的全局账号，请检查邮箱地址。</p> : null}
          <label className="dialog-field platform-user-dialog__full"><span>业务角色</span><select value={inviteBusinessRole} onChange={(event) => setInviteBusinessRole(event.target.value)} required disabled={!matchedInvitee}><option value="" disabled>请选择业务角色</option>{businessRoles.map((role) => <option key={role}>{role}</option>)}</select></label>
          {inviteTargetGroupName || operatorRole === 'group-leader' ? <div className="dialog-field platform-user-dialog__full"><span>加入范围</span><p className="team-member-dialog__fixed-value">{inviteTargetGroupName ?? leaderGroup?.name ?? '当前小组'} · 组员</p></div> : <label className="dialog-field platform-user-dialog__full platform-user-dialog__choice"><span>组织角色</span><div><button type="button" className={!inviteMerchantAdmin ? 'active' : ''} onClick={() => setInviteMerchantAdmin(false)}>普通成员</button><button type="button" className={inviteMerchantAdmin ? 'active' : ''} onClick={() => setInviteMerchantAdmin(true)}>商户管理员</button></div></label>}
        </div>
        <footer><button className="secondary-action" type="button" onClick={() => { setMemberDialogMode(null); setInviteTargetGroupName(null) }}>取消</button><button className="primary-action" type="submit" disabled={!matchedInvitee || !inviteBusinessRole}>确认邀请</button></footer>
      </form>
    </div> : null}
    {managingGroup ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setManagingGroup(null)}>
      <section className="ledger-dialog group-member-manager" role="dialog" aria-modal="true" aria-labelledby="group-member-manager-title">
        <header><div><span className="eyebrow">group_members</span><h3 id="group-member-manager-title">{managingGroup.name}成员管理</h3></div><button type="button" className="dialog-close" aria-label="关闭成员管理弹窗" onClick={() => setManagingGroup(null)}>×</button></header>
        <div className="group-member-manager__body">
          <section className="group-member-manager__join"><label className="dialog-field"><span>加入成员</span><select value={joiningMemberId} onChange={(event) => setJoiningMemberId(event.target.value)}><option value="">选择当前团队成员</option>{members.filter((member) => member.group !== managingGroup.name).map((member) => <option key={member.id} value={member.id}>{member.name} · {member.email}{member.group ? `（当前：${member.group}）` : ''}</option>)}</select></label><label className="dialog-field"><span>小组身份</span><select value={joiningGroupRole} onChange={(event) => setJoiningGroupRole(event.target.value as 'leader' | 'member')}><option value="member">组员</option><option value="leader">小组长</option></select></label><button type="button" className="primary-action" disabled={!joiningMemberId} onClick={addMemberToGroup}>加入</button></section>
          <section className="group-member-manager__summary"><div><strong>{members.filter((member) => member.group === managingGroup.name).length} 位成员</strong><small>小组余额 {managingGroup.balance} 豌豆</small></div><button type="button" className="secondary-action" onClick={() => { setInviteTargetGroupName(managingGroup.name); setInviteEmail(''); setInviteBusinessRole(''); setInviteMerchantAdmin(false); setManagingGroup(null); setMemberDialogMode('invite') }}><UserRoundPlus aria-hidden="true" />邀请新成员</button></section>
          <div className="group-member-manager__table-wrap"><table><thead><tr><th>成员</th><th>业务角色</th><th>身份</th><th>豌豆余额</th><th>操作</th></tr></thead><tbody>{members.filter((member) => member.group === managingGroup.name).map((member) => <tr key={member.id}><td><div className="team-member-cell"><span>{member.avatar}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div></td><td>{member.businessRole || '—'}</td><td><span className={`data-pill ${member.groupRole === 'leader' ? 'warning' : 'normal'}`}>{member.groupRole === 'leader' ? '小组长' : '组员'}</span></td><td>{member.peaBalance}</td><td><div className="row-actions">{member.groupRole === 'leader' ? <button type="button" className="table-action" onClick={() => setMemberGroupRole(managingGroup, member, 'member')}>设为组员</button> : <button type="button" className="table-action" onClick={() => setMemberGroupRole(managingGroup, member, 'leader')}>设为组长</button>}<button type="button" className="icon-btn-sm danger" title="移出小组" aria-label={`移出${member.name}`} onClick={() => removeMemberFromGroup(managingGroup, member)}><Trash2 aria-hidden="true" /></button></div></td></tr>)}{members.every((member) => member.group !== managingGroup.name) ? <tr><td colSpan={5} className="empty-table-cell">暂无成员</td></tr> : null}</tbody></table></div>
        </div>
        <footer><button type="button" className="secondary-action" onClick={() => setManagingGroup(null)}>完成</button></footer>
      </section>
    </div> : null}
    {permissionMember ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setPermissionMember(null)}><form className="ledger-dialog create-task-dialog" onSubmit={(event) => { event.preventDefault(); savePermission() }}><header><div><span className="eyebrow">member_permissions</span><h3>成员角色配置</h3></div><button type="button" className="dialog-close" onClick={() => setPermissionMember(null)}>×</button></header><label className="dialog-field"><span>组织角色</span><select value={permissionMember.organizationRole} onChange={(event) => setPermissionMember({ ...permissionMember, organizationRole: event.target.value as TeamMemberRecord['organizationRole'] })}><option>商户管理员</option><option>小组长</option><option>普通员工</option></select></label><label className="dialog-field"><span>所属小组</span><select value={permissionMember.group} onChange={(event) => setPermissionMember({ ...permissionMember, group: event.target.value })}><option value="">暂不分组</option>{groups.map((group) => <option key={group.id} value={group.name}>{group.name}</option>)}</select></label>{permissionMember.organizationRole === '小组长' ? <p className="review-original-note">当前组长：{groupLeader}</p> : null}<label className="dialog-field"><span>业务角色</span><select value={permissionMember.businessRole} onChange={(event) => setPermissionMember({ ...permissionMember, businessRole: event.target.value as TeamMemberRecord['businessRole'] })}>{businessRoles.map((role) => <option key={role}>{role}</option>)}</select></label><div className="dialog-field"><span>小组可见模块</span><p className="review-original-note">{groups.find((group) => group.name === permissionMember.group)?.modules.join('、') || '请先选择所属小组。'} 由小组配置统一决定，成员不能单独增配模块。</p></div><footer><button className="secondary-action" type="button" onClick={() => setPermissionMember(null)}>取消</button><button className="primary-action" type="submit">保存权限</button></footer></form></div> : null}
    {editingOrganizationPermission ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingOrganizationPermission(null)}><form className="ledger-dialog create-task-dialog permission-dialog" onSubmit={(event) => { event.preventDefault(); setOrganizationPermissions((rows) => rows.map((row) => row.role === editingOrganizationPermission.role ? editingOrganizationPermission : row)); setEditingOrganizationPermission(null) }}><header><div><span className="eyebrow">manager_operations</span><h3>配置{editingOrganizationPermission.role}管理操作</h3></div><button type="button" className="dialog-close" onClick={() => setEditingOrganizationPermission(null)}>×</button></header><div className="dialog-field"><span>小组管理操作</span><PermissionTree nodes={managerGroupOperationTree} selectedIds={new Set(editingOrganizationPermission.actions)} onSelectedIdsChange={(actions) => setEditingOrganizationPermission({ ...editingOrganizationPermission, actions: [...actions] })} defaultExpandedIds={['manager-group-members', 'manager-group-roles', 'manager-group-workspace']} /></div><footer><button className="secondary-action" type="button" onClick={() => setEditingOrganizationPermission(null)}>取消</button><button className="primary-action" type="submit">保存权限</button></footer></form></div> : null}
    {editingGroup ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingGroup(null)}><form className="ledger-dialog create-task-dialog" onSubmit={(event) => { event.preventDefault(); saveGroup() }}><header><div><span className="eyebrow">team_group</span><h3>{editingGroup.id ? '编辑小组' : '创建小组'}</h3></div><button type="button" className="dialog-close" onClick={() => setEditingGroup(null)}>×</button></header><label className="dialog-field"><span>小组名称</span><input value={editingGroup.name} onChange={(event) => setEditingGroup({ ...editingGroup, name: event.target.value })} required /></label><label className="dialog-field"><span>指定组长</span><select value={editingGroup.leader} onChange={(event) => setEditingGroup({ ...editingGroup, leader: event.target.value })}><option value="">暂不指定</option>{members.map((member) => <option key={member.id}>{member.name}</option>)}</select></label><div className="dialog-field"><span>小组可见模块</span><small className="dialog-field-hint">成员加入小组后，生产端模块范围由这里统一决定。</small><div className="binding-checkbox-list">{teamModuleOptions.map((module) => <label className="binding-checkbox-item" key={module}><input type="checkbox" checked={editingGroup.modules.includes(module)} onChange={() => setEditingGroup({ ...editingGroup, modules: editingGroup.modules.includes(module) ? editingGroup.modules.filter((item) => item !== module) : [...editingGroup.modules, module] })} />{module}</label>)}</div></div><div className="dialog-field"><span>关联店铺</span><div className="binding-checkbox-list">{availableStores.map((store) => <label className="binding-checkbox-item" key={store}><input type="checkbox" checked={editingGroup.stores.includes(store)} onChange={() => setEditingGroup({ ...editingGroup, stores: editingGroup.stores.includes(store) ? editingGroup.stores.filter((item) => item !== store) : [...editingGroup.stores, store] })} />{store}</label>)}</div></div><footer><button className="secondary-action" type="button" onClick={() => setEditingGroup(null)}>取消</button><button className="primary-action" type="submit">保存</button></footer></form></div> : null}
    {adjusting ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setAdjusting(null)}><form className="ledger-dialog create-task-dialog" onSubmit={(event) => { event.preventDefault(); if (adjusting.type === 'member') setMembers((rows) => rows.map((row) => row.id === adjusting.id ? { ...row, peaBalance: Math.max(0, row.peaBalance + (adjusting.direction === 'add' ? adjusting.amount : -adjusting.amount)) } : row)); else setGroups((rows) => rows.map((row) => row.id === adjusting.id ? { ...row, balance: Math.max(0, row.balance + (adjusting.direction === 'add' ? adjusting.amount : -adjusting.amount)) } : row)); setAdjusting(null) }}><header><div><span className="eyebrow">pea_allocation</span><h3>豌豆分配 / 回收</h3></div><button type="button" className="dialog-close" onClick={() => setAdjusting(null)}>×</button></header><label className="dialog-field"><span>操作类型</span><select value={adjusting.direction} onChange={(event) => setAdjusting({ ...adjusting, direction: event.target.value as 'add' | 'subtract' })}><option value="add">分配</option><option value="subtract">回收</option></select></label><label className="dialog-field"><span>豌豆数量</span><input type="number" min="1" value={adjusting.amount || ''} onChange={(event) => setAdjusting({ ...adjusting, amount: Number(event.target.value) })} required /></label><footer><button className="secondary-action" type="button" onClick={() => setAdjusting(null)}>取消</button><button className="primary-action" type="submit">确认</button></footer></form></div> : null}
    {editingBusinessRole !== null ? <BusinessPermissionDialog
      role={editingBusinessRole}
      businessRoles={businessRoles}
      groups={groups}
      selectedGroupIds={businessRoleGroupIds[editingBusinessRole] ?? []}
      onClose={() => setEditingBusinessRole(null)}
      onSave={(name, groupIds) => {
        const normalizedName = name.trim()
        if (normalizedName) {
          setBusinessRoles((roles) => roles.includes(editingBusinessRole)
            ? roles.map((item) => item === editingBusinessRole ? normalizedName : item)
            : roles.includes(normalizedName) ? roles : [...roles, normalizedName])
          setBusinessRoleGroupIds((current) => {
            const next = { ...current, [normalizedName]: groupIds }
            if (normalizedName !== editingBusinessRole) delete next[editingBusinessRole]
            return next
          })
        }
        setEditingBusinessRole(null)
      }}
    /> : null}
  </>
}

// ===================== 组件 =====================

export default function AdminPage({ activeTab = 'tasks', onNavigate: _onNavigate = () => {}, context = 'system', initialTeamId }: { activeTab?: AdminTab; onNavigate?: (tab: AdminTab) => void; context?: 'system' | 'merchant'; initialTeamId?: string } = {}) {
  const adminTab = activeTab
  const isMerchantContext = context === 'merchant'
  const [adminTaskTab, setAdminTaskTab] = useState<AdminTaskTab>('pea')
  const [peaTab, setPeaTab] = useState<PeaTab>('all')
  const [peaTaskStatus, setPeaTaskStatus] = useState<'全部' | TaskResult>('全部')
  const [peaTeam, setPeaTeam] = useState('全部')
  const [peaFeatureType, setPeaFeatureType] = useState('全部')
  const [peaStartDate, setPeaStartDate] = useState('')
  const [peaEndDate, setPeaEndDate] = useState('')
  const [logRecord, setLogRecord] = useState<PeaRecord | null>(null)
  const [supportedPlatforms, setSupportedPlatforms] = useState<SupportedPlatform[]>([
    { id: 'platform-ks', name: '快手', status: '已启用', updatedAt: '2026-07-20' },
    { id: 'platform-vip', name: '唯品会', status: '已启用', updatedAt: '2026-07-20' },
    { id: 'platform-doudian', name: '抖店', status: '已启用', updatedAt: '2026-07-18' },
    { id: 'platform-aikucun', name: '爱库存', status: '已启用', updatedAt: '2026-07-18' },
    { id: 'platform-haoyiku', name: '好衣库', status: '已停用', updatedAt: '2026-07-12' },
  ])
  const [editingSupportedPlatform, setEditingSupportedPlatform] = useState<SupportedPlatform | null>(null)

  // 团队管理状态
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(initialTeamId ?? null)
  const [teamAccounts, setTeamAccounts] = useState<Record<string, TeamPlatformAccount[]>>(initialTeamAccounts)
  const [teamBindOpen, setTeamBindOpen] = useState(false)
  const [teamBindPlatform, setTeamBindPlatform] = useState(bindablePlatforms[0])
  const [teamBindMode, setTeamBindMode] = useState<'scan' | 'password'>('scan')
  const [teamBindStep, setTeamBindStep] = useState<'select' | 'scanning' | 'success'>('select')
  const [teamBindAccount, setTeamBindAccount] = useState('')
  const [teamBindPassword, setTeamBindPassword] = useState('')
  const [teamStoreDialogAccount, setTeamStoreDialogAccount] = useState<TeamPlatformAccount | null>(null)
  const [teamNewStore, setTeamNewStore] = useState('')
  const [teamEditAccount, setTeamEditAccount] = useState<TeamPlatformAccount | null>(null)
  const [teamEditNewStore, setTeamEditNewStore] = useState('')

  const selectedTeam = teams.find((t) => t.id === selectedTeamId) ?? null
  const currentTeamAccounts = selectedTeamId ? (teamAccounts[selectedTeamId] ?? []) : []

  const totalPeaCost = peaRecords.reduce((sum, r) => sum + r.peaCost, 0)
  const peaTeams = Array.from(new Set(peaRecords.map((record) => record.team)))
  const peaFeatureTypes = Array.from(new Set(peaRecords.map((record) => record.featureType)))
  const filteredPea = peaRecords
    .filter((record) => peaTab === 'all' || record.taskType === peaTab)
    .filter((record) => peaTaskStatus === '全部' || record.taskResult === peaTaskStatus)
    .filter((record) => peaTeam === '全部' || record.team === peaTeam)
    .filter((record) => peaFeatureType === '全部' || record.featureType === peaFeatureType)
    .filter((record) => !peaStartDate || record.taskDate.slice(0, 10) >= peaStartDate)
    .filter((record) => !peaEndDate || record.taskDate.slice(0, 10) <= peaEndDate)

  if (adminTab === 'team' && selectedTeam) {
    return <TeamDetailPage team={selectedTeam} onBack={() => setSelectedTeamId(null)} supportedPlatforms={supportedPlatforms.map((platform) => platform.name)} />
  }

  return (
    <>
      <section className="data-scope-note">
        <div>
          <span className="eyebrow">{isMerchantContext ? 'merchant_task_management' : 'system_admin'}</span>
          <div className="admin-page-title">
            <h2>{isMerchantContext ? '商户管理员' : '系统管理员'}</h2>
            <span>{isMerchantContext ? '查看商户范围内的任务消耗记录。' : 'AI、Skill、Agent 管理后续迭代时设计具体页面内容及样式，目前仅做占位；团队管理为原后台“团队管理”一级菜单里新增内容。'}</span>
          </div>
        </div>
        <p>{isMerchantContext ? '管理商户任务的豌豆值消耗与执行记录。' : '管理系统 AI 配置、组件绑定、豌豆消耗记录与团队管理。'}</p>
      </section>

      {adminTab === 'tasks' ? (
        <div className="admin-sub-tabs" aria-label="任务管理分类">
          <button type="button" className={adminTaskTab === 'pea' ? 'active' : ''} onClick={() => setAdminTaskTab('pea')}>豌豆值消耗记录</button>
        </div>
      ) : null}

      {adminTab === 'platforms' ? <article className="data-table-card"><header><div><span className="eyebrow">supported_platforms</span><h3>平台维护</h3></div><button type="button" className="primary-action" onClick={() => setEditingSupportedPlatform({ id: '', name: '', status: '已启用', updatedAt: '' })}><Plus aria-hidden="true" />新增支持平台</button></header><div className="table-scroll"><table><thead><tr><th>平台名称</th><th>状态</th><th>最近更新</th><th>操作</th></tr></thead><tbody>{supportedPlatforms.map((platform) => <tr key={platform.id}><td><strong>{platform.name}</strong></td><td><span className={`data-pill ${platform.status === '已启用' ? 'good' : 'warning'}`}>{platform.status}</span></td><td>{platform.updatedAt}</td><td><div className="row-actions"><button type="button" className="table-action" onClick={() => setEditingSupportedPlatform(platform)}>编辑</button><button type="button" className="table-action" onClick={() => setSupportedPlatforms((rows) => rows.map((row) => row.id === platform.id ? { ...row, status: row.status === '已启用' ? '已停用' : '已启用', updatedAt: new Date().toISOString().slice(0, 10) } : row))}>{platform.status === '已启用' ? '停用' : '启用'}</button><button type="button" className="table-action danger-action" onClick={() => setSupportedPlatforms((rows) => rows.filter((row) => row.id !== platform.id))}>删除</button></div></td></tr>)}</tbody></table></div></article> : null}

      {adminTab === 'tasks' && adminTaskTab === 'pea' ? (
        <article className="data-table-card">
          <header>
            <div>
              <span className="eyebrow">pea_consumption</span>
              <h3>豌豆值消耗记录</h3>
            </div>
            <div className="pea-summary">
              <span className="pea-summary-item"><Sparkles aria-hidden="true" />总消耗 <strong>{totalPeaCost}</strong></span>
              <span className="pea-summary-item">日报 <strong>{peaRecords.filter((r) => r.taskType === 'daily').reduce((s, r) => s + r.peaCost, 0)}</strong></span>
              <span className="pea-summary-item">其他 <strong>{peaRecords.filter((r) => r.taskType === 'other').reduce((s, r) => s + r.peaCost, 0)}</strong></span>
            </div>
          </header>
          <div className="admin-sub-tabs">
            {peaTabs.map((tab) => (
              <button key={tab.key} type="button" className={peaTab === tab.key ? 'active' : ''} onClick={() => setPeaTab(tab.key)}>
                {tab.label}
                <span className="tab-count">{peaTab === tab.key ? filteredPea.length : peaRecords.filter((r) => tab.key === 'all' || r.taskType === tab.key).length}</span>
              </button>
            ))}
          </div>
          <div className="ledger-filters pea-record-filters" aria-label="豌豆值消耗记录筛选">
            <label className="store-filter">
              <span>任务状态</span>
              <select value={peaTaskStatus} onChange={(event) => setPeaTaskStatus(event.target.value as '全部' | TaskResult)}>
                <option value="全部">全部状态</option>
                <option value="完成">完成</option>
                <option value="失败">失败</option>
              </select>
            </label>
            <label className="store-filter">
              <span>团队</span>
              <select value={peaTeam} onChange={(event) => setPeaTeam(event.target.value)}>
                <option value="全部">全部团队</option>
                {peaTeams.map((team) => <option key={team} value={team}>{team}</option>)}
              </select>
            </label>
            <label className="store-filter">
              <span>功能类型</span>
              <select value={peaFeatureType} onChange={(event) => setPeaFeatureType(event.target.value)}>
                <option value="全部">全部类型</option>
                {peaFeatureTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
            <label className="store-filter date-range-filter">
              <span>任务日期</span>
              <input type="date" value={peaStartDate} onChange={(event) => setPeaStartDate(event.target.value)} />
              <b>至</b>
              <input type="date" value={peaEndDate} onChange={(event) => setPeaEndDate(event.target.value)} />
            </label>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>任务 ID</th>
                  <th>功能类型</th>
                  <th>任务来源</th>
                  <th>平台</th>
                  <th>店铺</th>
                  <th>任务日期</th>
                  <th>业务日期</th>
                  <th>豌豆消耗</th>
                  <th>所属团队</th>
                  <th>归属人员</th>
                  <th>审核人</th>
                  <th>结果预览</th>
                  <th>任务结果</th>
                  <th>日报状态</th>
                  <th>任务日志</th>
                </tr>
              </thead>
              <tbody>
                {filteredPea.map((row) => (
                  <tr key={row.id}>
                    <td><span className="batch-id">{row.taskId}</span></td>
                    <td><span className="data-pill normal">{row.featureType}</span></td>
                    <td><span className={`data-pill ${row.source === '人工上传文件' ? 'warning' : 'normal'}`}>{row.source}</span></td>
                    <td>{row.platform}</td>
                    <td>{row.store}</td>
                    <td>{row.taskDate}</td>
                    <td>{row.businessDate}</td>
                    <td><span className="data-pill pea-cost">{row.peaCost}</span></td>
                    <td>{row.team}</td>
                    <td>{row.owner}</td>
                    <td>{row.reviewer || '—'}</td>
                    <td>{row.resultPreview}</td>
                    <td><span className={`data-pill ${row.taskResult === '完成' ? 'normal' : 'danger'}`}>{row.taskResult}</span></td>
                    <td><span className={`data-pill ${row.reportStatus === '已发布' ? 'normal' : 'warning'}`}>{row.reportStatus}</span></td>
                    <td><button className="log-link" type="button" onClick={() => setLogRecord(row)}><ScrollText aria-hidden="true" />查看日志</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ) : null}

      {adminTab === 'team' ? (
        selectedTeam ? (
          <article className="data-table-card">
            <header>
              <div>
                <span className="eyebrow">team_platform_binding</span>
                <h3>{selectedTeam.name} · 平台账号绑定</h3>
              </div>
              <div className="table-header-actions">
                <button className="secondary-action" type="button" onClick={() => setSelectedTeamId(null)}>
                  <ArrowLeft aria-hidden="true" />
                  返回团队列表
                </button>
                <button className="primary-action" type="button" onClick={() => { setTeamBindOpen(true); setTeamBindStep('select'); setTeamBindMode('scan'); setTeamBindPlatform(bindablePlatforms[0]); setTeamBindAccount(''); setTeamBindPassword('') }}>
                  <Plus aria-hidden="true" />
                  绑定平台账号
                </button>
              </div>
            </header>
            <div className="dialog-meta" style={{ marginBottom: 16 }}>
              <span>团队成员：{selectedTeam.memberCount} 人</span>
              <span>创建时间：{selectedTeam.createdAt}</span>
              <span>{selectedTeam.desc}</span>
            </div>
            <div className="platform-account-list">
              {currentTeamAccounts.map((account) => (
                <article key={account.id} className={`platform-account-card ${account.status === 'expired' ? 'expired' : ''}`}>
                  <header className="platform-account-card__head">
                    <div className="platform-account-card__title">
                      <span className="platform-account-card__icon">
                        <Store aria-hidden="true" />
                      </span>
                      <div>
                        <strong>{account.accountName}</strong>
                        <small>{account.platform}</small>
                      </div>
                    </div>
                    <div className="platform-account-card__meta">
                      <span className={`data-pill ${account.status === 'connected' ? 'good' : 'warning'}`}>
                        {account.status === 'connected' ? <CheckCircle2 aria-hidden="true" /> : <Unlink aria-hidden="true" />}
                        {account.status === 'connected' ? '已连接' : '已过期'}
                      </span>
                      <span className="platform-account-card__time">绑定时间：{account.boundAt}</span>
                      <button type="button" className="icon-btn-sm" title="编辑" onClick={() => setTeamEditAccount(account)}><Pencil aria-hidden="true" /></button>
                      <button type="button" className="icon-btn-sm danger" title="解绑" onClick={() => setTeamAccounts((map) => ({ ...map, [selectedTeam.id]: (map[selectedTeam.id] ?? []).filter((a) => a.id !== account.id) }))}><Unlink aria-hidden="true" /></button>
                    </div>
                  </header>
                  <div className="platform-account-card__stores">
                    <div className="platform-account-card__stores-head">
                      <small className="binding-card__label">关联店铺（{account.stores.length}）</small>
                      {account.status === 'connected' ? (
                        <button type="button" className="binding-add-input" onClick={() => setTeamStoreDialogAccount(account)}>
                          <Plus aria-hidden="true" />添加店铺
                        </button>
                      ) : null}
                    </div>
                    <div className="platform-store-tags">
                      {account.stores.map((store) => (
                        <span key={store} className="platform-store-tag">
                          <Store aria-hidden="true" />
                          {store}
                          {account.status === 'connected' ? (
                            <button type="button" className="platform-store-tag__remove" onClick={() => setTeamAccounts((map) => ({ ...map, [selectedTeam.id]: (map[selectedTeam.id] ?? []).map((a) => a.id === account.id ? { ...a, stores: a.stores.filter((s) => s !== store) } : a) }))} aria-label="移除店铺">
                              <X aria-hidden="true" />
                            </button>
                          ) : null}
                        </span>
                      ))}
                      {account.stores.length === 0 ? <span className="platform-store-empty">暂无关联店铺</span> : null}
                    </div>
                  </div>
                </article>
              ))}
              {currentTeamAccounts.length === 0 ? (
                <div className="merchant-settings-placeholder">
                  <QrCode aria-hidden="true" />
                  <p>该团队暂未绑定任何平台账号</p>
                  <small>点击「绑定平台账号」开始接入平台</small>
                </div>
              ) : null}
            </div>
          </article>
        ) : (
          <article className="data-table-card">
            <header>
              <div>
                <span className="eyebrow">team_list</span>
                <h3>团队列表</h3>
              </div>
            </header>
            <div className="team-list">
              {teams.map((team) => {
                const accounts = teamAccounts[team.id] ?? []
                const storeCount = accounts.reduce((sum, a) => sum + a.stores.length, 0)
                return (
                  <article key={team.id} className="team-card" onClick={() => setSelectedTeamId(team.id)}>
                    <header className="team-card__head">
                      <div className="team-card__title">
                        <span className="team-card__icon"><Users aria-hidden="true" /></span>
                        <div>
                          <strong>{team.name}</strong>
                          <small>{team.desc}</small>
                        </div>
                      </div>
                      <span className="data-pill normal">点击管理</span>
                    </header>
                    <div className="team-card__stats">
                      <span><Users aria-hidden="true" /> 成员 {team.memberCount}</span>
                      <span><Link2 aria-hidden="true" /> 平台账号 {accounts.length}</span>
                      <span><Store aria-hidden="true" /> 店铺 {storeCount}</span>
                      <span>创建于 {team.createdAt}</span>
                    </div>
                  </article>
                )
              })}
            </div>
          </article>
        )
      ) : null}

      {editingSupportedPlatform ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingSupportedPlatform(null)}><form className="ledger-dialog create-task-dialog" onSubmit={(event) => { event.preventDefault(); const name = editingSupportedPlatform.name.trim(); if (!name) return; const platform = { ...editingSupportedPlatform, name, updatedAt: new Date().toISOString().slice(0, 10) }; setSupportedPlatforms((rows) => platform.id ? rows.map((row) => row.id === platform.id ? platform : row) : [...rows, { ...platform, id: `supported-platform-${Date.now()}` }]); setEditingSupportedPlatform(null) }}><header><div><span className="eyebrow">supported_platform</span><h3>{editingSupportedPlatform.id ? '编辑支持平台' : '新增支持平台'}</h3></div><button type="button" className="dialog-close" onClick={() => setEditingSupportedPlatform(null)}>×</button></header><label className="dialog-field"><span>平台名称</span><input value={editingSupportedPlatform.name} onChange={(event) => setEditingSupportedPlatform({ ...editingSupportedPlatform, name: event.target.value })} placeholder="如 淘宝、抖店、快手" required /></label><label className="dialog-field"><span>状态</span><select value={editingSupportedPlatform.status} onChange={(event) => setEditingSupportedPlatform({ ...editingSupportedPlatform, status: event.target.value as SupportedPlatform['status'] })}><option>已启用</option><option>已停用</option></select></label><footer><button className="secondary-action" type="button" onClick={() => setEditingSupportedPlatform(null)}>取消</button><button className="primary-action" type="submit">保存</button></footer></form></div> : null}

      {/* 团队绑定平台账号弹窗 */}
      {teamBindOpen && selectedTeam ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setTeamBindOpen(false)}>
          <section className="ledger-dialog create-task-dialog bind-dialog">
            <header>
              <div>
                <span className="eyebrow">team_bind_platform</span>
                <h3>绑定平台账号 — {selectedTeam.name}</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setTeamBindOpen(false)}>×</button>
            </header>

            {teamBindStep === 'select' ? (
              <>
                <label className="dialog-field">
                  <span>选择平台</span>
                  <select value={teamBindPlatform} onChange={(e) => setTeamBindPlatform(e.target.value)}>
                    {bindablePlatforms.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>

                <div className="dialog-field">
                  <span>绑定方式</span>
                  <div className="bind-mode-list">
                    <button type="button" className={`bind-mode-card ${teamBindMode === 'scan' ? 'active' : ''}`} onClick={() => setTeamBindMode('scan')}>
                      <span className="bind-mode-card__icon"><QrCode aria-hidden="true" /></span>
                      <div><strong>扫码绑定</strong><small>使用平台 App 扫码授权</small></div>
                    </button>
                    <button type="button" className={`bind-mode-card ${teamBindMode === 'password' ? 'active' : ''}`} onClick={() => setTeamBindMode('password')}>
                      <span className="bind-mode-card__icon"><KeyRound aria-hidden="true" /></span>
                      <div><strong>帐密绑定</strong><small>输入平台账号密码</small></div>
                    </button>
                  </div>
                </div>

                {teamBindMode === 'scan' ? (
                  <button className="primary-action bind-dialog__scan-btn" type="button" onClick={() => setTeamBindStep('scanning')}>
                    <QrCode aria-hidden="true" />
                    生成扫码二维码
                  </button>
                ) : (
                  <div className="bind-password-form">
                    <label className="dialog-field">
                      <span>账号</span>
                      <input value={teamBindAccount} onChange={(e) => setTeamBindAccount(e.target.value)} placeholder="请输入平台账号" />
                    </label>
                    <label className="dialog-field">
                      <span>密码</span>
                      <input type="password" value={teamBindPassword} onChange={(e) => setTeamBindPassword(e.target.value)} placeholder="请输入密码" />
                    </label>
                    <button className="primary-action bind-dialog__scan-btn" type="button" disabled={!teamBindAccount || !teamBindPassword} onClick={() => setTeamBindStep('success')}>
                      <CheckCircle2 aria-hidden="true" />
                      授权绑定
                    </button>
                  </div>
                )}
              </>
            ) : null}

            {teamBindStep === 'scanning' ? (
              <div className="bind-scan-area">
                <div className="bind-qr-placeholder">
                  <QrCode aria-hidden="true" />
                  <div className="bind-qr-scan-line" />
                </div>
                <p>请使用 <strong>{teamBindPlatform}</strong> App 扫描上方二维码完成授权</p>
                <small>等待扫码确认中...</small>
                <button className="primary-action" type="button" onClick={() => setTeamBindStep('success')}>模拟扫码成功</button>
              </div>
            ) : null}

            {teamBindStep === 'success' ? (
              <div className="bind-success-area">
                <CheckCircle2 aria-hidden="true" />
                <p>绑定成功！</p>
                <small>{teamBindPlatform} 平台账号已成功绑定</small>
                <button className="primary-action" type="button" onClick={() => {
                  const newAccount: TeamPlatformAccount = {
                    id: `ta-${Date.now()}`,
                    platform: teamBindPlatform,
                    accountName: teamBindMode === 'password' && teamBindAccount ? teamBindAccount : `${teamBindPlatform}企业账号`,
                    boundAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
                    stores: [],
                    status: 'connected',
                  }
                  setTeamAccounts((map) => ({ ...map, [selectedTeam.id]: [...(map[selectedTeam.id] ?? []), newAccount] }))
                  setTeamBindOpen(false)
                  setTeamBindStep('select')
                  setTeamBindAccount('')
                  setTeamBindPassword('')
                }}>完成</button>
              </div>
            ) : null}
          </section>
        </div>
      ) : null}

      {/* 团队添加店铺弹窗 */}
      {teamStoreDialogAccount && selectedTeam ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setTeamStoreDialogAccount(null)}>
          <form className="ledger-dialog create-task-dialog" onSubmit={(e) => { e.preventDefault(); if (!teamStoreDialogAccount || !teamNewStore.trim()) return; setTeamAccounts((map) => ({ ...map, [selectedTeam.id]: (map[selectedTeam.id] ?? []).map((a) => a.id === teamStoreDialogAccount.id ? { ...a, stores: [...a.stores, teamNewStore.trim()] } : a) })); setTeamStoreDialogAccount(null); setTeamNewStore('') }}>
            <header>
              <div>
                <span className="eyebrow">team_add_store</span>
                <h3>添加店铺</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setTeamStoreDialogAccount(null)}>×</button>
            </header>
            <div className="dialog-meta">
              <span>平台：{teamStoreDialogAccount.platform}</span>
              <span>账号：{teamStoreDialogAccount.accountName}</span>
            </div>
            <label className="dialog-field">
              <span>店铺名称</span>
              <input value={teamNewStore} onChange={(e) => setTeamNewStore(e.target.value)} placeholder="请输入店铺全名" required />
            </label>
            {teamStoreDialogAccount.stores.length > 0 ? (
              <div className="dialog-field">
                <span>已有关联店铺</span>
                <div className="platform-store-tags">
                  {teamStoreDialogAccount.stores.map((s) => (
                    <span key={s} className="platform-store-tag"><Store aria-hidden="true" />{s}</span>
                  ))}
                </div>
              </div>
            ) : null}
            <footer>
              <button className="secondary-action" type="button" onClick={() => setTeamStoreDialogAccount(null)}>取消</button>
              <button className="primary-action" type="submit"><Plus aria-hidden="true" />添加</button>
            </footer>
          </form>
        </div>
      ) : null}

      {/* 团队编辑平台账号弹窗 */}
      {teamEditAccount && selectedTeam ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setTeamEditAccount(null)}>
          <form className="ledger-dialog create-task-dialog" onSubmit={(e) => { e.preventDefault(); if (!teamEditAccount) return; setTeamAccounts((map) => ({ ...map, [selectedTeam.id]: (map[selectedTeam.id] ?? []).map((a) => a.id === teamEditAccount.id ? { ...a, platform: teamEditAccount.platform, accountName: teamEditAccount.accountName, stores: teamEditAccount.stores, status: teamEditAccount.status } : a) })); setTeamEditAccount(null); setTeamEditNewStore('') }}>
            <header>
              <div>
                <span className="eyebrow">team_edit_account</span>
                <h3>编辑平台账号</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => { setTeamEditAccount(null); setTeamEditNewStore('') }}>×</button>
            </header>

            <label className="dialog-field">
              <span>平台</span>
              <select value={teamEditAccount.platform} onChange={(e) => setTeamEditAccount({ ...teamEditAccount, platform: e.target.value })}>
                {bindablePlatforms.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>

            <label className="dialog-field">
              <span>账号名称</span>
              <input value={teamEditAccount.accountName} onChange={(e) => setTeamEditAccount({ ...teamEditAccount, accountName: e.target.value })} placeholder="请输入账号名称" required />
            </label>

            <label className="dialog-field">
              <span>状态</span>
              <select value={teamEditAccount.status} onChange={(e) => setTeamEditAccount({ ...teamEditAccount, status: e.target.value as 'connected' | 'expired' })}>
                <option value="connected">已连接</option>
                <option value="expired">已过期</option>
              </select>
            </label>

            <div className="dialog-field">
              <span>关联店铺（{teamEditAccount.stores.length}）</span>
              <div className="platform-store-tags">
                {teamEditAccount.stores.map((store) => (
                  <span key={store} className="platform-store-tag">
                    <Store aria-hidden="true" />
                    {store}
                    <button type="button" className="platform-store-tag__remove" onClick={() => setTeamEditAccount({ ...teamEditAccount, stores: teamEditAccount.stores.filter((s) => s !== store) })} aria-label="移除店铺">
                      <X aria-hidden="true" />
                    </button>
                  </span>
                ))}
                {teamEditAccount.stores.length === 0 ? <span className="platform-store-empty">暂无关联店铺</span> : null}
              </div>
            </div>

            <label className="dialog-field">
              <span>添加新店铺</span>
              <div className="binding-add-input-row">
                <input value={teamEditNewStore} onChange={(e) => setTeamEditNewStore(e.target.value)} placeholder="请输入店铺名称" />
                <button type="button" className="binding-add-input" onClick={() => { if (!teamEditAccount || !teamEditNewStore.trim()) return; setTeamEditAccount({ ...teamEditAccount, stores: [...teamEditAccount.stores, teamEditNewStore.trim()] }); setTeamEditNewStore('') }} disabled={!teamEditNewStore.trim()}>
                  <Plus aria-hidden="true" />添加
                </button>
              </div>
            </label>

            <footer>
              <button className="secondary-action" type="button" onClick={() => { setTeamEditAccount(null); setTeamEditNewStore('') }}>取消</button>
              <button className="primary-action" type="submit"><CheckCircle2 aria-hidden="true" />保存</button>
            </footer>
          </form>
        </div>
      ) : null}
      {/* 已移除的 AI 管理弹窗 */}
      {/* {editingApi ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setEditingApi(null)}>
          <form className="ledger-dialog create-task-dialog" onSubmit={(e) => { e.preventDefault(); setEditingApi(null) }}>
            <header>
              <div>
                <span className="eyebrow">{editingApi.id ? 'edit_api' : 'new_api'}</span>
                <h3>{editingApi.id ? '编辑 API 配置' : '新增 API 配置'}</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setEditingApi(null)}>×</button>
            </header>
            <label className="dialog-field">
              <span>服务商</span>
              <input value={editingApi.provider} onChange={(e) => setEditingApi({ ...editingApi, provider: e.target.value })} placeholder="如 OpenAI / Anthropic / DeepSeek" required />
            </label>
            <label className="dialog-field">
              <span>Base URL</span>
              <input value={editingApi.baseUrl} onChange={(e) => setEditingApi({ ...editingApi, baseUrl: e.target.value })} placeholder="https://api.openai.com/v1" required />
            </label>
            <label className="dialog-field">
              <span>模型名称</span>
              <input value={editingApi.modelName} onChange={(e) => setEditingApi({ ...editingApi, modelName: e.target.value })} placeholder="如 gpt-4o" required />
            </label>
            <label className="dialog-field">
              <span>API Key</span>
              <input type="password" value={editingApi.apiKey} onChange={(e) => setEditingApi({ ...editingApi, apiKey: e.target.value })} placeholder="sk-..." required />
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <label className="dialog-field" style={{ flex: 1 }}>
                <span>Max Tokens</span>
                <input type="number" value={editingApi.maxTokens} onChange={(e) => setEditingApi({ ...editingApi, maxTokens: Number(e.target.value) })} required />
              </label>
              <label className="dialog-field" style={{ flex: 1 }}>
                <span>Temperature</span>
                <input type="number" step="0.1" min="0" max="2" value={editingApi.temperature} onChange={(e) => setEditingApi({ ...editingApi, temperature: Number(e.target.value) })} required />
              </label>
            </div>
            <label className="dialog-field">
              <span>状态</span>
              <select value={editingApi.status} onChange={(e) => setEditingApi({ ...editingApi, status: e.target.value as 'enabled' | 'disabled' })}>
                <option value="enabled">已启用</option>
                <option value="disabled">已停用</option>
              </select>
            </label>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setEditingApi(null)}>取消</button>
              <button className="primary-action" type="submit"><CheckCircle2 aria-hidden="true" />保存</button>
            </footer>
          </form>
        </div>
      ) : null}

      组件绑定编辑弹窗
      {editingBinding ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setEditingBinding(null)}>
          <form className="ledger-dialog create-task-dialog" onSubmit={(e) => { e.preventDefault(); setEditingBinding(null) }}>
            <header>
              <div>
                <span className="eyebrow">{editingBinding.id ? 'edit_binding' : 'new_binding'}</span>
                <h3>{editingBinding.id ? '编辑组件绑定' : '新增组件绑定'}</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setEditingBinding(null)}>×</button>
            </header>
            <label className="dialog-field">
              <span>功能名称</span>
              <input value={editingBinding.name} onChange={(e) => setEditingBinding({ ...editingBinding, name: e.target.value })} placeholder="如 新建任务" required />
            </label>
            <label className="dialog-field">
              <span>选择工作流</span>
              <select value={editingBinding.workflow} onChange={(e) => setEditingBinding({ ...editingBinding, workflow: e.target.value })} required>
                <option value="" disabled>请选择工作流</option>
                <option value="多平台日报生成">多平台日报生成</option>
                <option value="平台费用差异排查">平台费用差异排查</option>
                <option value="利润归因分析">利润归因分析</option>
                <option value="推广费 ROI 拆解">推广费 ROI 拆解</option>
                <option value="库存动销预警">库存动销预警</option>
                <option value="自由问答">自由问答</option>
              </select>
            </label>
            <div className="dialog-field">
              <span>输入参数</span>
              <small className="dialog-field-hint">注入到工作流中的 input</small>
              <div className="binding-checkbox-list">
                {inputOptions.map((option) => (
                  <label key={option} className="binding-checkbox-item">
                    <input
                      type="checkbox"
                      checked={editingBinding.inputs.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditingBinding({ ...editingBinding, inputs: [...editingBinding.inputs, option] })
                        } else {
                          setEditingBinding({ ...editingBinding, inputs: editingBinding.inputs.filter((i) => i !== option) })
                        }
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="dialog-field">
              <span>状态</span>
              <select value={editingBinding.status} onChange={(e) => setEditingBinding({ ...editingBinding, status: e.target.value as 'active' | 'inactive' })}>
                <option value="active">已激活</option>
                <option value="inactive">未激活</option>
              </select>
            </label>
            <footer>
              <button className="secondary-action" type="button" onClick={() => setEditingBinding(null)}>取消</button>
              <button className="primary-action" type="submit"><CheckCircle2 aria-hidden="true" />保存</button>
            </footer>
          </form>
        </div>
      ) : null}

      ) : null} */}
      {/* 任务日志弹窗 */}
      {logRecord ? (
        <div className="dialog-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setLogRecord(null)}>
          <section className="ledger-dialog">
            <header>
              <div>
                <span className="eyebrow">task_log</span>
                <h3>任务运行日志</h3>
              </div>
              <button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setLogRecord(null)}>×</button>
            </header>
            <pre className="task-log">{logRecord.taskLog}</pre>
          </section>
        </div>
      ) : null}
    </>
  )
}
