import { createResource, TextColumn, BadgeColumn, TextInput, Textarea, Select, Container } from 'rdy-admin';

export interface User {
  id: string;
  name: string;
  // ...добавь свои поля
}

enum Role {
  admin = 'Админ',
  user = 'Пользователь',
}

export const usersResource = createResource<User>({
  name: 'Пользователи',
  label: 'Пользователи',
  singular: 'Пользователь',
  endpoint: '/users',
  columns: () => [
    TextColumn.make('name').label('Название').searchable().sortable(),
    TextColumn.make('email').label('Почта').searchable(),
    TextColumn.make('phone').label('Телефон').searchable(),
    TextColumn.make('address').label('Адрес').searchable(),
    TextColumn.make('role').label('Роль').searchable()
  ],
  form: () => [
    TextInput
      .make('name')
      .label('Название')
      .required(),
    Select
      .make('role')
      .label('Роль пользователя')
      .placeholder('Выберите роль')
      .options(Role)
      .required(),
    Container.make('')
      .label('Данные пользователя')
      .schema([
        TextInput
          .make('email')
          .label('Почта')
          .placeholder('mymail@mail.ru')
          .mask('email'),
        TextInput
          .make('phone')
          .label('Номер телефона')
          .placeholder('+7 (123) 123-12-31')
          .mask('phone'),
      ]),
  ],
});
