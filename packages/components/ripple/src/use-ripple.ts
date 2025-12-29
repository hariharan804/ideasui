import {useCallback, useState} from "react";
import {getUniqueID} from "@ideasui/utils";
import {RippleItem} from "./ripple";

export function useRipple() {
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const onPress = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    const diameter = Math.max(target.offsetWidth, target.offsetHeight) * 1.5;
    const posX = clientX - rect.left;
    const posY = clientY - rect.top;

    setRipples((prev) => [
      ...prev,
      {
        id: getUniqueID(`ripple-${Date.now()}`),
        diameter,
        posX,
        posY,
      },
    ]);
  }, []);

  const onClear = useCallback((id: React.Key) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  }, []);

  return {ripples, onClear, onPress};
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
