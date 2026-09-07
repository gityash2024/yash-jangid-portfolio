'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to guard client-only UI against SSR hydration mismatch.
 * Returns true once the component has mounted on the client.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
