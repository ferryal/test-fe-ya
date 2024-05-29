import type { Metadata } from 'next';

import HomeView from '@/layouts/home/home-view';

export const metadata: Metadata = {
  title: 'YouApp',
  description: 'Generated by create next app',
  icons: [
    {
      rel: 'icon',
      url: '/assets/image/android-icon-144x144.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/image/android-icon-144x144.png',
    },
  ],
};

export default function HomePage() {
  return <HomeView />;
}