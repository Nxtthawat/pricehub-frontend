<script setup>
import navbar from '../components/navbar.vue';
import {ref} from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';


const author = ref('');
const file = ref(null);

const isLoggedIn = ref(false);

const productName = ref('');
const price = ref('');
const unit = ref('');

const onFileChange = (event) => {
  file.value = event.target.files[0];
};

const products = ref({});

const checkLoginStatus = () => {
  // Logic to check if the user is logged in
  // For example, checking a token in localStorage
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
  //console.log('isLoggedIn', isLoggedIn.value);
};

checkLoginStatus();

const getMenu = async () => {
    try {
        const response = await axios.get('https://pricehub-server.onrender.com/api/menu/getMenu').then(response => {
            console.log('Menu data:', response.data);
            products.value = response.data;
            console.log(products.value);
        });
    } catch (error) {
        console.error('Error fetching menu data:', error);
    }
};

getMenu();

const getUser = async () => {
    try {
        const response = await axios.get('https://pricehub-server.onrender.com/api/users/getUser', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(response => {
            //console.log('User data:', response.data.data.username);
            author.value = response.data.data.username;
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};       

getUser();

const uploadProduct = async () => {
    const formData = new FormData();
    formData.append('image', file.value);
    formData.append('product_name', productName.value);
    formData.append('product_price', price.value);
    formData.append('author', author.value);
    //console.log(file.value);

    try {
        const response = await axios.post('https://pricehub-server.onrender.com/api/menu/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
                document.getElementById('addPost').close(); // Close the modal
                Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ!',
                        text: 'เพิ่มโพสต์สำเร็จ',
                });
                getMenu(); // Refresh the product list
                
        });
        console.log('File uploaded:', response.data);

    } catch (error) {
        console.error('Error uploading file:', error);
    }

    console.log(productName.value, price.value, unit.value, author.value);
};

const deleteProduct = async (productId) => {
    console.log('Deleting product:', productId);
    try {
        const response = await axios.delete('https://pricehub-server.onrender.com/api/menu/delete/',{
            data:
            {
                menu_id: productId
            }
        }).then(response => {
            console.log('Product deleted:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: 'ลบสำเร็จ',
            });
            getMenu(); // Refresh the product list
        });
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

const editProduct = async (productId,menu_recipe,menu_author,menu_name) => {
    const formData = new FormData();
    formData.append('image', file.value);
    formData.append('menu_topic', menu_name);
    formData.append('menu_recipe', menu_recipe);
    formData.append('menu_author', menu_author);
    formData.append('menu_id', productId);

    try {
        const response = await axios.put(`https://pricehub-server.onrender.com/api/menu/edit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            document.getElementById(`editPost${productId}`).close(); // Close the modal
            Swal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: 'แก้ไขเมนูสำเร็จ',
            });
            getMenu(); // Refresh the product list
        });
        console.log('File edited:', response.data);
    } catch (error) {
        console.error('Error editing file:', error);
    }

    console.log(menu_name, menu_recipe, menu_author, menu_howto);
};

const openModal = (id) => {
  document.getElementById(`editPost${id}`).showModal()
}
</script>
<template>
    <navbar/>

    <div class="container mx-auto mt-16">
        <div class="flex justify-between">
            <h1 class="text-fontPrimary text-4xl font-bold">โพสต์</h1>
            <div class="flex gap-3">
                <button v-if="isLoggedIn" class="btn btn-primary" onclick="addPost.showModal()">เพิ่มโพสต์</button>
                <dialog id="addPost" class="modal">
                    <form @submit.prevent="uploadImage">
                        <div class="modal-box">
                        <h3 class="text-2xl font-bold">เพิ่มโพสต์</h3>
                        <input type="text" v-model="productName" class="input input-bordered input-primaryGreen input-md mt-4 w-full" required placeholder="ชื่อโพสต์" id="">
                        <input type="text" v-model="price" class="input input-bordered input-primaryGreen input-md mt-4 w-full" required placeholder="ที่อยู่" id="">
                        <input type="hidden" v-model="author">
                        <label class="form-control w-full">
                            <div class="label">
                            <span class="label-text">อัพโหลดรูปภาพ (288px x 128px)</span>
                            </div>
                            <input type="file" class="file-input file-input-bordered file-md w-full" required accept="image/*" @change="onFileChange" />
                        </label>
                        <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn">Close</button>
                            </form>
                            <button class="btn btn-primary" @click="uploadProduct"  type="submit">Upload</button>
                        </div>
                        </div>
                    </form>
                </dialog>
            </div>
        </div>
        <div class="divider"></div>

        <div class="flex lg:flex-row flex-col justify-left flex-wrap gap-5 ">
            <div class="flex flex-col lg:flex-row justify-left flex-wrap gap-5">
                <div class="max-w-72 min-w-72 h-auto hover:scale-110 shadow-lg rounded-xl p-5 cursor-pointer duration-750 transition-all" v-for="(productDetail, productName) in products" :key="productName">
                <img class="max-w-64 min-w-64 min-h-52 max-h-52 object-cover rounded-xl" :src="'https://pricehub-server.onrender.com' + productDetail['menu_image']" alt="">
                <div class="flex">
                    <h1 class="text-3xl font-bold mt-5 text-ellipsis">{{ productDetail['menu_topic'] }}</h1>
                    <div  v-if="productDetail['menu_author'] == author" class="dropdown ms-auto">
                        <label tabindex="0" class="btn btn-circle btn-sm mt-5">
                            ...
                        </label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a @click="openModal(productDetail.menu_id)">แก้ไข</a></li>
                        <dialog :id="`editPost${productDetail.menu_id}`" class="modal">
                                <form @submit.prevent="">
                                    <div class="modal-box">
                                        <h3 class="text-2xl font-bold">แก้ไขโพสต์</h3>
                                        <input type="text" v-model="productDetail['menu_topic']" class="input input-bordered input-primaryGreen input-md mt-4 w-full" required placeholder="ชื่อโพสต์">
                                        <input type="text" v-model="productDetail['menu_recipe']" class="input input-bordered input-primaryGreen input-md mt-4 w-full" required placeholder="ที่อยู่">
                                        <input type="hidden" v-model="productDetail['menu_author']">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span class="label-text">อัพโหลดรูปภาพ (288px x 128px)</span>
                                            </div>
                                            <input type="file" class="file-input file-input-bordered file-md w-full" accept="image/*" @change="onFileChange" />
                                        </label>
                                        <div class="modal-action">
                                            <form method="dialog">
                                                <!-- if there is a button in form, it will close the modal -->
                                                <button class="btn">Close</button>
                                            </form>
                                            <button class="btn btn-primary" @click="editProduct(productDetail['menu_id'],productDetail['menu_recipe'],productDetail['menu_howto'],productDetail['menu_author'],productDetail['menu_topic'])"  type="submit">Upload</button>
                                        </div>
                                    </div>
                                </form>
                            </dialog>
                            <li><a @click="deleteProduct(productDetail['menu_id'])" class="text-red-500">ลบ</a></li>
                        </ul>
                    </div>
                    </div>
                    <h1 class="text-lg mt-2">{{ productDetail['menu_recipe'] }}</h1>
                    <h1 class="text-sm mt-2">โดย: {{ productDetail['menu_author'] }}</h1>
                </div>
            </div>
        </div> 
    </div>
</template>

