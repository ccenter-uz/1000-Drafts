import { createPinia, defineStore } from "pinia";

export const pinia = createPinia();

export const usePiniaCounter = defineStore({
  id: "basic",
  state: () => ({}),
  actions: {},
});
