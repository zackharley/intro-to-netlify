<template>
  <div v-show="unfurl" class="unfurl__container">
    <a
      class="unfurl__url"
      :href="url"
      target="_blank"
      rel="noreferrer noopener"
      >{{ url }}</a
    >
    <div class="metadata__container">
      <div class="metadata__bar"></div>
      <div>
        <div
          v-show="faviconUrl && siteName"
          class="metadata__site-info__container metadata__section"
        >
          <img :src="faviconUrl" class="metadata__site-info__image" />
          <p class="metadata__site-info__name">{{ siteName }}</p>
        </div>
        <h4 v-show="title" class="metadata__title metadata__section">
          <a :href="url">{{ title }}</a>
        </h4>
        <p v-show="description" class="metadata__description metadata__section">
          {{ description }}
        </p>
        <div
          class="metadata__pairs__container metadata__section"
          v-show="twitterPairs"
        >
          <div
            v-for="pair in twitterPairs"
            :key="pair.label"
            class="metadata__pair__container"
          >
            <p v-show="pair.label">
              <b>{{ pair.label }}</b>
            </p>
            <p v-show="pair.data">{{ pair.data }}</p>
          </div>
        </div>
        <img v-show="imageUrl" :src="imageUrl" class="metadata__image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['url', 'unfurl'],
  name: 'UnfurledLink',
  computed: {
    description: function() {
      const openGraphData = this.unfurl.ogp;
      if (openGraphData && openGraphData.ogDescription) {
        return openGraphData.ogDescription;
      }
      return '';
    },
    imageUrl: function() {
      const openGraphData = this.unfurl.ogp;
      if (
        openGraphData &&
        openGraphData.ogImage &&
        openGraphData.ogImage.length
      ) {
        const imageUrl = openGraphData.ogImage[0].url;
        if (imageUrl.match(/^\//)) {
          return this.url + imageUrl;
        }
        return imageUrl;
      }
      return '';
    },
    faviconUrl: function() {
      const otherData = this.unfurl.other;
      if (otherData && otherData.icon) {
        return otherData.icon;
      }
      return '';
    },
    siteName: function() {
      const openGraphData = this.unfurl.ogp;
      if (openGraphData && openGraphData.ogSiteName) {
        return openGraphData.ogSiteName;
      }
      return '';
    },
    title: function() {
      const openGraphData = this.unfurl.ogp;
      if (openGraphData && openGraphData.ogTitle) {
        return openGraphData.ogTitle;
      }
      const otherData = this.unfurl.other;
      if (otherData && otherData.title) {
        return otherData.title;
      }
      return '';
    },
    twitterPairs: function() {
      const twitterData = this.unfurl.twitter;
      if (!twitterData) {
        return [];
      }
      return Object.entries(twitterData).reduce((pairs, [key, label]) => {
        if (key.match(/^twitterLabel\d+$/)) {
          return [
            ...pairs,
            { label, data: twitterData[key.replace('Label', 'Data')] },
          ];
        }
        return pairs;
      }, []);
    },
  },
};
</script>

<style scoped>
.unfurl__container {
  margin: 6px 0;
}

.unfurl__url {
  font-size: 0.88rem;
}
.metadata__container {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}

.metadata__bar {
  background-color: #e5e5e5;
  min-width: 4px;
  max-width: 4px;
  border-radius: 6px;
  margin-right: 20px;
}

.metadata__site-info__container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.metadata__site-info__image {
  border-radius: 2px;
  height: 16px;
  width: 16px;
  margin-right: 10px;
}

.metadata__site-info__name {
  color: #333;
  font-weight: 300;
}

.metadata__section {
  margin-bottom: 6px;
}

.metadata__description {
  line-height: 1.5rem;
}

.metadata__image {
  padding-top: 6px;
  border-radius: 6px;
  width: 300px;
}
</style>
