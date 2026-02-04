import { db } from '@/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default async function sitemap() {
  const baseUrl = 'https://www.jeckukas.org.in';

  // 1. Define your Static Pages (The permanent ones)
  const staticRoutes = [
    '',
    '/jec/about-jec',
    '/admission/Admission-Procedure',
    '/admission/Courses-Offered',
    '/admission/Fee-Structure',
    '/placement',
    '/contact',
    '/campus-life/video-gallery',
    '/blog',
    // Add any other main menu links here
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8, // Homepage gets highest priority
  }));

  // 2. Fetch Dynamic Blog Posts from Firebase
  let blogRoutes = [];
  try {
    const q = query(collection(db, 'blog_posts'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);

    blogRoutes = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // Use slug if available, otherwise fallback to ID (matching your page logic)
      const urlSlug = data.slug ? data.slug : doc.id;

      return {
        url: `${baseUrl}/blog/${urlSlug}`,
        lastModified: data.date ? new Date(data.date) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      };
    });
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
  }

  // 3. Combine them into one big list
  return [...staticRoutes, ...blogRoutes];
}