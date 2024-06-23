<template>
    <div class="modal fade" id="newModal" tabindex="-1" aria-labelledby="newModal" aria-hidden="true">
        <div class="modal-dialog">
            <VForm class="modal-content" id="kt_modal_create_form" @submit="addNewItem" :validation-schema="NOTE_UPDATE_CREATE">
                <div class="modal-header">
                    <h5 class="modal-title">New Note <i class="bi bi-clipboard-check-fill"></i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModal"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                        <Field class="form-control form-control-solid" type="text" name="title" placeholder="Note title" ref="titleInput" />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                                <ErrorMessage name="title" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description <span class="text-danger">*</span></label>
                        <RichTextEditor v-model:content="description" />
                        <Field class="form-control form-control-solid" type="text" name="description" v-model="description" v-show="false"/>
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                                <ErrorMessage name="description" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="awaitProccess">Close</button>
                    <button type="button" class="btn btn-secondary" disabled v-if="awaitProccess">
                        Loading...
                    </button>
                    <button type="submit" class="btn btn-primary" v-else>Save changes</button>
                </div>
            </VForm>
        </div>
    </div>
</template>

<script lang="js">
import RichTextEditor from "@/components/RichTextEditor.vue"
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useDashboardStore } from "@/stores/dashboard.js"
import ToastHelper from "@/config/ToastHelper.js";
import { NOTE_UPDATE_CREATE } from "@/helpers/schemas.js"

export default {
    components: {
        ErrorMessage,
        RichTextEditor,
        Field,
        VForm
    },
    data() {
        return {
            description: '',
            awaitProccess: false,
        }
    },
    setup() {
        const store = useDashboardStore()

        return {
            store,
            NOTE_UPDATE_CREATE
        }
    },
    methods: {
        async addNewItem(values) {
            this.awaitProccess = true;

            await this.store.addNewItem(values);

            this.clearForm();

            this.awaitProccess = false;
            if (this.store.error.length > 0) {
                ToastHelper.error(this.store.error[0])
                return;
            }

            ToastHelper.success('Added with sucessful');

            this.$refs['closeModal'].click();
            this.$parent.getAll();
        },
        setEditorRef(emit) {
            this.qlEditorRef = emit
        },
        clearForm() {
            this.description = '';
            this.$refs['titleInput'].value = '';

            // clear quill editor
            document.querySelector('.ql-editor').innerHTML = '';
        }
    }
}
</script>