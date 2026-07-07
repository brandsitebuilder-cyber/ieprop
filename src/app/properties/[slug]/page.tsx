import type { Metadata } from 'next';
import PropertyDetailClient from './PropertyDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ')} | ieProp`,
  };
}

export default function PropertyDetailPage() {
  return <PropertyDetailClient />;
}
