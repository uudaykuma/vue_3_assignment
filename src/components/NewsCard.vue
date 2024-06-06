<template>
  <div class="news-card" v-if="article.title !== '[Removed]'">
    <div class="profile-pic">
      <img
        :src="
          article.urlToImage ||
          'https://miro.medium.com/v2/resize:fit:1400/1*MXyMqcEJ6Se0SCWcYCKZTQ.jpeg'
        "
        alt="News Picture"
      />
    </div>
    <div class="news-info">
      <h2 class="title" @click="goToDetailPage">
        {{ article.title || "N/A" }}
      </h2>
      <p class="description">{{ article.description || "N/A" }}</p>
      <p class="published-at">
        Published At:
        {{ new Date(article.publishedAt).toLocaleDateString() || "N/A" }}
      </p>
    </div>
    <div class="bookmark">
      <span
        :class="['bookmark-icon', { filled: isBookmarked }]"
        @click="handleBookmark"
        >&#9733;</span
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  article: {}
});

const isBookmarked = ref(false);
const router = useRouter();
const emit = defineEmits(['remove-bookmark']);

onMounted(() => {
  const bookmarks = JSON.parse(localStorage.getItem("myBookmark")) || [];
  isBookmarked.value = bookmarks.some((item) => item.title === props.article.title);
});

const handleBookmark = () => {
  let bookmarks = JSON.parse(localStorage.getItem("myBookmark")) || [];
  const index = bookmarks.findIndex((item) => item.title === props.article.title);

  if (index !== -1) {
    bookmarks.splice(index, 1);
    emit("remove-bookmark", index);
  } else {
    bookmarks.push(props.article);
  }

  localStorage.setItem("myBookmark", JSON.stringify(bookmarks));
  isBookmarked.value = bookmarks.some((item) => item.title === props.article.title);
};

const goToDetailPage = () => {
  localStorage.setItem("deatiledArticle", JSON.stringify(props.article));
  router.push({ name: "Detail", params: { title: props.article.title } });
};
</script>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
  height: 400px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.news-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
}

.profile-pic img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.news-card:hover .profile-pic img {
  transform: scale(1.05);
}

.news-info {
  text-align: center;
  margin-top: 15px;
  flex: 1;
  width: 100%;
}

.news-info .title {
  margin: 0;
  font-size: 1.2em;
  color: #333;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3em;
  cursor: pointer;
}

.title:hover {
  text-decoration: underline;
}

.news-info .description {
  font-style: italic;
  color: #666;
  margin-top: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 6em;
}

.published-at {
  margin-top: 10px;
  color: #999;
  font-size: 0.9em;
}

.bookmark {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.bookmark-icon {
  font-size: 1.5em;
  cursor: pointer;
  color: #ccc; /* Unfilled color */
  transition: color 0.3s ease;
}

.bookmark-icon.filled {
  color: #007bff;
}

@media (max-width: 768px) {
  .news-card {
    height: auto;
    padding: 10px;
  }

  .news-info .title {
    font-size: 1em;
  }

  .news-info .description {
    font-size: 0.9em;
  }

  .bookmark-icon {
    font-size: 1.2em;
  }
}

@media (max-width: 480px) {
  .news-card {
    padding: 5px;
  }

  .news-info .title {
    font-size: 0.8em;
  }

  .news-info .description {
    font-size: 0.8em;
  }

  .published-at {
    font-size: 0.8em;
  }

  .bookmark-icon {
    font-size: 1em;
  }
}
</style>
