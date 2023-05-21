<template>
    <div class="modal fade" id="DetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="DetailsModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Details <i class="bi bi-file-text-fill"></i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-column align-items-center gap-4">
                    <div class="d-flex flex-column">
                        <b>Title</b> <span>{{ values.title }}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <b>Priority</b>
                        <span :class="'badge rounded-pill text-' + getPriority(values.priority).color">{{ getPriority(values.priority).label }}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <b>Date</b> <span>{{ values.date }}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <b>Time</b> <span>{{ values.time }}</span>
                    </div>
                    <div class="d-flex flex-column w-100">
                        <b>Description</b>
                        <div id="editorjs_details-task" class="editorjs"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary d-flex flex-row align-items-center" style="padding: 5px 15px !important;" disabled v-if="await">
                        <div class="spinner-border" style="width: 2rem; height: 2rem; border-width: 2px;" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteItem()" v-show="!await">Delete</button>
                    <button type="button" class="btn btn-warning" @click="updateItem()" v-show="!await">Update</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" v-show="!await">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import CheckList from '@editorjs/checklist';
import Embed from '@editorjs/embed';
import { deleteDoc, collection, query, where, getDocs, addDoc, orderBy, limit, updateDoc } from "firebase/firestore";

export default {
    inject: ['db'],
    props: ['values'],
    data() {
        return {
            await: false,
            description: '',
            update: false
        }
    },
    methods: {
        convertDate(data) {
            const datetime = new Date(data);
            return datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString();
        },
        async updateItem() {
            this.update = true;
            this.await = true;

            const userData = JSON.parse(atob(window.localStorage.getItem(btoa('userdata'))))
            const tableItems = collection(this.db, "items");

            // Recover the last ID used in collection 'users'
            const currentItemId = await getDocs(query(tableItems, where('fk_user', "==", userData.id), orderBy("ID", "desc"), limit(1)));

            updateDoc(currentItemId.docs[0].ref, {
                description: this.description || '-'
            }).then(() => {
                window.location.reload()
            }).catch((err) => {
                this.$toast.error(`Error to create the task: ${err}`, {
                    position: "top-right"
                })
            });
        },
        deleteItem() {
            this.await = true
            deleteDoc(doc(this.db, "items", this.values.collection))
                .then(() => {
                    window.location.reload()
                })
                .catch(() => {
                    this.$toast.error('Error to delete task.', {
                        position: "top-right"
                    })
                })
        },
        getPriority(id) {
            if (!id) {
                return {
                    label: 'Not important',
                    color: 'bg-secondary'
                }
            }

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
        }
    },
    watch: {
        values: {
            handler(newVal, oldVal) {
                const desc = JSON.parse(JSON.stringify(newVal)).description

                const editor = new EditorJS({
                    holderId: 'editorjs_details-task',
                    data: desc,
                    tools: {
                        header: {
                            class: Header,
                            inlineToolbar: ['link', 'marker', 'bold', 'italic', 'image'],
                        },
                        image: SimpleImage,
                        quote: Quote,
                        raw: RawTool,
                        checklist: {
                            class: CheckList,
                            inlineToolbar: true,
                        },
                        list: {
                            class: List,
                            inlineToolbar: true
                        },
                        embed: {
                            class: Embed,
                            config: {
                                services: {
                                    youtube: true,
                                    coub: true
                                }
                            }
                        },
                        linkTool: {
                            class: LinkTool
                        }
                    },
                });

                this.editor = editor
            },
        },
        update: {
            async handler(newVal, oldVal) {
                this.description = await this.editor.save()
            }
        }

    }
}
</script>