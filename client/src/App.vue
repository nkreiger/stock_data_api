<template>
  <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Retrieve Data</h1>
                <div class="form-group">
                    <label>Ticker: </label>
                    <input type="text" class="form-control" v-model="ticker">
                </div>
                
                <button class="btn btn-primary" @click="getData">
                    Submit
                </button>
                <button class="btn btn-secondary" @click="saveData">
                  Save
                </button>
            </div>
        </div>
        <br>
        <!-- output data -->
        <div class="row">
          <div class="col-6">
            <ul class="list-group">
              <li class="list-group-item" v-for="(data, index) in outputData" :key="index">
                Date: {{ data.date }}
                <br>
                Close: {{ data.close }}
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      outputData: [],
      ticker: ""
    };
  },
  methods: {
    getData() {
      this.$http
        .get("https://api.iextrading.com/1.0/stock/" + this.ticker + "/chart")
        .then(response => {
          if (response) {
            this.outputData = response.body;
            this.outputData.forEach(el => {
              el.label = this.ticker;
            });
          }
        })
        .catch(err => {
          alert("Error, Invalid Ticker!" + " " + err);
        });
    },
    saveData() {
      this.$http.post("/api/stocks/data", this.outputData).then(response => {
        if (response) {
          alert("Data Successfully Added");
        }
      });
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btn.btn-secondary {
  margin-left: 20px;
}
</style>
