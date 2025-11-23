import { ref, onMounted, onBeforeUnmount } from "vue";

import { useAppStore } from "@/store/useAppStore";

export function useGameData() {
    const store = useAppStore();
    const gameData = ref(null);

    onMounted(() => {
        if (!store.socket) return;

        store.socket.on("gameData", (data) => {
            gameData.value = data;
            store.setLoading(false);
        });

        store.emit("gameData", { eventName: "gameDataRequest" });
    });

    onBeforeUnmount(() => {
        store.socket?.off("gameData");
    });

    return { gameData };
}
