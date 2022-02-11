import type { LoaderFunction } from 'remix'
import { useLoaderData, Link } from 'remix'
import { Box, Icon, Text, Flex, Button } from '@chakra-ui/react'
import { FiInbox } from 'react-icons/fi'
import { format } from 'date-fns'

import type { Article } from '~/types.d'
import { supabase } from '~/utils/supabase.server'
import DashboardFeatureLayout from '~/layouts/dashboard/feature'

interface LoaderData {
  articles: Article[]
  count: number
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { data, count } = await supabase
    .from('article')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: true })

  return { articles: data, count }
}

export default function ArticlesList() {
  const { articles, count } = useLoaderData<LoaderData>()

  return (
    <DashboardFeatureLayout title="Article List">
      <Text mb={4}>{count} articles</Text>

      <Box mb={4}>
        <Link to="/dashboard/articles/new">
          <Button size="sm">Create</Button>
        </Link>
      </Box>

      {articles.length === 0 && (
        <Flex
          w="full"
          py={5}
          align="center"
          justify="center"
          flexDir="column"
          color="gray.300"
        >
          <Icon mb={1} w={6} h={6} as={FiInbox} />
          <Text>No article</Text>
        </Flex>
      )}

      {articles.map(article => (
        <Box key={article.id} w="full" h="75px">
          <Link to={`/dashboard/articles/${article.id}`}>
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
          </Link>
        </Box>
      ))}
    </DashboardFeatureLayout>
  )
}
