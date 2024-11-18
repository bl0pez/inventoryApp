import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  cliente = {
    nombre: '',
    correo: '',
    telefono: '',
  };
  
  constructor(private apiService: ApiService, private alertController: AlertController) {}

  async insertCliente() {
    if (this.cliente.nombre && this.cliente.correo && this.cliente.telefono) {
      try {
        const response = await this.apiService.insertCliente({
          name: this.cliente.nombre,
          email: this.cliente.correo,
          phone: this.cliente.telefono,
        });
        console.log('Cliente insertado', response);
        this.resetForm();
        this.showAlert('Éxito', 'Cliente insertado correctamente');
      } catch (error) {
        console.error('Error al insertar cliente', error);
        this.showAlert('Error', 'Hubo un error al insertar el cliente');
      }
    } else {
      console.error('Formulario no válido');
      this.showAlert('Error', 'Por favor, complete todos los campos');
    }
  }

  resetForm() {
    this.cliente = {
      nombre: '',
      correo: '',
      telefono: '',
    };
    const clienteForm = document.querySelector('form');
    if (clienteForm) {
      clienteForm.reset();
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
