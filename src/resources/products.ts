import { createResource, TextColumn, BadgeColumn, TextInput, Textarea, Select, NumberInput, Toggle, Repeater, FileUpload, Container } from 'rdy-admin';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'draft' | 'out';
  spec: ProductSpec;
}

interface ProductSpec {
  id: string;
  model?: string;
  weightKg?: Number;
  shapes?: String[];
  styles?: String[];
  rooms?: String[];
  lampType?: String
  maxAreaM2?: String
  mountingType?: String
  packageSize: String
  frameMaterial?: String
  frameColor?: String
  shadeMaterials?: String[]
  shadeColors?: String[]
  colorTemps?: String[]
  powerW?: Number
  lumens?: Number
  lampCount?: Number
}

export const productsResource = createResource<Product>({
  name: 'products',
  label: 'Products',
  singular: 'товар',
  endpoint: '/products',          // POST/PATCH/DELETE сюда при demo:false
  columns: () => [
    TextColumn.make('name').label('Название').sortable().searchable().weight('bold'),
    TextColumn.make('category').label('Категория').searchable()
      .formatStateUsing((v) => (v && typeof v === 'object') ? (v as any).name : (v ?? '—')),
    TextColumn.make('price').label('Цена').money('RUB').sortable(),
    BadgeColumn.make('status').label('Статус')
      .colors({ active: 'green', draft: 'amber', out: 'red' })
      .labels({ active: 'Активен', draft: 'Черновик', out: 'Нет в наличии' }),
  ],
  form: () => [
    TextInput.make('name').label('Название').required().placeholder('Каскадная люстра…'),
    TextInput.make('slug').label('Slug').required().slugFrom('name')
      .hint('Заполняется автоматически из названия, можно поправить вручную'),
    // категория выбирается из другой таблицы (/categories): value = id, подпись = name

    Container.make('Характеристики')
      .label('Характеристики')
      .collapsed()
      .collapsible()
      .schema([
        TextInput.make('spec.model').label('Модель').required(),
        NumberInput.make('spec.weightKg').label('Вес').min(0).required(),
        TextInput.make('spec.shapes').label('Форма товара').required(),
        TextInput.make('spec.styles').label('Стиль').required(),
        TextInput.make('spec.lampType').label('Тип используемых лам').required(),
        TextInput.make('spec.mountingType').label('Тип крепления').required(),
        TextInput.make('packageSize').mask('dimensions').unit('мм').required(),
      ]),


    Select.make('categoryId').label('Категория').required().searchable()
      .optionsFrom('/categories', { value: 'id', label: 'name' }),
    Textarea.make('description').label('Описание').rows(3),
    NumberInput.make('price').label('Цена, ₽').required().min(0),
    Select.make('status').label('Статус').default('active')
      .options({ active: 'Активен', draft: 'Черновик', out: 'Нет в наличии' }),
    Toggle.make('published').label('Опубликован').default(true),
    // характеристики товара — повторяющиеся строки (на бэк уходит массив объектов)

    FileUpload.make('images').label('Изображения товара')
      .multiple().image().maxFiles(6).maxSizeMB(5).hint('Первое фото станет обложкой'),
  ],
});