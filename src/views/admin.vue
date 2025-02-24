<script setup>
import { onMounted,ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import navbar from '../components/navbar.vue';
import Swal from 'sweetalert2';

const router = useRouter();

const isAdmin = ref(false);

onMounted(()=>{
    axios.get('http://localhost:3000/api/users/getUser', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      //console.log('User dataaasa:', response.data.data.email);
      if(response.data.data.role === 'admin'){
        isAdmin.value = true;
      }else{
        router.push({ path: '/' });
      }
    }).catch(error => {
      console.error('Error fetching user data:', error)
    });
});

const getAllUser = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/users/getAllUser', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(response => {
            console.log('All user:', response.data.data);
            allUser.value = response.data.data;
        }).catch(error => {
            console.error('Error fetching user data:', error)
        });
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
}
getAllUser();

var allUser = ref([]);


const file = ref(null);
const showModal = ref(false);

const onFileChange = (event) => {
  file.value = event.target.files[0];
};

const productName = ref('');
const price = ref('');
const unit = ref('');
const priceFrom = ref('');

const allProduct = ref([]);


const uploadProduct = async () => {
    const formData = new FormData();
    formData.append('image', file.value);
    formData.append('product_name', productName.value);
    formData.append('product_price', price.value);
    formData.append('product_unit', unit.value);
    formData.append('price_from', priceFrom.value);
    //console.log(file.value);

    try {
        const response = await axios.post('http://localhost:3000/api/admin/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
                document.getElementById('addPost').close(); // Close the modal
                Swal.fire({
                        icon: 'success',
                        title: 'สำเร็จ!',
                        text: 'เพิ่มวัตถุดิบสำเร็จ',
                });
                getProducts(); // Refresh the product list
                
        });
        console.log('File uploaded:', response.data);

    } catch (error) {
        console.error('Error uploading file:', error);
    }

    console.log(productName.value, price.value, unit.value, priceFrom.value);
};

const closeModal = () => {
  showModal.value = false;
};

const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/admin/getProducts').then(response => {
            console.log('All product:', response.data);
            allProduct.value = response.data;
        }).catch(error => {
            console.error('Error fetching product data:', error)
        });
    } catch (error) {
        console.error('Error fetching product data:', error)
    }
}

const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:3000/api/admin/delete`, { data: { product_id: productId } });
    console.log('Product deleted:', productId);
    getProducts(); // Refresh the product list
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
getProducts();
</script>
<template>
    <navbar />

    <div class="container mx-auto mt-10">
        <article>
            <h1 class="text-4xl text-fontPrimary font-bold">จัดการผู้ใช้</h1>
            <div class="divider"></div>
            <div class="overflow-x-auto">
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ชื่อผู้ใช้</th>
                        <th>อีเมลล์</th>
                        <th>ตำแหน่ง</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in allUser" :key="user.id">
                        <td>{{ user.user_id }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </article>

        <article class="mt-10">
            <div class="flex justify-between items-center">
                <h1 class="text-4xl text-fontPrimary font-bold">จัดการสินค้า</h1>
                <button class="btn btn-primary" onclick="addPost.showModal()">เพิ่มวัตถุดิบ</button>
                <dialog id="addPost" class="modal">
                    <form @submit.prevent="uploadImage">
                        <div class="modal-box">
                        <h3 class="text-2xl font-bold">เพิ่มวัตถุดิบ</h3>
                        <input type="text" v-model="productName" class="input input-bordered input-primaryGreen input-md mt-4 w-full" required placeholder="ชื่อวัตถุดิบ" id="">
                        <input type="text" v-model="price" class="input input-bordered input-primaryGreen input-md mt-4 w-full" required placeholder="ราคา" id="">
                        <label class="form-control w-full">
                            <div class="label">
                                <span class="label-text">หน่วย</span>
                            </div>
                            <select v-model="unit" name="" id="" class="select select-bordered w-full select-md" required>
                                <option value="กิโลกรัม">กิโลกรัม</option>
                                <option value="ขีด">ขีด</option>
                                <option value="ขวด">ขวด</option>
                                <option value="แพ็ค">แพ็ค</option>

                            </select>
                        </label>
                        
                        <label class="form-control">
                            <div class="label">
                                <span class="label-text">ราคาจาก</span>
                            </div>
                            <select v-model="priceFrom" name="asd" id="asd" class="select select-bordered w-full select-md" required>
                                <option value="Big C">บิ๊กซี</option>
                                <option value="Lotus">โลตัส</option>
                            </select>
                        </label>
                        
                        <label class="form-control w-full">
                            <div class="label">
                            <span class="label-text">เลือกรูปภาพสินค้า</span>
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
            <div class="divider"></div>
            
            <table class="table table-zebra">
                <!-- head -->
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ชื่อสินค้า</th>
                        <th>ราคา</th>
                        <th>หน่วย</th>
                        <th>รูป</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in allProduct" :key="product.product_id">
                        <td>{{ product.product_id }}</td>
                        <td>{{ product.product_name }}</td>
                        <td>{{ product.product_price }}</td>
                        <td>{{ product.product_unit }}</td>
                        <td><img :src="'http://localhost:3000' + product.product_image" alt="" class="w-24 h-auto"></td>
                        <td>
                            <button class="btn btn-error text-white" @click="deleteProduct(product.product_id)">ลบ</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </article>
    </div>
</template>