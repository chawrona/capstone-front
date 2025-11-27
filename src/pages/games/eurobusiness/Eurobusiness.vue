<script setup>
import { computed, onMounted, ref } from "vue";

import { useAppStore } from "@/store/useAppStore.js";

import PauseScreen from "../../../components/common/PauseScreen.vue";
import { useGamePause } from "../composables_games/useGamePause";
import { useGameResize } from "../composables_games/useGameResize";
import actions from "./actions/actions";
import { useGameActions } from "./actions/useGameActions";
import CurrentMessage from "./components_eurobusiness/CurrentMessage.vue";
import Dice from "./components_eurobusiness/Dice.vue";
import GameMap from "./components_eurobusiness/GameMap.vue";
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
    time,
    yourPublicId,
    yourTurn,
} = useGameData();

const { endTurn, rollDice } = useGameActions(availableActions);

const { isPaused } = useGamePause();
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
            <div class="left-panel">
                <CurrentMessage
                    :current-message="currentMessage"
                    :players-data="playersData"
                    :time="time"
                    :available-actions="availableActions"
                    :end-turn="endTurn"
                    :your-turn="yourTurn"
                />
                <PlayersData
                    :players-data="playersData"
                    :your-public-id="yourPublicId"
                    :your-turn="yourTurn"
                />
            </div>

            <!-- Plansza -->
            <GameMap
                :roll-result="rollResult"
                :roll-dice="rollDice"
                :available-actions="availableActions"
                :your-turn="yourTurn"
                :players-positions="playersPosition"
                :players-data="playersData"
            />

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
    width: 100%;
    height: 100vh;
    background-color: #0966a5;
    overflow: hidden;
}

.game {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 1920px;
    height: 950px;
    margin-block: auto;
    transform-origin: top left;
    font-family: "Open sans";
}

.left-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 900px;
}
</style>
