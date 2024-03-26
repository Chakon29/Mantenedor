import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StringExpression } from 'mongoose';

@Component({
  selector: 'app-editagre',
  templateUrl: './editagre.component.html',
  styleUrls: ['./editagre.component.css']
})
export class EditagreComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: String = 'Agregar ';
  constructor(private fb: FormBuilder,
    private _personaService: PersonaService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
     this.form =  this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      rut: ['', [Validators.required,  this.validarRut.bind( this)]],
      sexo: ['', [Validators.required,  this.validarSexo.bind( this)]],
      telefono: ['', [Validators.required,  this.validarTelefono.bind( this)]],
      direccion: ['', [Validators.required,  this.validarDireccion()]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required,  this.validarEmail()]]
    });
    this.id = Number(aRoute.snapshot.paramMap.get('id'));
  }
  

  ngOnInit(): void {

    if(this.id !=0){
      this.operacion = 'Editar ';
      this.getPersona(this.id);
    }
  }
  
  getPersona(id: number){
    this.loading = true;
    this._personaService.getPersona(id).subscribe((data:Persona) => {
      this.loading =false;
      this.form.setValue({
        nombre:  data.nombre,
        apellido: data.apellido,
        rut: data.rut,
        sexo: data.sexo,
        telefono: data.telefono,
        direccion: data.direccion,
        fechaNacimiento: data.fechaNacimiento,
        email: data.email
      })
    }) 
  }

  guardarPersona() {

    const persona: Persona ={
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      rut: this.form.value.rut,
      sexo: this.form.value.sexo,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
      fechaNacimiento: this.form.value.fechaNacimiento,
      email: this.form.value.email
    }
    if(this.id !==0) {
      this.loading = true;
      persona.id = this.id
      this._personaService.updatePresona(this.id, persona).subscribe(() => {
        this.loading = false;
        this.toastr.success('')
        this.toastr.success(`Los datos de la persona ${persona.nombre} han sido actualizados con éxito`, 'Datos Actualizados');
        this.router.navigate(['/']);
      })

    } else {
      this.loading = true;
this._personaService.savePersona(persona).subscribe(
  () => {
    this.loading = false;
    this.toastr.success(`La persona ${persona.nombre} ha sido registrada con éxito`, 'Persona registrada');
    this.router.navigate(['/']);
  },
  (error: any) => {
    this.loading = false;
    if (error.status === 400) {
      this.toastr.error('La persona ingresada ya existe dentro del mantenedor', 'Error');
    }
  }
);
    }


    

  }
  // Funciones de validación y otras funciones

  validarNombre(control: { value: string; }) {
    const nombreRegex = /^[a-zA-Z ]*$/;
    return nombreRegex.test(control.value) ? null : { 'formatoNombreInvalido': true };
  }
  
  validarApellido(control: { value: string; }) {
    const apellidoRegex = /^[a-zA-Z ]*$/;
    return apellidoRegex.test(control.value) ? null : { 'formatoApellidoInvalido': true };
  }

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
    const dvCalculado =  this.calcularDV(rutSinDV); 

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
  
  get nombreInvalido() {
    return this.nombre?.invalid && (this.nombre?.dirty || this.nombre?.touched);
  }
  
  get apellido() {
    return this.form?.get('apellido');
  }
  
  get apellidoInvalido() {
    return this.apellido?.invalid && (this.apellido?.dirty || this.apellido?.touched);
  }

  get sexo() {
    return  this.form?.get('sexo');
  }

  get sexoInvalido() {
    return  this.sexo?.invalid && ( this.sexo?.dirty ||  this.sexo?.touched);
  }

  get telefono() {
    return  this.form?.get('telefono');
  }

  get telefonoInvalido() {
    return  this.telefono?.invalid && ( this.telefono?.dirty ||  this.telefono?.touched);
  }

  get direccion() {
    return  this.form?.get('direccion');
  }

  get direccionInvalida() {
    return  this.direccion?.invalid && ( this.direccion?.dirty ||  this.direccion?.touched);
  }

  get fecha() {
    return  this.form?.get('fecha');
  }

  get fechaInvalida() {
    return  this.fecha?.invalid && ( this.fecha?.dirty ||  this.fecha?.touched);
  }

  get email() {
    return  this.form?.get('email');
  }

  get emailInvalido() {
    return  this.email?.invalid && ( this.email?.dirty ||  this.email?.touched);
  }
}
