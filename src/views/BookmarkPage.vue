<template>
  <div v-if="loading">
    <skelton-loading />
  </div>
  <div v-else class="bookmark-container">
    <div class="news-card-container">
      <news-card
        v-for="(article, index) in bookMarkedData"
        :key="index"
        :article="article"
        @removeBookmark="removeBookmark(index)"
      />
    </div>
  </div>
</template>

<script>
import NewsCard from "@/components/NewsCard.vue";
import SkeltonLoading from "@/components/SkeltonLoading.vue";

export default {
  components: { NewsCard, SkeltonLoading },
  data() {
    return {
      bookMarkedData: [],
      loading: false,
    };
  },
  async created() {
    const data = await JSON.parse(localStorage.getItem("myBookmark"));
    this.bookMarkedData = data;
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  },
  methods: {
    removeBookmark(index) {
      this.bookMarkedData.splice(index, 1);
      localStorage.setItem("myBookmark", JSON.stringify(this.bookMarkedData));
    },
  },
};
</script>

<style>
.bookmark-container {
  width: 90%;
  margin: auto;
}
.news-card-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

@media (max-width: 1200px) {
  .news-card-container {
    grid-template-columns: repeat(3, 1fr); /* 3 cards per row */
  }
}

@media (max-width: 900px) {
  .news-card-container {
    grid-template-columns: repeat(2, 1fr); /* 2 cards per row */
  }
}

@media (max-width: 600px) {
  .news-card-container {
    grid-template-columns: repeat(1, 1fr); /* 1 card per row */
  }
}
</style>
