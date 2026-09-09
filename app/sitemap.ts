import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yashjangid.com';

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/#blogs-${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
