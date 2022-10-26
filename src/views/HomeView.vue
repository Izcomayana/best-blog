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

      <!-- <div>
        <h3>By: John Doe</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Delectus itaque dignissimos aperiam, 
          dolorem accusantium sed minima quia pariatur, magnam, 
          praesentium exercitationem numquam deleniti aliquid et excepturi aspernatur? Dolor, culpa laborum.
        </p>
        <button @click="deletePost">delete</button>
        <button @click="editPost">edit</button>
      </div> -->

      <div v-for="(post, i) in posts" :key="i">
        <h3>By: {{ post.name }}</h3>
        <p>
          {{ post.post }}
        </p>
        <p>{{ post.date }}</p>

        <button @click="deletePost">delete</button>
        <button v-if="editMode" @click="editPost(i)">Edit</button>

        <input type="text" v-if="!editMode" v-model="post.post">
        <button v-if="!editMode" @click="savePost">Save</button>
        <button v-if="!editMode" @click="cancleEditMode">Cancle</button>
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

  const deletePost = (i) => {
    posts.value.splice(i, 1)
  }

  const editMode = ref(true)
  const postItem = ref("")

  const editPost = (i) => {
    editMode.value = false
    postItem.value = posts.value.find((post) => post.i === i)

    console.log(i)
  }

  const savePost = () => {
    // const i = postItem.value.i
    
    editMode.value = true
    postItem.value = ""
  }

  const cancleEditMode = () => {
    editMode.value = true
    postItem.value = ""
  }

</script>