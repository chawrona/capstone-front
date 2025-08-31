<script setup>
import { computed, onMounted, ref } from "vue";

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

onMounted(() => {
    store.setLoading(true);

    setTimeout(() => {
        data.value = {
            currentUser: "1",
            gameData: {
                availableColors: [
                    {
                        hex: "#d72638",
                        name: "crimson",
                    },
                    {
                        hex: "#3b82f6",
                        name: "blue",
                    },
                    {
                        hex: "#22c55e",
                        name: "green",
                    },
                    {
                        hex: "#facc15",
                        name: "yellow",
                    },
                    {
                        hex: "#9333ea",
                        name: "purple",
                    },
                    {
                        hex: "#f97316",
                        name: "orange",
                    },
                ],
                description: "Lorem ipsum",
                game: "brianboru",
                maxPlayers: 5,
            },
            lobbyUsers: [
                {
                    color: {
                        hex: "#d72638",
                        name: "crimson",
                    },
                    isAdmin: true,
                    isReady: false,
                    publicId: "1",
                    username: "Thinkofistodo",
                },
                {
                    color: null,
                    isAdmin: false,
                    isReady: true,
                    publicId: "2",
                    username: "BlueFalcon",
                },
                {
                    color: {
                        hex: "#3b82f6",
                        name: "blue",
                    },
                    isAdmin: false,
                    isReady: true,
                    publicId: "3",
                    username: "SilentWave",
                },
                {
                    color: null,
                    isAdmin: false,
                    isReady: true,
                    publicId: "4",
                    username: "IronShadow",
                },
                {
                    color: {
                        hex: "#f97316",
                        name: "orange",
                    },
                    isAdmin: false,
                    isReady: true,
                    publicId: "5",
                    username: "CrimsonFox",
                },
            ],
        };
        // Jak będzie prawdziwy event z danymi to można usunąć request animation frame
        requestAnimationFrame(() => {
            store.setLoading(false);
        });
    }, 500);

    store.socket.on("lobbyData", (lobbyData) => {
        data.value = lobbyData;
        toggleReadyDisabled.value = false;
    });
});
</script>

<template>
    <div class="app-container">
        <main v-if="data" class="container">
            <TopLeftPanel
                :game-data="data.gameData"
                :current-user="currentUser"
            />
            <TopCenterPanel :username="currentUser.username" />
            <TopRightPanel
                :current-user="currentUser"
                :game-data="data.gameData"
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
