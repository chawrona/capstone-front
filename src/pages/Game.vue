<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";

import { useAppStore } from "@/store/useAppStore.js";

const store = useAppStore();

const gameData = ref(null);

const addedWood = computed(() => {
    if (!gameData.value) return "Brak drewna.";
    if (!gameData.value.addedWood) return "0 razy.";
    if (gameData.value.addedWood === 1) return "1 raz.";
    return gameData.value.addedWood + " razy.";
});

onMounted(() => {
    if (store.socket) {
        store.socket.on("gameData", (data) => {
            console.log("game: " + JSON.stringify(data));
            gameData.value = data;

            setTimeout(() => {
                store.setLoading(false);
            }, 1000)
        });

        store.socket.on("hello", (data) => {
            alert(data);
        });

        store.socket.on("wood", (data) => {
            console.log("wood: " + data);
            alert("Aktualna ilość Twojego drewna: " + data);
        });

        console.log("GameData");
        
        store.emit("gameData", {
            eventName: "gameDataRequest"
        });

        console.log("Requested");
    }
});

onBeforeUnmount(() => {
    store.socket.off("gameData");
    store.socket.off("hello");
    store.socket.off("wood");
});

const handleAddWood = () => {
    store.emit("gameData", {
        eventName: "addWood",
    });
};
</script>

<template>
    <h1>Game Test</h1>
    <div class="game-data">
        Dodano drewno:
        {{ addedWood }}
    </div>
    <button @click="handleAddWood">Zwiększ drewno o 5</button>
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
