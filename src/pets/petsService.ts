import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Pet {
    id: string;
    name: string;
    birthDate: string;
    description: string;
    lost: Boolean;
    province: string;

}
export interface LostPet{
    id: string;
    name: string;
    birthDate: string;
    description: string;
    idUserFind: string;
    province: string;
    lost: Boolean;

}
//buscar mascotas perdidas por usuario
export async function loadLostPetByUser() : Promise<LostPet[]>{
    try{
        const res = (await axios.get(environment.backendUrl + "/v1/lostpet")).data as LostPet[]
        console.log(res)
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
//buscar todas las mascotas perdidas 
export async function loadLostPet() : Promise<LostPet[]>{
    try{
        const res = (await axios.get(environment.backendUrl + "/v1/alllostpet")).data as LostPet[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
//update de mascotas perdidas
export async function saveLostMyPet(payload: Pet): Promise<LostPet> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/lostpet/" + payload.id, payload)).data as LostPet
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
//encontre tu mascota
export async function saveLostYourPet(payload: Pet): Promise<LostPet> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/lostYourPet/" + payload.id, payload)).data as LostPet
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
export async function loadPets(): Promise<Pet[]> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/pet")).data as Pet[]
        console.log(res)
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function loadPet(id: string): Promise<Pet> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/pet/" + id)).data as Pet
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function newPet(payload: Pet): Promise<Pet> {
    console.log(payload)
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/pet", payload)).data as Pet
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function savePet(payload: Pet): Promise<Pet> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/pet/" + payload.id, payload)).data as Pet
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function deletePet(id: string): Promise<void> {
    try {
        await axios.delete(environment.backendUrl + "/v1/pet/" + id)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}
