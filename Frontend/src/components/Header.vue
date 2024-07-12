<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPage = ref(route.path);
const setPage = (page) => {
  currentPage.value = page;
};
</script>

<template>
  <header class="flex flex-row justify-between items-center pt-10">
    <div class="w-1/3"></div>
    <div class="flex justify-center w-1/3">
      <img src="../assets/Logo.png" alt="MCQs.AI Logo" class=" w-4/5">
    </div>

    <div class="flex justify-end flex-row ml-auto w-1/3 pt-7">
      <router-link
        to="/"
        class="btn w-36 text-xl text-white font-bold"
        :class="currentPage === '/' ? 'bg-gradient-to-r from-red-400 via-purple-500 to-indigo-600 border border-bg-color hover:border-white' : 'btn-outline'"
        @click="setPage('/')"
      >
        Your MCQ
      </router-link>
      <router-link
        to="/about"
        class="btn w-36 text-xl text-white font-bold ms-10 me-20"
        :class="currentPage === '/about' ? 'bg-gradient-to-r from-red-400 via-purple-500 to-indigo-600 border border-bg-color hover:border-white' : 'btn-outline'"
        @click="setPage('/about')"
      >
        About
      </router-link>
    </div>
  </header>
</template>

<style>
@keyframes animatedGradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.animated-background {
    background-size: 200% auto;
    animation: animatedGradient 3s ease infinite;
}
</style>