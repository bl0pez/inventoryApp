import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  envio = {
    direccion: '',
    ciudad: '',
  };

  constructor(private apiService: ApiService, private alertController: AlertController) {}

  async insertEnvio() {
    if (this.envio.direccion && this.envio.ciudad) {
      try {
        const response = await this.apiService.insertEnvio({
          address: this.envio.direccion,
          city: this.envio.ciudad,
        });
        console.log('Envío insertado', response);
        this.resetForm();
        this.showAlert('Éxito', 'Envío insertado correctamente');
      } catch (error) {
        console.error('Error al insertar envío', error);
        this.showAlert('Error', 'Hubo un error al insertar el envío');
      }
    } else {
      console.error('Formulario no válido');
      this.showAlert('Error', 'Por favor, complete todos los campos');
    }
  }

  resetForm() {
    this.envio = {
      direccion: '',
      ciudad: '',
    };
    const envioForm = document.querySelector('form');
    if (envioForm) {
      envioForm.reset();
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
