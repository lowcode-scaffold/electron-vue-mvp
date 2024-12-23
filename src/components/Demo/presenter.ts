import { useConfirm } from "primevue/useconfirm";
import Service from "./service";
import { useModel } from "./model";
import {
  closeWindow,
  getMac,
  setMaximize,
  setMinimize,
} from "@/utils/ipcRendererService";
import { useAppStore } from "@/store/appStore";
import { useTabsStore } from "@/store/tabs";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const confirm = useConfirm();
  const appStore = useAppStore();
  const tabsStore = useTabsStore();

  const handleGetMac = () => {
    getMac().then((mac) => {
      model.mac.value = mac;
    });
  };

  const handleMaximize = () => {
    setMaximize();
  };

  const handleMinimi = () => {
    setMinimize();
  };

  const handleClose = () => {
    confirm.require({
      message: "即将关闭窗口，是否继续？",
      header: "退出确认",
      rejectProps: {
        label: "取消",
        severity: "secondary",
        outlined: true,
      },
      acceptProps: {
        label: "关闭",
      },
      accept: () => {
        closeWindow();
      },
      reject: () => {},
    });
  };

  const handleToggleTabMode = () => {
    appStore.tabMode.value = !appStore.tabMode.value;
    if (appStore.tabMode.value) {
      tabsStore.handleAddTab(import.meta.env.VITE_ENTRY_URL);
    } else {
      tabsStore.tabs.value = [];
      tabsStore.iframeList.value = [];
    }
  };

  return {
    model,
    service,
    handleGetMac,
    handleMaximize,
    handleMinimi,
    handleClose,
    handleToggleTabMode,
  };
};
