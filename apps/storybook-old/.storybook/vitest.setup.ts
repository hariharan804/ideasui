import { setProjectAnnotations } from '@storybook/react';
import * as projectAnnotations from './preview';

// This is required to initialize Storybook's rendering engine in Vitest.
setProjectAnnotations(projectAnnotations);
