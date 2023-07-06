<script setup>
import { computed, onMounted, ref, watch } from 'vue';
const props = defineProps({
  criptomonedas: {
    type: Array,
    required: true
  }
})

const cripto = ref('')

const buscarPorNombre = (item) => {
  return  item.CoinInfo.FullName.toLowerCase().includes(cripto.value.toLowerCase())
}

watch(cripto, () => {
  console.log(cripto.value)
})

const criptomonedasTotal = computed(() => {
  if (cripto) {
    return props.criptomonedas.filter(item => buscarPorNombre(item))
  }
  return props.criptomonedas
})

</script>

<template>
<main class="container text-neutral-800">
  <div class="flex flex-col mb-20 mt-10">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full sm:px-6 lg:px-8">
      <h2 class="text-2xl md:text-[2rem] border-b pb-5 border-neutral-200 font-bold">
        Buscar
        <span class="text-orange-500">Criptomonedas</span>
      </h2>
      <input v-model="cripto" type="search" id="search" class="my-5 border-neutral-200 shadow-sm" placeholder="Buscar por nombre">
        <div class="overflow-hidden border border-neutral-200 rounded-xl shadow-sm bg-white">
          <table class="w-full text-left text-sm">
            <thead class="border-b font-medium text-neutral-400">
              <tr>
                <th scope="col" class="py-3 px-5 md:py-5 md:px-10">Nombre</th>
                <th scope="col" class="py-3 px-5 md:py-5 md:px-10">Precio</th>
                <th scope="col" class="py-3 px-5 md:py-5 md:px-10 hidden md:table-cell">Cambio</th>
                <th scope="col" class="py-3 px-5 md:py-5 md:px-10 hidden md:table-cell">Gráfico</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in criptomonedasTotal"
                class="
                  border-b border-neutral-200 transition duration-300 ease-in-out
                  hover:bg-neutral-800 hover:text-neutral-200
                ">
                <td class="max-w-[8rem] md:max-w-[12rem] py-3 px-5 md:py-5 md:px-10 flex items-center font-bold gap-1">
                  <img :src="`https://cryptocompare.com/${item.CoinInfo.ImageUrl}`" width="50" alt="Imagen Crypto" />
                  {{  item.CoinInfo.FullName }}
                </td>
                <td class="whitespace-nowrap py-3 px-5 md:py-5 md:px-10">USD {{ item.RAW.USD.PRICE.toFixed(2) }}</td>
                <td class="whitespace-nowrap py-3 px-5 md:py-5 md:px-10 font-semibold hidden md:table-cell" :class="item.DISPLAY.USD.CHANGEPCT24HOUR >= 0 ? 'text-green-600' : 'text-red-500'">
                  {{ item.DISPLAY.USD.CHANGEPCT24HOUR }}%
                </td>
                <td class="whitespace-nowrap py-3 px-5 md:py-5 md:px-10 hidden md:table-cell">
                  <img :src="`https://images.cryptocompare.com/sparkchart/${item.CoinInfo.Name}/USD/latest.png`" alt="">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style scoped>

</style>