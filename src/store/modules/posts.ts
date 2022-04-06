/* eslint-disable @typescript-eslint/camelcase */
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import api from '@/api'
import { Post } from '@/Interfaces/Posts'

@Module({ namespaced: true })
class Posts extends VuexModule {
  //state
  public member_id = 0
  public list: Array<Post> = []
  public fetchedList = false
  public post: Post = {
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    id: 0
  }

  //리스트에 게시글 불러오기
  @Mutation
  public saveList(data: Array<Post>): void {
    this.fetchedList = true
    this.list = [...this.list, ...data]
  }
  @Action
  public getAllPosts(page: string): Promise<boolean> {
    if (this.fetchedList) {
      return Promise.resolve(true)
    } else {
      return api
        .get('/users?page=' + page)
        .then(response => {
          this.context.commit('saveList', response.data.data)
          return true
        })
        .catch(() => {
          return false
        })
    }
  }

  @Mutation
  public pickId(id: number): void {
    this.member_id = id
  }
  @Action
  public pickMember(id: number) {
    this.context.commit('pickId', id)
  }

  //선택한 게시글 가져오기
  @Mutation
  public save(data: Post): void {
    this.post = data
  }
  @Action
  public async getPost(id: number): Promise<Post | boolean> {
    if (this.list.length !== 0) {
      const fetched = await this.list.filter(item => {
        return item.id === id
      })

      if (fetched.length) {
        return Promise.resolve(fetched[0])
      } else {
        return Promise.reject(false)
      }
    } else {
      return api
        .get(`/users/${id}`)
        .then(response => {
          this.context.commit('save', response.data)
          return response.data
        })
        .catch(() => {
          return false
        })
    }
  }

  //게시글 편집
  @Mutation
  public edit(data: Post): void {
    this.list.map(item => {
      if (item.id === data.id) {
        item = data
      }
    })
  }
  @Action
  public async editPost(data: Post): Promise<boolean> {
    return api
      .put(`/users/${data.id}`, {
        data
      })
      .then(() => {
        this.context.commit('edit', data)
        alert('게시글 수정 성공.')
        return true
      })
      .catch(() => {
        return false
      })
  }

  //게시글 생성
  @Mutation
  public create(newPost: Post): void {
    this.list.unshift(newPost)
  }
  @Action
  public async createPost(data: Post): Promise<boolean> {
    return api
      .post('/users', {
        data
      })
      .then(response => {
        this.context.commit('create', response.data.data)
        alert('게시글 생성 성공.')
        return true
      })
      .catch(() => {
        return false
      })
  }

  //게시글 삭제
  @Mutation
  public delete(id: number): void {
    this.list = this.list.filter(item => {
      return item.id !== id
    })
  }
  @Action
  public async deletePost(id: number): Promise<void> {
    return api
      .delete(`/users/${id}`)
      .then(() => {
        this.context.commit('delete', id)
        alert('게시글 삭제 성공.')
      })
      .catch(() => {
        console.log('Delete fail')
      })
  }
}
export default Posts
