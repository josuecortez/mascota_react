import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import DangerLabel from "../common/components/DangerLabel";
import ErrorLabel from "../common/components/ErrorLabel";
import Form from "../common/components/Form";
import FormAcceptButton from "../common/components/FormAcceptButton";
import FormButton from "../common/components/FormButton";
import FormButtonBar from "../common/components/FormButtonBar";
import FormInput from "../common/components/FormInput";
import FormTitle from "../common/components/FormTitle";
import GlobalContent from "../common/components/GlobalContent";
import ImageUpload from "../common/components/ImageUpload";
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { goHome } from "../common/utils/Tools";
import { getProvince, Province } from "../provinces/provincesService";
import "../styles.css";
import {
  Profile,
  getProfileFindMyPet
  
} from "./profileService";

export default function FindProfile(
  props: RouteComponentProps<{ userId: string }>
) {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");
  const [province, setProvince] = useState("");

  const errorHandler = useErrorHandler();

  const loadProfile = async (id: string) => {
    try {
      const result = await getProfileFindMyPet(id);
      const province = await getProvince(result.province);
      setAddress(result.address);
      setEmail(result.email);
      setName(result.name);
      setPhone(result.phone);
      setPicture(result.picture);
      setProvince(province.name);
    } catch (error) {
      errorHandler.processRestValidations(error);
    }
  };

  useEffect(() => {
    const id = props.match.params.userId;
    void loadProfile(id);
    // eslint-disable-next-line
  }, []);
  return (
    <GlobalContent>
      <FormTitle>Quien encontro mi mascota</FormTitle>
      <table id="mascotas" className="table">
        <thead>
          <tr>
            <th> Nombre </th>
            <th> Foto </th>
            <th> Email</th>
            <th> Provincia</th>
            <th> Direccion</th>
            <th> Telefono</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{picture}</td>
            <td>{email}</td>
            <td>{province}</td>
            <td>{address}</td>
            <td>{phone}</td>
          </tr>
        </tbody>
      </table>
    </GlobalContent>
  );
}
