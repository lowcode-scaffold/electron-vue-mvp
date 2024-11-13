import Service from "./service";
import { useModel } from "./model";

export const usePresenter = () => {
  const model = useModel();
  const service = new Service(model);

  const handleStartMove = () => {
    model.tooltipDisabled.value = true;
  };

  const handleEndMove = () => {
    model.tooltipDisabled.value = false;
  };

  const handleRightClick = () => {
    model.menuRef.value.show();
  };

  return {
    model,
    service,
    handleStartMove,
    handleEndMove,
    handleRightClick,
  };
};
