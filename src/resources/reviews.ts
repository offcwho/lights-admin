import { createResource, TextColumn, BadgeColumn, NumberInput, TextInput, Textarea, TextEntry } from 'rdy-admin';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export const reviewsResource = createResource<Review>({
  allowBulkDelete: true,
  name: 'reviews',
  label: 'Отзывы',
  singular: 'Отзыв',
  allowCreate: false,
  endpoint: '/reviews',
  columns: () => [
    TextColumn.make('product').label('Товар')
      .formatStateUsing((v) => (v && typeof v === 'object') ? (v as any).name : (v ?? '—')),
    TextColumn.make('user').label('Пользователь')
      .formatStateUsing((v) => (v && typeof v === 'object') ? (v as any).name : (v ?? '—')),
    BadgeColumn.make('rating').label('Оценка')
      .colors({ 1: 'red', 2: 'red', 3: 'amber', 4: 'green', 5: 'green' }),
    TextColumn.make('title').label('Заголовок').formatStateUsing((v) => v ?? '—'),
    TextColumn.make('createdAt').label('Дата')
      .formatStateUsing((v) => v ? new Date(v).toLocaleDateString('ru-RU') : '—')
      .sortable(),
  ],
  infolist: () => [
    TextEntry.make('rating').label('Оценка'),
    TextEntry.make('title').label('Заголовок'),
    TextEntry.make('body').label('Текст отзыва'),
  ],
});
