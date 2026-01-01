// Consumer usage - just props, no TV extension needed

import React from 'react';
import { Button } from '@ideasui/button';
import type { ButtonProps } from '@ideasui/button';

// Consumers can now use your Button directly with extended props
export function ConsumerUsage() {
  return (
    <div className="space-y-4">
      {/* Basic usage */}
      <Button variant="solid" color="primary">
        Basic Button
      </Button>
      
      {/* With loading state */}
      <Button 
        variant="solid" 
        color="success" 
        loading={true}
        loadingText="Saving..."
      >
        Save Changes
      </Button>
      
      {/* With icons */}
      <Button 
        variant="outline" 
        startIcon="📧" 
        endIcon="→"
      >
        Send Email
      </Button>
      
      {/* With custom classes */}
      <Button 
        variant="ghost"
        customClasses={{
          base: 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600',
          label: 'font-bold text-white',
        }}
      >
        Custom Gradient
      </Button>
      
      {/* All HTML button props work */}
      <Button 
        variant="solid"
        onClick={() => alert('Clicked!')}
        disabled={false}
        type="submit"
        className="my-custom-class"
      >
        Submit Form
      </Button>
    </div>
  );
}

// Consumers can create wrapper components easily
export const PrimaryButton = (props: ButtonProps) => (
  <Button variant="solid" color="primary" size="lg" {...props} />
);

export const LoadingButton = ({ loading, ...props }: ButtonProps & { loading?: boolean }) => (
  <Button loading={loading} loadingText="Loading..." {...props} />
);