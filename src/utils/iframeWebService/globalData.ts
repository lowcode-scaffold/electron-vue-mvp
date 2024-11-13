let globalData = {
  inLoginPage: false,
};

export const setGlobalData = (data: { inLoginPage?: boolean }) => {
  globalData = { ...globalData, ...data };
};

export const getGlobalData = () => globalData;
