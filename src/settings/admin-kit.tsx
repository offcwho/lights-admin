'use client';
import { AdminKitProvider, AdminKitConfig, demoAuth } from 'rdy-admin';
import 'rdy-admin/styles.css';
import { auth } from '@/settings/auth';
import { storage } from '@/settings/storage';

const config: AdminKitConfig = {
  appName: 'Admin',
  brand: 'Свет.Ру Админ',
  logo: '',
  avatarKey: 'avatarUrl',
  backendUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000/api',
  navigation: [
    {
      items: [
        { href: '/', label: 'Дашборд', icon: 'home' },
      ]
    },
    {
      title: 'Управление', items: [
        { href: '/users', label: 'Пользователи', icon: 'users' },
        { href: '/reviews', label: 'Отзывы', icon: 'docs' },
        { href: '/support', label: 'Поддержка', icon: 'help'}
      ]
    },
    {
      title: 'Каталог', items: [
        { href: '/products', label: 'Товары', icon: 'box' },
        { href: '/categories', label: 'Категории', icon: 'grid' },
        { href: '/characteristics', label: 'Характеристики', icon: 'chart' }
      ]
    },
    {
      title: 'Финансы', items: [
        {
          href: '/orders',
          label: 'Заказы',
          icon: 'wallet',
          badge: (api: any) => api.get('/orders').then((res: any) =>
            res.items?.length ?? 0
          )
        },
        {
          href: '/promo-codes',
          label: 'Промокоды',
          icon: 'dots'
        }
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
  layout: { search: false, user: true, themeToggle: true, notifications: false },
  auth,
  storage,
  demo: false,
};

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return <AdminKitProvider config={config}>{children}</AdminKitProvider>;
}
