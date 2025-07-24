import io from "socket.io-client";
import { useRouter, useRoute } from "vue-router";

import { useAppStore } from "../store/useAppStore";
import getUserId from "./getUserId";

export default function useSocket() {
    const store = useAppStore();
    const router = useRouter();
    const route = useRoute();
    const socket = io("http://localhost:3000");

    let userId = getUserId();

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
