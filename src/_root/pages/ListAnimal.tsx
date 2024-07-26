import { Input } from "@/components/ui/input"
import { useGetAnimals, useChangeStatus } from "@/lib/react-query/queriesAndMutations"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

const ListAnimal = () => {
    const navigate = useNavigate()
    const { data: animals } = useGetAnimals()
    const { mutate: changeStatus } = useChangeStatus()

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handleChangeStatus = (animalId: number, status: string) => {
        changeStatus({ animalId: animalId, status: status })
    }

    return (
        <div className="explore-container">
            <div className="explore-inner_container">
                <h2 className="h3-bold md:h2-bold w-full">Animais</h2>
                <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
                    <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
                    <Input type="text" placeholder="Search" className="explore-search"
                    />
                </div>
            </div>
            <div className="flex justify-end w-full max-w-5xl mt-16 mb-7">
                <Button type="button" className="shad-button_primary whitespace-nowrap" onClick={() => navigate('/create-animal')}>Cadastrar</Button>
            </div>

            <div className="flex flex-wrap gap-9 w-full max-w-5xl">
                <Table className="rounded-lg bg-dark-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Data de Nascimento</TableHead>
                            <TableHead>Idade</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {animals?.map((item: any, index: any) => (
                            <TableRow
                                key={index}
                            >
                                <TableCell>
                                    <img src={item.imageUrl || '/assets/icons/profile-placeholder.svg'}
                                        alt="petImage"
                                        className="rounded-full w-7 h-7 inline-flex mr-2" />
                                    <b>{item?.name}</b>
                                </TableCell>
                                <TableCell>{item?.description}</TableCell>
                                <TableCell>{item?.category}</TableCell>
                                <TableCell>{formatDate(item?.birthDate)}</TableCell>
                                <TableCell>{item?.age} </TableCell>
                                <TableCell>
                                    <Switch className="shad-switch" id="status"
                                        checked={item?.status === 'AVAILABLE'} onCheckedChange={_ => handleChangeStatus(item?.id, item?.status === 'AVAILABLE' ? 'ADOPTED' : 'AVAILABLE')} />
                                    <span className="ml-2">{item?.status === 'AVAILABLE' ? 'Disponível' : 'Adotado'}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ListAnimal