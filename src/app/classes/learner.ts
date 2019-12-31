import { person } from "./person";

export class learner extends person {
   public learnerId?: number;
    public learnerName: string;
    public gender: string;
    public occuptionName: string;
    public sosRequests: boolean;
    public startDate: Date;
    public endDate: Date;
    public groupId: number;
    public wantsToJoin: boolean;

    constructor(public learnerEmail: string,
        public password: string ,learnerId, name) {
        super(learnerEmail, password);
        this.startDate = new Date(Date.now());
        this.sosRequests = false;
        this.learnerName=name;
        this.learnerId=learnerId;
    }
}


