<script setup>
import { computed } from "vue";

import User from "@/assets/user.png";

const props = defineProps(["playersData", "yourPublicId", "gameMap"]);

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
                <!-- <pre style="font-size: 1rem;" v-if="player.publicId">
                    {{ player }}

                </pre> -->
                <div class="playerIcon">
                    <img :src="User" alt="" />
                </div>
                <div v-if="player.username" class="playerUsername">
                    {{ player.username }}
                    <span v-if="props.yourPublicId === player.publicId">
                        (Ty)
                    </span>

                    <!-- <span v-if="player.inJail"> (W więzieniu)</span> -->
                </div>
                <div v-if="player.money !== null" class="playerMoney">
                    <span>{{ player.money }}</span>
                    <span class="dolarSign">$</span>
                </div>
            </header>
            <section class="cards">
                <div class="info">
                    <div v-if="!player.ownerships" class="noCards">
                        Karty własności
                    </div>
                    <div
                        v-if="player.ownerships"
                        class="ownerships"
                        :class="{
                            lessThan9: player.ownerships.length < 9,
                            equal8: player.ownerships.length === 8,
                            lessThan17: player.ownerships.length < 17,
                            lessThan22: player.ownerships.length < 22,
                        }"
                    >
                        <div
                            v-for="index in player.ownerships"
                            :key="index"
                            class="tileCard"
                            :style="`--bg: ${props.gameMap[index].color}`"
                        >
                            {{ props.gameMap[index].setPosition }}
                        </div>
                    </div>
                </div>
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
    height: 154.25px;
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
        background: repeating-linear-gradient(
            to right,
            #b1b1b1 0,
            #b1b1b1 2px,
            #333 2px,
            #333 6px
        );

        box-shadow:
            0 0 0 2px #777777,
            0 0 0 5px #333;
    }

    &.noPlayer {
        background: linear-gradient(180deg, #a2c9e2, #90b2c9);
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
        margin-block: 0.5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        padding: 0.25rem;
        place-items: center;
        font-size: 1.15rem;
        color: #2020207e;
        font-weight: bold;
        // background-color: rgba(129, 127, 99, 0.322);
        border-radius: 0.25rem;
    }

    .info:has(.noCards) {
        flex-direction: row;
        justify-content: center;
        background-color: rgba(129, 129, 129, 0.322);
    }
}

.ownerships {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;

    .tileCard {
        height: 30px;
        width: 20px;
        border-radius: 0.25rem;
        display: grid;
        place-items: center;
        font-size: 0.75rem;
        color: black;
        box-shadow:
            rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
            rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        background: linear-gradient(
            90deg,
            var(--bg) 0%,
            hsl(from var(--bg) h s calc(l * 0.9)) 100%
        );
    }

    &.lessThan22 {
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 0.2rem;
        .tileCard {
            font-size: 0.9rem;
            height: 20px;
            width: 48px;
        }
    }

    &.lessThan17 {
        justify-content: start;
        align-items: center;
        width: 100%;
        gap: 0.3rem;
        .tileCard {
            height: 30px;
            width: 40px;
        }
    }

    &.lessThan9 {
        justify-content: start;
        width: 100%;
        .tileCard {
            height: 60px;
            width: 40px;
        }
    }

    &.equal8 {
        justify-content: space-evenly;
    }
}
</style>
