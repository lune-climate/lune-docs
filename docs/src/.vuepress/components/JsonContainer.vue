<template>
    <main>
        <Json :json="json" class="jsonContainer" />
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
.jsonContainer
    font-size 90%
</style>
