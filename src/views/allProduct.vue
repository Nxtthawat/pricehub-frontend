<script setup>
import navbar from '../components/navbar.vue';
import productCard from '../components/productCard.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const searchQuery = ref(route.query.search || '');



const products = ref({});
const filteredProducts = computed(() => {
    if (!searchQuery.value) {
        return products.value;
    }
    const query = searchQuery.value.toLowerCase();
    return Object.fromEntries(
        Object.entries(products.value).filter(([key, product]) =>
            product.product_name.toLowerCase().includes(query)
        )
    );
});

const getProducts = async () => {
    try {
        const response = await axios.get('https://pricehub-server.onrender.com/api/admin/getProducts');
        products.value = response.data;
        console.log('products:', response.data);
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
};

getProducts();


const updateSearchQuery = () => {
    searchQuery.value = searchQuery.value.trim();
};

</script>

<template>
    <navbar />

    <div class="container mx-auto mt-16">
        <div class="flex justify-between">
            <h1 class="text-fontPrimary text-4xl font-bold">ราคาวัตถุดิบวันนี้</h1>
        <div class="relative">
            <input v-model="searchQuery" @keyup.enter="updateSearchQuery" type="text" name="" class="input input-bordered input-primaryGreen input-md" placeholder="ค้นหาวัตถุดิบ" id="">
            <svg @click="updateSearchQuery" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 18l6-6m0 0l-6-6m6 6H3" />
            </svg>
        </div>
        </div>
        <div class="divider"></div>

        <div class="flex lg:flex-row flex-col flex-wrap w-full gap-16 ms-5">
            <div class="hover:scale-110 cursor-pointer duration-750 transition-all" v-for="(productDetail, productName) in filteredProducts" :key="productName">
                <productCard>
                    <template #image>
                        <img class="max-w-72 min-h-72 object-cover rounded-xl" :src="'https://pricehub-server.onrender.com' + productDetail['product_image']" alt="">
                    </template>
                    <template #productName>
                        <h1 class="text-3xl font-bold mt-5">{{ productDetail['product_name'] }}</h1>
                    </template>
                    <template #price>
                        <h1 class="text-lg mt-2">{{ productDetail['product_price'] }} บาท</h1>
                    </template>
                    <template #perKg>
                        <h1 class="text-sm mt-2">ราคาต่อ{{ productDetail['product_unit'] }}</h1>
                    </template>
                    <template #priceFrom>
                        <h1 class="text-sm mt-2">ราคาจาก <b>{{ productDetail['price_from'] }}</b></h1>
                    </template>
                </productCard>
            </div>
        </div> 
    </div>
</template>