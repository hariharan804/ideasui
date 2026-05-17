/* eslint-disable no-restricted-syntax */
'use client';

import { Paperclip } from '@gravity-ui/icons';
import { Button } from '@ideasui/react';
import React, { useState } from 'react';

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
