import io from "socket.io-client";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toast-notification";

import { useAppStore } from "../store/useAppStore";
import getUserId from "./getUserId";

export default function useSocket() {
    const store = useAppStore();
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();
    const socket = io("http://localhost:3000");
    // const socket = io("http://100.105.85.19:3000");

    let userId = getUserId();

    socket.on("connect", () => {
        store.setSocket(socket);
        store.setUserId(userId);

        store.emit("initialRequest", {
            lobbyId: route.params.id,
            username: localStorage.getItem("username"),
        });
    });

    socket.on("homepage", (payload) => {
        router.push("/");
        store.setLoading(false);

        if (payload) {
            toast.error(payload.error, {
                duration: 4000,
                position: "top-left",
                type: "error",
            });
        }
    });

    socket.on("lobby", (lobbyId) => {
        router.push(`/${lobbyId}`);
    });

    socket.on("game", (data) => {
        router.push(`/${data.lobbyId}/${data.game}`);
    });

    socket.on("error", (payload) => {
        if (payload) {
            toast.error(payload.error, {
                duration: 4000,
                position: "top-left",
                type: "error",
            });
        }
    });

    socket.on("info", (payload) => {
        if (payload) {
            toast.success(payload.info, {
                duration: 4000,
                position: "top-left",
                type: "info",
            });
        }
    });
}
