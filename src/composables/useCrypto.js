import { ref, onMounted, computed } from 'vue'

export default function useCrypto() {
const BASE_URL = 'https://min-api.cryptocompare.com/data'
  const monedas = ref([
    { codigo: 'PEN', texto: 'Sol Peruano'},
    { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
    { codigo: 'MXN', texto: 'Peso Mexicano'},
    { codigo: 'EUR', texto: 'Euro'},
    { codigo: 'GBP', texto: 'Libra Esterlina'},
  ])
  const criptomonedas = ref([])
  const isLoading = ref(false)
  const cotizacion = ref({})

  onMounted(async() => {
    const url = `${BASE_URL}/top/mktcapfull?limit=30&tsym=USD`
    const response = await fetch(url)
    const data = await response.json()
    criptomonedas.value = data.Data
  })

  const obtenerCotizacion = async (cotizar) => {
    try {
      isLoading.value = true
      const { moneda, criptomoneda } = cotizar
      const url = `${BASE_URL}/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
      const response = await fetch(url)
      const data = await response.json()
      cotizacion.value = data.DISPLAY[criptomoneda][moneda]
      isLoading.value = false
    } catch (error) {
      console.error(error)
    }
  }

  const mostrarResultados = computed(() => {
    return Object.values(cotizacion.value).length > 0 && !isLoading.value
  })

  return {
    monedas,
    criptomonedas,
    isLoading,
    cotizacion,
    obtenerCotizacion,
    mostrarResultados
  }
}