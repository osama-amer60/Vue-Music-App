import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import visualizer from "rollup-plugin-visualizer";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //VitePWA method generate manifest file and create a service worker 
    VitePWA({
      //registerType command let browser save changes automatcly, there is no need to download all files again
      registerType:'autoUpdate',
      devOptions:{
        //config setting for developing server, because manifest file by defult work only in production
        enabled:true
      },
      manifest:{
        name:"Music App",
        theme_color:"#ff5e3a",
        icons:[
          {
            src:"assets/img/pwa-192x192.png",
            sizes:"192x192",
            type:"image/png"
          }
        ]
      },
      workbox:{
        globPatterns:["**/*.{js,css,html,png,jpg,}"]
      }

    }),
    visualizer({open:true})
  
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
