// import React from 'react';
// import { extendedButton, primaryButton, iconButton } from '../recipes/button-extended';
// import type { ExtendedButtonProps, PrimaryButtonProps, IconButtonProps } from '../recipes/button-extended';

// // Method 1: Direct usage with extended variant
// export function GradientButton({
//   children,
//   className,
//   onClick,
//   disabled,
//   type = 'button',
//   ...props
// }: ExtendedButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   children: React.ReactNode
// }) {
//   const { base, icon, label } = extendedButton(props);

//   return (
//     <button
//       className={base({ className })}
//       onClick={onClick}
//       disabled={disabled}
//       type={type}
//       {...props}
//     >
//       {props.loading && <span className={icon()}>⟳</span>}
//       <span className={label()}>{children}</span>
//     </button>
//   );
// }

// // Method 2: Component with overridden defaults
// export function PrimaryButton({
//   children,
//   className,
//   onClick,
//   disabled,
//   type = 'button',
//   ...props
// }: PrimaryButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   children: React.ReactNode
// }) {
//   const { base, icon, label } = primaryButton(props);

//   return (
//     <button
//       className={base({ className })}
//       onClick={onClick}
//       disabled={disabled}
//       type={type}
//       {...props}
//     >
//       <span className={label()}>{children}</span>
//     </button>
//   );
// }

// // Method 3: Specialized icon-only component
// export function IconButton({
//   icon,
//   className,
//   onClick,
//   disabled,
//   type = 'button',
//   'aria-label': ariaLabel,
//   ...props
// }: IconButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   icon: React.ReactNode;
//   'aria-label': string;
// }) {
//   const { base, icon: iconSlot } = iconButton(props);

//   return (
//     <button
//       className={base({ className })}
//       onClick={onClick}
//       disabled={disabled}
//       type={type}
//       aria-label={ariaLabel}
//       {...props}
//     >
//       <span className={iconSlot()}>{icon}</span>
//     </button>
//   );
// }

// // Usage Examples:
// export function ButtonExamples() {
//   return (
//     <div className="space-y-4">
//       {/* Extended button with new features */}
//       <GradientButton variant="gradient" size="2xl" loading={true}>
//         Loading Button
//       </GradientButton>

//       {/* Primary button (uses lg size by default) */}
//       <PrimaryButton>
//         Primary Action
//       </PrimaryButton>

//       {/* Icon button */}
//       <IconButton icon="❤️" size="lg" />

//       {/* Extended button with original variants */}
//       <GradientButton variant="solid" color="success" size="md">
//         Success Button
//       </GradientButton>
//     </div>
//   );
// }
