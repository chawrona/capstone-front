<script setup>
const props = defineProps(["logs", "playersData"]);

const replaceLogMessage = (log) => {
    const players = props.playersData.map((player) => [
        player.username,
        player.color.hex,
    ]);

    for (const player of players) {
        log = log.replace(
            player[0],
            `<span style="font-weight: bold; color: ${player[1]}">${player[0]}</span>`,
        );
    }

    log = log.replace(
        "$",
        `<span style="font-weight: 600; color: green"> $</span>`,
    );

    return log;
};
</script>

<template>
    <div class="logs">
        <h1 class="logsTitle">Historia gry</h1>
        <div
            v-for="(log, index) in logs"
            :key="index + log[1]"
            class="log"
            v-html="replaceLogMessage(log)"
        ></div>
    </div>
</template>

<style scoped lang="scss">
.logs {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 900px;
    border-radius: 0.25rem;
    background-image: linear-gradient(180deg, #fcfaf5, #e2d7c4);
    padding: 1.5rem;
    font-weight: 400;
    gap: 0.75rem;
    line-height: 1.2;
    overflow: hidden;
}

.logsTitle {
    margin-bottom: 0.5rem;
}
</style>
