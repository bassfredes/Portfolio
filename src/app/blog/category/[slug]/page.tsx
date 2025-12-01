import { getPostsByCategorySlug, getAllCategories, slugify } from '@/utils/posts';
import Link from 'next/link';
import SectionContainer from '@/components/SectionContainer';
import SectionTitle from '@/components/SectionTitle';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionScrollHandler from '@/components/SectionScrollHandler';
import BlogCard from '@/components/BlogCard';

// Forzar generación estática y revalidación
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: slugify(category),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Try to find the original category name if possible, otherwise format the slug
  const allCategories = getAllCategories();
  const categoryName = allCategories.find(c => slugify(c) === slug) || 
    slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
  return {
    title: `${categoryName} - Blog | Bastian Fredes`,
    description: `Articles about ${categoryName}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const posts = getPostsByCategorySlug(slug);
  const categories = getAllCategories();
  
  // Find the display name for the current category
  const currentCategoryName = categories.find(c => slugify(c) === slug) || slug;

  return (
    <>
      <SectionScrollHandler />
      <Header />
      <main className="flex flex-col items-center w-full min-h-screen px-4 pt-20">
        <SectionContainer
          id="blog-category"
          className="w-full lg:max-w-6xl mx-auto text-left py-20 md:py-28 animate-fade-in mb-20 px-0 flex flex-col items-start bg-transparent border-none shadow-none"
          title={`Category: ${currentCategoryName}`}
          ariaLabel={`Blog posts in category ${currentCategoryName}`}
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
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm"
                  >
                    All Posts
                  </Link>
                  {categories.map((cat) => {
                    const catSlug = slugify(cat);
                    const isActive = catSlug === slug;
                    return (
                      <Link
                        key={cat}
                        href={`/blog/category/${catSlug}`}
                        className={`px-4 py-2 rounded-lg transition-colors font-medium text-sm ${
                          isActive 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {cat}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Posts Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Category: <span className="text-blue-600 dark:text-blue-400">{currentCategoryName}</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 col-span-full text-center py-12">
                    No posts found in this category.
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
