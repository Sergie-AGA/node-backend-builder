interface IDateProvider {
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
}

export { IDateProvider };
