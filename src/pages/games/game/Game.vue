<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";

import { useAppStore } from "@/store/useAppStore.js";

import setGameData from "../composables/setGameData";
</script>

<template>
    <div class="background">
        <div
            v-if="gameData"
            class="game"
            :style="{ transform: `scale(${scale})` }"
        >
            <slot :game-data="gameData" :players="players" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
