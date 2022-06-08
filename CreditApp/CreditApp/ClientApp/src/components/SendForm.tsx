import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import {EmploymentEnum} from "../enums/EmploymentEnum";
import {PurposeEnum} from "../enums/PurposeEnum";
import {DepositEnum} from "../enums/DepositEnum";

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

const schema = Yup.object().shape({
    fullname: Yup.string()
        .required('ФИО необходимо')
        .min(3, 'ФИО должно иметь как минимум 3 символа')
        .max(60, "для ФИО допустимо не больше 40 символов"),
    passportSeries: Yup.number()
        .required('серия необходима')
        .min(1, 'серия должна иметь как минимум 1 символ')
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
        .min(new Date("1850-01-16"), 'это слишком давно!!'),
    passportRegistrationPlace: Yup.string()
        .required('укажите место прописки')
        .min(3)
        .max(60),
    age: Yup.number()
        .required()
        .min(18, 'кредит выдаётся лицам, достигшим возраст 18 лет')
        .max(150, 'введите реальный возраст'),
    hasCrimeCertificate: Yup.bool().notRequired(),
    employment: Yup.number().required(),
    purpose: Yup.number().required(),
    deposit: Yup.number().required(),
    carAge: Yup.number()
        .required('укажите возраст авто')
        .min(0, 'некорректный возраст авто')
        .max(150, 'некорректный возраст авто')
        .oneOf([Yup.ref('deposit'), 2], 'Если в залоге машина, укажите возраст авто'),
    alreadyHasCredits: Yup.bool(),
    credit: Yup.number()
        .required('укажите желаемую сумму кредита')
        .positive('некорректый ввод')
});

type UserSubmitForm = {
    fullname: string;
    
    
    username: number;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
};

const SendForm: React.FC = () => {
    
    //My validation schema
    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Fullname is required'),
        username: Yup.number()
            .required('Username is required')
            .min(3)
            .max(50),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: 
            Yup.string() 
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), '123123'], 'Confirm Password does not match'),
        acceptTerms: Yup.bool().default(true)
    });
    
    //передаем правила валидации хуку useForm, используя yupResolver()
    //хук useForm возвращает объект
    const {
        register, //register inputs
        handleSubmit, //handle form submit
        reset, //reset the form
        formState: { errors } //contains errors
    } = useForm<UserSubmitForm>({
        resolver: yupResolver(validationSchema)
    });
    
    //когда форма валидна и отправлена, вызывается onSubmit() и данные логируются
    const onSubmit = (data: UserSubmitForm) => {
        console.log(JSON.stringify(data, null, 2));
    };

    return (
        <div className="register-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        {...register('fullname')}
                        className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} //проверка на валидность
                    />
                    <div className="invalid-feedback">{errors.fullname?.message}</div>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="number"
                        {...register('username')}
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control ${
                            errors.confirmPassword ? 'is-invalid' : ''
                        }`}
                    />
                    <div className="invalid-feedback">
                        {errors.confirmPassword?.message}
                    </div>
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        {...register('acceptTerms')}
                        className={`form-check-input ${
                            errors.acceptTerms ? 'is-invalid' : ''
                        }`}
                    />
                    <label htmlFor="acceptTerms" className="form-check-label">
                        I have read and agree to the Terms
                    </label>
                    <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="btn btn-warning float-right"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendForm;
