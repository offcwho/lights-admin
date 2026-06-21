'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { bannerResource } from '@/resources/banner';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={bannerResource} />
    </RequireAuth>
  );
}
