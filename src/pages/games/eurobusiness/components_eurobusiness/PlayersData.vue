<script setup>
import { computed } from "vue";

import User from "@/assets/user.png";

const props = defineProps(["playersData", "yourPublicId"]);

const players = computed(() => {
    if (props.playersData.length === 4) return props.playersData;
    const players = [...props.playersData];
    for (let i = 0; i < 4 - props.playersData.length; i++) {
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
    justify-content: end;
    align-items: start;
    gap: 0.75rem;
    color: #1d1d1d;
}

.player {
    height: 150px;
    width: 100%;
    border-radius: 0.25rem;
    background: linear-gradient(180deg, #fcfaf5, #e2d7c4);
    padding: 1.5rem 1.15rem;
    font-family: "Open Sans";

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
    width: 30px;
    height: 30px;
    background-color: var(--color);
    border-radius: 50%;
    padding: 5px;
    box-shadow:
        0 0 0 2px #fff,
        0 0 0 5px var(--color);
}

.playerUsername {
    font-weight: 600;
    font-size: 1.25rem;

    span {
        font-weight: 500;
        font-size: 0.9em;
    }
}

.playerMoney {
    display: flex;
    gap: 0.15rem;
    margin-left: auto;
    font-size: 1.5rem;

    .dolarSign {
        color: rgb(57, 126, 57);
    }
}

.cards {
    position: relative;
    display: flex;
    height: 90px;

    .info {
        margin-block: 1rem;
        width: 100%;
        display: grid;
        place-items: center;
        font-size: 1.15rem;
        color: #2020207e;
        font-weight: bold;
        background-color: rgba(129, 129, 129, 0.322);
        border-radius: 0.25rem;
    }
}
</style>
