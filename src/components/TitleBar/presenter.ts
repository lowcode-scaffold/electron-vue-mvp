import Service from "./service";
import { useModel } from "./model";
import {
  closeWindow,
  setMaximize,
  setMinimize,
} from "@/utils/ipcRendererService";
import { useConfirm } from "primevue/useconfirm";
import { getGlobalData } from "@/utils/iframeWebService/globalData";
import { useAppStore } from "@/store/appStore";
import { watch } from "vue";
import { logout } from "./api";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const confirm = useConfirm();
  const appStore = useAppStore();

  watch(
    () => appStore.logOutConfirm.value,
    () => {
      handleClose();
    },
  );

  const handleMaximize = () => {
    setMaximize();
  };

  const handleMinimi = () => {
    setMinimize();
  };

  const handleClose = () => {
    if (getGlobalData().inLoginPage) {
      closeWindow();
      return;
    }
    confirm.require({
      message: "关闭窗口将自动退出登录，是否继续？",
      header: "退出确认",
      rejectProps: {
        label: "取消",
        severity: "secondary",
        outlined: true,
      },
      acceptProps: {
        label: "确认",
      },
      accept: () => {
        logout({ accessToken: appStore.token.value }).finally(() => {
          closeWindow();
        });
      },
      reject: () => {},
    });
  };

  return {
    model,
    service,
    handleMaximize,
    handleMinimi,
    handleClose,
  };
};
