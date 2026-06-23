'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { promoCodesResource } from '@/resources/promo-codes';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={promoCodesResource} />
    </RequireAuth>
  );
}
