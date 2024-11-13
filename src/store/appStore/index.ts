import { ref } from "vue";

const logOutConfirm = ref(0);

const lockScreen = ref(false);

const token = ref("");

const appVersion = ref("1.0.0");

const activeRole = ref({
  roleName: "",
  roleCode: "",
});

export const useAppStore = () => {
  return {
    logOutConfirm,
    lockScreen,
    token,
    activeRole,
    appVersion,
  };
};
