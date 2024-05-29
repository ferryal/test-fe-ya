import type { Metadata } from 'next';

import ProfileView from '@/layouts/home/profile-view';

export const metadata: Metadata = {
  title: 'YouApp - Dashboard',
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

export default function DashboardPage() {
  return <ProfileView />;
}
