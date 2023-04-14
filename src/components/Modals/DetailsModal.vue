<template>
    <div class="modal fade" id="DetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="DetailsModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Details <i class="bi bi-file-text-fill"></i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex flex-column align-items-start gap-3">
                    <div><b>Title:</b> {{ title }}</div>
                    <div><b>Date: </b> {{ date }}</div>
                    <div><b>Time: </b> {{ time }}</div>
                    <div><b>Description: </b> {{ description }}</div>
                    <div><b>Priority: </b> <span :class="'badge rounded-pill text-' + getPriority(priority).color">{{ getPriority(priority).label }}</span></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            title: '',
            date: '',
            time: '',
            description: '',
            priority: 1
        }
    },
    methods: {
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
        }
    },
}
</script>