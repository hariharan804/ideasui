/* eslint-disable unicorn/consistent-function-scoping, sonarjs/prefer-immediate-return */
import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function useIsMounted(): boolean {
  // Initialize as true since component is mounted when hook is called
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}
