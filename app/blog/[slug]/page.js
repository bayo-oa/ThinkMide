import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { getPost } from '../../../lib/data'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)
  return { title: post ? `${post.title} | ThinkMide` : 'Post not found' }
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  return (
    <main className="article">
      <a className="back" href="/#blog">Back to all posts</a>
      <time>{post.date}</time>
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt="" />}
      {post.body?.length
        ? <PortableText value={post.body} />
        : <p>{post.excerpt}</p>}
    </main>
  )
}
