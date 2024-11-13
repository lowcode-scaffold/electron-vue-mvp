import { reactive, ref } from "vue";

export const useModel = () => {
  const pwd = ref("");

  const loading = ref(false);

  const invalidMessage = ref("");

  return { pwd, loading, invalidMessage };
};

export type Model = ReturnType<typeof useModel>;
