<template>
  <Header />
  <RouterView></RouterView>
  <Player />
  <Auth />
</template>

<script>
import Header from "./components/Header.vue";
import Auth from "./components/Auth.vue";
import { mapWritableState } from "pinia";
import { useUserStore } from "./stores/user";
import { auth } from "./includes/firbase";
import Player from "./components/Player.vue";

export default {
  name: "App",
  components: {
    Header,
    Auth,
    Player,
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"]),
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true;
    }
  },
};
</script>
