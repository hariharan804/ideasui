import { colorContrastChecker } from './color-contrast-checker.mjs'

const color = colorContrastChecker({
  backgroundColor: '#861afd',
  textColor: '#ffffff',
  isContrastCheck: true,
  contrastValue: 4.7,
})
console.log('👨‍💻 ~ color:', color?.backgroundColor)
// #adb6b1
// '#6e7572'
