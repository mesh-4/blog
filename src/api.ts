import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), '_posts')

export async function getPostSlugs() {
  return await fs.promises.readdir(postsDirectory)
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = await fs.promises.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach(field => {
    if (field === 'slug') items[field] = realSlug
    if (field === 'content') items[field] = content
    if (data[field]) items[field] = data[field]
  })

  return items
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async slug => await getPostBySlug(slug, fields))
  )

  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}
