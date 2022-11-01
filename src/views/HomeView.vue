<template>
  <div>
    <div>
      <h1>The Best Blog</h1>
      <div>
        <div>
          <form @submit.prevent="addPost">
            <input type="text" v-model="name" placeholder="Name">
            <input type="text" v-model="post" placeholder="Write a post...">
            <button type="submit" :disabled="!name || !post">Create A Post</button>
          </form>
        </div>
      </div>

      <div v-for="(post, id) in posts" :key="id">
        <h3>By: {{ post.name }}</h3>
        <p>
          {{ post.post }}
        </p>
        <p>{{ post.date }}</p>
    
        <button @click="deletePost(id)">delete</button>
      
        <div v-if="post === postItemToEdit">   
          <!-- <input type="text" > -->
          <textarea v-model="post.post" cols="40" rows="5"></textarea>
          <button @click="savePost">Save</button>
          <button @click="cancleEditMode">Cancle</button>
        </div>
      
        <button v-else @click="editPost(post)">Edit</button> 
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { 
    addDoc, collection, deleteDoc, doc, 
    onSnapshot, orderBy, query, 
  } from "firebase/firestore";
  import { db } from "@/firebase"

  const blogCollectionRef = collection(db, "blogs")
  const blogsCollectionQuery = query(blogCollectionRef, orderBy("date", "asc"));

  const name = ref("")
  const post = ref("")

  const addPost = () => {
    addDoc(blogCollectionRef, {
      name: name.value,
      post: post.value,
      date: Date.now()
    });

    name.value = ""
    post.value = ""
  }
  
  const posts = ref([])

  onMounted(() => {
    onSnapshot(blogsCollectionQuery, (querySnapshot) => {
      const fbBlogs = [];
      querySnapshot.forEach((doc) => {
        const blogs = {
          id: doc.id,
          name: doc.data().name,
          post: doc.data().post,
          date: doc.data().date
        }
        fbBlogs.unshift(blogs)
      })
      posts.value = fbBlogs
    });
  });

  const deletePost = (id) => {
    posts.value.splice(id, 1)
  }

  const postItemToEdit = ref()

  const editPost = (post) => {
    postItemToEdit.value = post
    console.log(postItemToEdit)
  }

  const savePost = () => {
    postItemToEdit.value = (false)
  }

  const cancleEditMode = () => {
    postItemToEdit.value = (false)
  }

</script>