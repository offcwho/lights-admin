import { createResource, TextColumn, BadgeColumn, NumberInput, TextInput, Toggle, Select, DatePicker } from 'rdy-admin';

export interface PromoCodes {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
}

export const promoCodesResource = createResource<PromoCodes>({
  allowBulkDelete: true,
  name: 'promoCodes',
  label: 'Промокоды',
  singular: 'Промокод',
  endpoint: '/promo-codes',
  columns: () => [
    TextColumn.make('code').label('Код').searchable().sortable().weight('bold'),
    BadgeColumn.make('discountType').label('Тип скидки')
      .colors({ percentage: 'green', fixed: 'amber' })
      .labels({ percentage: 'Процент', fixed: 'Фиксированная' }),
    TextColumn.make('discountValue').label('Размер скидки')
      .formatStateUsing((v, row: any) => row?.discountType === 'percentage' ? `${v}%` : `${v} ₽`),
    TextColumn.make('usedCount').label('Использований'),
    TextColumn.make('maxUses').label('Лимит').formatStateUsing((v) => v ?? '∞'),
    TextColumn.make('expiresAt').label('Действует до')
      .formatStateUsing((v) => v ? new Date(v).toLocaleDateString('ru-RU') : '—'),
    BadgeColumn.make('isActive').label('Статус')
      .colors({ true: 'green', false: 'gray' })
      .labels({ true: 'Активен', false: 'Неактивен' }),
  ],
  form: () => [
    TextInput.make('code').label('Промокод').required().placeholder('SUMMER25'),
    Select.make('discountType').label('Тип скидки').required()
      .options({ percentage: 'Процент (%)', fixed: 'Фиксированная (₽)' }),
    NumberInput.make('discountValue').label('Размер скидки').required().min(0),
    NumberInput.make('minOrderAmount').label('Мин. сумма заказа').min(0),
    NumberInput.make('maxUses').label('Макс. кол-во использований').min(1),
    DatePicker.make('expiresAt').label('Действует до'),
    Toggle.make('isActive').label('Активен').default(true),
  ],
});
