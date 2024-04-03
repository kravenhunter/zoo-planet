<script setup lang="ts">
import type { IContentPage } from "~/types";

defineProps<{
  manePage: IContentPage;
  donateList?: IContentPage[];
}>();
</script>

<template>
  <section v-if="manePage" class="donate">
    <article class="card">
      <CardColumn :enable-card-slot="true">
        <v-img
          v-if="manePage.imageBgLink"
          :alt="manePage.title"
          :src="`/${manePage.imageBgLink}`"
          class="align-end"
          :max-height="600"
          :aspect-ratio="16 / 9"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
          cover>
          <template #sources>
            <source :srcset="`/${manePage.imageBgLink}`" />
          </template>
          <v-card-title class="text-amber text-center mb-10" v-text="manePage.title"></v-card-title>
        </v-img>
      </CardColumn>

      <article class="donate_text">
        <v-container>
          <CardColumn :text-html-card="manePage.description" />
        </v-container>
      </article>
      <article v-if="donateList?.length" class="community pa-16">
        <ProgramsBlock
          :programs-list="donateList"
          title="Fighting Extinction Schools Community"
          title-class="text-amber-darken-2 text center"
          text="Get support and grow your network."
          text-class="text-center text-black" />
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
