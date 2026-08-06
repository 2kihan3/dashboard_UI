export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  attachments?: Array<{ name: string; type: string; size: string }>
  // 助手消息可选：附带产出文件，触发右侧预览
  producedFile?: {
    name: string
    type: 'report' | 'table' | 'chart'
    description: string
    rows?: Array<{ label: string; value: string; tone?: 'good' | 'alert' | 'neutral' }>
    bullets?: string[]
  }
}

export interface ChatSession {
  id: string
  title: string
  preview: string
  updatedAt: string
  pinned?: boolean
}

export interface QuickSkill {
  id: string
  name: string
  description: string
  icon: string // lucide icon name
}

export const chatSessions: ChatSession[] = [
  {
    id: 's-1',
    title: '7 月 13 日快手日报复核',
    preview: '快手 7/13 GMV 同比下滑 6.4%，主因推广费集中投放…',
    updatedAt: '14:08',
    pinned: true,
  },
  {
    id: 's-2',
    title: '唯品会费用差异排查',
    preview: '已锁定 7/13 唯品会技术运营服务费 1,501.65 元的来源批次…',
    updatedAt: '昨天',
  },
  {
    id: 's-3',
    title: '本周爱库存利润分析',
    preview: '爱库存本周利润环比 +18%，京倍店铺贡献率 58%…',
    updatedAt: '7/12',
  },
  {
    id: 's-4',
    title: '好衣库店铺接入规则确认',
    preview: '好衣库已配置技术运营服务费 / 快递信息服务费两项映射…',
    updatedAt: '7/10',
  },
  {
    id: 's-5',
    title: '抖店推广 ROI 归因',
    preview: '抖店近 7 天推广 ROI 1.82，信息流广告贡献 64%…',
    updatedAt: '7/8',
  },
  {
    id: 's-6',
    title: '得物店铺库存预警',
    preview: '得物 3 款主推 SKU 库存周转天数超 30 天，建议补货…',
    updatedAt: '7/6',
  },
  {
    id: 's-7',
    title: '6 月利润归因复盘',
    preview: '6 月整体利润率 12.3%，快手贡献 41%，唯品会贡献 29%…',
    updatedAt: '7/3',
  },
  {
    id: 's-8',
    title: '快手闪购店退款追溯',
    preview: '快手闪购店 7/1-7/5 退款率突增至 8.2%，已定位批次…',
    updatedAt: '7/1',
  },
]

export const quickSkills: QuickSkill[] = [
  { id: 'sk-1', name: '生成日报', description: '拉取指定平台与店铺前一日数据并组装日报', icon: 'FileText' },
  { id: 'sk-2', name: '费用差异排查', description: '比对平台费用与聚水潭口径，输出差异清单', icon: 'Scale' },
  { id: 'sk-3', name: '利润归因', description: '按平台/店铺拆解利润同比变化的主因', icon: 'TrendingUp' },
  { id: 'sk-4', name: '字段映射复核', description: '检查 Excel 字段与经营事实表的映射关系', icon: 'Link2' },
  { id: 'sk-5', name: '推广费 ROI', description: '汇总推广费投放与对应 GMV，输出 ROI', icon: 'Target' },
  { id: 'sk-6', name: '库存预警', description: '结合聚水潭库存与近 7 日动销给出预警', icon: 'PackageCheck' },
]

// 当前会话（s-1）的示例问答
export const currentSessionMessages: ChatMessage[] = [
  {
    id: 'm-1',
    role: 'user',
    content: '帮我看一下快手官方旗舰店 7 月 13 日的日报，重点说一下 GMV 和平台费用的同比变化。',
    attachments: [{ name: '快手_官方旗舰店_20260713.xlsx', type: 'excel', size: '38 KB' }],
  },
  {
    id: 'm-2',
    role: 'assistant',
    content:
      '已拉取快手官方旗舰店 7/13 日报，并与近 7 日均值和去年同期做对比。\n\n核心结论：\n• GMV 12,722.86 元，同比 -6.4%，环比 -3.1%，处于近 7 日低位；\n• 平台费用 1,658.79 元，同比 +9.8%，主因为品牌推广费集中投放；\n• 管理费用 116.76 元，与近 7 日均值持平；\n• 净利润率 71.4%，较前日 -2.1pp，需关注推广费 ROI。\n\n已生成《7/13 快手日报复核报告》，可在右侧预览或下载。',
    producedFile: {
      name: '7/13 快手日报复核报告',
      type: 'report',
      description: '快手官方旗舰店 · 2026-07-13 · 经营日报',
      rows: [
        { label: 'GMV', value: '¥ 12,722.86', tone: 'alert' },
        { label: '平台费用', value: '¥ 1,658.79', tone: 'alert' },
        { label: '管理费用', value: '¥ 116.76', tone: 'neutral' },
        { label: '净利润率', value: '71.4%', tone: 'alert' },
      ],
      bullets: [
        'GMV 同比 -6.4%，环比 -3.1%',
        '品牌推广费同比 +18.2%，是费用上升主因',
        '推广费 ROI 1.92，低于近 7 日均值 2.34',
        '建议复核 7/13 推广计划与素材',
      ],
    },
  },
  {
    id: 'm-3',
    role: 'user',
    content: '推广费 ROI 跌得比较多，能不能定位到是哪个计划导致的？',
  },
  {
    id: 'm-4',
    role: 'assistant',
    content:
      '已按计划粒度拆解 7/13 推广费与对应 GMV：\n\n• 「品牌专区-7 月」投放 612.40 元，ROI 1.41（近 7 日均值 2.18），是主要拖累项；\n• 「达人合作-7/13」投放 428.90 元，ROI 2.62，符合预期；\n• 「信息流-日常」投放 387.50 元，ROI 1.96，略低于均值。\n\n建议优先复核「品牌专区-7 月」的人群定向与素材，预计可挽回 ROI 0.5+。是否要我把这条结论写入待办？',
  },
]
