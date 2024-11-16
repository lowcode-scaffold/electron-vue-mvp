<template>
  <div class="wh-full flex-center flex-col">
    <div class="flex-y-center gap-4">
      <Button @click="presenter.handleGetMac">获取 mac 地址</Button>
      <Button @click="presenter.handleMinimi">最小化窗口</Button>
      <Button @click="presenter.handleMaximize">最大化窗口</Button>
      <Button @click="presenter.handleClose">关闭窗口</Button>
      <Button @click="presenter.handleToggleTabMode">切换 tab 模式</Button>
    </div>

    <div class="mt-20 flex-col">
      <Message v-if="model.mac.value">mac 地址：{{ model.mac.value }}</Message>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="scss" scoped></style>
