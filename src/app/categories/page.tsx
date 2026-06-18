'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { categoriesResource } from '@/resources/categories';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={categoriesResource} />
    </RequireAuth>
  );
}
