export class offer{

    // constructor(public BookName?:string,  public reqId?:number,public reqPurpose ?:string,
    // public BookId?:number,public timeId?:number,public reqStartDate?:Date,
    // public reqEndDate?:Date,public payment?:number,public extraInfo?:string,public timeDesc?:string){}

//we will create more than one req/offer if there ids more than one book id to genarate a req from
    constructor(public BookId?: number,//from table in book comp
       public BookName?:string , //from table in book comp
      public donorName?: string,//from session storage/ login
       public donorEmail?: string,//from session storage/ login
       public extraInfo?:string,//from purpose/final screen
      public genderId?:string, //from group comp
      public occuptionId ?:number,//from group comp
      public password? :string ,//from session storage/ login
      public payment?:number,//from the updated table in book comp
      public registerEndDate?:Date,//need to add it in time comp
       public reqEndDate?:Date, //from range calander
       public reqId?: number, //auto create -- how
       public reqPurpose?:string, //from purpose comp
      public reqStartDate?:Date, //from range calender
     
      public sosDate?:Date, //from payments
      public sosPayment?:number, //from payments boolean
      public timeDesc?:string, //from time comp
      public timeId?:number //generate from select

     ) {}
    }
           
      
      
      
      
      
     
      

      

        
      
     
      

       
        
    
      














