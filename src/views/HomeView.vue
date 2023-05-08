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

let removeNotify = setInterval(() => {
  var el = document.querySelector('.tox.tox-silver-sink.tox-tinymce-aux');
  if (!el) return;
  
  el.parentNode.removeChild(el);
  clearInterval(removeNotify);
}, 300)

export default {
  components: { LogoutButton, TableComponent },
}
</script>
