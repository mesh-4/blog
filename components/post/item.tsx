import Link from 'next/link'

import Post from 'types/post'

type PropTypes = {
  post: Post
  isLast: boolean
}

export function PostItem({ post, isLast }: PropTypes) {
  const divideStyle = {
    borderBottom: '1px solid #8a8a8a',
  }

  return (
    <article className="py-6" style={isLast ? {} : divideStyle}>
      <Link href={`/posts/${post.slug}`}>
        <a>
          <h3 className="text-xl font-bold">{post.title}</h3>
        </a>
      </Link>
      <time className="text-sm text-gray-800">{post.date}</time>
      <section>{post.excerpt}</section>
    </article>
  )
}
