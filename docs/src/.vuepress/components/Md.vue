<template>
  <div class="text-formatted" v-html="renderedMarkdown" />
</template>

<script>
import markdownIt from 'markdown-it'

export default {
  props: {
    markdown: {
      type: String,
    },
  },
  computed: {
    renderedMarkdown() {
        if (!this.markdown) {
            return undefined
        }
        const md = new markdownIt({ html: true })
        const rendered = md.render(this.markdown)
        return rendered
    }
  },
}
</script>
