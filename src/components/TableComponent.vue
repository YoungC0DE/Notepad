<template>
    <DetailsModal :values="forModal" />
    <div class="table-list" v-on:scroll="onScroll">
        <table class="table text-white m-0">
            <thead>
                <tr>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">#</th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Title</th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Priority</th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Created At</th>
                    <th scope="col" :class="sticky == true ? 'sticky-scroll' : ''">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-show="itemsCollection.length == 0 && emptyList == false">
                    <td colspan="5" rowspan="5">
                        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </td>
                </tr>
                <tr v-show="itemsCollection.length == 0 && emptyList == true">
                    <td colspan="5" rowspan="5">
                        You have no tasks yet... ⛳
                    </td>
                </tr>
                <tr v-for="(item, index) in itemsCollection" :key="index">
                    <td>{{ item.ID }}</td>
                    <td>{{ item.title }}</td>
                    <td>
                        <span class="badge rounded-pill" :class="'text-' + getPriority(item.priority).color"> {{ getPriority(item.priority).label }} </span>
                    </td>
                    <td>{{ convertDate(item.created_at) }}</td>
                    <td>
                        <button type="button" class="btn btn-dark shadow-none" data-bs-toggle="modal" data-bs-target="#DetailsModal" @click="forModal = item">
                            <i class="bi bi-eye"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import DetailsModal from "@/components/Modals/DetailsModal.vue"

export default {
    inject: ['db'],
    components: { DetailsModal },
    data() {
        return {
            sticky: false,
            itemsCollection: [],
            emptyList: false,
            forModal: {}
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
        getPriority(id) {
            if (id == 1) {
                return {
                    label: 'Not important',
                    color: 'bg-secondary'
                }
            }
            if (id == 2) {
                return {
                    label: 'Important',
                    color: 'bg-warning'
                }
            }
            if (id == 3) {
                return {
                    label: 'Urgent',
                    color: 'bg-danger'
                }
            }
        },
        convertDate(data) {
            const datetime = new Date(data);
            return datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString();
        },
        loadItems() {
            const userdata = JSON.parse(atob(sessionStorage.getItem(btoa('userdata'))))

            const tableItems = collection(this.db, "items");
            const dataItems = query(tableItems, where("fk_user", "==", userdata.id), orderBy('created_at', 'desc'));

            getDocs(dataItems).then(resp => {
                if (resp.docs.length == 0) {
                    this.emptyList = true
                    return
                }

                resp.forEach((doc) => {
                    this.itemsCollection.push(doc.data())
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mounted() {
        this.loadItems()
    }
}
</script>