"use client";
import * as React from "react";
import {useDialog, useModal, useOverlay} from "react-aria";
import {useOverlayTriggerState} from "react-stately";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const dialogVariants = tv({
  base: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
});

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({open, onOpenChange, title, description, children, className}, ref) => {
    const state = useOverlayTriggerState({
      isOpen: open,
      onOpenChange,
    });

    const dialogRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => dialogRef.current!);

    const {overlayProps, underlayProps} = useOverlay(
      {
        isOpen: state.isOpen,
        onClose: state.close,
        isDismissable: true,
      },
      dialogRef,
    );

    const {modalProps} = useModal();
    const {dialogProps, titleProps} = useDialog({}, dialogRef);

    if (!state.isOpen) {
      return null;
    }

    return (
      <div className="bg-background/80 fixed inset-0 z-50 backdrop-blur-sm">
        <div {...underlayProps} className="fixed inset-0" />
        <div
          ref={dialogRef}
          className={cn(dialogVariants(), className)}
          {...overlayProps}
          {...dialogProps}
          {...modalProps}
        >
          {title ? (
            <h2 {...titleProps} className="text-lg leading-none font-semibold tracking-tight">
              {title}
            </h2>
          ) : null}
          {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
          {children}
        </div>
      </div>
    );
  },
);

Dialog.displayName = "Dialog";
