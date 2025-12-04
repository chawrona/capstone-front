<script setup>
import { computed } from "vue";

const props = defineProps([
    "propertyCard",
    "closeDialogs",
    "mortgagePropertyCard",
    "redeemPropertyCard",
    "currentUser",
]);

const mortgage = computed(() => {
    return props.currentUser.mortgagedCards.includes(
        props.propertyCard.position,
    );
});
</script>

<template>
    <div class="dialog">
        <h2 class="question">
            {{
                mortgage
                    ? "Czy chcesz odkupić kartę?"
                    : "Czy chcesz zastawić kartę?"
            }}
        </h2>
        <div class="card" :style="`--color: ${propertyCard.color}`">
            <div class="top"></div>

            <div class="bottom">
                <span class="name">{{ propertyCard.name }}</span>

                <div class="mortgage">
                    <div>Cena:</div>
                    <div class="price">
                        <div>
                            {{ propertyCard.price }}<span class="dolar">$</span>
                        </div>
                    </div>
                    <div>Czynsz:</div>
                    <div class="price">
                        <div>
                            {{ propertyCard.rent }}<span class="dolar">$</span>
                        </div>
                    </div>
                    <div>Zastaw:</div>
                    <div class="price">
                        <div>
                            {{ propertyCard.mortgage
                            }}<span class="dolar">$</span>
                        </div>
                    </div>
                    <div>Odkupienie:</div>
                    <div class="price">
                        <div>
                            {{ (propertyCard.mortgage * 1.1).toFixed(0)
                            }}<span class="dolar">$</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="buttons">
            <button
                class="eurobusiness-button mortgage-button"
                @click="
                    () =>
                        mortgage
                            ? redeemPropertyCard(propertyCard)
                            : mortgagePropertyCard(propertyCard)
                "
            >
                {{ mortgage ? "Odkup" : "Zastaw" }}
            </button>
            <button
                class="eurobusiness-button close-button"
                @click="closeDialogs"
            >
                Odpuść
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.dialog {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    gap: 1rem;

    font-family: "Open Sans", sans-serif;
    font-size: 1.5rem;
    color: #ffffff;
    padding: 2rem 2rem;

    border: 4px solid #ffffff;
    border-radius: 0.5rem;
    outline: 6px solid #40a2e4;

    background: linear-gradient(
        142deg,
        rgba(64, 162, 228, 1) 0%,
        rgba(43, 135, 196, 1) 100%
    );
    box-shadow:
        rgba(0, 0, 0, 0.35) 0px 20px 40px,
        rgba(0, 0, 0, 0.32) 0px 12px 12px;

    .question {
        font-size: 2.25rem;
        margin-bottom: 0.25rem;
    }

    .buttons {
        display: flex;
        gap: 2rem;
    }

    .mortgage-button,
    .close-button {
        width: 120px;
        padding-block: 0.5rem;
    }

    .mortgage-button {
        background-color: rgb(47, 192, 18);

        &:hover {
            background-color: rgb(35, 172, 8);
        }
    }

    .close-button {
        background-color: rgb(211, 38, 38);

        &:hover {
            background-color: rgb(172, 8, 8);
        }
    }

    .card {
        display: flex;
        flex-direction: column;
        height: 200px;
        background-color: #fff;
        width: 150px;
        border-radius: 0.25rem;
        overflow: hidden;
        color: black;
        border: 1px solid black;

        .top {
            height: 36px;
            width: 148px;
            flex-shrink: 0;
            border-bottom: 1px solid black;
            background-color: var(--color);
        }
        .bottom {
            height: 164px;
            font-size: 1.5rem;
            display: flex;
            flex-direction: column;
            padding-block: 0.5rem;

            align-items: center;
            justify-content: space-evenly;
            gap: 0.75rem;

            .name {
                font-weight: bold;
            }

            .mortgage {
                display: grid;
                text-align: left;
                padding: 0.35rem;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                font-size: 1rem;
                font-weight: 500;

                .price {
                    text-align: right;
                    font-weight: normal;
                }
            }
        }
    }
}
</style>
