<script lang="ts" setup>
import Accordeon from "@/components/accordeon/Accordeon.vue";
import AccordeonGroup from "@/components/accordeon/AccordeonGroup.vue";
</script>

<template>
  <div class="about">
    <main class="about__main">
      <div class="about__main__picture"></div>
      <div class="about__main__text">
        <p class="about__main__text__paragraph">
          I know this may sound weird, but my full name is Mariana da Veiga
          Jardim Ortiz (long, right?), maybe this is the reason why my nickname
          is Mari.
        </p>
        <p class="about__main__text__paragraph">
          I am a Brazilian (Portuguese citizen and EU Passport Holder) currently
          living in the beautiful Amsterdam who graduated in Graphic Design and
          specialised in UX/UI through Iron Hack.
        </p>
        <p class="about__main__text__paragraph">
          My previous work experience gave me the knowledge to make the bridge
          between clients and stakeholders, develop ownership and improve
          time-management. I can readily tackle hands-on projects with a hint of
          leadership.
        </p>
        <p class="about__main__text__paragraph">
          I've studied Game Design for 2 and a half years, which gave me
          knowledge in HTML, CSS, C++ and Java. Therefore, talking to the devs
          will be awesome!
        </p>
        <p class="about__main__text__paragraph">
          If you want to know my full experience, please
          <a
            href="https://drive.google.com/file/d/1TLjLVhBSr4MaqTy5f-LAmD9SbCcXQQT-/view?usp=sharing"
            target="_blank"
            >download my cv</a
          >.
        </p>
      </div>
    </main>
    <footer class="about__footer">
      <AccordeonGroup v-slot="{ onOpen }">
        <Accordeon title="Top-Skills" @open="onOpen"></Accordeon>
      </AccordeonGroup>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.about {
  max-width: 800px;
  margin: 80px;
  align-self: center;

  &__main {
    display: flex;
    gap: 32px;

    &__picture {
      flex: 1 0 40%;
      position: relative;
      min-height: 400px;
      aspect-ratio: 9 / 14;
      border-radius: 4px;
      filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.25));
      background-image: url("@/assets/mari.jpg");
      background-size: cover;
      background-position: center;
      background-blend-mode: luminosity;
      background-color: black;

      &::after {
        content: "";
        background-image: url("@/assets/svg/glasses.svg");
        background-size: cover;
        aspect-ratio: 16/9;
        position: absolute;
        top: 29%;
        left: 2%;
        width: 75%;
      }
    }

    &__text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}
</style>
