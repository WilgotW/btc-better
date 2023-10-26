export default class Bet {
  constructor(
    public userId: number,
    public ticker: string,
    public startDate: Date,
    public endDate: Date,
    public amount: number
  ) {}
}
