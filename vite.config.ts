import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
// import { removeConsole } from './vite-plugins/remove-console'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  
  return {
    plugins: [
      react(),
      // 如果需要使用自定义插件来移除console，可以启用下面的配置
      // ...(isProduction ? [removeConsole({
      //   log: true,      // 移除console.log
      //   info: true,     // 移除console.info
      //   debug: true,    // 移除console.debug
      //   warn: false,    // 保留console.warn
      //   error: false,   // 保留console.error
      // })] : [])
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    base: '/',
    build: {
      outDir: 'dist',
      sourcemap: !isProduction, // 开发环境生成sourcemap，生产环境不生成
      minify: isProduction ? 'terser' : false,
      ...(isProduction && {
        terserOptions: {
          compress: {
            // 移除console.log、console.info、console.debug
            drop_console: true,
            // 移除debugger语句
            drop_debugger: true,
            // 移除无用代码
            dead_code: true,
            // 移除无用的函数参数
            unused: true,
            // 移除无用的变量
            passes: 2
          },
          format: {
            // 移除注释
            comments: false
          },
          mangle: {
            // 混淆变量名，但保留一些重要的名称
            reserved: ['console', 'error', 'warn']
          }
        }
      }),
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['framer-motion', 'lucide-react'],
            i18n: ['react-i18next', 'i18next']
          }
        }
      }
    },
    server: {
      port: 3000,
      open: true
    }
  }
})