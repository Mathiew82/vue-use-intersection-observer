import type { App, InjectionKey, Plugin } from 'vue';
import {
  VisibilityObserver,
  type VisibilityOptions,
} from './core/visibilityObserver';
import { vVisible } from './directives/vVisible';

export const VisibilityObserverKey: InjectionKey<VisibilityObserver> =
  Symbol('VisibilityObserver');

export interface VisibilityPluginOptions extends Omit<
  VisibilityOptions,
  'once'
> {}

export const VisibilityPlugin: Plugin = {
  install(app: App, options?: VisibilityPluginOptions) {
    const observer = new VisibilityObserver(options);
    app.provide(VisibilityObserverKey, observer);
    app.directive('visible', vVisible);
  },
};
