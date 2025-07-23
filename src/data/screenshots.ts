// Screenshot configuration for the application
export interface Screenshot {
  id: string
  filename: string
  title: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  category: 'interface' | 'features' | 'tools' | 'performance'
}

export const screenshots: Screenshot[] = [
  {
    id: 'main-interface',
    filename: '主界面.png',
    title: {
      en: 'Main Interface', 
      zh: '主界面'
    },
    description: {
      en: 'Clean and intuitive main interface with dark theme support',
      zh: '简洁直观的主界面，支持暗色主题'
    },
    category: 'interface'
  },
  {
    id: 'query-editor',
    filename: '可视化查询编辑器.png',
    title: {
      en: 'Visual Query Editor',
      zh: '可视化查询编辑器'
    },
    description: {
      en: 'Professional query editor with syntax highlighting and auto-completion',
      zh: '专业的查询编辑器，支持语法高亮和自动补全'
    },
    category: 'features'
  },
  {
    id: 'multi-connection',
    filename: '多连接管理.png',
    title: {
      en: 'Multi-Connection Management',
      zh: '多连接管理'
    },
    description: {
      en: 'Manage multiple InfluxDB connections simultaneously',
      zh: '同时管理多个 InfluxDB 连接'
    },
    category: 'features'
  },
  {
    id: 'advanced-charts',
    filename: '高级图表.png',
    title: {
      en: 'Advanced Charts',
      zh: '高级图表'
    },
    description: {
      en: 'Rich chart types for time-series data visualization',
      zh: '丰富的图表类型用于时序数据可视化'
    },
    category: 'features'
  },
  {
    id: 'data-import-export',
    filename: '数据导入导出.png',
    title: {
      en: 'Data Import/Export',
      zh: '数据导入导出'
    },
    description: {
      en: 'Easy data import and export with multiple format support',
      zh: '简单的数据导入导出，支持多种格式'
    },
    category: 'features'
  },
  {
    id: 'modern-ui',
    filename: '现代化界面.png',
    title: {
      en: 'Modern Interface',
      zh: '现代化界面'
    },
    description: {
      en: 'Beautiful and responsive user interface design',
      zh: '美观且响应式的用户界面设计'
    },
    category: 'interface'
  },
  {
    id: 'developer-tools',
    filename: '开发者工具.png',
    title: {
      en: 'Developer Tools',
      zh: '开发者工具'
    },
    description: {
      en: 'Comprehensive developer tools for database management',
      zh: '全面的开发者工具用于数据库管理'
    },
    category: 'tools'
  },
  {
    id: 'performance-monitoring',
    filename: '性能监控.png',
    title: {
      en: 'Performance Monitoring',
      zh: '性能监控'
    },
    description: {
      en: 'Real-time performance monitoring and optimization',
      zh: '实时性能监控和优化'
    },
    category: 'performance'
  },
  {
    id: 'high-performance',
    filename: '高性能.png',
    title: {
      en: 'High Performance',
      zh: '高性能'
    },
    description: {
      en: 'Optimized for handling large datasets efficiently',
      zh: '优化处理大数据集的高效性能'
    },
    category: 'performance'
  },
  {
    id: 'intelligent-hints',
    filename: '智能提示.png',
    title: {
      en: 'Intelligent Hints',
      zh: '智能提示'
    },
    description: {
      en: 'Smart suggestions and auto-completion features',
      zh: '智能建议和自动补全功能'
    },
    category: 'features'
  },
  {
    id: 'security-reliable',
    filename: '安全可靠.png',
    title: {
      en: 'Security & Reliability',
      zh: '安全可靠'
    },
    description: {
      en: 'Enterprise-grade security and reliability features',
      zh: '企业级安全和可靠性功能'
    },
    category: 'features'
  },
  {
    id: 'cross-platform',
    filename: '跨平台支持.png',
    title: {
      en: 'Cross-Platform Support',
      zh: '跨平台支持'
    },
    description: {
      en: 'Native desktop applications for Windows, macOS, and Linux',
      zh: '支持 Windows、macOS 和 Linux 的原生桌面应用'
    },
    category: 'interface'
  },
  {
    id: 'dangerous-operation-lock',
    filename: '危险操作锁定.png',
    title: {
      en: 'Dangerous Operation Protection',
      zh: '危险操作锁定'
    },
    description: {
      en: 'Safety locks for critical database operations',
      zh: '对关键数据库操作的安全保护'
    },
    category: 'features'
  },
  {
    id: 'large-data-loading',
    filename: '大数据量流畅加载.png',
    title: {
      en: 'Smooth Large Data Loading',
      zh: '大数据量流畅加载'
    },
    description: {
      en: 'Efficient handling of large datasets with smooth loading',
      zh: '高效处理大数据集，流畅加载'
    },
    category: 'performance'
  },
  {
    id: 'complete-user-guide',
    filename: '完整用户引导.png',
    title: {
      en: 'Complete User Guide',
      zh: '完整用户引导'
    },
    description: {
      en: 'Comprehensive user guidance and tutorials',
      zh: '全面的用户指导和教程'
    },
    category: 'features'
  }
]

// Get screenshots by category
export const getScreenshotsByCategory = (category: Screenshot['category']) => {
  return screenshots.filter(screenshot => screenshot.category === category)
}

// Get featured screenshots for homepage (first 6)
export const getFeaturedScreenshots = () => {
  return screenshots.slice(0, 6)
}