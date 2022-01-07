<template>
  <div id="nav">
    <router-link to="/">Farms Data Table</router-link> <span>| </span>
    <router-link to="/farm">Farm Information</router-link> <span>| </span>
    <router-link to="/add-farm">Add New Farm</router-link> <span>| </span>
    <router-link to="/add-reading">Add New Reading</router-link> <span>| </span>
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  background-color: black;
  font-size: 18px;
}

#nav a {
  color: #cccccc;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #ffffff;
  font-weight: bold;
}

#nav span {
  color: #cccccc;
  font-weight: bold;
}
</style>
