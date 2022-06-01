import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private apiKey    : string = "QR3DcfIYIqhlPEmmbJ7I8B5Am3XKPIvx";

  public resultados: Gif [] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

  }

  buscarGifs ( query: string) {
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);   
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    console.log(this._historial);
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=QR3DcfIYIqhlPEmmbJ7I8B5Am3XKPIvx&q=${query}`)
      .subscribe((resp ) => {
        console.log(resp.data);
        this.resultados = resp.data;
      });
  }
}
