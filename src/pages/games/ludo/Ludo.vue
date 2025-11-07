<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from "vue";

import { useAppStore } from "@/store/useAppStore.js";
import setGameData from "../composables/setGameData";

const store = useAppStore();

const gameData = ref(null);

onMounted(() => {
    if (store.socket) {
        store.socket.on("gameData", (d) => setGameData(d, gameData));

        store.emit("gameData", {
            eventName: "gameDataRequest",
        });
    }
});

onBeforeUnmount(() => {
    store.socket.off("gameData");
});
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
    <h1>Chińczyk</h1>
    <div class="game">
        Tu będzie mapa
    </div>
    <button @click="rollDice">Rzuć kością</button>
</template>

<style lang="scss" scoped>

.game {
    padding: 1rem;
}
</style>
