<template>
    <div class="modal fade" id="NewTaskModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="NewTaskModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">New Task <i class="bi bi-clipboard-check-fill"></i></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" v-model="title" placeholder="name@example.com">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Date</span>
                        <input type="date" class="form-control" v-model="date">
                        <span class="input-group-text">Time</span>
                        <input type="time" class="form-control" v-model="time">
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Description</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
                    </div>
                    <div class="col">
                        <p style="margin-bottom: 0.5rem !important;">Priority</p>
                        <div class="input-group mb-3">
                            <select id="priority" class="form-select" aria-label="Default select example" v-model="priority">
                                <option value="" selected disabled hidden>Select the Priority</option>
                                <option value="1"> Not important </option>
                                <option value="2"> Important </option>
                                <option value="3"> Urgent </option>
                            </select>
                            <span class="input-group-text bg-danger" id="basic-addon1"><i class="bi bi-brightness-alt-high-fill text-white"></i></span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="addNewTask()">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { collection, query, where, getDocs, addDoc, orderBy, limit } from "firebase/firestore";

export default {
    inject: ['db'],
    data() {
        return {
            title: '',
            date: '',
            time: '',
            description: '',
            priority: ''
        }
    },
    methods: {
        async addNewTask() {
            const userData = JSON.parse(atob(sessionStorage.getItem(btoa('userdata'))))
            const tableItems = collection(this.db, "items");

            // Recover the last ID used in collection 'users'
            const lastItem = await getDocs(query(tableItems, where('fk_user', "=", userData.id), orderBy("ID", "desc"), limit(1)));

            let lastID = 0
            if (!lastItem.empty) {
                lastID = lastItem.docs[0].data().ID
            }

            // Increment the last id and add a new user
            const newID = lastID + 1

            const newItem = {
                ID: newID,
                created_at: Date(),
                date: this.date,
                time: this.time,
                title: this.title,
                description: this.description,
                fk_user: userData.id,
                priority: this.priority,
            };
            await addDoc(tableItems, newItem);

            this.title = '',
            this.date = '',
            this.time = '',
            this.description = '',
            this.priority = ''

            this.$toast.success('Task registered successfully!', {
                position: "top-right"
            })
        }
    }
}
</script>