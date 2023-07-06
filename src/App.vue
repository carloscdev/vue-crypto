<script setup>
import { reactive, ref, onMounted } from 'vue';
import Alerta from './components/Alerta.vue'
import Spinner from './components/Spinner.vue'
import Cotizacion from './components/Cotizacion.vue'
import List from './components/List.vue'
import Loader from './components/Loader.vue'
import Navbar from './components/Navbar.vue'
import useCrypto from './composables/useCrypto'

const { monedas, criptomonedas, isLoading, obtenerCotizacion, cotizacion, mostrarResultados } = useCrypto()

const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
})

const error = ref('')
const loader = ref(true)

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

onMounted(() => {
  setTimeout(() => loader.value = false, 3500)
})
</script>

<template>
<Transition name="fade">
<Loader v-if="loader" />
<div v-else>
  <Navbar />
  <div class="grid md:grid-cols-[1fr,0.5fr] container gap-5 py-10">
    <header class="text-white md:col-start-2 md:row-start-1">
      <section class="bg-gray p-8 rounded-xl shadow">
        <div class="grid gap-5 items-center">
          <h2>
            <span class="text-white font-bold text-xl">Cotizador</span>
            <span class="block text-neutral-600">En tiempo real</span>
          </h2>
          <Alerta v-if="error">
            {{ error }}
          </Alerta>
          <form class="grid gap-3" @submit.prevent="cotizarCripto">
            <div class="campo">
              <label for="cripto">Criptomoneda:</label>
              <select v-model="cotizar.criptomoneda" id="cripto" class="w-full">
                <option value="" hidden></option>
                <option v-for="cripto in criptomonedas" :value="cripto.CoinInfo.Name">
                  {{ cripto.CoinInfo.FullName }}
                </option>
              </select>
            </div>
            <div class="text-center text-neutral-500"><i class="fa-solid fa-repeat"></i></div>
            <div class="campo">
              <label for="moneda">Moneda:</label>
              <select v-model="cotizar.moneda" id="moneda" class="w-full">
                <option value="" hidden></option>
                <option v-for="moneda in monedas" :value="moneda.codigo">
                  {{ moneda.texto }}
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
  </div>
</div>
</Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>