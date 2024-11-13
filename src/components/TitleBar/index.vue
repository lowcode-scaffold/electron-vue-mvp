<template>
  <div class="barContainer">
    <div class="btn btn1" @click="presenter.handleMinimi"></div>
    <div class="btn btn2" @click="presenter.handleMaximize"></div>
    <div class="btn btn3" @click="presenter.handleClose"></div>
  </div>
  <ConfirmDialog></ConfirmDialog>
</template>
<script lang="ts" setup>
import { usePresenter } from "./presenter";

const presenter = usePresenter();
</script>
<style lang="scss" scoped>
.barContainer {
  display: flex;
  margin-right: 10px;

  -webkit-app-region: none;
}
.btn {
  cursor: pointer;

  width: 18px;
  height: 18px;
  margin: 5px;

  border-radius: 50%;
}
.btn1 {
  position: relative;
  overflow: hidden;
  background: #fac536;
}
.btn1::before {
  content: "";

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  height: 10%;

  opacity: 0;
  background: #222;

  transition: 300ms;
}
.btn1:hover::before {
  top: 50%;
  opacity: 1;
}
.btn2 {
  position: relative;
  overflow: hidden;
  background: #39ea49;
}
.btn2::before {
  content: "";

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 45%;
  height: 45%;

  opacity: 0;
  background: #222;

  transition: 300ms;
}
.btn2::after {
  content: "";

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);

  width: 15%;
  height: 80%;

  opacity: 0;
  background: #39ea49;

  transition: 300ms;
}
.btn2:hover::before,
.btn2:hover::after {
  top: 50%;
  opacity: 1;
}
.btn3 {
  position: relative;
  overflow: hidden;
  background: #f25056;
}
.btn3::before {
  content: "";

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);

  width: 15%;
  height: 50%;

  opacity: 0;
  background: #222;

  transition: 300ms;
}
.btn3::after {
  content: "";

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);

  width: 15%;
  height: 50%;

  opacity: 0;
  background: #222;

  transition: 300ms;
}
.btn3:hover::before,
.btn3:hover::after {
  top: 50%;
  opacity: 1;
}
</style>
