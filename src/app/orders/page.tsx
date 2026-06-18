'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { ordersResource } from '@/resources/orders';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={ordersResource} />
    </RequireAuth>
  );
}
