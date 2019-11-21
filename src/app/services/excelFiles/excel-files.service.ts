import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {saveAs} from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ExcelFilesService {

  constructor(private http:HttpClient) { }
 
   public saveExcelFile(j,userName,d1):Observable<any>{
  return this.http.post<any>(environment.BASIC_URL+"api/File/SaveFileByBase64/"+j+"/"+userName+"/",d1);
}
public downloadExcel(){
saveAs(new Blob([],{ type: "pbrush" }),'LearnersExcelSheet.xlsx');
  // this.http.get(environment.BASIC_URL+'endpoint/', {responseType: "blob", headers: {'Accept': 'application/xlsx'}})
  // .subscribe(blob => {
  //   saveAs(blob, 'LearnersExcelSheet.xlsx');
  // });
}
postAndGetResponse(fileName) {
  return this.http.get(environment.BASIC_URL + '/api/TestExport/DownloadAttachment?fileName=' + fileName, { responseType: 'blob' as 'blob' });
}

}
