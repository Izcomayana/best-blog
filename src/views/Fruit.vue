<template>
  <div>
    <h1>Welcome to our Fruit store</h1>
    <input v-model="extra" type="text" >
    <button @click="addFruit">Add</button>
    <div v-for="(fruit, i) in fruits" :key="i">
      <div class="edit">
        <input type="text" v-model="fruitName">         
        <button @click="editFruit">Edit</button>
      </div>

      <p> <span>{{ i }}</span> {{ fruit }}</p>
      <button @click="removeFruit(i)">Delete</button>
    </div>
    
    <form @submit.prevent="addForm">
      <label>Add to list</label>
      <input v-model="techName" type="text" placeholder="Product name">
      <input v-model="techPrice" type="number" placeholder="Product Price">
      <button @click="addItem">Add</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const fruits = ref(["apple", "banana", "cucumber"])
  const extra = ref("")

  const addFruit = () => {
    fruits.value.push(extra.value)
    localStorage.setItem("fruits", JSON.stringify(fruits.value))

    console.log(fruits.value)
  }

  if (localStorage.getItem("fruits")) {
    fruits.value = JSON.parse(
      localStorage.getItem("fruits")
    );
  }

  const removeFruit = (i) => {
    fruits.value.splice(i, 1)

    localStorage.setItem("fruits", JSON.stringify(fruits.value))
  }

  const editFruit = () => {
    // fruit = fruitName.value

  }

  const techs = ref([])
  const clothes = ref([])
  const error = ref(null)
  const techName = ref("")
  const techPrice = ref()


  const load = async () => {
    try {
      let techShopData = await fetch("http://localhost:3000/tech-shop")
      let clothesShopData = await fetch("http://localhost:3000/clothes-shop")
      if(!techShopData.ok || !clothesShopData.ok) {
        throw new Error("no data is available")
      }

      techs.value = await techShopData.json()
      clothes.value = await clothesShopData.json()
      // console.log(clothes.value)
    } catch (err) {
        error.value = err.message
        console.log(error.value)
    }
  }

  const addItem = () => {
    const no = 0

    techs.value.push({
      id: techs.id,
      Product: techName.value,
      Price: techPrice.value
    })

    // techs.value()
    console.log(techName.value)
    console.log(techPrice.value)
    console.log(techs.value)
  }

  load()
</script>

<style>

</style>