<script lang="ts" setup>
</script>

<template>
  <nav class="navbar">
    <ul role="navigation" class="navbar__list">
      <li class="navbar__list__item">
        <router-link :to="{ name: 'about' }" class="navbar__list__item__link">
          About Me
        </router-link>
      </li>
      <li class="navbar__list__item">
        <router-link :to="{ name: 'studies' }" class="navbar__list__item__link">
          Case Studies
        </router-link>
      </li>
      <li class="navbar__list__item">
        <router-link :to="{ name: 'contact' }" class="navbar__list__item__link">
          Contact
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  max-width: 500px;
  padding: 24px 16px;
}
.navbar__list {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  list-style: none;
  padding: 0;
}

.navbar__list__item__link {
  position: relative;
  display: inline-block;
  font-weight: 700;
  transition: all 300ms ease-out;
}

.navbar__list__item__link::after {
  content: "";
  height: 0;
  width: 0;
  border-bottom: 4px solid var(--color-highlight);
  transition: width 300ms ease-out;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.navbar__list__item__link:hover::after {
  width: 50px;
}

.navbar__list__item__link.router-link-active {
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.navbar__list__item__link.router-link-active::before {
  content: "";
  width: 120px;
  height: 120px;
  position: absolute;
  z-index: -1;
  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--color-highlight) 0%,
    rgba(0, 0, 0, 0) 100%
  );
    background-position: center;
    background-repeat: no-repeat;
  animation: radial-grow 300ms ease-out forwards;
}

@keyframes radial-grow {
  from {
    background-size: 0% 0%;
  }
  to {
    background-size: 100% 100%;
  }
}
</style>