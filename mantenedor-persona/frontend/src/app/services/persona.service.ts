// persona.service.ts
import { Injectable } from '@angular/core';
import { Persona } from '../interfaces/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor() { }

  obtenerPersonas(): Persona[] {
    return [
      {
        nombre: 'Juan',
        apellido: 'Perez',
        rut: '12345678-9',
        sexo: 'Masculino',
        telefono: '+56912345678',
        direccion: 'Calle 123',
        fechaNacimiento: new Date('1990-01-01'),
        email: 'juan@example.com'
      },
      // Otras personas...
    ];
  }
}
