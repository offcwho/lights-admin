'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { supportResource } from '@/resources/support';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={supportResource} />
    </RequireAuth>
  );
}
