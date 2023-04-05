<template>
  <div class="table-list" v-on:scroll="onScroll">
    <table class="table text-white m-0">
      <thead>
        <tr>
          <th scope="col" :class="sticky == true ? 'sticky-scroll' : '' "><input class="form-check-input" name="teste" type="checkbox" value="" id="defaultCheck1"></th>
          <th scope="col" :class="sticky == true ? 'sticky-scroll' : '' ">Title</th>
          <th scope="col" :class="sticky == true ? 'sticky-scroll' : '' ">Priority</th>
          <th scope="col" :class="sticky == true ? 'sticky-scroll' : '' ">Date</th>
          <th scope="col" :class="sticky == true ? 'sticky-scroll' : '' ">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in 20" :key="index">
          <td><input class="form-check-input shadow-none" name="teste" type="checkbox" value="" id="defaultCheck1"></td>
          <td>Test</td>
          <td><span class="badge rounded-pill text-bg-secondary">Not important</span></td>
          <td>12/12/2023</td>
          <td><button type="button" class="btn btn-dark shadow-none"><i class="bi bi-eye"></i></button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <ul class="circles">
    <li v-for="(item, index) in 10" :key="index"></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      sticky: false
    }
  },
  methods: {
    onScroll(event) {
      console.log(event.target)
      if (event.target.scrollTop > 0) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }
  }
}
</script>
