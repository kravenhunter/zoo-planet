<template>
  <div>
    H
    <h1 class="testh1">Index 30px</h1>

    <h2 class="testh2">Index 20px</h2>
    <h3 class="testh3">Index 18px</h3>

    <h4 class="testh4">Index 16px</h4>

    <h5 class="testh5">Index 14px</h5>

    <p class="test">Index P</p>
  </div>
</template>

<style scoped>
.test {
  font-size: calc(var(--indexSize) * 1.5);
  font-weight: 800;
}
.testh1 {
  font-size: calc(var(--indexSize) * 1.5);
}
.testh2 {
  font-size: var(--indexSize);
}
.testh3 {
  font-size: calc(var(--indexSize) * 0.8);
}
.testh4 {
  font-size: calc(var(--indexSize) * 0.7);
}
</style>
