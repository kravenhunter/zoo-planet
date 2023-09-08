<script setup lang="ts"></script>

<template>
  <div class="about_wrapper">
    <div class="grid">
      <div class="list1 grid">
        <div class="text1">text1 Lorem ipsum dolor sit amet.</div>
        <div class="text2">text2 Lorem ipsum dolor sit amet.</div>
        <div class="text3">text2 Lorem ipsum dolor sit amet.</div>
        <div class="text4">text2 Lorem ipsum dolor sit amet.</div>
      </div>
      <div class="list2 grid">
        <div class="text1">text1 Lorem ipsum dolor sit amet.</div>
        <div class="text2">text2 Lorem ipsum dolor sit amet.</div>
        <div class="text3">text2 Lorem ipsum dolor sit amet.</div>
      </div>
    </div>
    <!--  <Card2
          colorbg="black"
          class-card="pb-2"
          image-source="/images/red_bear.jpg"
          image-title="Top 10 Australian beaches"
          title-card="Australian beaches"
          subtitle-card="Number 10"
          text-card="  Lorem  Lorem  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia laudantium id et animi voluptatum libero!"
          button-title="See all animals"
          button-size="large"
          btn-text-size="text-subtitle-1"
          icon-button="mdi-paw" /> -->
    <div class="galary">
      <div class="galary_first">
        <CardItem
          class="main"
          colorbg="black"
          title-card="Australian beaches"
          title-align="text-center"
          subtitle-card="Number 10"
          sun-title-align="text-center"
          text-card=" All of our animals are gently handled from the moment they arrive at the shop and are even put on a “probationary” period of 2-4 weeks prior to customer availability."
          text-align="text-center"
          button-title="See all animals"
          button-size="large"
          btn-text-size="text-subtitle-1"
          button-align="justify-center"
          button-class="text-none"
          icon-button="mdi-paw" />
        <CardItem image-source="/images/parrot_galary.jpg" class="parrot" image-heigth="100%" />
        <CardItem image-source="/images/lynx_galary.jpg" class="lynx" />
        <CardItem image-source="/images/animal1.jpg" class="opossums" />
      </div>
      <div class="galary_second">
        <CardItem class="red_bear" image-source="/images/red_bear.jpg" />
        <CardItem class="coala" image-source="/images/coala.jpg" />
        <CardItem class="bober" image-source="/images/bober.jpg" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.galary {
  padding-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 600px));
  justify-content: center;
  column-gap: 20px;
}
.galary_second {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  & .red_bear {
    grid-column: span 2;
  }
  /*   & .coala {
    grid-column: 1;
    grid-row: 3;
  }
  & .bober {
    grid-column: 2;
    grid-row: 3;
  } */
}
.galary_first {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  gap: 20px;

  & .main {
    grid-column: span 2;
  }
  & .parrot {
    grid-column: 1;
    grid-row: 2 / 4;
  }
  /*   & .lynx {
    grid-column: 2;
    grid-row: 2;
  }
  & .opossums {
    grid-column: 2;
    grid-row: 3;
  } */
}
.about_wrapper {
  padding: 20px 0;
  height: 2000px;
  overflow-y: scroll;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  justify-content: center;
  font-size: 1rem;
  gap: 15px;
}
.list2 {
  & .text1 {
    background-color: bisque;
    color: black;
    grid-column: span 2;
    grid-row: span 2;
  }
  & .text2 {
    background-color: bisque;
    color: black;
    grid-column: 1;
    grid-row: 3;
  }
  & .text3 {
    background-color: bisque;
    color: black;
    grid-column: 2;
    grid-row: 3;
  }
}
.list1 {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;

  & .text1 {
    background-color: bisque;
    color: black;
    grid-column: span 2;
    grid-row: 1;
  }
  & .text2 {
    background-color: bisque;
    color: black;
    grid-column: 1;
    grid-row: span 2;
  }
  & .text3 {
    background-color: bisque;
    color: black;
    grid-column: 2;
    grid-row: 2;
  }
  & .text4 {
    background-color: bisque;
    color: black;
    grid-column: 2;
    grid-row: 3;
  }
}
</style>
