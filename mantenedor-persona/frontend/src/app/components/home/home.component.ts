import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/persona';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // La propiedad se llama 'styleUrls' en lugar de 'styleUrl'
})
export class HomeComponent implements OnInit {
  listpersonas: Persona[] = [
    {
      id: '1',
      nombre: 'Juan',
      apellido: 'Perez',
      rut: '12345678-9',
      sexo: 'Masculino',
      telefono: '+56912345678',
      direccion: 'Calle 123',
      fechaNacimiento: new Date('1990-01-01'),
      email: 'juan@example.com'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  agregarPersona() {
    const nuevaPersona: Persona = {
      id: (this.listpersonas.length + 1).toString(), // Asignación automática del ID
      nombre: '',
      apellido: '',
      rut: '',
      sexo: '',
      telefono: '',
      direccion: '',
      fechaNacimiento: new Date(),
      email: ''
    };
    
    this.listpersonas.push(nuevaPersona);
  }
}

