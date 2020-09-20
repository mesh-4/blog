import Head from "next/head";
import Link from "next/link";

import Post from "types/post";
import { getAllPosts } from "lib/api";
import { DefaultLayout } from "@layouts/default";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const articleBlock = {
    borderBottom: "1px solid #8a8a8a",
  };

  return (
    <>
      <DefaultLayout>
        <Head>
          <title>Senlima Sun's Blog</title>
        </Head>
        <header className="h-56 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold">Senlima Sun's Blog</h1>
            <h2>一些想法、點子和抱怨的聚集地</h2>
          </div>
        </header>
        <div className="w-4/5 max-w-2xl mx-auto">
          {allPosts &&
            allPosts.map((post, i) => (
              <article
                key={post.slug}
                className="py-6"
                style={i === allPosts.length - 1 ? {} : articleBlock}
              >
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                  </a>
                </Link>
                <time className="text-sm text-gray-600">{post.date}</time>
                <section>{post.excerpt}</section>
              </article>
            ))}
        </div>
      </DefaultLayout>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "content",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}
