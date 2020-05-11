import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { teams } from 'src/app/interfaces/teams';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  teamId: any;
  from: Date;
  to: Date;

  displayedColumns: string[] = [
    'capacidad',
    'entrenador',
    'estadio',
    'fundacion',
    'nacionalidad',
    'nombre',
    'sitioWeb',
    'valor',
    'edit',
    'delete'];

  data: teams[];

  constructor(
    private CRUD: CrudService,
    private router: Router
  ) {
    this.CRUD.getAllTeams().subscribe(
      (response: teams[]) => {
        this.data = response.map(
          (team) => {
            team.fundacion = new Date(team.fundacion);
            return team
          }
        )
      },
      error => {
        this.data = [];
        console.error(error);
      }
    )
  }

  ngOnInit(): void {
  }

  deleteTeam(id: number) {
    this.router.navigate(['delete', id])
  }

  edit(id: number) {
    this.router.navigate(['update', id])
  }

  searchById() {
    if (this.teamId != '' && this.teamId != undefined) {
      this.CRUD.getTeamById(this.teamId).subscribe((response: teams) => {
        response.fundacion = new Date(response.fundacion);
        this.data = [response];
      },
        error => {
          this.data = null;
          console.error(error);
        })

    }
  }

  searchByDates() {
    if (this.from != null && this.from != undefined && this.to != null && this.to != undefined) {
      let fromString: string = this.from.getDate() + '-' + (this.from.getMonth() + 1) + '-' + this.from.getFullYear();
      let toString: string = this.to.getDate() + '-' + (this.to.getMonth() + 1) + '-' + this.to.getFullYear();
      this.CRUD.getTeamByDates(fromString, toString).subscribe((response: teams[]) => {
        this.data = response.map(
          (team) => {
            team.fundacion = new Date(team.fundacion);
            return team
          }
        )
      },
      error => {
        this.data = [];
        console.error(error);
      })
    }
  }

}
