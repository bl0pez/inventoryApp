import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  producto = {
    nombre: '',
    descripcion: '',
  };


  constructor(private apiService: ApiService, private alertController: AlertController) {}

  async insertProducto() {
    if (this.producto.nombre && this.producto.descripcion) {
      try {
        const response = await this.apiService.insertProducto({
          name: this.producto.nombre,
          description: this.producto.descripcion
        });
        console.log('Producto insertado', response);
        this.resetForm();
        this.showAlert('Éxito', 'Producto insertado correctamente');
      } catch (error) {
        console.error('Error al insertar producto', error);
        this.showAlert('Error', 'Hubo un error al insertar el producto');
      }
    } else {
      console.error('Formulario no válido');
      this.showAlert('Error', 'Por favor, complete todos los campos');
    }
  }

  resetForm() {
    this.producto = {
      nombre: '',
      descripcion: '',
    };
    const productoForm = document.querySelector('form');
    if (productoForm) {
      productoForm.reset();
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
