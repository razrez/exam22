import {
    AdultMax,
    AdultMin,
    AmountMax,
    AmountMin,
    CarAgeMax,
    CarAgeMin,
    NameMaxLength,
    NameMinLength,
    PassportIssuerMaxLength,
    PassportIssuerMinLength,
    PassportNumberLength,
    PassportRegInformationMaxLength,
    PassportRegInformationMinLength,
    PassportSeriesLength,
    PatronymicMaxLength,
    PatronymicMinLength,
    SurnameMaxLength,
    SurnameMinLength
} from "./constants/Constants";
import {ICreditDto} from "./dto/ICreditDto";
import {DepositEnum} from "./enums/DepositEnum";

export const IsNameValid = (value: string) =>
    NameMinLength <= value.length && value.length <= NameMaxLength;
export const IsSurnameValid = (value: string) =>
    SurnameMinLength <= value.length && value.length <= SurnameMaxLength;
export const IsPatronymicValid = (value: string) =>
    value === undefined || PatronymicMinLength <= value.length && value.length <= PatronymicMaxLength;

export const IsPassportSeriesValid = (value: string) =>
    value.length === PassportSeriesLength;
export const IsPassportNumberValid = (value: string) =>
    value.length === PassportNumberLength;
export const IsPassportIssuerValid = (value: string) =>
    PassportIssuerMinLength <= value.length && value.length <= PassportIssuerMaxLength;
export const IsPassportRegInformationValid = (value: string) =>
    PassportRegInformationMinLength <= value.length && value.length <= PassportRegInformationMaxLength;

export const IsCarAgeValid = (value: number) =>
    CarAgeMin <= value && value <= CarAgeMax;

export const IsAdultValid = (value: number) =>
    AdultMin <= value && value <= AdultMax;

export const IsAmountValid = (value: number) =>
    AmountMin <= value && value <= AmountMax;

export function IsCreditDtoValid(dto: ICreditDto) {
    if (!IsSurnameValid(dto.surname))
        return `Неверная фамилия. Допустимая длина от ${SurnameMinLength} до ${SurnameMaxLength}`;
    if (!IsNameValid(dto.name))
        return `Неверное имя. Допустимая длина от ${NameMinLength} до ${NameMaxLength}`;
    if (!IsPatronymicValid(dto.patronymic))
        return `Неверное отчество Допустимая длина до ${PatronymicMaxLength}`;
    if (!IsPassportSeriesValid(dto.passportSeries))
        return `Неверная серия паспорта. Допустимая длина ${PassportSeriesLength}`;
    if (!IsPassportNumberValid(dto.passportNumber))
        return `Неверный номер паспорта. Допустимая длина ${PassportNumberLength}`;
    if (!IsPassportIssuerValid(dto.passportIssuer))
        return `Неверный \"кем выдан\". Допустимая длина от ${PassportIssuerMinLength} до ${PassportIssuerMaxLength}`;
    if (dto.passportIssueDate > new Date())
        return "Дата выдачи не может быть больше текущей, потому что у вас нет машины времени";
    if (!IsPassportRegInformationValid(dto.passportRegInformation))
        return `Неверная информация о прописке. 
        Допустимая длина от ${PassportRegInformationMinLength} до ${PassportRegInformationMaxLength}`;
    if (!IsCarAgeValid(dto.carAge) && dto.deposit === DepositEnum.Car)
        return `Неверный возраст автомобиля. Он должен быть от ${CarAgeMin} до ${CarAgeMax}`;
    if (!IsAdultValid(dto.adult))
        return `Ваш возраст не подходит для получения кредита. Мы выдаем кредит только лицам от ${AdultMin} до ${AdultMax}`;
    if (!IsAmountValid(dto.amount))
        return `Введенная сумма не подходит для получения кредита. Мы выдаем только от ${AmountMin} до ${AmountMax}`;
    return true;
}


