export class book {
    constructor(public BookId?: number,
                public BookName?: string,
                public Bookpayment?: number,
                public Bookinfo?: string,
                public AncestorId?:number,
                public ParentId?:number,
                public Children?: book[],
                public used?:boolean) { }
}
