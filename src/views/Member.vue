<template>
  <div class="blog">
    <h1 class="page-title">Member</h1>
    <div class="main">
      <div class="banner-container">
        <img :src="article.avatar" class="banner" />
      </div>

      <h1 class="page-title article-title">
        {{ article.last_name + ' ' + article.first_name }}
      </h1>
      <h3 class="article-content">E-mail : {{ article.email }}</h3>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const posts = namespace('posts')
interface ArticleStructure {
  id: number
  title: string
  body: string
}
@Component
export default class Article extends Vue {
  public article: object = {}
  @posts.State
  public list!: Array<ArticleStructure>

  @posts.State
  public member_id!: number

  @posts.Action
  public getPost!: (id: number) => Promise<object>

  created() {
    this.getArticle(this.member_id)
  }

  public getArticle(id: number): void {
    this.getPost(id).then(data => {
      this.article = data
    })
  }
}
</script>
<style lang="scss" scoped>
.banner-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  .banner {
    width: 20%;
    object-fit: cover;
    display: block;
  }
}
.article-title {
  font-size: 22px;
}
.article-content {
  text-align: center;
  font-size: 15px;
}
.article-description {
  width: 50rem;
  height: 10rem;
  font-size: 16px;
  margin: auto;
  border: 1px solid black;
  padding: 0.3rem;
}
</style>
