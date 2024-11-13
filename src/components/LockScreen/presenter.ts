import Service from "./service";
import { useModel } from "./model";
import { useAppStore } from "@/store/appStore";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);
  const appStore = useAppStore();

  const handleUnlock = () => {
    service
      .unLock()
      .then(() => {
        appStore.lockScreen.value = false;
        model.pwd.value = "";
      })
      .catch((ex: { code: string; message: string }) => {
        model.invalidMessage.value = ex.message || ex.toString();
      });
  };

  return {
    model,
    service,
    handleUnlock,
  };
};
