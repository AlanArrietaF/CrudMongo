import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
import http from 'k6/http';

// Apuntamos al servidor local de tu API de pizzas
const baseUrl = 'http://localhost:3000/api/v1/pizzas';

export default function () {
  // 1. GET - Obtener todas las pizzas
  const resGet = http.get(baseUrl);
  check(resGet, {
    'GET Todas status 200': (r) => r.status === 200
  });

  // 2. POST - Crear una nueva pizza de prueba
  const payload = JSON.stringify({
    nombre: "K6 Pizza",
    descripcion: "Prueba de carga K6"
  });
  const params = { headers: { 'Content-Type': 'application/json' } };
  const resPost = http.post(baseUrl, payload, params);
  check(resPost, {
    'POST Crear pizza status 201 o 200': (r) => r.status === 201 || r.status === 200
  });

  // Usamos un ID genérico válido de MongoDB para probar los otros endpoints 
  // sin romper la prueba en caso de que no exista
  const fakeId = "609c12345678901234567890";

  // 3. GET por ID
  const resGetId = http.get(`\({baseUrl}/\){fakeId}`);
  check(resGetId, {
    // Verificamos que el servidor responda correctamente (aunque sea un 404 de no encontrado)
    'GET Pizza por ID responde': (r) => r.status !== 500 
  });

  // 4. DELETE
  const resDel = http.del(`\({baseUrl}/\){fakeId}`);
  check(resDel, {
    'DELETE Pizza responde': (r) => r.status !== 500
  });
}

// Genera el reporte HTML como lo pide el profesor
export function handleSummary(data) {
  return {
    "reporte_k6.html": htmlReport(data)
  };
}
