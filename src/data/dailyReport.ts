export type PeriodType = 'day' | 'week' | 'month' | 'year'

export type PlatformName = '总计' | '快手' | '爱库存' | '唯品会' | '好衣库'

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

export const reportData = [
  {
    "platform": "快手",
    "sourceSheet": "快手小店",
    "dates": [
      {
        "date": "2026-05-31",
        "label": "1日"
      },
      {
        "date": "2026-06-01",
        "label": "2日"
      },
      {
        "date": "2026-06-02",
        "label": "3日"
      },
      {
        "date": "2026-06-03",
        "label": "4日"
      },
      {
        "date": "2026-06-04",
        "label": "5日"
      },
      {
        "date": "2026-06-05",
        "label": "6日"
      },
      {
        "date": "2026-06-06",
        "label": "7日"
      },
      {
        "date": "2026-06-07",
        "label": "8日"
      },
      {
        "date": "2026-06-08",
        "label": "9日"
      },
      {
        "date": "2026-06-09",
        "label": "10日"
      },
      {
        "date": "2026-06-10",
        "label": "11日"
      },
      {
        "date": "2026-06-11",
        "label": "12日"
      },
      {
        "date": "2026-06-12",
        "label": "13日"
      },
      {
        "date": "2026-06-13",
        "label": "14日"
      },
      {
        "date": "2026-06-14",
        "label": "15日"
      },
      {
        "date": "2026-06-15",
        "label": "16日"
      },
      {
        "date": "2026-06-16",
        "label": "17日"
      },
      {
        "date": "2026-06-17",
        "label": "18日"
      },
      {
        "date": "2026-06-18",
        "label": "19日"
      },
      {
        "date": "2026-06-19",
        "label": "20日"
      },
      {
        "date": "2026-06-20",
        "label": "21日"
      },
      {
        "date": "2026-06-21",
        "label": "22日"
      },
      {
        "date": "2026-06-22",
        "label": "23日"
      },
      {
        "date": "2026-06-23",
        "label": "24日"
      },
      {
        "date": "2026-06-24",
        "label": "25日"
      },
      {
        "date": "2026-06-25",
        "label": "26日"
      },
      {
        "date": "2026-06-26",
        "label": "27日"
      },
      {
        "date": "2026-06-27",
        "label": "28日"
      },
      {
        "date": "2026-06-28",
        "label": "29日"
      },
      {
        "date": "2026-06-29",
        "label": "30日"
      },
      {
        "date": "2026-06-30",
        "label": "31日"
      }
    ],
    "rows": [
      {
        "category": "销售",
        "field": "平台销售",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 3884674.67,
        "monthTotal": 92805.27,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 11819.43
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 10371.62
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 11768.33
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 11666.07
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 11569.97
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 11966.97
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 10920.02
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 12722.86
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "销售",
        "field": "平台成交GMV",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 3885874.33,
        "monthTotal": 92805.27,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 11819.43
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 10371.62
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 11768.33
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 11666.07
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 11569.97
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 11966.97
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 10920.02
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 12722.86
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "销售",
        "field": "BD金额",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 1199.66,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "聚水潭-实发毛利",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 920434.57,
        "monthTotal": 27397.91,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 3926.96
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 3160.42
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 3679.11
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 3011.26
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 2778.26
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 4167.7
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 3059.53
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 3614.67
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "实发收入",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 2637499.04,
        "monthTotal": 76665.49,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 9705.31
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 8755.89
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 9203.36
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 9989.01
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 8487.92
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 11083.38
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 8880.58
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 10560.04
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "退货金额",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 703050,
        "monthTotal": 18487.5,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1805.81
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 2088.74
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 1050.54
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 3686.14
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 2342.66
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 2534.79
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 1914.27
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 3064.55
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "活动折扣",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "货品成本",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 1014014.47,
        "monthTotal": 30780.08,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 3972.54
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 3506.73
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 4473.71
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 3291.61
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 3367
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 4380.89
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 3906.78
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 3880.82
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "辅料摊销",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "平台费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 506045.21,
        "monthTotal": 13207.14,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1659.29
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 1659.08
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 1585.14
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 1367.94
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1491.06
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1956.1
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 1829.74
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 1658.79
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "技术服务费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 110836.54,
        "monthTotal": 2720.55,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 333.7
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 330.81
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 311.2
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 280.84
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 320.35
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 384.58
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 370.23
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 388.84
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "分账佣金",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 120025.05,
        "monthTotal": 4049.04,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 489.51
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 474.03
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 375.96
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 495.25
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 509.94
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 598.82
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 574.61
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 530.92
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "其他费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 180776.4,
        "monthTotal": 3325.08,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 431.58
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 459.64
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 487.18
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 278.88
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 313.27
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 446.67
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 446.9
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 460.96
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "退货补运费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 83606.99,
        "monthTotal": 2787.57,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 358
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 352
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 366
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 267.97
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 298
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 496.03
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 402
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 247.57
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "集运扣款（中转费）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 4730,
        "monthTotal": 223,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 37.5
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 26.5
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 27
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 36
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 37.5
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 21
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 21
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 16.5
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "消费者赔付",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 6070.23,
        "monthTotal": 101.9,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 9
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 16.1
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 17.8
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 9
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 12
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 9
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 15
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 14
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "磁力金牛推广",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "货款保证金扣款",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "推广费合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 160,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "BD佣金",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 160,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "运费合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 153816.25,
        "monthTotal": 5278.43,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 621.42
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 641.48
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 641.99
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 659.06
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 624.49
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 767.24
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 675.58
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 647.17
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "货品发货运费（预估）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 153778.25,
        "monthTotal": 5278.43,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 621.42
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 641.48
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 641.99
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 659.06
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 624.49
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 767.24
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 675.58
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 647.17
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "BD发货运费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 38,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "管理费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 104235.463,
        "monthTotal": 758.39,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 95.49
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 95.78
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 89.44
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 80.59
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 95.49
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 92.42
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 92.42
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 116.76
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "后台管理费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 32955.123,
        "monthTotal": 758.39,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 95.49
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 95.78
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 89.44
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 80.59
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 95.49
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 92.42
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 92.42
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 116.76
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "部门人员工资",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 70856.18,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "部门办公费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 424.16,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "其他费用支出",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 1579.91,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "售后红包支付",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "样品费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "其他销售费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 1579.91,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "财务费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "手续费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "利息费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "税金及附加",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 2000.7052,
        "monthTotal": 2000.7052,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 258.2151
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 227.93745
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 290.79115
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 213.95465
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 218.855
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 284.75785
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 253.9407
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 252.2533
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "税费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "预估成本税（6.5%）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 65910.94055,
        "monthTotal": 2000.7052,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 258.2151
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 227.93745
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 290.79115
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 213.95465
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 218.855
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 284.75785
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 253.9407
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 252.2533
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "返利（+）",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "平台返点",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "优惠券（BD）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "其他收益",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "利润",
        "field": "净利润",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 152597.0318,
        "monthTotal": 6153.24479999999,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1292.5449
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 536.14255
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 1071.74885
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 689.715350000001
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 348.365
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1067.18215
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 207.849299999999
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 939.6967
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "利润",
        "field": "利润率",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.0788839760803418,
        "monthTotal": 0.105765854062679,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.163623634407241
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.0804155523724529
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.131457440492983
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0.109428776097238
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.0566884069998666
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.124837212920493
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.0298363552583791
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.125368281459918
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "工资公摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 6594.32,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "租金公摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 3844.48,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "其他办公费公摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 3942.21,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "公摊后净利润",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 138216.0218,
        "monthTotal": 6153.24479999999,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1292.5449
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 536.14255
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 1071.74885
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 689.715350000001
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 348.365
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1067.18215
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 207.849299999999
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 939.6967
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "净利润率",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.0714498128107836,
        "monthTotal": 0.105765854062679,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.163623634407241
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.0804155523724529
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.131457440492983
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0.109428776097238
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.0566884069998666
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.124837212920493
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.0298363552583791
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.125368281459918
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "公摊后净利润同比",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 7,
        "monthTotal": 7,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 7
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 7
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 7
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 7
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 7
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 7
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 7
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 7
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "占比",
        "field": "推广占比（gmv）",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "占比",
        "field": "退货占比（gmv）",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.266559338728707,
        "monthTotal": 0.241145005399431,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.186064123660141
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.238552562903371
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.114147441803863
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0.369019552488185
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.275999302538195
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.228701894187513
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.215556866781224
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.290202499232957
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      }
    ]
  },
  {
    "platform": "爱库存",
    "sourceSheet": "爱库存",
    "dates": [
      {
        "date": "2026-05-31",
        "label": "1日"
      },
      {
        "date": "2026-06-01",
        "label": "2日"
      },
      {
        "date": "2026-06-02",
        "label": "3日"
      },
      {
        "date": "2026-06-03",
        "label": "4日"
      },
      {
        "date": "2026-06-04",
        "label": "5日"
      },
      {
        "date": "2026-06-05",
        "label": "6日"
      },
      {
        "date": "2026-06-06",
        "label": "7日"
      },
      {
        "date": "2026-06-07",
        "label": "8日"
      },
      {
        "date": "2026-06-08",
        "label": "9日"
      },
      {
        "date": "2026-06-09",
        "label": "10日"
      },
      {
        "date": "2026-06-10",
        "label": "11日"
      },
      {
        "date": "2026-06-11",
        "label": "12日"
      },
      {
        "date": "2026-06-12",
        "label": "13日"
      },
      {
        "date": "2026-06-13",
        "label": "14日"
      },
      {
        "date": "2026-06-14",
        "label": "15日"
      },
      {
        "date": "2026-06-15",
        "label": "16日"
      },
      {
        "date": "2026-06-16",
        "label": "17日"
      },
      {
        "date": "2026-06-17",
        "label": "18日"
      },
      {
        "date": "2026-06-18",
        "label": "19日"
      },
      {
        "date": "2026-06-19",
        "label": "20日"
      },
      {
        "date": "2026-06-20",
        "label": "21日"
      },
      {
        "date": "2026-06-21",
        "label": "22日"
      },
      {
        "date": "2026-06-22",
        "label": "23日"
      },
      {
        "date": "2026-06-23",
        "label": "24日"
      },
      {
        "date": "2026-06-24",
        "label": "25日"
      },
      {
        "date": "2026-06-25",
        "label": "26日"
      },
      {
        "date": "2026-06-26",
        "label": "27日"
      },
      {
        "date": "2026-06-27",
        "label": "28日"
      },
      {
        "date": "2026-06-28",
        "label": "29日"
      },
      {
        "date": "2026-06-29",
        "label": "30日"
      },
      {
        "date": "2026-06-30",
        "label": "31日"
      }
    ],
    "rows": [
      {
        "category": "销售",
        "field": "平台销售",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 395625.64,
        "monthTotal": 75319.17,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 7992.45
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 15888.55
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 11047.54
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 11367.93
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 6942.61
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 8245.13
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 8315.06
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 5519.9
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "销售",
        "field": "平台成交GMV",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 395625.64,
        "monthTotal": 75319.17,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 7992.45
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 15888.55
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 11047.54
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 11367.93
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 6942.61
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 8245.13
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 8315.06
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 5519.9
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "销售",
        "field": "BD金额",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "聚水潭-实发毛利",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 103984.23,
        "monthTotal": 17693.66,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1324.47
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 3476.57
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 4203.37
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 1786.26
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1087.64
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1975.52
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 2640.62
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 1199.21
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "实发收入",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 269237.54,
        "monthTotal": 50776.87,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 4649.93
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 8726.4
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 9007.66
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 7222.8
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 4480.29
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 6294.55
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 6282.87
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 4112.37
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "退货金额",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 45728.86,
        "monthTotal": 11749.14,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1510.97
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 591.13
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 408.69
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 2962.6
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1897.53
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1661.03
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 955.97
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 1761.22
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "营销活动优惠",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 12081.29,
        "monthTotal": 2276.98,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 194.08
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 474.72
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 229.5
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 377.68
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 298.77
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 326.96
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 252.87
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 122.4
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "货品成本",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 107443.16,
        "monthTotal": 19057.09,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1620.41
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 4183.98
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 4166.1
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 2096.26
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1196.35
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 2331.04
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 2433.41
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 1029.54
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "辅料成本",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "平台费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 16223.77,
        "monthTotal": 2585.7,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 160.76
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 394.87
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 326.63
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 360.52
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 388.63
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 191.31
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 189.92
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 573.06
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "品牌推广费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "交易手续费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 2267.89,
        "monthTotal": 430.68,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 45.83
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 90.1
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 62.27
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 66.79
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 39.89
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 45.87
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 48.05
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 31.88
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "运费险",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 5181,
        "monthTotal": 986.7,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 92.4
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 166.1
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 176
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 143
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 92.4
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 117.7
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 112.2
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 86.9
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "消费者赔付",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 121.11,
        "monthTotal": 22.19,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 5.69
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 16.5
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "商家直客",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 368,
        "monthTotal": 64,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 6
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 9
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 17
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 7
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 5
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 7
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 10
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 3
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "超品扣点费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 1634.37,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "其他扣费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 6651.4,
        "monthTotal": 1082.13,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 16.53
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 129.67
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 65.67
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 127.23
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 251.34
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 20.74
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 19.67
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 451.28
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "推广费合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "BD佣金",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "推广费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "运费合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 20069.95,
        "monthTotal": 3778.97,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 376.7
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 626.2
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 658.92
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 570.91
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 332.4
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 482.7
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 432.81
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 298.33
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "货品发货运费（预估）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 20069.95,
        "monthTotal": 3778.97,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 376.7
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 626.2
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 658.92
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 570.91
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 332.4
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 482.7
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 432.81
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 298.33
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "BD发货运费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "管理费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 17048.543,
        "monthTotal": 233.233,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 28.1421
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 26.5829
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 23.76
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 24.34
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 29.6599
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 25.262
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 40.0523
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 35.4338
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "后台管理费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 1027.443,
        "monthTotal": 233.233,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 28.1421
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 26.5829
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 23.76
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 24.34
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 29.6599
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 25.262
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 40.0523
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 35.4338
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "部门人员工资",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 15612.6,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "部门办公费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 408.5,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "其他费用支出",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 12072.05375,
        "monthTotal": 1653.78375,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 132.5196
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 344.72475
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 376.62615
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 174.7134
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 102.77955
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 193.7952
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 228.33135
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 100.29375
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "售后红包支付",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "样品费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "其他销售费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 4000,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "品牌服务费（4.5%）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 8072.05375,
        "monthTotal": 1653.78375,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 132.5196
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 344.72475
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 376.62615
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 174.7134
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 102.77955
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 193.7952
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 228.33135
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 100.29375
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "财务费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "手续费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "利息费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "税金及附加",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 6983.8054,
        "monthTotal": 1238.71085,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 105.32665
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 271.9587
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 270.7965
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 136.2569
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 77.76275
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 151.5176
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 158.17165
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 66.9201
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "税费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "预估成本税（6.5%）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 6983.8054,
        "monthTotal": 1238.71085,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 105.32665
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 271.9587
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 270.7965
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 136.2569
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 77.76275
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 151.5176
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 158.17165
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 66.9201
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "返利（+）",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "平台返点",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "优惠券（BD）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "其他收益",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "利润",
        "field": "净利润",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 31586.10785,
        "monthTotal": 8203.2624,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 521.02165
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 1812.23365
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 2546.63735
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 519.519700000001
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 156.4078
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 930.9352
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 1591.3347
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 125.17235
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "利润",
        "field": "利润率",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.141319378961032,
        "monthTotal": 0.210190610624804,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.165985437852027
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.222762569650423
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.296156091950547
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0.121947255997371
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.0605583948953834
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.200913171843437
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.298735606074828
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.0532387767688152
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "工资公摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 3110.02,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "租金公摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 2221.46,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "其他办公费公摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 2864.61,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "公摊后净利润",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 23390.01785,
        "monthTotal": 8203.2624,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 521.02165
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 1812.23365
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 2546.63735
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 519.519700000001
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 156.4078
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 930.9352
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 1591.3347
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 125.17235
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "净利润率",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.104649259482898,
        "monthTotal": 0.210190610624804,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.165985437852027
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.222762569650423
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.296156091950547
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0.121947255997371
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.0605583948953834
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.200913171843437
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.298735606074828
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.0532387767688152
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "公摊后净利润同比",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 7,
        "monthTotal": 7,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 7
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 7
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 7
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 7
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 7
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 7
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 7
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 7
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "占比",
        "field": "推广占比（gmv）",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "占比",
        "field": "退货占比（gmv）",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.17782519382671,
        "monthTotal": 0.242250858713288,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.339098039655733
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.0716375332053594
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.0465575929351937
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0.432804684212987
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.453789531079607
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.278341843189629
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.158535655058043
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.441411840189275
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      }
    ]
  },
  {
    "platform": "唯品会",
    "sourceSheet": "唯品会",
    "dates": [
      {
        "date": "2026-05-31",
        "label": "1日"
      },
      {
        "date": "2026-06-01",
        "label": "2日"
      },
      {
        "date": "2026-06-02",
        "label": "3日"
      },
      {
        "date": "2026-06-03",
        "label": "4日"
      },
      {
        "date": "2026-06-04",
        "label": "5日"
      },
      {
        "date": "2026-06-05",
        "label": "6日"
      },
      {
        "date": "2026-06-06",
        "label": "7日"
      },
      {
        "date": "2026-06-07",
        "label": "8日"
      },
      {
        "date": "2026-06-08",
        "label": "9日"
      },
      {
        "date": "2026-06-09",
        "label": "10日"
      },
      {
        "date": "2026-06-10",
        "label": "11日"
      },
      {
        "date": "2026-06-11",
        "label": "12日"
      },
      {
        "date": "2026-06-12",
        "label": "13日"
      },
      {
        "date": "2026-06-13",
        "label": "14日"
      },
      {
        "date": "2026-06-14",
        "label": "15日"
      },
      {
        "date": "2026-06-15",
        "label": "16日"
      },
      {
        "date": "2026-06-16",
        "label": "17日"
      },
      {
        "date": "2026-06-17",
        "label": "18日"
      },
      {
        "date": "2026-06-18",
        "label": "19日"
      },
      {
        "date": "2026-06-19",
        "label": "20日"
      },
      {
        "date": "2026-06-20",
        "label": "21日"
      },
      {
        "date": "2026-06-21",
        "label": "22日"
      },
      {
        "date": "2026-06-22",
        "label": "23日"
      },
      {
        "date": "2026-06-23",
        "label": "24日"
      },
      {
        "date": "2026-06-24",
        "label": "25日"
      },
      {
        "date": "2026-06-25",
        "label": "26日"
      },
      {
        "date": "2026-06-26",
        "label": "27日"
      },
      {
        "date": "2026-06-27",
        "label": "28日"
      },
      {
        "date": "2026-06-28",
        "label": "29日"
      },
      {
        "date": "2026-06-29",
        "label": "30日"
      },
      {
        "date": "2026-06-30",
        "label": "31日"
      }
    ],
    "rows": [
      {
        "category": "销售",
        "field": "平台销售",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 11078624,
        "monthTotal": 495477.14,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 71725.7199999999
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 59575.75
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 54648.53
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 64521.36
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 66440.74
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 60460
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 60193.45
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 57911.59
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "销售",
        "field": "平台成交GMV",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 11334047,
        "monthTotal": 506996.39,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 75501.9699999999
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 63019.75
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 54648.53
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 64521.36
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 68500.99
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 62698.75
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 60193.45
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 57911.59
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "销售",
        "field": "BD金额",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 255423,
        "monthTotal": 11519.25,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 3776.25
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 3444
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 2060.25
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 2238.75
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "聚水潭-实发毛利",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 1991898.157,
        "monthTotal": 102547.587,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 19286.0385
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 29738.105
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 8324.71649999999
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 2498.43050000001
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 8273.80449999999
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 15320.6975
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 11832.5475
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 7273.247
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "实发收入",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 23099306.97,
        "monthTotal": 1329842.25,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 171799.5
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 190900.5
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 141940.5
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 162953.25
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 177156
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 172998.75
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 161239.5
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 150854.25
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "退货金额",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 3802189.998,
        "monthTotal": 101399.278,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 15100.394
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 12603.95
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 10929.706
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 12904.272
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 13700.198
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 12539.75
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 12038.69
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 11582.318
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "活动折扣",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 12182570.915,
        "monthTotal": 857284.235,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 102601.8575
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 109731.405
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 93855.4875
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 114982.4175
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 119204.2575
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 110167.7025
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 105010.4625
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 101730.645
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "货品成本",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 5056981.19,
        "monthTotal": 268611.15,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 34811.21
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 38827.04
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 28830.59
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 32568.13
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 35977.74
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 34970.6
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 32357.8
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 30268.04
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "聚水潭-实发毛利",
        "field": "辅料成本",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 65666.71,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "平台费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 262448.84948,
        "monthTotal": 14846.34948,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 2163.88994
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 2742.6058
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 1486.21226
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 1402.66242
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1770.06178
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 2011.6519
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 1767.6139
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 1501.65148
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "会员保价",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 57633.88737,
        "monthTotal": 3711.58737,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 540.972485
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 685.65145
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 371.553065
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 350.665605
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 442.515445
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 502.912975
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 441.903475
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 375.41287
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "JIT费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 128015.21474,
        "monthTotal": 7423.17474,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 1081.94497
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 1371.3029
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 743.10613
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 701.33121
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 885.03089
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1005.82595
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 883.80695
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 750.82574
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "云仓费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 2966.56,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "平台费用",
        "field": "其他费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 73833.18737,
        "monthTotal": 3711.58737,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 540.972485
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 685.65145
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 371.553065
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 350.665605
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 442.515445
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 502.912975
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 441.903475
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 375.41287
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "推广费合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 15312.06,
        "monthTotal": 488.01,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 216.19
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 131.82
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 65
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 75
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "BD佣金",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 9520,
        "monthTotal": 370,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 120
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 110
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 65
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 75
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "推广费",
        "field": "推广费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 5792.06,
        "monthTotal": 118.01,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 96.19
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 21.82
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "运费合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "货品发货运费（预估）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "运费",
        "field": "BD发货运费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "管理费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 992611.24,
        "monthTotal": 4488.48,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 561.06
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 561.06
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 561.06
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 561.06
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 561.06
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 561.06
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 561.06
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 561.06
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "后台管理费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "部门人员工资",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 801001.57,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "部门办公费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 82764.09,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "管理费用",
        "field": "仓库租金",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 108845.58,
        "monthTotal": 4488.48,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 561.06
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 561.06
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 561.06
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 561.06
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 561.06
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 561.06
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 561.06
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 561.06
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "其他费用支出",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 509647.63685,
        "monthTotal": 18557.93685,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 2704.862425
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 3428.25725
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 1857.765325
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 1753.328025
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 2212.577225
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 2514.564875
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 2209.517375
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 1877.06435
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "售后红包支付",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "样品费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "其他销售费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 144698.91,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "其他费用支出",
        "field": "品牌服务费5%（账单结算金额）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 364948.72685,
        "monthTotal": 18557.93685,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 2704.862425
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 3428.25725
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 1857.765325
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 1753.328025
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 2212.577225
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 2514.564875
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 2209.517375
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 1877.06435
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "财务费用合计",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": -269.93,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "手续费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 0,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "财务费用",
        "field": "利息费用",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": -269.93,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "税金及附加",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 79231.38,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "税金及附加",
        "field": "税费",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 79231.38,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "返利（+）",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 136071.07,
        "monthTotal": 6970.4,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 2411.63
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 2022.73
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1147.25
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1388.79
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "平台返点",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 16270,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "优惠券（BD）",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 119596.07,
        "monthTotal": 6970.4,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 2411.63
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 2022.73
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1147.25
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 1388.79
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "返利",
        "field": "其他收益",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 205,
        "monthTotal": 0,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "利润",
        "field": "净利润",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 268987.990669999,
        "monthTotal": 71137.21067,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 16051.666135
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 24897.09195
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 4419.67891499999
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": -1218.61994499999
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 4812.35549499999
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 11547.210725
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 7294.356225
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 3333.47117
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "利润",
        "field": "利润率",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.013939283835005,
        "monthTotal": 0.0579084355492572,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.102436233012076
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.13963866350751
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.0337352273050112
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": -0.00812148114064459
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.029441325643491
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.0719636213923806
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.0488895216118465
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.0239349818885258
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "工资分摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 35833.28,
        "monthTotal": 2601.66,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 849.54
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 1204.54
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 3.59
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 306.92
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 237.07
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "租金分摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 26518.71,
        "monthTotal": 1460.4,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 474.05
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 672.15
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 2.06
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 176.11
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 136.03
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "其他分摊",
        "isTotal": false,
        "valueType": "amount",
        "yearTotal": 28974.39,
        "monthTotal": 5284.52,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 5284.52
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "公摊后净利润",
        "isTotal": true,
        "valueType": "amount",
        "yearTotal": 137067.48067,
        "monthTotal": 21196.50067,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 4376.786135
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 15986.06195
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 4419.67891499999
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": -1218.61994499999
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 39.9354950000012
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 6530.740725
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 2387.816225
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 3333.47117
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 0
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 0
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 0
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 0
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 0
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 0
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 0
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 0
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 0
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 0
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 0
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 0
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 0
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 0
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 0
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 0
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 0
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 0
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 0
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 0
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 0
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 0
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 0
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "净利润率",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.00710300304801407,
        "monthTotal": 0.0172547697802288,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.0279311493646939
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.0896599622931571
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.0337352273050112
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": -0.00812148114064459
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.000244319837603569
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.0407003703438262
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.0160040433091483
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.0239349818885258
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "公摊净利润",
        "field": "公摊后净利润同比",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": -0.868259720762566,
        "monthTotal": 1.49794172978394,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 2.15465555730504
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 26.0548905449074
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 7
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 7
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 1.0022779531187
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": -0.201373739028395
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": -0.709549007773823
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 7
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "占比",
        "field": "推广占比（gmv）",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.000511031937665337,
        "monthTotal": 0.000232762998568885,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.00127400649281072
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.000346240662649408
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      },
      {
        "category": "占比",
        "field": "退货占比（gmv）",
        "isTotal": false,
        "valueType": "ratio",
        "yearTotal": 0.348289999762205,
        "monthTotal": 0.214575300346985,
        "daily": [
          {
            "date": "2026-05-31",
            "label": "1日",
            "value": 0.218221220470047
          },
          {
            "date": "2026-06-01",
            "label": "2日",
            "value": 0.15528015927737
          },
          {
            "date": "2026-06-02",
            "label": "3日",
            "value": 0.227299639362681
          },
          {
            "date": "2026-06-03",
            "label": "4日",
            "value": 0.269002461026708
          },
          {
            "date": "2026-06-04",
            "label": "5日",
            "value": 0.2364070070887
          },
          {
            "date": "2026-06-05",
            "label": "6日",
            "value": 0.199578878579097
          },
          {
            "date": "2026-06-06",
            "label": "7日",
            "value": 0.214100943840627
          },
          {
            "date": "2026-06-07",
            "label": "8日",
            "value": 0.235779071996039
          },
          {
            "date": "2026-06-08",
            "label": "9日",
            "value": 7
          },
          {
            "date": "2026-06-09",
            "label": "10日",
            "value": 7
          },
          {
            "date": "2026-06-10",
            "label": "11日",
            "value": 7
          },
          {
            "date": "2026-06-11",
            "label": "12日",
            "value": 7
          },
          {
            "date": "2026-06-12",
            "label": "13日",
            "value": 7
          },
          {
            "date": "2026-06-13",
            "label": "14日",
            "value": 7
          },
          {
            "date": "2026-06-14",
            "label": "15日",
            "value": 7
          },
          {
            "date": "2026-06-15",
            "label": "16日",
            "value": 7
          },
          {
            "date": "2026-06-16",
            "label": "17日",
            "value": 7
          },
          {
            "date": "2026-06-17",
            "label": "18日",
            "value": 7
          },
          {
            "date": "2026-06-18",
            "label": "19日",
            "value": 7
          },
          {
            "date": "2026-06-19",
            "label": "20日",
            "value": 7
          },
          {
            "date": "2026-06-20",
            "label": "21日",
            "value": 7
          },
          {
            "date": "2026-06-21",
            "label": "22日",
            "value": 7
          },
          {
            "date": "2026-06-22",
            "label": "23日",
            "value": 7
          },
          {
            "date": "2026-06-23",
            "label": "24日",
            "value": 7
          },
          {
            "date": "2026-06-24",
            "label": "25日",
            "value": 7
          },
          {
            "date": "2026-06-25",
            "label": "26日",
            "value": 7
          },
          {
            "date": "2026-06-26",
            "label": "27日",
            "value": 7
          },
          {
            "date": "2026-06-27",
            "label": "28日",
            "value": 7
          },
          {
            "date": "2026-06-28",
            "label": "29日",
            "value": 7
          },
          {
            "date": "2026-06-29",
            "label": "30日",
            "value": 7
          },
          {
            "date": "2026-06-30",
            "label": "31日",
            "value": 7
          }
        ]
      }
    ]
  }
] as PlatformReport[]

const haoyikuDates = reportData[0]?.dates ?? []

function haoyikuSeries(base: number, step: number) {
  return haoyikuDates.map((date, index) => ({
    ...date,
    value: index < 8 ? base + index * step : 0,
  }))
}

const _rawReportDataWithHaoyiku: PlatformReport[] = [
  ...reportData,
  {
    platform: '好衣库',
    sourceSheet: '好衣库',
    dates: haoyikuDates,
    rows: [
      {
        category: '销售',
        field: '平台成交GMV',
        isTotal: true,
        valueType: 'amount',
        yearTotal: 518600,
        monthTotal: 126800,
        daily: haoyikuSeries(12800, 460),
      },
      {
        category: '平台费用',
        field: '技术运营服务费',
        isTotal: true,
        valueType: 'amount',
        yearTotal: 20744,
        monthTotal: 5168,
        daily: haoyikuSeries(510, 18),
      },
      {
        category: '平台费用',
        field: '快递信息服务费',
        isTotal: true,
        valueType: 'amount',
        yearTotal: 6820,
        monthTotal: 1680,
        daily: haoyikuSeries(160, 7),
      },
      {
        category: '平台费用',
        field: '推广活动费',
        isTotal: true,
        valueType: 'amount',
        yearTotal: 25840,
        monthTotal: 6240,
        daily: haoyikuSeries(620, 22),
      },
      {
        category: '平台费用',
        field: '佣金',
        isTotal: true,
        valueType: 'amount',
        yearTotal: 15520,
        monthTotal: 3720,
        daily: haoyikuSeries(372, 13),
      },
      {
        category: '平台费用',
        field: '罚款',
        isTotal: true,
        valueType: 'amount',
        yearTotal: 3120,
        monthTotal: 744,
        daily: haoyikuSeries(74, 3),
      },
      {
        category: '平台费用',
        field: '消费者赔付',
        isTotal: true,
        valueType: 'amount',
        yearTotal: 6240,
        monthTotal: 1488,
        daily: haoyikuSeries(148, 5),
      },
    ],
  },
]

// ===== 虚拟数据扩展（7/1 ~ 7/22，基于 6 月数据模式生成）=====

// 确定性伪随机（基于 sin 散列），保证每次刷新数据一致
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function generateVirtualDates(startDate: string, endDate: string, startLabel: number): Array<{ date: string; label: string }> {
  const dates: Array<{ date: string; label: string }> = []
  const start = new Date(startDate + 'T00:00:00')
  const end = new Date(endDate + 'T00:00:00')
  let labelDay = startLabel
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10)
    dates.push({ date: dateStr, label: `${labelDay}日` })
    labelDay++
  }
  return dates
}

function generateVirtualDaily(
  row: ReportRow,
  virtualDates: Array<{ date: string; label: string }>,
  platformSeed: number,
  fieldSeed: number
): DailyPoint[] {
  // 取现有非零日均值作为基准
  const existingValues = row.daily.map((d) => d.value)
  const nonZeroValues = existingValues.filter((v) => v > 0)
  const avg = nonZeroValues.length > 0
    ? nonZeroValues.reduce((s, v) => s + v, 0) / nonZeroValues.length
    : 0

  return virtualDates.map((date, i) => {
    if (avg === 0) return { ...date, value: 0 }

    const seed = platformSeed * 1000 + fieldSeed * 100 + i
    const r1 = pseudoRandom(seed)
    const r2 = pseudoRandom(seed + 0.5)

    // 随机波动 ±25%
    const variation = (r1 - 0.5) * 0.5
    // 周末效应 +10%~+20%
    const dayOfWeek = new Date(date.date + 'T00:00:00').getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const weekendBoost = isWeekend ? 1.1 + r2 * 0.1 : 1.0
    // 微弱增长趋势 +0.3%/天
    const trend = 1 + i * 0.003

    let value = avg * (1 + variation) * weekendBoost * trend

    if (row.valueType === 'ratio') {
      value = Math.max(0, Math.min(1, value))
    } else {
      value = Math.round(value * 100) / 100
    }

    return { ...date, value }
  })
}

function extendAllReports(reports: PlatformReport[]): PlatformReport[] {
  // 7/1 ~ 7/22，共 22 天虚拟数据（今天 7/23，数据到昨天）
  const virtualDates = generateVirtualDates('2026-07-01', '2026-07-22', 32)

  const platformSeeds: Record<string, number> = {
    '快手': 1,
    '爱库存': 2,
    '唯品会': 3,
    '好衣库': 4,
  }

  return reports.map((report) => {
    const platformSeed = platformSeeds[report.platform] ?? 5
    return {
      ...report,
      dates: [...report.dates, ...virtualDates],
      rows: report.rows.map((row, rowIdx) => {
        const virtualDaily = generateVirtualDaily(row, virtualDates, platformSeed, rowIdx)
        const virtualSum = virtualDaily.reduce((s, d) => s + d.value, 0)
        return {
          ...row,
          yearTotal: row.yearTotal + virtualSum,
          monthTotal: virtualSum,
          daily: [...row.daily, ...virtualDaily],
        }
      }),
    }
  })
}

export const reportDataWithHaoyiku: PlatformReport[] = extendAllReports(_rawReportDataWithHaoyiku)
