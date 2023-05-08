<template>
  <div class="container-home">
    <h1 class="text-white main-title">TASK-LIST</h1>
    <TableComponent />
  </div>
  <LogoutButton />
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue'
import TableComponent from '@/components/TableComponent.vue'

let count = 0
let removeNotify = setInterval(() => {
  var el = document.querySelector('.tox.tox-silver-sink.tox-tinymce-aux');
  if (el) {
    el.parentNode.removeChild(el);
    count >= 2 ? clearInterval(removeNotify) : '';
  }
  count++;
}, 300)

export default {
  components: { LogoutButton, TableComponent },
}
</script>
