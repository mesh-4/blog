import type { LoaderFunction, MetaFunction } from 'remix'
import { json, useCatch, useLoaderData, Link } from 'remix'
import { Heading, Button, Text, Box } from '@chakra-ui/react'

import { supabase } from '~/utils/supabase.server'
import type { Article } from '~/types.d'

import CommonLayout from '~/layouts/common'

import MarkdownRenderer from '~/components/markdown-renderer'

interface LoaderData {
  article: Article
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // take slug from url params
  const slug = params.slug

  // find article by slug
  const { data, error } = await supabase
    .from('article')
    .select()
    .filter('slug', 'eq', slug)
    .single()

  if (error) {
    console.log(error.message)
  }

  if (!data) throw new Response('Not Found', { status: 404 })
  return json<LoaderData>({ article: data })
}

const NOT_FOUND_META = {
  title: 'Article Not Found',
  description: 'Go back to home page',
}

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  const article = data?.article || NOT_FOUND_META

  return {
    title: `${article.title} | Senlima Sun's blog`,
    description: article.description || '',
    'og:image': 'https://assets.senlima.dev/blog-cover.png',
    'og:title': `${article.title} | Senlima Sun's blog`,
    'og:description': article.description || '',
    'og:url': `https://blog.senlima.dev/articles/${article.slug}`,
    'twitter:image': 'https://assets.senlima.dev/blog-cover.png',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@senlima4',
    'twitter:site': '@senlima4',
    'twitter:title': `${article.title} | Senlima Sun's blog`,
    'twitter:description': article.description || '',
  }
}

export default function Article() {
  const { article } = useLoaderData<LoaderData>()

  return (
    <CommonLayout>
      <Box
        w="90%"
        maxW={{ base: '375px', sm: '768px', md: '968px', lg: '1024' }}
        mx="auto"
      >
        <Heading as="h1" mt={4}>
          {article.title}
        </Heading>
        <Text as="h2" color="gray.600">
          {article.description}
        </Text>

        <Box as="main" mt={8}>
          {article.content && <MarkdownRenderer content={article.content} />}
        </Box>
      </Box>
    </CommonLayout>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <CommonLayout>
      <Box
        w="90%"
        maxW={{ base: '375px', sm: '768px', md: '968px', lg: '1024' }}
        mx="auto"
      >
        {caught.status === 404 ? (
          <>
            <Heading as="h1" my={4}>
              Not Found Article
            </Heading>
            <Link to="/">
              <Button mx="auto">Back to home page</Button>
            </Link>
          </>
        ) : (
          <>
            <Heading as="h1" my={4}>
              Something went wrong
            </Heading>
            <Text as="h2" color="gray.600">
              {caught.status}
            </Text>
            <Text as="h2" color="gray.600">
              {caught.data}
            </Text>
          </>
        )}
      </Box>
    </CommonLayout>
  )
}
