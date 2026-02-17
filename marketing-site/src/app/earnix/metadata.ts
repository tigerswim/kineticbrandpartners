// Metadata for Earnix unlisted page
// Prevents indexing and provides basic info for direct visits

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Earnix Strategic Insights | Dan Hoeller',
  description: 'Strategic marketing insights and recommendations for Earnix, focusing on product marketing, go-to-market excellence, and competitive positioning.',
  robots: {
    index: false, // Don't index this page
    follow: false, // Don't follow links
    noarchive: true,
    nocache: true,
  },
};
