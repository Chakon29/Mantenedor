import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-editagre',
  templateUrl: './editagre.component.html',
  styleUrls: ['./editagre.component.css']
})
export class EditagreComponent implements OnInit {
  form: FormGroup;
  id: number = 0; // Inicializamos id en el constructor
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut: ['', [Validators.required, this.validarRut.bind(this)]],
      sexo: ['', [Validators.required, this.validarSexo.bind(this)]],
      telefono: ['', [Validators.required, this.validarTelefono.bind(this)]],
      direccion: ['', [Validators.required, this.validarDireccion()]],
      fecha: ['', Validators.required],
      email: ['', [Validators.required, this.validarEmail()]]
    });

    this.obtenerNuevoId(); // Obtener un nuevo ID al inicializar el componente
  }

  ngOnInit(): void {
  }

  obtenerNuevoId() {
    // Implementa la lógica para obtener el nuevo ID basado en los datos existentes
    // Esta función debería obtener el último ID de tus datos existentes y generar un nuevo ID incrementado en uno
    const ultimoId = this.obtenerUltimoId(); // Supongamos que obtienes el último ID de tus datos existentes
    this.id = ultimoId + 1; // Genera un nuevo ID incrementado en uno

    // Actualiza el campo ID del formulario
    this.form.patchValue({
      id: this.id
    });
  }

  obtenerUltimoId() {
    // Implementa la lógica para obtener el último ID de tus datos existentes
    // Supongamos que aquí tienes la lógica para obtener el último ID de tus datos existentes
    // Por ahora, retornemos un valor de ejemplo
    return 1; // Retorna 1 como ejemplo
  }

  // Funciones de validación y otras funciones

  validarSexo(control: { value: string; }) {
    if (control.value === 'Masculino' || control.value === 'Femenino' || control.value === 'No') {
      return null; 
    } else {
      return { 'sexoInvalido': true }; 
    }
  }

  validarTelefono(control: { value: string; }) {
    const telefonoRegex = /^(?:2|9)\d{8}$/; 
    return telefonoRegex.test(control.value) ? null : { 'formatoTelefonoInvalido': true };
  }

  guardarPersona() {
    if (this.form.valid) {
      console.log('Persona guardada:', this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  validarDireccion() {
    return (control: AbstractControl) => {
      const direccion = control.value;
      const direccionRegex = /\b\d+\b.*,\s[a-zA-Z\s]+/;
      return direccionRegex.test(direccion) ? null : { 'direccionInvalida': true };
    };
  }

  validarEmail() {
    return (control: { value: string; }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (control.value.includes('@@') || control.value.includes('..')) {
        return { 'emailInvalido': true };
      }
      return emailRegex.test(control.value) ? null : { 'emailInvalido': true }; 
    };
  }

  validarRut(control: AbstractControl): { [key: string]: any } | null {
    const rutCompleto = control.value ? control.value.trim() : '';
    const rutRegex = /^\d{7,8}-[0-9kK]$/i; 

    if (!rutRegex.test(rutCompleto)) {
      return { 'formatoInvalido': true };
    }

    const rutSinDV = rutCompleto.slice(0, -2);
    const dvIngresado = rutCompleto.slice(-1).toUpperCase();
    const dvCalculado = this.calcularDV(rutSinDV); 

    if (dvIngresado !== dvCalculado) {
      return { 'dvInvalido': true };
    }

    return null; 
  }

  calcularDV(rutSinDV: string): string {
    let suma = 0;
    let multiplo = 2;

    for (let i = rutSinDV.length - 1; i >= 0; i--) {
      suma += parseInt(rutSinDV.charAt(i), 10) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dv = 11 - (suma % 11);
    return dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();
  }
  // Getters para acceder a los controles del formulario
  get nombre() {
    return this.form?.get('nombre');
  }

  get apellido() {
    return this.form?.get('apellido');
  }

  get sexo() {
    return this.form?.get('sexo');
  }

  get sexoInvalido() {
    return this.sexo?.invalid && (this.sexo?.dirty || this.sexo?.touched);
  }

  get telefono() {
    return this.form?.get('telefono');
  }

  get telefonoInvalido() {
    return this.telefono?.invalid && (this.telefono?.dirty || this.telefono?.touched);
  }

  get direccion() {
    return this.form?.get('direccion');
  }

  get direccionInvalida() {
    return this.direccion?.invalid && (this.direccion?.dirty || this.direccion?.touched);
  }

  get fecha() {
    return this.form?.get('fecha');
  }

  get fechaInvalida() {
    return this.fecha?.invalid && (this.fecha?.dirty || this.fecha?.touched);
  }

  get email() {
    return this.form?.get('email');
  }

  get emailInvalido() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched);
  }
}
