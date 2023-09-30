<script setup lang="ts">
import type { ContentPages } from "@prisma/client";

defineProps<{
  donate: ContentPages;
}>();
</script>

<template>
  <section class="donate" v-if="donate">
    <article class="card">
      <CardColumn :enable-card-slot="true">
        <v-img
          :alt="donate.title"
          :src="donate.imageBgLink"
          class="align-end"
          :max-height="600"
          :aspect-ratio="16 / 9"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          cover>
          <template #sources>
            <source :srcset="donate.imageBgLink" />
          </template>
          <v-card-title class="text-amber text-center mb-10" v-text="donate.title"></v-card-title>
        </v-img>
      </CardColumn>

      <article class="donate_text">
        <v-container>
          <CardColumn :text-html-card="donate.description" />
        </v-container>
      </article>
    </article>
  </section>
</template>

<style scoped lang="scss">
.v-card {
  &-title {
    font-family: gothic;
    font-size: 2.5rem;
  }
  & h4 {
    font-family: gothic;
    font-size: 1.5rem;
  }
}
.about_wrapper {
  height: 100%;
  background-color: var(--color-grey);
}
.card {
  display: grid;
  background-color: var(--color-grey);

  &_list {
    display: grid;
    justify-content: center;
    grid-template-columns: 0.5fr 2fr 0.5fr;

    & .saving_wildlife {
      max-width: 1500px;
      grid-column: 2;
    }
    & .whoes {
      background-color: #07060b;
    }
    & .who_we_are {
      background-color: #07060b;

      grid-column: span 3;
    }
    & .our_vision {
      max-width: 1500px;
      grid-column: 2;
      padding: 50px 0;
    }
  }
}
</style>
