import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'posts')

export async function getFilenames() {
  return await fs.promises.readdir(postsDirectory)
}

export async function getAllPostSlugs() {
  const fileNames = await getFilenames()
  return fileNames.map(filename => {
    return {
      params: {
        slug: filename.replace('.mdx', ''),
      },
    }
  })
}

export async function getAllPosts() {
  const filenames = await getFilenames()
  const posts = await Promise.all(
    filenames.map(async filename => {
      const slug = filename.replace('.mdx', '')
      const fullPath = join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const { data } = matter(fileContents)

      return {
        slug,
        data,
      }
    })
  )

  return posts.sort((a, b) => {
    if (new Date(a.data.date) < new Date(b.data.date)) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPost(slug: string) {
  const fullPath = join(postsDirectory, `${slug}.mdx`)
  const postContent = await fs.promises.readFile(fullPath, 'utf8')
  const { data, content } = matter(postContent)

  return {
    data,
    content,
  }
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
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
