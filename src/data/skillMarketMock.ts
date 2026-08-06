export interface SkillCard {
  id: string
  name: string
  category: '日报' | '费用' | '库存' | '营销' | '财务' | '数据接入'
  description: string
  inputs: string[] // 输入参数示例
  outputs: string[] // 输出物示例
  invocations: number
  rating: number // 1-5
  status: 'official' | 'beta' | 'community'
  icon: string // lucide icon name
  peaCost: number // 单次调用豌豆消耗
}

export const skillCards: SkillCard[] = [
  {
    id: 'sk-daily-report',
    name: '多平台日报生成',
    category: '日报',
    description: '按平台与店铺拉取前一日数据，按经营事实表口径组装日报并产出可发布结果。',
    inputs: ['平台', '店铺', '业务日期'],
    outputs: ['日报 JSON', '字段映射核对表', '差异提示'],
    invocations: 1284,
    rating: 5,
    status: 'official',
    icon: 'FileText',
    peaCost: 320,
  },
  {
    id: 'sk-fee-diff',
    name: '平台费用差异排查',
    category: '费用',
    description: '比对平台账单与聚水潭费用口径，定位差异字段与金额，输出可追溯的差异清单。',
    inputs: ['平台', '业务日期范围'],
    outputs: ['差异明细表', '字段映射关系', '复核建议'],
    invocations: 612,
    rating: 5,
    status: 'official',
    icon: 'Scale',
    peaCost: 180,
  },
  {
    id: 'sk-profit-attribution',
    name: '利润归因分析',
    category: '财务',
    description: '按平台/店铺拆解利润同比与环比变化的主因，量化各费用项对利润的拖累或贡献。',
    inputs: ['平台', '店铺', '对比口径'],
    outputs: ['归因图表', '关键因子排序', '利润预警'],
    invocations: 489,
    rating: 4,
    status: 'beta',
    icon: 'TrendingUp',
    peaCost: 260,
  },
  {
    id: 'sk-promo-roi',
    name: '推广费 ROI 拆解',
    category: '营销',
    description: '汇总各推广计划的投放金额与对应 GMV，输出 ROI 排序与异常计划定位。',
    inputs: ['平台', '推广计划', '业务日期'],
    outputs: ['ROI 排序表', '异常计划清单', '优化建议'],
    invocations: 376,
    rating: 4,
    status: 'beta',
    icon: 'Target',
    peaCost: 220,
  },
  {
    id: 'sk-inventory-alert',
    name: '库存动销预警',
    category: '库存',
    description: '结合聚水潭实时库存与近 7 日动销，给出低库存/滞销/爆款三类预警与补货建议。',
    inputs: ['店铺', '品类'],
    outputs: ['预警列表', '补货建议', '动销曲线'],
    invocations: 248,
    rating: 4,
    status: 'beta',
    icon: 'PackageCheck',
    peaCost: 150,
  },
  {
    id: 'sk-field-mapping',
    name: '字段映射复核',
    category: '数据接入',
    description: '检查新接入 Excel 与经营事实表的字段映射关系，自动识别缺失/别名/口径冲突。',
    inputs: ['Excel 文件', '目标表'],
    outputs: ['映射表', '冲突清单', '人工确认待办'],
    invocations: 156,
    rating: 4,
    status: 'community',
    icon: 'Link2',
    peaCost: 80,
  },
  {
    id: 'sk-store-benchmark',
    name: '店铺经营对标',
    category: '财务',
    description: '在多店铺之间做经营指标对标，输出 GMV / 净利润率 / 费用率的排名与差异。',
    inputs: ['对比店铺', '指标', '周期'],
    outputs: ['对标表', '排名图', '差距分析'],
    invocations: 132,
    rating: 5,
    status: 'beta',
    icon: 'BarChart3',
    peaCost: 200,
  },
  {
    id: 'sk-refund-trace',
    name: '退款异常追溯',
    category: '财务',
    description: '汇总退款金额与笔数异常，定位到订单与平台规则，输出可追溯的异常清单。',
    inputs: ['平台', '业务日期范围'],
    outputs: ['异常订单表', '退款率曲线', '处理建议'],
    invocations: 88,
    rating: 3,
    status: 'community',
    icon: 'Undo2',
    peaCost: 120,
  },
]

export const skillCategoryLabels: Array<{ key: SkillCard['category'] | '全部'; label: string }> = [
  { key: '全部', label: '全部' },
  { key: '日报', label: '日报' },
  { key: '费用', label: '费用' },
  { key: '库存', label: '库存' },
  { key: '营销', label: '营销' },
  { key: '财务', label: '财务' },
  { key: '数据接入', label: '数据接入' },
]
