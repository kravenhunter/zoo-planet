import { defineStore } from 'pinia';

// Composition API
export const useCounterStore = defineStore('counter', () => {
	const count = ref(0);

	const doubleCount = computed(() => count.value * 2);

	function increment() {
		count.value++;
	}
	console.log(count.value);

	return { count, doubleCount, increment };
});

// Options API
// export const useCounterStore = defineStore('counter', {
//     state: () => ({ count: 0, name: 'Eduardo' }),
//     getters: {
//       doubleCount: (state) => state.count * 2,
//     },
//     actions: {
//       increment() {
//         this.count++
//       },
//     },
//   })
