import { getAllPostIds, getPostData, getRelatedPosts, slugify } from '@/utils/posts';
import SectionContainer from '@/components/SectionContainer';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionScrollHandler from '@/components/SectionScrollHandler';
import BlogCard from '@/components/BlogCard';
import TableOfContents from '@/components/TableOfContents';
import Link from 'next/link';
import Image from 'next/image';
import "highlight.js/styles/github-dark.css";

// Forzar generación estática y revalidación
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: `${postData.title} | Bastian Fredes`,
    description: postData.excerpt,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const relatedPosts = getRelatedPosts(slug, postData.category);

  return (
    <>
      <SectionScrollHandler />
      <Header />
      <main className="flex flex-col items-center w-full min-h-screen px-4 pt-20 overflow-x-hidden">
        <div className="w-full mx-auto lg:max-w-7xl flex flex-col lg:flex-row gap-12 relative">
          <div className="w-full lg:w-auto lg:flex-1 min-w-0">
            <SectionContainer
              id="post"
              fullWidth
              disableXPadding
              className="w-full lg:max-w-4xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 flex flex-col items-start bg-transparent border-none shadow-none"
              ariaLabel={postData.title}
              role="article"
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
              >
                ← Back to blog
              </Link>

              <header className="mb-10 w-full">
                {postData.thumbnail && (
                  <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={postData.thumbnail}
                      alt={postData.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-4">
                  {postData.category && (
                    <Link
                      href={`/blog/category/${slugify(postData.category)}`}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors uppercase tracking-wider"
                    >
                      {postData.category}
                    </Link>
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-2">
                  {postData.date}
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                  {postData.title}
                </h1>
                {postData.author && (
                  <div className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <span>
                      By <span className="font-semibold">{postData.author}</span>
                    </span>
                    {postData.authorLink && (
                      <>
                        <span className="text-gray-400">•</span>
                        <a
                          href={postData.authorLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                          LinkedIn
                        </a>
                      </>
                    )}
                  </div>
                )}
              </header>

              <div
                className="prose prose-lg dark:prose-invert max-w-none w-full prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
              />
            </SectionContainer>
          </div>
          
          <div className="hidden lg:block relative w-64 shrink-0">
             <TableOfContents />
          </div>
          <div className="lg:hidden">
             <TableOfContents />
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <SectionContainer
            id="related-posts"
            fullWidth
            disableXPadding
            className="w-full md:max-w-3xl lg:max-w-4xl mx-auto text-left py-10 md:py-14 animate-fade-in mb-20 flex flex-col items-start bg-transparent border-none shadow-none"
            title="Related Posts"
            ariaLabel="Related Posts"
            role="complementary"
          >
            <SectionTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3 mb-8 text-gray-900 dark:text-white">
              <span className="w-2 h-2 bg-blue-700 dark:bg-blue-400 rounded-full animate-pulse"></span>
              <span>Related Posts</span>
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {relatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </SectionContainer>
        )}
      </main>
      <Footer />
    </>
  );
}
