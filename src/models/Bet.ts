export default class Bet{
    constructor(
        public userId: string,
        public ticker: string,
        public startDate: Date,
        public endDate: Date,
        public amount: number
      ) {}  
}