<script setup>
import LoadingScreen from "./components/common/LoadingScreen.vue";
import useSocket from "./composables/useSocket";

useSocket();
</script>

<template>
    <LoadingScreen :show="isLoading" />
    <router-view />
</template>

<style scoped></style>
