<template>
    <a :href="link">{{ name }}</a>
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
    },
    data() {
        return {
            name: '',
            link: '',
        }
    },
    mounted() {
        this.name = refToName(this.reference)
        this.link = refToLink(this.reference)
    }
 }
</script>
