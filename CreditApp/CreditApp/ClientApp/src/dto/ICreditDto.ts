import {EmploymentEnum} from "../enums/EmploymentEnum";
import {PurposeEnum} from "../enums/PurposeEnum";
import {DepositEnum} from "../enums/DepositEnum";

export interface ICreditDto {
    name: string;
    surname: string;
    patronymic: string;
    passportSeries: string;
    passportNumber: string;
    passportIssuer: string;
    passportIssueDate: Date;
    passportRegInformation: string;
    adult: number;
    isJudged: boolean;
    employment: EmploymentEnum;
    purpose: PurposeEnum;
    deposit: DepositEnum;
    carAge: number;
    hasOtherCredits: boolean;
    amount: number;
}