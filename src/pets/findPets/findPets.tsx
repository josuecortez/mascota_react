import React, { useState, useEffect } from "react"
import {LostPet, saveLostMyPet, loadLostPet } from ".././petsService"
import "../../styles.css"
import { useErrorHandler } from "../../common/utils/ErrorHandler"
import { goHome } from "../../common/utils/Tools"
import FormButtonBar from "../../common/components/FormButtonBar"
import FormAcceptButton from "../../common/components/FormAcceptButton"
import FormButton from "../../common/components/FormButton"
import FormTitle from "../../common/components/FormTitle"
import GlobalContent from "../../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import { getProvince, Province } from "../../provinces/provincesService";


export default function FindLostPets(props: RouteComponentProps) {
    const [pets, setPets] = useState<LostPet[]>([])
    const [birthDate, setBirthDate] = useState("")
    const [description, setDescription] = useState("")
    const [petId, setPetId] = useState("")
    const [name, setName] = useState("")
    const [province, setProvince] = useState("")

    const errorHandler = useErrorHandler()

    const loadCurrentPets = async () => {
        console.log('why god')
        try {
            const result = await loadLostPet();
            Promise.all(result.map(async(pet) =>{
                const provincesR = await getProvince(pet.province);
                console.log(provincesR)
                pet.province = provincesR.name;
            }))
            setTimeout(function(){setPets(result)},1000);
            
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }
    

    const findYourPet = async (petId: string) => {
        try {
            await saveLostMyPet({ id: petId, name, birthDate, description, lost: false, province})
            loadCurrentPets();
        } catch (error) {
            errorHandler.processRestValidations(error);
        }
    }

    
    useEffect(() => {
        void loadCurrentPets()
        // eslint-disable-next-line
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Buscador de mascotas perdidas</FormTitle>
            <table id="mascotas" className="table">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Descripción </th>
                        <th> Se encuentra perdida</th>
                        <th> Ciudad</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) => {
                        return (
                            <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.description}</td>
                                {!pet.lost ? <td>No</td> : <td>Si</td>}
                                <td>{pet.province}</td>
                                {pet.lost ? (<td className="text">
                                <FormButton label="La encontre" onClick={() => findYourPet(pet.id)} />
                                </td>) : null}
                                
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
