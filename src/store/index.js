import { createStore } from "vuex";

const store = createStore({
  state: {
    bookmarks: [],
    apiData: null,
    pageSize: 21,
    searchQuery: "",
    searchCountry: "",
    searchCategory: "",
    resultCount: null,
    prodcuts: null,
  },
  mutations: {
    setBookmarks(state, bookmarks) {
      state.bookmarks = bookmarks;
    },
    setApiData(state, data) {
      state.apiData = data;
    },
    setProducts(state, payload) {
      state.prodcuts = payload;
    },
    setPageSize(state, payload) {
      state.pageSize = payload;
    },
  },
  actions: {
    async updatePageSize({ commit }, payload) {
      commit("setPageSize", payload);
    },
    async fetchApiData({ state, commit }, payload) {
      const myKey = process.env.VUE_APP_API_KEYS;
      const baseUrl = "https://newsapi.org/v2";
      const defaultEndpoint = `${baseUrl}/everything?q=all&pageSize=${state.pageSize}&apiKey=${myKey}`;
    
      const buildUrl = (params) => {
        let endpoint = `${baseUrl}/top-headlines?`;
        endpoint += params.searchedValue ? `q=${params.searchedValue}&` : '';
        endpoint += params.selectedCategory ? `category=${params.selectedCategory}&` : '';
        endpoint += params.selectedCountry ? `country=${params.selectedCountry}&` : '';
        endpoint += `pageSize=${state.pageSize}&apiKey=${myKey}`;
        return endpoint;
      };
    
      const fetchAndCommit = async (url) => {
        const res = await fetch(url).then((res) => res.json());
        commit("setApiData", res.articles);
      };
    
      if (!payload) {
        await fetchAndCommit(defaultEndpoint);
      } else {
        const { searchedValue, selectedCategory, selectedCountry } = payload;
    
        if (searchedValue || selectedCategory || selectedCountry) {
          const url = buildUrl({ searchedValue, selectedCategory, selectedCountry });
          await fetchAndCommit(url);
        } else {
          await fetchAndCommit(defaultEndpoint);
        }
      }
    }    
  },
});

export default store;
