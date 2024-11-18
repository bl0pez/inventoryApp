import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://6y8bgi0q43.execute-api.us-east-2.amazonaws.com';

  constructor() { }

  insertCliente(cliente: any) {
    return axios.post(`${this.apiUrl}/clientes`, cliente, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  insertProducto(producto: any) {
    return axios.post(`${this.apiUrl}/productos`, producto, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  insertEnvio(envio: any) {
    return axios.post(`${this.apiUrl}/envios`, envio, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}
