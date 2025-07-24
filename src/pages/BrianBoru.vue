<script setup>
import { onMounted, onBeforeUnmount } from "vue";

import { useAppStore } from "@/store/useAppStore.js";

const store = useAppStore();

function buyWood() {
    store.emit("gameData", { event: "buy wood" });
}

function handleWoodSell(payload) {
    console.log("Received woodSell:", payload);
}

onMounted(() => {
    if (store.socket) {
        store.socket.on("woodSell", handleWoodSell);
    }
});

onBeforeUnmount(() => {
    if (store.socket) {
        store.socket.off("woodSell", handleWoodSell);
    }
});
</script>

<template>
    <h1>Brian Boru</h1>
    <button @click="buyWood">Buy Wood</button>
</template>

<style scoped>
button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #4caf50;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    margin-top: 1rem;
}
button:hover {
    background-color: #45a049;
}
</style>
