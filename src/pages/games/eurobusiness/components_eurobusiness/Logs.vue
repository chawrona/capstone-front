<script setup>
import { computed } from "vue";

const props = defineProps(["logs", "playersData"]);

const replaceLogMessage = (log) => {
    if (log === "hr") return null;

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
        `<span style="font-weight: 600; color: green">$</span>`,
    );

    return log;
};

const newLogs = computed(() => {
    let logs = [...props.logs];

    if (logs.length > 22) {
        logs = logs.slice(-22);
    }

    if (logs[logs.length - 1] === "hr") {
        logs.pop();
    }

    return logs;
});
</script>

<template>
    <div class="logs">
        <h1 class="logsTitle">Historia gry</h1>
        <template v-for="(log, index) in newLogs" :key="index + log">
            <div v-if="log === 'hr'" class="hr">
                <div class="line"></div>
                <div class="text">Nowa tura</div>
                <div class="line"></div>
            </div>
            <div
                v-else
                class="log"
                :style="`opacity: ${1 - (newLogs.length - 1 - index) * 0.025}`"
                v-html="replaceLogMessage(log)"
            />
        </template>
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
    padding: 1.5rem 1.25rem;
    font-weight: 400;
    font-size: 0.9rem;
    gap: 0.75rem;
    line-height: 1.4;
    overflow: hidden;
}

.logsTitle {
    margin-bottom: 0.75rem;
}

.hr {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    margin-top: 0.75rem;

    .line {
        height: 1px;
        width: 100%;
        background-color: #bbbbbb;
    }

    .text {
        flex-shrink: 0;
        color: #414141;
        font-size: 0.75rem;
    }
}
</style>
