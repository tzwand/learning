import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { base64 } from './base64';
import { ExcelFilesService } from 'src/app/services/excelFiles/excel-files.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  constructor(private fileService:ExcelFilesService) { }

  ngOnInit() {
  }
  go(){
    alert("lllllllllll")
  }
  loadDocument(event, callback) {
    let name, type, nvBase64File;

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      debugger;
      if ((window as any).FileReader) {
    
        if(file.type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') == -1 )
        {
          alert("לא ניתן להעלות קבצים מסוג זה");
          return;
        }

       
        var fileReader = new FileReader();
        name = file.name;
        type = file.type;

        fileReader.onload = function (e) {
          nvBase64File = (e.target as any).result;
          if (callback) {
             callback.document = nvBase64File; callback.name = name; callback.type = type; }
          // if (callback) callback(nvBase64File,name);
        }
        fileReader.readAsDataURL(file);

      }
    }

  }
@ViewChild("LoadDocument") r:ElementRef



private convertData(data, isPost) {
  if (!(data instanceof Object) || data instanceof Date) {
    let prop = data;
    // parse string date
    if (
      isPost === false &&
      (prop instanceof String || typeof prop === "string") &&
      prop.indexOf("/Date(") > -1
    ) {
      let date = prop.substring(
        prop.indexOf("(") + 1,
        prop.indexOf("+") != -1 ? prop.indexOf("+") : prop.indexOf(")")
      );
      prop = new Date(parseInt(date));
    } else if (isPost && prop instanceof Date) {
      // convert to string date
      let d = Date.UTC(
        prop.getFullYear(),
        prop.getMonth(),
        prop.getDate(),
        prop.getHours(),
        prop.getMinutes()
      );
      prop =
        d.toString() === "NaN" || d === NaN
          ? null
          : "/Date(" +
          Date.UTC(
            prop.getFullYear(),
            prop.getMonth(),
            prop.getDate(),
            prop.getHours(),
            prop.getMinutes()
          ) +
          ")/";
    }
    return prop;
  }

  // parse array / object
  let isArr = data instanceof Array;
  let arrayData = [];
  let objectData = {};

  if (data) {
    Object.keys(data).forEach(key => {
      // dictionary
      if (
        !isPost &&
        isArr &&
        data[key] &&
        Object.keys(data[key]).length === 2 &&
        data[key].Key &&
        data[key].Value != null
      ) {
        arrayData[data[key].Key] = this.convertData(data[key].Value, isPost);
      } else if (isArr) {
        // array
        arrayData.push(this.convertData(data[key], isPost));
      } else {
        // object
        objectData[key] = this.convertData(data[key], isPost);
      }
    });
  }
  return isArr ? arrayData : objectData;
}
   global_image:any;
 globalReader:any;
 saveFile(){
   debugger;
let y:string=sessionStorage.getItem("mybase64File")
 
let j=  sessionStorage.getItem("fileNeme") 
let userName= sessionStorage.getItem("donorName")
let d1:base64=new base64();
d1.base64=y;
this.fileService.saveExcelFile(j,userName,d1).subscribe((p)=>{alert("ברוך ה הצליח !");});

 }
//  downloadFile(){
//    this.fileService.downloadExcel();
//  }
 downloadFile(fileName: string) {
  this.fileService.postAndGetResponse(fileName).subscribe(fileData => {

    const blob: any = new Blob([fileData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    let link = document.createElement("a");

    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  );
}
 readURL(input) {

  
      this.global_image = input;
  
      let mybase64File = (input.target as any).result
      let fileNeme = input.target.files[0].name;
      sessionStorage.setItem("fileNeme",fileNeme) 
      if (input.target.files && input.target.files[0]) {
   
        var reader = new FileReader();

        let mybase64File = this.r.nativeElement.result;
        reader.onload = function (e) {

     
        
          mybase64File =(e.target as any).result


       sessionStorage.setItem("mybase64File",mybase64File) 
    
    }
    reader.readAsDataURL(input.target.files[0]);

       
  }
  }

}



   











