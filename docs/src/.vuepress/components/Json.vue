<template>
    <main class="Json">
        <JsonObject v-if="json.type === 'object'" :json="json" />
        <JsonArray v-else-if="json.type === 'array'" :json="json" />
    </main>
</template>

<script>
export default {
    props: {
        'json': Object
    },
}
</script>

<style lang="stylus">
.Json
    font-size 90%
    .toggle
        font-size 80%
</style>
