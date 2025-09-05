<script setup>
import { ref } from "vue";

import Cancel from "@/assets/cancel.svg";

import { useAppStore } from "../../../store/useAppStore";

const props = defineProps(["usersAvailableToKick"]);

const store = useAppStore();

const dialogRef = ref(null);

const closeDialog = () => dialogRef.value.close();
const openDialog = () => dialogRef.value.showModal();

defineExpose({
    closeDialog,
    openDialog,
});

const removeUser = (publicId) => {
    store.emit("removeUser", {
        userToKickPublicId: publicId,
    });
    closeDialog();
};
</script>

<template>
    <dialog ref="dialogRef" class="theme-dialog kickUserDialog">
        <h1>Wyrzuć gracza</h1>
        <ul>
            <li v-for="user in usersAvailableToKick" :key="user.publicId">
                <button @click="() => removeUser(user.publicId)">
                    <img :src="Cancel" alt="" />
                    <span>{{ user.username }} </span>
                </button>
            </li>
        </ul>
        <button class="theme-button closeDialog" @click="closeDialog">
            Zamknij
        </button>
    </dialog>
</template>

<style scoped>
.kickUserDialog {
    width: 375px;

    h1 {
        font-family: "Cinzel";
        font-size: 1.75rem;
        width: 100%;
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        list-style: none;
        margin: 0.75rem 0;
        margin-bottom: 1rem;
        li {
            width: 100%;
        }
    }

    li button {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        font-size: 1rem;
        color: white;
        border: none;
        transform: translateX(-0.5rem);
        border-radius: 4px;
        padding: 0.75rem 0.5rem;
        background-color: transparent;
        cursor: pointer;
        width: calc(100% + 0.5rem);

        &:hover {
            background-color: #ffffff18;
        }
    }

    .closeDialog {
        width: 100%;
        padding-block: 0.7rem;
    }
}
</style>
