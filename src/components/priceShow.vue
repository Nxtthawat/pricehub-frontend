<template>
    <div class="max-w-32">
        <slot name="productImage">
            <img class="w-18 hover:scale-125 transition-all duration-300" src="https://png.pngtree.com/png-vector/20240328/ourmid/pngtree-raw-ground-pork-closeup-raw-meat-png-image_12064697.png" alt="">
        </slot>
        <div class="text-center text-lg font-bold mt-3">
            <slot name="productName">asdasd</slot>
        </div>
        <div class="text-center text-sm mt-1">
            <slot name="price">asdasd</slot>
            ฿ / กิโลกรัม
        </div>
    </div>
</template>
<script>
export default {
    name: 'priceShow'
}
</script>