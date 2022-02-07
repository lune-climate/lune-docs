<template>
    <span v-if="nolink === true">{{ name }}</span>
    <a v-else :href="link">{{ name }}</a>
</template>
<script>
function refToName(ref) {
    if (!ref) {
        return ref
    }
    const items = ref.split('/')
    if (!items) {
        return undefined
    }
    return items[items.length - 1]
}

function refToLink(ref) {
    if (!ref) {
        return ref
    }
    const resourceName = refToName(ref)
    if (!resourceName) {
        return undefined
    }
    const resourceLink = resourceName
        .replace(/[^a-zA-Z0-9_ ]/g, '')
        .replace(/\s\s+/g, ' ')
        .replace(/\s/g, '-')
        .toLowerCase()
    return `${resourceLink}.html`
}
export default {
    props: {
        'reference': String,
        'nolink': { type: Boolean, default: false },
    },
    computed: {
        name() {
            if (!this) {
                return undefined
            }
            return refToName(this.reference)
        },
        link() {
            if (!this) {
                return undefined
            }
            return refToLink(this.reference)
        },
    }
 }
</script>
