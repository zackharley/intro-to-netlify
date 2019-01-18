<template>
  <div id="app" class="app">
    <div class="main">
      <h1 class="title">Link Locker</h1>
      <h2 class="subtitle">An Easy Way to Store Links</h2>
      <div class="container">
        <Link v-for="link in links" :key="link.name" :link="link" />
      </div>
      <p class="attribution">
        Built with <span class="heart">&#x2764;</span> by
        <a href="https://zackharley.me">Zack Harley</a>
      </p>
    </div>
  </div>
</template>

<script>
import Link from './components/Link';

export default {
  name: 'app',
  components: {
    Link,
  },
  data() {
    return {
      links: [
        {
          name: 'QHacks',
          url: 'https://qhacks.io',
        },
        {
          name: 'My Cool Fun Site',
          url: 'http://zackharley.me',
        },
        {
          name: 'A Medium Article',
          url:
            'https://medium.com/s/story/if-you-only-read-a-few-books-in-2019-read-these-4533f41fe1d4',
        },
      ],
    };
  },
};
</script>

<style>
* {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

body {
  background: #330033
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'%3E%3Ccircle fill='%2306B' cx='45' cy='45' r='10'/%3E%3Cg fill='%23800' fill-opacity='1'%3E%3Ccircle cx='0' cy='90' r='10'/%3E%3Ccircle cx='90' cy='90' r='10'/%3E%3Ccircle cx='90' cy='0' r='10'/%3E%3Ccircle cx='0' cy='0' r='10'/%3E%3C/g%3E%3C/svg%3E");
}

a {
  color: #1c5dc9;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
}

.main {
  margin: 10vh 0;
  width: 500px;
  padding: 30px 40px;
  background: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-family: 'Roboto Slab', serif;
}

.subtitle {
  font-size: 1rem;
  color: #777;
  margin: 4px 0 20px 0;
}

.container {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.attribution {
  font-size: 0.88rem;
  color: #777;
  margin: 40px 0 0;
}

.heart:hover {
  color: red;
  transition: color 0.3s;
  cursor: pointer;
}
</style>
