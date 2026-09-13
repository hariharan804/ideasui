'use client';

import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@ideasui/react';

export function Loading() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Start position (default) */}
      <Button isLoading loadingPosition="start">
        Saving...
      </Button>

      {/* End position */}
      <Button isLoading loadingPosition="end" variant="outline">
        Processing...
      </Button>

      {/* Center position */}
      <Button isLoading loadingPosition="center" variant="soft">
        Submitting
      </Button>

      {/* Custom loading indicator icon */}
      <Button
        isLoading
        color="secondary"
        loadingIndicator={<RefreshCw className="size-4 animate-spin" />}
      >
        Syncing
      </Button>

      {/* Custom spinner with danger color */}
      <Button
        isLoading
        color="danger"
        loadingIndicator={<Loader2 className="size-4 animate-spin" />}
        variant="outline"
      >
        Deleting
      </Button>
    </div>
  );
}
