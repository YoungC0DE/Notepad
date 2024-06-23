<script setup lang="js">
import { QuillEditor } from "@vueup/vue-quill";
</script>

<template>
  <quill-editor 
    :style="`min-height:${minHeight}rem;`" 
    :placeholder="placeholder"
    v-model:content="content" 
    content-type="html" 
    theme="snow"
    @click="forceFocus"
  >
    </quill-editor>
</template>

<script lang="js">
export default {
  props: {
    minHeight: {type: Number, default: 20},
    placeholder: {type: String, default: ''},
  },
  data() {
    return {
      content: '',
    }
  },
  methods: {
    forceFocus(e) {
      let targetClass = e.target.classList;

      if (!targetClass.contains('ql-container')) {
        return;
      }

      e.target.querySelector('.ql-editor').focus();
    },
  },
  watch: {
    'content': {
      handler(newVal) {
        this.$emit('input', newVal)
      }
    },
  }
}
</script>
