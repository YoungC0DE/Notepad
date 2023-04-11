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
                <tr v-for="(item, index) in itemsCollection" :key="index">
                    <td>
                        <input class="form-check-input shadow-none" name="selectLine" type="checkbox">
                    </td>
                    <td>{{ item.title }}</td>
                    <td>
                        <span class="badge rounded-pill text-bg-secondary"> {{ item.priority }} </span>
                    </td>
                    <td>{{ convertDate(item).date }}</td>
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
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default {
    inject: ['db'],
    data() {
        return {
            sticky: false,
            checkboxModel: false,
            itemsCollection: []
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
        convertDate(data) {
            let nanoseconds = data.created_at.nanoseconds
            let seconds = data.created_at.seconds

            let datetime = new Date(seconds * 1000 + nanoseconds / 1000000)

            let day = datetime.getDate().toString().padStart(2, '0')
            let month = (datetime.getMonth() + 1).toString().padStart(2, '0')
            let year = datetime.getFullYear().toString().padStart(2, '0')

            let hour = datetime.getHours().toString().padStart(2, '0')
            let minute = datetime.getMinutes().toString().padStart(2, '0')
            let second = datetime.getSeconds().toString().padStart(2, '0')

            let time = `${hour}:${minute}:${second}`;
            let date = `${day}/${month}/${year}`;

            return {
                date,
                time
            }
        },
        toggleCheckboxes() {
            var checkboxes = document.querySelectorAll('.table-list table tbody tr td input[type="checkbox"]')
            checkboxes.forEach((checkbox) => {
                checkbox.checked = this.checkboxModel
            })
        },
        loadItems() {
            const userdata = JSON.parse(atob(sessionStorage.getItem(btoa('userdata'))))

            const tableItems = collection(this.db, "items");
            const dataItems = query(tableItems, where("fk_user", "==", userdata.id), orderBy('created_at', 'desc'));

            getDocs(dataItems).then(resp => {
                resp.forEach((doc) => {
                    console.log(this.convertDate(doc.data()).time)
                    this.itemsCollection.push(doc.data())
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    watch: {
        checkboxModel(vNew, vOld) {
            this.toggleCheckboxes()
        }
    },
    mounted() {
        this.loadItems()
    }
}
</script>