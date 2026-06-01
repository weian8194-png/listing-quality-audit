# Amazon Listing LQI 与 CDQ 审计网站

这是一个可部署到公网的网站。用户打开网站后输入 ASIN，系统生成 Amazon DP 链接，并尝试读取标题、品牌、五点和部分参数，再输出 LQI 与 CDQ 审计建议。

## 本地预览

先配置 RapidAPI 密钥：

```bash
copy .env.example .env
```

然后把 `.env` 里的 `RAPIDAPI_KEY` 改成你的 RapidAPI key。不要把 `.env` 提交到 GitHub。

```bash
npm start
```

打开：

```text
http://127.0.0.1:8787
```

## 部署成所有人可访问的网站

### 方案 A：GitHub Pages

可以，只用 GitHub 就能发布公开网页。这个方案适合让所有人打开网页、输入 ASIN、生成 Amazon 链接、手动粘贴 Listing 内容并生成审计报告。

步骤：

1. 新建 GitHub 仓库并推送本项目。
2. 打开仓库 `Settings`。
3. 进入 `Pages`。
4. Source 选择 `GitHub Actions`。
5. 推送到 `main` 分支后，仓库会运行 `.github/workflows/pages.yml` 并生成公开网址。

注意：GitHub Pages 只能托管静态网页，不能运行 `/api/amazon`，所以不能自动读取 Amazon 页面。

### 方案 B：GitHub + Vercel

如果要保留“输入 ASIN 后自动读取 Amazon 标题、五点、参数”，推荐用 GitHub 存代码，再把仓库连接到 Vercel。项目已经包含 `vercel.json` 和 `api/amazon.js`，可以直接部署。

```bash
npm install -g vercel
vercel
vercel --prod
```

部署完成后，Vercel 会给出一个公网 HTTPS 链接，任何人都可以打开并输入 ASIN。

Vercel 里必须配置环境变量：

```text
RAPIDAPI_KEY=你的 RapidAPI key
AMAZON_COUNTRY=US
```

配置位置：`Project Settings` > `Environment Variables`。保存后重新部署一次。

## 重要说明

自动读取现在优先使用 RapidAPI Real-Time Amazon Data。RapidAPI 返回的数据通常包含 `product_title`、`about_product`、`product_information`、`product_details`、图片、价格、评分等字段；A+ 图片内嵌文字和视频脚本仍建议人工复核。
