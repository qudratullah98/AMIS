import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import i18n from "./Components/utils/i18";

const appName =
    import.meta.env.VITE_APP_NAME || "سیستم مدیریت ترمینال باربری حیرتان";

// ✅ Inject custom styles for NProgress bar
const style = document.createElement("style");
style.innerHTML = `
  /* Progress bar color and height */
  #nprogress .bar {
    height: 4px !important; /* Change thickness */
  }

  /* Glowing tail effect */
  #nprogress .peg {
    box-shadow: 0 0 10px #ff6600, 0 0 5px #ff6600 !important;
  }

  /* Spinner customization */
  #nprogress .spinner-icon {
    border-top-color: #ff6600 !important;
    border-left-color: #ff6600 !important;
  }
`;
document.head.appendChild(style);

createInertiaApp({
    title: () => "سیستم مدیریت ترمینل باربری حیرتان",
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#ff6600", // Custom progress bar color
        showSpinner: false,
    },
});
