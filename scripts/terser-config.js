// Terser配置文件 - 用于生产环境优化
export const terserConfig = {
  compress: {
    // 移除console.log、console.info、console.debug
    drop_console: true,
    
    // 如果需要保留console.error和console.warn，使用这个配置
    // drop_console: false,
    // pure_funcs: [
    //   'console.log',
    //   'console.info', 
    //   'console.debug',
    //   'console.trace'
    // ],
    
    // 移除debugger语句
    drop_debugger: true,
    
    // 移除无用代码
    dead_code: true,
    
    // 移除无用的函数参数
    unused: true,
    
    // 优化passes数量
    passes: 2,
    
    // 移除无用的变量
    join_vars: true,
    
    // 压缩条件表达式
    conditionals: true,
    
    // 压缩布尔值
    booleans: true,
    
    // 移除无用的分号
    side_effects: false
  },
  
  format: {
    // 移除注释
    comments: false,
    
    // 使用ASCII码
    ascii_only: true,
    
    // 压缩输出
    beautify: false
  },
  
  mangle: {
    // 混淆变量名
    properties: false, // 不混淆属性名
    
    // 保留一些重要的名称
    reserved: [
      'console',
      'error', 
      'warn',
      'React',
      'ReactDOM',
      '__DEV__'
    ]
  }
}

// 针对不同环境的配置
export const getOptimizedTerserConfig = (env = 'production') => {
  if (env === 'development') {
    return {
      compress: false,
      mangle: false,
      format: {
        beautify: true,
        comments: true
      }
    }
  }
  
  if (env === 'staging') {
    return {
      ...terserConfig,
      compress: {
        ...terserConfig.compress,
        // staging环境保留console.warn和console.error用于调试
        drop_console: false,
        pure_funcs: [
          'console.log',
          'console.info', 
          'console.debug',
          'console.trace'
        ]
      }
    }
  }
  
  return terserConfig
}