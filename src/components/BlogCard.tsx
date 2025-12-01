import Link from 'next/link';
import Image from 'next/image';
import { PostData } from '@/utils/posts';

interface BlogCardProps {
  post: PostData;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex flex-col h-full bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {post.thumbnail && (
        <Link href={`/blog/${post.id}`} className="block relative w-full h-48 overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      )}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
          {post.date}
        </span>
        {post.category && (
          <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30 rounded-full">
            {post.category}
          </span>
        )}
      </div>
      
      <Link href={`/blog/${post.id}`} className="group block mb-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {post.title}
        </h3>
      </Link>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
        {post.excerpt}
      </p>
      
      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <Link 
          href={`/blog/${post.id}`}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
        >
          Read more <span>→</span>
        </Link>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2">
             {/* Show only first tag to avoid clutter */}
             <span className="text-xs text-gray-500 dark:text-gray-400">#{post.tags[0]}</span>
          </div>
        )}
      </div>
      </div>
    </article>
  );
}
