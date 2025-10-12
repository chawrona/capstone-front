<script setup>
import { computed } from "vue";

const props = defineProps(["currentUser", "gameData", "lobbyUsers"]);

const readyUsers = computed(
    () =>
        props.lobbyUsers.filter((user) => user.isReady || user.isAdmin).length,
);
</script>

<template>
    <div class="panel top-right">
        <p class="theme-title ready-count">
            <span>Gotowi </span>
            <!-- <span>{{ `(${readyUsers}/${props.gameData.maxPlayers})` }}</span> -->
            <span>{{ `(${readyUsers}/${10})` }}</span>
        </p>

        <ul class="lobby-users">
            <li
                v-for="user in props.lobbyUsers"
                :key="user.publicId"
                :class="{
                    'lobby-user': props.currentUser !== user.publicId,
                    'current-user': props.currentUser === user.publicId,
                    ready: user.isReady || user.isAdmin,
                }"
            >
                {{ user.username }}
                <span
                    class="userColor"
                    :style="`background-color: ${user.color ? user.color.hex : '#242323'}`"
                >
                </span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.top-right {
    top: 0;
    right: 0;

    @media (width < 768px) {
        .top-right {
            order: 3;
        }
    }
}

.ready-count {
    text-align: right;
    font-size: 1.25rem;
    font-family: "Cinzel";
}

.lobby-users {
    text-align: right;
    list-style: none;
    font-size: 1.5rem;

    li {
        position: relative;
    }

    .userColor {
        position: absolute;
        content: "";
        height: 40%;
        top: 50%;
        transform: translate(150%, -70%);
        right: 0;
        border-radius: 50%;
        aspect-ratio: 1 / 1;
    }
}

.lobby-user {
    color: #ffffff;
    opacity: 0.5;
    font-weight: 600;

    @media (width < 768px) {
        text-align: center;
    }
}

.current-user {
    color: #f5eac6;
    opacity: 0.5;
    font-weight: 600;
}

.ready {
    opacity: 1;
}
</style>
