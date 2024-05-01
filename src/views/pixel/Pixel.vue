<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <div class="pixel">
    <Navigation class="pixel__nav" />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.pixel {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__nav {
    flex: 0;
  }
}
</style>
