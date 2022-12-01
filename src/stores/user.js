import { doc, setDoc } from "@firebase/firestore";
import { defineStore } from "pinia";
import {
  auth,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  db,
  signInWithEmailAndPassword
} from "../includes/firbase";

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async register(value) {
      //create user
      const userCreated = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );

      //add user data in db
      await setDoc(doc(db, "users", userCreated.user.uid), {
        name: value.name,
        email: value.email,
        password: value.password,
        age: value.age,
        typeOfUser: value.typeOfUser,
        country: value.country,
      });

      //   await userCreated.user.updateProfile({
      //     displayName:value.name
      //   })

      //track state of user
      this.$state.userLoggedIn = true;
      console.log(this.$state.userLoggedIn);
    },

    async authenticate(value) {
      await signInWithEmailAndPassword(auth,value.email, value.password);
      this.$state.userLoggedIn = true;
    },
  },
});
