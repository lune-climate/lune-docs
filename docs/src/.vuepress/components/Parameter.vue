<template>
    <main>
        <div>
            <span class="parameterName">{{ name }}</span>

            <span class="parameterType">{{ metadata.type }}</span>
            <span v-if="metadata.format" class="parameterAdditionalType"><{{ metadata.format }}></span>
            <span v-if="metadata.pattern" class="parameterAdditionalType">{{ metadata.pattern }}</span>
            <span v-if="metadata.type === 'array' && ['number', 'string', 'boolean'].includes(metadata.items.type)" class="parameterAdditionalType">of {{ metadata.items.type }}</span>
            <span v-if="metadata.type === 'array' && metadata.items.ref" class="parameterAdditionalType">of <Ref :reference="metadata.items.ref" /></span>

            <span v-if="required && required.includes(name)" class="parameterRequired">required</span>
        </div>
        <div class="parameterContent">
            <div v-if="metadata.summary" v-html="metadata.summary"></div>
            <Md :markdown="decodeHTML(metadata.description)" />

            <div v-if="discriminator && discriminator.propertyName === name" class="parameterDiscriminator">
                <select @change="change">
                    <option v-for="(metadata, name) in discriminator.mapping" :key="name">{{ name }}</option>
                </select>
            </div>

            <div v-if="metadata.enum" class="parameterExtras">
                <span>Enum:</span>
                <ul class="parameterEnum">
                    <li v-for="item in metadata.enum">{{ item }}</li>
                </ul>
            </div>

            <div v-if="metadata.oneOf">
                <ToggableContent onText="Hide child parameters" offText="Show child parameters" class="parameterChild">
                    <Json :json="metadata" />
                </ToggableContent>
            </div>
            <div v-else-if="metadata.type === 'object'">
                <ToggableContent onText="Hide child parameters" offText="Show child parameters" class="parameterChild">
                    <Json :json="metadata" />
                </ToggableContent>
            </div>
            <div v-else-if="metadata.type === 'array' && metadata.items.type === 'object'" class="parameterExtras">
                <ToggableContent onText="Hide child parameters" offText="Show child parameters" class="parameterChild">
                    <Json :json="metadata.items" />
                </ToggableContent>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    props: {
        'name': String,
        'metadata': Object,
        'required': Array,
        'discriminator': Object
    },
    methods: {
        change(e) {
            const value = e.target.value
            this.$emit('discriminatorChange', value)
        },
        decodeHTML(html) {
            if (!html || typeof document === 'undefined') {
                return undefined
            }
            const txt = document.createElement('textarea')
            txt.innerHTML = html
            return txt.value
        }
    }
}
</script>
<style lang="stylus">
.parameterName
    font-weight bold
.parameterType
.parameterAdditionalType
    opacity 0.7
.parameterRequired
    color $accentColor
    font-style: italic
.parameterContent
    margin-top 10px
.parameterDiscriminator
.parameterExtras
    margin-top 10px
.parameterEnum
    margin-left 10px
.keepFormatting
    white-space: pre-wrap
</style>
