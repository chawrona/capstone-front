<script setup>
import { useAppStore } from "@/store/useAppStore.js";

import PauseScreen from "../../../components/common/PauseScreen.vue";
import { useGamePause } from "../composables_games/useGamePause";
import { useGameResize } from "../composables_games/useGameResize";
import { useGameData } from "./composables_eurobusiness/useGameData";

const store = useAppStore();
const { scale } = useGameResize();
const { gameData } = useGameData();
const { isPaused } = useGamePause();
</script>

<template>
    <div class="background">
        <PauseScreen v-if="gameData && isPaused" />

        <div
            v-if="gameData"
            class="game"
            :style="{ transform: `scale(${scale})` }"
        >
            <!-- Gracze -->
            <div class="players">
                <h2>Prawy panel</h2>
            </div>

            <!-- Plansza -->
            <div class="map"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.background {
    display: grid;
    place-items: center;
    background-color: #e8f4fc;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-image: url("../../../assets/grain.png");
    background: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.game {
    width: 1920px;
    height: 950px;
    transform-origin: top left;
    margin-block: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.map {
    position: relative;
    width: 900px;
    aspect-ratio: 1 / 1;
    background-color: blue;
    border: 3px solid black;
}

.players {
    width: 500px;
    height: 900px;
    background-color: red;
}
</style>
