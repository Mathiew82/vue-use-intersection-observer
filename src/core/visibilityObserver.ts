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

type ObserverKey = string;

interface ObserverBucket {
  observer: IntersectionObserver;
  elements: Map<Element, ObservedElement>;
}

export class VisibilityObserver {
  private buckets = new Map<ObserverKey, ObserverBucket>();

  private buildRootMargin(offset = 0): string {
    return `0px 0px -${offset}px 0px`;
  }

  private getKey(offset = 0, threshold: number | number[] = 0): ObserverKey {
    const t = Array.isArray(threshold)
      ? threshold.join(',')
      : String(threshold);
    return `${offset}|${t}`;
  }

  private getBucket(
    offset = 0,
    threshold: number | number[] = 0
  ): ObserverBucket {
    const key = this.getKey(offset, threshold);
    const existing = this.buckets.get(key);
    if (existing) return existing;

    const bucket: ObserverBucket = {
      elements: new Map<Element, ObservedElement>(),
      observer: new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const data = bucket.elements.get(entry.target);
            if (!data) continue;

            const isVisible = entry.isIntersecting;
            data.callback(isVisible, entry);

            if (isVisible && data.once) {
              this.unobserve(entry.target);
            }
          }
        },
        {
          root: null,
          rootMargin: this.buildRootMargin(offset),
          threshold,
        }
      ),
    };

    this.buckets.set(key, bucket);
    return bucket;
  }

  observe(
    element: Element,
    callback: VisibilityCallback,
    options: VisibilityOptions = {}
  ): void {
    const offset = options.offset ?? 0;
    const threshold = options.threshold ?? 0;
    const bucket = this.getBucket(offset, threshold);

    bucket.elements.set(element, {
      callback,
      once: options.once ?? true,
    });

    bucket.observer.observe(element);
  }

  unobserve(element: Element): void {
    for (const [key, bucket] of this.buckets) {
      if (!bucket.elements.has(element)) continue;

      bucket.elements.delete(element);
      bucket.observer.unobserve(element);

      if (bucket.elements.size === 0) {
        bucket.observer.disconnect();
        this.buckets.delete(key);
      }

      return;
    }
  }

  disconnect(): void {
    for (const [, bucket] of this.buckets) {
      bucket.elements.clear();
      bucket.observer.disconnect();
    }
    this.buckets.clear();
  }
}
