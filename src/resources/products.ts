import { createResource, TextColumn, BadgeColumn, TextInput, Textarea, Select, NumberInput, Toggle, Repeater, FileUpload, Container } from 'rdy-admin';
import { CharacteristicsType } from './characteristics';

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
  name: 'продукты',
  label: 'Товары',
  singular: 'товар',
  endpoint: '/products',          // POST/PATCH/DELETE сюда при demo:false
  columns: () => [
    TextColumn.make('name').label('Название').sortable().searchable().weight('bold'),
    TextColumn.make('category').label('Категория').searchable()
      .formatStateUsing((v) => (v && typeof v === 'object') ? (v as any).name : (v ?? '—')),
    TextColumn.make('price').label('Цена').money('RUB').sortable(),
    BadgeColumn.make('isActive').label('Статус')
      .colors({ true: 'green', false: 'gray', })
      .labels({ true: 'Активен', false: 'Черновик' }),

    TextColumn.make('spec.model')
      .label('Модель'),
    TextColumn.make('spec.weightKg')
      .label('Вес Кг.'),
    TextColumn.make('spec.shapes')
      .label('Форма товара')
      .array()
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.styles')
      .label('Стиль')
      .array()
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.lampType')
      .label('Тип ламп')
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.maxAreaM2').label('Площадь помещения'),
    TextColumn.make('spec.mountingType')
      .label('Тип крепления')
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.packageSize').label('Размер'),
    TextColumn.make('spec.frameMaterial')
      .label('Материал Арматуры')
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.frameColor')
      .label('Цвет Арматуры')
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.shadeMaterials')
      .label('Материал плафона')
      .array()
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.shadeColors')
      .label('цвет плафона')
      .array()
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.colorTemps')
    .label('Цветовая температура')
      .array()
      .lookupFrom('/characteristics', { value: 'id', label: 'name' }),
    TextColumn.make('spec.powerW').label('Мощность'),
    TextColumn.make('spec.lumens').label('cветовой поток в Люменах')
  ],
  form: () => [
    TextInput.make('name').label('Название').required().placeholder('Каскадная люстра…'),
    TextInput.make('slug').label('Slug').required().slugFrom('name')
      .hint('Заполняется автоматически из названия, можно поправить вручную').disabled(),
    // категория выбирается из другой таблицы (/categories): value = id, подпись = name

    Container.make('Характеристики')
      .label('Характеристики')
      .schema([
        TextInput
          .make('spec.model')
          .label('Модель')
          .placeholder('Odeon Light Focco 4722/18')
          .required(),
        NumberInput
          .make('spec.weightKg')
          .label('Вес')
          .placeholder('120')
          .min(0)
          .unit('Кг')
          .required(),
        Select
          .make('spec.shapes')
          .label('Форма товара')
          .placeholder('Выберите форму товара')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.shapes)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.shapes }
          })
          .multiple()
          .required(),
        Select
          .make('spec.styles')
          .label('Стиль')
          .placeholder('Выберите стиль')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.styles)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.styles }
          })
          .multiple()
          .required(),
        Select
          .make('spec.lampType')
          .label('Тип используемых лам')
          .placeholder('Выберите тип используемых лам')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.lampType)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.lampType }
          })
          .required(),
        NumberInput
          .make('spec.maxAreaM2')
          .label('Максимальная площадь помещения ')
          .placeholder('22')
          .unit('м²'),
        Select
          .make('spec.mountingType')
          .label('Тип крепления')
          .placeholder('Выберите тип крепления')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.mountingType)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.mountingType }
          })
          .required(),
        TextInput
          .make('spec.packageSize')
          .label('Размер')
          .mask('dimensions')
          .unit('мм')
          .required(),
        Select
          .make('spec.frameMaterial')
          .label('Материал арматуры')
          .placeholder('Выберите материал арматуры')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.frameMaterial)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.frameMaterial }
          })
          .required(),
        Select
          .make('spec.frameColor')
          .label('Цвет арматуры')
          .placeholder('Выберите цвет арматуры')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.frameColor)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.frameColor }
          })
          .required(),
        Select
          .make('spec.shadeMaterials')
          .label('Материал плафона')
          .placeholder('Выберите материал плафона')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.shadeMaterials)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.shadeMaterials }
          })
          .multiple()
          .required(),
        Select
          .make('spec.shadeColors')
          .label('Цвет плафона')
          .placeholder('Выберите цвет плафона')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.shadeColors)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.shadeColors }
          })
          .multiple()
          .required(),
        Select
          .make('spec.colorTemps')
          .label('Цветовая температура')
          .placeholder('Выберите цветовую температуру')
          .optionsFrom('/characteristics', { value: 'id', label: 'name' })
          .filterWhere('type', CharacteristicsType.colorTemps)
          .creatable({
            endpoint: '/characteristics',
            bodyKey: 'name',
            responseKey: 'id',
            extraBody: { type: CharacteristicsType.colorTemps }
          })
          .multiple()
          .required(),
        NumberInput
          .make('spec.powerW')
          .label('Общая мощность Вт')
          .placeholder('50')
          .min(0)
          .unit('Вт')
          .required(),
        NumberInput
          .make('spec.lumens')
          .label('Общий световой поток в Люменах')
          .placeholder('3560')
          .min(0)
          .unit('лм')
          .required(),
      ]),


    Select.make('categoryId').label('Категория').searchable()
      .optionsFrom('/categories', { value: 'id', label: 'name' }),
    Textarea.make('description').label('Описание').rows(3),
    NumberInput.make('price').label('Цена, ₽').required().min(0),
    NumberInput.make('stock').label('Количество на складе').required().min(0).placeholder('6'),
    // характеристики товара — повторяющиеся строки (на бэк уходит массив объектов)

    FileUpload.make('images').label('Изображения товара')
      .multiple().image().maxFiles(6).maxSizeMB(5).hint('Первое фото станет обложкой'),

    Toggle.make('isActive').label('Опубликован').default(true).hint('Включите если нужно отображение на сайте'),
  ],
});