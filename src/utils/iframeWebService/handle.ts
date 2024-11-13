import { useTabsStore } from "@/store/tabs";
import { setGlobalData } from "./globalData";
import { useAppStore } from "@/store/appStore";
import { getMac } from "../ipcRendererService";

const tabsStore = useTabsStore();
const appStore = useAppStore();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handle: Record<string, (data: any) => void> = {
  updateTitle: (data: { id: string; title: string }) => {
    const { title, id } = data;
    if (title !== "electron-vue-mvp") {
      setGlobalData({ inLoginPage: false });
    }
    tabsStore.updateTitle(id, title);
  },
  addNewTab: (data: { url: string }) => {
    const { url } = data;
    tabsStore.handleAddTab(url);
  },
  closeOtherTabs: (data: { inLoginPage?: boolean }) => {
    if (data.inLoginPage) {
      setGlobalData({ inLoginPage: data.inLoginPage });
    }
    tabsStore.closeOtherTabs();
  },
  lockScreen: () => {
    appStore.lockScreen.value = true;
  },

  syncAppData: (data: {
    token: string;
    role: {
      roleCode: string;
      roleName: string;
    };
  }) => {
    appStore.token.value = data.token;
    appStore.activeRole.value = {
      ...data.role,
    };
  },
  getAppInfo: async () => {
    let mac = "";
    try {
      mac = await getMac();
    } catch (ex) {
      console.log(ex);
    }
    return {
      version: appStore.appVersion.value,
      mac: mac,
    };
  },
};

export default handle;
