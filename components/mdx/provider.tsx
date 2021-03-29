import { ReactNode } from 'react'
import { MDXProvider as BaseProvider } from '@mdx-js/react'

import { components } from './components'

export function MDXProvider({ children }: { children: ReactNode }) {
  return <BaseProvider components={components}>{children}</BaseProvider>
}
