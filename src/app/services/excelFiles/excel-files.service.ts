import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ExcelFilesService {

  constructor(private http:HttpClient) { }
 
   public saveExcelFile(j,d1):Observable<any>{
  return this.http.post<any>(environment.BASIC_URL+"api/File/SaveFileByBase64/"+j+"/",d1);
}
}
