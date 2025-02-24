<script setup>
import navbar from '../components/navbar.vue'
import { ref, watchEffect,onMounted  } from 'vue'
import { useRouter } from 'vue-router'

import axios from 'axios'

const isLoggedIn = ref(false)
const router = useRouter()

watchEffect(() => {
    // Replace this with your actual login check logic
    isLoggedIn.value = !!localStorage.getItem('token')
    
    if (!isLoggedIn.value) {
        router.push('/login')
        location.reload()
    }
})

const userData = ref({})

const email = ref('');
const username = ref('');


onMounted(async () => {
    try {
        const response = await axios.get('https://pricehub-server.onrender.com/api/users/getUser', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        userData.value = response.data

        email.value = userData.value.data.email
        username.value = userData.value.data.username
        

        //console.log('User data:', userData.value.data.email);
    } catch (error) {
        console.error('Error fetching user data:', error)
    }
});

const updateProfile = async () => {
    try {
        const response = await axios.put('https://pricehub-server.onrender.com/api/users/updateUser', {
            email: email.value,
            username: username.value
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log('Update profile response:', response.data)
    } catch (error) {
        console.error('Error updating profile:', error)
    }
}
</script>
<template>
    <navbar />

    <div class="container mx-auto mt-10">
        <h1 class="text-4xl font-bold text-fontPrimary">จัดการโปรไฟล์</h1>
        <div class="divider"></div>

        <div class="flex">
            <div class=" w-3/12">
                <div class="mx-auto">
                    <img class="mx-auto rounded-full w-54 p-5" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="">
                    <div class="text-center text-4xl font-bold">{{ username }}</div>
                </div>
            </div>
            <div class="w-9/12 p-5">
                <label for="" class="text-xl">ชื่อผู้ใช้</label>
                <input type="text" v-model="username" class="input input-bordered w-full input-md mt-2 mb-3" value="email" placeholder="ชื่อผู้ใช้">
                <label for="" class="text-xl ">อีเมลล์</label>
                <input type="text" v-model="email" class="input input-bordered w-full input-md mt-2 mb-3" placeholder="อีเมลล์">
                <label for="" class="text-xl">ยืนยันรหัสเก่า</label>
                <input type="text" class="input input-bordered w-full input-md mt-2 mb-3" placeholder="รหัสเก่า">
                <label for="" class="text-xl">รหัสผ่านใหม่</label>
                <input type="text" class="input input-bordered w-full input-md mt-2" placeholder="รหัสใหม่">

                <div class="flex justify-end">
                    <button class="btn btn-success mt-3 w-1/6 text-white">บันทึก</button>
                </div>
            </div>
        </div>
    </div>
</template>