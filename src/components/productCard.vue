<template>
    <div class="w-full rounded-lg bg-white shadow-lg p-5">
        <slot name="image">
            <img class="w-full rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5qROQFV_3SDisHS4ISFujMVkZQq528xxgKg&s" alt="">
        </slot>
        <slot name="productName">
            <h1 class="text-2xl font-bold mt-5">ชื่อเมนู</h1>
        </slot>
        <slot name="price">
            <h1 class="text-lg mt-2">09/02/2444</h1>
        </slot>
        <slot name="perKg">
            <h1 class="text-lg mt-2">ราคาต่อกิโลกรัม</h1>
        </slot>
        <slot name="priceFrom">
            <h1 class="text-lg mt-2">ราคาจาก</h1>
        </slot>
    </div>
</template>
<script>
export default {
    name : 'productCard'
}
</script>