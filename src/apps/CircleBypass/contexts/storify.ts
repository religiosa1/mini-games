import { createStore } from "solid-js/store";

export function storify<T extends object>(obj: T) {
  const [store] = createStore(obj);
  return store;
}