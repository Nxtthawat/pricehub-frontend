<script setup>
import navbar from '../components/navbar.vue';
import priceShow from '../components/priceShow.vue';
import menuSuggest from '../components/menuSuggest.vue';
import footerBar from '../components/footer.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const router = useRouter();

const searchQuery = ref('');
const searchProduct = () => {
  router.push({ path: '/all-product', query: { search: searchQuery.value } });
};

const topProduct = ref([]);
const topMenu = ref([]);

const getTopProduct = () =>{
  axios.get('http://localhost:3000/api/admin/getFourProducts').then((response) => {
    //console.log(response.data);
    topProduct.value = response.data;
    console.log(topProduct.value);
  }).catch((error) => {
    console.log(error);
  });
}

getTopProduct();

const getTopMenu = () =>{
  axios.get('http://localhost:3000/api/menu/getFourMenu').then((response) => {
    //console.log(response.data);
    topMenu.value = response.data;
    console.log(topMenu.value);
  }).catch((error) => {
    console.log(error);
  });
}

getTopMenu();

</script>

<template>
  <navbar />

  <section>
    <div class="bg-primaryGreen h-[400px]">
      <div class="text-white text-center">
        <h1 class="lg:text-7xl text-6xl ms-5 text-center font-bold pt-16">เปรียบเทียบราคาวัตถุดิบ</h1>
        <h1 class="lg:text-7xl text-6xl ms-5 text-center font-bold pt-6 ">ภายใน 5 นาที</h1>
        <div class="relative w-[500px] mx-auto mt-16 hidden md:block">
          <!-- <input type="text" class="input text-black text-lg input-md w-full pl-10 " placeholder="ค้นหาวัตถุดิบที่ต้องการเปรียบเทียบราคา"> -->
          <input v-model="searchQuery" @keyup.enter="searchProduct" type="text" class="input text-black text-lg input-md w-full pl-10 " placeholder="ค้นหาวัตถุดิบที่ต้องการเปรียบเทียบราคา">
          <button class="absolute left-2 top-1/2 transform -translate-y-1/2">
            <svg class="w-6 h-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="bg-secondary h-auto pb-10">
      <div class="container pt-5 mx-auto">
        <div class="bg-white rounded-2xl shadow-md p-5 lg:h-[300px] mx-auto  w-5/6">
          <div class="flex lg:flex-row flex-col h-full">
            <div class=" flex-col text-center lg:text-start flex lg:w-2/6 w-full  my-auto">
                <h5 class="lg:ps-10 text-xl mb-3">{{ new Date().toLocaleDateString('th-TH', { day: '2-digit', month: 'long', year: 'numeric' }) }}</h5>
                <h1 class="lg:ps-10 text-5xl font-bold text-fontPrimary">ราคาวัตถุดิบ</h1>
                <RouterLink to="/all-product" class="lg:ps-10 text-xl mt-3 text-third font-bold underline cursor-pointer">ดูทั้งหมด</RouterLink>
            </div>
            <div class="flex justify-center flex-wrap md:flex-nowrap lg:w-4/6 my-auto mt-10 lg:ms-10  gap-12">
              <priceShow v-for="(productDetails, productName) in topProduct" :key="productName">
                <template #productImage>
                  <img class="max-w-18 w-18 h-32 max-h-32 object-cover hover:scale-110 transition-all duration-300" :src="'http://localhost:3000' + productDetails.product_image" alt="">
                </template>
                <template #productName>
                  {{ productDetails.product_name }}
                </template>
                <template #price>
                  {{ productDetails.product_price }}
                </template>
              </priceShow>
            </div>
          </div>
        </div>
      </div>

      <div class="container mx-auto mt-10">
        <div class="mx-auto w-5/6">
          <h1 class="text-5xl font-bold text-fontPrimary">โพสต์</h1>
          <div class="divider divider-neutral"></div>
          <div class="flex flex-wrap md:flex-nowrap my-auto mt-10 lg:ms-10 cursor-pointer gap-12">
            <menuSuggest v-for="(menuDetails, menuName) in topMenu" :key="menuName">
              <template #image>
                <img class="w-full object-cover max-h-80 rounded-xl" :src="'http://localhost:3000' + menuDetails.menu_image" alt="">
              </template>
              <template #menuName>
                <h1 class="text-2xl font-bold mt-5">{{ menuDetails.menu_topic }}</h1>
              </template>
              <template #datePosted>
                <h1 class="text-lg mt-2">{{ menuDetails.menu_howto }}</h1>
              </template>
              <template #PostedBy>
                <h1 class="text-lg mt-2">โพสต์โดย: {{ menuDetails.menu_author }}</h1>
              </template>
            </menuSuggest>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footerBar />
</template>

<style scoped>
</style>
