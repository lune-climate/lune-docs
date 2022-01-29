<template>
    <div @click="click" :class="toggleClass">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        'isToggable': Boolean,
    },
    data() {
        return {
            on: false,
            toggleClass: '',
        }
    },
    mounted() {
        this.toggleClass = this.isToggable === true ? 'toggle' : ''
    },
    methods: {
        click() {
            if (!this.isToggable) {
                return
            }
            this.on = !this.on
            this.$emit('toggle', this.on)
        },
    }
}
</script>
<style lang="stylus">
.toggle
    text-decoration none
.toggle:hover
    text-decoration underline
    cursor pointer
</style>
