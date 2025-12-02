import { onMounted, onUnmounted } from "vue";

import { soundBus } from "@/audio/soundBus";

export function usePageSounds(options = {}) {
    const { effects = [], music = [] } = options;

    onMounted(() => {
        effects.forEach((e) => {
            soundBus.preload(e.name, e.url, "effect", e.pool || 1);
        });

        music.forEach((m) => {
            soundBus.preload(m.name, m.url, "music");

            if (m.name === "soundtrack") {
                soundBus.playMusic(m.name);
            }
        });
    });

    onUnmounted(() => {
        soundBus.unloadAll();
    });
}
