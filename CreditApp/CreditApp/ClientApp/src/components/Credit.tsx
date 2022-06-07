import React, {useEffect, useState} from 'react';
import axios from "axios";
import {EmploymentEnum} from "../enums/EmploymentEnum";
import {PurposeEnum} from "../enums/PurposeEnum";
import {DepositEnum} from "../enums/DepositEnum";
import {
    AdultMax, AdultMin,
    AmountMax, AmountMin,
    NameMaxLength, NameMinLength,
    PassportIssuerMaxLength, PassportIssuerMinLength,
    PassportNumberLength,
    PassportRegInformationMaxLength, PassportRegInformationMinLength,
    PassportSeriesLength,
    PatronymicMaxLength, PatronymicMinLength,
    SurnameMaxLength, SurnameMinLength
} from "../constants/Constants";
import {IsCreditDtoValid} from "../Validator";
import {ICreditDto} from "../dto/ICreditDto";

export function Credit() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [passportSeries, setPassportSeries] = useState("")
    const [passportNumber, setPassportNumber] = useState<string>("")
    const [passportIssuer, setPassportIssuer] = useState("")
    const [passportIssueDate, setPassportIssueDate] = useState<Date>(new Date())
    const [passportRegInformation, setPassportRegInformation] = useState("")
    const [adult, setAdult] = useState<number>(0)
    const [isJudged, setJudging] = useState<boolean>(false)
    const [employment, setEmployment] = useState<EmploymentEnum>(EmploymentEnum.ContractLaborCodeRusFed)
    const [purpose, setPurpose] = useState<PurposeEnum>(PurposeEnum.Consumer)
    const [deposit, setDeposit] = useState<DepositEnum>(DepositEnum.None)
    const [carAge, setCarAge] = useState<number>(0)
    const [hasOtherCredits, setOtherCredits] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)

    const submitForm = async (e: any) => {
        e.preventDefault()
        let errorLabel = document.getElementsByClassName("errorLabel")[0];
        errorLabel.innerHTML = "&nbsp;";
        let dto: ICreditDto = {
            name: name,
            surname: surname,
            patronymic: patronymic,
            passportSeries: passportSeries,
            passportNumber: passportNumber,
            passportIssuer: passportIssuer,
            passportIssueDate: passportIssueDate,
            passportRegInformation: passportRegInformation,
            adult: adult,
            isJudged: isJudged,
            employment: employment,
            purpose: purpose,
            deposit: deposit,
            carAge: carAge,
            hasOtherCredits: hasOtherCredits,
            amount: amount
        };
        let result = IsCreditDtoValid(dto)
        if (result === true) {
            axios.post("credit/take", dto)
                .then(r => errorLabel.innerHTML = r.data)
                .catch(r => console.log(r));
        } else
            errorLabel.innerHTML = result;
    }

    return (
        <div>
            <form>
                <div className="d-flex align-items-center flex-column container">
                    <label>Фамилия</label>
                    <input className="w-25 mb-3"
                           value={surname}
                           minLength={SurnameMinLength}
                           maxLength={SurnameMaxLength}
                           onChange={(e) => setSurname(e.target.value)}/>

                    <label>Имя</label>
                    <input className="w-25 mb-3"
                           value={name}
                           minLength={NameMinLength}
                           maxLength={NameMaxLength}
                           onChange={(e) => setName(e.target.value)}/>

                    <label>Отчество</label>
                    <input className="w-25 mb-3"
                           value={patronymic}
                           minLength={PatronymicMinLength}
                           maxLength={PatronymicMaxLength}
                           onChange={(e) => setPatronymic(e.target.value)}/>

                    <label>Серия паспорта</label>
                    <input className="w-25 mb-3"
                           value={passportSeries}
                           maxLength={PassportSeriesLength}
                           onChange={(e) => {
                               let value = Number.parseInt(e.target.value);
                               if (!isNaN(value) || e.target.value === "")
                                   setPassportSeries(e.target.value)
                           }}/>

                    <label>Номер паспорта</label>
                    <input className="w-25 mb-3"
                           value={passportNumber}
                           maxLength={PassportNumberLength}
                           onChange={(e) => {
                               let result = Number.parseInt(e.target.value);
                               if (!isNaN(result) || e.target.value === "")
                                   setPassportNumber(e.target.value)
                           }}/>

                    <label>Кем выдан</label>
                    <input className="w-25 mb-3"
                           value={passportIssuer}
                           minLength={PassportIssuerMinLength}
                           maxLength={PassportIssuerMaxLength}
                           onChange={(e) => setPassportIssuer(e.target.value)}/>

                    <label>Дата выдачи</label>
                    <input className="w-25 mb-3"
                           type="date"
                           value={passportIssueDate.toISOString().split('T')[0]}
                           min="1900-01-01"
                           max="3000-01-01"
                           onChange={(e) => {
                               if (!isNaN(Date.parse(e.target.value)))
                                   setPassportIssueDate(new Date(e.target.value));
                           }}/>

                    <label>Информация о прописке</label>
                    <input className="w-25 mb-3"
                           minLength={PassportRegInformationMinLength}
                           maxLength={PassportRegInformationMaxLength}
                           value={passportRegInformation}
                           onChange={(e) => setPassportRegInformation(e.target.value)}/>

                    <label>Возраст</label>
                    <input className="w-25 mb-3"
                           value={adult}
                           maxLength={3}
                           onChange={(e) => {
                               let result = Number.parseInt(e.target.value);
                               if (!isNaN(result))
                                   setAdult(result)
                               if (e.target.value === "")
                                   setAdult(0)
                           }}/>

                    <label>Судимость</label>
                    <select className="w-25 mb-3"
                            onChange={(e) => {
                                if (e.target.value === "true")
                                    setJudging(true);
                                else
                                    setJudging(false);
                            }}>
                        <option value="false">Нет судимости</option>
                        <option value="true">Есть судимость</option>
                    </select>

                    <label>Трудоустройство</label>
                    <select className="w-25 mb-3"
                            onChange={(e) => {
                                let value = Number.parseInt(e.target.value);
                                switch (value) {
                                    case 0:
                                        setEmployment(EmploymentEnum.ContractLaborCodeRusFed);
                                        break;
                                    case 1:
                                        setEmployment(EmploymentEnum.IndividualEntrepreneur);
                                        break;
                                    case 2:
                                        setEmployment(EmploymentEnum.Freelancer);
                                        break;
                                    case 3:
                                        setEmployment(EmploymentEnum.Retiree);
                                        break;
                                    case 4:
                                        setEmployment(EmploymentEnum.Unemployed);
                                        break;
                                }
                            }}>
                        <option value="0">Трудоустроен по трудовому договору</option>
                        <option value="1">Собственное ИП</option>
                        <option value="2">Фрилансер</option>
                        <option value="3">Пенсионер</option>
                        <option value="4">Безработный</option>
                    </select>


                    <label>Цель</label>
                    <select className="w-25 mb-3"
                            onChange={(e) => {
                                let value = Number.parseInt(e.target.value);
                                switch (value) {
                                    case 0:
                                        setPurpose(PurposeEnum.Consumer);
                                        break;
                                    case 1:
                                        setPurpose(PurposeEnum.Realty);
                                        break;
                                    case 2:
                                        setPurpose(PurposeEnum.Recrediting);
                                        break;
                                }
                            }}>
                        <option value="0">Потребительский кредит</option>
                        <option value="1">Недвижимость</option>
                        <option value="2">Перекредитование</option>
                    </select>

                    <label>Залог</label>
                    <select className="w-25 mb-3"
                            onChange={(e) => {
                                let value = Number.parseInt(e.target.value);
                                switch (value) {
                                    case 0:
                                        setDeposit(DepositEnum.None);
                                        break;
                                    case 1:
                                        setDeposit(DepositEnum.Retiree);
                                        break;
                                    case 2:
                                        setDeposit(DepositEnum.Car);
                                        break;
                                    case 3:
                                        setDeposit(DepositEnum.Guarantee);
                                        break;
                                }
                            }}>
                        <option value="0">Без залога</option>
                        <option value="1">Недвижимость</option>
                        <option value="2">Автомобиль</option>
                        <option value="3">Поручительство</option>
                    </select>

                    <label>Возраст авто(учитывается, если в пункте "залог" выбран автомобиль)</label>
                    <input className="w-25 mb-3"
                           value={carAge}
                           maxLength={2}
                           onChange={(e) => {
                               let result = Number.parseInt(e.target.value);
                               if (!isNaN(result))
                                   setCarAge(result)
                               if (e.target.value === "")
                                   setCarAge(0)
                           }}/>

                    <label>Наличие других кредитов</label>
                    <select className="w-25 mb-3"
                            onChange={(e) => {
                                if (e.target.value === "true")
                                    setOtherCredits(true);
                                else
                                    setOtherCredits(false);
                            }}>
                        <option value="false">Нет</option>
                        <option value="true">Есть</option>
                    </select>

                    <label>Сумма</label>
                    <input className="w-25 mb-3"
                           value={amount}
                           maxLength={AmountMax.toString().length}
                           onChange={(e) => {
                               let result = Number.parseInt(e.target.value);
                               if (!isNaN(result))
                                   setAmount(result)
                               if (e.target.value === "")
                                   setAmount(0)
                           }}/>

                    <label className="errorLabel">&nbsp;</label>
                    <button className="mb-3" onClick={submitForm}>Отправить</button>
                </div>
            </form>
        </div>
    )
}