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

    let userId = getUserId();

    socket.on("connect", () => {
        store.setSocket(socket);
        store.setUserId(userId);

        store.emit("initialRequest", {
            lobbyId: route.params.id,
        });
    });

    socket.on("homepage", (error) => {
        router.push("/");
        store.setLoading(false);

        if (error) {
            toast.error(error.errorMessage, {
                duration: 4000,
                position: "top-left",
                type: "error",
            });
        }
    });

    socket.on("lobby", (data) => {
        router.push(`/${data.lobbyId}`);
    });

    socket.on("game", (data) => {
        router.push(`/${data.lobbyId}/${data.game}`);
    });

    socket.on("error", (error) => {
        if (error) {
            toast.error(error.errorMessage, {
                duration: 4000,
                position: "top-left",
                type: "error",
            });
        }
    });
}
