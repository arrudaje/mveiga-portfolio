<script lang="ts" setup>
import Study from "@/components/Study.vue";
import { Role, Tag } from "@/util/enums";
import Serenity from "@/assets/png/serenity.png";
import TooGoodToGo from "@/assets/png/too-good-to-go.png";
</script>

<template>
  <div class="studies">
    <Study
      link="https://medium.com/@mveigaj.ortiz/serenity-the-impact-of-the-rubicon-model-on-the-self-care-routine-4f56fa5ef07a"
      title="Serenity App"
      subtitle="How to cross a bridge and achieve the happy path"
      description="Addressing challenges in integrating self-care habits within daily routines;"
      :roles="[
        Role.PRODUCT_DESIGNER,
        Role.USER_RESEARCHER,
        Role.UI_DESIGNER,
        Role.PRESENTER,
      ]"
      :tags="[
        Tag.PSYCHOLOGY,
        Tag.RESEARCH,
        Tag.MOBILE,
        Tag.BRANDING,
        Tag.WIZARD,
        Tag.END_TO_END,
      ]"
      :image="Serenity"
      color="#C2C2FF"
    />
    <Study
      link="https://medium.com/@mveigaj.ortiz/working-with-heuristics-too-good-to-go-refactoring-8e947b65a88"
      title="Too Good To Go"
      subtitle="Reimagining Waste, One Meal at a Time"
      description="Enhancing system components through heuristic evaluation for optimal redesign;"
      :roles="[
        Role.PRODUCT_DESIGNER,
        Role.USER_RESEARCHER,
        Role.UI_DESIGNER,
        Role.PRESENTER,
      ]"
      :tags="[
        Tag.MOBILE,
        Tag.RESEARCH,
        Tag.HEURISTICS,
        Tag.UI_DESIGN,
        Tag.STUDY,
        Tag.AGILE,
      ]"
      :image="TooGoodToGo"
      color="#B3F2D5"
    />
    <Study
      link="https://medium.com/@mveigaj.ortiz/project-2-an-e-commerce-for-an-artist-3c4a151ac94d"
      title="Ellen Van Dijk"
      subtitle="Bridging Vision with Business in an E-Commerce"
      description="Balance business needs vs. dreams to release an effective MVP;"
      :roles="[
        Role.PRODUCT_DESIGNER,
        Role.USER_RESEARCHER,
        Role.UI_DESIGNER,
        Role.GRAPHIC_DESIGNER,
      ]"
      :tags="[
        Tag.ECOMMERCE,
        Tag.RESEARCH,
        Tag.UI_DESIGN,
        Tag.GRAPHIC_DESIGN,
        Tag.PROBLEM_SOLVING,
        Tag.END_TO_END
      ]"
      :image="TooGoodToGo"
      color="#FFD6A9"
    />
  </div>
</template>

<style lang="scss" scoped>
.studies {
  padding: 80px 120px;
  display: flex;
  flex-direction: column;
  gap: 90px;
}
</style>
