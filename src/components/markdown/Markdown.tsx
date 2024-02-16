import ReactMarkdown from 'react-markdown'
import 'highlight.js/styles/github-dark.css'
import RehypeHighlight from 'rehype-highlight'
import RemarkGfm from 'remark-gfm'
import rehypeColorChips from 'rehype-color-chips'

export default function Markdown({ markdown }: { markdown: string }) {
  return (
    <div className="w-full overflow-hidden break-words rounded-md bg-neutral-50 p-4 dark:bg-neutral-800 sm:bg-neutral-100 sm:p-6 lg:p-8">
      <ReactMarkdown
        remarkPlugins={[RemarkGfm]}
        rehypePlugins={[RehypeHighlight, rehypeColorChips]}
        className="prose max-w-none dark:prose-invert"
        components={{
          h1: ({ node, children }) => <h1 className="dark:border-gray-700">{children}</h1>,
          h2: ({ node, children }) => <h2 className="dark:border-gray-700">{children}</h2>,
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <>
                <span className="absolute left-0 top-0 w-full select-none border-b border-neutral-500 bg-slate-700 px-2 py-0.5 text-sm dark:bg-neutral-700">
                  {match[1]}
                </span>
                <code className={className} {...props}>
                  {children}
                </code>
              </>
            ) : (
              <code className={`relative dark:bg-neutral-700`} {...props}>
                {children}
              </code>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
          a: ({ node, children, ...props }) => (
            <a
              {...props}
              target={props.href?.startsWith('/') ? undefined : '_blank'}
              rel={props.href?.startsWith('/') ? undefined : 'noopener noreferrer'}
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
