<template>
    <div class="table-list" v-on:scroll="onScroll">
        <table class="table text-white m-0">
            <thead>
                <tr>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">
                        <input class="form-check-input" name="teste" type="checkbox" v-model="checkboxModel">
                    </th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Title</th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Priority</th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Date</th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in 20" :key="index">
                    <td>
                        <input class="form-check-input shadow-none" name="selectLine" type="checkbox">
                    </td>
                    <td>Test</td>
                    <td>
                        <span class="badge rounded-pill text-bg-secondary">Not important</span>
                    </td>
                    <td>12/12/2023</td>
                    <td>
                        <button type="button" class="btn btn-dark shadow-none" data-bs-toggle="modal" data-bs-target="#DetailsModal">
                            <i class="bi bi-eye"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sticky: false,
            checkboxModel: false,
        }
    },
    methods: {
        onScroll(event) {
            if (event.target.scrollTop > 0) {
                this.sticky = true;
                return
            }
            this.sticky = false;
        },
        toggleCheckboxes() {
            var checkboxes = document.querySelectorAll('.table-list table tbody tr td input[type="checkbox"]')
            checkboxes.forEach((checkbox) => {
                checkbox.checked = this.checkboxModel
            })
        }
    },
    watch: {
        checkboxModel(vNew, vOld) {
            this.toggleCheckboxes()
        }
    },
}
</script>