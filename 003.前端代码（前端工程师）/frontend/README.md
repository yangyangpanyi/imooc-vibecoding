# 财务管家 · 前端

基于「财务管家」UI 原型（`002.产品UI原型（美术设计）`）迁移的 Vue 3 前端实现。

## 技术栈

- Vue 3（Composition API，`<script setup>`）
- Vite 6
- Vue Router 4
- Pinia 2

## 目录结构

```
frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.js              # 入口
    ├── App.vue              # 根组件（含全局弹层 / toast）
    ├── router/index.js      # 路由 + 登录守卫
    ├── styles/main.css      # 全局样式与设计 token
    ├── data/mock.js         # mock 数据
    ├── utils/format.js      # 金额格式化
    ├── stores/              # Pinia 状态
    │   ├── auth.js          # 登录态
    │   ├── ledger.js        # 账务数据
    │   └── ui.js            # 弹层 / toast
    ├── components/          # 可复用组件
    │   ├── AppHeader.vue
    │   ├── AppTabbar.vue
    │   ├── AddSheet.vue     # 记账弹层
    │   ├── DonutChart.vue   # 环形图
    │   ├── LineChart.vue    # 折线图
    │   ├── TransactionItem.vue
    │   └── ToastMessage.vue
    └── views/               # 路由页面
        ├── LoginView.vue
        ├── HomeView.vue
        ├── BillsView.vue
        ├── MeView.vue
        └── StatsView.vue
```

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

> 说明：当前为 UI 原型迁移，登录/注册与账务数据均为前端 mock，未接后端接口。
