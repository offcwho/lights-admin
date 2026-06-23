'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { usersResource } from '@/resources/users';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={usersResource} />
    </RequireAuth>
  );
}
