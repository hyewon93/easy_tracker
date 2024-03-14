import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import { Flex, Image, Text } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";

const GoogleAuth = ({ prefix }) => {

    const [signInWithGoogle, , , error] = useSignInWithGoogle(auth);
    const showToast = useShowToast();

    const handleGoogleAuth = async () => {
        try {
            const newUser = await signInWithGoogle();
            
            if(!newUser && error) {
                showToast("Error", error.message, "error");
                return;
            }

            const useRef = doc(firestore, "users", newUser.user.uid);
            const userSnap = await getDoc(useRef);

            if(userSnap.exists()) {
                // Login

                const userDoc = userSnap.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
            } else {
                // Signup

                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    fullName: newUser.user.displayName,
                    profilePicURL: newUser.user.photoURL,
                    createdAt: Date.now()
                };

                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
            }

        } catch (error) {
            showToast("Error", error.message, "error");
        }
    }

    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            onClick={handleGoogleAuth}
        >
            <Image src="/google.png" w={5} alt="Google logo" />
            <Text mx={2} color={"blue.500"}>
                {prefix} with Google
            </Text>
        </Flex>
    )
}

export default GoogleAuth