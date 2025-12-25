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

export function useIntersectionObserver(
  globalOptions?: Omit<VisibilityOptions, 'once'>
) {
  const injectedObserver = inject(VisibilityObserverKey, null);
  const observer = injectedObserver ?? new VisibilityObserver(globalOptions);

  const observe = (
    elementRef: Ref<HTMLElement | null>,
    options: ObserveParams
  ) => {
    if (!elementRef.value) return;
    observer.observe(elementRef.value, options.callback, options);
  };

  const unobserve = (elementRef: Ref<HTMLElement | null>) => {
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
