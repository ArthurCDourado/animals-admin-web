

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"
import { useCreateAnimal } from "@/lib/react-query/queriesAndMutations"
import { toast, useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

const AnimalForm = ({ animal, action }: any) => {

    const { mutateAsync: createAnimal, isPending: isLoadingCreate } = useCreateAnimal()

    const { toast } = useToast()
    const navigate = useNavigate()

    // 1. Define your form.
    const form = useForm<any>({
        defaultValues: {
            name: animal ? animal?.caption : "",
            description: animal ? animal?.caption : "",
            category: animal ? animal?.caption : "",
            birthDate: animal ? animal?.caption : "",
            file: [],
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: any) {
        const newAnimal = await createAnimal({
            ...values
        })

        if (!newAnimal) {
            toast({
                title: 'Please try again'
            })
        } else {
            toast({
                title: 'Ação realizada com sucesso.'
            })
        }

        navigate('../list-animal')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Nome</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Descrição</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Adicionar foto</FormLabel>
                            <FormControl>
                                <FileUploader fieldChange={field.onChange} mediaUrl={animal?.imageUrl} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Categoria</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Data de Nascimento</FormLabel>
                            <FormControl>
                                <Input type="date" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 items-center justify-end">
                    <Button type="button" className="shad-button_dark_4" onClick={() => navigate('/list-animal')}>Cancelar</Button>
                    <Button type="submit" className="shad-button_primary whitespace-nowrap">{action}</Button>
                </div>
            </form>
        </Form>
    )
}

export default AnimalForm