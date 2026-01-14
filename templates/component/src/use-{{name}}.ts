import { useCallback, useRef } from "react";

export interface Use{{pascalCase name}}Props {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent) => void;
}

export interface Use{{pascalCase name}}Return {
  domRef: React.RefObject<HTMLElement | null>;
  get{{pascalCase name}}Props: () => React.HTMLAttributes<HTMLElement>;
}

export function use{{pascalCase name}}(props: Use{{pascalCase name}}Props = {}): Use{{pascalCase name}}Return {
  const {
    disabled = false,
    onClick,
    ...otherProps
  } = props;

  const domRef = useRef<HTMLElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    },
    [disabled, onClick]
  );

  const get{{pascalCase name}}Props = useCallback((): React.HTMLAttributes<HTMLElement> => {
    return {
      ref: domRef,
      onClick: handleClick,
      "aria-disabled": disabled,
      ...otherProps,
    };
  }, [disabled, handleClick, otherProps]);

  return {
    domRef,
    get{{pascalCase name}}Props,
  };
}