<script setup>
import { reactive, ref } from 'vue';
import Alerta from './components/Alerta.vue'
import Spinner from './components/Spinner.vue'
import Cotizacion from './components/Cotizacion.vue'
import List from './components/List.vue'
import useCrypto from './composables/useCrypto'

const { monedas, criptomonedas, isLoading, obtenerCotizacion, cotizacion, mostrarResultados } = useCrypto()

const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
})

const error = ref('')

const cotizarCripto = () => {
  // Validar que cotizar este lleno
  if(Object.values(cotizar).includes('')) {
    error.value = 'Todos los campos son obligatorios'
    setTimeout(() => {
      error.value = ''
    }, 3000)
    return
  }
  error.value = ''
  obtenerCotizacion(cotizar)
}
</script>

<template>
  <header class="bg-neutral-800 text-white pt-20 pb-10">
    <section class="container">
      <h1 class="text-2xl md:text-[2rem] border-b pb-5 border-neutral-700 font-bold">
        Cotizar
        <span class="text-orange-500">Criptomonedas</span>
      </h1>
      <div class="grid md:grid-cols-2 gap-10 mt-10 items-center">
        <Alerta v-if="error">
          {{ error }}
        </Alerta>
        <form class="bg-neutral-700 p-5 md:p-8 rounded-md shadow-lg grid gap-3" @submit.prevent="cotizarCripto">
          <div class="">
            <label for="moneda" class="text-sm opacity-50 block">Moneda:</label>
            <select v-model="cotizar.moneda" id="moneda">
              <option value="">Selecciona una opción</option>
              <option v-for="moneda in monedas" :value="moneda.codigo">
                {{ moneda.texto }}
              </option>
            </select>
          </div>
          <div class="campo">
            <label for="cripto" class="text-sm opacity-50 block">Criptomoneda:</label>
            <select v-model="cotizar.criptomoneda" id="cripto">
              <option value="">Selecciona una opción</option>
              <option v-for="cripto in criptomonedas" :value="cripto.CoinInfo.Name">
                {{ cripto.CoinInfo.FullName }}
              </option>
            </select>
          </div>
          <input type="submit" value="Cotizar" class="button">
        </form>
        <Spinner v-if="isLoading" />
        <Cotizacion v-if="mostrarResultados" :cotizacion="cotizacion" />
      </div>
    </section>
  </header>
  <List :criptomonedas="criptomonedas" :criptomonedasTotal="criptomonedas" />
</template>

