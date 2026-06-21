'use client';
import { AdminKitProvider, AdminKitConfig } from 'rdy-admin';
import 'rdy-admin/styles.css';
import { auth } from '@/settings/auth';
import { storage } from '@/settings/storage';

const config: AdminKitConfig = {
  appName: 'Admin',
  brand: 'Admin',
  backendUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000/api',
  navigation: [
    {
      items: [
        { href: '/', label: 'Дашборд', icon: 'home' },
      ]
    },
    {
      title: 'Каталог', items: [
        { href: '/products', label: 'Товары', icon: 'box' },
        { href: '/categories', label: 'Категории', icon: 'grid' },
      ]
    },
    {
      title: 'Финансы', items: [
        { href: '/orders', label: 'Заказы', icon: 'wallet', badge: 0 },
      ]
    },
    {
      title: 'Интерфейс', items: [
        {
          href: '/banner', label: "Банер главной страницы", icon: 'menu',
        }
      ]
    }
  ],
  theme: { mode: 'light', accent: '#3b5bfd', accent2: '#6d5efc' },
  layout: { search: true, user: true, themeToggle: true, notifications: true },
  auth,
  storage,
  demo: false,
};

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return <AdminKitProvider config={config}>{children}</AdminKitProvider>;
}
