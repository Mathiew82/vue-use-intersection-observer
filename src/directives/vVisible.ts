import type { DirectiveBinding } from 'vue';
import {
  VisibilityObserver,
  type VisibilityOptions,
  type VisibilityCallback,
} from '../core/visibilityObserver';

interface DirectiveValue extends VisibilityOptions {
  callback: VisibilityCallback;
}

const observer = new VisibilityObserver();

export const vVisible = {
  mounted(el: HTMLElement, binding: DirectiveBinding<DirectiveValue>) {
    observer.observe(el, binding.value.callback, binding.value);
  },
  unmounted(el: HTMLElement) {
    observer.unobserve(el);
  },
};
