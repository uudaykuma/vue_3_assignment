<template>
  <div class="filter-container">
    <div class="filter-dropdown">
      <select v-model="selectedCategory" @change="filterCategoryOption">
        <option value="">Select a category</option>
        <option v-for="option in categoryOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="filter-dropdown">
      <select v-model="selectedCountry" @change="filterCountryOption">
        <option value="">Select Country</option>
        <option
          v-for="(option, key) in countryOptions"
          :key="option"
          :value="key"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div class="filter-input">
      <input type="text" v-model="searchedValue" placeholder="Search news" />
      <button @click="handleSearchNews">Search</button>
    </div>
  </div>
</template>

<script setup>
import { categories } from "@/constants/categories";
import { countries } from "@/constants/counteries";
import { ref, defineEmits } from "vue";

const countryOptions = ref(countries);
const categoryOptions = ref(categories);
const searchedValue = ref("");
const selectedCategory = ref("");
const selectedCountry = ref("");

const emit = defineEmits(['getValue'])

const handleSearchNews = () => {
  emit('getValue', {
    selectedCategory: selectedCategory.value,
    selectedCountry: selectedCountry.value,
    searchedValue: searchedValue.value,
  });
};

const filterCategoryOption = () => {
  emit("getValue", {
    selectedCategory: selectedCategory.value,
    selectedCountry: selectedCountry.value,
    searchedValue: searchedValue.value,
  });
};
const filterCountryOption = () => {
  emit("getValue", {
    selectedCategory: selectedCategory.value,
    selectedCountry: selectedCountry.value,
    searchedValue: searchedValue.value,
  });
};
</script>

<style scoped>
.filter-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-top: 2px;
}

.filter-input,
.filter-dropdown {
  min-width: 300px;
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="text"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-input,
  .filter-dropdown {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .filter-container {
    padding: 10px;
  }

  input[type="text"],
  select,
  button {
    font-size: 14px;
    padding: 8px;
  }

  button {
    padding: 8px 16px;
  }
}
</style>
