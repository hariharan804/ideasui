import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

// This is required to initialize Storybook's rendering engine in Vitest for v2.
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
