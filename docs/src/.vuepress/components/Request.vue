<template>
    <main>
        <div class="request">
            <Code :code="request.method.toUpperCase() + ' ' + request.path" />

            <ToggableContent v-if="request.pathParameters.length" onText="Path parameters" offText="Path parameters" toggleTextClass="">
                <div v-for="pathParameter in request.pathParameters" class="pathProperty">
                    <Parameter :name="pathParameter.name" :metadata="{ ...pathParameter.schema, description: pathParameter.description }" :required="[pathParameter.required ? pathParameter.name : '']" />
                </div>
            </ToggableContent>

            <ToggableContent v-if="request.queryParameters.length" onText="Query parameters" offText="Query parameters" toggleTextClass="">
                <div v-for="queryParameter in request.queryParameters" class="queryProperty">
                    <Parameter :name="queryParameter.name" :metadata="{ ...queryParameter.schema, description: queryParameter.description }" :required="[queryParameter.required ? queryParameter.name : '']" />
                </div>
            </ToggableContent>

            <ToggableContent v-if="request.requestBodySchema" onText="Request Body Schema" offText="Request Body Schema" toggleTextClass="requestBodySchema">
                Resource: <Ref v-if="request.requestBodySchema && request.requestBodySchema.ref" :reference="request.requestBodySchema.ref" />
                <Json v-if="request.requestBodySchema" :json="request.requestBodySchema" />

                <div v-if="request.requestBodyExample">
                    <h5>Example:</h5>
                    <Code language="json" :code="request.requestBodyExample" />
                </div>
            </ToggableContent>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        'request': Object,
    },
}
</script>
<style lang="stylus">
.request
    margin-top 10px
.pathProperty
    padding-top 20px
    padding-bottom 20px
    border-bottom solid 1px $borderColor
.requestBodySchema
    font-weight bold
    padding-bottom 10px
</style>
