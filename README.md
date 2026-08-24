# 与雪同归 · 神仙姐姐篇

这是可直接部署到 Vercel 的独立互动仙侠 Demo。根链接和 `/xianxia` 都只会进入“神仙姐姐”故事，不包含 Lotus 99 或李长寿入口。

## Vercel 部署

1. 解压后上传到 GitHub 仓库。
2. 在 Vercel 导入该仓库，Framework Preset 选择 **Next.js**。
3. 在 Project Settings → Environment Variables 添加：
   - `DEEPSEEK_API_KEY`：Kaon Router API Key
   - `STORY_MODEL`：`kaon/gemini-3.7-flash`
   - `STORY_FALLBACK_MODEL`：`kaon/deepseek-v4-flash`
4. 点击 Deploy。构建命令和输出目录使用 Vercel 的 Next.js 默认值，不要手动填写静态输出目录。

注意：API Key 不在本压缩包中，也不要提交到 GitHub。

## 本地运行

```bash
cp .env.example .env.local
npm install
npm run dev
```
