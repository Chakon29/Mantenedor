import { Component, OnInit } from '@angular/core';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // La propiedad se llama 'styleUrls' en lugar de 'styleUrl'
})
export class HomeComponent implements OnInit {
  listpersonas: Persona[] = [];
  loading: boolean = false;

  constructor(private _personaService: PersonaService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListPersonas()
  }

  getListPersonas() {
    this.loading =true;
    this._personaService.getListPersonas().subscribe((data: Persona[]) => {
      this.listpersonas = data;
      this.loading =false;
    })
  }


  deletePersona(id: number){
    this.loading = true;
    this._personaService.deletePersona(id).subscribe(() => {
      this.getListPersonas();
      this.toastr.warning('La persona ha sido eliminada satisfactoriamente', 'Persona eliminada')
    })
  }
}

