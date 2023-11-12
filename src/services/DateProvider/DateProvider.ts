import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/dayjsDateProvider";

export class DateProvider extends DayjsDateProvider implements IDateProvider {}
