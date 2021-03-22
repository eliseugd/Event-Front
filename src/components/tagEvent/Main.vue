<template>
  <div>
    <div class="div-img">
      <img src="@/assets/img/event.jpg" alt="" />
    </div>
    <div class="tag-evento">
      <div>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <span>{{ date }}</span>
      </div>
      <!-- <div class="div-btn-event" v-if="textBtn != ''">
        <button class="btn btn-event">{{ textBtn }}</button>
      </div> -->
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
  },
};
</script>
<style scoped>
.div-img {
  height: 130px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tag-evento {
  /* border: 2px solid #8129ff; */
  color: #777;
  border-top: none;
  border-radius: 0px 0px 5px 5px;
  padding: 10px;
  text-align: left;
}
.tag-evento h3 {
  color: #444;
  font-size: 16px;
  font-weight: 700;
}

.tag-evento p {
  font-size: 12px;
  margin-bottom: 0;
}

.tag-evento span {
  font-size: 10px;
  color: red;
}

.div-btn-event {
  text-align: right;
}

.btn-event {
  padding: 5px 10px;
  color: #777;
  background-color: #ddd;
  text-decoration: none;
  letter-spacing: 2px;
  font-size: 12px;
  transition: 0.5s;
  margin-top: 10px;
}

.btn-event:hover {
  font-weight: 500;
  color: #fff;
  background-color: #8129ff;
}
</style>