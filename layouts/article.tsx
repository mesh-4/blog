import { Meta } from 'components/meta'
import { Footer } from 'components/footer'
import { Header } from 'components/header'

type Props = {
  children: React.ReactNode
}

export function ArticleLayout({ children }: Props) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main className="w-10/12 md:w-4/5 max-w-2xl mx-auto">
          <Header />
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}
