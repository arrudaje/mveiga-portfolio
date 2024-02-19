<script lang="ts" setup>
import medium from "@/assets/png/medium.png";
import linkedin from "@/assets/png/linkedin.png";
import uxdesigner from "@/assets/png/ux-designer.png";
import productdesigner from "@/assets/png/product-designer.png";
import researcher from "@/assets/png/researcher.png";
import painter from "@/assets/png/painter.png";
import traveller from "@/assets/png/traveller.png";
import Navigation from "@/components/Navigation.vue";
import { useInterval } from "@vueuse/core";
import { watch } from "vue";
import Bubble from "@/components/Bubble.vue";
import Char1 from "@/assets/svg/char_undercons1.svg";
import Char2 from "@/assets/svg/char_undercons2.svg";
import Cone from "@/assets/svg/cone_undercons.svg";
import Cloud1 from "@/assets/svg/cloud1.svg";
import Cloud2 from "@/assets/svg/cloud2.svg";
import Cloud3 from "@/assets/svg/cloud3.svg";

const { counter, reset } = useInterval(2000, { controls: true });
const { counter: charCounter, reset: charReset } = useInterval(500, {
  controls: true,
});
watch(counter, () => counter.value === 5 && reset());
watch(charCounter, () => charCounter.value === 2 && charReset());
</script>

<template>
  <div class="home pixel">
    <Navigation class="pixel__nav" />
    <img :src="Cloud2" class="pixel__cloud" data-cloud-id="1" />
    <img :src="Cloud3" class="pixel__cloud" data-cloud-id="2" />
    <div class="pixel__hero">
      <h1 class="pixel__hero__title">I'm Mari Veiga,</h1>
      <div class="pixel__hero__activities">
        <Transition mode="out-in">
          <img :src="uxdesigner" alt="UX Designer" data-activity="1" />
          <!--<img
            v-else-if="counter === 1"
            :src="productdesigner"
            alt="Product Designer"
            data-activity="2"
          />
          <img
            v-else-if="counter === 2"
            :src="researcher"
            alt="Researcher"
            data-activity="3"
          />
          <img
            v-else-if="counter === 3"
            :src="painter"
            alt="Painter"
            data-activity="4"
          />
          <img
            v-else-if="counter === 4"
            :src="traveller"
            alt="Traveller"
            data-activity="5"
          />-->
        </Transition>
      </div>
      <p class="pixel__hero__description">
        Based in Amsterdam - Netherlands, I'm on a quest to blend cultures,
        break bias barriers, and bridge the gap between
        <del>users</del> (<em>participants</em>) and businesses.<br />
        This is an adventure of crafting empathetic and user-centric experiences
        for a caring world.
      </p>
      <div class="pixel__hero__social">
        <a
          href="https://medium.com/@mveigaj.ortiz"
          target="blank"
          class="pixel__hero__social__link"
        >
          <img :src="medium" alt="Medium" />
        </a>
        <a
          href="https://www.linkedin.com/in/marianaveigaux/"
          target="blank"
          class="pixel__hero__social__link"
        >
          <img :src="linkedin" alt="LinkedIn" />
        </a>
      </div>
    </div>
    <div class="pixel__heroine">
      <img :src="Cloud1" class="pixel__cloud" data-cloud-id="3" />
      <img :src="Cloud2" class="pixel__cloud" data-cloud-id="4" />
      <img :src="Cloud3" class="pixel__cloud" data-cloud-id="5" />
      <img :src="Cone" class="pixel__heroine__cone" />
      <div class="pixel__heroine__char">
        <img
          :src="charCounter ? Char1 : Char2"
          class="pixel__heroine__char__img"
        />
        <Bubble content="Under construction..." anchor="top-end" :width="120" />
      </div>
    </div>
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

  &__cloud {
    position: absolute;
    aspect-ratio: 3/2;
    height: 5vh;
    width: auto;
    animation: bob 2s ease-out infinite;

    &[data-cloud-id="1"] {
      left: 150px;
      top: 130px;
    }

    &[data-cloud-id="2"] {
      left: -10px;
      top: 260px;
      animation-delay: 200ms;
      animation-duration: 1.5s;
    }

    &[data-cloud-id="3"] {
      left: 45px;
      top: 0;
      animation-delay: 100ms;
      animation-duration: 2.2s;
    }

    &[data-cloud-id="4"] {
      left: 0;
      top: 45px;
      animation-delay: 300ms;
      animation-duration: 1.9s;
    }

    &[data-cloud-id="5"] {
      left: 150px;
      top: 70px;
      animation-duration: 1.7s;
    }
  }

  &__hero {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0 6vw;
    z-index: 1;

    &__title {
      font-size: 80px;
      font-weight: 700;
      line-height: 85px;
    }

    &__activities {
      margin-top: 8px;

      img {
        height: 50px;
      }
    }

    &__description {
      max-width: 560px;
      margin: 16px 0;
      font-size: 16px;
      line-height: 28px;
    }

    &__social {
      display: flex;
      gap: 16px;

      &__link {
        height: 32px;

        img {
          height: 100%;
        }
      }
    }
  }

  &__heroine {
    position: absolute;
    display: flex;
    align-items: end;
    justify-content: center;
    right: 8vw;
    bottom: 5vw;
    height: 190px;
    width: 220px;

    &__char {
      position: relative;
      display: flex;
      align-items: end;
      height: 125px;

      &__img {
        width: 65px;
      }
    }

    &__cone {
      margin-left: -60px;
      height: 50px;
      transform: translate(10px, 10px);
    }
  }

  @media (orientation: portrait) {
    &__cloud {
      height: auto;
      width: 6vw;
    }
  }

  @media (max-width: 575.98px) {
    &__cloud {
      height: 5vh;
      width: auto;

      &[data-cloud-id="1"] {
        left: 150px;
        top: 70px;
      }

      &[data-cloud-id="2"] {
        left: -10px;
        top: 150px;
        animation-delay: 200ms;
        animation-duration: 1.5s;
      }
    }

    &__hero {
      margin-top: 64px;
      justify-content: normal;

      &__title {
        font-size: 40px;
        line-height: 42px;
      }

      &__activities {
        img {
          height: 30px;
        }
      }

      &__description {
        font-size: 12px;
        line-height: 18px;
      }
    }

    &__heroine {
      right: auto;
      left: 50%;
      bottom: 64px;
      transform: translateX(-50%);
    }
  }
}

@keyframes bob {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
