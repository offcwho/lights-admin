import { createResource, TextColumn, BadgeColumn, TextInput, Textarea, Select } from 'rdy-admin';

export interface Characteristics {
  id: string;
  name: string;
  type: CharacteristicsType;
}

export enum CharacteristicsType {
  shapes = 'shapes',
  styles = 'styles',
  lampType = 'lampType',
  mountingType = 'mountingType',
  frameMaterial = 'frameMaterial',
  frameColor = 'frameColor',
  shadeMaterials = 'shadeMaterials',
  shadeColors = 'shadeColors',
  colorTemps = 'colorTemps',
}

export const characteristicsResource = createResource<Characteristics>({
  allowBulkDelete: true,
  name: 'characteristics',
  label: 'Характеристики',
  singular: 'Характеристика',
  endpoint: '/characteristics',
  columns: () => [
    TextColumn.make('name').label('Название').searchable().sortable(),
    TextColumn.make('type').label('Тип'),
    // BadgeColumn.make('status').label('Статус').colors({ active: 'green', off: 'gray' }),
  ],
  form: () => [
    TextInput.make('name').label('Название').required(),
    Select.make('type')
      .placeholder('Выберите тип')
      .options(CharacteristicsType)
    // Textarea.make('description').label('Описание'),
  ],
});
