'use client';
import {
  RequireAuth, AdminLayout, Dashboard, DashboardWidget,
  StatCard, ProgressBreakdown, Button, Icon,
} from 'rdy-admin';

function Home() {
  const widgets: DashboardWidget[] = [
    {
      id: 'asset',
      span: 1,
      flush: true,
      node: <StatCard
        label="Стоимость склада"
        icon="wallet"
        tone="green"
        load={(api) => api.get('/products').then((res: any) => {
          const rows = res.items ?? [];
          return rows.reduce((sum: number, r: any) =>
            sum + (r.price ?? 0) * (r.stock ?? 0), 0
          );
        })}
        format={(v) => v.toLocaleString('ru-RU') + ' ₽'}
      />
    },
    {
      id: 'products',
      span: 1, flush: true,
      node: <StatCard
        label="Товаров"
        icon="box"
        tone="green"
        load={(api) => api.get('/products').then((res: any) => {
          return (res.items ?? []).length;
        })}
      />
    },
    {
      id: 'orders',
      span: 1,
      flush: true,
      node: <StatCard
        label="Заказов сегодня"
        icon="wallet"
        tone="amber"
        load={(api) => {
          const today = new Date().toISOString().slice(0, 10);
          return api.get('/orders').then((res: any) => {
            const items: any[] = res.items ?? (Array.isArray(res) ? res : []);
            return items.filter((o) => (o.createdAt ?? '').startsWith(today)).length;
          });
        }}
        refreshInterval={60_000}
      />
    },
    {
      id: 'revenue',
      span: 1,
      flush: true,
      node: <StatCard
        label="Выручка за месяц"
        icon="chart"
        tone="green"
        load={(api) => api.get('/orders').then((res: any) => {
          const items: any[] = res.items ?? (Array.isArray(res) ? res : []);
          const now = new Date();
          const thisMonth = now.toISOString().slice(0, 7);
          const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const prevMonth = prevDate.toISOString().slice(0, 7);
          const sumMonth = (month: string) =>
            items
              .filter((o) => (o.createdAt ?? '').startsWith(month))
              .reduce((acc, o) => acc + (o.totalPrice ?? o.total ?? o.amount ?? 0), 0);
          const thisRev = sumMonth(thisMonth);
          const prevRev = sumMonth(prevMonth);
          const pct = prevRev === 0 ? 0 : Math.round(((thisRev - prevRev) / prevRev) * 100);
          return { value: thisRev, delta: { value: `${Math.abs(pct)}%`, up: pct >= 0 } } as any;
        })}
        format={(v: any) => (typeof v === 'number' ? v : (v?.value ?? 0)).toLocaleString('ru-RU') + ' ₽'}
      />
    },

    {
      id: 'stock', span: 2, title: 'Остатки на складе',
      node: <ProgressBreakdown
        load={(api) => api.get('/products').then((res: any) => {
          const items: any[] = res.items ?? (Array.isArray(res) ? res : []);
          const inStock = items.filter((p) => (p.stock ?? 0) >= 4).length;
          const low = items.filter((p) => (p.stock ?? 0) > 0 && (p.stock ?? 0) < 4).length;
          const out = items.filter((p) => (p.stock ?? 0) === 0).length;
          return [
            { label: 'В наличии', value: inStock, color: 'var(--green)' },
            { label: 'Мало', value: low, color: 'var(--amber)' },
            { label: 'Нет', value: out, color: 'var(--red)' },
          ];
        })}
      />,
    },
    /*{
      id: 'activity', span: 2, title: 'Последние действия',
      action: <Button variant="ghost" size="sm">Все</Button>,
      // demo-данные. В будущем: <RecentActivity load={(api) => api.get('/activity')} />
      node: <RecentActivity items={[
        { title: 'Добавлен товар «Люстра Divinare»', meta: 'админ', time: '5 мин', icon: 'plus' },
        { title: 'Заказ #2632 переведён в «Выполнен»', meta: 'админ', time: '1 ч', icon: 'check' },
        { title: 'Обновлены остатки в категории «Освещение»', meta: 'система', time: '3 ч', icon: 'box' },
        { title: 'Загружены изображения товара', meta: 'админ', time: 'вчера', icon: 'layers' },
      ]} />,
    },*/
  ];

  return (
    <AdminLayout
      title="Дашборд"
      actions={''}
    >
      <Dashboard widgets={widgets} />
    </AdminLayout>
  );
}

export default function Page() {
  return <RequireAuth role="admin"><Home /></RequireAuth>;
}
/*<Button><Icon.plus size={16} /> Создать</Button>*/