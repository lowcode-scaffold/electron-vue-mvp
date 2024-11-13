import { reactive, ref } from "vue";

export const useModel = () => {
  const tooltipDisabled = ref(false);

  const contextMenus = ref([
    { label: "Copy", icon: "pi pi-copy" },
    { label: "Rename", icon: "pi pi-file-edit" },
  ]);

  const menuRef = ref();

  return {
    tooltipDisabled,
    contextMenus,
    menuRef,
  };
};

export type Model = ReturnType<typeof useModel>;
