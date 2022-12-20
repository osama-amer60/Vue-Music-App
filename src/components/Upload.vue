<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{$t('manage.upload')}}</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{
          'bg-green-400 border-green-400 border-solid text-white ': is_dragover,
        }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>Drop your files here</h5>
      </div>

      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>

        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.currentProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, db } from "../includes/firbase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

// console.log(auth.currentUser)
export default {
  name: "upload",
  props: ["addSong"],
  data() {
    return {
      is_dragover: false,
      uploads: [],
      uploadFinish: false,
    };
  },
  methods: {
    upload($event) {
      // define array for manu progress bars
      const files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];
      this.is_dragover = false;

      //loop on the files array
      files.forEach((file) => {
        //reject any other type of files
        if (file.type !== "audio/mpeg") {
          return;
        }
        // cancel upload if user is offline
        if(!navigator.onLine){
          this.uploads.push({
            fileUploaded:{},
            currentProgress: 100,
            name: file.name,
            variant: "bg-red-400",
            icon: "fas fa-times",
            text_class: "text-red-400",
          })
          return
        }
        //crete path for  the file in the firbase storage
        const storageRef = ref(storage, `songs/${file.name}`);
        const fileUploaded = uploadBytes(storageRef, file);

        //push some style to the upload array to put style on progree bar depends on the state
        //put obj index in varabile
        const uploadIndex =
          this.uploads.push({
            fileUploaded,
            currentProgress: 0,
            name: file.name,
            variant: "bg-blue-400",
            icon: "fas fa-spinner fa-spin",
            text_class: "",
          }) - 1;

        //upload the file in firebase storage
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploads[uploadIndex].currentProgress = progress;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            this.uploads[uploadIndex].variant = "bg-red-400";
            this.uploads[uploadIndex].icon = "fas fa-times";
            this.uploads[uploadIndex].text_class = "text-red-400";
            console.log("Handle unsuccessful uploads", error);
          },
          async () => {
            //put song details in obj
            const song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: uploadTask.snapshot.ref.name,
              modified_name: uploadTask.snapshot.ref.name,
              genre: "",
              comment_count: 0,
            };
            song.url = await getDownloadURL(uploadTask.snapshot.ref);

            //add song data in firestore db
            const uploadedSong = await addDoc(collection(db, "songs"), song);
            console.log(uploadedSong.id)
            const docRef =  doc(db, "songs", uploadedSong.id);
            const docSnap = await getDoc(docRef);
            console.log("Document data:", docSnap.data());
            this.addSong(docSnap)
            // if (docSnap.exists()) {
            //   console.log("Document data:", docSnap.data());
            // } else {
            //   // doc.data() will be undefined in this case
            //   console.log("No such document!");
            // }

            //change progress bar style
            this.uploads[uploadIndex].icon = "fas fa-check";
            this.uploads[uploadIndex].text_class = "text-green-400";
            this.uploads[uploadIndex].variant = "bg-green-400";
          }
        );
      });
    },
  },
  // cancelUploding() {
  //       this.uploads.forEach((upload)=>{
  //         upload.uploadTask.cancel();
  //       })
  // },
  // beforeUnmount() {
  //     // this.uploads.forEach(()=>{
  //     //   uploadTask.cancel();
  //     // })
  //   },
};
</script>
