<script setup>
const props = defineProps(["propertyCard"]);
</script>

<template>
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
                        {{ propertyCard.mortgage }}<span class="dolar">$</span>
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
</template>

<style scoped lang="scss">
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
</style>
