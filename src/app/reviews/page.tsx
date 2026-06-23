'use client';
import { RequireAuth, ResourcePage } from 'rdy-admin';
import { reviewsResource } from '@/resources/reviews';

export default function Page() {
  return (
    <RequireAuth role="admin">
      <ResourcePage resource={reviewsResource} />
    </RequireAuth>
  );
}
