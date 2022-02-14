import React, {ChangeEvent, FunctionComponent, useEffect, useState} from 'react'
import updateDataClasses from "./UserUpdateData.module.css";
import {Button, DatePicker, Input} from "antd";
import registerClasses from "../../RegisterPanel/register.module.css";
import moment from "moment";
import changePasswordClasses from "../UserChangePassword/UserChangePassword.module.css";

interface Props{
    user: UserType,
    changeContent: (contentType: string)=>void
}

interface UserType {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    points: number;
    password: string;
    country: string;
    city: string;
    address: string;
    postalAddress: string;
    roles: object;
}

export const UserUpdateData: FunctionComponent<Props>=(props: Props)=>{
    const[password, setPassword] = useState<string>("");
    const[confirmBtnDisabled, setConfirmBtnDisabled] = useState<boolean>(false);

    let updatedUser:UserType={
        "id": props.user.id,
        "firstName": props.user.firstName,
        "lastName": props.user.lastName,
        "email": props.user.email,
        "birthDate": props.user.birthDate,
        "points": props.user.points,
        "password": props.user.password,
        "country": props.user.country,
        "city": props.user.city,
        "address": props.user.address,
        "postalAddress": props.user.postalAddress,
        "roles": props.user.roles,
    }

    const handleCancelBtnClick = ()=>{
        props.changeContent("userInfo")
    }

    const handleConfirmBtnClick = () => {
        if(JSON.stringify(updatedUser) !== JSON.stringify(props.user)){
            console.log("ASDASDASD")
            //PUT METHOD HERE
        }
        props.changeContent("userInfo")
    }

    const handleOnPasswordInputChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    }

    useEffect(()=>{
        if(password!=''){
            setConfirmBtnDisabled(false)
        }
        else{
            setConfirmBtnDisabled(true)
        }
    },[password])

    return(
        <>
            <div className={updateDataClasses["cancel-button"]}>
                <div onClick={handleCancelBtnClick} className={updateDataClasses["cancel-btn"]}>
                    ANULUJ
                </div>
            </div>
            <div className={updateDataClasses["profile-info-window-content"]}>
                <div className={updateDataClasses["content-left-column"]}>
                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>IMIĘ</div>
                        <Input onChange={(e)=>updatedUser.firstName=e.target.value} className={updateDataClasses["input"]} defaultValue={props.user.firstName} placeholder={"Imie"}/>
                    </div>
                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>NAZWISKO</div>
                        <Input onChange={(e)=>updatedUser.lastName=e.target.value} className={updateDataClasses["input"]} defaultValue={props.user.lastName} placeholder={"Nazwisko"}/>
                    </div>
                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>E-MAIL</div>
                        <Input onChange={(e)=>updatedUser.email=e.target.value} className={updateDataClasses["input"]} defaultValue={props.user.email} placeholder={"E-mail"}/>
                    </div>
                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>DATA URODZENIA</div>
                        <DatePicker onChange={(date, dateString) => updatedUser.birthDate=dateString} className={updateDataClasses["input"]} defaultValue={moment(props.user.birthDate, 'YYYY-MM-DD')} placeholder={"Data urodzenia"}/>
                    </div>


                </div>
                <div className={updateDataClasses["content-right-column"]}>

                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>KRAJ</div>
                        <Input onChange={(e)=>updatedUser.country=e.target.value} className={updateDataClasses["input"]} defaultValue={props.user.country} placeholder={"Kraj"}/>
                    </div>
                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>MIASTO</div>
                        <Input onChange={(e)=>updatedUser.city=e.target.value} className={updateDataClasses["input"]} defaultValue={props.user.city} placeholder={"Miasto"}/>
                    </div>
                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>ADRES</div>
                        <Input onChange={(e)=>updatedUser.address=e.target.value} className={updateDataClasses["input"]} defaultValue={props.user.address} placeholder={"Adres"}/>
                    </div>
                    <div className={updateDataClasses.data}>
                        <div className={updateDataClasses["user-details"]}>KOD POCZTOWY</div>
                        <Input onChange={(e)=>updatedUser.postalAddress=e.target.value} className={updateDataClasses["input"]} defaultValue={props.user.postalAddress} placeholder={"Kod pocztowy"}/>
                    </div>
                </div>
            </div>
            <div className={updateDataClasses["confirm-div"]}>
                <Input.Password className={updateDataClasses["password-input"]}
                                onChange={handleOnPasswordInputChange}
                                placeholder={"Hasło"}
                />
                <Button disabled={confirmBtnDisabled} onClick={handleConfirmBtnClick} className={updateDataClasses["confirm-btn"]} type={"primary"}>ZATWIERDŹ ZMIANY</Button>
            </div>

        </>
    )
}