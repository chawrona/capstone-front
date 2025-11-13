<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";

import { useAppStore } from "@/store/useAppStore.js";
import setGameData from "../composables/setGameData";

const store = useAppStore();

const gameData = ref(null);
const players = ref(null);

onMounted(() => {
    if (store.socket) {
        store.socket.on("gameData", (d) => setGameData(d, gameData));
        store.socket.on("players", (d) => players.value = d);

        store.emit("gameData", {
            eventName: "gameDataRequest",
        });
    }
});

onBeforeUnmount(() => {
    store.socket.off("gameData");
});

const rollDice = () => {
    store.emit("gameData", {
        eventName: "rollDice"
    });
};

const number = ref(null)

const pawnMovement = () => {
    store.emit("gameData", {
        eventName: "pawnMovement",
        pawnId: number.value
    });
};
</script>


<!-- 

type Pawn = [publicId: string, pawnId: number];
type StartingPosition = [publicId: string, startingField: number];
type Color = {hex: string, name: string}
type Players = {publicId: string, username: string, color: Color, ...data: {[key: string]: any}}

{
  gameMap: array<Pawn | int>[40]
  currentAction: "Rzut Kością" | "Ruch pionkami"
  startingPositionArea: Pawn[8-16] 
  finishPositions: Pawn[2-4][2-4]
  timesThrown: int
  diceThrowResult: int
  playersStartingPoints: StartingPosition[2-4]
  yourTurn: boolean
  currentPlayerIndex: int
  possiblePawnMoves: Pawn[3][0-4]
}

{
  players: Players[2-4]
}
-->

<template>
    <div v-if="gameData">
        <h1>Chińczyk</h1>
        <h2>Aktualny gracz: {{ players[gameData["currentPlayerIndex"]] }}</h2>
        <h2>Czy Twoja tura? {{ gameData["yourTurn"] ? "Tak" : "Nie" }}</h2>
        <button @click="rollDice">Rzuć kością</button>
        <p>Pawns:</p>
        {{ gameData[possiblePawnMoves] }}
        <p>Pawn id do wysłania:</p>
        <input type="number" v-model="number"/>
        <button @click="pawnMovement">Wybierz pionek</button>
        <div class="game">
            
            <pre>
                {{ gameData }}
            </pre>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>

.game {
    padding: 1rem;
}
</style>
