import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { teams } from 'src/app/interfaces/teams';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  teamId: number;

  constructor(private fb: FormBuilder,
    private CRUD: CrudService,
    private router: Router,
    private route: ActivatedRoute) {
    this.form = this.fb.group({
      'capacidad': [],
      'entrenador': [],
      'estadio': [],
      'fundacion': [],
      'nacionalidad': [],
      'nombre': [],
      'sitioWeb': [],
      'valor': [],
    });
    this.teamId = Number(this.route.snapshot.paramMap.get('id'));

    this.CRUD.getTeamById(this.teamId).subscribe(
      (res: teams) => {
        res.fundacion = new Date(res.fundacion);
        this.form.patchValue(res);
      },
      err => {
        console.error(err)
      }
    )
  }

  ngOnInit(): void {
  }

  update() {
    this.CRUD.updateTeamById(this.teamId,this.form.value).subscribe(resp => {
      this.router.navigate(['read'])
    }, err => {
      console.error(err)
    })
  }

}
