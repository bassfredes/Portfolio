import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';

// Usar __dirname alternativo para mejor compatibilidad con diferentes entornos
function getPostsDirectory(): string {
  // Intentar múltiples rutas para mayor robustez
  const possiblePaths = [
    path.join(process.cwd(), 'src/content/posts'),
    path.join(process.cwd(), 'src', 'content', 'posts'),
    path.resolve(__dirname, '../content/posts'),
    path.resolve(__dirname, '../../content/posts'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Fallback al path original
  return path.join(process.cwd(), 'src/content/posts');
}

const postsDirectory = getPostsDirectory();

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  thumbnail?: string;
  contentHtml?: string;
  author?: string;
  authorLink?: string;
  category?: string;
  tags?: string[];
  [key: string]: any;
}

export function getSortedPostsData(): PostData[] {
  try {
    // Crear directorio si no existe
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`[posts] Directory not found: ${postsDirectory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
    
    if (mdFiles.length === 0) {
      console.warn(`[posts] No markdown files found in: ${postsDirectory}`);
      return [];
    }

    const allPostsData = mdFiles.map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        ...(matterResult.data as { title: string; date: string }),
      };
    });
    
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error(`[posts] Error reading posts:`, error);
    return [];
  }
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
}

export function getAllCategories(): string[] {
  const posts = getSortedPostsData();
  const categories = new Set(posts.map(post => post.category).filter(Boolean) as string[]);
  return Array.from(categories);
}

export function getPostsByCategory(category: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter(post => post.category === category);
}

export function getPostsByCategorySlug(slug: string): PostData[] {
  const posts = getSortedPostsData();
  return posts.filter(post => post.category && slugify(post.category) === slug);
}

export function getAllPostIds() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`[posts] Directory not found for getAllPostIds: ${postsDirectory}`);
      return [];
    }
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.filter(fileName => fileName.endsWith('.md')).map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
  } catch (error) {
    console.error(`[posts] Error in getAllPostIds:`, error);
    return [];
  }
}

export async function getPostData(id: string): Promise<PostData> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Post not found: ${id}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkBreaks)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
      id,
      contentHtml,
      ...(matterResult.data as { title: string; date: string }),
    };
  } catch (error) {
    console.error(`[posts] Error getting post data for ${id}:`, error);
    throw error;
  }
}

export function getRelatedPosts(currentPostId: string, category?: string, limit: number = 3): PostData[] {
  const allPosts = getSortedPostsData();
  
  // Filter out current post
  let relatedPosts = allPosts.filter(post => post.id !== currentPostId);
  
  // If category is provided, prioritize posts in the same category
  if (category) {
    const categoryPosts = relatedPosts.filter(post => post.category === category);
    
    // If we have enough category posts, just use them
    if (categoryPosts.length >= limit) {
      return categoryPosts.slice(0, limit);
    }
    
    // If not enough category posts, we could fill with others, 
    // but for "related" it's often better to stick to the category 
    // or maybe tags if we implemented tag filtering.
    // For now, let's return what we found in the category, 
    // and if 0, maybe return recent posts as fallback?
    // The user said "filtre por la misma categoria o realice una generación dinamica pero con sentido"
    
    // Let's try to fill with posts that share tags if category is not enough?
    // Since I don't have the current post's tags passed in easily without reading it again or passing it,
    // I'll stick to: Category match -> Recent posts fallback.
    
    const otherPosts = relatedPosts.filter(post => post.category !== category);
    return [...categoryPosts, ...otherPosts].slice(0, limit);
  }
  
  return relatedPosts.slice(0, limit);
}
