"use client";
import * as React from "react";
import {{{camelCase name}}} from "@ideasui/theme/recipes";
import type {VariantProps} from "tailwind-variants";
import {cn} from "@ideasui/utils";

export interface {{pascalCase name}}Props 
  extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof {{camelCase name}}> {
  /**
   * Content of the component
   */
  children?: React.ReactNode;
  
  /**
   * Custom classes for different slots
   */
  customClasses?: {
    base?: string;
  };
}

export const {{pascalCase name}} = React.forwardRef<HTMLDivElement, {{pascalCase name}}Props>(
  ({ className, children, customClasses, ...props }, ref) => {
    const { base } = {{camelCase name}}(props);

    return (
      <div
        ref={ref}
        className={cn(base(), className, customClasses?.base)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

{{pascalCase name}}.displayName = "IdeasUI.{{pascalCase name}}";