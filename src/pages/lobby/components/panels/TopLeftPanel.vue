<script setup>
import { ref } from "vue";

import Cancel from "@/assets/cancel.svg";
import Color from "@/assets/color.svg";
import Edit from "@/assets/edit.svg";
import Ready from "@/assets/ready.svg";
import Start from "@/assets/start.svg";

import { useAppStore } from "../../../../store/useAppStore";
import ChangeUserColorDialog from "../ChangeUserColorDialog.vue";
import ChangeUsernameDialog from "../ChangeUsernameDialog.vue";
import OptionButton from "../OptionButton.vue";

const props = defineProps(["currentUser", "gameData"]);

const changeUsernameDialogRef = ref(null);
const changeUserColorDialogRef = ref(null);

const toggleReadyDisabled = ref(false);

const store = useAppStore();

const toggleReady = () => {
    toggleReadyDisabled.value = true;
    store.emit("toggleReady");
    setTimeout(() => (toggleReadyDisabled.value = false), 1000);
};
</script>

<template>
    <div class="panel top-left">
        <ChangeUsernameDialog
            ref="changeUsernameDialogRef"
            :username="props.currentUser.username"
        />

        <ChangeUserColorDialog
            ref="changeUserColorDialogRef"
            :current-user="props.currentUser"
            :available-colors="props.gameData.availableColors"
        />

        <OptionButton
            v-if="!props.currentUser.isAdmin"
            :disabled="toggleReadyDisabled"
            :data-awaiting="toggleReadyDisabled"
            :icon="!props.currentUser.isReady ? Ready : Cancel"
            :content="
                !props.currentUser.isReady
                    ? 'Jestem gotowy(-a)'
                    : 'Anuluj gotowość'
            "
            @click="toggleReady"
        />

        <OptionButton
            :icon="Edit"
            content="Zmień pseudonim"
            @click="changeUsernameDialogRef?.openDialog"
        />

        <OptionButton
            :icon="Color"
            content="Zmień kolor"
            @click="changeUserColorDialogRef?.openDialog"
        />

        <OptionButton
            v-if="props.currentUser.isAdmin"
            :disabled="readyUsers < props.gameData.maxPlayers"
            :icon="Start"
            content="Zacznij grę"
            @click="() => console.log('Start')"
        />
    </div>
</template>

<style scoped>
.top-left {
    top: 0;
    left: 0;

    @media (width < 768px) {
        order: 4;
        padding-bottom: 0;
    }
}
</style>
