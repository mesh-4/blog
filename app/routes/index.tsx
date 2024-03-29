import { format } from 'date-fns'
import { json, useLoaderData, Link } from 'remix'
import { Box, Text, Flex, Button, VStack, Heading } from '@chakra-ui/react'

import type { LoaderFunction } from 'remix'

import type { Article } from '~/types.d'
import { supabase } from '~/utils/supabase.server'

import CommonLayout from '~/layouts/common'

interface LoaderData {
  articles: Article[]
  count: number
  q: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')

  const query = supabase
    .from<Article>('article')
    .select('*', { count: 'exact' })
    .filter('is_public', 'eq', true)
    .order('created_at', { ascending: true })

  if (typeof q === 'string' && q.length > 0) query.textSearch('title', `'${q}'`)

  const { data, count } = await query
  return json<LoaderData>({ articles: data || [], count: count || 0, q: '' })
}

export default function ArticleList() {
  const { articles } = useLoaderData<LoaderData>()

  return (
    <CommonLayout>
      <Box
        mx="auto"
        w="90%"
        maxW={{ base: '375px', sm: '768px', md: '968px', lg: '1024' }}
      >
        <VStack as="header" mt={4} mb={6} spacing={2} align="flex-start">
          <Heading as="h1">Senlima Sun's Blog</Heading>
          <Text>一些隨筆, 可能大多和網頁開發相關</Text>
        </VStack>

        <Box as="main">
          <Heading mb={4} as="h2" size="lg">
            文章列表
          </Heading>

          {articles.length === 0 && (
            <Flex flexDir="column" align="center" justify="center" h="200px">
              <Text mb={2}>No articles found.</Text>
              <Link to="/">
                <Button size="sm" colorScheme="teal">
                  Back to home
                </Button>
              </Link>
            </Flex>
          )}

          {articles.length > 0 &&
            articles.map(article => (
              <Link key={article.id} to={`/articles/${article.slug}`}>
                <Box mb={2} w="full" h="75px">
                  <Flex p={1} h="full" flexDir="column">
                    <Text fontWeight="semibold" lineHeight="4">
                      {article.title}
                    </Text>
                    {article.description && (
                      <Text fontSize="sm">{article.description}</Text>
                    )}
                    <Text mt="auto" fontSize="xs" color="gray.500">
                      {format(new Date(article.created_at), 'yyyy-MM-dd')}
                    </Text>
                  </Flex>
                </Box>
              </Link>
            ))}
        </Box>
      </Box>
    </CommonLayout>
  )
}
