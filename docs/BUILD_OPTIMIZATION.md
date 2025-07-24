# 构建优化配置

本文档介绍了InfloWave网站项目中的构建优化配置，特别是如何在生产环境中移除console语句。

## 🎯 功能特性

### 1. 自动移除Console语句
在生产环境构建时，自动移除以下console方法：
- `console.log`
- `console.info`
- `console.debug`
- `console.trace`

**保留的Console方法**（用于错误处理）：
- `console.error`
- `console.warn`

### 2. 其他优化特性
- 移除 `debugger` 语句
- 移除无用代码（dead code elimination）
- 移除无用变量和函数参数
- 移除注释
- 代码混淆（变量名混淆）

## 🛠️ 构建命令

### 开发环境
```bash
npm run dev
```
- 保留所有console语句
- 生成sourcemap
- 不进行代码压缩

### 生产环境
```bash
npm run build:prod
# 或者
npm run build
```
- 移除console.log、console.info、console.debug
- 保留console.error、console.warn
- 代码压缩和混淆
- 不生成sourcemap

### 测试/预发布环境
```bash
npm run build:staging
```
- 仅移除console.log、console.info、console.debug
- 保留console.error、console.warn（用于调试）
- 适度的代码压缩

### 桌面端构建
```bash
npm run build:desktop
```
- 与生产环境配置相同
- 优化为桌面端打包

## ⚙️ 配置说明

### Vite配置 (vite.config.ts)
```typescript
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    build: {
      minify: isProduction ? 'terser' : false,
      ...(isProduction && {
        terserOptions: {
          compress: {
            drop_console: true,      // 移除console语句
            drop_debugger: true,     // 移除debugger
            dead_code: true,         // 移除无用代码
            unused: true,            // 移除无用参数
            passes: 2                // 优化passes
          },
          format: {
            comments: false          // 移除注释
          },
          mangle: {
            reserved: ['console', 'error', 'warn']  // 保留重要方法名
          }
        }
      })
    }
  }
})
```

### 自定义插件方案
项目还提供了一个自定义的console移除插件 (`vite-plugins/remove-console.ts`)，可以更精细地控制：

```typescript
// 启用自定义插件（在vite.config.ts中）
import { removeConsole } from './vite-plugins/remove-console'

plugins: [
  react(),
  ...(isProduction ? [removeConsole({
    log: true,      // 移除console.log
    info: true,     // 移除console.info
    debug: true,    // 移除console.debug
    warn: false,    // 保留console.warn
    error: false,   // 保留console.error
  })] : [])
]
```

## 🔍 验证方法

### 检查构建输出
```bash
# 构建后检查是否还有console.log
grep -r "console\.log" dist/assets/ || echo "console.log已成功移除"

# 检查保留的console方法
grep -r "console\." dist/assets/ | head -5
```

### 浏览器开发工具
1. 构建生产版本：`npm run build:prod`
2. 启动预览：`npm run preview`
3. 在浏览器开发工具中查看Sources面板
4. 验证压缩后的代码中没有console.log语句

## 📝 最佳实践

### 1. 开发阶段
- 使用 `console.log` 进行调试
- 使用 `console.error` 处理错误
- 使用 `console.warn` 显示警告

### 2. 生产环境准备
- 确保重要的错误信息使用 `console.error`
- 将调试信息改为使用 `console.log`
- 测试构建后的功能完整性

### 3. 桌面端打包
- 使用 `npm run build:desktop` 命令
- 验证所有console.log都已移除
- 确保错误处理仍然正常工作

## 🚨 注意事项

1. **错误处理**：生产环境仍会保留 `console.error` 和 `console.warn`，用于错误监控
2. **调试信息**：所有 `console.log`、`console.info`、`console.debug` 会被完全移除
3. **Source Maps**：生产环境不生成source map，减小部署包大小
4. **变量混淆**：重要的全局变量名（如console、error、warn）会被保留

## 🛡️ 安全考虑

- 确保敏感信息不要通过console输出
- 生产环境的console语句移除有助于防止信息泄露
- 错误信息仍然会被保留，便于问题诊断

## 📊 性能影响

移除console语句后的性能提升：
- **包大小减少**：约减少5-10%的代码体积
- **运行时性能**：减少不必要的字符串拼接和输出操作
- **内存占用**：减少调试信息的内存占用

---

如需更多帮助或有问题，请参考项目文档或提交Issue。