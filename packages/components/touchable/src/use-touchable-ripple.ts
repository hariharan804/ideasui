import * as React from "react";

export interface TouchableRippleItem {
  key: number;
  x: number;
  y: number;
  size: number;
}

export interface UseTouchableRippleReturn {
  ripples: TouchableRippleItem[];
  onClick: (
    event:
      | React.PointerEvent<HTMLElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>,
  ) => void;
  onClear: (key: React.Key) => void;
}

/**
 * useTouchableRipple
 * -------------------
 * • Pointer, mouse, keyboard safe
 * • Always falls back to center
 * • Never creates static ripples
 * • No external dependencies
 */
export function useTouchableRipple(): UseTouchableRippleReturn {
  const [ripples, setRipples] = React.useState<TouchableRippleItem[]>([]);
  const idRef = React.useRef(0);

  const onClick = React.useCallback(
    (
      event:
        | React.PointerEvent<HTMLElement>
        | React.MouseEvent<HTMLElement>
        | React.KeyboardEvent<HTMLElement>,
    ) => {
      const target = event.currentTarget as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      // Default: center ripple (keyboard / synthetic events)
      let x = rect.width / 2 - size / 2;
      let y = rect.height / 2 - size / 2;

      // Pointer or mouse event
      if ("clientX" in event && "clientY" in event) {
        if (event.clientX !== 0 || event.clientY !== 0) {
          x = event.clientX - rect.left - size / 2;
          y = event.clientY - rect.top - size / 2;
        }
      }

      setRipples((prev) => [
        ...prev,
        {
          key: ++idRef.current,
          x,
          y,
          size,
        },
      ]);
    },
    [],
  );

  const onClear = React.useCallback((key: React.Key) => {
    setRipples((prev) => prev.filter((ripple) => ripple.key !== key));
  }, []);

  return {
    ripples,
    onClick,
    onClear,
  };
}
