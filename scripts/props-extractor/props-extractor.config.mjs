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
    text: {
      componentName: 'Text',
      interfaces: [
        {
          name: 'Text',
          title: 'Text Props',
          description:
            'Theme-aware typography primitive supporting semantic tokens, line clamping, and slots',
          filePath: '../../packages/components/text/src/text.types.ts',
          interfaceName: 'TextProps',
        },
      ],
    },
    inputField: {
      componentName: 'InputField',
      interfaces: [
        {
          name: 'InputField',
          title: 'InputField Props',
          description: 'Root wrapper and shorthand single-component interface for input fields',
          filePath: '../../packages/components/input-field/src/input-field.types.ts',
          interfaceName: 'InputFieldProps',
        },
        {
          name: 'InputFieldLabel',
          componentName: 'InputField.Label',
          title: 'InputField Label Props',
          description: 'Label component for the input field',
          filePath: '../../packages/components/input-field/src/input-field.types.ts',
          interfaceName: 'InputFieldLabelProps',
        },
        {
          name: 'InputFieldInput',
          componentName: 'InputField.Input',
          title: 'InputField Input Props',
          description: 'Native HTML input primitive wrapper',
          filePath: '../../packages/components/input-field/src/input-field.types.ts',
          interfaceName: 'InputFieldInputProps',
        },
        {
          name: 'InputFieldDescription',
          componentName: 'InputField.Description',
          title: 'InputField Description Props',
          description: 'Helper description text component for the input field',
          filePath: '../../packages/components/input-field/src/input-field.types.ts',
          interfaceName: 'InputFieldDescriptionProps',
        },
        {
          name: 'InputFieldError',
          componentName: 'InputField.Error',
          title: 'InputField Error Props',
          description: 'Error message text component for validation states',
          filePath: '../../packages/components/input-field/src/input-field.types.ts',
          interfaceName: 'InputFieldErrorProps',
        },
      ],
    },
  },
};
export default extractConfig;
