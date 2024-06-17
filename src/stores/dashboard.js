import { defineStore } from 'pinia'
import { ITEMS_COLLECTION } from '@/config/constants.js'
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    updateDoc,
    addDoc
} from 'firebase/firestore'
import firebase from '@/config/services/firebase.js'
import { useAuthStore } from '@/stores/auth.js'

export const useDashboardStore = defineStore('dashboard', () => {
    const error = []
    const list = []
    const authStore = useAuthStore()

    const setData = (data) => {
        list.push(data)
    }

    const getAll = async (params = {}) => {
        // clear previu errors
        error.splice(0, error.length)

        try {
            // get user data
            await authStore.fetchUser()
            const userData = authStore.user.data;

            const itemsTable = collection(firebase, ITEMS_COLLECTION)
            const dataItems = query(
                itemsTable,
                where('fk_user', '==', userData.id),
                where('version', '==', 2),
                orderBy('created_at', 'desc')
            )

            const request = await getDocs(dataItems)

            if (request.docs.length == 0) {
                return
            }

            request.forEach((doc) => {
                var info = doc.data()
                info.collection = doc.id

                setData(info)
            })
        } catch (exception) {
            console.info(exception)
            error.push('Error to load data')
        }
    }

    const deleteItem = async (itemId) => {
        try {
            await deleteDoc(doc(firebase, "items", itemId))
        } catch (exception) {
            error.push('Error to load data')
        }
    }

    const updateItem = async (data) => {
        const userData = authStore.user.data;
        const tableItems = collection(firebase, "items");

        try {
            // Recover the last ID used in collection 'users'
            const currentItemId = await getDocs(query(tableItems, where('fk_user', "==", userData.id), orderBy("ID", "desc"), limit(1)));
            var update = {
                description: data.description || ''
            }
            await updateDoc(currentItemId.docs[0].ref, update)
        } catch (exception) {
            error.push('Error to load data')
        }
    }

    const addNewTask = async (data) => {
        const userData = authStore.user.data;
        const tableItems = collection(firebase, "items");

        try {
            // Recover the last ID used in collection 'users'
            const lastItem = await getDocs(query(tableItems, where('fk_user', "==", userData.id), orderBy("ID", "desc"), limit(1)));

            let lastID = 0
            if (!lastItem.empty) {
                lastID = lastItem.docs[0].data().ID
            }

            // Increment the last id and add a new user
            const newID = lastID + 1

            const newItem = {
                ID: newID,
                created_at: Date(),
                title: data.title,
                description: data.description || '-',
                version: 2,
                fk_user: userData.id,
            };

            await addDoc(tableItems, newItem);
        } catch (exception) {
            error.push('Error to load data')
        }
    }

    return {
        error,
        list,
        getAll,
        deleteItem,
        updateItem,
        addNewTask
    }
})
