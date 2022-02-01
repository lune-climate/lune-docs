<template>
    <div>
        <Toggle @toggle="toggle" class="toggle" :class="toggleTextClass" :isToggable="isToggable">
            <span class="chevron" :class="chevron"></span>
            <span class="toggleText">{{ text }}</span>
        </Toggle>
        <div class="content">
            <slot v-if="this.on"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'onText': String,
        'offText': String,
        'toggleTextClass': String,
    },
    data() {
        return {
            on: false,
            text: this.offText,
            chevron: '',
            isToggable: false,
        }
    },
    mounted() {
        this.isToggable = !!this.$slots['default']
        if (!this.isToggable) {
            this.chevron = 'no'
            return
        }
        this.chevron = this.on ? 'bottom' : 'right'
    },
    methods: {
        toggle(isOn) {
            this.on = isOn
            this.text = isOn ? this.onText : this.offText

            if (!this.isToggable) {
                this.chevron = 'no'
                return
            }
            this.chevron = this.on ? 'bottom' : 'right'
        },
    }
}
</script>

<style lang="stylus">
.toggle
    display flex
    align-items center
.content
    margin-top 10px
    padding-left 20px;
    border-left dashed 1px $borderColor

.chevron
    display inline-block
    width 20px
    height 20px
    position relative
.chevron::after
    content ''
    border-right 2px solid #777
    border-bottom 2px solid #777
    width 50%
    height 50%
    display block
    position absolute

.chevron.no::after
    content ''
    border-right 0px solid #777
    border-bottom 2px solid #777
    width 50%
    height 50%
    display block
    position absolute

.chevron.right::after
    top 50%
    -webkit-transform translate(-30%, -50%) rotate(-45deg)
    -ms-transform translate(-30%, -50%) rotate(-45def)
    -o-transform translate(-30%, -50%) rotate(-45deg)
    transform translate(-30%, -50%) rotate(-45deg)

.chevron.bottom::after
    left 25%
    top 35%
    -webkit-transform translate(-30%, -50%) rotate(45deg)
    -ms-transform translate(-30%, -50%) rotate(45def)
    -o-transform translate(-30%, -50%) rotate(45deg)
    transform translate(-30%, -50%) rotate(45deg)

</style>
