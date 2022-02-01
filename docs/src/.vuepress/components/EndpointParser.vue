<template>
    <Endpoint :endpoint="JSON.parse(json)" />
</template>

<script>
export default {
    props: {
        'json': String
    },
}
</script>
