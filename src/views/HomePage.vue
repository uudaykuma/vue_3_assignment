<template>
  <div>
    <filter-component @getValue="getFilterValue" />
    <div v-if="loading">
      <skelton-loading />
    </div>
    <div v-else-if="apiData && apiData.length">
      <div>
        Test
      </div>
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
        <div>
          No articles available. Please adjust your filters or try again later.
        </div>
        <button @click="tryAgain">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import FilterComponent from '@/components/FilterComponent.vue';
import NewsCard from '@/components/NewsCard.vue';
import SkeltonLoading from '@/components/SkeltonLoading.vue';

const store = useStore();

const payload = ref({});
const loading = ref(false);

const apiData = computed(() => store.state.apiData);
const getPageCount = computed(() => store.getters.getPageCount);

const fetchData = async (payload) => {
  loading.value = true;
  try {
    await store.dispatch('fetchApiData', payload);
  } catch (error) {
    // Handle error if needed
  } finally {
    loading.value = false;
  }
};

const getFilterValue = (value) => {
  payload.value = value;
  fetchData(value);
};

const tryAgain = () => {
  window.location.reload();
};

const scroll = () => {
  window.onscroll = async () => {
    let bottomOfWindow =
      Math.ceil(document.documentElement.scrollTop + window.innerHeight) >=
      document.documentElement.offsetHeight;
    if (bottomOfWindow) {
      const currentpage = getPageCount.value + 21;
      await store.dispatch('updatePageSize', currentpage);
      await store.dispatch('fetchApiData', payload.value);
    }
  };
};

onBeforeMount(() => {
  fetchData(payload.value);
});

onMounted(() => {
  scroll();
});
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
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .news-card-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .news-card-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
