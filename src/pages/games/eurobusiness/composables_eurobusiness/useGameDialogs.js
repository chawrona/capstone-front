import { ref, onMounted, onBeforeUnmount, computed } from "vue";

import { useAppStore } from "@/store/useAppStore";

export function useGameDialogs() {
    const store = useAppStore();

    const chanceCardDialogOpen = ref(false);
    const chanceCard = ref(null);

    const communityCardDialogOpen = ref(false);
    const communityCard = ref(null);

    const auctionCardDialogOpen = ref(false);
    const auction = ref(null);

    const dialogsOpen = computed(() => {
        return (
            auctionCardDialogOpen.value ||
            communityCardDialogOpen.value ||
            chanceCardDialogOpen.value
        );
    });

    const closeDialogs = () => {
        console.log("Closed");

        chanceCardDialogOpen.value = false;
        communityCardDialogOpen.value = false;
        auctionCardDialogOpen.value = false;
    };

    onMounted(() => {
        if (!store.socket) return;

        store.socket.on("pickedChanceCard", (chanceCardData) => {
            chanceCard.value = chanceCardData;
            chanceCardDialogOpen.value = true;
        });

        store.socket.on("pickedCommunityCard", (communityCardData) => {
            communityCard.value = communityCardData;
            communityCardDialogOpen.value = true;
        });

        store.socket.on("auction", (auctionData) => {
            auction.value = auctionData;
            auctionCardDialogOpen.value = true;
        });

        store.socket.on("closeDialogs", closeDialogs);
    });

    onBeforeUnmount(() => {
        if (!store.socket) return;

        store.socket.off("pickedChanceCard");
        store.socket.off("pickedCommunityCard");
        store.socket.off("auction");
        store.socket.off("closeDialogs");
    });

    return {
        auction,
        auctionCardDialogOpen,
        chanceCard,
        chanceCardDialogOpen,
        closeDialogs,
        communityCard,
        communityCardDialogOpen,
        dialogsOpen,
    };
}
