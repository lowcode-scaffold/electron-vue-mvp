<template>
  <div>{{ model }}</div>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
const { model } = presenter;
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
