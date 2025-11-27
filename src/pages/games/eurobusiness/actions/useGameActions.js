import { useAppStore } from "@/store/useAppStore";

export function useGameActions() {
    const store = useAppStore();

    const rollDice = () => {
        store.emit("gameData", { eventName: "rollDice" });
        console.log("Poszło!");
    };

    return { rollDice };
}
