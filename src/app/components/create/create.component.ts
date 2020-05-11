import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private CRUD: CrudService,
    private router: Router) {
    this.form = this.fb.group({
      'capacidad': [],
      'entrenador': [],
      'estadio': [],
      'fundacion': [],
      'nacionalidad': [],
      'nombre': [],
      'sitioWeb': [],
      'valor': [],
    })
  }

  ngOnInit(): void {
  }

  create() {
    this.CRUD.createTeam(this.form.value).subscribe(resp => {
      this.router.navigate(['read'])
    }, err => {
      console.error(err)
    })
  }

}
