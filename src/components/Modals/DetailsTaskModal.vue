<template>
    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Details <i class="bi bi-file-text-fill"></i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-column align-items-center gap-4">
                    <div class="d-flex flex-row w-100 gap-2">
                        <b>Title:</b> <span>{{ dataDetail.title || '-' }}</span>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <b>Description:</b>
                        <RichTextEditor v-model:content="dataDetail.description" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary d-flex flex-row align-items-center" style="padding: 5px 15px !important;" disabled v-if="awaitProcess">
                        <div class="spinner-border" style="width: 2rem; height: 2rem; border-width: 2px;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteItem()" v-show="!awaitProcess">Delete</button>
                    <button type="button" class="btn btn-warning" @click="updateItem()" v-show="!awaitProcess">Update</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-show="!awaitProcess">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import RichTextEditor from "@/components/RichTextEditor.vue"

export default {
    components: {
        RichTextEditor
    },
    data() {
        return {
            awaitProcess: false,
            dataDetail: {}
        }
    },
    methods: {
        convertDate(data) {
            const datetime = new Date(data);
            return datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString();
        },
        async updateItem() {
            this.update = true;
            this.awaitProcess = true;

            //
        },
        deleteItem() {
            this.awaitProcess = true
            //
        },
    },
    watch: {
        '$parent.forModal': {
            handler(newVal) {
                this.dataDetail = newVal;
            }
        }
    }
}
</script>
