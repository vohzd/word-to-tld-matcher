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
        <div v-show="!isInProgress">
          <input type="file" id="input" v-on:change="parseFile" ref="fileUploader" accept=".js,.json"/>
        </div>
      </section>

      <section class="output">
        <div v-show="isInProgress">
          Loading / Processing. Standby (arround 20secs)
        </div>
        <div v-show="processedResults.length">
          Success! Download file
        </div>
      </section>


    </section>
  </section>
</template>

<script>


(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)

import { mapGetters }               from "vuex";


export default {
  data(){
    return {
      rawBlob: null,
      parsedText: null,
      validJSON: null,
      isInProgress: false,
      processedResults: []
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
    resetAll(){
      this.isInProgress = false;
      this.rawBlob =  null;
      this.parsedText = null;
      this.validJSON = null;
    },
    uploadToServer(){
      this.isInProgress = true;
      this.$http.post("http://localhost:3000/parseFile", this.parsedText, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => {
        return res.json()
      }).then((json) => {
        this.processedResults = json;
        this.resetAll();

        console.save(json, "parsedWords.json");
      });
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
