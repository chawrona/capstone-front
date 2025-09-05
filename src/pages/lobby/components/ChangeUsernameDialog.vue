<script setup>
import { ref } from "vue";

import { useAppStore } from "../../../store/useAppStore";

const props = defineProps(["username"]);

const store = useAppStore();

const dialogRef = ref(null);

const closeDialog = () => dialogRef.value.close();
const openDialog = () => dialogRef.value.showModal();

defineExpose({
    closeDialog,
    openDialog,
});

const changeUsernameInput = ref(null);
const changeUsername = () => {
    store.emit("changeUsername", {
        newUsername: changeUsernameInput.value,
    });
    localStorage.setItem("username", changeUsernameInput.value);
    changeUsernameInput.value = "";
    closeDialog();
};
</script>

<template>
    <dialog ref="dialogRef" class="theme-dialog changeUsernameDialog">
        <h1>Zmień pseudonim</h1>
        <div class="inputWrap">
            <input
                v-model="changeUsernameInput"
                type="text"
                class="theme-input changeUsernameInput"
                :placeholder="username"
                minlength="3"
                maxlength="20"
                required
            />
            <button class="theme-button" @click="changeUsername">Zmień</button>
        </div>
        <button class="theme-button closeDialog" @click="closeDialog">
            Zamknij
        </button>
    </dialog>
</template>

<style scoped>
.changeUsernameDialog {
    .inputWrap {
        display: flex;
        gap: 0.5rem;
    }

    width: 455px;
    &[open] {
        display: flex;
    }

    flex-direction: column;
    gap: 0.85rem;
    h1 {
        font-family: "Cinzel";
        font-size: 1.75rem;
        width: 100%;
    }

    .closeDialog {
        margin-top: 0.25rem;
    }
}

.changeUsernameInput {
    letter-spacing: 1.5px;
    font-size: 1rem;
}
</style>
