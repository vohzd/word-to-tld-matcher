<template lang="html">
  <section class="float">
    <section class="main-content-port">


      <section class="intro-text">
        <h2>Word to TLD parser</h2>
        <p>
          Add a csv or json file of words below...
        </p>
      </section>


      <section class="file-upload">
        <input type="file" id="input" v-on:change="parseFile" ref="fileUploader" accept=".js,.json"/>
      </section>


    </section>
  </section>
</template>

<script>

import { mapGetters }               from "vuex";


export default {
  data(){
    return {
      rawBlob: null,
      parsedText: null,
      validJSON: null
    }
  },
  methods: {
    createValidJson(){
      this.validJSON = JSON.stringify(this.parsedText);
    },
    parseFile(){
      this.rawBlob = this.$refs.fileUploader.files[0];
      if (this.rawBlob){
        let fileReader = new FileReader();
        fileReader.addEventListener("loadend", () => {
          // todo... large file loading
          this.parsedText = fileReader.result;
        });
        fileReader.readAsText(this.rawBlob);
      }
    },
    uploadToServer(){
      this.$http.post("http://localhost:3000/parseFile", this.parsedText, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        return res.json()
      }).then((json) => {
        console.log(json);
      })
    }
  },
  watch: {
    parsedText(){
      this.createValidJson();
    },
    validJSON(){
      this.uploadToServer();
    }
  }
}
</script>

<style lang="css">


</style>
