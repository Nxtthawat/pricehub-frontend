<script setup>
import axios from 'axios'
import { RouterLink, useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const router = useRouter();

const username = defineModel('username');
const password = defineModel('password');


const login = () =>{
    if(username.value == '' || password.value == ''){
        Swal.fire({
            icon: 'error',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        });
        return;
    };

    axios.post('https://pricehub-server.onrender.com/api/users/login', {
        username: username.value,
        password: password.value
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);

      Swal.fire({
         icon: 'success',
         title: 'สำเร็จ!',
         text: 'เข้าสู่ระบบสำเร็จ',
      }).then(() => {
         router.push({path: '/'});
      });
      username.value = '';
      password.value = '';
   })
   .catch((error) => {
      if(error.response.data.status == 400){
         Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: `${error.response.data.message}`,
         });
      };
   });
}

const goToRegister = () => {
    router.push({ path: '/register' });
}

</script>

<template>
<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div class="text-center text-3xl font-bold">เข้าสู่ระบบ</div>
        <label class="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" class="grow" placeholder="ชื่อผู้ใช้" autocomplete="off" v-model="username" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd" />
        </svg>
        <input type="password" class="grow" value="" v-model="password" placeholder="รหัสผ่าน" />
        </label>
        <button @click="login()" class="btn btn-success w-full text-white text-xl font-normal">เข้าสู่ระบบ</button>
        <div class="text-start text-md flex ">
            <p>ยังไม่มีบัญชีหรอ?</p>
            <a href="" @click="goToRegister()" class="ms-3 underline font-bold">สร้างบัญชีเลย!</a>
        </div>
    </div>
</div>
</template>