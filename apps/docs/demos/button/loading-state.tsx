'use client';

import { Paperclip } from 'lucide-react';
import { Button } from '@ideasui/react';
import { useState } from 'react';

export function LoadingState() {
  const [isLoading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button isLoading={isLoading} startIcon={<Paperclip />} onPress={handlePress}>
      {isLoading ? 'Uploading...' : 'Upload File'}
    </Button>
  );
}
