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
                        <b>Date</b> <span>{{ values.date }}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <b>Time</b> <span>{{ values.time }}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <b>Description</b> <span>{{ values.description }}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <b>Priority</b>
                        <span :class="'badge rounded-pill text-' + getPriority(values.priority).color">{{ getPriority(values.priority).label }}</span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteItem()">Delete Item</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore";

export default {
    inject: ['db'],
    props: { values: Object },
    methods: {
        convertDate(data) {
            const datetime = new Date(data);
            return datetime.toLocaleDateString() + " " + datetime.toLocaleTimeString();
        },
        deleteItem() {
            deleteDoc(doc(this.db, "items", this.values.collection))
                .then(() => {
                    window.location.reload()
                    // this.$toast.success('Task deleted!', {
                    //     position: "top-right"
                    // })
                })
                .catch(() => {
                    this.$toast.success('Error to delete task.', {
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
}
</script>