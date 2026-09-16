import { MongoClient, ObjectId } from 'mongodb';

// Esta es la capa donde se persisten los datos
const MONGO_URI = "mongodb://localhost:27017/";
const DB_NAME = "pizzeria";
const COLLECTION_NAME = "pizzas";

let client;

/**
 * Función auxiliar para conectar a la base de datos y reutilizar la conexión.
 * @returns {Promise<import('mongodb').Db>} La instancia de la base de datos.
 */
async function getDb() {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client.db(DB_NAME);
}

/**
 * Regresa una lista de todas las pizzas almacenadas en la base de datos.
 * No recibe parámetros.
 * @returns {Promise<Array>} Un arreglo de objetos con los datos de las pizzas.
 */
export async function obtenerTodasLasPizzasAsync() {
    const db = await getDb();
    const pizzas = await db.collection(COLLECTION_NAME).find({}).toArray();
    return pizzas;
}

/**
 * Regresa la pizza del id buscado o null si no la encuentra.
 * @param {string} id - El identificador único de la pizza (en formato string).
 * @returns {Promise<Object|null>} El objeto de la pizza encontrada o null.
 */
export async function obtenerPizzaPorIdAsync(id) {
    const db = await getDb();
    // Convertimos el id de string a ObjectId que es el formato que usa Mongo
    const pizza = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
    return pizza;
}

/**
 * Agrega una nueva pizza a la base de datos.
 * @param {Object} pizza - El objeto con los datos de la pizza (ej. nombre, descripción).
 * @returns {Promise<Object>} Un objeto que incluye el _id de la pizza insertada.
 */
export async function agregarPizzaAsync(pizza) {
    const db = await getDb();
    const resultado = await db.collection(COLLECTION_NAME).insertOne(pizza);
    return resultado;
}

/**
 * Actualiza los datos de una pizza existente en la base de datos.
 * @param {string} id - El identificador único de la pizza a actualizar.
 * @param {Object} pizzaActualizada - Objeto con los nuevos datos a sobreescribir.
 * @returns {Promise<Object>} El resultado de la operación de actualización.
 */
export async function actualizarPizzaAsync(id, pizzaActualizada) {
    const db = await getDb();
    const resultado = await db.collection(COLLECTION_NAME).updateOne(
        { _id: new ObjectId(id) },
        { $set: pizzaActualizada }
    );
    return resultado;
}

/**
 * Elimina una pizza de la base de datos por su id.
 * @param {string} id - El identificador único de la pizza a eliminar.
 * @returns {Promise<Object>} El resultado de la operación de eliminación.
 */
export async function eliminarPizzaAsync(id) {
    const db = await getDb();
    const resultado = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    return resultado;
}
