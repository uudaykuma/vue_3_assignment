<template>
  <div>
    <filter-component @getValue="getFilterValue" />
    <div v-if="loading">
      <skelton-loading />
    </div>
    <div v-else-if="apiData && apiData.length">
      <div class="home-container">
        <div class="news-card-container">
          <news-card
            v-for="(article, index) in apiData"
            :key="index"
            :article="article"
          />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="empty-state">
        <div>No articles available. Please adjust your filters or try again later.</div>
        <button @click="tryAgain">Try Again</button>
      </div>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";
import FilterComponent from "@/components/FilterComponent.vue";
import NewsCard from "@/components/NewsCard.vue";
import SkeltonLoading from '@/components/SkeltonLoading.vue';

export default {
  components: {
    FilterComponent,
    NewsCard,
    SkeltonLoading,
  },
  data() {
    return {
      payload: {},
      loading: false,
    };
  },
  computed: {
    ...mapState({
      apiData: state => state.apiData, 
      pageCount: state => state.pageSize
    }),
  },
  beforeMount() {
    this.fetchData(this.payload);
  },
  mounted() {
    this.scroll();
  },
  methods: {
    getFilterValue(value) {
      this.payload = value;
      this.fetchData(value);
    },
    fetchData(payload) {
      this.loading = true;
      this.$store
        .dispatch("fetchApiData", payload)
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          const currentpage = this.pageCount + 21
          this.$store.dispatch('updatePageSize', currentpage)
          this.fetchData(this.payload);
        }
      };
    },
    tryAgain () {
      window.location.reload()
    }
  },
};
</script>

<style scoped>
.home-container {
  width: 90%;
  margin: auto;
}

.news-card-container {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
  font-size: 18px;
  color: #777;
  gap: 20px;
}
.empty-state button {
  padding: 10px 20px;
  border: none;
  background-color: #bc3e3e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
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
