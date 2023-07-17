"use client";

import AlertModal from "@/components/modal/AlertModal";
import Heading from "@/components/ui/Heading";
import ApiAlert from "@/components/ui/apialert";
import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/images-upload";
import { Input } from "@/components/ui/input";
import useOrigin from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Store } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(3).max(255),
    imageUrl: z.string().max(255),
});

type FormValues = z.infer<typeof formSchema>;

function BillBoardForm({ initialData }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const title = initialData ? "Edit billboard" : "Create billboard";
    const description = initialData
        ? "Edit a billboard."
        : "Add a new billboard";
    const toastMessage = initialData
        ? "Billboard updated."
        : "Billboard created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: "",
        },
    });

    console.log(params.storeId, "StoreID");
    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);

            if(initialData){
                console.log("params_billboardId",params.billboardId);
                const res = await axios.patch(
                    `/api/${params.storeId}/billboards/${params.billboardId}`,
                    data
                );

            }else{
                const res = await axios.post(
                    `/api/${params.storeId}/billboards`,
                    data
                );
            }
            router.refresh();
            router.push(`/${params.storeId}/billboards`);

            toast.success(toastMessage);
        } catch (error: any) {
            if(error.response.status === 400){
                toast.error(error.response.data)
            }else{
                toast.error("Something went wrong");
                console.error("Something went wrong", error);
            }

        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted.");
        } catch (error: any) {
            toast.error(
                "Make sure you removed all products and categories first."
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {/* // if initialData is true, then show the button */}
               {initialData && (
                 <Button
                 variant="destructive"
                 size="icon"
                 onClick={() => setOpen(true)}>
                 <Trash className="h-4 w-4" />
             </Button>
               )}
            </div>

            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Images</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            disabled={loading}
                                            onChange={url => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                            values={field.value ? [field.value] : []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Billboard label"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <Button
                        className="mt-auto"
                        disabled={loading}
                        type="submit"
                        >
                            {action}
                    </Button>
                </form>
            </Form>

            <Separator />

        </>
    );
}

export default BillBoardForm;
