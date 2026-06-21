import { createResource, TextColumn, BadgeColumn, TextInput, Textarea, TextEntry, BadgeEntry, MoneyEntry, DateEntry, Button } from 'rdy-admin';

export interface OrderItem { name: string; qty: number; price: number }
export interface Order {
  id: string; number: string; customer: string; phone: string; address: string;
  total: number; status: 'cancelled' | 'new' | 'shipped' | 'sent' | 'completed';
  createdAt: string; items: OrderItem[];
}

const COLORS = { new: 'gray', assembling: 'amber', shipped: 'green', delivered: 'green', cancelled: 'red' } as const;
const LABELS = { new: 'Новый', assembling: 'Сборка', shipped: 'Отгружен', delivered: 'Доставлен', cancelled: 'Отменён' };

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
    TextColumn.make('number').label('Заказ').sortable().searchable().weight('bold'),
    TextColumn.make('customer').label('Покупатель').searchable(),
    TextColumn.make('total').label('Сумма').money('RUB').sortable(),
    BadgeColumn.make('status').label('Статус').colors(COLORS).labels(LABELS),
  ],
  // схема окна просмотра
  infolist: () => [
    TextEntry.make('number').label('Номер'),
    BadgeEntry.make('status').label('Статус').colors(COLORS).labels(LABELS),
    TextEntry.make('customer').label('Покупатель'),
    TextEntry.make('phone').label('Телефон'),
    TextEntry.make('address').label('Адрес доставки').full(),
    MoneyEntry.make('total').label('Сумма').currency('RUB'),
    DateEntry.make('createdAt').label('Создан'),
    TextEntry.make('items').label('Состав заказа').full()
      .formatStateUsing((items: OrderItem[]) =>
        (items ?? []).map((i) => `${i.name} ×${i.qty}`).join(', ') || '—'),
    
  ],
});
