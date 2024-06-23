<template>
    <div class="modal fade" id="newModal" tabindex="-1" aria-labelledby="newModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Note <i class="bi bi-clipboard-check-fill"></i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ref="closeModal"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title <span class="text-danger">*</span></label>
                        <Field class="form-control form-control-solid" type="text" name="title" placeholder="Note title" v-model="title" />
                        <div class="fv-plugins-message-container">
                            <div class="fv-help-block text-danger">
                                <ErrorMessage name="title" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="description" class="form-label">Description (optional)</label>
                        <RichTextEditor v-model:content="description" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" :disabled="awaitProccess">Close</button>
                    <button type="button" class="btn btn-secondary" disabled v-if="awaitProccess">
                        Loading...
                    </button>
                    <button type="button" class="btn btn-primary" @click="addNewItem" v-else>Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import RichTextEditor from "@/components/RichTextEditor.vue"
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useDashboardStore } from "@/stores/dashboard.js"
import ToastHelper from "@/config/ToastHelper.js";

export default {
    components: {
        ErrorMessage,
        RichTextEditor,
        Field,
        VForm
    },
    data() {
        return {
            title: '',
            description: '',
            awaitProccess: false,
        }
    },
    setup() {
        const store = useDashboardStore()

        return {
            store,
        }
    },
    methods: {
        async addNewItem() {
            this.awaitProccess = true;

            let data = {
                description: this.description,
                title: this.title
            }

            await this.store.addNewItem(data);

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
            this.title = '';
            this.description = '';

            // clear quill editor
            document.querySelector('.ql-editor').innerHTML = '';
        }
    }
}
</script>