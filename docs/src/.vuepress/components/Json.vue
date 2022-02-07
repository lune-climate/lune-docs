<template>
    <main class="Json">
        <JsonArray v-if="json.type === 'array'" :json="json" />
        <JsonObject v-else :json="json" />
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
