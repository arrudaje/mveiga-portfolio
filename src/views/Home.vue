<script lang="ts" setup>
import Navbar from "@/components/Navbar.vue";
import { computed, inject, ref } from "vue";
import { useWindowSize } from "@vueuse/core";
import { CHANGE_THEME } from "@/util/symbols";
import Curved from "@/assets/svg/Curved.vue";
import Burger from "@/assets/svg/Burger.vue";

const changeTheme = inject(CHANGE_THEME, () => null);

const { width, height } = useWindowSize();
const x = ref(0);
const y = ref(0);

setInterval(() => {
  x.value = Math.random() * width.value;
  y.value = Math.random() * height.value;
}, 3000);

const xPx = computed(() => `${x.value}px`);
const yPx = computed(() => `${y.value}px`);
</script>

<template>
  <div class="home">
    <div class="home__backdrop"></div>
    <div class="home__description">
      <!-- I'm a<br/>UX Designer -->
      Under<br />construction
    </div>
    <Burger />
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
      <!--<Navbar class="home__logo-nav__navbar" />-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  &__backdrop {
    width: 100vw;
    height: 100vw;
    position: fixed;
    z-index: -3;
    top: calc(v-bind(yPx) - 50vw);
    left: calc(v-bind(xPx) - 50vw);
    background: radial-gradient(
      50% 50% at 50% 50%,
      var(--color-highlight) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    transition: top 5s ease-out, left 5s ease-out;
  }

  &__description {
    font-family: "Outfit", sans-serif;
    max-width: 80%;
    font-size: 100px;
    //font-size: 150px;
    line-height: 0.9;
    word-break: break-all;
    z-index: -3;
    margin-right: calc(-1 * var(--main-padding));
    margin-top: calc(-1 * var(--main-padding));
    text-align: right;
    align-self: flex-end;
    text-transform: uppercase;
    mix-blend-mode: overlay;
    opacity: 0.5;

    @media screen and (max-width: 1010px) {
      max-width: none;
      font-size: 90px;
    }

    @media screen and (max-width: 800px) {
      font-size: 80px;
      //font-size: 100px;
    }

    @media screen and (max-width: 645px) {
      font-size: 70px;
      //font-size: 100px;
    }

    @media screen and (max-width: 565px) {
      font-size: 60px;
      //font-size: 80px;
    }

    @media screen and (max-width: 485px) {
      font-size: 50px;
      //font-size: 60px;
    }

    @media screen and (max-width: 405px) {
      font-size: 40px;
      //font-size: 60px;
    }
  }

  &__logo-nav {
    display: flex;
    flex-direction: column;

    &:hover &__name__dots__dot__text {
      width: 80px;
      height: 80px;
    }

    &__name {
      display: flex;
      color: white;
      font-family: "Outfit", sans-serif;
      font-size: 290px;
      font-weight: 700;
      //margin-bottom: -112px;
      margin-bottom: -80px;
      align-items: baseline;
      line-height: 1;

      @media screen and (max-width: 1120px) {
        font-size: 200px;
      }

      @media screen and (max-width: 800px) {
        font-size: 120px;
      }

      @media screen and (max-width: 550px) {
        font-size: 90px;
      }

      &__dots {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        transform: translateY(-80%);
        gap: 16px;

        &:hover &__dot:not(.home__logo-nav__name__dots__dot--one) {
          transform: translate(0);
        }

        &__dot {
          width: 24px;
          height: 24px;
          border-radius: 12px;
          position: relative;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &__text {
            position: absolute;
            width: 0;
            height: 0;
            transform: rotate(140deg);
            z-index: -2;
            pointer-events: none;
            transition: all 300ms ease-out;

            :deep(#curve-text-path) {
              font-weight: 700;
              font-size: 80px;
              fill: var(--color-text);
            }
          }

          &:not(.home__logo-nav__name__dots__dot--one) {
            transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          &--one {
            background: var(--color-highlight);
            width: 48px;
            height: 48px;
            border-radius: 24px;
            z-index: 1;
          }

          &--two {
            background: var(--color-second);
            transform: translateY(calc(100% + 16px));
          }

          &--three {
            background: var(--color-third);
            transform: translateY(calc(270% + 16px));
          }
        }
      }
    }
  }
}
</style>