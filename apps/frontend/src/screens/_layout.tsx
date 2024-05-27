import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '~/screens/_error';

export function RootLayout() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Outlet />
    </ErrorBoundary>
  );
}
