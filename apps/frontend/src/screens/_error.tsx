import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';

import { Throwable } from '~/utils/throwable';
import { UnauthorizedError } from '~/types/errors';

// TODO: set error fallback
export function ErrorFallback(props: FallbackProps) {
  const { error, resetErrorBoundary } = props;
  const navigate = useNavigate();

  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  useEffect(() => {
    const err = Throwable.from(error);
    if (err.is(UnauthorizedError)) {
      resetErrorBoundary();
      navigate('/');
    }
  }, [error]);

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}
