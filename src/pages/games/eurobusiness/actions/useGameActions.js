import { useAppStore } from "@/store/useAppStore";

import actions from "./actions";

export function useGameActions(availableActions) {
    const store = useAppStore();

    const rollDice = () => {
        if (!availableActions.value.includes(actions.rollDice)) return;
        store.emit("gameData", { eventName: "rollDice" });
    };

    const endTurn = () => {
        if (!availableActions.value.includes(actions.endTurn)) return;
        store.emit("gameData", { eventName: "endTurn" });
    };

    return { endTurn, rollDice };
}
