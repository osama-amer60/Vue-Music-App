<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <UploadVue :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{$t('manage.songs')}}</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnSavedFlage="updateUnSavedFlage"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UploadVue from "@/components/Upload.vue";
import CompositionItem from "@/components/CompositionItem.vue";

import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../includes/firbase";

export default {
  components: {
    UploadVue,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
      unsaveFlage:false
    };
  },
  methods: {
    updateSong(i, values) {
      (this.songs[i].modified_name = values.modified_name),
        (this.songs[i].genre = values.genre);
    },
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(doc) {
      const song = {
        ...doc.data(),
        docId: doc.id,
      };
      this.songs.push(song);
      // console.log(this.songs);
    },
    updateUnSavedFlage(value){
      this.unsaveFlage=value
    }
  },
  async created() {
    const q = query(
      collection(db, "songs"),
      where("uid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.addSong(doc);
    });
  },
  beforeRouteLeave (to, from, next) {
    if(!this.unsaveFlage){
      next()
    }else{
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  }
};
</script>
