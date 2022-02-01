<template>
    <main>
        <div v-for="(metadata, name) in json.properties" :key="name" class="jsonProperty">
            <Parameter :name="name" :metadata="metadata" :required="json.required" />
        </div>
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
.jsonProperty
    padding-top 20px
    padding-bottom 20px
    border-bottom solid 1px $borderColor
</style>
