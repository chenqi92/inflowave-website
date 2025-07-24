# GitHub Actions 部署配置

本文档说明了InfloWave网站项目的GitHub Actions自动化部署流程，以及console.log移除功能的验证机制。

## 🎯 工作流概述

### 1. 主要工作流 (`deploy.yml`)
- **触发条件**：推送到main分支或PR到main分支
- **功能**：构建、测试、部署
- **特点**：自动验证console.log移除

### 2. PR质量检查 (`pr-check.yml`)  
- **触发条件**：创建、更新PR
- **功能**：代码质量检查、构建测试
- **特点**：确保PR代码符合质量标准

## 🔧 Console.log 移除验证

### 自动验证机制
```yaml
- name: Verify console.log removal
  run: |
    echo "🔍 Checking if console.log was removed from build..."
    if grep -r "console\.log" dist/assets/ > /dev/null 2>&1; then
      echo "❌ ERROR: console.log found in build output!"
      grep -r "console\.log" dist/assets/ || true
      exit 1
    else
      echo "✅ SUCCESS: console.log successfully removed from production build"
    fi
```

### 验证流程
1. **构建阶段**：使用 `npm run build:prod` 确保生产模式
2. **环境变量**：设置 `NODE_ENV=production`
3. **自动检查**：扫描 `dist/assets/` 目录查找console.log
4. **结果反馈**：构建失败如果发现console.log

## 📋 工作流详细说明

### Build Job
```yaml
build:
  runs-on: ubuntu-latest
  strategy:
    matrix:
      node-version: [18.x, 20.x]  # 多版本测试
  
  steps:
    - name: Checkout repository
    - name: Setup Node.js
    - name: Install dependencies  
    - name: Run type check
    - name: Run linter
    - name: Build project (Production Mode)
      run: npm run build:prod  # 明确使用生产构建
    - name: Verify console.log removal  # 验证移除
    - name: Upload build artifacts
```

### Deploy Job (仅在主分支)
```yaml
deploy:
  needs: build
  runs-on: ubuntu-latest
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  
  steps:
    - name: Build for production
      run: npm run build:prod
    - name: Deploy to GitHub Pages
```

## 🚀 部署选项

### 1. GitHub Pages (默认)
- 自动部署到 `https://用户名.github.io/inflowave-website`
- 使用 GitHub Token 自动认证

### 2. Netlify (可选)
```yaml
- name: Deploy to Netlify
  run: |
    npm install -g netlify-cli
    netlify deploy --prod --dir=dist --auth=${{ secrets.NETLIFY_TOKEN }}
```

需要设置的Secrets：
- `NETLIFY_TOKEN`
- `NETLIFY_SITE_ID`

### 3. Vercel (可选)
```yaml
- name: Deploy to Vercel  
  run: |
    npm install -g vercel
    vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

需要设置的Secret：
- `VERCEL_TOKEN`

## ⚙️ 环境配置

### 必需的Repository Secrets
- `GITHUB_TOKEN` (自动提供)
- `NETLIFY_TOKEN` (如果部署到Netlify)
- `NETLIFY_SITE_ID` (如果部署到Netlify)  
- `VERCEL_TOKEN` (如果部署到Vercel)

### 环境变量
```yaml
env:
  NODE_ENV: production  # 确保生产模式
```

## 🔍 监控和日志

### 构建日志示例
```
🔍 Checking if console.log was removed from build...
✅ SUCCESS: console.log successfully removed from production build

📊 Bundle size analysis:
2.1M    dist/
📁 Asset sizes:
-rw-r--r-- 1 runner docker 904K Jan 15 10:30 index-BLr4EbGY.js
-rw-r--r-- 1 runner docker  46K Jan 15 10:30 index-D9tJTUdu.css
```

### 失败示例
```
❌ ERROR: console.log found in build output!
dist/assets/index-ABC123.js:console.log("debug message")
```

## 🛠️ 本地测试

在推送到GitHub之前，可以本地验证：

```bash
# 构建生产版本
npm run build:prod

# 验证console.log移除
./deploy.sh

# 或手动检查
grep -r "console\.log" dist/assets/ || echo "console.log已移除"
```

## 📈 性能监控

工作流还包括：
- **Bundle大小分析**：监控打包后的文件大小
- **构建时间统计**：跟踪构建性能  
- **多Node版本测试**：确保兼容性

## 🚨 故障排除

### 常见问题

1. **console.log未移除**
   - 检查是否使用 `npm run build:prod`
   - 确认 `NODE_ENV=production`
   - 验证 `vite.config.ts` 配置

2. **构建失败**
   - 检查TypeScript类型错误
   - 验证ESLint规则
   - 确认依赖版本兼容性

3. **部署失败**
   - 检查Secrets配置
   - 验证目标平台设置
   - 确认权限配置

## 📚 相关文档

- [BUILD_OPTIMIZATION.md](./BUILD_OPTIMIZATION.md) - 构建优化详细说明
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [部署平台文档](../DEPLOYMENT.md)

---

通过这个配置，您可以确信在GitHub Actions中构建的项目会正确移除所有console.log语句，同时保持错误处理功能完整。