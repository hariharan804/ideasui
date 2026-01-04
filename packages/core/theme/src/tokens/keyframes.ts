export const keyframes = {
  spin: {
    to: {transform: "rotate(360deg)"},
  },
  ping: {
    "75%, 100%": {transform: "scale(2)", opacity: "0"},
  },
  pulse: {
    "50%": {opacity: "0.5"},
  },
  bounce: {
    "0%, 100%": {
      transform: "translateY(-25%)",
      animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
    },
    "50%": {
      transform: "none",
      animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
    },
  },
  fadeIn: {
    from: {opacity: "0"},
    to: {opacity: "1"},
  },
  fadeOut: {
    from: {opacity: "1"},
    to: {opacity: "0"},
  },
  slideIn: {
    from: {transform: "translateY(-10px)", opacity: "0"},
    to: {transform: "translateY(0)", opacity: "1"},
  },
  slideOut: {
    from: {transform: "translateY(0)", opacity: "1"},
    to: {transform: "translateY(-10px)", opacity: "0"},
  },
  scaleIn: {
    from: {transform: "scale(0.95)", opacity: "0"},
    to: {transform: "scale(1)", opacity: "1"},
  },
  scaleOut: {
    from: {transform: "scale(1)", opacity: "1"},
    to: {transform: "scale(0.95)", opacity: "0"},
  },
} as const;
