"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** true only after hydration on the client. Server and first client render: false. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
