import { ref } from "vue";

type Tab = {
  id: string;
  name: string;
  url: string;
};

const currentTabId = ref<undefined | string>(undefined);

const tabs = ref<Tab[]>([]);

/** iframe 使用独立的列表，避免 tab 被拖动的时候导致 iframe 刷新 */
const iframeList = ref<Tab[]>([]);

const handleChangeTab = (tab: Tab) => {
  currentTabId.value = tab.id;
};

const handleCloseTab = (tab: Tab) => {
  const closedIndex = tabs.value.findIndex((t) => t.id === tab.id);
  if (currentTabId.value === tab.id) {
    if (closedIndex === tabs.value.length - 1) {
      currentTabId.value = tabs.value[closedIndex - 1]?.id;
    } else {
      currentTabId.value = tabs.value[closedIndex + 1]?.id;
    }
  }
  tabs.value.splice(closedIndex, 1);
  iframeList.value.splice(closedIndex, 1);
};

const handleAddTab = (url: string) => {
  const id = Date.now().toString();
  if (url.includes("?")) {
    url = url + "&iframeId=" + id;
  } else {
    url = url + "?iframeId=" + id;
  }
  tabs.value.push({
    id: id,
    name: "electron-vue-mvp",
    url: url,
  });
  iframeList.value.push({
    id: id,
    name: "electron-vue-mvp",
    url: url,
  });
  currentTabId.value = id;
};

const updateTitle = (id: string, title: string) => {
  const tab = tabs.value.find((t) => t.id === id);
  if (tab) {
    tab.name = title;
  }
};

const closeOtherTabs = () => {
  tabs.value = tabs.value.filter((s) => s.id === currentTabId.value);
  iframeList.value = iframeList.value.filter(
    (s) => s.id === currentTabId.value,
  );
};

export const useTabsStore = () => {
  return {
    currentTabId,
    tabs,
    /** iframe 使用独立的列表，避免 tab 被拖动的时候导致 iframe 刷新 */
    iframeList,
    handleChangeTab,
    handleCloseTab,
    handleAddTab,
    updateTitle,
    closeOtherTabs,
  };
};

export type TabsStore = ReturnType<typeof useTabsStore>;
