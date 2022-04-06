<template>
  <div class="home">
    <h1 class="page-title">Home</h1>
    <div class="card-container">
      <div v-for="post in list" :key="post.id" @click="pickMem(post.id)">
        <el-card :body-style="{ padding: '0px' }" class="article">
          <img :src="post.avatar" class="image" />
          <div class="title">
            {{ post.last_name + ' ' + post.first_name }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const posts = namespace('posts')
@Component
export default class Home extends Vue {
  mounted() {
    this.getAllPosts('1')
    this.getAllPosts('2')
  }
  @posts.State
  public list!: Array<object>

  @posts.State
  public member_id!: number

  @posts.Action
  public getAllPosts!: (page: string) => void

  @posts.Action
  public pickMember!: (id: number) => void

  pickMem(id: number) {
    this.pickMember(id)
    this.$router.push({ path: '/member/' + id })
  }
}
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  font-style: none;
}
</style>
