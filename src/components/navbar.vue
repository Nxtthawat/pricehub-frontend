<script setup>
import { RouterLink,useRouter } from 'vue-router';
import { ref, defineExpose, onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();

const goToLogin = () => {
  router.push({ path: '/login' });
};

const isLoggedIn = ref(false);
const isAdmin = ref(false);

const checkLoginStatus = () => {
  // Logic to check if the user is logged in
  // For example, checking a token in localStorage
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
  //console.log('isLoggedIn', isLoggedIn.value);
};

onMounted(async ()=>{
  checkLoginStatus();

  if(isLoggedIn.value){
    axios.get('https://pricehub-server.onrender.com/api/users/getUser', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log('User dataaasa:', response.data.data.email);
      if(response.data.data.role === 'admin'){
        isAdmin.value = true;
      }
    }).catch(error => {
      console.error('Error fetching user data:', error)
    });
  }
})

// Call the function to set the initial login status
checkLoginStatus();

defineExpose({ isLoggedIn, goToLogin });

const logout = () => {
  // Logic to clear the token and log the user out
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  router.push(router.currentRoute.value.fullPath);
};



const checkIfIsAdmin = () =>{
  
}
</script>

<template>
    <nav>
    <div class="navbar bg-base-100 shadow-lg">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li v-if="isAdmin"><RouterLink to="/admin">admin</RouterLink></li>  
        <li><RouterLink to="/all-product">ราคาวัคถุดิบ</RouterLink></li>
        <li><RouterLink to="/all-menu">โพสต์ของชุมชน</RouterLink></li>
      </ul>
        </div>
        <RouterLink to="/" class="btn btn-ghost text-xl">PriceHub</RouterLink>
      </div>
      <div class="navbar-center hidden lg:flex ">
        <ul class="menu menu-horizontal text-lg px-1">
          <li><RouterLink to="/all-product">ราคาวัถุดิบ</RouterLink></li>
          <li><RouterLink to="/all-menu">โพสต์ของชุมชล</RouterLink></li>
        </ul>
      </div>
      <div class="navbar-end">
        <template v-if="isLoggedIn">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="rounded-full">
              <img class="w-12 h-12 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="">
            </div>
            <ul tabindex="0" class="menu dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><RouterLink to="/profile">จัดการโปรไฟล์</RouterLink></li>
              <li v-if="isAdmin"><RouterLink to="/admin">admin</RouterLink></li>
              <li><button @click="logout" class="text-red-500">ออกจากระบบ</button></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <a class="btn w-40 font-normal text-xl text-white btn-success" @click="goToLogin()">เข้าสู่ระบบ</a>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'navbar'
}
</script>