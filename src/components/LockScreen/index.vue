<template>
  <div
    class="lockscreen"
    :style="`width:${
      lockScreen ? '100vw' : 0
    };background-image:url(${LockScreen})`"
  >
    <div class="w-30%">
      <InputGroup>
        <!-- <InputText
          type="text"
          v-model="model.pwd.value"
          @input="model.invalidMessage.value = ''"
        /> -->
        <Password
          v-model="model.pwd.value"
          @input="model.invalidMessage.value = ''"
          :feedback="false"
          toggleMask
          @keydown.enter="presenter.handleUnlock"
        />

        <Button
          label="进入系统"
          severity="info"
          :loading="model.loading.value"
          :disabled="!model.pwd.value"
          @click="presenter.handleUnlock"
        />
      </InputGroup>
      <div v-if="model.invalidMessage.value" class="mt-10 color-#dc2626">
        {{ model.invalidMessage.value }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/store/appStore";
import { usePresenter } from "./presenter";
import LockScreen from "@/assets/lockscreen.png";

const { lockScreen } = useAppStore();
const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
