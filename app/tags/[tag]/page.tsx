import { getPosts, getTags } from "@/app/blog/get-posts"
import { PostCard } from "nextra-theme-blog"

export async function generateMetadata(props: { params: { tag: string } }) {
  const params = await props.params
  return {
    title: `Posts Tagged with “${decodeURIComponent(params.tag)}”`,
  }
}

export async function generateStaticParams() {
  const allTags = await getTags()
  return [...new Set(allTags)].filter((tag) => tag && typeof tag === "string").map((tag) => ({ tag }))
}

export default async function TagPage(props: { params: { tag: string } }) {
  const params = await props.params
  const { title } = await generateMetadata({ params })
  const posts = await getPosts()
  return (
    <>
      <h1>{title}</h1>
      {posts
        .filter(
          (post) =>
            post.frontMatter.tags &&
            Array.isArray(post.frontMatter.tags) &&
            post.frontMatter.tags.includes(decodeURIComponent(params.tag)),
        )
        .map((post) => (
          <PostCard key={post.route} post={post} />
        ))}
    </>
  )
}
