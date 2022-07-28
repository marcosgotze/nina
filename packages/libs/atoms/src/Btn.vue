<template>
    <button
        class="btn"
        :disabled="disabled"
        :type="type"
    >
        Text
    </button>
</template>

<script>
export default {
    name: 'btn',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'button',
        },
    },
};
</script>
