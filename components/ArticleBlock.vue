<script setup lang="ts">
import { ref, useRoute } from "#imports";

const route = useRoute();
const speciesTitle = {
  title: "Local threatened species",
  sourceTitle: "/images/35f9ab0c1f1433fd3c531fc261b36ae2e0075dd0.webp",
  subtitle: "",
  description:
    "Meet the 27 Australian animals we're fighting to protect. These species are on the brink of extinction due to a range of threats. A lesser recognised but very real threat to these species, is that many Victorians do not know they exist, or how they can help. We think the only thing more unjust than wildlife extinction, is the loss of a species that no one knew was in trouble.",
};
const speciesList = [
  {
    id: 1,
    sourceTitle: "/images/545d4194e945d01edc0787c04d14f961da4d8202.webp",
    title: "Alpine She-oak Skink",
    habitain: "The Alpine She-oak Skink can be seen at Healesville Sanctuary.",
    population: "Decreasing",
    countLeft: "Four populations in Victoria",
    conservationStatus: "Endangered",
    description:
      "Found in only a few locations in Victoria and NSW, the Alpine She-oak Skink is listed as endangered.",
    fullDescribe: `It lives 1500m above sea level at the top of isolated mountain habitats. Alpine She-oak Skinks will imitate a snake if threatened, pulling their legs in close to their body and flicking their tongues. They hibernate over winter and are known to live for more than five years in the wild.
    How you can help
Create community awareness and support for the Alpine She-oak Skink. Research the ways you can work on reducing your carbon footprint and take action.
Visit our zoos. By visiting Healesville Sanctuary, Melbourne Zoo or Werribee Open Range Zoo, you are supporting our work to fight extinction.
Discover more about local conservation events and join the growing number of wild activists taking action for local wildlife.`,
  },
  {
    id: 2,
    sourceTitle: "/images/3abb64ec3774954dbcc7f2cce8ad0ad8a0912df8.webp",
    title: "Golden-rayed Blue Butterfly",
    habitain: "It lives in the narrow bands of remnant floodplains.",
    population: "Decreasing",
    countLeft: "Four populations in Victoria",
    conservationStatus: "Endangered",
    description: "This Victorian butterfly is Endangered.",
    fullDescribe: `It lives in the narrow bands of remnant floodplains that border a handful of salt-lakes in the west of the state. The Golden-rayed Blue Butterfly feeds on only one species of plant, known commonly as Creeping Boobialla.

Major threats
Degraded habitat is the biggest threat to the survival of the Golden-rayed Blue Butterfly. Living in a restricted area doesn’t help its cause. Over time it has lost its marginal habitat around the salt-lakes, mainly through cropping and grazing.

The invasive paperbark tree is another problem as it displaces the butterfly’s food plant. This tree also reduces the sunny, open areas preferred by the adult butterfly.`,
  },
  {
    id: 3,
    sourceTitle: "/images/91353b20af15b191b6a2fdcae964cc049fa2e259.webp",
    title: "Baw Baw Frog",
    habitain: "You can see the Baw Baw Frog at Melbourne Zoo. ",
    population: "Decreasing",
    countLeft: "Four populations in Victoria",
    conservationStatus: "Critically Endangered",
    description:
      "All estimates point to extinction in the wild for the Baw Baw Frog in just five to 10 years.",
    fullDescribe: `The wild population has declined by more than 98% since the late 1980s. It lives and feeds amongst leaf litter and muddy earth on the Mount Baw Baw plateau, hunting worms and other invertebrates. The males and females meet to breed in late spring, and the tadpoles hatch five to eight weeks later, much earlier than most other frogs.`,
  },
  {
    id: 4,
    sourceTitle: "/images/35f9ab0c1f1433fd3c531fc261b36ae2e0075dd0.webp",
    title: "Brush-tailed Rock-wallaby (southern population)",
    habitain:
      "Zoos Victoria is fighting to save the southern population of Brush-tailed Rock-wallabies from extinction.",
    population: "Decreasing",
    countLeft: "Four populations in Victoria",
    conservationStatus: "Critically Endangered",
    description:
      "In Victoria, the Brush-tailed Rock-wallaby now exists in only two small and isolated locations.",
    fullDescribe: `There are less than 30 animals in each place. This agile species lives in rugged, rocky areas and can bound great distances, up and across rocky terrain. They hide among the rocky ridges during the day and emerge at dusk to feed on native grasses and other vegetation. Brush-tailed Rock-wallabies inhabit the region from south-eastern Queensland to eastern New South Wales and Victoria. They are recognised as three genetically distinct populations. The population known as the southern form is the one located in Victoria.`,
  },
];

const items = [
  {
    title: "LC",
    value: "Least Concern",
  },
  {
    title: "NT",
    value: "Near Threatened",
  },
  {
    title: "EW",
    value: "Vulnerable",
  },
  {
    title: "EN",
    value: "Endangered",
  },
  {
    title: "CR",
    value: "Critically Endangered",
  },
  {
    title: "EW",
    value: "Extinct in the Wild",
  },
  {
    title: "EX",
    value: "Extinct",
  },
];
const currentArticle = ref();
const getArticle = (idArticle: number | undefined) =>
  idArticle && speciesList.find((el) => el.id === idArticle);
currentArticle.value = getArticle(Number(route.params.id));
</script>

<template>
  <section class="article">
    <article class="main_cover">
      <CardItem
        image-heigth="600"
        class="card_main"
        colorbg="#f2f2f2"
        :image-source="currentArticle.sourceTitle"
        :image-title="currentArticle.title"
        title-align="text-center pb-10"
        font-title-size="2rem" />
    </article>
    <article class="description">
      <v-container>
        <v-row>
          <v-col>
            <CardItem colorbg="#f2f2f2" :text-card="currentArticle.description" :text-slot="true">
              <v-card-text>
                <h1 class="text-h6 pb-10">{{ currentArticle.description }}</h1>
                {{ currentArticle.fullDescribe }}
              </v-card-text>
            </CardItem>
          </v-col>

          <v-col class="bg-brown-lighten-5 pt-10 px-5" cols="4">
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col class="text-center text-subtitle-2">
                {{ currentArticle.habitain }}
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col>
                <h6 class="text-subtitle-2">Population Trend:</h6>
                <p class="text-subtitle-2 font-weight-bold">{{ currentArticle.population }}</p>
              </v-col>
              <v-col class="text-center">
                <v-avatar
                  color="brown-lighten-4"
                  icon="mdi-arrow-down"
                  class="text-subtitle-1"
                  size="x-large">
                </v-avatar>
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col>
                <h6 class="text-subtitle-2">Number left:</h6>
              </v-col>
              <v-col class="text-center text-subtitle-2 font-weight-bold">
                {{ currentArticle.countLeft }}
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col>
                <h6 class="text-subtitle-2 font-weight-light">Conservation Status:</h6>
                <ul>
                  <li
                    v-for="(item, i) in items"
                    :key="i"
                    class="conversion_status"
                    :class="item.value === currentArticle.conservationStatus ? 'status' : ''">
                    <p>{{ item.title }} {{ item.value }}</p>
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </article>
  </section>
</template>

<style scoped lang="scss">
.article {
  background-color: #f2f2f2;
  & .main_cover {
    max-height: 800px;
  }
  & .description {
    & .conversion_status {
      & p {
        font-size: 0.7rem;
        font-weight: 300;
      }
    }
    & .status {
      & p {
        color: #6d4c41;
        font-size: 0.8rem;
        font-weight: 800;
      }
    }
  }
  & .block_info {
  }
  & .galary_list {
    background-color: #fff3e0;
  }
  & .v-btn {
    border: 1px solid #01579b;
  }
  & span {
    color: #395a03;
    font-size: 0.9rem;
    font-weight: 600;
  }
}
</style>
