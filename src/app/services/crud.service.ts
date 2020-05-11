import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseURL: string;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.baseURL = 'https://services-prod.worldoffice.cloud/'
  }

  getAllTeams() {
    let url = this.baseURL + 'equipos/listar';
    return this.httpClient.get(url)
  }

  createTeam(newTeam: any) {
    let url = this.baseURL + 'equipos/crear';
    return this.httpClient.post(url, newTeam);
  }

  deleteTeam(teamId: number) {
    let url = this.baseURL + 'equipos/eliminar/' + teamId;
    return this.httpClient.delete(url);
  }

  getTeamById(teamId: number) {
    let url = this.baseURL + 'equipos/consultar/' + teamId;
    return this.httpClient.get(url)
  }

  getTeamByDates(from: string, to: string) {
    let url = this.baseURL + 'equipos/consultar/' + from + '/' + to;
    return this.httpClient.get(url)
  }

  updateTeamById(teamId: number, teamUpdated: any) {
    let url = this.baseURL + 'equipos/actualizar/' + teamId;
    return this.httpClient.put(url, teamUpdated)
  }

}
