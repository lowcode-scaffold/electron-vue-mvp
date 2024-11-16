import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import "./style.css";
import "uno.css";
import App from "./App.vue";
import { definePreset } from "@primevue/themes";
import { addIframeWebEventListener } from "./utils/iframeWebService/request";
import { addIpcRendererEventListener } from "./utils/ipcRendererService";

addIframeWebEventListener();

addIpcRendererEventListener();

const app = createApp(App);

app.directive("tooltip", Tooltip);

const Noir = definePreset(Aura, {
  semantic: {
    focusRing: {
      width: "0",
      style: "none",
      color: "",
      offset: "",
    },
    primary: {
      50: "{zinc.50}",
      100: "{zinc.100}",
      200: "{zinc.200}",
      300: "{zinc.300}",
      400: "{zinc.400}",
      500: "{zinc.500}",
      600: "{zinc.600}",
      700: "{zinc.700}",
      800: "{zinc.800}",
      900: "{zinc.900}",
      950: "{zinc.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "#0052D9",
          inverseColor: "#0052D9",
          hoverColor: "#0052D9",
          activeColor: "#0052D9",
        },
        highlight: {
          background: "none",
          focusBackground: "none",
          color: "red",
          focusColor: "none",
        },
      },
      dark: {
        primary: {
          color: "{zinc.50}",
          inverseColor: "{zinc.950}",
          hoverColor: "{zinc.100}",
          activeColor: "{zinc.200}",
        },
        highlight: {
          background: "rgba(250, 250, 250, .16)",
          focusBackground: "rgba(250, 250, 250, .24)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)",
        },
      },
    },
  },
});
app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      darkModeSelector: false || "none",
      cssLayer: {
        name: "primevue",
      },
    },
  },
});
app.use(ConfirmationService);
app.mount("#app");
