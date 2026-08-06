const fs = require('node:fs')
const path = require('node:path')
const XLSX = require('xlsx')

const sourceFile = '/Users/kyriecai/Desktop/日报.xlsx'
const outFile = path.join(__dirname, '..', 'src', 'data', 'dailyReport.ts')

const categoryStarts = new Map([
  ['平台销售', '销售'],
  ['聚水潭-实发毛利', '聚水潭-实发毛利'],
  ['平台费用合计', '平台费用'],
  ['推广费合计', '推广费'],
  ['运费合计', '运费'],
  ['管理费用合计', '管理费用'],
  ['其他费用支出', '其他费用支出'],
  ['财务费用合计', '财务费用'],
  ['税金及附加', '税金及附加'],
  ['返利（+）', '返利'],
  ['净利润', '利润'],
])

const totalRows = new Map([
  ['销售', '平台销售'],
  ['聚水潭-实发毛利', '聚水潭-实发毛利'],
  ['平台费用', '平台费用合计'],
  ['推广费', '推广费合计'],
  ['运费', '运费合计'],
  ['管理费用', '管理费用合计'],
  ['其他费用支出', '其他费用支出'],
  ['财务费用', '财务费用合计'],
  ['税金及附加', '税金及附加'],
  ['返利', '返利（+）'],
  ['利润', '净利润'],
])

const ratioFields = new Set([
  '销售同比',
  '利润率',
  '净利润率',
  '公摊后净利润同比',
  '推广占比（gmv）',
  '退货占比（gmv）',
])

function valueAt(sheet, r, c) {
  const cell = sheet[XLSX.utils.encode_cell({ r, c })]
  return cell ? cell.v : null
}

function asNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const normalized = value.replace(/,/g, '').trim()
    if (!normalized || normalized === '-' || normalized === ' -') return 0
    const num = Number(normalized)
    return Number.isFinite(num) ? num : null
  }
  return null
}

function addDays(date, days) {
  const copy = new Date(date.getTime())
  copy.setDate(copy.getDate() + days)
  return copy
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function displayName(name) {
  if (name === '快手小店') return '快手'
  return name
}

const workbook = XLSX.readFile(sourceFile, { cellDates: true })
const sheets = workbook.SheetNames.map((sheetName) => {
  const sheet = workbook.Sheets[sheetName]
  const range = XLSX.utils.decode_range(sheet['!ref'])
  const baseDateCell = valueAt(sheet, 0, 4)
  const baseDate = baseDateCell instanceof Date ? baseDateCell : new Date(baseDateCell)
  const dateColumns = []

  for (let c = 4; c <= range.e.c; c += 1) {
    const dayIndex = asNumber(valueAt(sheet, 1, c))
    if (!dayIndex) continue
    dateColumns.push({
      column: c,
      date: toDateKey(addDays(baseDate, dayIndex - 1)),
      label: `${dayIndex}日`,
    })
  }

  let currentCategory = ''
  const rows = []

  for (let r = 2; r <= range.e.r; r += 1) {
    const colA = valueAt(sheet, r, 0)
    const colB = valueAt(sheet, r, 1)
    const rowName = typeof colB === 'string' && colB.trim() ? colB.trim() : typeof colA === 'string' ? colA.trim() : ''
    if (!rowName || /^#/.test(rowName)) continue

    if (categoryStarts.has(rowName)) {
      currentCategory = categoryStarts.get(rowName)
    } else if (rowName === '工资公摊' || rowName === '工资分摊') {
      currentCategory = '公摊净利润'
    } else if (rowName === '推广占比（gmv）' || rowName === '退货占比（gmv）') {
      currentCategory = '占比'
    }

    if (!currentCategory) continue

    const yearTotal = asNumber(valueAt(sheet, r, 2))
    const monthTotal = asNumber(valueAt(sheet, r, 3))
    const daily = dateColumns.map(({ column, date, label }) => ({
      date,
      label,
      value: asNumber(valueAt(sheet, r, column)) ?? 0,
    }))

    rows.push({
      category: currentCategory,
      field: rowName,
      isTotal: totalRows.get(currentCategory) === rowName || ['净利润', '公摊后净利润'].includes(rowName),
      valueType: ratioFields.has(rowName) ? 'ratio' : 'amount',
      yearTotal: yearTotal ?? 0,
      monthTotal: monthTotal ?? 0,
      daily,
    })
  }

  return {
    platform: displayName(sheetName),
    sourceSheet: sheetName,
    dates: dateColumns.map(({ date, label }) => ({ date, label })),
    rows,
  }
})

const contents = `export type PeriodType = 'day' | 'week' | 'month' | 'year'

export type PlatformName = '总计' | ${sheets.map((sheet) => `'${sheet.platform}'`).join(' | ')}

export type MetricValueType = 'amount' | 'ratio'

export interface DailyPoint {
  date: string
  label: string
  value: number
}

export interface ReportRow {
  category: string
  field: string
  isTotal: boolean
  valueType: MetricValueType
  yearTotal: number
  monthTotal: number
  daily: DailyPoint[]
}

export interface PlatformReport {
  platform: Exclude<PlatformName, '总计'>
  sourceSheet: string
  dates: Array<{ date: string; label: string }>
  rows: ReportRow[]
}

export const reportData = ${JSON.stringify(sheets, null, 2)} as PlatformReport[]
`

fs.writeFileSync(outFile, contents)
console.log(`Generated ${outFile}`)
