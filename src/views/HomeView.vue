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
console.clear();
const styles = [
  'color: orange',
  'background: white',
  'font-size: 24px',
  'border: 1px solid blue',
  'text-shadow: 2px 2px black',
  'padding: 10px',
].join(';');
console.log('%cWelcome. Execute your advanced test on here!', styles);

export default {
  components: { LogoutButton, TableComponent },
}
</script>
