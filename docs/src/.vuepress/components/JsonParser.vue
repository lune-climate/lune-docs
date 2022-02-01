<template>
    <JsonContainer :json="JSON.parse(json)" />
</template>

<script>
    export default {
        props: {
            'json': String
        },
    }
</script>
