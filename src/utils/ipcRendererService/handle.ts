import { useTabsStore } from "@/store/tabs";
import { useAppStore } from "@/store/appStore";
import { refresh } from "../iframeWebService";

const tabsStore = useTabsStore();
const appStore = useAppStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handle: Record<string, (data: any) => void> = {
  addNewTab: (data: { url: string }) => {
    const { url } = data;
    tabsStore.handleAddTab(url);
    return "打开标签页成功";
  },
  closeWindow: () => {
    appStore.logOutConfirm.value++;
  },
  refreshCurrentIframe: () => {
    refresh();
  },
  windowFocus: () => {
    appStore.appFocus.value = true;
  },
  windowBlur: () => {
    appStore.appFocus.value = false;
  },
};

export default handle;
