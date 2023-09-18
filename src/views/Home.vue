<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
import { computed, inject } from "vue";
import { useMouse } from "@vueuse/core";
import { CHANGE_THEME } from "@/util/symbols";
import Curved from "@/assets/svg/Curved.vue";

const changeTheme = inject(CHANGE_THEME, () => null);

const { x, y } = useMouse();
const xPx = computed(() => `${x.value}px`);
const yPx = computed(() => `${y.value}px`);
</script>

<template>
  <div class="home">
    <div class="home__backdrop"></div>
    <div class="home__description">
        I'm a UX Designer
    </div>
    <div class="home__logo-nav">
      <div class="home__logo-nav__name">
        mveiga
        <div class="home__logo-nav__name__dots">
          <span
            class="home__logo-nav__name__dots__dot home__logo-nav__name__dots__dot--one"
          >
            <Curved class="home__logo-nav__name__dots__dot__text">
              Hover me
            </Curved>
          </span>
          <span
            class="home__logo-nav__name__dots__dot home__logo-nav__name__dots__dot--two"
            @click="changeTheme(2)"
          ></span>
          <span
            class="home__logo-nav__name__dots__dot home__logo-nav__name__dots__dot--three"
            @click="changeTheme(3)"
          ></span>
        </div>
      </div>
      <Navbar class="home__logo-nav__navbar" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@800&display=swap');

.home {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
}

.home__backdrop {
  width: 90vh;
  height: 90vh;
  position: fixed;
  z-index: -3;
  top: calc(v-bind(yPx) - 45vh);
  left: calc(v-bind(xPx) - 45vh);
  background: radial-gradient(
    50% 50% at 50% 50%,
    var(--color-highlight) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  transition: top 5s ease-out, left 5s ease-out;
}

.home__description {
    font-family: 'Outfit', sans-serif;
    max-width: 70%;
    font-size: 150px;
    line-height: 0.9;
    position: fixed;
    z-index: -3;
    top: 0;
    right: 0;
    text-align: right;
    text-transform: uppercase;
    mix-blend-mode: overlay;
    opacity: 0.5;
}

.home__logo-nav {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}

.home__logo-nav:hover .home__logo-nav__name__dots__dot__text {
  width: 80px;
  height: 80px;
}

.home__logo-nav__name {
  display: flex;
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 290px;
  font-weight: 700;
  margin-bottom: -112px;
  align-items: baseline;
}

.home__logo-nav__name__dots {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  transform: translateY(-80%);
  gap: 16px;
}

.home__logo-nav__name__dots:hover
  .home__logo-nav__name__dots__dot:not(.home__logo-nav__name__dots__dot--one) {
  transform: translate(0);
}

.home__logo-nav__name__dots__dot {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.home__logo-nav__name__dots__dot__text {
  position: absolute;
  width: 0;
  height: 0;
  transform: rotate(140deg);
  z-index: -2;
  pointer-events: none;
  transition: all 300ms ease-out;
}

.home__logo-nav__name__dots__dot__text :deep(#curve-text-path) {
  font-weight: 700;
  font-size: 80px;
  fill: var(--color-highlight);
}

.home__logo-nav__name__dots__dot:not(.home__logo-nav__name__dots__dot--one) {
  transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.home__logo-nav__name__dots__dot--one {
  background: var(--color-highlight);
  width: 48px;
  height: 48px;
  border-radius: 24px;
  z-index: 1;
}

.home__logo-nav__name__dots__dot--two {
  background: var(--color-second);
  transform: translateY(calc(100% + 16px));
}

.home__logo-nav__name__dots__dot--three {
  background: var(--color-third);
  transform: translateY(calc(270% + 16px));
}

@media screen and (orientation: portrait) {
  .home__backdrop {
    width: 90vw;
    height: 90vw;
  }
}
</style>