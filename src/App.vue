<script setup>
import { reactive, ref, onMounted } from 'vue';
import Alerta from './components/Alerta.vue'

const monedas = ref([
  { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
  { codigo: 'MXN', texto: 'Peso Mexicano'},
  { codigo: 'EUR', texto: 'Euro'},
  { codigo: 'GBP', texto: 'Libra Esterlina'},
])
const criptomonedas = ref([])
const cotizar = reactive({
  moneda: '',
  criptomoneda: ''
})
const cotizacion = ref({})
const error = ref('')

onMounted(() => {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
  fetch(url)
    .then((response) => response.json())
    .then(({Data}) => criptomonedas.value = Data)
})

const cotizarCripto = () => {
  // Validar que cotizar este lleno
  if(Object.values(cotizar).includes('')) {
    error.value = 'Todos los campos son obligatorios'
    return
  }
  error.value = ''
  obtenerCotizacion()
}

const obtenerCotizacion = async () => {
  const { moneda, criptomoneda } = cotizar
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
  const response = await fetch(url)
  const data = await response.json()
  cotizacion.value = data.DISPLAY[criptomoneda][moneda]
}
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">
      Cotizador
      <span>Criptomonedas</span>
    </h1>
    <div class="contenido">
      <Alerta v-if="error">
        {{ error }}
      </Alerta>
      <form class="formulario" @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select v-model="cotizar.moneda" id="moneda">
            <option value="">Selecciona una opción</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">
              {{ moneda.texto }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select v-model="cotizar.criptomoneda" id="cripto">
            <option value="">Selecciona una opción</option>
            <option v-for="cripto in criptomonedas" :value="cripto.CoinInfo.Name">
              {{ cripto.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar">
      </form>
    </div>
  </div>
</template>

