<script lang="ts" setup>
import type { Role, Tag } from "@/util/enums";

defineProps<{
  link: string;
  title: string;
  subtitle: string;
  description: string;
  roles: Array<Role>;
  tags: Array<Tag>;
  image: string;
  color: string;
}>();
</script>

<template>
  <a :href="link" target="_blank" class="study">
    <header class="study__header">
      <h2 class="study__header__title">{{ title }}</h2>
      <h3 class="study__header__subtitle">{{ subtitle }}</h3>
    </header>
    <main class="study__main">
      <div class="study__main__description">{{ description }}</div>
      <div class="study__main__roles">Roles: {{ roles.join(", ") }}</div>
      <div class="study__main__tags">
        <div v-for="tag in tags" class="study__main__tags__tag">
          {{ tag }}
        </div>
      </div>
    </main>
    <img :src="image" :alt="`${title} cover picture`" class="study__cover" />
  </a>
</template>

<style lang="scss" scoped>
.study {
  position: relative;
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  border-radius: 8px;
  background: linear-gradient(
    0deg,
    #fff 45.8%,
    rgba(242, 243, 245, 0.1) 118.7%
  );
  box-shadow: 4px 4px 10px 0px rgba(71, 46, 46, 0.25);
  transition: transform 0.5s ease-out, box-shadow 0.5s ease-out;

  &:hover {
    transform: scale(1.005);
    box-shadow: 4px 5px 10px 2px rgba(71, 46, 46, 0.25);
  }

  &__header {
    display: flex;
    flex-direction: column;

    &__title {
      margin: 0;
      font-size: 32px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      letter-spacing: 0.64px;
      text-transform: uppercase;
    }

    &__subtitle {
      margin: 0;
      font-size: 20px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
  }

  &__main {
    &__description {
      font-weight: 500;
      line-height: 28px;
      margin-bottom: 8px;
    }

    &__roles {
      font-size: 14px;
      font-style: italic;
      font-weight: 400;
      line-height: 20px;
      margin-bottom: 16px;
    }

    &__tags {
      display: flex;
      gap: 8px;

      &__tag {
        display: flex;
        padding: 0 8px;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        background: #c2c2ff;
        font-size: 10px;
        font-style: normal;
        font-weight: 700;
        line-height: 16px;
        letter-spacing: 0.2px;
        text-transform: uppercase;
        background: v-bind(color);
      }
    }
  }

  &__cover {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 120%;
    border-bottom-right-radius: 8px;
  }
}
</style>
