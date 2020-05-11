import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  teamId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private CRUD: CrudService) {
    this.teamId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

  deleteTeam() {
    this.CRUD.deleteTeam(this.teamId).subscribe(
      res => {
        this.router.navigate(['read']);
      },
      err => {
        console.error(err);
      }
    )
  }

}
