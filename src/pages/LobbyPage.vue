<script setup>
import { useRoute } from "vue-router";

import Color from "@/assets/color.svg";
import Exit from "@/assets/exit.svg";
import Left from "@/assets/left.png";
import List from "@/assets/list.svg";
import Name from "@/assets/name.svg";
import Ready from "@/assets/ready.svg";
import Remove from "@/assets/remove.svg";
import Right from "@/assets/right.png";
import Start from "@/assets/start.svg";

const route = useRoute();
</script>

<template>
    <div class="app-container">
        <!-- <h1 class="theme-subtitle">Kod Pokoju #{{ route.params.id }}</h1> -->
        <!-- <h2 class="theme-subtitle">Gracze</h2> -->
        <main class="container">
            <ul class="theme-list">
                <!-- <li>
                    <div class="ready golden"></div> 
                    <div class="theme-list-item golden">Versus137</div>
                    <button class="theme-button option-button">
                        <img :src="Name" alt="" />
                        Zmień nick
                    </button>
                    <button class="theme-button option-button">
                        <img :src="Color" alt="" />
                    </button>

                    <button class="theme-button option-button">
                        <img :src="Exit" alt="" />
                    </button>
                </li> -->
                <!-- <li>
                    <div class="ready"></div>
                    <div class="theme-list-item">Thinkofistodo</div>
                    <button class="theme-button option-button remove-button">
                        <img :src="Remove" alt="" />
                    </button>
                </li>
                <li>
                    <div class="ready">
                        <img :src="Ready" alt="" />
                    </div>
                    <div class="theme-list-item">SenseiW</div>
                    <button class="theme-button option-button remove-button">
                        <img :src="Remove" alt="" />
                    </button>
                </li>

                <li class="">
                    <div class="ready">
                        <img :src="Ready" alt="" />
                    </div>
                    <div class="theme-list-item user theme-subtitle">
                        Arekis
                    </div>

                    <button class="theme-button option-button remove-button">
                        <img :src="Remove" alt="" />
                    </button>
                </li>

                <li>
                    <div class="ready"></div>
                    <div class="theme-list-item">Mariusz</div>
                    <button class="theme-button option-button remove-button">
                        <img :src="Remove" alt="" />
                    </button>
                </li>
                <li>
                    <div class="ready">
                        <img :src="Ready" alt="" />
                    </div>
                    <div class="theme-list-item">Rever</div>
                    <button class="theme-button option-button remove-button">
                        <img :src="Remove" alt="" />
                    </button>
                </li>
                <li>
                    <div class="ready"></div>
                    <div class="theme-list-item">Kotlet Mielony</div>
                    <button class="theme-button option-button remove-button">
                        <img :src="Remove" alt="" />
                    </button>
                </li> -->
            </ul>
            <div class="panel top-left">
                <button class="theme-button option-button" disabled>
                    <img :src="Ready" alt="" />
                    Gotowy do gry
                </button>
                <button class="theme-button option-button" disabled>
                    <img :src="Name" alt="" />
                    Zmień nickname
                </button>
                <button class="theme-button option-button" disabled>
                    <img :src="Color" alt="" />
                    Zmień kolor
                </button>

                <button
                    disabled
                    class="theme-button option-button"
                    style="margin-left: auto"
                >
                    <img :src="List" alt="" />
                    Zmień grę
                    <!-- Dla nie admina: Przejrzyj gry -->
                </button>
                <button
                    disabled
                    class="theme-button option-button"
                    style="margin-left: auto"
                >
                    <img :src="Start" alt="" />
                    Zacznij grę
                </button>
            </div>

            <div class="panel bottom-left">
                <button class="theme-button option-button" disabled>
                    <img :src="Remove" alt="" />
                    Wyrzuć Gracza
                </button>
                <button class="theme-button option-button">
                    <img :src="Exit" alt="" />
                    Wyjdź
                </button>
            </div>

            <div class="panel top-right">
                <div class="gameCard">
                    <div class="wrap">
                        <img :src="Left" alt="" class="left" />
                        <img :src="Right" alt="" class="right" />
                    </div>

                    <img src="../assets/brianboru.webp" alt="" />
                    <h2 class="theme-title">Brian Boru</h2>

                    <p>
                        Strategiczna gra historyczna Łącząca
                        <strong>trick-taking</strong> i
                        <strong>area control</strong>. Walcz o wpływy w
                        średniowiecznej Irlandii – przez małżeństwa, wikingów i
                        Kościół.
                    </p>
                    <ul>
                        <li>
                            <span>👥</span>
                            <span><strong>Liczba graczy:</strong> 3–5</span>
                        </li>
                        <li>
                            <span>⏱</span>
                            <span><strong>Czas gry:</strong> 60–90 minut</span>
                        </li>

                        <li>
                            <span>⚙️</span>
                            <span>
                                <strong>Mechaniki:</strong> Trick-taking, area
                                control, draft kart</span
                            >
                        </li>
                        <li>
                            <span>🎲</span>
                            <span
                                ><strong>Gatunek:</strong> Gra strategiczna /
                                historyczna</span
                            >
                        </li>
                    </ul>
                </div>

                <!-- <button class="theme-button option-button">
                    <img :src="Start" alt="" />
                    Zmień grę
                </button> -->
            </div>

            <!-- <div class="panel bottom-right">
                 <button class="theme-button option-button">
                    <img :src="Remove" alt="" />
                    Wyrzuć Gracza
                </button>
                <button
                    class="theme-button option-button"
                    style="margin-left: auto"
                >
                    <img :src="List" alt="" />
                    Zmień grę
                </button>
                <button
                    class="theme-button option-button"
                    style="margin-left: auto"
                >
                    <img :src="Start" alt="" />
                    Zacznij grę
                </button>
            </div> -->

            <!-- <div class="card">
                <h2 class="theme-subtitle">ArekiS</h2>
            </div> -->
        </main>
    </div>
</template>

<style lang="scss" scoped>
.color,
.ready {
    display: none;
}

.exit-button {
    margin-top: auto;
}

.description {
}

.panel {
    padding: 2rem;
    position: absolute;
}

.gameCard .wrap {
    display: flex;
    position: absolute;
    bottom: 1rem;
    right: 1rem;

    img {
        width: 2rem;
        padding: 0.5rem 0.75rem;
        cursor: pointer;
    }

    .left {
        background-color: #f0dba5;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }
    .right {
        background-color: black;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
}

.gameCard {
    width: 650px;
    position: relative;
    font-family: sans-serif;
    font-family: "Cinzel";
    color: #eeeeee;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding: 1rem;
    border: 1px solid #f0dba5;
    border-radius: 4px;

    border: 1px solid rgba(255, 230, 180, 0.2);
    background-color: rgba(255, 230, 180, 0.05);
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    ul li {
        display: flex;
        gap: 0.5rem;
        list-style: none;
    }

    img {
        display: none;
    }

    span:first-of-type {
        width: 20px;
        display: grid;
        place-items: center;
    }
}

.top-left {
    top: 0;
    left: 0;
}

.bottom-left {
    bottom: 0;
    left: 0;
}

.top-right {
    top: 0;
    right: 0;
}

.bottom-right {
    bottom: 0;
    right: 0;
}

.option-button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0;
    width: 210px;
    padding: 1rem;
}

.option-button img {
    width: 1.5rem;
}

.app-container {
    position: relative;
    display: flex;
    padding: 0.75rem 1.5rem;
    padding-top: 2rem;
    // align-items: center;
    flex-direction: column;
    gap: 0.5rem;
    margin-inline: auto;
    container-type: inline-size;
}

.container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.theme-subtitle {
    letter-spacing: normal;
}

.theme-list {
    gap: 0.5rem;

    flex-direction: column;

    li {
        display: flex;
        gap: 0.5rem;
    }
}

.theme-list-item {
    width: 100%;
    font-size: 17px;
    height: 44px;
    width: 300px;
    font-weight: 600;
    letter-spacing: 1px;
}

.panel {
    // position: absolute;

    display: flex;

    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;

    // border: 1px solid rgba(255, 230, 180, 0.2);
    // background-color: rgba(255, 230, 180, 0.05);
    // border-radius: 4px;
    // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.card {
    position: absolute;
    padding: 1rem 1.75rem;
    width: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(255, 230, 180, 0.2);
    background-color: rgba(255, 230, 180, 0.05);
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.color {
    position: relative;
    width: 44px;
    height: 44px;
    padding: 0.5em 1em;
    border: 1px solid rgba(255, 230, 180, 0.2);
    background-color: rgba(255, 230, 180, 0.05);
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    &::after {
        position: absolute;
        content: "";
        width: 75%;
        aspect-ratio: 1 / 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(36, 126, 172, 0.665);
        border-radius: 50%;
        z-index: 20;
    }
}

.ready {
    position: relative;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    flex-shrink: 0;

    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    img {
        width: 80%;
        opacity: 0.75;
    }
}

.ready {
    border: 1px solid rgba(255, 230, 180, 0.2);
    background-color: rgba(255, 230, 180, 0.05);
}

.golden {
    border: 1px solid #f0dba5;
    background-color: rgba(255, 245, 200, 0.07);
}

.admin {
    border: 1px solid #f0dba5;
    background-color: rgba(255, 245, 200, 0.07);
    position: relative;
    font-weight: 600;
    color: #f0dba5;
}

.theme-list .info {
    position: absolute;
    top: 0rem;
    left: 0;
    transform: translateY(-2.15rem);
    display: flex;
    justify-content: start;
    align-items: center;
    color: #b0b0b0;
    font-size: 14px;
    gap: 0.6rem;
    margin-top: 0.5rem;
    font-weight: 500;

    img {
        width: 50px;
        height: 15px;
        transform: translateY(-0.15rem);
    }
}

.remove-button {
    display: none;
}
</style>
