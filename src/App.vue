<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-left">
        <router-link to="/"
          ><img src="@/assets/logo.png" alt="Logo" class="logo"
        /></router-link>
      </div>
      <div class="navbar-right">
        <router-link to="/">Home</router-link>
        <router-link to="/bookmarks">Bookmark</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  width: auto;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.navbar-right a {
  margin-left: 1em;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}

.navbar-right a:hover {
  text-decoration: underline;
}
</style>
