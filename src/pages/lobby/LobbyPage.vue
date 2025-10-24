<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import { useAppStore } from "../../store/useAppStore";
import BottomLeftPanel from "./components/panels/BottomLeftPanel.vue";
import BottomRightPanel from "./components/panels/BottomRightPanel.vue";
import TopCenterPanel from "./components/panels/TopCenterPanel.vue";
import TopLeftPanel from "./components/panels/TopLeftPanel.vue";
import TopRightPanel from "./components/panels/TopRightPanel.vue";

const store = useAppStore();

const data = ref(null);

const currentUser = computed(() =>
    data.value.lobbyUsers.find(
        (user) => user.publicId === data.value.currentUser,
    ),
);

const readyUsers = computed(
    () =>
        data.value.lobbyUsers.filter((user) => user.isReady || user.isAdmin)
            .length,
);

onMounted(() => {
    store.setLoading(true);

    store.socket.on("lobbyData", (lobbyData) => {
        data.value = lobbyData;
        store.setLoading(false);
    });

    store.emit("lobbyDataRequest");
});

onUnmounted(() => {
    if (store.socket) store.socket.off("lobbyData");
});
</script>

<template>
    <div class="app-container">
        <main v-if="data" class="container">
            <TopLeftPanel
                :current-game="data.currentGame"
                :lobby-users="data.lobbyUsers"
                :current-user="currentUser"
                :ready-users="readyUsers"
                :available-colors="data.availableColors"
            />
            <TopCenterPanel :username="currentUser.username" />
            <TopRightPanel
                :current-user="currentUser"
                :current-game="data.currentGame"
                :ready-users="readyUsers"
                :lobby-users="data.lobbyUsers"
            />
            <BottomLeftPanel
                :current-user="currentUser"
                :lobby-users="data.lobbyUsers"
            />
            <BottomRightPanel />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.app-container {
    position: relative;
    display: flex;
    padding: 0.75rem 1.5rem;
    padding-top: 2rem;
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

.panel {
    padding: 2rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;

    @media (width < 768px) {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0.5rem;
    }
}
</style>
