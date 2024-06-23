import { defineStore } from 'pinia'
import { USER_COLLECTION } from '@/config/constants.js'
import { passwordEncrypt } from '@/helpers/crypt.js'
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
import { getToken, createToken } from '@/config/services/token.js'
import router, { ROUTE_SIGNIN } from '@/router/index.js'

export const useAuthStore = defineStore('auth', () => {
    const error = []
    const user = {}

    const setUserData = (data) => {
        user.data = data
    }

    const setError = (exception, customError = '') => {
        if (import.meta.env.VITE_APP_ENV === 'local') {
            console.error(exception)
        }

        error.push(customError)
    }

    const signIn = async (credentials) => {
        // clear previu errors
        error.splice(0, error.length)

        try {
            // get the collection instance
            const users = collection(firebase, USER_COLLECTION)

            // define query to be executed
            const dataUsers = query(
                users,
                where('email', '==', credentials.email.toLowerCase()),
                where('password', '==', passwordEncrypt(credentials.password))
            )

            // execute query and get user data (docs) buf if not found, empty returns true
            const { empty, docs } = await getDocs(dataUsers)

            if (empty) {
                error.push('Invalid credentials to login')
                return
            }

            // prepare user information, and create a session token
            const doc = docs[0].data()
            doc.password = '';
            const updateToken = {
                token: createToken()
            }

            // insert session token in user collection
            await updateDoc(docs[0].ref, updateToken)

            // put user data in store
            setUserData({
                name: doc.name,
                email: doc.email.toLowerCase(),
                id: doc.ID
            })
        } catch (exception) {
            setError(exception, 'Error in sign in');
        }
    }

    const signUp = async (credentials) => {
        // clear previu errors
        error.splice(0, error.length)

        try {
            // get the collection instance
            const users = collection(firebase, USER_COLLECTION)

            // check if this user already exists
            const dataUsers = query(users, where('email', '==', credentials.email.toLowerCase()))
            const { empty } = await getDocs(dataUsers)

            if (!empty) {
                error.push('This e-mail already is used')
                return
            }

            // Recover the last ID used in collection 'users' to put the new user in order
            const lastUser = await getDocs(query(users, orderBy('ID', 'desc'), limit(1)))
            let lastID = 0
            if (!lastUser.empty) {
                const lastData = lastUser.docs[0].data()
                lastID = lastData.ID
            }

            // Increment the last id and add a new user
            const newID = lastID + 1
            const newUser = {
                name: credentials.name,
                email: credentials.email.toLowerCase(),
                password: passwordEncrypt(credentials.password),
                token: createToken(),
                ID: newID
            }

            // create the new user
            await addDoc(users, newUser)

            // put user data in store
            setUserData({
                name: credentials.name,
                email: credentials.email.toLowerCase(),
                id: newID
            })
        } catch (exception) {
            setError(exception, 'Error in sign in');
        }
    }

    const fetchUser = async () => {
        // clear previu errors
        error.splice(0, error.length)

        if (!getToken()) {
            return;
        }

        try {
            // get the collection instance
            const users = collection(firebase, USER_COLLECTION)

            // check if this user already exists
            const dataUsers = query(users, where('token', '==', getToken()))
            const { docs } = await getDocs(dataUsers)

            if (docs.length == 0) {
                purgeAuth();
                return;
            }

            const doc = docs[0].data()
            doc.password = '';

            // put user data in store
            setUserData({
                name: doc.name,
                email: doc.email.toLowerCase(),
                id: doc.ID
            })
        } catch (exception) {
            setError(exception, 'Não foi possível carregar os dados do usuário');
        }
    }

    const purgeAuth = () => {
        localStorage.clear();
        sessionStorage.clear();

        router.push({name: ROUTE_SIGNIN});
    }

    return {
        error,
        user,
        signIn,
        signUp,
        fetchUser
    }
})
