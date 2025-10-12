<script setup>
import { computed, ref } from "vue";

import { useAppStore } from "../../../store/useAppStore";

const props = defineProps(["availableColors", "currentUser", "lobbyUsers"]);

const store = useAppStore();

const dialogRef = ref(null);

const closeDialog = () => dialogRef.value.close();
const openDialog = () => dialogRef.value.showModal();

defineExpose({
    closeDialog,
    openDialog,
});

const blockedColors = computed(() => {
    return props.lobbyUsers.filter(user => user.color).map((user) => user.color.name);
});

const changeUserColor = (color) => {

    if (blockedColors.value.includes(color.name)) return

    store.emit("changeUserColor", {
        newColor: color,
    });
    closeDialog();
};
</script>

<template>
    <dialog ref="dialogRef" class="theme-dialog changeUserColorDialog">
        <h1>Zmień kolor</h1>

        <div class="availableColors">
            <div
                v-for="color in availableColors"
                :key="color.name"
                class="colorWrap"
                :class="{'disabledColor': blockedColors.includes(color.name)}"
                @click="() => changeUserColor(color)"
            >
                <div class="color" :style="`background-color: ${color.hex}`" />
            </div>
        </div>

        <button class="theme-button closeDialog" @click="closeDialog">
            Zamknij
        </button>
    </dialog>
</template>

<style scoped>
.changeUserColorDialog {
    width: 375px;

    &[open] {
        display: flex;
    }

    h1 {
        font-family: "Cinzel";
        font-size: 1.75rem;
        width: 100%;
    }
    flex-direction: column;
    gap: 0.5rem;

    .closeDialog {
        margin-top: 1rem;
    }
}

.availableColors {
    display: flex;
    justify-content: space-around;
    gap: 0.5rem;

    .colorWrap {
        padding: 0.5rem;
    }

    .colorWrap:not(.disabledColor) {
        padding: 0.5rem;
        cursor: pointer;

        &:hover .color {
            filter: brightness(0.75);
        }
    }

    .color {
        width: 2em;
        padding: 0.75rem;
        height: 2rem;
        background-color: red;
        border-radius: 50%;
        box-shadow: 1px 1px 3px 3px rgb(0, 0, 0);
    }
}

.disabledColor {
    opacity: 0.25;
    cursor: not-allowed;
}
</style>
