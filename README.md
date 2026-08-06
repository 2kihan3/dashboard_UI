# 多平台经营数据看板

基于 React、TypeScript 和 Vite 的纯前端经营数据看板 Demo。当前内置静态日报数据，包含工作台、数据指标和数据台账。

## 本地运行

```bash
pnpm install
pnpm dev
```

本项目固定使用 `http://127.0.0.1:5173/`。端口被占用时会直接提示，不会自动切换端口。

## 校验与构建

```bash
pnpm lint
pnpm build
```

## GitHub Pages

推送到 `main` 后，GitHub Actions 会自动构建并部署静态站点。预览地址：

`https://2kihan3.github.io/dashboard_mvp/`
