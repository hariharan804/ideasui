import {useCallback, useState} from "react";
import {RippleType} from "./ripple-types";
import {getUniqueID} from "@ideasui/utils";

export function useRipple() {
  const [ripples, setRipples] = useState<RippleType[]>([]);

  const onPress = useCallback((event: any) => {
    const trigger = event.target;

    const size = Math.max(trigger.clientWidth, trigger.clientHeight);
    debugger;
    setRipples((prevRipples) => [
      ...prevRipples,
      {
        key: getUniqueID(prevRipples.length.toString()),
        size,
        x: event.x - size / 2,
        y: event.y - size / 2,
      },
    ]);
  }, []);

  const onClear = useCallback((key: React.Key) => {
    setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
  }, []);

  return {ripples, onClear, onPress};
}

export type UseRippleReturn = ReturnType<typeof useRipple>;
