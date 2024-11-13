import { checkPwd } from "./api";
import { Model } from "./model";

export default class Service {
  private model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  async unLock() {
    this.model.loading.value = true;
    await checkPwd({
      password: this.model.pwd.value,
      type: "LOCK_SCREEN",
    }).finally(() => {
      this.model.loading.value = false;
    });
  }
}
