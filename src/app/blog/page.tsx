import { getSortedPostsData, getAllCategories, slugify } from '@/utils/posts';
import Link from 'next/link';
import SectionContainer from '@/components/SectionContainer';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionScrollHandler from '@/components/SectionScrollHandler';
import BlogCard from '@/components/BlogCard';

// Forzar generación estática y revalidación para asegurar que los posts siempre se carguen
export const dynamic = 'force-static';
// export const revalidate = 3600; // Revalidar cada hora (Comentado para evitar uso excesivo de funciones, se actualizará al desplegar)

export const metadata = {
  title: 'Blog | Bastian Fredes',
  description: 'Articles about web development, software architecture, and technology.',
};

export default function Blog() {
  const allPostsData = getSortedPostsData();
  const categories = getAllCategories();

  return (
    <>
      <SectionScrollHandler />
      <Header />
      <main className="flex flex-col items-center w-full min-h-screen px-4 pt-20 overflow-x-hidden">
        <SectionContainer
          id="blog"
          fullWidth
          disableXPadding
          className="w-full md:max-w-5xl lg:max-w-6xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 flex flex-col items-start bg-transparent border-none shadow-none"
          title="Blog"
          ariaLabel="Blog posts"
          role="region"
        >
          <SectionTitle className="text-3xl md:text-4xl font-extrabold flex items-center gap-3 mb-12 text-gray-900 dark:text-white">
            <span className="w-2 h-2 bg-blue-700 dark:bg-blue-400 rounded-full animate-pulse"></span>
            <span>Blog</span>
          </SectionTitle>
          
          <div className="flex flex-col lg:flex-row gap-12 w-full">
            {/* Sidebar / Categories */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  <Link 
                    href="/blog"
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm"
                  >
                    All Posts
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog/category/${slugify(category)}`}
                      className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Posts Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allPostsData.length > 0 ? (
                  allPostsData.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 col-span-full text-center py-12">
                    No blog posts yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
