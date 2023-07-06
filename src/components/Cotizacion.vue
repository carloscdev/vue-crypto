<script setup>
defineProps(['cotizacion'])
</script>

<template>
<div>
  <div>
    <div class="h-20">
      <img :src="`https://cryptocompare.com/${cotizacion.IMAGEURL}`" alt="Imagen Crypto" class="w-20 mx-auto">
    </div>
    <section class="flex gap-3 mt-5 justify-center">
      <div class="font-semibold grid gap-1 text-left">
        <p>Precio: </p>
        <p>Precio más alto: </p>
        <p>Precio más bajo: </p>
        <p>Variación últimas 24 h: </p>
        <p>Última Actualización: </p>
      </div>
      <div class=" opacity-70 grid gap-1">
        <p>{{ cotizacion.PRICE }}</p>
        <p>{{ cotizacion.HIGHDAY }}</p>
        <p>{{ cotizacion.LOWDAY }}</p>
        <p>{{ cotizacion.CHANGEPCT24HOUR }} %</p>
        <p>{{ cotizacion.LASTUPDATE }}</p>
      </div>
    </section>
  </div>
</div>
</template>
