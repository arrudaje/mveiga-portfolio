import type { ObjectDirective, DirectiveBinding, App } from "vue";
import { createApp, h } from "vue";
import Tooltip from "@/components/tooltip/Tooltip.vue";

interface TooltipOptions {
  text: string;
  offset?: { x: number; y: number };
}

// Use a WeakMap to store tooltip-related data
const tooltipData = new WeakMap<
  HTMLElement,
  { app: App<Element>; element: HTMLElement }
>();

const tooltip: ObjectDirective<HTMLElement, TooltipOptions> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<TooltipOptions>) {
    const tooltipApp = createApp({
      render: () =>
        h(Tooltip, {
          text: binding.value.text,
          targetEl: el,
          offset: binding.value.offset,
        }),
    });

    const tooltipElement = document.createElement("div");
    document.body.appendChild(tooltipElement);
    tooltipApp.mount(tooltipElement);

    tooltipData.set(el, { app: tooltipApp, element: tooltipElement });
  },
  updated(el: HTMLElement, binding: DirectiveBinding<TooltipOptions>) {
    const elementData = tooltipData.get(el);
    if (elementData) {
      const { app, element } = elementData;
      app.unmount();
      const newApp = createApp({
        render: () =>
          h(Tooltip, {
            text: binding.value.text,
            targetEl: el,
            offset: binding.value.offset,
          }),
      });
      newApp.mount(element);
    }
  },

  unmounted(el: HTMLElement) {
    const elementData = tooltipData.get(el);
    if (elementData) {
      const { app, element } = elementData;
      app.unmount();
      document.body.removeChild(element);
      tooltipData.delete(el);
    }
  },
};

export default tooltip;
