<script setup lang="ts">
import Tabs from "@/components/Tabs/index.vue";
import LockScreen from "@/components/LockScreen/index.vue";
import { useTabsStore } from "./store/tabs";
import { onMounted } from "vue";
const tabsStore = useTabsStore();
onMounted(() => {
  tabsStore.handleAddTab(import.meta.env.VITE_ENTRY_URL);
});
</script>

<template>
  <div class="h-100vh w-100vw bg-white">
    <div class="w-100vw">
      <Tabs />
    </div>
    <iframe
      class="iframe"
      v-for="tab in tabsStore.iframeList.value"
      :key="tab.id"
      v-show="tab.id === tabsStore.currentTabId.value"
      :src="tab.url"
      :id="tab.id"
      allow="clipboard-read; clipboard-write"
    ></iframe>
    <LockScreen />
  </div>
</template>

<style scoped>
.iframe {
  width: 100%;
  height: calc(100% - 43px);
  border: none;
}
</style>
