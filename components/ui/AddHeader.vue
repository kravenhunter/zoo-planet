<script setup lang="ts">
import { onMounted, useState } from "#imports";

interface ILinks {
  name: string;
  path: string;
}
const links: ILinks[] = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "Business", path: "/business" },
  { name: "Magazine", path: "/magazine" },
  { name: "Sport", path: "/sport" },
  { name: "Art", path: "/art" },
  { name: "Culture", path: "/culture" },
  { name: "Politics", path: "/politics" },
  { name: "Style", path: "/style" },
  { name: "Travel", path: "/travel" },
];

const activeLink = useState<string | null>("activeLink", () => "Home");
// const activeLink = (name: string) => useState<string | null>(name);

onMounted(() => {
  document.querySelectorAll(".link").forEach((el) => {
    el.addEventListener("click", (event) => {
      // activeLink.value = event?.target?.inerText;
      // activeLink.value = el?.text;
      activeLink.value = el?.textContent;
      console.log("activeLink", activeLink);

      console.log(el);
    });
  });
});
</script>

<template>
  <header>
    <ul class="header">
      <li v-for="(link, i) in links" :key="i" :data-id="i">
        <NuxtLink :to="link.path" :class="{ active: activeLink === link.name }" class="link">{{
          link.name
        }}</NuxtLink>
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  gap: 20px;
}
.header .link {
  //   font-size: 1.5rem;
  font-weight: 700;
  padding: 10px 20px;
  transition: 0.7s;
  transition-property: background-color color;
}
.active {
  background-color: var(--color-dark);
  color: aliceblue;
}
.header .link:hover {
  background-color: var(--color-dark);
  color: aliceblue;
}
</style>
