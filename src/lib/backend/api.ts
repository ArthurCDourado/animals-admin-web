
export async function createAnimal(animal: any) {

    const [year, month, day] = animal.birthDate.split('-');

    animal.birthDate = `${year}-${month}-${day}T00:00:00Z`

    try {
        const response = await fetch('http://localhost:8080/animals', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(animal)
        });

        if (!response.ok) throw Error

        const newAnimal = await response.json();

        const uploadedFile = await uploadFile(newAnimal.id, animal.file[0])

        if (!uploadedFile) throw Error

        return response
    } catch (error) {
        console.log(error);
    }
}

export async function uploadFile(animalId: number, file: any) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`http://localhost:8080/files/upload/${animalId}`, {
            method: 'POST',
            body: formData
        });

        if (!response) throw Error

        return response
    } catch (error) {
        console.log(error);
    }
}

export async function changeStatus(animalId: any, status: string) {
    try {
        const response = await fetch(`http://localhost:8080/animals/change-status?animalId=${animalId}&status=${status}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        },);

        if (!response) throw Error

        return response
    } catch (error) {
        console.log(error);
    }
}

export async function getAnimals() {

    try {

        const response = await fetch('http://localhost:8080/animals', {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response) throw Error

        return response.json()
    } catch (error) {
        console.log(error);
    }
}