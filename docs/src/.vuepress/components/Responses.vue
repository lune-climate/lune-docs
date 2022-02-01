<template>
    <main>
        <div v-for="(response, statusCode) in json" :key="statusCode" class="responses">
            <Response :statusCode="statusCode" :response="response" />
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
.responses
    margin-top 10px
</style>
