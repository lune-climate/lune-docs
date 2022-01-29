<template>
    <Request :request="JSON.parse(json)" />
</template>

<script>
export default {
    props: {
        'json': String
    },
}
</script>
