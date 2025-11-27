<script setup>
import { computed, ref } from "vue";

import User from "@/assets/user.png";

const props = defineProps(["playersData", "yourPublicId"]);

const testPlayers = ref([
    {
        color: { hex: "#d72638", name: "crimson" },
        inJail: false,
        money: 0,
        position: 0,
        publicId: "7768c67c-ddc0-49cf-bdb5-d5cb24fefced1",
        turnOrder: 1,
        username: "Thinkofistodo",
    },
    {
        color: { hex: "#22c55e", name: "crimson" },
        inJail: false,
        money: 0,
        position: 0,
        publicId: "7768c67c-ddc0-49cf-bdb5-d5cb24fefced4",
        turnOrder: 1,
        username: "ArekiS",
    },
    {
        color: { hex: "#3b82f6", name: "crimson" },
        inJail: false,
        money: 0,
        position: 0,
        publicId: "7768c67c-ddc0-49cf-bdb5-d5cb24fefced",
        turnOrder: 1,
        username: "Versus137",
    },
    {
        color: { hex: "#9333ea", name: "crimson" },
        inJail: false,
        money: 0,
        position: 0,
        publicId: "7768c67c-ddc0-49cf-bdb5-d5cb24fefcevd",
        turnOrder: 1,
        username: "SenseiW",
    },
]);

const players = computed(() => {
    if (testPlayers.value.length === 4) return testPlayers.value;
    const players = [...testPlayers.value];
    for (let i = 0; i < 4 - testPlayers.value.length; i++) {
        players.push({
            color: { hex: "#3337", name: "gray" },
            money: null,
            publicId: null,
            username: "Brak gracza",
        });
    }
    return players;
});
</script>

<template>
    <div class="players">
        <article
            v-for="player in players"
            :key="player.publicId"
            class="player"
            :class="{
                inJail: player.inJail,
                you: props.yourPublicId === player.publicId,
                noPlayer: player.publicId === null,
            }"
            :style="`--color: ${player.color.hex}`"
        >
            <header class="playerInfo">
                <div class="playerIcon">
                    <img :src="User" alt="" />
                </div>
                <div v-if="player.username" class="playerUsername">
                    {{ player.username }}
                    <span v-if="props.yourPublicId === player.publicId">
                        (Ty)
                    </span>

                    <span v-if="player.inJail"> (W więzieniu)</span>
                </div>
                <div v-if="player.money !== null" class="playerMoney">
                    <span>{{ player.money }}</span>
                    <span class="dolarSign">$</span>
                </div>
            </header>
            <section class="cards">
                <p v-if="!player.cards" class="info">Karty własności</p>
            </section>
        </article>
    </div>
</template>

<style scoped lang="scss">
.players {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}

.player {
    height: 200px;
    width: 100%;
    border-radius: 0.25rem;
    background: linear-gradient(180deg, #fcfaf5, #e2d7c4);
    padding: 1.5rem 1.15rem;
    font-family: "Open Sans";
    font-size: 1.25rem;

    &.you {
        background: linear-gradient(
            180deg,
            hsl(41, 93%, 88%),
            hsl(38, 84%, 83%)
        );
    }

    &.inJail .playerIcon {
        background-color: #333;
        box-shadow:
            0 0 0 2px #fff,
            0 0 0 5px #333;
    }

    &.noPlayer {
        background: linear-gradient(180deg, #d1d1d1a8, #adadada8);
        color: hsl(from var(--color) h s 0);
    }
}

.playerInfo {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 500;
    padding-left: 4px;
}

.playerIcon {
    width: 40px;
    height: 40px;
    background-color: var(--color);
    border-radius: 50%;
    padding: 5px;
    box-shadow:
        0 0 0 2px #fff,
        0 0 0 5px var(--color);
}

.playerUsername {
    font-weight: 600;

    span {
        font-weight: 500;
        font-size: 0.9em;
    }
}

.playerMoney {
    display: flex;
    gap: 0.15rem;
    margin-left: auto;
    font-size: 1.85rem;

    .dolarSign {
        color: green;
    }
}

.cards {
    position: relative;
    display: flex;
    height: 110px;

    .info {
        position: absolute;
        inset: 0;
        top: 20px;
        display: grid;
        place-items: center;
        font-size: 1.5rem;
        color: rgba(32, 32, 32, 0.493);
        font-weight: bold;
        background-color: rgba(129, 129, 129, 0.322);
        border-radius: 0.25rem;
    }
}
</style>
