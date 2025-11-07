import { useAppStore } from "../../../store/useAppStore";

const store = useAppStore();

export default function setGameData(data, gameData) {
    console.log("game: " + JSON.stringify(data));

    gameData.value = data;

    store.setLoading(false);
}
