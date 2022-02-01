<template>
    <div class="jsonProperty">
        <div>Array of <Ref :reference="json.items.ref" /></div>
        <ToggableContent onText="Hide child parameters" offText="Show child parameters" class="jsonPropertyChild">
            <JsonObject v-if="json.items.type === 'object'" :json="json.items" />
        </ToggableContent>
    </div>
</template>

<script>
export default {
    props: {
        'json': Object
    },
}
</script>
