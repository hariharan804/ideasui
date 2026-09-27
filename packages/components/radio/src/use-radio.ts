import { useCallback, useRef } from 'react';

export interface UseRadioProps {
  /**
   * Whether the component is disabled
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent) => void;
}

export interface UseRadioReturn {
  domRef: React.RefObject<HTMLElement | null>;
  getRadioProps: () => React.HTMLAttributes<HTMLElement> & {
    ref: React.RefObject<HTMLElement | null>;
  };
}

export function useRadio(props: UseRadioProps = {}): UseRadioReturn {
  const { disabled = false, onClick, ...otherProps } = props;

  const domRef = useRef<HTMLElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        event.preventDefault();

        return;
      }

      onClick?.(event);
    },
    [disabled, onClick],
  );

  const getRadioProps = useCallback(() => {
    return {
      ref: domRef,
      onClick: handleClick,
      'aria-disabled': disabled,
      ...otherProps,
    };
  }, [disabled, handleClick, otherProps]);

  return {
    domRef,
    getRadioProps,
  };
}
