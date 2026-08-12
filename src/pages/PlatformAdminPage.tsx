import { Fragment, type FormEvent, useEffect, useState } from 'react'
import AdminPage from './AdminPage'
import {
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  MoreVertical,
  Pencil,
  Plus,
  Power,
  Settings2,
  ShieldCheck,
  Trash2,
  UsersRound,
  WandSparkles,
} from 'lucide-react'

type AreaId = 'overview' | 'permissions' | 'teams' | 'billing' | 'ai' | 'operations'

interface LeafPage {
  id: string
  title: string
  description: string
}

interface Area {
  id: AreaId
  title: string
  description: string
  icon: typeof LayoutDashboard
  pages: LeafPage[]
}

interface ModuleItem {
  id: string
  name: string
  path: string
  code: string
  order: number
  enabled: boolean
  functions: PermissionFunction[]
}

interface PermissionFunction {
  id: string
  name: string
  path: string
  code: string
  resourceType?: 'page' | 'button'
  order?: number
  enabled: boolean
  pages: PermissionPage[]
  buttons?: PermissionButton[]
}

interface PermissionPage {
  id: string
  name: string
  path: string
  code: string
  order?: number
  enabled: boolean
  buttons: PermissionButton[]
}

interface PermissionButton {
  id: string
  name: string
  code: string
  order?: number
  enabled: boolean
  description?: string
  actionType?: string
  permissionPoint?: string
  apiPath?: string
  httpMethod?: string
}

type PermissionResourceLevel = 'module' | 'function' | 'page' | 'button'

interface PermissionResourceEditor {
  mode: 'create' | 'edit'
  level: PermissionResourceLevel
  moduleId?: string
  functionId?: string
  pageId?: string
  buttonId?: string
  name: string
  code: string
  path: string
  resourceType: 'page' | 'button'
  order: number
  enabled: boolean
  description: string
  showInNavigation: boolean
  icon: string
  component: string
  hidden: boolean
  cache: boolean
  actionType: string
  permissionPoint: string
  apiPath: string
  httpMethod: string
}

const initialModules: ModuleItem[] = [
  { id: 'xiaowan', name: '小万同学', path: '/xiaowan', code: 'xiaowan', order: 1, enabled: true, functions: [
    { id: 'chat', name: '对话服务', path: '/xiaowan/chat', code: 'chat', enabled: true, pages: [{ id: 'chat-workbench', name: '对话工作台', path: '/xiaowan/chat', code: 'chat-workbench', enabled: true, buttons: [{ id: 'new-chat', name: '新建会话', code: 'new-chat', enabled: true }, { id: 'send-message', name: '发送消息', code: 'send-message', enabled: true }] }] },
    { id: 'knowledge', name: '知识配置', path: '/xiaowan/knowledge', code: 'knowledge', enabled: true, pages: [{ id: 'knowledge-base', name: '知识库', path: '/xiaowan/knowledge', code: 'knowledge-base', enabled: true, buttons: [{ id: 'create-knowledge', name: '新增知识库', code: 'create-knowledge', enabled: true }, { id: 'publish-knowledge', name: '发布知识库', code: 'publish-knowledge', enabled: true }] }] },
  ] },
  { id: 'ecom-image', name: '电商生图', path: '/ecom-image', code: 'ecom-image', order: 2, enabled: true, functions: [
    { id: 'task-production', name: '任务生产', path: '', code: 'task-production', resourceType: 'button', order: 1, enabled: true, pages: [
      { id: 'task-list', name: '任务管理', path: '/ecom-image/tasks', code: 'task-list', order: 1, enabled: true, buttons: [{ id: 'create-task', name: '新建任务', code: 'create-task', order: 1, enabled: true }, { id: 'stop-task', name: '终止任务', code: 'stop-task', order: 2, enabled: true }, { id: 'batch-export-task', name: '批量导出', code: 'batch-export-task', order: 3, enabled: true }] },
      { id: 'task-review', name: '任务审核', path: '/ecom-image/tasks/review', code: 'task-review', order: 2, enabled: true, buttons: [{ id: 'approve-task', name: '审核通过', code: 'approve-task', order: 1, enabled: true }, { id: 'reject-task', name: '驳回任务', code: 'reject-task', order: 2, enabled: true }] },
    ] },
    { id: 'asset-configuration', name: '资源配置', path: '', code: 'asset-configuration', resourceType: 'button', order: 2, enabled: true, pages: [
      { id: 'generation-assets', name: '生图资产', path: '/ecom-image/assets', code: 'generation-assets', order: 1, enabled: true, buttons: [{ id: 'add-asset', name: '新增资产', code: 'add-asset', order: 1, enabled: true }, { id: 'publish-asset', name: '发布资产', code: 'publish-asset', order: 2, enabled: true }] },
      { id: 'style-template', name: '风格模板', path: '/ecom-image/templates', code: 'style-template', order: 2, enabled: true, buttons: [{ id: 'create-template', name: '新建模板', code: 'create-template', order: 1, enabled: true }, { id: 'disable-template', name: '停用模板', code: 'disable-template', order: 2, enabled: true }] },
    ] },
    { id: 'production-dashboard', name: '生产看板', path: '/ecom-image/dashboard', code: 'production-dashboard', resourceType: 'page', order: 3, enabled: true, pages: [], buttons: [{ id: 'view-production-dashboard', name: '查看看板', code: 'view-production-dashboard', order: 1, enabled: true }, { id: 'export-production-dashboard', name: '导出数据', code: 'export-production-dashboard', order: 2, enabled: true }] },
  ] },
  { id: 'strategy', name: '经营策略引擎', path: '/strategy', code: 'strategy', order: 3, enabled: true, functions: [
    { id: 'business-dashboard', name: '经营分析', path: '/strategy/dashboard', code: 'business-dashboard', enabled: true, pages: [{ id: 'dashboard', name: '经营看板', path: '/strategy/dashboard', code: 'dashboard', enabled: true, buttons: [{ id: 'view-dashboard', name: '查看看板', code: 'view-dashboard', enabled: true }, { id: 'export-dashboard', name: '导出看板', code: 'export-dashboard', enabled: true }] }] },
    { id: 'strategy-config', name: '策略配置', path: '/strategy/rules', code: 'strategy-config', enabled: true, pages: [{ id: 'strategy-rules', name: '策略规则', path: '/strategy/rules', code: 'strategy-rules', enabled: true, buttons: [{ id: 'create-rule', name: '新建规则', code: 'create-rule', enabled: true }, { id: 'publish-rule', name: '发布规则', code: 'publish-rule', enabled: true }] }] },
  ] },
  { id: 'product', name: 'AI开品', path: '/ai-product', code: 'product', order: 4, enabled: true, functions: [
    { id: 'product-creation', name: '商品创作', path: '/ai-product/studio', code: 'product-creation', enabled: true, pages: [{ id: 'product-studio', name: '开品工作台', path: '/ai-product/studio', code: 'product-studio', enabled: true, buttons: [{ id: 'create-product', name: '创建商品', code: 'create-product', enabled: true }, { id: 'generate-copy', name: '生成文案', code: 'generate-copy', enabled: true }] }] },
    { id: 'product-library', name: '商品管理', path: '/ai-product/library', code: 'product-library', enabled: true, pages: [{ id: 'product-list', name: '商品库', path: '/ai-product/library', code: 'product-list', enabled: true, buttons: [{ id: 'edit-product', name: '编辑商品', code: 'edit-product', enabled: true }, { id: 'archive-product', name: '归档商品', code: 'archive-product', enabled: true }] }] },
  ] },
  { id: 'media', name: 'AI媒体流', path: '/media-flow', code: 'media', order: 5, enabled: true, functions: [
    { id: 'media-creation', name: '内容制作', path: '/media-flow/studio', code: 'media-creation', enabled: true, pages: [{ id: 'media-studio', name: '媒体工作台', path: '/media-flow/studio', code: 'media-studio', enabled: true, buttons: [{ id: 'create-media', name: '创建内容', code: 'create-media', enabled: true }, { id: 'submit-media', name: '提交生成', code: 'submit-media', enabled: true }] }] },
    { id: 'media-assets', name: '素材管理', path: '/media-flow/library', code: 'media-assets', enabled: true, pages: [{ id: 'media-library', name: '媒体素材库', path: '/media-flow/library', code: 'media-library', enabled: true, buttons: [{ id: 'upload-media', name: '上传素材', code: 'upload-media', enabled: true }, { id: 'delete-media', name: '删除素材', code: 'delete-media', enabled: true }] }] },
  ] },
  { id: 'lora', name: 'LORA美人', path: '/lora-beauty', code: 'lora', order: 6, enabled: true, functions: [
    { id: 'model-training', name: '模型训练', path: '/lora-beauty/training', code: 'model-training', enabled: true, pages: [{ id: 'training-tasks', name: '训练任务', path: '/lora-beauty/training', code: 'training-tasks', enabled: true, buttons: [{ id: 'create-training', name: '新建训练', code: 'create-training', enabled: true }, { id: 'stop-training', name: '终止训练', code: 'stop-training', enabled: true }] }] },
    { id: 'model-management', name: '模型管理', path: '/lora-beauty/models', code: 'model-management', enabled: true, pages: [{ id: 'model-library', name: '模型库', path: '/lora-beauty/models', code: 'model-library', enabled: true, buttons: [{ id: 'publish-model', name: '发布模型', code: 'publish-model', enabled: true }, { id: 'offline-model', name: '下线模型', code: 'offline-model', enabled: true }] }] },
  ] },
]

type RoleStatus = 'enabled' | 'disabled'

interface PlatformRole {
  id: string
  name: string
  teamIds: string[]
  memberCount: number
  status: RoleStatus
  pageIds: string[]
}

interface OrganizationRoleTemplate {
  id: 'merchant-manager' | 'group-leader' | 'member'
  name: string
  description: string
  managerPermissionIds: string[]
}

type PlatformUserStatus = 'normal' | 'disabled'

interface PlatformUser {
  id: string
  name: string
  userType?: string
  organizationRole?: string
  email: string
  phone: string
  company: string
  department: string
  position: string
  employeeId: string
  teamCount: number
  status: PlatformUserStatus
  registeredAt: string
  lastLoginAt: string
}

type PlatformUserCreationType = 'super-admin' | 'system-admin'

interface PlatformUserCreationTab {
  id: PlatformUserCreationType
  label: string
  roleOptions: string[]
  defaultRole: string
}

const availableTeams = [
  { id: 'team-1', name: '澄明电商运营团队' },
  { id: 'team-2', name: '京倍数字营销团队' },
  { id: 'team-3', name: '万顷品牌管理团队' },
]

const permissionPages = [
  { group: '小万同学', items: [{ id: 'chat-workbench', label: '对话工作台' }, { id: 'knowledge-base', label: '知识库' }] },
  { group: '电商生图', items: [{ id: 'image-tasks', label: '任务管理' }, { id: 'image-assets', label: '生图资产' }] },
  { group: '商智引擎', items: [{ id: 'business-dashboard', label: '经营看板' }, { id: 'data-center', label: '数据中心' }] },
  { group: '团队协作', items: [{ id: 'team-members', label: '团队成员' }, { id: 'team-groups', label: '小组管理' }] },
]

const initialPlatformRoles: PlatformRole[] = [
  { id: 'operations', name: '运营专员', teamIds: ['team-1', 'team-2'], memberCount: 6, status: 'enabled', pageIds: ['chat-workbench', 'image-tasks', 'image-assets', 'business-dashboard'] },
  { id: 'analyst', name: '数据分析师', teamIds: ['team-1', 'team-2', 'team-3'], memberCount: 4, status: 'enabled', pageIds: ['business-dashboard', 'data-center'] },
  { id: 'content-maker', name: '内容生产员', teamIds: ['team-1'], memberCount: 2, status: 'disabled', pageIds: ['chat-workbench', 'image-tasks', 'image-assets'] },
]

interface ManagerPermissionNode {
  id: string
  label: string
  children?: ManagerPermissionNode[]
}

interface ManagerPermissionModule {
  id: string
  label: string
  children: ManagerPermissionNode[]
}

const managerPermissionModules: ManagerPermissionModule[] = [
  { id: 'manager-overview', label: '数据概览', children: [{ id: 'manager-overview-dashboard', label: '数据概览' }] },
  { id: 'manager-team', label: '团队管理', children: [
    { id: 'manager-team-members', label: '成员管理', children: [{ id: 'manager-team-members-create', label: '新增成员' }, { id: 'manager-team-members-delete', label: '删除成员' }, { id: 'manager-team-members-edit', label: '编辑成员' }, { id: 'manager-team-members-view', label: '查看成员' }, { id: 'manager-team-members-disable', label: '禁用成员' }, { id: 'manager-team-members-peas', label: '豌豆分配' }] },
    { id: 'manager-team-groups', label: '小组管理', children: [
      { id: 'manager-team-groups-manage', label: '小组', children: [{ id: 'manager-team-groups-manage-crud', label: '增删改查' }, { id: 'manager-team-groups-manage-peas', label: '豌豆分配' }] },
      { id: 'manager-team-group-members', label: '小组成员', children: [{ id: 'manager-team-group-members-crud', label: '增删改查' }, { id: 'manager-team-group-members-peas', label: '豌豆分配' }] },
    ] },
    { id: 'manager-team-platforms', label: '平台管理', children: [{ id: 'manager-team-platforms-crud', label: '平台增删改查' }, { id: 'manager-team-platforms-shop-binding', label: '店铺绑定' }] },
    { id: 'manager-team-permissions', label: '权限管理', children: [{ id: 'manager-team-permissions-organization', label: '组织权限' }, { id: 'manager-team-permissions-business', label: '业务权限' }] },
    { id: 'manager-team-operation-log', label: '操作日志' },
  ] },
  { id: 'manager-tasks', label: '任务管理', children: [{ id: 'manager-tasks-ecom-image', label: '电商生图', children: [{ id: 'manager-tasks-ecom-image-pea-records', label: '豌豆值消耗记录' }] }, { id: 'manager-tasks-business-engine', label: '商智引擎' }] },
  { id: 'manager-resources', label: '资源管理', children: [{ id: 'manager-resources-ecom-image', label: '电商生图', children: [{ id: 'manager-resources-ecom-image-inspiration', label: '灵感中心' }, { id: 'manager-resources-ecom-image-coze-suite', label: 'Coze 模版套装' }, { id: 'manager-resources-ecom-image-prompt-template', label: '提示词模版' }, { id: 'manager-resources-ecom-image-pose-preset', label: '姿势库预设' }, { id: 'manager-resources-ecom-image-logo', label: 'Logo 管理' }] }, { id: 'manager-resources-business-engine', label: '商智引擎' }] },
]

function getManagerPermissionLeafIds(nodes: ManagerPermissionNode[]): string[] {
  return nodes.flatMap((node) => node.children?.length ? getManagerPermissionLeafIds(node.children) : [node.id])
}

const allManagerPermissionIds = managerPermissionModules.flatMap((module) => getManagerPermissionLeafIds(module.children))

const initialOrganizationRoles: OrganizationRoleTemplate[] = [
  { id: 'merchant-manager', name: '商户管理员', description: '负责商户团队整体管理，默认拥有 Manager 端全部权限。', managerPermissionIds: allManagerPermissionIds },
  { id: 'group-leader', name: '小组长', description: '用于 Manager 端身份校验，默认不配置具体后台功能。', managerPermissionIds: [] },
  { id: 'member', name: '组员', description: '仅作为成员组织身份占位，不参与权限分配。', managerPermissionIds: [] },
]

const initialPlatformUsers: PlatformUser[] = [
  { id: 'user-xie-liang', name: '谢琼', email: '196223047@qq.com', phone: '15978517582', company: '杭州思辰电子商务有限公司', department: '抖音二部', position: '运营', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/11', lastLoginAt: '2026/8/11 13:44:00' },
  { id: 'user-huang-zijing', name: '黄紫安', email: 'yishengheaa@qq.com', phone: '13018696930', company: '杭州思辰电子商务有限公司', department: '抖音二部', position: '运营', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/11', lastLoginAt: '2026/8/11 13:52:10' },
  { id: 'user-luo-jiaxin', name: '骆嘉鑫', email: '501489687@qq.com', phone: '13143037915', company: '杭州思辰电子商务有限公司', department: '抖音二部', position: '运营', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/11', lastLoginAt: '2026/8/11 13:52:10' },
  { id: 'user-chen-jun', name: '陈俊', email: '914863540@qq.com', phone: '13486970314', company: '–', department: '–', position: '–', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/10', lastLoginAt: '2026/8/11 13:48:44' },
  { id: 'user-wu-wei', name: '吴伟', email: '2192661516@qq.com', phone: '13263090486', company: '–', department: '–', position: '–', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/10', lastLoginAt: '2026/8/10 17:14:10' },
  { id: 'user-yang-jiale', name: '杨佳乐', email: '15722694543@163.com', phone: '15722694543', company: '–', department: '唯品会', position: '运营', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/10', lastLoginAt: '2026/8/10 13:59:09' },
  { id: 'user-zhu-gewei', name: '祝鑫隆', email: '1400967089@qq.com', phone: '–', company: '–', department: '–', position: '–', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/7', lastLoginAt: '–' },
  { id: 'user-ceng-yi', name: '曾寅成', email: '2680255226@qq.com', phone: '–', company: '–', department: '–', position: '–', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/5', lastLoginAt: '2026/8/5 16:57:12' },
  { id: 'user-wang-jianhua', name: '王建华', email: '617674115@qq.com', phone: '17731960101', company: '–', department: '–', position: '–', employeeId: '–', teamCount: 1, status: 'normal', registeredAt: '2026/8/5', lastLoginAt: '2026/8/5 14:48:22' },
]

const platformUserCreationTabs: PlatformUserCreationTab[] = [
  { id: 'super-admin', label: '超管', roleOptions: ['系统管理员', '商户管理员', '小组长', '普通成员'], defaultRole: '系统管理员' },
  { id: 'system-admin', label: '系统管理员', roleOptions: ['商户管理员', '小组长', '普通成员'], defaultRole: '商户管理员' },
]

interface BillingRule {
  id: string
  module: string
  workflow: string
  name: string
  mode: '固定值' | '按时长'
  fixedFee: number
  perSecondFee: number
  minimumFee: number
  enabled: boolean
  parameter: string
}

interface BillingPackage {
  id: string
  name: string
  code: string
  discount: number
  order: number
  enabled: boolean
  coverage: { id: string; module: string; workflow: string; discount: number }[]
}

const billingModuleTabs = ['全部', '电商生图', 'AI媒体流', 'AI开品', '小万同学', '经营策略', 'LORA美人']

const initialBillingRules: BillingRule[] = [
  { id: 'billing-1', module: '电商生图', workflow: 'custom_1773309105734', name: 'FlowX Pro文/图生图', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
  { id: 'billing-2', module: '电商生图', workflow: 'custom_1773309105734_copy_1774512055761', name: 'FlowX Pro文/图生图花里子', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
  { id: 'billing-3', module: '电商生图', workflow: 'custom_1773482135865', name: '创想文生图（主图）', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
  { id: 'billing-4', module: '电商生图', workflow: 'custom_1773482135865_copy_1774452003153', name: '创想文生图（主图）技术测试', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
  { id: 'billing-5', module: '电商生图', workflow: 'custom_1773554656103', name: 'ai图文（详情页）', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
  { id: 'billing-6', module: '电商生图', workflow: 'custom_1773605398462', name: '丝袜精修', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
  { id: 'billing-7', module: '电商生图', workflow: 'custom_1773605398462_copy_1777978891172', name: '保暖内衣精修', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
  { id: 'billing-8', module: '电商生图', workflow: 'custom_1773833476539', name: '产品一键扣透明图', mode: '固定值', fixedFee: 40, perSecondFee: 0, minimumFee: 40, enabled: true, parameter: 'mode' },
  { id: 'billing-9', module: '电商生图', workflow: 'custom_1774260737612', name: '内衣裤文胸精修', mode: '固定值', fixedFee: 240, perSecondFee: 0, minimumFee: 240, enabled: true, parameter: '—' },
]

const initialBillingPackages: BillingPackage[] = [
  { id: 'wanpai', name: '万派专属', code: 'wanpai', discount: 2.8, order: 0, enabled: true, coverage: [{ id: 'wanpai-ecom', module: '电商生图', workflow: '全部工作流', discount: 2.8 }] },
  { id: 'flagship', name: '旗舰版', code: 'flagship', discount: 3.8, order: 1, enabled: true, coverage: [{ id: 'flagship-ecom', module: '电商生图', workflow: '全部工作流', discount: 3.8 }] },
  { id: 'excellence', name: '卓越版', code: 'excellence', discount: 5, order: 2, enabled: true, coverage: [{ id: 'excellence-ecom', module: '电商生图', workflow: '全部工作流', discount: 5 }] },
  { id: 'lite', name: '轻量版', code: 'lite', discount: 10, order: 3, enabled: true, coverage: [{ id: 'lite-ecom', module: '电商生图', workflow: '全部工作流', discount: 10 }] },
]

const areas: Area[] = [
  {
    id: 'overview',
    title: '系统概览',
    description: '统一查看平台经营、服务健康与需要处理的系统风险。',
    icon: LayoutDashboard,
    pages: [
      { id: 'platform-business', title: '平台经营概览', description: '查看商户、用户、订单、任务与消耗的整体运行情况。' },
      { id: 'system-health', title: '系统健康概览', description: '查看服务状态、外部连接和系统异常。' },
    ],
  },
  {
    id: 'permissions',
    title: '权限管理',
    description: '维护平台权限目录与平台角色，不包含商户内部业务角色。',
    icon: ShieldCheck,
    pages: [
      { id: 'function-permissions', title: '功能权限', description: '以模块、功能、页面、按钮四级资源树维护平台权限点。' },
      { id: 'platform-roles', title: '角色管理', description: '配置平台角色可获得的权限点集合。' },
    ],
  },
  {
    id: 'teams',
    title: '团队与用户',
    description: '从平台视角管理商户团队、用户归属和可开放模块。',
    icon: UsersRound,
    pages: [
      { id: 'merchant-teams', title: '商户团队管理', description: '维护商户团队基础信息、启停状态与服务范围。' },
      { id: 'users', title: '用户管理', description: '查看平台用户的账号状态、商户归属与访问记录。' },
    ],
  },
  {
    id: 'billing',
    title: '计费管理',
    description: '统一管理豌豆额度、消耗明细和平台计费规则。',
    icon: CircleDollarSign,
    pages: [
      { id: 'pea-consumption', title: '豌豆消耗记录', description: '追踪任务与商户维度的消耗、异常扣减和来源。' },
      { id: 'pea-quota', title: '豌豆额度管理', description: '为商户团队分配、回收或调整可用额度。' },
      { id: 'billing-packages', title: '计费套餐设置', description: '维护可向商户团队配置的计费套餐。' },
      { id: 'billing-rules', title: '计费规则配置', description: '配置各项平台能力的计费方式、单价和生效状态。' },
    ],
  },
  {
    id: 'ai',
    title: 'AI 配置',
    description: '配置电商生图与其他 AI 产品能力所需的模型、工作流和资产。',
    icon: WandSparkles,
    pages: [
      { id: 'ecommerce-image', title: '电商生图', description: '集中维护电商生图的模型、工作流、模板与生产资产。' },
      { id: 'business-engine', title: '经营引擎', description: '维护经营引擎的能力配置、服务状态与可用范围。' },
      { id: 'xiaowan', title: '小万', description: '维护小万产品的模型能力、服务配置与版本信息。' },
    ],
  },
  {
    id: 'operations',
    title: '系统运维',
    description: '处理平台系统运行、关键连接和维护任务。',
    icon: Settings2,
    pages: [
      { id: 'system-operations', title: '系统运维', description: '查看运行状态、维护记录和需要人工处理的系统事项。' },
    ],
  },
]

function getRoute() {
  const [areaId, pageId] = window.location.hash.replace(/^#platform-admin\/?/, '').split('/')
  const area = areas.find((item) => item.id === areaId) ?? areas[0]
  const page = area.pages.find((item) => item.id === pageId) ?? area.pages[0]
  return { area, page }
}

function routeTo(areaId: AreaId, pageId: string) {
  window.location.hash = `#platform-admin/${areaId}/${pageId}`
}

function FunctionPermissionsPage() {
  const [modules, setModules] = useState(initialModules)
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set(['module:ecom-image', 'function:ecom-image:task-production', 'page:ecom-image:task-production:task-list']))
  const [editor, setEditor] = useState<PermissionResourceEditor | null>(null)

  const toggleExpanded = (key: string) => {
    setExpandedKeys((current) => {
      const next = new Set(current)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  const ensureExpanded = (key: string) => {
    setExpandedKeys((current) => current.has(key) ? current : new Set([...current, key]))
  }

  const toggleStatus = (id: string) => {
    setModules((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item))
  }

  const deleteModule = (id: string) => {
    const target = modules.find((item) => item.id === id)
    if (target && window.confirm(`确定删除「${target.name}」吗？`)) {
      setModules((current) => current.filter((item) => item.id !== id))
    }
  }

  const functionCount = modules.reduce((total, module) => total + module.functions.length, 0)
  const pageCount = modules.reduce((total, module) => total + module.functions.reduce((sum, feature) => sum + feature.pages.length, 0), 0)
  const buttonCount = modules.reduce((total, module) => total + module.functions.reduce((sum, feature) => sum + (feature.buttons?.length ?? 0) + feature.pages.reduce((count, page) => count + page.buttons.length, 0), 0), 0)

  const levelLabel = (level: PermissionResourceLevel) => ({ module: '模块', function: '功能', page: '页面', button: '按钮' })[level]

  const openCreate = (level: PermissionResourceLevel, parent: Pick<PermissionResourceEditor, 'moduleId' | 'functionId' | 'pageId'> = {}) => {
    const module = modules.find((item) => item.id === parent.moduleId)
    const feature = module?.functions.find((item) => item.id === parent.functionId)
    const page = feature?.pages.find((item) => item.id === parent.pageId)
    const siblings = level === 'module'
      ? modules
      : level === 'function'
        ? module?.functions ?? []
        : level === 'page'
          ? feature?.pages ?? []
          : page?.buttons ?? feature?.buttons ?? []
    const nextOrder = Math.max(0, ...siblings.map((item) => item.order ?? 0)) + 1
    setEditor({ mode: 'create', level, ...parent, name: '', code: '', path: '', resourceType: 'page', order: nextOrder, enabled: true, description: '', showInNavigation: true, icon: '', component: '', hidden: false, cache: false, actionType: '新增', permissionPoint: '', apiPath: '', httpMethod: 'POST' })
  }

  const openEdit = (level: PermissionResourceLevel, resource: Pick<PermissionResourceEditor, 'moduleId' | 'functionId' | 'pageId' | 'buttonId' | 'name' | 'code' | 'path' | 'order' | 'enabled'> & Partial<Pick<PermissionResourceEditor, 'description' | 'showInNavigation' | 'icon' | 'component' | 'hidden' | 'cache' | 'actionType' | 'permissionPoint' | 'apiPath' | 'httpMethod'>>) => {
    setEditor({ mode: 'edit', level, ...resource, resourceType: 'page', description: resource.description ?? '', showInNavigation: resource.showInNavigation ?? true, icon: resource.icon ?? '', component: resource.component ?? '', hidden: resource.hidden ?? false, cache: resource.cache ?? false, actionType: resource.actionType ?? '新增', permissionPoint: resource.permissionPoint ?? '', apiPath: resource.apiPath ?? '', httpMethod: resource.httpMethod ?? 'POST' })
  }

  const parentLabel = (resource: PermissionResourceEditor) => {
    if (resource.level === 'module') return '系统根目录'
    const module = modules.find((item) => item.id === resource.moduleId)
    if (resource.level === 'function') return module?.name ?? '—'
    const feature = module?.functions.find((item) => item.id === resource.functionId)
    if (resource.level === 'page') return feature?.name ?? '—'
    const page = feature?.pages.find((item) => item.id === resource.pageId)
    return page?.name ?? feature?.name ?? '—'
  }

  const saveResource = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editor || !editor.name.trim() || !editor.code.trim()) return
    const resource = { ...editor, name: editor.name.trim(), code: editor.code.trim(), path: editor.path.trim(), description: editor.description.trim(), icon: editor.icon.trim(), component: editor.component.trim(), permissionPoint: editor.permissionPoint.trim(), apiPath: editor.apiPath.trim(), order: Math.max(0, Number(editor.order) || 0) }
    const resourceId = `${resource.level}-${Date.now()}`
    const buttonConfig = { description: resource.description, actionType: resource.actionType, permissionPoint: resource.permissionPoint, apiPath: resource.apiPath, httpMethod: resource.httpMethod }
    setModules((current) => {
      if (resource.level === 'module') {
        if (resource.mode === 'create') return [...current, { id: resourceId, name: resource.name, path: resource.path || `/${resource.code}`, code: resource.code, order: resource.order, enabled: resource.enabled, functions: [] }]
        return current.map((module) => module.id === resource.moduleId ? { ...module, name: resource.name, code: resource.code, path: resource.path || module.path, order: resource.order, enabled: resource.enabled } : module)
      }
      return current.map((module) => {
        if (module.id !== resource.moduleId) return module
        if (resource.level === 'function') {
          if (resource.mode === 'create') return { ...module, functions: [...module.functions, { id: resourceId, name: resource.name, path: resource.resourceType === 'page' ? resource.path || `/${resource.code}` : '', code: resource.code, resourceType: resource.resourceType, order: resource.order, enabled: resource.enabled, pages: [], buttons: resource.resourceType === 'page' ? [] : undefined }] }
          return { ...module, functions: module.functions.map((feature) => feature.id === resource.functionId ? { ...feature, name: resource.name, code: resource.code, path: resource.path || feature.path, order: resource.order, enabled: resource.enabled } : feature) }
        }
        return {
          ...module,
          functions: module.functions.map((feature) => {
            if (feature.id !== resource.functionId) return feature
            if (resource.level === 'page') {
              if (resource.mode === 'create') return { ...feature, pages: [...feature.pages, { id: resourceId, name: resource.name, path: resource.path || `/${resource.code}`, code: resource.code, order: resource.order, enabled: resource.enabled, buttons: [] }] }
              return { ...feature, pages: feature.pages.map((page) => page.id === resource.pageId ? { ...page, name: resource.name, code: resource.code, path: resource.path || page.path, order: resource.order, enabled: resource.enabled } : page) }
            }
            if (!resource.pageId) {
              if (resource.mode === 'create') return { ...feature, buttons: [...(feature.buttons ?? []), { id: resourceId, name: resource.name, code: resource.code, order: resource.order, enabled: resource.enabled, ...buttonConfig }] }
              return { ...feature, buttons: (feature.buttons ?? []).map((button) => button.id === resource.buttonId ? { ...button, name: resource.name, code: resource.code, order: resource.order, enabled: resource.enabled, ...buttonConfig } : button) }
            }
            return {
              ...feature,
              pages: feature.pages.map((page) => {
                if (page.id !== resource.pageId) return page
                if (resource.mode === 'create') return { ...page, buttons: [...page.buttons, { id: resourceId, name: resource.name, code: resource.code, order: resource.order, enabled: resource.enabled, ...buttonConfig }] }
                return { ...page, buttons: page.buttons.map((button) => button.id === resource.buttonId ? { ...button, name: resource.name, code: resource.code, order: resource.order, enabled: resource.enabled, ...buttonConfig } : button) }
              }),
            }
          }),
        }
      })
    })
    setEditor(null)
  }

  const isButtonCreate = editor?.mode === 'create' && editor.level === 'button'

  return (
    <main className="platform-admin-main module-management-page" id="main-content" tabIndex={-1} aria-labelledby="function-permissions-title">
      <header className="module-management-page__toolbar">
        <div>
          <h1 id="function-permissions-title" className="sr-only">功能权限</h1>
          <p>主站前端按角色关联的资源渲染。当前 {modules.length} 个模块、{functionCount} 个功能、{pageCount} 个页面、{buttonCount} 个按钮。</p>
        </div>
        <button className="module-management-page__create" type="button" onClick={() => openCreate('module')}>
          <Plus aria-hidden="true" />
          新增模块
        </button>
      </header>

      <div className="permission-tree-path" aria-label="权限资源层级">
        <span>模块</span><ChevronRight aria-hidden="true" /><span>功能</span><ChevronRight aria-hidden="true" /><span>页面</span><ChevronRight aria-hidden="true" /><span>按钮</span>
      </div>

      <section className="permission-resource-tree" aria-label="功能权限资源树">
        {[...modules].sort((left, right) => left.order - right.order).map((item) => {
          const moduleKey = `module:${item.id}`
          const isExpanded = expandedKeys.has(moduleKey)
          return (
            <article key={item.id} className={item.enabled ? 'module-management-row' : 'module-management-row is-disabled'}>
              <div className="module-management-row__summary">
                <button className="module-management-row__toggle" type="button" aria-label={`${isExpanded ? '收起' : '展开'}${item.name}`} aria-expanded={isExpanded} onClick={() => toggleExpanded(moduleKey)}>
                  <ChevronRight aria-hidden="true" />
                </button>
                <span className="permission-level permission-level--module">模块</span>
                <strong>{item.name}</strong>
                <span>{item.path}</span>
                <code>{item.code}</code>
                <small>序 {item.order}</small>
              </div>
              <div className="module-management-row__actions">
                <span className={item.enabled ? 'module-status' : 'module-status is-disabled'}>{item.enabled ? '启用' : '停用'}</span>
                <button type="button" aria-label={`编辑${item.name}`} title="编辑模块" onClick={() => openEdit('module', { moduleId: item.id, name: item.name, code: item.code, path: item.path, order: item.order, enabled: item.enabled })}><Pencil aria-hidden="true" /></button>
                <button type="button" aria-label={`${item.enabled ? '停用' : '启用'}${item.name}`} title={item.enabled ? '停用模块' : '启用模块'} onClick={() => toggleStatus(item.id)}><Power aria-hidden="true" /></button>
                <button type="button" aria-label={`删除${item.name}`} title="删除模块" onClick={() => deleteModule(item.id)}><Trash2 aria-hidden="true" /></button>
                <button className="module-management-row__add-button" type="button" onClick={() => { ensureExpanded(moduleKey); openCreate('function', { moduleId: item.id }) }}><Plus aria-hidden="true" />新增功能</button>
              </div>
              {isExpanded ? <div className="permission-resource-children permission-resource-children--function">
                {[...item.functions].sort((left, right) => (left.order ?? 0) - (right.order ?? 0)).map((feature, featureIndex) => {
                  const functionKey = `function:${item.id}:${feature.id}`
                  const isExpandableFunction = feature.resourceType !== 'page'
                  const isFunctionOpen = isExpandableFunction && expandedKeys.has(functionKey)
                  return <section key={feature.id} className="permission-resource-node">
                    <div className="permission-resource-row permission-resource-row--function">
                      {isExpandableFunction ? <button className="permission-resource-row__toggle" type="button" aria-label={`${isFunctionOpen ? '收起' : '展开'}${feature.name}`} aria-expanded={isFunctionOpen} onClick={() => toggleExpanded(functionKey)}><ChevronRight aria-hidden="true" /></button> : <span className="permission-resource-row__toggle-spacer" />}
                      <span className="permission-level permission-level--function">功能</span>
                      <strong>{feature.name}</strong>{feature.resourceType ? <span className="permission-resource-type">{feature.resourceType === 'page' ? '页面' : '按钮'}</span> : null}{feature.path ? <span className="permission-resource-row__path">{feature.path}</span> : null}<code>{feature.code}</code><small>序 {feature.order ?? featureIndex + 1}</small>
                      <span className={feature.enabled ? 'module-status' : 'module-status is-disabled'}>{feature.enabled ? '启用' : '停用'}</span>
                      <div className="permission-resource-row__actions"><button type="button" aria-label={`编辑${feature.name}`} title="编辑功能" onClick={() => openEdit('function', { moduleId: item.id, functionId: feature.id, name: feature.name, code: feature.code, path: feature.path, order: feature.order ?? featureIndex + 1, enabled: feature.enabled })}><Pencil aria-hidden="true" /></button>{feature.resourceType === 'page' ? <button className="permission-resource-row__add" type="button" onClick={() => openCreate('button', { moduleId: item.id, functionId: feature.id })}><Plus aria-hidden="true" />新增按钮</button> : isExpandableFunction ? <button className="permission-resource-row__add" type="button" onClick={() => { ensureExpanded(functionKey); openCreate('page', { moduleId: item.id, functionId: feature.id }) }}><Plus aria-hidden="true" />新增页面</button> : null}</div>
                    </div>
                    {feature.resourceType === 'page' ? <div className="permission-resource-children permission-resource-children--button">
                      {[...(feature.buttons ?? [])].sort((left, right) => (left.order ?? 0) - (right.order ?? 0)).map((button, buttonIndex) => <div key={button.id} className="permission-resource-row permission-resource-row--button">
                        <span className="permission-resource-row__toggle-spacer" />
                        <span className="permission-level permission-level--button">按钮</span>
                        <strong>{button.name}</strong><code>{button.code}</code><small>序 {button.order ?? buttonIndex + 1}</small>
                        <span className={button.enabled ? 'module-status' : 'module-status is-disabled'}>{button.enabled ? '启用' : '停用'}</span>
                        <div className="permission-resource-row__actions"><button type="button" aria-label={`编辑${button.name}`} title="编辑按钮" onClick={() => openEdit('button', { moduleId: item.id, functionId: feature.id, buttonId: button.id, name: button.name, code: button.code, path: '', order: button.order ?? buttonIndex + 1, enabled: button.enabled, description: button.description, actionType: button.actionType, permissionPoint: button.permissionPoint, apiPath: button.apiPath, httpMethod: button.httpMethod })}><Pencil aria-hidden="true" /></button></div>
                      </div>)}
                    </div> : null}
                    {isExpandableFunction && isFunctionOpen ? <div className="permission-resource-children permission-resource-children--page">
                      {[...feature.pages].sort((left, right) => (left.order ?? 0) - (right.order ?? 0)).map((page, pageIndex) => {
                        const pageKey = `page:${item.id}:${feature.id}:${page.id}`
                        const isPageOpen = expandedKeys.has(pageKey)
                        return <section key={page.id} className="permission-resource-node">
                          <div className="permission-resource-row permission-resource-row--page">
                            <button className="permission-resource-row__toggle" type="button" aria-label={`${isPageOpen ? '收起' : '展开'}${page.name}`} aria-expanded={isPageOpen} onClick={() => toggleExpanded(pageKey)}><ChevronRight aria-hidden="true" /></button>
                            <span className="permission-level permission-level--page">页面</span>
                            <strong>{page.name}</strong><span className="permission-resource-row__path">{page.path}</span><code>{page.code}</code><small>序 {page.order ?? pageIndex + 1}</small>
                            <span className={page.enabled ? 'module-status' : 'module-status is-disabled'}>{page.enabled ? '启用' : '停用'}</span>
                            <div className="permission-resource-row__actions"><button type="button" aria-label={`编辑${page.name}`} title="编辑页面" onClick={() => openEdit('page', { moduleId: item.id, functionId: feature.id, pageId: page.id, name: page.name, code: page.code, path: page.path, order: page.order ?? pageIndex + 1, enabled: page.enabled })}><Pencil aria-hidden="true" /></button><button className="permission-resource-row__add" type="button" onClick={() => { ensureExpanded(pageKey); openCreate('button', { moduleId: item.id, functionId: feature.id, pageId: page.id }) }}><Plus aria-hidden="true" />新增按钮</button></div>
                          </div>
                          {isPageOpen ? <div className="permission-resource-children permission-resource-children--button">
                            {[...page.buttons].sort((left, right) => (left.order ?? 0) - (right.order ?? 0)).map((button, buttonIndex) => <div key={button.id} className="permission-resource-row permission-resource-row--button">
                              <span className="permission-resource-row__toggle-spacer" />
                              <span className="permission-level permission-level--button">按钮</span>
                              <strong>{button.name}</strong><code>{button.code}</code><small>序 {button.order ?? buttonIndex + 1}</small>
                              <span className={button.enabled ? 'module-status' : 'module-status is-disabled'}>{button.enabled ? '启用' : '停用'}</span>
                              <div className="permission-resource-row__actions"><button type="button" aria-label={`编辑${button.name}`} title="编辑按钮" onClick={() => openEdit('button', { moduleId: item.id, functionId: feature.id, pageId: page.id, buttonId: button.id, name: button.name, code: button.code, path: '', order: button.order ?? buttonIndex + 1, enabled: button.enabled, description: button.description, actionType: button.actionType, permissionPoint: button.permissionPoint, apiPath: button.apiPath, httpMethod: button.httpMethod })}><Pencil aria-hidden="true" /></button></div>
                            </div>)}
                          </div> : null}
                        </section>
                      })}
                    </div> : null}
                  </section>
                })}
              </div> : null}
            </article>
          )
        })}
      </section>
      {editor ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditor(null)}>
        <form className={`ledger-dialog permission-resource-dialog${isButtonCreate ? ' is-button-create' : ''}`} role="dialog" aria-modal="true" aria-labelledby="permission-resource-dialog-title" onSubmit={saveResource}>
          <header><div><span className="eyebrow">permission_resource</span><h3 id="permission-resource-dialog-title">{editor.mode === 'create' ? `新增${levelLabel(editor.level)}` : `编辑${levelLabel(editor.level)}`}</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setEditor(null)}>×</button></header>
          <div className="permission-resource-dialog__fields">
            {isButtonCreate ? <><section className="permission-resource-dialog__section">
              <h4>基础信息</h4>
              <div className="permission-resource-dialog__grid">
                <label className="dialog-field"><span>名称</span><input value={editor.name} onChange={(event) => setEditor({ ...editor, name: event.target.value })} placeholder="请输入按钮名称" autoFocus required /></label>
                <label className="dialog-field"><span>标识</span><input value={editor.code} onChange={(event) => setEditor({ ...editor, code: event.target.value })} placeholder="例如：task-create" required /></label>
                <label className="dialog-field"><span>所属父级</span><input value={parentLabel(editor)} readOnly aria-readonly="true" /></label>
                <label className="dialog-field"><span>排序</span><input type="number" min="0" value={editor.order} onChange={(event) => setEditor({ ...editor, order: Number(event.target.value) })} required /></label>
                <label className="dialog-field"><span>状态</span><select value={editor.enabled ? 'enabled' : 'disabled'} onChange={(event) => setEditor({ ...editor, enabled: event.target.value === 'enabled' })}><option value="enabled">启用</option><option value="disabled">停用</option></select></label>
                <label className="dialog-field permission-resource-dialog__full"><span>说明</span><textarea value={editor.description} onChange={(event) => setEditor({ ...editor, description: event.target.value })} placeholder="说明该按钮的用途，便于后续权限配置与审计" rows={2} /></label>
              </div>
            </section><section className="permission-resource-dialog__section">
              <h4>权限定义</h4>
              <div className="permission-resource-dialog__grid">
                <label className="dialog-field"><span>操作类型</span><select value={editor.actionType} onChange={(event) => setEditor({ ...editor, actionType: event.target.value })}>{['新增', '编辑', '删除', '导出', '审核', '发布', '自定义'].map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
                <label className="dialog-field"><span>权限点标识</span><input value={editor.permissionPoint} onChange={(event) => setEditor({ ...editor, permissionPoint: event.target.value })} placeholder="例如：ecom.task.create" /></label>
                <label className="dialog-field"><span>请求方法</span><select value={editor.httpMethod} onChange={(event) => setEditor({ ...editor, httpMethod: event.target.value })}>{['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((method) => <option key={method} value={method}>{method}</option>)}</select></label>
                <label className="dialog-field permission-resource-dialog__full"><span>关联接口</span><input value={editor.apiPath} onChange={(event) => setEditor({ ...editor, apiPath: event.target.value })} placeholder="例如：/api/ecom/tasks" /></label>
              </div>
            </section></> : <div className="permission-resource-dialog__grid">
              <label className="dialog-field"><span>名称</span><input value={editor.name} onChange={(event) => setEditor({ ...editor, name: event.target.value })} placeholder={`请输入${levelLabel(editor.level)}名称`} autoFocus required /></label>
              <label className="dialog-field"><span>标识</span><input value={editor.code} onChange={(event) => setEditor({ ...editor, code: event.target.value })} placeholder="例如：task-list" required /></label>
              {editor.mode === 'create' && editor.level === 'function' ? <label className="dialog-field"><span>功能类型</span><select value={editor.resourceType} onChange={(event) => setEditor({ ...editor, resourceType: event.target.value as PermissionResourceEditor['resourceType'], path: event.target.value === 'button' ? '' : editor.path })}><option value="page">页面</option><option value="button">按钮</option></select></label> : null}
              <label className="dialog-field"><span>排序</span><input type="number" min="0" value={editor.order} onChange={(event) => setEditor({ ...editor, order: Number(event.target.value) })} required /></label>
              <label className="dialog-field"><span>状态</span><select value={editor.enabled ? 'enabled' : 'disabled'} onChange={(event) => setEditor({ ...editor, enabled: event.target.value === 'enabled' })}><option value="enabled">启用</option><option value="disabled">停用</option></select></label>
              {editor.level !== 'button' && !(editor.mode === 'create' && editor.level === 'function' && editor.resourceType === 'button') ? <label className="dialog-field permission-resource-dialog__full"><span>页面路由</span><input value={editor.path} onChange={(event) => setEditor({ ...editor, path: event.target.value })} placeholder={editor.level === 'module' ? '例如：/ecom-image' : editor.level === 'function' ? '例如：/ecom-image/tasks' : '例如：/ecom-image/tasks/list'} /></label> : null}
            </div>}
          </div>
          <footer><button className="secondary-action" type="button" onClick={() => setEditor(null)}>取消</button><button className="primary-action" type="submit">{editor.mode === 'create' ? `新增${levelLabel(editor.level)}` : '保存修改'}</button></footer>
        </form>
      </div> : null}
    </main>
  )
}

function TeamManagementPage() {
  return <main className="platform-admin-main platform-admin-embedded-workspace" id="main-content" tabIndex={-1} aria-label="团队管理">
    <AdminPage key="platform-admin-team" activeTab="team" context="system" />
  </main>
}

function UserManagementPage() {
  const [users, setUsers] = useState(initialPlatformUsers)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [openActionId, setOpenActionId] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [creationType, setCreationType] = useState<PlatformUserCreationType>('super-admin')
  const allSelected = users.length > 0 && selectedIds.length === users.length
  const activeCreationTab = platformUserCreationTabs.find((tab) => tab.id === creationType) ?? platformUserCreationTabs[0]

  const toggleSelection = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  const toggleUserStatus = (id: string) => {
    setUsers((current) => current.map((user) => user.id === id ? { ...user, status: user.status === 'normal' ? 'disabled' : 'normal' } : user))
    setOpenActionId(null)
  }

  const removeUser = (id: string) => {
    setUsers((current) => current.filter((user) => user.id !== id))
    setSelectedIds((current) => current.filter((item) => item !== id))
    setOpenActionId(null)
  }

  const createUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = String(form.get('username') ?? '').trim()
    const name = String(form.get('nickname') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()
    if (!username || !name || !email || !phone) return
    const today = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date()).replaceAll('-', '/')
    setUsers((current) => [{
      id: `user-${Date.now()}`,
      name,
      userType: activeCreationTab.label,
      organizationRole: String(form.get('organizationRole') ?? activeCreationTab.defaultRole),
      email,
      phone,
      company: '–',
      department: '–',
      position: '–',
      employeeId: String(form.get('employeeId') ?? '').trim() || '–',
      teamCount: 0,
      status: 'normal',
      registeredAt: today,
      lastLoginAt: '–',
    }, ...current])
    setIsCreateDialogOpen(false)
  }

  return <main className="platform-admin-main platform-users-page" id="main-content" tabIndex={-1} aria-labelledby="platform-users-title">
    <h1 id="platform-users-title" className="sr-only">用户管理</h1>
    <div className="platform-users-page__toolbar"><button className="platform-users-page__create" type="button" onClick={() => setIsCreateDialogOpen(true)}><Plus aria-hidden="true" />新增用户</button></div>
    <section className="platform-users-table-wrap" aria-label="平台用户列表">
      <table className="platform-users-table">
        <thead>
          <tr>
            <th className="platform-users-table__selection"><input type="checkbox" checked={allSelected} aria-label="全选用户" onChange={() => setSelectedIds(allSelected ? [] : users.map((user) => user.id))} /></th>
            <th>成员</th><th>用户类型</th><th>手机号</th><th>公司</th><th>部门</th><th>岗位</th><th>员工编号</th><th>加入团队数</th><th>状态</th><th>注册时间</th><th>最后登录</th><th className="platform-users-table__actions">操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelected = selectedIds.includes(user.id)
            return <tr key={user.id} className={isSelected ? 'is-selected' : ''}>
              <td className="platform-users-table__selection"><input type="checkbox" checked={isSelected} aria-label={`选择${user.name}`} onChange={() => toggleSelection(user.id)} /></td>
              <td><div className="platform-user-cell"><span className="platform-user-avatar" aria-hidden="true">{user.name.slice(0, 1)}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div></td>
              <td><span className="platform-user-type">{user.userType ?? '普通用户'}</span></td>
              <td>{user.phone}</td><td>{user.company}</td><td>{user.department}</td><td>{user.position}</td><td>{user.employeeId}</td>
              <td><span className="platform-user-team-count">{user.teamCount} 个团队</span></td>
              <td><span className={user.status === 'normal' ? 'platform-user-status' : 'platform-user-status is-disabled'}><i aria-hidden="true" />{user.status === 'normal' ? '正常' : '已停用'}</span></td>
              <td>{user.registeredAt}</td><td>{user.lastLoginAt}</td>
              <td className="platform-users-table__actions"><div className="platform-user-actions"><button type="button" className="platform-user-actions__trigger" aria-label={`${user.name}的更多操作`} aria-expanded={openActionId === user.id} onClick={() => setOpenActionId((current) => current === user.id ? null : user.id)}><MoreVertical aria-hidden="true" /></button>
                {openActionId === user.id ? <div className="platform-user-actions__menu" role="menu" aria-label={`${user.name}的操作`}><button type="button" role="menuitem" onClick={() => setOpenActionId(null)}><Pencil aria-hidden="true" />编辑信息</button><button type="button" role="menuitem" onClick={() => toggleUserStatus(user.id)}><Power aria-hidden="true" />{user.status === 'normal' ? '停用账号' : '启用账号'}</button><button type="button" role="menuitem" className="danger" onClick={() => removeUser(user.id)}><Trash2 aria-hidden="true" />删除用户</button></div> : null}
              </div></td>
            </tr>
          })}
        </tbody>
      </table>
      {users.length === 0 ? <p className="platform-users-table__empty">暂无用户</p> : null}
    </section>
    {isCreateDialogOpen ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsCreateDialogOpen(false)}>
      <form key={creationType} className="ledger-dialog platform-user-dialog" role="dialog" aria-modal="true" aria-labelledby="platform-user-dialog-title" onSubmit={createUser}>
        <header><div><span className="eyebrow">platform_user</span><h3 id="platform-user-dialog-title">新增用户</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setIsCreateDialogOpen(false)}>×</button></header>
        <nav className="platform-user-dialog__tabs" aria-label="新增账号类型">
          {platformUserCreationTabs.map((tab) => <button key={tab.id} type="button" className={creationType === tab.id ? 'active' : ''} aria-current={creationType === tab.id ? 'page' : undefined} onClick={() => setCreationType(tab.id)}>{tab.label}</button>)}
        </nav>
        <div className="platform-user-dialog__fields">
          <label className="dialog-field"><span>用户名</span><input name="username" placeholder="请输入用户名" autoFocus required /></label>
          <label className="dialog-field"><span>昵称</span><input name="nickname" placeholder="请输入昵称" required /></label>
          <label className="dialog-field"><span>邮箱</span><input name="email" type="email" placeholder="请输入邮箱" required /></label>
          <label className="dialog-field"><span>员工编号</span><input name="employeeId" placeholder="选填" /></label>
          <label className="dialog-field"><span>联系电话</span><input name="phone" type="tel" inputMode="numeric" placeholder="请输入联系电话" required /></label>
          <label className="dialog-field"><span>初始密码</span><input name="password" type="password" autoComplete="new-password" placeholder="请输入初始密码" required /></label>
          <label className="dialog-field platform-user-dialog__full"><span>组织角色</span><select name="organizationRole" defaultValue={activeCreationTab.defaultRole}>{activeCreationTab.roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}</select></label>
        </div>
        <footer><button className="secondary-action" type="button" onClick={() => setIsCreateDialogOpen(false)}>取消</button><button className="primary-action" type="submit">创建用户</button></footer>
      </form>
    </div> : null}
  </main>
}

function ManagerPermissionTreeNode({ node, selectedIds, onToggle, depth = 0 }: { node: ManagerPermissionNode; selectedIds: Set<string>; onToggle: (permissionIds: string[]) => void; depth?: number }) {
  const permissionIds = getManagerPermissionLeafIds([node])
  const isChecked = permissionIds.every((id) => selectedIds.has(id))
  const isPartial = !isChecked && permissionIds.some((id) => selectedIds.has(id))

  return <div className={`manager-role-dialog__node${depth === 0 ? ' manager-role-dialog__node--module' : ''}`}>
    <label><input type="checkbox" checked={isChecked} ref={(element) => { if (element) element.indeterminate = isPartial }} onChange={() => onToggle(permissionIds)} />{node.label}</label>
    {node.children?.length ? <div className="manager-role-dialog__children">{node.children.map((child) => <ManagerPermissionTreeNode key={child.id} node={child} selectedIds={selectedIds} onToggle={onToggle} depth={depth + 1} />)}</div> : null}
  </div>
}

function OrganizationRolePermissionDialog({ role, onClose, onSave }: { role: OrganizationRoleTemplate; onClose: () => void; onSave: (permissionIds: string[]) => void }) {
  const [selectedIds, setSelectedIds] = useState(() => new Set(role.managerPermissionIds))

  const togglePermissions = (permissionIds: string[]) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      const isSelected = permissionIds.every((id) => next.has(id))
      permissionIds.forEach((id) => isSelected ? next.delete(id) : next.add(id))
      return next
    })
  }

  return <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <form className="ledger-dialog platform-role-dialog manager-role-dialog" onSubmit={(event) => { event.preventDefault(); onSave([...selectedIds]) }}>
      <header><div><span className="eyebrow">manager_role</span><h3>编辑{role.name}权限</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={onClose}>×</button></header>
      <p className="manager-role-dialog__hint">配置 Manager 端模块、页面与操作权限。勾选父级可批量选择下属权限点，小组长默认仅通过登录校验，权限由此处按需开放。</p>
      <fieldset className="dialog-field platform-role-dialog__field"><legend>Manager 端后台权限</legend><div className="manager-role-dialog__permissions">{managerPermissionModules.map((module) => <ManagerPermissionTreeNode key={module.id} node={module} selectedIds={selectedIds} onToggle={togglePermissions} />)}</div></fieldset>
      <footer><button className="secondary-action" type="button" onClick={onClose}>取消</button><button className="primary-action" type="submit">保存权限</button></footer>
    </form>
  </div>
}

function PlatformRolesPage() {
  const [roleTab, setRoleTab] = useState<'organization' | 'business'>('organization')
  const [businessRoles, setBusinessRoles] = useState(initialPlatformRoles)
  const [editingBusinessRole, setEditingBusinessRole] = useState<PlatformRole | null>(null)
  const [organizationRoles, setOrganizationRoles] = useState(initialOrganizationRoles)
  const [editingOrganizationRole, setEditingOrganizationRole] = useState<OrganizationRoleTemplate | null>(null)

  const toggleRoleStatus = (id: string) => {
    setBusinessRoles((current) => current.map((role) => role.id === id ? { ...role, status: role.status === 'enabled' ? 'disabled' : 'enabled' } : role))
  }

  const saveRole = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingBusinessRole) return
    const name = editingBusinessRole.name.trim()
    if (!name) return
    const nextRole = { ...editingBusinessRole, name }
    setBusinessRoles((current) => nextRole.id ? current.map((role) => role.id === nextRole.id ? nextRole : role) : [...current, { ...nextRole, id: `role-${Date.now()}` }])
    setEditingBusinessRole(null)
  }

  return <main className="platform-admin-main platform-role-page" id="main-content" tabIndex={-1} aria-labelledby="platform-role-title">
    <header className="platform-role-page__header">
      <div>
        <h1 id="platform-role-title">角色管理</h1>
        <p>组织角色管理 Manager 端后台权限；业务角色管理生产端功能与数据权限。</p>
      </div>
    </header>

    <nav className="platform-role-tabs" aria-label="角色类型">
      <button type="button" className={roleTab === 'organization' ? 'active' : ''} onClick={() => setRoleTab('organization')}>组织角色</button>
      <button type="button" className={roleTab === 'business' ? 'active' : ''} onClick={() => setRoleTab('business')}>业务角色</button>
    </nav>

    {roleTab === 'organization' ? <section className="platform-organization-role-table" aria-label="组织角色列表">
      <div className="platform-organization-role-table__head" role="row"><span role="columnheader">组织角色</span><span role="columnheader">角色说明</span><span role="columnheader">Manager 端默认权限</span><span role="columnheader">操作</span></div>
      {organizationRoles.map((role) => <article className="platform-organization-role-table__row" key={role.id} role="row">
        <strong role="cell">{role.name}</strong><span role="cell">{role.description}</span><span role="cell" className={role.managerPermissionIds.length ? 'platform-organization-role-table__scope' : 'platform-organization-role-table__scope is-empty'}>{role.id === 'member' ? '固定无权限' : role.managerPermissionIds.length === allManagerPermissionIds.length ? 'Manager 端全部权限' : `${role.managerPermissionIds.length} 个权限点`}</span><div role="cell"><button type="button" disabled={role.id === 'member'} title={role.id === 'member' ? '组员角色不参与权限分配' : '编辑 Manager 端权限'} onClick={() => setEditingOrganizationRole({ ...role, managerPermissionIds: [...role.managerPermissionIds] })}><Pencil aria-hidden="true" />权限编辑</button></div>
      </article>)}
    </section> : <>
      <div className="platform-role-business-toolbar"><p>生产端的角色默认权限；商户管理员分配时可在团队、小组已开通模块内调整。</p><button className="module-management-page__create" type="button" onClick={() => setEditingBusinessRole({ id: '', name: '', teamIds: [], memberCount: 0, status: 'enabled', pageIds: [] })}><Plus aria-hidden="true" />新增角色</button></div>
      <section className="platform-role-table" aria-label="系统预设业务角色列表">
        <div className="platform-role-table__head" role="row"><span role="columnheader">角色名称</span><span role="columnheader">可用团队</span><span role="columnheader">成员数量</span><span role="columnheader">状态</span><span role="columnheader">操作</span></div>
        {businessRoles.map((role) => {
          const teamNames = availableTeams.filter((team) => role.teamIds.includes(team.id)).map((team) => team.name)
          return <article key={role.id} className="platform-role-table__row" role="row"><strong role="cell">{role.name}</strong><div className="platform-role-table__teams" role="cell">{teamNames.length === availableTeams.length ? <span>全部团队</span> : teamNames.map((name) => <span key={name}>{name}</span>)}</div><span role="cell">{role.memberCount}</span><span role="cell" className={role.status === 'enabled' ? 'module-status' : 'module-status is-disabled'}>{role.status === 'enabled' ? '启用' : '停用'}</span><div className="platform-role-table__actions" role="cell"><button type="button" onClick={() => setEditingBusinessRole({ ...role, teamIds: [...role.teamIds], pageIds: [...role.pageIds] })}><Pencil aria-hidden="true" />编辑</button><button type="button" onClick={() => toggleRoleStatus(role.id)}><Power aria-hidden="true" />{role.status === 'enabled' ? '停用' : '启用'}</button><button type="button" className="danger" disabled={role.status === 'enabled'} title={role.status === 'enabled' ? '请先停用角色后再删除' : '删除角色'} onClick={() => setBusinessRoles((current) => current.filter((item) => item.id !== role.id))}><Trash2 aria-hidden="true" />删除</button></div></article>
        })}
      </section>
    </>}

    {editingOrganizationRole ? <OrganizationRolePermissionDialog role={editingOrganizationRole} onClose={() => setEditingOrganizationRole(null)} onSave={(managerPermissionIds) => { setOrganizationRoles((current) => current.map((role) => role.id === editingOrganizationRole.id ? { ...role, managerPermissionIds } : role)); setEditingOrganizationRole(null) }} /> : null}
    {editingBusinessRole ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingBusinessRole(null)}>
      <form className="ledger-dialog platform-role-dialog" onSubmit={saveRole}>
        <header><div><span className="eyebrow">business_role</span><h3>{editingBusinessRole.id ? '编辑业务角色' : '新增业务角色'}</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setEditingBusinessRole(null)}>×</button></header>
        <label className="dialog-field"><span>角色名称</span><input value={editingBusinessRole.name} onChange={(event) => setEditingBusinessRole({ ...editingBusinessRole, name: event.target.value })} placeholder="例如：运营专员" required /></label>
        <fieldset className="dialog-field platform-role-dialog__field"><legend>可用团队</legend><div className="platform-role-dialog__options">{availableTeams.map((team) => <label key={team.id}><input type="checkbox" checked={editingBusinessRole.teamIds.includes(team.id)} onChange={() => setEditingBusinessRole({ ...editingBusinessRole, teamIds: editingBusinessRole.teamIds.includes(team.id) ? editingBusinessRole.teamIds.filter((id) => id !== team.id) : [...editingBusinessRole.teamIds, team.id] })} />{team.name}</label>)}</div></fieldset>
        <fieldset className="dialog-field platform-role-dialog__field"><legend>生产端页面权限</legend><p>角色默认可访问的生产端页面；实际可用范围仍受团队、小组模块授权限制。</p><div className="platform-role-dialog__permissions">{permissionPages.map((group) => <section key={group.group}><strong>{group.group}</strong>{group.items.map((page) => <label key={page.id}><input type="checkbox" checked={editingBusinessRole.pageIds.includes(page.id)} onChange={() => setEditingBusinessRole({ ...editingBusinessRole, pageIds: editingBusinessRole.pageIds.includes(page.id) ? editingBusinessRole.pageIds.filter((id) => id !== page.id) : [...editingBusinessRole.pageIds, page.id] })} />{page.label}</label>)}</section>)}</div></fieldset>
        <footer><button className="secondary-action" type="button" onClick={() => setEditingBusinessRole(null)}>取消</button><button className="primary-action" type="submit">保存</button></footer>
      </form>
    </div> : null}
  </main>
}

function BillingRulesPage() {
  const [activeModule, setActiveModule] = useState('全部')
  const [rules, setRules] = useState(initialBillingRules)
  const [editingRule, setEditingRule] = useState<BillingRule | null>(null)
  const displayedRules = rules.filter((rule) => activeModule === '全部' || rule.module === activeModule)

  const toggleRuleStatus = (id: string) => {
    setRules((current) => current.map((rule) => rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
  }

  const saveRule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingRule) return
    const workflow = editingRule.workflow.trim()
    const name = editingRule.name.trim()
    if (!workflow || !name) return
    const nextRule = { ...editingRule, workflow, name, parameter: editingRule.parameter.trim() || '—' }
    setRules((current) => nextRule.id ? current.map((rule) => rule.id === nextRule.id ? nextRule : rule) : [...current, { ...nextRule, id: `billing-rule-${Date.now()}` }])
    setEditingRule(null)
  }

  const createRule = () => {
    setEditingRule({ id: '', module: activeModule === '全部' ? '电商生图' : activeModule, workflow: '', name: '', mode: '固定值', fixedFee: 0, perSecondFee: 0, minimumFee: 0, enabled: true, parameter: '—' })
  }

  return <main className="platform-admin-main billing-rules-page" id="main-content" tabIndex={-1} aria-labelledby="billing-rules-title">
    <header className="billing-rules-page__header">
      <div>
        <h1 id="billing-rules-title">计费配置列表</h1>
        <p>配置各工作流的豌豆扣费规则</p>
      </div>
      <button className="billing-rules-page__create" type="button" onClick={createRule}><Plus aria-hidden="true" />新增配置</button>
    </header>

    <nav className="billing-rules-tabs" aria-label="按模块筛选计费配置">
      {billingModuleTabs.map((module) => <button key={module} className={activeModule === module ? 'active' : ''} type="button" onClick={() => setActiveModule(module)}>{module}</button>)}
    </nav>

    <section className="billing-rules-table-wrap" aria-label="工作流计费配置列表">
      <table className="billing-rules-table">
        <thead>
          <tr><th>模块</th><th>工作流</th><th>名称</th><th>计费模式</th><th>固定费用</th><th>每秒费用</th><th>最低条额</th><th>状态</th><th>参数化</th><th>操作</th></tr>
        </thead>
        <tbody>
          {displayedRules.map((rule) => <tr key={rule.id}>
            <td><span className="billing-module-chip">{rule.module}</span></td>
            <td><code>{rule.workflow}</code></td>
            <td className="billing-rules-table__name">{rule.name}</td>
            <td><span className="billing-mode-chip">{rule.mode}</span></td>
            <td>{rule.fixedFee}</td>
            <td>{rule.perSecondFee}</td>
            <td>{rule.minimumFee}</td>
            <td><label className="billing-rule-switch"><input type="checkbox" checked={rule.enabled} onChange={() => toggleRuleStatus(rule.id)} aria-label={`${rule.enabled ? '停用' : '启用'}${rule.name}计费规则`} /><span aria-hidden="true" /></label></td>
            <td>{rule.parameter === '—' ? <span className="billing-empty-parameter">—</span> : <button className="billing-parameter-chip" type="button" onClick={() => setEditingRule({ ...rule })}><ChevronRight aria-hidden="true" />{rule.parameter}</button>}</td>
            <td><div className="billing-rules-table__actions"><button type="button" title="编辑配置" aria-label={`编辑${rule.name}`} onClick={() => setEditingRule({ ...rule })}><Pencil aria-hidden="true" /></button><button className="danger" type="button" title="删除配置" aria-label={`删除${rule.name}`} onClick={() => window.confirm(`确定删除「${rule.name}」的计费配置吗？`) && setRules((current) => current.filter((item) => item.id !== rule.id))}><Trash2 aria-hidden="true" /></button></div></td>
          </tr>)}
        </tbody>
      </table>
      {displayedRules.length === 0 ? <p className="billing-rules-table__empty">该模块暂未配置工作流计费规则。</p> : null}
    </section>

    {editingRule ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingRule(null)}>
      <form className="ledger-dialog billing-rule-dialog" onSubmit={saveRule}>
        <header><div><span className="eyebrow">workflow_billing</span><h3>{editingRule.id ? '编辑计费配置' : '新增计费配置'}</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setEditingRule(null)}>×</button></header>
        <div className="billing-rule-dialog__grid">
          <label className="dialog-field"><span>模块</span><select value={editingRule.module} onChange={(event) => setEditingRule({ ...editingRule, module: event.target.value })}>{billingModuleTabs.filter((module) => module !== '全部').map((module) => <option key={module} value={module}>{module}</option>)}</select></label>
          <label className="dialog-field"><span>计费模式</span><select value={editingRule.mode} onChange={(event) => setEditingRule({ ...editingRule, mode: event.target.value as BillingRule['mode'] })}><option value="固定值">固定值</option><option value="按时长">按时长</option></select></label>
          <label className="dialog-field"><span>工作流</span><input value={editingRule.workflow} onChange={(event) => setEditingRule({ ...editingRule, workflow: event.target.value })} placeholder="例如：custom_1773309105734" required /></label>
          <label className="dialog-field"><span>配置名称</span><input value={editingRule.name} onChange={(event) => setEditingRule({ ...editingRule, name: event.target.value })} placeholder="例如：FlowX Pro文/图生图" required /></label>
          <label className="dialog-field"><span>固定费用（豌豆）</span><input type="number" min="0" value={editingRule.fixedFee} onChange={(event) => setEditingRule({ ...editingRule, fixedFee: Number(event.target.value) })} /></label>
          <label className="dialog-field"><span>每秒费用（豌豆）</span><input type="number" min="0" value={editingRule.perSecondFee} onChange={(event) => setEditingRule({ ...editingRule, perSecondFee: Number(event.target.value) })} /></label>
          <label className="dialog-field"><span>最低条额（豌豆）</span><input type="number" min="0" value={editingRule.minimumFee} onChange={(event) => setEditingRule({ ...editingRule, minimumFee: Number(event.target.value) })} /></label>
          <label className="dialog-field"><span>参数化字段</span><input value={editingRule.parameter === '—' ? '' : editingRule.parameter} onChange={(event) => setEditingRule({ ...editingRule, parameter: event.target.value })} placeholder="无参数化可留空" /></label>
        </div>
        <label className="billing-rule-dialog__status"><input type="checkbox" checked={editingRule.enabled} onChange={(event) => setEditingRule({ ...editingRule, enabled: event.target.checked })} />启用该计费规则</label>
        <footer><button className="secondary-action" type="button" onClick={() => setEditingRule(null)}>取消</button><button className="primary-action" type="submit">保存配置</button></footer>
      </form>
    </div> : null}
  </main>
}

function BillingPackagesPage() {
  const [packages, setPackages] = useState(initialBillingPackages)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set())
  const [editingPackage, setEditingPackage] = useState<BillingPackage | null>(null)

  const toggleExpanded = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const togglePackageStatus = (id: string) => {
    setPackages((current) => current.map((item) => item.id === id ? { ...item, enabled: !item.enabled } : item))
  }

  const savePackage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingPackage) return
    const name = editingPackage.name.trim()
    const code = editingPackage.code.trim()
    if (!name || !code) return
    const nextPackage = { ...editingPackage, name, code }
    setPackages((current) => nextPackage.id ? current.map((item) => item.id === nextPackage.id ? nextPackage : item) : [...current, { ...nextPackage, id: `billing-package-${Date.now()}`, coverage: [{ id: `coverage-${Date.now()}`, module: '电商生图', workflow: '全部工作流', discount: nextPackage.discount }] }])
    setEditingPackage(null)
  }

  return <main className="platform-admin-main billing-packages-page" id="main-content" tabIndex={-1} aria-labelledby="billing-packages-title">
    <header className="billing-packages-page__header">
      <div>
        <h1 id="billing-packages-title">套餐列表</h1>
        <p>管理电商生图折扣套餐，点击行展开工作流覆盖配置</p>
      </div>
      <button className="billing-rules-page__create" type="button" onClick={() => setEditingPackage({ id: '', name: '', code: '', discount: 10, order: packages.length, enabled: true, coverage: [] })}><Plus aria-hidden="true" />新建套餐</button>
    </header>

    <section className="billing-packages-table-wrap" aria-label="计费套餐列表">
      <table className="billing-packages-table">
        <thead><tr><th aria-label="展开套餐" /><th>名称</th><th>编码</th><th>折扣率</th><th>排序</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>
          {[...packages].sort((a, b) => a.order - b.order).map((item) => {
            const isExpanded = expandedIds.has(item.id)
            return <Fragment key={item.id}>
              <tr className={isExpanded ? 'is-expanded' : ''}>
                <td><button className="billing-package-expand" type="button" aria-label={`${isExpanded ? '收起' : '展开'}${item.name}工作流覆盖`} aria-expanded={isExpanded} onClick={() => toggleExpanded(item.id)}><ChevronRight aria-hidden="true" /></button></td>
                <td className="billing-packages-table__name">{item.name}</td>
                <td><code>{item.code}</code></td>
                <td><span className="billing-package-discount">{item.discount.toFixed(1)}折</span></td>
                <td>{item.order}</td>
                <td><label className="billing-package-switch"><input type="checkbox" checked={item.enabled} onChange={() => togglePackageStatus(item.id)} aria-label={`${item.enabled ? '停用' : '启用'}${item.name}套餐`} /><span aria-hidden="true" /></label></td>
                <td><div className="billing-rules-table__actions"><button type="button" title="编辑套餐" aria-label={`编辑${item.name}`} onClick={() => setEditingPackage({ ...item, coverage: [...item.coverage] })}><Pencil aria-hidden="true" /></button><button className="danger" type="button" title="删除套餐" aria-label={`删除${item.name}`} onClick={() => window.confirm(`确定删除「${item.name}」套餐吗？`) && setPackages((current) => current.filter((packageItem) => packageItem.id !== item.id))}><Trash2 aria-hidden="true" /></button></div></td>
              </tr>
              {isExpanded ? <tr className="billing-package-coverage-row"><td colSpan={7}><section className="billing-package-coverage">
                <header><div><strong>工作流覆盖配置</strong><span>未单独配置时，工作流默认使用套餐折扣。</span></div><button type="button" onClick={() => window.alert('新增工作流覆盖项将在下一步接入。')}><Plus aria-hidden="true" />新增覆盖项</button></header>
                <div className="billing-package-coverage__head"><span>模块</span><span>工作流</span><span>折扣率</span></div>
                {item.coverage.map((coverage) => <div className="billing-package-coverage__row" key={coverage.id}><span>{coverage.module}</span><span>{coverage.workflow}</span><span>{coverage.discount.toFixed(1)}折</span></div>)}
              </section></td></tr> : null}
            </Fragment>
          })}
        </tbody>
      </table>
    </section>

    {editingPackage ? <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setEditingPackage(null)}>
      <form className="ledger-dialog billing-package-dialog" onSubmit={savePackage}>
        <header><div><span className="eyebrow">billing_package</span><h3>{editingPackage.id ? '编辑套餐' : '新建套餐'}</h3></div><button className="dialog-close" type="button" aria-label="关闭弹窗" onClick={() => setEditingPackage(null)}>×</button></header>
        <div className="billing-rule-dialog__grid">
          <label className="dialog-field"><span>套餐名称</span><input value={editingPackage.name} onChange={(event) => setEditingPackage({ ...editingPackage, name: event.target.value })} placeholder="例如：旗舰版" required /></label>
          <label className="dialog-field"><span>套餐编码</span><input value={editingPackage.code} onChange={(event) => setEditingPackage({ ...editingPackage, code: event.target.value })} placeholder="例如：flagship" required /></label>
          <label className="dialog-field"><span>折扣率</span><input type="number" min="0" max="10" step="0.1" value={editingPackage.discount} onChange={(event) => setEditingPackage({ ...editingPackage, discount: Number(event.target.value) })} required /></label>
          <label className="dialog-field"><span>排序</span><input type="number" min="0" value={editingPackage.order} onChange={(event) => setEditingPackage({ ...editingPackage, order: Number(event.target.value) })} required /></label>
        </div>
        <label className="billing-rule-dialog__status"><input type="checkbox" checked={editingPackage.enabled} onChange={(event) => setEditingPackage({ ...editingPackage, enabled: event.target.checked })} />启用该套餐</label>
        <footer><button className="secondary-action" type="button" onClick={() => setEditingPackage(null)}>取消</button><button className="primary-action" type="submit">保存套餐</button></footer>
      </form>
    </div> : null}
  </main>
}

export default function PlatformAdminPage() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handleHashChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <section className="platform-admin-page" aria-labelledby="platform-admin-title">
      <div className="platform-admin-layout">
        <nav className="platform-admin-nav" aria-label="平台管理模块">
          <div className="platform-admin-nav__head">
            <span>平台功能</span>
            <small>6 个一级模块</small>
          </div>
          {areas.map((area) => {
            const AreaIcon = area.icon
            const isActive = route.area.id === area.id
            return (
              <section key={area.id} className={isActive ? 'platform-admin-nav__group active' : 'platform-admin-nav__group'}>
                <button type="button" className="platform-admin-nav__area" aria-current={isActive ? 'page' : undefined} onClick={() => routeTo(area.id, area.pages[0].id)}>
                  <AreaIcon aria-hidden="true" />
                  <span>{area.title}</span>
                  <ChevronRight aria-hidden="true" />
                </button>
                {isActive ? (
                  <div className="platform-admin-nav__children">
                    {area.pages.map((page) => (
                      <button key={page.id} type="button" className={route.page.id === page.id ? 'active' : ''} aria-current={route.page.id === page.id ? 'page' : undefined} onClick={() => routeTo(area.id, page.id)}>
                        {page.title}
                      </button>
                    ))}
                  </div>
                ) : null}
              </section>
            )
          })}
        </nav>

        {route.page.id === 'function-permissions' ? <FunctionPermissionsPage /> : null}
        {route.page.id === 'merchant-teams' ? <TeamManagementPage /> : null}
        {route.page.id === 'users' ? <UserManagementPage /> : null}
        {route.page.id === 'platform-roles' ? <PlatformRolesPage /> : null}
        {route.page.id === 'billing-rules' ? <BillingRulesPage /> : null}
        {route.page.id === 'billing-packages' ? <BillingPackagesPage /> : null}
        {route.page.id !== 'function-permissions' && route.page.id !== 'merchant-teams' && route.page.id !== 'users' && route.page.id !== 'platform-roles' && route.page.id !== 'billing-rules' && route.page.id !== 'billing-packages' ? <main className="platform-admin-empty-workspace" id="main-content" tabIndex={-1} aria-labelledby="platform-admin-title"><h1 id="platform-admin-title" className="sr-only">平台管理工作区</h1></main> : null}
      </div>
    </section>
  )
}
