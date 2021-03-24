<template>
  <div class="div-tag-event col-6 col-sm-6 col-md-4 col-lg-3">
    <div
      class="tag-evento"
      :class="{ 'click-card': clickCardActive }"
      @click="clickCard()"
    >
      <div>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <span>{{ date }}</span>
      </div>
    </div>
    <div class="div-btn-event" v-if="textBtn != ''">
      <button class="btn btn-event" @click="clickButton()">
        {{ textBtn }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title Event",
    },
    description: {
      type: String,
      default: "Description Event",
    },
    date: {
      type: String,
      default: "00/00/0000 00:00",
    },
    textBtn: {
      type: String,
      default: "",
    },
    clickCardActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickButton() {
      this.$emit("clickButton");
    },
    clickCard() {
      this.$emit("clickCard");
    },
  },
};
</script>
<style scoped>
.div-tag-event {
  margin-bottom: 20px;
}
.tag-evento {
  /* border: 2px solid #8129ff; */
  height: 130px;
  overflow: hidden;
  border-radius: 10px;
  color: #333;
  border-top: none;
  border-radius: 5px;
  padding: 10px;
  text-align: left;
  background: #d9ccff;
  box-shadow: 0px 4px 5px #eee;
}
.tag-evento h3 {
  color: #444;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
}

.tag-evento p {
  font-size: 12px;
  margin-bottom: 0;
}

.tag-evento span {
  font-size: 10px;
  color: red;
}

.click-card {
  cursor: pointer;
}

.div-btn-event {
  text-align: right;
}

.btn-event {
  padding: 5px 10px;
  color: #777;
  background-color: #eee;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 12px;
  transition: 0.5s;
  margin-top: 5px;
}

.btn-event:hover {
  font-weight: 500;
  color: #fff;
  background-color: #8129ff;
}
</style>