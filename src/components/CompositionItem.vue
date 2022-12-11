<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-if="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"

      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-if="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="edit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnSavedFlage(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnSavedFlage(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="is_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="is_submission"
          @click.prevent="showForm = !showForm"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>
<script>
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../includes/firbase";
import { ref, deleteObject } from "firebase/storage";

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong:{
        type:Function,
        required:true
    },
    index:{
        type:Number,
        required:true
    },
    removeSong:{
        type:Function,
        required:true
    },
    updateUnSavedFlage:{
        type:Function
    }

  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: "required",
        genre: "alpha_spaces",
      },
      is_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-400",
      alert_message: "please wait ! updating song info.",
    };
  },
  methods: {
    async edit(values) {
      (this.is_submission = true),
        (this.show_alert = true),
        (this.alert_variant = "bg-blue-400"),
        (this.alert_message = "please wait ! updating song info.");

      const docRef = doc(db, "songs", values.docId);
      try {
        await setDoc(docRef, values);
        this.updateSong(this.index,values)
        // console.log(this.index)
      } catch (error) {
        console.log(error)
          (this.is_submission = false),
          (this.alert_variant = "bg-red-400"),
          (this.alert_message = "somthing went wrong! Try later.");
        return;
      }

      
      
      (this.is_submission = false),
      (this.alert_variant = "bg-green-400"),
      (this.alert_message = "success");
      this.updateUnSavedFlage(false)
    },
    async deleteSong() {
        
        try{
            // delete song from db(firestore)
            await deleteDoc(doc(db, "songs", this.song.docId));
            
            // ref for song in storage
              const songRef = ref(storage, `songs/${this.song.original_name}`);
          //delete song from storage
          await deleteObject(songRef)
          //render the songs
          this.removeSong(this.index)
        }catch(error){
          console.log(error)
        }


    },
  },
};
</script>
