import type { Plugin } from 'vite'

interface RemoveConsoleOptions {
  // 是否移除console.log
  log?: boolean
  // 是否移除console.warn
  warn?: boolean
  // 是否移除console.error
  error?: boolean
  // 是否移除console.info
  info?: boolean
  // 是否移除console.debug
  debug?: boolean
  // 是否移除所有console方法
  all?: boolean
  // 要保留的console方法
  exclude?: string[]
}

export function removeConsole(options: RemoveConsoleOptions = {}): Plugin {
  const {
    log = true,
    warn = false,
    error = false,
    info = true,
    debug = true,
    all = false,
    exclude = []
  } = options

  return {
    name: 'remove-console',
    apply: 'build', // 只在构建时应用
    transform(code, id) {
      // 只处理js/ts文件
      if (!/\.(js|ts|jsx|tsx)$/.test(id)) {
        return null
      }

      let transformedCode = code

      if (all) {
        // 移除所有console方法，除了exclude中指定的
        const excludePattern = exclude.length > 0 
          ? `(?<!console\\.)\\b(?!${exclude.join('|')})\\w+` 
          : '\\w+'
        const allConsoleRegex = new RegExp(
          `console\\.${excludePattern}\\s*\\([^)]*\\)(?:\\s*;)?`,
          'g'
        )
        transformedCode = transformedCode.replace(allConsoleRegex, '')
      } else {
        // 根据选项移除特定的console方法
        const methodsToRemove = []
        if (log) methodsToRemove.push('log')
        if (warn) methodsToRemove.push('warn')
        if (error) methodsToRemove.push('error')
        if (info) methodsToRemove.push('info')
        if (debug) methodsToRemove.push('debug')

        if (methodsToRemove.length > 0) {
          const methodPattern = methodsToRemove.join('|')
          const consoleRegex = new RegExp(
            `console\\.(${methodPattern})\\s*\\([^)]*\\)(?:\\s*;)?`,
            'g'
          )
          transformedCode = transformedCode.replace(consoleRegex, '')
        }
      }

      // 如果代码有变化，返回变化后的代码
      if (transformedCode !== code) {
        return {
          code: transformedCode,
          map: null // 可以生成source map，但这里简化处理
        }
      }

      return null
    }
  }
}