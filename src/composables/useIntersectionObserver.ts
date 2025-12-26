import { inject, onBeforeUnmount, type Ref } from 'vue';
import {
  VisibilityObserver,
  type VisibilityOptions,
  type VisibilityCallback,
} from '../core/visibilityObserver';
import { VisibilityObserverKey } from '../plugin';

interface ObserveParams extends VisibilityOptions {
  callback: VisibilityCallback;
}

export function useIntersectionObserver() {
  const injectedObserver = inject(VisibilityObserverKey, null);
  const observer = injectedObserver ?? new VisibilityObserver();

  const observe = (
    elementRef: Ref<HTMLElement | null>,
    options: ObserveParams
  ): void => {
    if (!elementRef.value) return;
    observer.observe(elementRef.value, options.callback, options);
  };

  const unobserve = (elementRef: Ref<HTMLElement | null>): void => {
    if (!elementRef.value) return;
    observer.unobserve(elementRef.value);
  };

  onBeforeUnmount(() => {
    if (!injectedObserver) {
      observer.disconnect();
    }
  });

  return {
    observe,
    unobserve,
  };
}
