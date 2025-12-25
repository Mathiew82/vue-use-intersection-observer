export interface VisibilityOptions {
  offset?: number;
  threshold?: number | number[];
  once?: boolean;
}

export type VisibilityCallback = (
  isVisible: boolean,
  entry: IntersectionObserverEntry
) => void;

interface ObservedElement {
  callback: VisibilityCallback;
  once: boolean;
}

export class VisibilityObserver {
  private observer: IntersectionObserver;
  private elements = new Map<Element, ObservedElement>();

  constructor(options?: Omit<VisibilityOptions, 'once'>) {
    this.observer = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: this.buildRootMargin(options?.offset),
      threshold: options?.threshold ?? 0,
    });
  }

  private buildRootMargin(offset = 0): string {
    return `0px 0px -${offset}px 0px`;
  }

  private handleIntersect = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      const data = this.elements.get(entry.target);
      if (!data) continue;

      const isVisible = entry.isIntersecting;
      data.callback(isVisible, entry);

      if (isVisible && data.once) {
        this.unobserve(entry.target);
      }
    }
  };

  observe(
    element: Element,
    callback: VisibilityCallback,
    options: VisibilityOptions = {}
  ) {
    this.elements.set(element, {
      callback,
      once: options.once ?? true,
    });

    this.observer.observe(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
    this.observer.unobserve(element);
  }

  disconnect() {
    this.elements.clear();
    this.observer.disconnect();
  }
}
