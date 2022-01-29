<template>
    <main>
    <h4>Responses</h4>
    <Responses :json="JSON.parse(json)" />
    </main>
</template>

<script>
    export default {
        props: {
            'json': String
        },
    }
</script>
