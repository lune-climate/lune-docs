<template>
    <main>
        <div v-if="json.type !== 'array' && json.type !== 'object' && !json.oneOf">
            <Parameter :metadata="json" :required="json.required" :discriminator="json.discriminator" @discriminatorChange="onOneOfDiscrimanatorChange" />
        </div>
        <span v-if="resourceReferences.length">
            <div v-if="json.discriminator">
                One of:
                <ul>
                    <li v-for="resourceReference in resourceReferences" ><Ref :reference="resourceReference" :nolink="resourceRef !== resourceReference" /></li>
                </ul>
                <span v-if="json.discriminator">
                    Determined by property <b>{{ json.discriminator.propertyName }}</b>
                </span>
            </div>
            <div v-else>
                One of:
                <select @change="onOneOfChange">
                    <option v-for="(resourceReference, index) in resourceReferences" :value="index">{{!resourceReference ? 'Object' : refToName(resourceReference)}}</option>
                </select>
                <Ref :reference="resourceRef" />
            </div>
        </span>
        <div v-if="properties" v-for="(metadata, name) in properties" :key="name" class="jsonProperty">
            <Parameter :name="name" :metadata="metadata" :required="json.required" :discriminator="json.discriminator" @discriminatorChange="onOneOfDiscrimanatorChange" />
        </div>
    </main>
</template>

<script>
export default {
    props: {
        'json': Object
    },
    data() {
        return {
            properties: {},
            resourceRef: undefined,
            resourceReferences: [],
        }
    },
    mounted() {
        if (!this.json.oneOf) {
            this.properties = this.json.properties
            return
        }

        const obj = this.json.oneOf[0]
        this.properties = obj.properties
        this.resourceRef = obj.ref

        this.resourceReferences = this.json.oneOf.map(({ ref }) => ref)
    },
    methods: {
        onOneOfChange(e) {
            const index = parseInt(e.target.value, 10)
            if (!this.json.oneOf) {
                return
            }

            if (index === undefined) {
                console.error(`Could not find mapping for ${index}`)
                return
            }

            const obj = this.json.oneOf[index]
            this.properties = obj.properties
            this.resourceRef = obj.ref
        },
        onOneOfDiscrimanatorChange(value) {
            if (!this.json.oneOf) {
                return
            }

            // find the oneOf index
            let index = undefined
            let i = 0
            for (const mapping of Object.keys(this.json.discriminator.mapping)) {
                if (value === mapping) {
                    index = i
                    break
                }
                i += 1
            }

            if (index === undefined) {
                console.error(`Could not find mapping for ${value}`)
                return
            }

            const obj = this.json.oneOf[index]
            this.properties = obj.properties
            this.resourceRef = obj.ref
        },
        refToName(ref) {
            if (!ref) {
                return ref
            }
            const items = ref.split('/')
            if (!items) {
                return undefined
            }
            return items[items.length - 1]
        }
    },
}
</script>

<style lang="stylus">
.jsonProperty
    padding-top 20px
    padding-bottom 20px
    border-bottom solid 1px $borderColor
</style>
