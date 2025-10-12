<script setup>
import { computed, ref } from "vue";

import Cancel from "@/assets/cancel.svg";
import Color from "@/assets/color.svg";
import Edit from "@/assets/edit.svg";
import Ready from "@/assets/ready.svg";
import Start from "@/assets/start.svg";

import { useAppStore } from "../../../../store/useAppStore";
import ChangeUserColorDialog from "../ChangeUserColorDialog.vue";
import ChangeUsernameDialog from "../ChangeUsernameDialog.vue";
import OptionButton from "../OptionButton.vue";

const props = defineProps(["currentUser", "gameData", "availableColors", "lobbyUsers"]);

const changeUsernameDialogRef = ref(null);
const changeUserColorDialogRef = ref(null);

const toggleReadyDisabled = ref(false);

const store = useAppStore();

const blockButtons = () => {
    if (toggleReadyDisabled.value) return true;
    toggleReadyDisabled.value = true;
    setTimeout(() => (toggleReadyDisabled.value = false), 300);
    return false;
};

const toggleReady = () => {
    if (blockButtons()) return;
    store.emit("toggleReady");
};

const areColorDuplicatedOrNotSelected = computed(() => {
    const usedColors = []
    for (const user of props.lobbyUsers) {
        if (!user.color || usedColors.includes(user.color.name)) return true;
        usedColors.push(user.color.name);
    }
    return false;
})

const areUsersReady = computed(() => {
    return props.lobbyUsers.every(user => user.isAdmin || user.isReady)
})

const canStartTheGame = computed(() => {
    if (blockButtons()) return false;
    if (areColorDuplicatedOrNotSelected.value) return false;
    if (!areUsersReady.value) return false;
    return true;
})

const handleGameStart = () => {
    if (!canStartTheGame.value) return;
    store.emit("gameStart");
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
            :lobby-users="props.lobbyUsers"
            :available-colors="props.availableColors"
        />

        <OptionButton
            v-if="!props.currentUser.isAdmin"
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
            :content="props.currentUser.color ? 'Zmień kolor' : 'Wybierz kolor'"
            @click="changeUserColorDialogRef?.openDialog"
        />
<!--   :disabled="readyUsers < props.gameData.maxPlayers" -->
        <OptionButton
            v-if="props.currentUser.isAdmin"
          
            :icon="Start"
            content="Zacznij grę"
            @click="handleGameStart"
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
