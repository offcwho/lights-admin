import { createResource, TextColumn, BadgeColumn, Select, TextEntry, BadgeEntry, DateEntry } from 'rdy-admin';

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'in_progress' | 'closed';
  userId?: string;
  user?: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

const COLORS = { new: 'gray', in_progress: 'amber', closed: 'green' } as const;
const LABELS = { new: 'Новое', in_progress: 'В работе', closed: 'Закрыто' };

export const supportResource = createResource<SupportTicket>({
  name: 'support',
  label: 'Обращения',
  singular: 'Обращение',
  allowCreate: false,
  endpoint: '/support',
  statusField: 'status',
  statuses: [
    { value: 'new', label: 'Новое' },
    { value: 'in_progress', label: 'В работе' },
    { value: 'closed', label: 'Закрыто' },
  ],
  columns: () => [
    TextColumn.make('name').label('Имя').searchable().sortable(),
    TextColumn.make('email').label('Email').searchable(),
    TextColumn.make('subject').label('Тема').formatStateUsing((v) => v ?? '—'),
    BadgeColumn.make('status').label('Статус').colors(COLORS).labels(LABELS),
    TextColumn.make('createdAt').label('Дата')
      .formatStateUsing((v) => v ? new Date(v).toLocaleDateString('ru-RU') : '—')
      .sortable(),
  ],
  form: () => [
    Select.make('status').label('Статус').required()
      .options({ new: 'Новое', in_progress: 'В работе', closed: 'Закрыто' }),
  ],
  infolist: () => [
    TextEntry.make('name').label('Имя'),
    TextEntry.make('email').label('Email'),
    TextEntry.make('subject').label('Тема').formatStateUsing((v) => v ?? '—'),
    BadgeEntry.make('status').label('Статус').colors(COLORS).labels(LABELS),
    TextEntry.make('message').label('Сообщение').full(),
    TextEntry.make('user').label('Пользователь')
      .formatStateUsing((v) => (v && typeof v === 'object') ? (v as any).name ?? (v as any).email : '—'),
    DateEntry.make('createdAt').label('Дата обращения'),
  ],
});
