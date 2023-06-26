import { SERVER_API_URL, TOKEN } from "../config/api.constants";

/**
 * @class Fetch
 * @description Clase para gestionar las peticiones HTTP a la API mediante token
 * @example
 * const response = await Fetch.get();
 * const response = await Fetch.post(body);
 * const response = await Fetch.update(body, id);
 * const response = await Fetch.delete(id);
 *
 * @returns {Promise} Devuelve un objeto Promise
 */
export default class Fetch {
  /**
   * @method get
   * @description Método para realizar una petición GET a la API
   * @example
   * const response = await Fetch.get();
   *
   * @returns {Promise} Devuelve un objeto Promise
   */
  static async get() {
    const response = await fetch(`${SERVER_API_URL}`, {
      headers: {
        "auth-token": TOKEN,
      },
    });
    // manejar error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  /**
   * @method post
   * @description Método para realizar una petición POST a la API
   * @param {Object} body Objeto con los datos a enviar
   * @example
   * const response = await Fetch.post(body);
   *
   * @returns {Promise} Devuelve un objeto Promise
   */
  static async post(body) {
    const response = await fetch(`${SERVER_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": TOKEN,
      },
      body: JSON.stringify(body),
    });
    // manejar error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  /**
   * @method update
   * @description Método para realizar una petición PATCH a la API
   * @param {Object} body Objeto con los datos a enviar
   * @param {string} id Identificador del recurso a actualizar
   * @example
   * const response = await Fetch.update(body, id);
   *
   * @returns {Promise} Devuelve un objeto Promise
   */
  static async update(body, id) {
    const response = await fetch(`${SERVER_API_URL}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": TOKEN,
      },
      body: JSON.stringify(body),
    });
    // manejar error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
  /**
   * @method delete
   * @description Método para realizar una petición DELETE a la API
   * @param {string} id Identificador del recurso a eliminar
   * @example
   * const response = await Fetch.delete(id);
   *
   * @returns {Promise} Devuelve un objeto Promise
   */
  static async delete(id) {
    const response = await fetch(`${SERVER_API_URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": TOKEN,
      },
    });
    // manejar error
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }
}