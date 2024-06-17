<template>
    <div class="dashboard-table-container">
        <NewTaskModal />
        <DetailTaskModal />
        <nav class="navbar">
            <input type="text" class="form-control input-search" placeholder="Search">
            <button type="button" class="btn btn-secondary" style="padding: 5px 15px !important;" disabled v-if="awaitRequest">
                <div class="spinner-border" style="width: 1rem; height: 1rem; border-width: 2px;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>
            <i class="bi bi-search btn btn-outline-primary shadow-none" @click="emitSearch" v-else></i>
            <i class="bi bi-plus-lg btn btn-outline-success shadow-none"  data-bs-toggle="modal" data-bs-target="#newModal"></i>
        </nav>
        <div class="table-list" v-on:scroll="onScroll">
            <table class="table text-white m-0">
                <thead>
                    <tr>
                        <th scope="col" :class="headerClass + ' ' + item.class" v-for="item in tableHeader" v-text="item.text">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="awaitRequest">
                        <td colspan="5" rowspan="5">
                            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="items.length === 0">
                        <td colspan="5" rowspan="5">
                            You have no tasks yet... ⛳
                        </td>
                    </tr>
                    <tr v-for="(item, index) in items" :key="index">
                        <td class="fw-bold">{{ index + 1 }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ convertDate(item.created_at) }}</td>
                        <td>
                            <i class="bi bi-eye btn btn-dark d-flex flex-column shadow-none" data-bs-toggle="modal" data-bs-target="#detailModal" @click="setModalData(item)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="js">
import { useDashboardStore } from "@/stores/dashboard.js"
import { convertDate } from '@/helpers/utils.js'
import NewTaskModal from "@/components/Modals/NewTaskModal.vue"
import DetailTaskModal from  "@/components/Modals/DetailsTaskModal.vue"

export default {
    components: { NewTaskModal, DetailTaskModal },
    data() {
        return {
            items: [],
            tableHeader: [
                { text: '#', class: 'fw-bold' },
                { text: 'Title', class: '' },
                { text: 'Created At', class: '' },
                { text: 'Action', class: '' },
            ],
            headerClass: '',
            itemsCollection: [],
            emptyList: false,
            forModal: {},
            awaitRequest: false,
        }
    },
    setup() {
        const store = useDashboardStore();

        return {
            store,
            convertDate
        }
    },
    methods: {
        onScroll(event) {
            if (event.target.scrollTop > 0) {
                this.headerClass = 'sticky-scroll';
                return
            }
            this.headerClass = '';
        },
        async getAll() {
            this.awaitRequest = true;
            await this.store.getAll();
            const { error, list } = this.store;

            this.awaitRequest = false;

            if (error.length > 0) {
                this.$toast.error(error[0], {
                    position: "top-right"
                });
                return;
            }

            this.items = list;
        },
        setModalData(data) {
            this.forModal = data;
        }
    },
    async mounted() {
        await this.getAll()
    }
}
</script>