'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { characteristicsResource } from '@/resources/characteristics';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={characteristicsResource} />
    </RequireAuth>
  );
}
