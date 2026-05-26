# Luo Yihan – Portfolio Website

雒艺涵的个人作品集网站，展示 AI 产品设计、VR 用户体验、交互设计与策展相关的工作经历与项目。

## 概览

- **站点类型**：个人作品集 / Portfolio
- **框架**：Next.js（静态导出）
- **样式**：Tailwind CSS
- **国际化**：中文 / English 双语支持，通过 `[lang]` 动态路由切换
- **版本**：2026.5

## 目录结构

```
website/
├── index.html            # 根入口，自动重定向至 /zh/
├── en/                   # 英文页面
│   ├── index.html        # 英文首页
│   ├── experience/       # 工作与教育经历详情页
│   ├── project/          # 项目详情页
│   ├── creation/         # 创作详情页
│   ├── writing/          # 写作详情页
│   └── resume/           # 简历页
├── zh/                   # 中文页面（结构同 en/）
├── _next/                # Next.js 静态资源（JS chunks、CSS）
├── assets/
│   ├── images/           # 项目图片（AI Music、Vemus、OMNI 等）
│   ├── personal/         # 个人相关 SVG 图标
│   └── favicon/          # 机构 Logo（TME、USC、清华、ArtCenter）
├── favicon/              # 站点图标与 Web Manifest
├── robots.txt
└── sitemap.xml
```

## 站点内容

### 经历 Experience

| 名称 | 时间 | 地点 | 类型 |
|------|------|------|------|
| 腾讯音乐娱乐 (QQ Music) | 2024.09 – 至今 | 深圳 | 全职 |
| USC World Building Media Lab | 2023.02 – 2024.05 | 洛杉矶 | 研究/设计 |
| Dora | 2022.05 – 2022.10 | 远程 | 产品设计 |
| 南加州大学 (USC) | 2022.08 – 2024.05 | 洛杉矶 | 研究生 |
| 清华大学未来实验室 | 2021.05 – 2022.01 | 北京 | 实习 |
| ArtCenter College of Design | 2019.01 – 2022.04 | 洛杉矶 | 本科 |

### 项目 Projects

- **QQ 音乐 AI 创作** – AI 唱作功能产品定位与核心交互设计
- **Vemus 未音** – 从 0 到 1 搭建的 AI 唱作独立 APP
- **World In A Cell** – USC VR 细胞生物学教育游戏
- **NeonCity VR Game** – USC 高阶游戏项目，担任 UI/UX 首席设计师
- **DORA 官网与产品体验** – 官网交互与早期 AI 产品调研

### 写作 Writing

- AI 协作式设计方法（Vibe Coding / AI Coding 工作流）
- IF: Inclusive Futures（出版物，2021）

### 创作 Creation

- 国际机器人与艺术设计双年展（策展人，2025）
- OMNI Art Expo 全球艺术高校作品联展（发起人/策展人，2021）

## 本地预览

本仓库为 Next.js 静态导出产物，可直接用任何静态文件服务器预览：

```bash
# 使用 npx
npx serve .

# 或使用 Python
python3 -m http.server 3000
```

然后访问 `http://localhost:3000`。

## 联系

- **Email**: luoyihan17@gmail.com
- **LinkedIn**: [Sakura Yihan Luo](https://www.linkedin.com/in/sakura-yihan-luo-a151451b1/)
