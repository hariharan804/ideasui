export const REDUCE_MOTION_ADDON_ID = 'ideasui-reduce-motion-addon';
export const REDUCE_MOTION_GLOBAL_TYPE_ID = 'ideasui-reduce-motion';
export const REDUCE_MOTION_PARAM_KEY = 'ideasui-reduce-motion';

export const REDUCE_MOTION_VALUES = ['true', 'false'] as const;
export type ReduceMotionKey = (typeof REDUCE_MOTION_VALUES)[number];

export const DEFAULT_REDUCE_MOTION: ReduceMotionKey = 'false';

export interface ReduceMotionOption {
  value: ReduceMotionKey;
  title: string;
  icon?: string;
}

export const REDUCE_MOTION_OPTIONS: ReduceMotionOption[] = [
  {
    value: 'false',
    title: 'Animation Enabled',
    icon: 'play',
  },
  {
    value: 'true',
    title: 'Animation Disabled',
    icon: 'stop',
  },
];
