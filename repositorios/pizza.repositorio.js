//Esta es la capa donde se persisten los datos

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let pizzas = [{ id: 1, nombre: "Hawaiina", descripcion: "Jamon y piña" }]
/**
 * Regresa una lista de las pizzas
 * @returns []
 */
export async function obtenerTodasLasPizzasAsync() {
   await sleep(2000)

   return  pizzas
}

/**
 * Regresa la pizza del id buscado o undefined si no lo encuentra
 * @param {*} id 
 */
export async function obtenerPizzaPorIdAsync(id) {
   await sleep(1000)

   const pizza = pizzas.find(x => x.id == id)

   return pizza
}

export async function agregarPizzaAsync(pizza) {
   await sleep(1000)
   pizzas.push(pizza)
}