import { LoaderFunction, ActionFunction, redirect } from 'remix'
import { useLoaderData, useTransition, Form } from 'remix'
import { Box, Flex, Button } from '@chakra-ui/react'

import { supabase } from '~/utils/supabase.server'

import DashboardFeatureLayout from '~/layouts/dashboard/feature'

import DeleteBtn from '~/features/articles/delete-btn'
import EditorForm from '~/features/articles/editor-form'

export const action: ActionFunction = async ({ request, params }) => {
  const id = parseInt(params.id as string, 10)
  if (request.method === 'PUT') {
    const formData = await request.formData()

    const { data, error } = await supabase
      .from('article')
      .update(
        {
          slug: formData.get('slug'),
          title: formData.get('title'),
          content: formData.get('content'),
          description: formData.get('description'),
          is_public: formData.has('is_public'),
        },
        { returning: 'minimal' }
      )
      .match({ id })
      .single()

    return { data }
  }
  if (request.method === 'DELETE') {
    const { data, error } = await supabase
      .from('article')
      .delete()
      .match({ id })

    return redirect(`/dashboard/articles`, { status: 301 })
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { data, error } = await supabase
    .from('article')
    .select()
    .filter('id', 'eq', params.id)
    .single()

  return { article: data }
}

export default function ArticleEditor() {
  const loaderData = useLoaderData()

  return (
    <DashboardFeatureLayout title="Update Article">
      <Box mb={4}>
        <DeleteBtn articleId={loaderData.article.id} />
      </Box>
      <EditorForm data={loaderData.article} />
    </DashboardFeatureLayout>
  )
}
