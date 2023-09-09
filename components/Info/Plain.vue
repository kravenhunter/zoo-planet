<script setup lang="ts">
const education = [
  {
    sourceTitle: "/images/plain_visit.png",
    title: "Plan your visit",
    description:
      "Prices and payment information, risk assessments, getting here, sensory maps, and more",
  },
  {
    sourceTitle: "",
    title: "",
    description: `The Fighting Extinction Schools Program engages students and teachers in real-world learning for wildlife. Become a Fighting Extinction School by completing a curriculum-linked sequence of learning with your students and sharing with Zoos Victoria online. Create your own Fighting Extinction Schools journey by choosing one, or all the opportunities below including; school excursions, digital programs, education resources, teacher professional development, and more.`,
  },
  {
    sourceTitle: "",
    title: "Fighting Extinction Schools Program",
    description: "Start here to create your own Fighting Extinction Schools journey.",
  },

  {
    sourceTitle: "",
    title: "Fighting Extinction Schools Community",
    description: "Get support and grow your network.",
  },
  {
    sourceTitle: "/images/comunity.jpg",
    title: "Plan your visit",
    description:
      "Prices and payment information, risk assessments, getting here, sensory maps, and more",
  },
];
</script>

<template>
  <section class="plain">
    <article class="main_cover">
      <CardItem
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="education[0].sourceTitle"
        :image-title="education[0].title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
  </section>
</template>

<style scoped lang="scss">
.main_cover {
  max-height: 800px;
}
</style>
