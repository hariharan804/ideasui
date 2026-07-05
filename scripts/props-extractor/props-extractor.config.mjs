//props-extractor configuration - props-extractor.config.js
export const extractConfig = {
  output: {
    path: '../../apps/docs/lib/docs',
    filename: 'components-props.ts',
  },
  interfaces: {
    button: {
      componentName: 'Button',
      interfaces: [
        {
          name: 'Button',
          title: 'Button Props',
          description: 'Primary button component with variants and sizes',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonBaseProperties',
        },
        {
          name: 'ButtonLabel',
          componentName: 'Button.Label',
          title: 'Button Label Props',
          description: 'Label component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonLabelProperties',
        },
        {
          name: 'ButtonIcon',
          componentName: 'Button.Icon',
          title: 'Button Icon Props',
          description: 'Icon component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonIconProperties',
        },
        {
          name: 'ButtonSpinner',
          componentName: 'Button.Spinner',
          title: 'Button Spinner Props',
          description: 'Spinner component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonSpinnerProperties',
        },
        {
          name: 'ButtonShortcut',
          componentName: 'Button.Shortcut',
          title: 'Button Shortcut Props',
          description: 'Shortcut component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonShortcutProperties',
        },
      ],
    },
    buttonGroup: {
      componentName: 'ButtonGroup',
      interfaces: [
        {
          name: 'ButtonGroup',
          componentName: 'Button.Group',
          title: 'Button Group Props',
          description: 'Group component for layout of multiple buttons',
          filePath: '../../packages/components/button/src/button-group.tsx',
          interfaceName: 'ButtonGroupProperties',
        },
      ],
    },
  },
};
export default extractConfig;
