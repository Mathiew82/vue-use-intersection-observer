<div align="center">
  <img src="https://raw.githubusercontent.com/Mathiew82/vue-use-intersection-observer/main/logo.png" alt="vue-use-intersection-observer logo" width="200" />
</div>

&nbsp;

<div align="center">

[![npm](https://img.shields.io/npm/v/vue-use-intersection-observer.svg)](https://www.npmjs.com/package/vue-use-intersection-observer)
[![npm](https://img.shields.io/npm/dt/vue-use-intersection-observer.svg)](https://www.npmjs.com/package/vue-use-intersection-observer)
[![License](https://img.shields.io/crates/l/rnr.svg)](https://github.com/Mathiew82/vue-use-intersection-observer/blob/master/LICENSE)
![GitHub stars](https://img.shields.io/github/stars/Mathiew82/vue-use-intersection-observer)
![GitHub forks](https://img.shields.io/github/forks/Mathiew82/vue-use-intersection-observer)

</div>

Simple and lightweight visibility observer for **vue 3**, built on top of `IntersectionObserver`.

## ✨ Features

- Vue 3 plugin
- Composable API
- Uses native `IntersectionObserver`
- Supports offsets and reactivity
- One global observer (better performance)
- Fully written in typescript

&nbsp;

## 📦 Installation

```bash
npm i vue-use-intersection-observer
```

## 🚀 How to use

### 🔌 Plugin setup

main.ts

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { VisibilityPlugin } from 'vue-use-intersection-observer';

const app = createApp(App);
app.use(VisibilityPlugin);
app.mount('#app');
```

### 🧩 Usage (example)

In a component

```vue
<template>
  <div
    :style="{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: isvisible ? 'green' : 'red',
    }"
  />

  <div style="height: 150vh" />

  <div ref="target" style="width: 200px; height: 200px; background: gray">
    Observed Element
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useIntersectionObserver } from 'vue-use-intersection-observer';

const target = ref<HTMLElement | null>(null);
const isvisible = ref<boolean>(false);

const { observe, unobserve } = useIntersectionObserver();

onMounted(() => {
  observe(target, {
    once: false,
    callback: (visible) => {
      isvisible.value = visible;
    },
  });
});

onBeforeUnmount(() => {
  unobserve(target);
});
</script>
```

### ▶️ Demo

![Demo](https://raw.githubusercontent.com/Mathiew82/vue-use-intersection-observer/main/demo.gif)

![Demo](https://raw.githubusercontent.com/Mathiew82/vue-use-intersection-observer/main/demo2.gif)

### 🛠 API

#### `useIntersectionObserver()`

Composable used to observe when elements enter or leave the viewport.

```ts
const { observe, unobserve } = useIntersectionObserver();
```

---

#### `observe()`

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

---

#### `unobserve()`

Stop observing a previously registered element.

| Name   | Type | Description                   |
| ------ | ---- | ----------------------------- |
| target | ref  | Element ref to stop observing |
