<template>
  <div class="tabs-group" :style="`background-color:${bgColor}`">
    <draggable
      v-model="tabsStore.tabs.value"
      @start="presenter.handleStartMove"
      @end="presenter.handleEndMove"
      tag="div"
      :componentData="{
        name: 'fade',
        class: 'tabs',
      }"
      item-key="id"
    >
      <template #item="{ element }">
        <div
          :class="[
            'tab',
            appStore.lockScreen.value ? 'tab-drag' : '',
            element.id === tabsStore.currentTabId.value ? 'tab-active' : '',
          ]"
          @mousedown="tabsStore.handleChangeTab(element)"
          @contextmenu="handleRightClick"
          v-tooltip.bottom="{
            value: element.name,
            showDelay: 500,
            disabled: model.tooltipDisabled.value,
          }"
        >
          <p class="text">{{ element.name }}</p>
          <div
            v-if="tabsStore.tabs.value.length !== 1"
            class="close-button"
            @mousedown="(e) => e.stopPropagation()"
            @click="tabsStore.handleCloseTab(element)"
          ></div>
        </div>
      </template>
    </draggable>
    <TitleBar />
    <ContextMenu ref="menu" :model="items" />
  </div>
</template>
<script lang="ts" setup>
import draggable from "vuedraggable";
import ContextMenu, { ContextMenuMethods } from "primevue/contextmenu";
import { useTabsStore } from "@/store/tabs";
import TitleBar from "../TitleBar/index.vue";
import { usePresenter } from "./presenter";
import { ref } from "vue";
import { refresh } from "@/utils/iframeWebService";
import { useAppStore } from "@/store/appStore";
import { computed } from "vue";

const menu = ref<ContextMenuMethods | null>(null);
const items = ref([
  {
    label: "刷新",
    command: () => {
      refresh();
    },
  },
  {
    label: "关闭其他标签页",
    command: () => {
      tabsStore.closeOtherTabs();
    },
  },
]);

const handleRightClick = (event: MouseEvent) => {
  model.tooltipDisabled.value = true;
  menu.value?.show(event);
  setTimeout(() => {
    model.tooltipDisabled.value = false;
  }, 500);
};

const tabsStore = useTabsStore();
const appStore = useAppStore();
const presenter = usePresenter();
const { model } = presenter;

const bgColor = computed(() => {
  return appStore.appFocus.value ? "#cdcdcd" : "#E8E8E8";
});
</script>
<style lang="scss" scoped>
.tabs-group {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-width: 0;
  padding-top: 5px;

  color: rgba(0, 0, 0, 0.85);

  background-color: #cdcdcd;

  -webkit-app-region: drag;
}

.tabs {
  user-select: none;

  position: relative;
  z-index: 1;

  display: inline-flex;
  align-items: flex-end;

  box-sizing: border-box;
  width: 90%;
  height: 38px;
  padding: 0 8px;

  line-height: 1;
}

.tab {
  cursor: default;

  position: relative;

  overflow: hidden;
  display: block;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  max-width: 160px;
  height: 100%;
  margin-right: -1px;
  padding: 10px 12px;

  font-size: 14px;
  white-space: nowrap;

  background-color: transparent;
  border-radius: 10px 10px 0 0;

  -webkit-app-region: none;

  /* transition: background-color 0.2s; */

  &::after {
    content: "";

    position: absolute;
    z-index: -1;
    top: 50%;
    right: 0;
    transform: translateY(-50%);

    display: block;

    width: 1px;
    height: 20px;

    background-color: #888;
  }

  &::before {
    content: "";

    position: absolute;
    right: 1px;

    display: block;

    width: 30px;
    height: 20px;

    background-color: v-bind("bgColor");

    /* transition: background-color 0.2s; */
  }

  .text {
    margin: 0;
    padding: 0;
  }

  &:hover {
    background-color: #dadada;

    &::before {
      right: 0;
      background-color: #dadada;
    }
  }
  &.tab-active {
    background-color: #fff;

    &::before {
      right: 0;
      background-color: #fff;
    }
  }

  > .close-button {
    position: absolute;
    right: 8px;
    transform: rotate(45deg);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;
    padding: 6px;

    border-radius: 100%;

    &::before,
    &::after {
      content: "";

      position: absolute;

      display: block;

      width: 2px;
      height: 12px;

      background-color: #2f2f2f;
    }

    &::before {
      transform: rotate(90deg);
    }

    &:hover {
      background-color: #8c8987;
    }
  }
}
.tab-drag {
  -webkit-app-region: drag;
}
</style>
