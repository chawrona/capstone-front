<script setup>
const props = defineProps(["icon", "content"]);
</script>

<template>
    <button :disabled="props.disabled" class="theme-button option-button">
        <img :src="props.icon" alt="" class="icon" />
        {{ content }}
    </button>
</template>

<style scoped>
.option-button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0;
    width: 230px;
    padding: 1rem;
}

.icon {
    width: 1.5rem;
}
</style>
