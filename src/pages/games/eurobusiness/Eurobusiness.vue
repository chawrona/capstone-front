<script setup>
import { computed, onMounted, ref } from "vue";

import { useAppStore } from "@/store/useAppStore.js";

import Dice from "../../../components/common/Dice.vue";
import PauseScreen from "../../../components/common/PauseScreen.vue";
import { useGamePause } from "../composables_games/useGamePause";
import { useGameResize } from "../composables_games/useGameResize";
import { useGameActions } from "./actions/useGameActions";
import Logs from "./components_eurobusiness/Logs.vue";
import PlayersData from "./components_eurobusiness/PlayersData.vue";
import { useGameData } from "./composables_eurobusiness/useGameData";

const store = useAppStore();
const { scale } = useGameResize();
const {
    availableActions,
    currentMessage,
    gameMap,
    logs,
    playersData,
    playersPosition,
    rollResult,
    yourPublicId,
    yourTurn,
} = useGameData();

const { rollDice } = useGameActions();

const { isPaused } = useGamePause();

const trigger = ref(0);

const idk = () => (trigger.value += 1);
</script>

<template>
    <div class="background">
        <PauseScreen v-if="gameData && isPaused" />
        <div
            v-if="gameMap"
            class="game"
            :style="{ transform: `scale(${scale})` }"
        >
            <!-- Gracze -->
            <div class="players">
                <PlayersData
                    :players-data="playersData"
                    :your-public-id="yourPublicId"
                />
            </div>

            <!-- Plansza -->
            <div class="map">
                <div class="dices">
                    <button @click="idk">Click</button>
                    <button @click="rollDice">Roll</button>
                    {{ rollResult }}
                    <Dice :trigger="trigger" :new-value="rollResult" />
                    <Dice :trigger="trigger" :new-value="rollResult" />
                </div>
            </div>

            <!-- Logi -->
            <Logs :logs="logs" :players-data="playersData" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

.background {
    display: grid;
    place-items: center;
    background-color: #0966a5;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    // background-image: url("../../../assets/grain.png");
    // background: cover;
    // background-repeat: no-repeat;
    // background-position: center;
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
    font-family: "Open sans";
}

.map {
    display: grid;
    place-items: center;
    position: relative;
    height: 900px;
    aspect-ratio: 1 / 1;
    border-radius: 0.25rem;
    background-position: center;
    background-size: contain;
    background-image:
        url("../../../assets/games/gameAssets/eurobusinessMap.png"),
        linear-gradient(180deg, #fcfaf5, #e2d7c4);
}

.dices {
    display: flex;
    gap: 1rem;
}

.players {
    width: 400px;
    height: 900px;
    // background-color: red;
}
</style>
