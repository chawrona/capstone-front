<script setup>
import User from "@/assets/user.png";

import actions from "../actions/actions";
import Dice from "./Dice.vue";

const props = defineProps([
    "rollResult",
    "availableActions",
    "rollDice",
    "yourTurn",
    "playersPositions",
    "playersData",
]);

const getUserColor = (publicId) => {
    const color = props.playersData.find((p) => p.publicId === publicId)?.color
        .hex;
    return color ? color : "#333";
};
</script>

<template>
    <div class="map">
        <div
            class="dices"
            :class="{
                cantRoll:
                    !availableActions.includes(actions.rollDice) ||
                    !props.yourTurn,
            }"
            @click="rollDice"
        >
            <Dice
                :trigger="rollResult"
                :new-value="rollResult[0]"
                color="#f32020"
            />
            <Dice
                :trigger="rollResult"
                :new-value="rollResult[1]"
                color="#2063f3"
            />
        </div>

        <div
            v-for="number in 40"
            :key="number"
            class="cell"
            :style="`grid-area: cell${number - 1}`"
        >
            {{ number - 1 }}
        </div>

        <div class="center" style="grid-area: center" />

        <div
            v-for="[position, players] in Object.entries(
                props.playersPositions,
            )"
            :key="position"
            class="players"
            :style="`grid-area: cell${position}`"
        >
            <div
                v-for="player in players"
                :key="player"
                class="player"
                :style="`--color: ${getUserColor(player)}`"
            >
                <img :src="User" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.players {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0 1.1rem;
    padding: 1px;

    .player {
        width: 1.5rem;
        height: 1.5rem;
        background-color: var(--color);
        border-radius: 50%;
        padding: 3px;
        box-shadow:
            0 0 0 2px #fff,
            0 0 0 5px var(--color);
    }
}

.cell {
    display: grid;
    place-items: center;
    background-color: rgba(247, 93, 93, 0.726);

    &:nth-last-of-type(2n) {
        background-color: rgba(93, 247, 247, 0.726);
    }
}

.map {
    position: relative;
    width: 900px;
    height: 901px;
    border-radius: 0.25rem;
    background-position: center;
    background-size: contain;
    background-color: #fff;

    // grid
    display: grid;
    grid-template-columns:
        4fr
        repeat(9, 3fr)
        4fr;

    grid-template-rows:
        4fr
        repeat(9, 3fr)
        4fr;

    overflow: hidden;

    grid-template-areas:
        "cell10 cell11 cell12 cell13 cell14 cell15 cell16 cell17 cell18 cell19 cell20"
        "cell9  center center center center center center center center center cell21"
        "cell8  center center center center center center center center center cell22"
        "cell7  center center center center center center center center center cell23"
        "cell6  center center center center center center center center center cell24"
        "cell5  center center center center center center center center center cell25"
        "cell4  center center center center center center center center center cell26"
        "cell3  center center center center center center center center center cell27"
        "cell2  center center center center center center center center center cell28"
        "cell1  center center center center center center center center center cell29"
        "cell0 cell39 cell38 cell37 cell36 cell35 cell34 cell33 cell32 cell31 cell30";
}

.dices {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 2.5rem;
    cursor: pointer;
    padding: 2rem;
    width: 250px;
    height: 250px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-image: radial-gradient(
        circle,
        hsl(39, 87%, 95%) 0%,
        #fae2b6 60%,
        #fae2b6 100%
    );
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    &.cantRoll {
        cursor: auto;
        background-image: radial-gradient(circle, #d1d1d1 0%, #bdbdbd 100%);
    }
}
</style>
