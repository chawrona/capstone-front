<script setup>
import { computed, onUnmounted, ref } from "vue";
import { useToast } from "vue-toast-notification";

import { useAppStore } from "../store/useAppStore";

const store = useAppStore();
const toast = useToast();

const lobbyId = ref("");
const awaitingCreateLobby = ref(false);
const awaitingJoinLobby = ref(false);
const blockEverything = computed(
    () => awaitingCreateLobby.value || awaitingJoinLobby.value,
);


let errorTimeout = ref(null);

const toastError = (message) => {
    errorTimeout.value = setTimeout(() => {
        awaitingCreateLobby.value = false;
        toast.error(message, {
            duration: 4000,
            position: "top-left",
            type: "error",
        });
    }, 5000);
};

const createLobby = () => {
    awaitingCreateLobby.value = true;
    store.emit("createLobby");
    toastError("Wystąpił błąd podczas tworzenia pokoju.");
};

const joinLobby = () => {
    awaitingJoinLobby.value = true;
    store.emit("joinLobby", {
        lobbyId: lobbyId.value,
    });
    toastError("Wystąpił błąd podczas dołączania do pokoju.");
};

onUnmounted(() => clearTimeout(errorTimeout.value))
</script>

<template>
    <div class="app-container">
        <main class="content">
            <h2 class="theme-subtitle">Hungarian Vegas</h2>
            <h1 class="theme-title">BOARD GAMES</h1>

            <div class="wrap">
                <button
                    class="theme-button create"
                    :data-awaiting="awaitingCreateLobby"
                    :disabled="blockEverything"
                    @click="createLobby"
                >
                    Stwórz Pokój
                </button>
                <div class="separator" />
                <form class="form" @submit.prevent="joinLobby">
                    <input
                        v-model="lobbyId"
                        type="text"
                        placeholder="#cR4ak8"
                        class="theme-input"
                        :disabled="blockEverything"
                    />
                    <button
                        class="theme-button join"
                        :data-awaiting="awaitingJoinLobby"
                        :disabled="blockEverything"
                    >
                        Dołącz
                    </button>
                </form>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.content {
    display: flex;
    padding: 0.75rem 1.5rem;
    align-items: center;
    container-type: inline-size;
    flex-direction: column;
    justify-content: space-between;
    margin-inline: auto;
    margin-top: 40vh;
    max-width: 580px;
    transform: translateY(-50%);
}

.theme-subtitle {
    font-size: 1.1rem;
    text-align: center;
}

.theme-title {
    font-size: 1.85rem;
    margin-bottom: 1.25rem;
    text-align: center;
}

.wrap {
    display: flex;
    width: 100%;
    flex-direction: column;
    font-size: 18px;
    gap: 1.25rem;
    max-width: 425px;
}

.separator {
    width: 100%;
    height: 1px;
    background-color: #f5eac652;
}

.form {
    display: flex;
    gap: 0.5rem;
}

.theme-input {
    width: 100%;
    font-size: 13px;
}

.theme-button {
    font-size: 13px;
}

@media (width > 400px) {
    .theme-title {
        font-size: 2.4rem;
    }

    .theme-subtitle {
        font-size: 1.3rem;
        text-align: center;
    }

    .theme-input {
        width: 100%;
        font-size: 16px;
    }

    .theme-button {
        font-size: 16px;
    }

    .container {
        padding: 0.75rem 1.5rem;
    }
}

@media (width > 470px) {
    .theme-title {
        font-size: 2.88rem;
    }
}

@media (width > 800px) {
    .content {
        align-items: center;
        max-width: 835px;
    }

    .theme-title {
        font-size: 4.5rem;
        margin-bottom: 1.5rem;
    }

    .theme-subtitle {
        font-size: 2rem;
        margin-bottom: 0.1rem;
    }

    .wrap {
        flex-direction: row;
        gap: 2.15rem;
        justify-content: center;
        max-width: 100%;
    }

    .form {
        gap: 0.75rem;
    }

    .separator {
        width: 1px;
        height: auto;
    }

    .theme-input {
        width: 100%;
    }
}
</style>
