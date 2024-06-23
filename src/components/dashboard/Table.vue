<template>
    <div class="dashboard-table-container">
        <createModal />
        <detailsModal />
        <nav class="navbar">
            <input type="text" class="form-control input-search" placeholder="Search" v-model="search" @keypress.enter="searchItem">
            <button type="button" class="btn btn-secondary" style="padding: 5px 15px !important;" disabled v-if="awaitRequest">
                <div class="spinner-border" style="width: 1rem; height: 1rem; border-width: 2px;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>
            <i class="bi bi-search btn btn-outline-primary shadow-none" @click="searchItem" v-else></i>
            <i class="bi bi-plus-lg btn btn-outline-success shadow-none" data-bs-toggle="modal" data-bs-target="#newModal"></i>
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
                            {{ oldItems.length > 0 
                                ? "No results found 🔍"
                                : "You don't have notes yet... ⛳"
                            }}
                        </td>
                    </tr>
                    <tr v-for="(item, index) in items" :key="index">
                        <td class="fw-bold">{{ index + 1 }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ convertDate(item.createdAt) }}</td>
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
import createModal from "@/components/Modals/createModal.vue"
import detailsModal from  "@/components/Modals/detailsModal.vue"
import ToastHelper from "@/config/ToastHelper.js"

export default {
    components: { createModal, detailsModal },
    data() {
        return {
            items: [],
            oldItems: [],
            tableHeader: [
                { text: '#', class: 'fw-bold' },
                { text: 'Title', class: '' },
                { text: 'Created At', class: '' },
                { text: 'Action', class: '' },
            ],
            headerClass: '',
            forModal: {},
            awaitRequest: false,
            search: ''
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
            let { error, list } = this.store;

            this.awaitRequest = false;
            if (error.length > 0) {
                ToastHelper.error(error[0]);
                return;
            }

            this.items = list;
            this.oldItems = list;
        },
        setModalData(data) {
            this.forModal = data;
        },
        searchItem() {
            if (this.search == '') {
                this.items = this.oldItems;
                return;
            }

            let search = this.search.toLowerCase();
            this.items = this.oldItems.filter(
                ({ title }) => title.toLowerCase().includes(search)
            )
        }
    },
    async mounted() {
        await this.getAll()

        this.oldItems = this.items;
    },
    watch: {
        'search': {
            handler(newVal) {
                this.searchItem();
            }
        }
    }
}
</script>