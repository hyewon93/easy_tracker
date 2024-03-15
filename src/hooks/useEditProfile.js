import { useState } from "react";
import useShowToast from "./useShowToast";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestore, storage } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const showToast = useShowToast();

    const authUser = JSON.parse(localStorage.getItem("user-info"));
    
    const editProfile = async (inputs, selectedFile) => {

        if(isUpdating || !authUser) return;
        setIsUpdating(true);

        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDoc = doc(firestore, 'users', authUser.uid);

        let URL = "";
        try {
            if(selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `profilePics/${authUser.uid}`));
            }

            const updatedUser =  {
                ...authUser,
                fullName: inputs.fullName || authUser.fullName,
                profilePicURL: URL || authUser.profilePicURL
            }

            await updateDoc(userDoc, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));

            showToast("Success", "Profile updated successfully", "success");

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return { isUpdating, editProfile };
}

export default useEditProfile