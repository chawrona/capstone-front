import io from "socket.io-client";
import { useRouter, useRoute } from "vue-router";

import { useAppStore } from "../store/useAppStore";

export default function useSocket() {
    const store = useAppStore();
    const router = useRouter();
    const route = useRoute();

    let userId = localStorage.getItem("userId");

    if (!userId) {
        userId = [...Array(10)]
            .map(() => Math.random().toString(36)[2])
            .join("");
        localStorage.setItem("userId", userId);
    }

    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
        store.setSocket(socket);
        store.setUserId(userId);

        store.emit("initialRequest", {
            lobbyId: route.params.id,
        });
    });

    socket.on("homepage", () => {
        router.push("/");
        store.setLoading(false);
    });

    socket.on("lobby", (data) => {
        router.push(`/${data.lobbyId}`);
        store.setLoading(false);
    });

    socket.on("game", (data) => {
        router.push(`/${data.lobbyId}/${data.game}`);
        store.setLoading(false);
    });
}
