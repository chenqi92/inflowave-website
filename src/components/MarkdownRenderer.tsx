import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../providers/ThemeProvider'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  const { theme } = useTheme()

  return (
    <div className={`prose prose-gray dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            const isInline = !language
            
            return !isInline ? (
              <SyntaxHighlighter
                style={theme === 'dark' ? (oneDark as any) : (oneLight as any)}
                language={language}
                PreTag="div"
                className="rounded-lg !mt-0 !mb-4"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            )
          },
        h1({ children }) {
          return (
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8 first:mt-0">
              {children}
            </h1>
          )
        },
        h2({ children }) {
          return (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-6">
              {children}
            </h2>
          )
        },
        h3({ children }) {
          return (
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 mt-4">
              {children}
            </h3>
          )
        },
        p({ children }) {
          return (
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {children}
            </p>
          )
        },
        ul({ children }) {
          return (
            <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">
              {children}
            </ul>
          )
        },
        ol({ children }) {
          return (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300">
              {children}
            </ol>
          )
        },
        li({ children }) {
          return (
            <li className="text-gray-700 dark:text-gray-300">
              {children}
            </li>
          )
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-primary-500 pl-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-r-lg mb-4 italic text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          )
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </table>
            </div>
          )
        },
        thead({ children }) {
          return (
            <thead className="bg-gray-50 dark:bg-gray-800">
              {children}
            </thead>
          )
        },
        tbody({ children }) {
          return (
            <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600">
              {children}
            </tbody>
          )
        },
        th({ children }) {
          return (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {children}
            </th>
          )
        },
        td({ children }) {
          return (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
              {children}
            </td>
          )
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors duration-200"
            >
              {children}
            </a>
          )
        },
        hr() {
          return <hr className="border-gray-200 dark:border-gray-700 my-6" />
        }
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer