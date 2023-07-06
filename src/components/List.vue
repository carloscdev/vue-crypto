<script setup>
import { computed, ref, watch } from 'vue';
const props = defineProps({
  criptomonedas: {
    type: Array,
    required: true
  }
})

const today = new Date()
const options = { year: 'numeric', month: 'short', day: 'numeric' };
const printDate = computed(() => {
  return 'Actualizado: ' + today.toLocaleDateString('es-ES', options)
})

const page = ref(1)
const offset = ref(5)
const total = computed(() => (props.criptomonedas.filter(item => buscarPorNombre(item)).length / offset.value).toFixed(0))

const cripto = ref('')

const buscarPorNombre = (item) => {
  return  item.CoinInfo.FullName.toLowerCase().includes(cripto.value.toLowerCase())
}

watch(cripto, () => page.value = 1)

const criptomonedasTotal = computed(() => {
  return props.criptomonedas.filter(item => buscarPorNombre(item)).slice((page.value - 1) * offset.value, page.value * offset.value)
})

const changePage = (type) => {
  if (type === 'less' && page.value > 1) {
    --page.value
  }
  if (type === 'more' && page.value < total.value) {
    ++page.value
  }
}
</script>

<template>
<main class="bg-gray rounded-xl p-8 text-neutral-600 col-start-1 shadow">
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full sm:px-6 lg:px-8">
        <h2>
          <span class="text-white font-bold text-xl">Lista de seguimiento</span>
          <span class="block">{{ printDate }}</span>
        </h2>
        <section class="grid md:grid-cols-2">
          <div class="campo my-5">
            <label for="search">Buscar</label>
            <input v-model="cripto" type="search" id="search" class="w-full">
          </div>
        </section>
        <div class="overflow-hidden">
          <table class="w-full text-left text-sm">
            <thead class="border-y text-neutral-600">
              <tr>
                <th scope="col" class="p-3 md:p-5 font-neutral">Nombre</th>
                <th scope="col" class="p-3 md:p-5 font-neutral">Precio</th>
                <th scope="col" class="p-3 md:p-5 font-neutral hidden md:table-cell">Más alto</th>
                <th scope="col" class="p-3 md:p-5 font-neutral hidden md:table-cell">Variación</th>
                <th scope="col" class="p-3 md:p-5 font-neutral hidden md:table-cell text-right">Gráfico</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in criptomonedasTotal"
                class="
                  transition duration-300 ease-in-out
                  hover:opacity-70 text-white
                ">
                <td class="max-w-[8rem] md:max-w-[12rem] p-3 md:p-5 flex items-center font-bold gap-2">
                  <img :src="`https://cryptocompare.com/${item.CoinInfo.ImageUrl}`" class="w-10" alt="Imagen Crypto" />
                  {{ item.CoinInfo.FullName }}
                  <span class="py-[0.1rem] px-2 text-[0.6rem] bg-dark text-primary rounded-sm">{{ item.CoinInfo.Name }}</span>
                </td>
                <td class="whitespace-nowrap p-3 md:p-5 font-neutral"><span class="text-[0.5rem]">USD</span> {{ item.RAW.USD.PRICE.toFixed(1) }}</td>
                <td class="whitespace-nowrap p-3 md:p-5 hidden md:table-cell font-neutral"><span class="text-[0.5rem]">USD</span> {{ item.RAW.USD.HIGHDAY.toFixed(1) }}</td>
                <td class="whitespace-nowrap p-3 md:p-5 hidden md:table-cell font-neutral" :class="item.DISPLAY.USD.CHANGEPCT24HOUR >= 0 ? 'text-green-700' : 'text-red-600'">
                  {{ item.DISPLAY.USD.CHANGEPCT24HOUR }}%
                </td>
                <td class="whitespace-nowrap p-3 md:p-5 hidden md:table-cell text-right">
                  <img :src="`https://images.cryptocompare.com/sparkchart/${item.CoinInfo.Name}/USD/latest.png`" alt="Crypto Chart" class="ml-auto w-28">
                </td>
              </tr>
            </tbody>
          </table>
          <section class="mt-5 text-sm flex items-center justify-between">
            <div>
              Página {{ page }} de {{ total }}
            </div>
            <div class="flex items-center gap-3">
              <div @click="changePage('less')" class="h-8 w-8 grid place-content-center hover:bg-primary hover:text-white rounded cursor-pointer border border-neutral-600"><i class="fa-solid fa-chevron-left"></i></div>
              <div @click="changePage('more')" class="h-8 w-8 grid place-content-center hover:bg-primary hover:text-white rounded cursor-pointer border border-neutral-600"><i class="fa-solid fa-chevron-right"></i></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</main>
</template>
