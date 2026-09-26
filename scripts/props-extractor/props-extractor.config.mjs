//props-extractor configuration - props-extractor.config.mjs

const makeInterface = (name, title, description, filePath, interfaceName, componentName) => ({
  name,
  ...(componentName ? { componentName } : {}),
  title,
  description,
  filePath,
  interfaceName,
});

const makeComponent = (componentName, interfaces) => ({
  componentName,
  interfaces,
});

export const extractConfig = {
  output: {
    path: '../../apps/docs/lib/docs',
    filename: 'components-props.ts',
  },
  interfaces: {
    button: makeComponent('Button', [
      makeInterface(
        'Button',
        'Button Props',
        'Primary button component with variants and sizes',
        '../../packages/components/button/src/button.types.ts',
        'ButtonBaseProperties',
      ),
      makeInterface(
        'ButtonLabel',
        'Button Label Props',
        'Label component inside the button',
        '../../packages/components/button/src/button.types.ts',
        'ButtonLabelProperties',
        'Button.Label',
      ),
      makeInterface(
        'ButtonIcon',
        'Button Icon Props',
        'Icon component inside the button',
        '../../packages/components/button/src/button.types.ts',
        'ButtonIconProperties',
        'Button.Icon',
      ),
      makeInterface(
        'ButtonSpinner',
        'Button Spinner Props',
        'Spinner component inside the button',
        '../../packages/components/button/src/button.types.ts',
        'ButtonSpinnerProperties',
        'Button.Spinner',
      ),
      makeInterface(
        'ButtonShortcut',
        'Button Shortcut Props',
        'Shortcut component inside the button',
        '../../packages/components/button/src/button.types.ts',
        'ButtonShortcutProperties',
        'Button.Shortcut',
      ),
    ]),
    buttonGroup: makeComponent('ButtonGroup', [
      makeInterface(
        'ButtonGroup',
        'Button Group Props',
        'Group component for layout of multiple buttons',
        '../../packages/components/button/src/button-group.tsx',
        'ButtonGroupProperties',
        'Button.Group',
      ),
    ]),
    text: makeComponent('Text', [
      makeInterface(
        'Text',
        'Text Props',
        'Theme-aware typography primitive supporting semantic tokens, line clamping, and slots',
        '../../packages/components/text/src/text.types.ts',
        'TextProps',
      ),
    ]),
    inputField: makeComponent('InputField', [
      makeInterface(
        'InputField',
        'InputField Props',
        'Root wrapper and shorthand single-component interface for input fields',
        '../../packages/components/input-field/src/input-field.types.ts',
        'InputFieldProps',
      ),
      makeInterface(
        'InputFieldLabel',
        'InputField Label Props',
        'Label component for the input field',
        '../../packages/components/input-field/src/input-field.types.ts',
        'InputFieldLabelProps',
        'InputField.Label',
      ),
      makeInterface(
        'InputFieldInput',
        'InputField Input Props',
        'Native HTML input primitive wrapper',
        '../../packages/components/input-field/src/input-field.types.ts',
        'InputFieldInputProps',
        'InputField.Input',
      ),
      makeInterface(
        'InputFieldDescription',
        'InputField Description Props',
        'Helper description text component for the input field',
        '../../packages/components/input-field/src/input-field.types.ts',
        'InputFieldDescriptionProps',
        'InputField.Description',
      ),
      makeInterface(
        'InputFieldError',
        'InputField Error Props',
        'Error message text component for validation states',
        '../../packages/components/input-field/src/input-field.types.ts',
        'InputFieldErrorProps',
        'InputField.Error',
      ),
    ]),
    checkbox: makeComponent('Checkbox', [
      makeInterface(
        'Checkbox',
        'Checkbox Props',
        'Checkbox component supporting single, group, and custom icon usage',
        '../../packages/components/checkbox/src/checkbox.types.ts',
        'CheckboxProps',
      ),
      makeInterface(
        'CheckboxGroup',
        'CheckboxGroup Props',
        'Group component managing selection state for child checkboxes',
        '../../packages/components/checkbox/src/checkbox.types.ts',
        'CheckboxGroupProps',
        'CheckboxGroup',
      ),
    ]),
    textarea: makeComponent('Textarea', [
      makeInterface(
        'Textarea',
        'Textarea Props',
        'Standalone shorthand and wrapper component for multi-line inputs with auto-resize, character counter, and variants',
        '../../packages/components/input-field/src/textarea.types.ts',
        'TextareaProps',
      ),
      makeInterface(
        'TextareaInput',
        'Textarea Input Props',
        'Multi-line textarea element component with auto-resize and counter features',
        '../../packages/components/input-field/src/textarea.types.ts',
        'InputFieldTextareaProps',
        'Textarea.Input',
      ),
    ]),
    radio: makeComponent('Radio', [
      makeInterface(
        'Radio',
        'Radio Props',
        'Radio control component for selecting a single option from a list',
        '../../packages/components/radio/src/radio.types.ts',
        'RadioProps',
      ),
      makeInterface(
        'RadioGroup',
        'RadioGroup Props',
        'Group container managing single selection state across child radios',
        '../../packages/components/radio/src/radio.types.ts',
        'RadioGroupProps',
        'RadioGroup',
      ),
      makeInterface(
        'RadioGroupLabel',
        'RadioGroupLabel Props',
        'Label component rendered above the radio group',
        '../../packages/components/radio/src/radio.types.ts',
        'RadioGroupLabelProps',
        'RadioGroupLabel',
      ),
      makeInterface(
        'RadioGroupDescription',
        'RadioGroupDescription Props',
        'Accessible description text component rendered below the radio group',
        '../../packages/components/radio/src/radio.types.ts',
        'RadioGroupDescriptionProps',
        'RadioGroupDescription',
      ),
      makeInterface(
        'RadioGroupError',
        'RadioGroupError Props',
        'Error message component rendered below the radio group when invalid',
        '../../packages/components/radio/src/radio.types.ts',
        'RadioGroupErrorProps',
        'RadioGroupError',
      ),
    ]),
  },
};
export default extractConfig;
