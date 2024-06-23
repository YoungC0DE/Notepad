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
    deleteDoc,
    addDoc
} from 'firebase/firestore'
import firebase from '@/config/services/firebase.js'
import { useAuthStore } from '@/stores/auth.js'

export const useDashboardStore = defineStore('dashboard', () => {
    const error = [];
    const list = [];
    const authStore = useAuthStore();

    const setData = (data) => {
        list.push(data)
    }

    const setError = (exception, customError = '') => {
        if (import.meta.env.VITE_APP_ENV === 'local') {
            console.error(exception)
        }

        error.push(customError)
    }

    const getAll = async () => {
        // clear previu errors and data
        error.splice(0, error.length)
        list.splice(0, list.length)

        try {
            // get user data
            await authStore.fetchUser()
            let userData = authStore.user.data;

            if (!userData) {
                return;
            }

            let itemsTable = collection(firebase, ITEMS_COLLECTION)
            let prepareQuery = query(
                itemsTable,
                where('userId', '==', userData.id),
                orderBy('createdAt', 'desc')
            )
            let request = await getDocs(prepareQuery)

            if (request.docs.length == 0) {
                return
            }

            request.forEach((doc) => {
                var info = doc.data()
                info.collection = doc.id

                setData(info)
            })
        } catch (exception) {
            setError(exception, 'Error to load data')
        }
    }

    const deleteItem = async (itemId) => {
        // clear previu errors
        error.splice(0, error.length)

        try {
            let userData = authStore.user.data;
            let tableItems = collection(firebase, ITEMS_COLLECTION);

            let prepareQuery = query(tableItems,
                where('ID', '==', itemId),
                where('userId', "==", userData.id),
            )

            let document = await getDocs(prepareQuery);

            await deleteDoc(document.docs[0].ref)
        } catch (exception) {
            setError(exception, 'Error to delete')
        }
    }

    const updateItem = async (data) => {
        // clear previu errors
        error.splice(0, error.length)

        try {
            let userData = authStore.user.data;
            let tableItems = collection(firebase, ITEMS_COLLECTION);

            let prepareQuery = query(tableItems,
                where('ID', '==', data.ID),
                where('userId', "==", userData.id),
            )

            let document = await getDocs(prepareQuery);

            let update = {
                description: data.description || '',
                title: data.title || ''
            }

            await updateDoc(document.docs[0].ref, update)
        } catch (exception) {
            setError(exception, 'Error to update')
        }
    }

    const addNewItem = async (data) => {
        // clear previu errors
        error.splice(0, error.length)

        try {
            let userData = authStore.user.data;
            let tableItems = collection(firebase, ITEMS_COLLECTION);

            let prepareQuery = query(tableItems, 
                where('userId', "==", userData.id), 
                orderBy("ID", "desc"), 
                limit(1)
            )

            // Recover the last ID used in collection 'items'
            let lastItem = await getDocs(prepareQuery);

            let lastID = 0
            if (!lastItem.empty) {
                lastID = lastItem.docs[0].data().ID
            }

            // Increment the last id and add a new user
            let newID = lastID + 1

            let newItem = {
                ID: newID,
                createdAt: Date(),
                title: data.title,
                description: data.description || '-',
                userId: userData.id,
            };

            await addDoc(tableItems, newItem);
        } catch (exception) {
            setError(exception, 'Error to create')
        }
    }

    return {
        error,
        list,
        getAll,
        deleteItem,
        updateItem,
        addNewItem
    }
})
