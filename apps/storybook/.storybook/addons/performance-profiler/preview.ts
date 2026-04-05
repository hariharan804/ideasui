import { DEFAULT_REACT_SCAN, REACT_SCAN_GLOBAL_TYPE_ID } from './registry';

export { REACT_SCAN_GLOBAL_TYPE_ID };

export const reactScanGlobalType = {
  [REACT_SCAN_GLOBAL_TYPE_ID]: {
    name: 'React Scan',
    description: 'Enable React Scan to detect performance issues (Only works in isolation mode)',
    defaultValue: DEFAULT_REACT_SCAN,
    toolbar: {
      icon: 'eye',
      items: [
        { value: 'false', title: 'React Scan Off', icon: 'power' },
        { value: 'true', title: 'React Scan On', icon: 'eye' },
      ],
      showName: true,
    },
  },
} as const;
