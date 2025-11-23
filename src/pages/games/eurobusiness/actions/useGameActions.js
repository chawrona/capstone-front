import { useAppStore } from "@/store/useAppStore";

export function useGameActions() {
    const store = useAppStore();

    const test = () => {
        store.emit("gameData", { eventName: "test" });
    };

    return { test };
}
