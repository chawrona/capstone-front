import { soundBus } from "@/audio/soundBus";
import { useAppStore } from "@/store/useAppStore";

import actions from "./actions";

export function useGameActions(availableActions, dialogsOpen) {
    const store = useAppStore();
    const cooldowns = {};

    const canEmit = (action) => {
        if (
            dialogsOpen.value &&
            action !== actions.mortgagePropertyCard &&
            action !== actions.redeemPropertyCard
        )
            return true;
        if (!availableActions.value.includes(action)) return true;

        const now = Date.now();
        if (cooldowns[action] && now - cooldowns[action] < 1000) return true;

        cooldowns[action] = now;
        return false;
    };

    const rollDice = () => {
        if (canEmit(actions.rollDice)) return;
        store.emit("gameData", { eventName: "rollDice" });
        soundBus.playEffect("roll");
    };

    const endTurn = () => {
        if (canEmit(actions.endTurn)) return;
        store.emit("gameData", { eventName: "endTurn" });
        soundBus.playEffect("endTurn");
    };

    const pickCommunityCard = () => {
        if (canEmit(actions.pickCommunityCard)) return;
        store.emit("gameData", { eventName: "pickCommunityCard" });
        soundBus.playEffect("drawCard");
    };

    const pickChanceCard = () => {
        if (canEmit(actions.pickChanceCard)) return;
        store.emit("gameData", { eventName: "pickChanceCard" });
        soundBus.playEffect("drawCard");
    };

    const payTax = () => {
        if (canEmit(actions.payTax)) return;
        store.emit("gameData", { eventName: "payTax" });
        soundBus.playEffect("pay");
    };

    const payRent = () => {
        if (canEmit(actions.payRent)) return;
        store.emit("gameData", { eventName: "payRent" });
        soundBus.playEffect("pay");
    };

    const payIncomeTax = () => {
        if (canEmit(actions.payIncomeTax)) return;
        store.emit("gameData", { eventName: "payIncomeTax" });
        soundBus.playEffect("pay");
    };

    const buyBuilding = () => {
        if (canEmit(actions.buyBuilding)) return;
        store.emit("gameData", { eventName: "buyBuilding" });
        soundBus.playEffect("pay");
    };

    const refuseToBuyBuilding = () => {
        if (canEmit(actions.refuseToBuyBuilding)) return;
        store.emit("gameData", { eventName: "refuseToBuyBuilding" });
        soundBus.playEffect("pay");
    };

    const payJail = () => {
        if (canEmit(actions.payJail)) return;
        store.emit("gameData", { eventName: "payJail" });
        soundBus.playEffect("pay");
    };

    const useOutOfJailCard = () => {
        if (canEmit(actions.payJail)) return;
        store.emit("gameData", { eventName: "useOutOfJailCard" });
        soundBus.playEffect("pay");
    };

    const mortgagePropertyCard = (card) => {
        if (canEmit(actions.mortgagePropertyCard)) return;
        store.emit("gameData", {
            data: card,
            eventName: "mortgagePropertyCard",
        });
        soundBus.playEffect("pay");
    };

    const redeemPropertyCard = (card) => {
        if (canEmit(actions.redeemPropertyCard)) return;
        store.emit("gameData", {
            data: card,
            eventName: "redeemPropertyCard",
        });
        soundBus.playEffect("pay");
    };

    return {
        buyBuilding,
        endTurn,
        mortgagePropertyCard,
        payIncomeTax,
        payJail,
        payRent,
        payTax,
        pickChanceCard,
        pickCommunityCard,
        redeemPropertyCard,
        refuseToBuyBuilding,
        rollDice,
        useOutOfJailCard,
    };
}
