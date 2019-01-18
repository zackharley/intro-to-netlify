<template>
  <div class="link__container">
    <div class="link__container__top">
      <div
        class="link"
        :href="link.url"
        target="_blank"
        rel="noreferrer noopener"
        @click="toggleIsOpen()"
      >
        <i
          class="fas caret"
          :class="isOpen ? 'fa-caret-down' : 'fa-caret-right'"
        ></i>
        <span class="link__name">{{ link.name }}</span>
      </div>
    </div>
    <div v-show="isOpen" class="link__container__bottom">
      <p v-if="isLoading">Loading...</p>
      <UnfurledLink
        v-else
        :url="link.url"
        :unfurl="unfurledData"
      ></UnfurledLink>
    </div>
  </div>
</template>

<script>
import UnfurledLink from './UnfurledLink';
export default {
  name: 'Link',
  props: ['link'],
  components: { UnfurledLink },
  data() {
    return {
      isLoading: false,
      isOpen: false,
      unfurledData: {},
    };
  },
  methods: {
    toggleIsOpen() {
      this.isOpen = !this.isOpen;
    },
  },
  mounted: async function() {
    this.isLoading = true;
    const response = await fetch(`/.netlify/functions/unfurl?url=${this.link.url}`);
    if (!response.ok) {
      alert('Failed request to get unfurl data for URL: ${url}');
      this.isLoading = false;
    }
    this.unfurledData = (await response.json()).data;
    this.isLoading = false;
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: initial;
}

.link__container {
  display: flex;
  flex-direction: column;
}

.link__container__top {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.link,
.caret {
  color: #777;
  transition: color 0.3s;
}
.link:hover,
.caret:hover {
  color: #333;
  cursor: pointer;
}

.caret {
  font-size: 20px;
  margin-right: 16px;
  padding: 4px;
  width: 16px;
  align-items: center;
  justify-content: center;
}

.link__name {
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  margin-right: 6px;
}
</style>
