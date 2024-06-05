<template>
  <div class="home-container">
    <div class="news-card-container">
      <div v-for="index in 21" :key="index" class="skeleton-card"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
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

.skeleton-card {
  width: 100%;
  height: 200px;
  background: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 20%, #f0f0f0 40%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 10px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>