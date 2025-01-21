<script lang="ts" setup>
import Accordeon from "@/components/accordeon/Accordeon.vue";
import AccordeonGroup from "@/components/accordeon/AccordeonGroup.vue";
import Tag from "@/components/Tag.vue";
import { Color } from "@/util/enums";
</script>

<template>
  <div class="about">
    <main class="about__main">
      <div
        v-tooltip="{ text: 'I look better via Zoom' }"
        class="about__main__picture"
      >
        <img src="@/assets/svg/glasses.svg" class="about__main__picture__glasses" />
      </div>
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
        <Accordeon open @open="onOpen">
          <template #title>Top-Skills</template>
          <div class="about__footer__skills">
            <Tag :color="Color.VIOLET" size="large"> User Interface </Tag>
            <Tag
              v-tooltip="{ text: 'Mind-reading not included' }"
              :color="Color.VIOLET"
              size="large"
            >
              User Experience
            </Tag>
            <Tag
              v-tooltip="{ text: 'My digital playground' }"
              :color="Color.VIOLET"
              size="large"
            >
              Figma
            </Tag>
            <Tag :color="Color.VIOLET" size="large"> Adobe </Tag>
            <Tag
              v-tooltip="{ text: 'Sprinting through projects like Usain Bolt' }"
              :color="Color.VIOLET"
              size="large"
            >
              Agile Methodologies
            </Tag>
            <Tag :color="Color.VIOLET" size="large"> Design Thinking </Tag>
          </div>
        </Accordeon>
        <Accordeon @open="onOpen">
          <template #title>Soft-Skills</template>
          <div class="about__footer__skills">
            <Tag
              v-tooltip="{
                text: 'According to my previous colleagues and bootcamp peers',
              }"
              :color="Color.VIOLET"
              size="large"
            >
              Proactive
            </Tag>
            <Tag :color="Color.VIOLET" size="large"> People-person </Tag>
            <Tag
              v-tooltip="{
                text: 'Like a chameleon, but with better design skills',
              }"
              :color="Color.VIOLET"
              size="large"
            >
              Adaptable
            </Tag>
            <Tag
              v-tooltip="{ text: 'Problems fear me' }"
              :color="Color.VIOLET"
              size="large"
            >
              Solution-driven
            </Tag>
            <Tag :color="Color.VIOLET" size="large"> Detail-oriented </Tag>
            <Tag
              v-tooltip="{ text: 'No task too big, no pixel too small' }"
              :color="Color.VIOLET"
              size="large"
            >
              Hands-on
            </Tag>
          </div>
        </Accordeon>
        <Accordeon @open="onOpen">
          <template #title>5 years from now</template>
          <div class="about__footer__skills">
            <Tag :color="Color.VIOLET" size="large"> Researcher </Tag>
            <Tag
              v-tooltip="{ text: 'You\'ll name a coffee blend after me' }"
              :color="Color.VIOLET"
              size="large"
            >
              Relevant to the company
            </Tag>
            <Tag :color="Color.VIOLET" size="large">
              Showing an implementation that I did to my mom and friends (2
              years, right?)
            </Tag>
            <Tag
              v-tooltip="{ text: 'Spreading ideas faster than memes' }"
              :color="Color.VIOLET"
              size="large"
            >
              TEDx talking
            </Tag>
          </div>
        </Accordeon>
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

      &__glasses {
        position: absolute;
        aspect-ratio: 4/1;
        height: 100px;
        top: 30%;
        left: -15%;
      }
    }

    &__text {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__footer {
    margin-top: 32px;

    &__skills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
</style>
