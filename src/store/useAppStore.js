import { defineStore } from "pinia";

export const useAppStore = defineStore("socket", {
    actions: {
        emit(event, data) {
            this.socket.emit(event, {
                data,
                userId: this.userId,
            });
        },

        setLoading(isLoading) {
            this.isLoading = isLoading;
        },

        setSocket(socketInstance) {
            this.socket = socketInstance;
        },

        setUserId(userId) {
            this.userId = userId;
        },
    },
    state: () => ({
        isLoading: true,
        socket: null,
        userId: undefined,
    }),
});
