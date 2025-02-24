<script setup>
import { useRouter } from 'vue-router';
import { defineModel,ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();

const email = defineModel('email');
const username = defineModel('username');
const password = defineModel('password');
const confirmPassword = defineModel('confirmPassword');

const goToLogin = () => {
  router.push({ path: '/login' });
};

const regis = () =>{
    if(email.value == '' || username.value == '' || password.value == '' || confirmPassword.value == ''){
        Swal.fire({
            icon: 'error',
            title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        });
        return;
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        Swal.fire({
            icon: 'error',
            title: 'อีเมลไม่ถูกต้อง',
            text: 'กรุณากรอกอีเมลที่ถูกต้อง',
        });
        return;
    }

    if(password.value != confirmPassword.value){
        Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ตรงกัน',
            text: 'รหัสผ่านไม่ตรงกัน',
        });
        return;
    };

    axios.post('https://pricehub-server.onrender.com/api/users/register', {
        email: email.value,
        username: username.value,
        password: password.value
    })
    .then(Response => {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ!',
            text: 'สร้างบัญชีสำเร็จ',
        }).then(() => {
            localStorage.setItem('token', Response.data.token);
            router.push({path: '/'});
        });
    }).catch((error) => {
      Swal.fire({
            icon: 'error',
            title: 'เข้าสู่ระบบไม่สำเร็จ',
            text: `${error.response.data}`,
         });
   });
}
</script>

<template>
<div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div class="text-center text-3xl font-bold">สร้างบัญชี</div>
        <label class="input input-bordered flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="h-4 w-4 opacity-70">
                <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" class="grow" placeholder="อีเมลล์" autocomplete="off" v-model="email" />
        </label>
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
            <input type="password" class="grow" value="" placeholder="รหัสผ่าน" autocomplete="off" v-model="password" />
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
            <input type="password" class="grow" value="" placeholder="ยืนยันรหัสผ่าน" autocomplete="off" v-model="confirmPassword"/>
        </label>
        <button class="btn btn-success w-full text-white text-xl font-normal" @click="regis()">สร้างบัญชี</button>
        <div class="text-start text-md flex ">
            <p>มีบัญชีอยู่แล้ว?</p>
            <a href="" @click="goToLogin()" class="ms-3 underline font-bold">เข้าสู่ระบบ!</a>
        </div>
    </div>
</div>
</template>