<template>
    <main>
        <ToggableContent :onText="statusCode + ' ' + response.description" :offText="statusCode + ' ' + response.description" :toggleTextClass="toggleTextClass">
            <div v-if="response.schema">
                Resource: <Ref v-if="response.ref" :reference="response.ref" />
                <Json v-if="response.schema" :json="response.schema" />

                <div v-if="response.example">
                    <h5>Example:</h5>
                    <Code language="json" :code="response.example" />
                </div>
            </div>
        </ToggableContent>
    </main>
</template>

<script>
function calculateStatusCodeCssClass(statusCode) {
    if (!statusCode) {
        return ''
    }
    const statusCodeInt = parseInt(statusCode, 10)
    return statusCodeInt >= 200 && statusCodeInt < 300 ? 'response2xx' : 'response4xx'
}
export default {
    props: {
        'statusCode': String,
        'response': Object,
    },
    data() {
        return {
            toggleTextClass: ''
        }
    },
    mounted() {
        this.toggleTextClass = calculateStatusCodeCssClass(this.statusCode)
    }
}
</script>
<style lang="stylus">
.response2xx
    background-color lighten($badgeTipColor, 80%)
    color darken($badgeTipColor, 80%)
    padding 10px
.response4xx
    background-color lighten($badgeErrorColor, 80%)
    color darken($badgeErrorColor, 80%)
    padding 10px
</style>
