<template>
    <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModal" aria-hidden="true">
        <div class="modal-dialog">
            <VForm class="modal-content" id="kt_modal_create_form" @submit="updateItem" :validation-schema="NOTE_UPDATE_CREATE">
                <div class="modal-header">
                    <h5 class="modal-title">Details <i class="bi bi-file-text-fill"></i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title</label>
                        <Field class="form-control form-control-solid" type="text" name="title" placeholder="Note title" v-model="dataDetail.title"/>
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                                <ErrorMessage name="title" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <b>Description</b>
                        <RichTextEditor v-model:content="dataDetail.description" />
                        <Field class="form-control form-control-solid" type="text" name="description" v-model="dataDetail.description" v-show="false"/>
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                                <ErrorMessage name="description" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary d-flex flex-row align-items-center" style="padding: 5px 15px !important;" disabled v-if="awaitProcess">
                        <div class="spinner-border" style="width: 2rem; height: 2rem; border-width: 2px;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteItem" v-show="!awaitProcess">Delete</button>
                    <button type="submit" class="btn btn-warning" @click="updateItem" v-show="!awaitProcess">Update</button>
                    <button type="button" class="btn btn-primary" ref="closeModal" data-bs-dismiss="modal" v-show="!awaitProcess">Close</button>
                </div>
            </VForm>
        </div>
    </div>
</template>

<script lang="js">
import RichTextEditor from "@/components/RichTextEditor.vue"
import { useDashboardStore } from "@/stores/dashboard.js"
import ToastHelper from "@/config/ToastHelper.js"
import { NOTE_UPDATE_CREATE } from "@/helpers/schemas.js"
import { ErrorMessage, Field, Form as VForm } from "vee-validate";

export default {
    components: {
        RichTextEditor,
        ErrorMessage,
        Field,
        VForm
    },
    data() {
        return {
            awaitProcess: false,
            dataDetail: {}
        }
    },
    setup() {
        const store = useDashboardStore();

        return {
            store,
            NOTE_UPDATE_CREATE
        }
    },
    methods: {
        async updateItem(values) {
            this.update = true;
            this.awaitProcess = true;

            values.ID = this.dataDetail.ID;

            await this.store.updateItem(values);

            this.awaitProcess = false;
            if (this.store.error.length > 0) {
                ToastHelper.error(this.store.error[0])
                return;
            }

            this.$refs['closeModal'].click();
            this.$parent.getAll();
        },
        async deleteItem() {
            this.update = true;
            this.awaitProcess = true;

            await this.store.deleteItem(this.dataDetail.ID);

            this.awaitProcess = false;
            if (this.store.error.length > 0) {
                ToastHelper.error(this.store.error[0])
                return;
            }

            this.$refs['closeModal'].click();
            this.$parent.getAll();
        },
    },
    watch: {
        '$parent.forModal': {
            handler(value) {
                this.dataDetail = value;
            }
        },
        'dataDetail.description': {
            handler(value) {
                if (value == '<p><br></p>') {
                    this.dataDetail.description = ''
                }
            }
        }
    }
}
</script>
