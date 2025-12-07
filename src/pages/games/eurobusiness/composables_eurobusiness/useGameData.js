import { ref, onMounted, onBeforeUnmount } from "vue";

import { useAppStore } from "@/store/useAppStore";

export function useGameData() {
    const store = useAppStore();

    const yourTurn = ref(null);
    const playersData = ref(null);
    const playersPosition = ref(null);
    const gameMap = ref(null);
    const availableActions = ref(null);
    const rollResult = ref(null);
    const yourPublicId = ref(null);
    const currentMessage = ref(null);
    const logs = ref(["Brak logów"]);
    const time = ref(59);
    const intervalId = ref(null);

    const eventsMap = {
        availableActions,
        currentMessage,
        gameMap,
        logs,
        playersData,
        playersPosition,
        rollResult,
        time,
        yourPublicId,
        yourTurn,
    };

    onMounted(() => {
        if (!store.socket) return;

        store.socket.on("gameDataRequest", (data) => {
            for (const key in eventsMap) {
                if (data[key] !== undefined) {
                    eventsMap[key].value = data[key];
                }
            }

            intervalId.value = setInterval(() => {
                time.value = !time.value ? 0 : time.value - 1;
            }, 1000);

            store.setLoading(false);
        });

        for (const eventName in eventsMap) {
            store.socket.on(eventName, (data) => {
                eventsMap[eventName].value = data;
            });
        }

        store.socket.on("endGame", () => {
            alert("Koniec gry");
        });

        store.emit("gameData", { eventName: "gameDataRequest" });
    });

    onBeforeUnmount(() => {
        if (!store.socket) return;

        store.socket.off("gameDataRequest");

        for (const eventName in eventsMap) {
            store.socket.off(eventName);
        }

        clearInterval(intervalId.value);
    });

    return {
        availableActions,
        currentMessage,
        gameMap,
        logs,
        playersData,
        playersPosition,
        rollResult,
        time,
        yourPublicId,
        yourTurn,
    };
}
