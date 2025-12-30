import {animation} from "./animation";
import {borderRadius} from "./border-radius";
import {boxShadow} from "./box-shadow";
import {fontSize} from "./font-size";
import {keyframes} from "./keyframes";
import {spacing} from "./spacing";
import {transitionDuration, transitionTimingFunction} from "./transition";

// export {spacing} from "./spacing";
// export {borderRadius} from "./border-radius";
// export {fontSize} from "./font-size";
// export {boxShadow} from "./box-shadow";
// export {animation} from "./animation";
// export {keyframes} from "./keyframes";
// export {transitionDuration, transitionTimingFunction} from "./transition";

export {
  spacing,
  borderRadius,
  fontSize,
  boxShadow,
  animation,
  keyframes,
  transitionDuration,
  transitionTimingFunction,
};

export const systemTokens = {
  spacing,
  borderRadius,
  fontSize,
  boxShadow,
  animation,
  keyframes,
  transitionDuration,
  transitionTimingFunction,
} as const;
