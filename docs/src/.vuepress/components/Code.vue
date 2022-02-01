<template>
    <main>
        <prism class="code" :language="language">{{ code }}</prism>
    </main>
</template>

<script>
import Prism from 'vue-prism-component'
import 'prismjs'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-liquid'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-scss'

export default {
    props: {
        'language': String,
        'code': [ String, Object ],
    },
    components: {
        Prism
    },
}
</script>
