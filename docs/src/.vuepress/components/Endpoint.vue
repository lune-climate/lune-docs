<template>
    <main>
        <div class="endpoint">
            <Request :request="endpoint" />
            <Responses :json="endpoint.responses" />
        </div>
    </main>
</template>

<script>
export default {
    props: {
        'endpoint': Object,
    },
}
</script>
