import type { DirectiveBinding } from 'vue';
import {
  VisibilityObserver,
  type VisibilityCallback,
} from '../core/visibilityObserver';

const observer = new VisibilityObserver();

export const vVisible = {
  mounted(el: HTMLElement, binding: DirectiveBinding<VisibilityCallback>) {
    observer.observe(el, binding.value, { once: false });
  },
  unmounted(el: HTMLElement) {
    observer.unobserve(el);
  },
};
