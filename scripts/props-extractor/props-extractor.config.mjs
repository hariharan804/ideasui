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
          interfaceName: 'ButtonBaseProps',
        },
        {
          name: 'ButtonLabel',
          componentName: 'Button.Label',
          title: 'Button Label Props',
          description: 'Label component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonLabelProps',
        },
        {
          name: 'ButtonIcon',
          componentName: 'Button.Icon',
          title: 'Button Icon Props',
          description: 'Icon component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonIconProps',
        },
        {
          name: 'ButtonSpinner',
          componentName: 'Button.Spinner',
          title: 'Button Spinner Props',
          description: 'Spinner component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonSpinnerProps',
        },
        {
          name: 'ButtonShortcut',
          componentName: 'Button.Shortcut',
          title: 'Button Shortcut Props',
          description: 'Shortcut component inside the button',
          filePath: '../../packages/components/button/src/button.types.ts',
          interfaceName: 'ButtonShortcutProps',
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
          interfaceName: 'ButtonGroupProps',
        },
      ],
    },
  },
};
export default extractConfig;
