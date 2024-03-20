import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';
import useUpdateCategories from './useUpdateCategories';
import useAuthStore from '../store/authStore';

const useSignupWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const {updateCategories} = useUpdateCategories();
    const showToast = useShowToast();
    const loginUser = useAuthStore(state => state.login);

    const signup = async (inputs) => {

        if(!inputs.email || !inputs.password || !inputs.fullName) {
            showToast("Error", "Please Fill all the fields", "error");
            return;
        }

        const userRef = collection(firestore, "users");
        const q = query(userRef, where("email", "==", inputs.email));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {
            showToast("Error", "Email already exists", "error");
            return;
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

            if(!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            if(newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: inputs.email,
                    fullName: inputs.fullName,
                    profilePicURL: "",
                    createdAt: Date.now()
                };

                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);

                // Create Category
                await updateCategories(newUser.user.uid);
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return {loading, error, signup}
}

export default useSignupWithEmailAndPassword