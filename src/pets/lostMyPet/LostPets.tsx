import React, { useState, useEffect } from "react"
import "../../styles.css"
import {LostPet, saveLostMyPet, loadLostPetByUser, savePet } from ".././petsService"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormTitle from "../../common/components/FormTitle"
import GlobalContent from "../../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"

export default function Pets(props: RouteComponentProps) {
    const [pets, setPets] = useState<LostPet[]>([])
    const [birthDate, setBirthDate] = useState("")
    const [description, setDescription] = useState("")
    const [petId, setPetId] = useState("")
    const [name, setName] = useState("")
    const [province, setProvince] = useState("")

    const errorHandler = useErrorHandler()

    const loadCurrentPets = async () => {
        try {
            const result = await loadLostPetByUser()
            setPets(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const lostMyPet = async (petId: string) => {
        try {
            await saveLostMyPet({ id: petId, name, birthDate, description, lost: true, province})
            loadCurrentPets();
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    const findMyPet = async (petId: string) => {
        try {
            await saveLostMyPet({ id: petId, name, birthDate, description, lost: false, province})
            loadCurrentPets();
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    const findUser = (userId: string) => {
        console.log(userId)
        props.history.push("/profile/" + userId);
    }

    useEffect(() => {
        void loadCurrentPets()
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Perdi mi mascota</FormTitle>
            <table id="mascotas" className="table">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Descripción </th>
                        <th> Se encuentra perdida</th>
                        <th> </th>
                        <th> Quien la encontro?</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) => {
                        return (
                            <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.description}</td>
                                {!pet.lost ? <td>No</td> : <td>Si</td>}
                                {!pet.lost ? (<td className="text">
                                <FormAcceptButton label="Perdi mi Mascota" onClick={() => lostMyPet(pet.id)} />
                                </td>) : (<td className="text">
                                <FormAcceptButton label="Recupere mi Mascota" onClick={() => findMyPet(pet.id)} />
                                </td>) }
                                {!pet.lost ? (<td className="text">
                                <FormAcceptButton label="Quien lo encontro?" onClick={() => findUser(pet.idUserFind)} />
                                </td>) : null }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <FormButtonBar>
                <FormButton label="Cancelar" onClick={() => goHome(props)} />
            </FormButtonBar>
        </GlobalContent>
    )
}
