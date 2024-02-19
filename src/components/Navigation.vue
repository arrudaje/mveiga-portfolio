<script lang="ts" setup>
import logo from '@/assets/svg/logoPixel.svg';
</script>

<template>
    <nav class="navigation">
        <img :src="logo" alt="Logo" class="navigation__logo" />
    </nav>
</template>

<style lang="scss" scoped>
.navigation {
    display: flex;
    align-items: center;
    padding: 32px 38px;
}
</style>