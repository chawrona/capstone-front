<script setup>
import { computed, onMounted, ref } from "vue";

import { useAppStore } from "@/store/useAppStore.js";

import { soundBus } from "../../../audio/soundBus";
import PauseScreen from "../../../components/common/PauseScreen.vue";
import { usePageSounds } from "../../../composables/usePageSounds";
import { useGamePause } from "../composables_games/useGamePause";
import { useGameResize } from "../composables_games/useGameResize";
import actions from "./actions/actions";
import { useGameActions } from "./actions/useGameActions";
import ChanceCardDialog from "./components_eurobusiness/ChanceCardDialog.vue";
import CommunityCardDialog from "./components_eurobusiness/CommunityCardDialog.vue";
import CurrentMessage from "./components_eurobusiness/CurrentMessage.vue";
import Dice from "./components_eurobusiness/Dice.vue";
import GameMap from "./components_eurobusiness/GameMap.vue";
import Logs from "./components_eurobusiness/Logs.vue";
import PlayersData from "./components_eurobusiness/PlayersData.vue";
import { useGameData } from "./composables_eurobusiness/useGameData";
import { useGameDialogs } from "./composables_eurobusiness/useGameDialogs";
import useGameInfo from "./composables_eurobusiness/useGameInfo";

const store = useAppStore();
const SOUNDTRACK_URL = "/sounds/eurobusiness_soundtrack.mp3";
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

const { createInfo } = useGameInfo();

const {
    auction,
    auctionCardDialogOpen,
    chanceCard,
    chanceCardDialogOpen,
    closeDialogs,
    communityCard,
    communityCardDialogOpen,
    dialogsOpen,
} = useGameDialogs();

const {
    buyBuilding,
    endTurn,
    payIncomeTax,
    payJail,
    payTax,
    pickChanceCard,
    pickCommunityCard,
    refuseToBuyBuilding,
    rollDice,
    useOutOfJailCard,
} = useGameActions(availableActions, dialogsOpen);

const { isPaused } = useGamePause();

usePageSounds({
    music: [{ name: "soundtrack", url: SOUNDTRACK_URL }],
});
</script>

<template>
    <div class="background">
        <button
            v-if="soundBus.isSoundtrackNotPlaying()"
            @click="soundBus.resetSoundtrack(SOUNDTRACK_URL)"
        >
            Play Soundtrack
        </button>
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
                    :pay-tax="payTax"
                    :pay-income-tax="payIncomeTax"
                    :your-turn="yourTurn"
                    :buy-building="buyBuilding"
                    :refuse-to-buy-building="refuseToBuyBuilding"
                    :pay-jail="payJail"
                />
                <PlayersData
                    :players-data="playersData"
                    :your-public-id="yourPublicId"
                    :your-turn="yourTurn"
                    :game-map="gameMap"
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
                :pick-chance-card="pickChanceCard"
                :pick-community-card="pickCommunityCard"
                :your-public-id="yourPublicId"
                :use-out-of-jail-card="useOutOfJailCard"
                :game-map="gameMap"
            />

            <ChanceCardDialog
                :chance-card="chanceCard"
                :close-dialogs="closeDialogs"
                :chance-card-dialog-open="chanceCardDialogOpen"
            />
            <CommunityCardDialog
                :community-card="communityCard"
                :close-dialogs="closeDialogs"
                :community-card-dialog-open="communityCardDialogOpen"
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
    background: linear-gradient(
        180deg,
        rgba(67, 164, 230, 1) 0%,
        rgba(40, 143, 211, 1) 10%,
        rgba(25, 119, 181, 1) 74%,
        rgba(14, 96, 150, 1) 96%,
        rgba(13, 89, 140, 1) 100%
    );
    overflow: hidden;
}

.game {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 1920px;
    height: 950px;
    margin-block: auto;
    transform-origin: top left;
    font-family: "Open sans";

    * {
        user-select: none;
    }
}

.left-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 900px;
}
</style>

<style>
.v-toast__item--info {
    border: 3px solid #ffffff;

    background: linear-gradient(
        180deg,
        rgb(39, 189, 197) 0%,
        rgb(59, 165, 226) 100%
    );

    border-radius: 0.5rem;
    color: #ffffff;
    font-family: "Open sans";

    font-size: 1.5rem;

    padding: 0rem 1.5rem;

    box-shadow: 3px 2px 0px 2px #768aaf;

    .v-toast__icon {
        display: none;
    }
}
</style>
