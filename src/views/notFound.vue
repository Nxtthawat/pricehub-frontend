<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>ไม่พบหน้าที่คุณต้องการค้นหา</p>
        <router-link to="/">กลับหน้าหลัก</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 3em;
    margin-bottom: 20px;
}

.not-found p {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.not-found a {
    font-size: 1.2em;
    color: #42b983;
    text-decoration: none;
}
</style>