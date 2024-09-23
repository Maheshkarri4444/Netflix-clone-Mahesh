import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, getFirestore, collection } from "firebase/firestore/lite";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCVaftSkZB3fDA6UYzaxGvGgX3kSQuU4jU",
  authDomain: "netflix-clone-f3fa6.firebaseapp.com",
  projectId: "netflix-clone-f3fa6",
  storageBucket: "netflix-clone-f3fa6.appspot.com",
  messagingSenderId: "252401851730",
  appId: "1:252401851730:web:194377f02beb6c64726e8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email , password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email , password);
        const user =res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error)
    {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async()=>{
    await signOut(auth);
}

export {auth , db, login ,signup ,logout};