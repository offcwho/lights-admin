import { createResource, TextColumn, BadgeColumn, TextInput, Textarea, FileUpload, NumberInput, Toggle } from 'rdy-admin';

export interface Banner {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  imageUrl: string;
  action?: string | null;
  buttonLabel?: string | null;
  isActive: boolean;
  order: number;
}

export const bannerResource = createResource<Banner>({
  name: 'banner',
  label: 'Баннер',
  singular: 'Баннер',
  endpoint: '/banners/all',
  columns: () => [
    TextColumn.make('title').label('Название').searchable().sortable(),
    BadgeColumn.make('isActive')
      .label('Статус')
      .colors({ true: 'green', false: 'gray', })
      .labels({ true: 'Активен', false: 'Черновик' }),
  ],
  form: () => [
    TextInput.make('title').label('Заголовок').required(),
    TextInput.make('subtitle').label('Подзаголовок').required(),
    TextInput.make('description').label('Описание').required(),
    Toggle.make('isActive').label('Активный баннер').default(true),
    FileUpload.make('imageUrl').label('Изображения товара').image().maxSizeMB(5).required(),
    TextInput.make('action').label('Кнопка действия').placeholder('Введите куда направит кнопка банера').required(),
    TextInput.make('buttonLabel').label('Описание кнопки').placeholder('Перейти'),
    NumberInput.make('order').label('Порядковое число баннера').placeholder('1').required(),
  ],
});
