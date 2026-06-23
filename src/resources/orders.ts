import { createResource, TextColumn, BadgeColumn, TextInput, Textarea, TextEntry, BadgeEntry, MoneyEntry, DateEntry, Button } from 'rdy-admin';

export interface OrderItem { name: string; qty: number; price: number }
export interface Order {
  id: string;
  userId: string;
  user?: { name: string; email: string };
  items: OrderItem[];
  total: number;
  status: 'new' | 'shipped' | 'sent' | 'completed' | 'cancelled';
  shippingAddress?: string;
  phone?: string;
  createdAt: string;
}

const COLORS = { new: 'gray', paid: 'amber', shipped: 'green', completed: 'green', cancelled: 'red' } as const;
const LABELS = { new: 'Новый', paid: 'Сборка', shipped: 'Отгружен', completed: 'Доставлен', cancelled: 'Отменён' };

export const ordersResource = createResource<Order>({
  name: 'orders',
  label: 'Заказы',
  singular: 'заказ',
  endpoint: '/orders',
  statusField: 'status',
  // линейный воркфлоу: собрать -> отгрузить -> доставить
  statuses: [
    { value: 'new', label: 'Новый' },
    { value: 'shipped', label: 'Сборка' },
    { value: 'sent', label: 'Отгружен' },
    { value: 'completed', label: 'Доставлен' },
  ],
  columns: () => [
    TextColumn.make('user.name').label('Покупатель').searchable()
      .formatStateUsing((v) => (v && typeof v === 'object') ? (v as any).name ?? (v as any).email : (v ?? '—')),
    TextColumn.make('phone').label('Телефон').formatStateUsing((v) => v ?? '—'),
    TextColumn.make('total').label('Сумма').money('RUB').sortable(),
    BadgeColumn.make('status').label('Статус').colors(COLORS).labels(LABELS),
    TextColumn.make('createdAt').label('Дата')
      .formatStateUsing((v) => v ? new Date(v).toLocaleDateString('ru-RU') : '—')
      .sortable(),
  ],
  // схема окна просмотра
  infolist: () => [
    BadgeEntry.make('status').label('Статус').colors(COLORS).labels(LABELS),
    TextEntry.make('user').label('Покупатель')
      .formatStateUsing((v) => (v && typeof v === 'object') ? (v as any).name ?? (v as any).email : (v ?? '—')),
    TextEntry.make('phone').label('Телефон').formatStateUsing((v) => v ?? '—'),
    TextEntry.make('shippingAddress').label('Адрес доставки').full().formatStateUsing((v) => v ?? '—'),
    MoneyEntry.make('total').label('Сумма').currency('RUB'),
    DateEntry.make('createdAt').label('Создан'),
    TextEntry.make('items').label('Состав заказа').full()
      .formatStateUsing((items: OrderItem[]) =>
        (items ?? []).map((i) => `${i.name} ×${i.qty}`).join(', ') || '—'),
  ],
});
