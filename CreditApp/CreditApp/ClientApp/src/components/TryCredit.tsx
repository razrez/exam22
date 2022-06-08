import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import {EmploymentEnum} from "../enums/EmploymentEnum";
import {PurposeEnum} from "../enums/PurposeEnum";
import {DepositEnum} from "../enums/DepositEnum";
import axios from "axios";

type UserSubmit = {
    fullname: string; // ФИО
    passportSeries: number; // серия
    passportNumber: number; // номер
    passportIssuer: string; // кем выдан
    passportIssueDate: Date; // дата выдачи
    passportRegistrationPlace: string; // информация о прописке
    age: number; // Возраст
    hasCrimeCertificate: boolean; // Есть справка о наличии судимости
    employment: EmploymentEnum; // 
    purpose: PurposeEnum; // Цель
    deposit: DepositEnum; // Залог
    carAge: number; // Возраст авто учитывается, если вид залога - машина
    alreadyHasCredits: boolean; // Есть другие кредиты?
    credit: number; //Сумма кредита
};

const TryCredit: React.FC = () => {

    //My validation schema
    const schema = Yup.object().shape({
        fullname: Yup.string()
            .required('ФИО необходимо')
            .min(3, 'ФИО должно иметь как минимум 3 символа')
            .max(60, "для ФИО допустимо не больше 40 символов"),
        passportSeries: Yup.number()
            .required('серия необходима')
            .min(1, 'серия должна быть как минимум больше 1 ')
            .max(999, 'для серии паспорта допустимо не больше 3 символов'),
        passportNumber: Yup.number()
            .required('номер необходим')
            .min(1, 'серия должна иметь как минимум 1 символ')
            .max(999999, 'для серии паспорта допустимо не больше 6 символов'),
        passportIssuer: Yup.string()
            .required('необходимо указать кем выдан пасспорт')
            .min(2,'хотя бы 2 символа')
            .max(100, 'максимум 100 символов'),
        passportIssueDate: Yup.date()
            .required('укажите дату выдачи')
            .min(new Date('1850-12-12'))
            .max(new Date('2228-02-08')),
        passportRegistrationPlace: Yup.string()
            .required('укажите место прописки')
            .min(3)
            .max(60),
        age: Yup.number()
            .required()
            .min(21, 'кредит выдаётся лицам, достигшим возраст 21 года')
            .max(150, 'введите реальный возраст'),
        hasCrimeCertificate: Yup.bool().required(),
        employment: Yup.number().required(),
        purpose: Yup.number().required(),
        deposit: Yup.number().required(),
        carAge: Yup.number()
            .notRequired(),
        alreadyHasCredits: Yup.bool().required(),
        credit: Yup.number()
            .required('серия необходима')
            .positive('укажите сумму больше 0')
            
    });
    
    //передаем правила валидации хуку useForm, используя yupResolver()
    //хук useForm возвращает объект
    const {
        register, //register inputs
        handleSubmit, //handle form submit
        reset, //reset the form
        formState: { errors } //contains errors
    } = useForm<UserSubmit>({
        resolver: yupResolver(schema)
    });

    //когда форма валидна и отправлена, вызывается onSubmit() и данные логируются
    const onSubmit = async (data: UserSubmit) => {
        let result = document.getElementsByClassName("result")[0];
        result.innerHTML = "&nbsp;";
        console.log(data);
        axios.post("give/credit", data)
            .then((r) => result.innerHTML = r.data['result'])
            .catch(r => console.log(r));
    };
    
    //очищение результата формы и всех полей формы
    const clearResult = async () =>{
        let result = await document.getElementsByClassName("result")[0];
        result.innerHTML = "&nbsp;";
        await reset();
    };
    
    return (
        <div className="register-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="form-group">
                    <label>ФИО</label>
                    <input
                        placeholder={'Фамилия Имя Отчество'}
                        type="text"
                        {...register('fullname')}
                        className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} //проверка на валидность
                    />
                    <div className="invalid-feedback">{errors.fullname?.message}</div>
                </div>
                
                <div className="form-group">
                    <label>Серия паспорта</label>
                    <input 
                        type="number"
                        defaultValue={228}
                        {...register('passportSeries')}
                        className={`form-control ${errors.passportSeries ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.passportSeries?.message}</div>
                </div>
                
                <div className="form-group">
                    <label>Номер паспорта</label>
                    <input
                        type="number"
                        defaultValue={22228}
                        {...register('passportNumber')}
                        className={`form-control ${errors.passportNumber ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.passportNumber?.message}</div>
                </div>
                
                <div className="form-group">
                    <label>Кем выдан</label>
                    <input
                        type="text"
                        {...register('passportIssuer')}
                        className={`form-control ${errors.passportIssuer ? 'is-invalid' : ''}`} //проверка на валидность
                    />
                    <div className="invalid-feedback">{errors.passportIssuer?.message}</div>
                </div>
                
                <div className="form-group">
                    <label>Дата выдачи паспорта</label>
                    <input
                        type="date"
                        defaultValue={'2014-12-12'}
                        min="1850-12-12"
                        max="2228-02-08"
                        {...register('passportIssueDate')}
                        className={`form-control ${errors.passportIssueDate ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{''}</div>
                </div>

                <div className="form-group">
                    <label>Информация о прописке</label>
                    <input
                        type="text"
                        {...register('passportRegistrationPlace')}
                        className={`form-control ${errors.passportRegistrationPlace ? 'is-invalid' : ''}`} //проверка на валидность
                    />
                    <div className="invalid-feedback">{errors.passportRegistrationPlace?.message}</div>
                </div>

                <div className="form-group">
                    <label>Возраст клиента</label>
                    <input
                        defaultValue={21}
                        type="number"
                        {...register('age')}
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.age?.message }</div>
                </div>

                <div className="form-group">
                    <label>Клиент судим?</label>
                    <select
                        {...register('hasCrimeCertificate')}
                        className={`form-control ${errors.hasCrimeCertificate ? 'is-invalid' : ''}`}
                    >
                        <option value="false">Нет</option>
                        <option value="true">Есть</option>
                    </select>
                    <div className="invalid-feedback">{errors.hasCrimeCertificate?.message}</div>
                </div>

                <div className="form-group">
                    <label>Вид трудовой деятельности</label>
                    <select
                        {...register('employment')}
                        className={`form-control ${errors.employment ? 'is-invalid' : ''}`}
                    >
                        <option value="0">Трудоустроен по трудовому договору</option>
                        <option value="1">Собственное ИП</option>
                        <option value="2">Фрилансер</option>
                        <option value="3">Пенсионер</option>
                        <option value="4">Безработный</option>
                    </select>
                    <div className="invalid-feedback">{errors.employment?.message}</div>
                </div>

                <div className="form-group">
                    <label>Цель займа</label>
                    <select
                        {...register('purpose')}
                        className={`form-control ${errors.purpose ? 'is-invalid' : ''}`}
                    >
                        <option value="0">Потребительский кредит</option>
                        <option value="1">Недвижимость</option>
                        <option value="2">Перекредитование</option>
                    </select>
                    <div className="invalid-feedback">{errors.purpose?.message}</div>
                </div>

                <div className="form-group">
                    <label>Залог</label>
                    <select
                        {...register('deposit')}
                        className={`form-control ${errors.deposit ? 'is-invalid' : ''}`}
                    >
                        <option value="0">Без залога</option>
                        <option value="1">Недвижимость</option>
                        <option value="2">Автомобиль</option>
                        <option value="3">Поручительство</option>
                    </select>
                    <div className="invalid-feedback">{errors.deposit?.message}</div>
                </div>

                <div className="form-group">
                    <label>Возраст авто</label>
                    <input
                        type="number"
                        defaultValue={0}
                        {...register('carAge')}
                        className={`form-control ${errors.carAge ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.carAge?.message }</div>
                </div>
                
                <div className="form-group">
                    <label>Сумма займа</label>
                    <input
                        defaultValue={0}
                        {...register('credit')}
                        className={`form-control ${errors.credit ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.credit?.message }</div>
                </div>
                
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        {...register('alreadyHasCredits')}
                        className={`form-check-input ${
                            errors.alreadyHasCredits ? 'is-invalid' : ''
                        }`}
                    />
                    <label htmlFor="acceptTerms" className="form-check-label">
                        уже еcть кредит?
                    </label>
                    <div className="invalid-feedback">{errors.alreadyHasCredits?.message}</div>
                </div>
                
                
                <label className="result" >&nbsp;</label>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    <button
                        type="button"
                        onClick={() => clearResult()}
                        className="btn btn-warning float-right"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TryCredit;