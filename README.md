# vue-visibility-observer

![npm](https://img.shields.io/npm/v/vue-visibility-observer)
![npm downloads](https://img.shields.io/npm/dw/vue-visibility-observer)
![license](https://img.shields.io/npm/l/vue-visibility-observer)
![stars](https://img.shields.io/github/stars/your-username/vue-visibility-observer?style=social)
![forks](https://img.shields.io/github/forks/your-username/vue-visibility-observer?style=social)

simple and lightweight visibility observer for **vue 3**, built on top of `intersectionobserver`.

## ✨ features

- vue 3 plugin
- composable api
- uses native `intersectionobserver`
- supports offsets and reactivity
- one global observer (better performance)
- fully written in typescript

## 🚀 how to use

### 📦 installation

```bash
pnpm add vue-visibility-observer
# or
npm install vue-visibility-observer
```

### 🔌 plugin setup

```typescript
import { createapp } from 'vue';
import app from './app.vue';
import { visibilityplugin } from 'vue-visibility-observer';

createapp(app)
  .use(visibilityplugin, {
    offset: 100,
  })
  .mount('#app');
```

### 🧩 usage (composable)

```vue
<script setup lang="ts">
import { ref, onmounted } from 'vue';
import { usevisibilityobserver } from 'vue-visibility-observer';

const target = ref<htmlelement | null>(null);
const isvisible = ref(false);

const { observe } = usevisibilityobserver();

onmounted(() => {
  observe(target, {
    once: false,
    callback: (visible) => {
      isvisible.value = visible;
    },
  });
});
</script>

<template>
  <div
    :style="{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '40px',
      height: '40px',
      borderradius: '50%',
      backgroundcolor: isvisible ? 'green' : 'red',
    }"
  />

  <div style="height: 150vh"></div>

  <div ref="target" style="height: 200px; background: lightgray">
    observed element
  </div>
</template>
```

### 🛠 API

**Composable**

```bash
useVisibilityObserver()
```

Returns the observer utilities.

**Methods**

```bash
observe(target, options)
```

Start observing an element.

**Parameters:**

| Name    | Type    | Description            |
| ------- | ------- | ---------------------- |
| target  | ref     | Element ref to observe |
| options | Options | Observer configuration |

**Options:**

| Option    | Type            | Description                      | Optional | Default |
| --------- | --------------- | -------------------------------- | -------- | ------- |
| callback  | function        | Called when visibility changes   | false    | —       |
| offset    | number          | Trigger before entering viewport | true     | `0`     |
| threshold | number or array | Intersection threshold           | true     | `0`     |
| once      | boolean         | Trigger only the first time      | true     | `true`  |
