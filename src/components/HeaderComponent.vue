<template>
    <NewTaskModal />
    <header>
        <nav class="navbar bg-body-tertiary text-white">
            <input class="form-control shadow-none" type="search" placeholder="Search" v-model="search" aria-label="Search">
            <div class="d-flex flex-row gap-2">
                <button class="btn btn-search shadow-none" type="submit" @click="searchByName()"><i class="bi bi-search"></i></button>
                <button class="btn btn-add shadow-none" type="button" data-bs-toggle="modal" data-bs-target="#NewTaskModal"><i class="bi bi-plus-lg"></i></button>
            </div>
        </nav>
    </header>
</template>

<script>
import NewTaskModal from "@/components/Modals/NewTaskModal.vue"

export default {
    components: { NewTaskModal },
    data() {
        return {
            search: ''
        }
    },
}
</script>