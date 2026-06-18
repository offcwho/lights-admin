'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { productsResource } from '@/resources/products';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={productsResource} />
    </RequireAuth>
  );
}
