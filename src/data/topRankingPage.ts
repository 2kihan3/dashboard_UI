export function topRankingPage<T>(rows: T[], requestedPage = 1, size = 10) {
  const ranked = rows.slice(0, 100)
  const pageSize = [10, 20, 50].includes(size) ? size : 10
  const pages = Math.max(1, Math.ceil(ranked.length / pageSize))
  const current = Math.max(1, Math.min(pages, Math.floor(requestedPage) || 1))
  const offset = (current - 1) * pageSize
  return { rows: ranked.slice(offset, offset + pageSize), total: ranked.length, pages, current, offset, size: pageSize }
}
