"use client";

import AlertModal from "@/components/modal/AlertModal";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useOrigin from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category, Size } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
    initialData: Size | null;
}

const formSchema = z.object({
    value: z.string().min(1).max(255),
    name: z.string().max(255),
});

type FormValues = z.infer<typeof formSchema>;

function SizeForm({ initialData }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const title = initialData ? "Edit size" : "Create size";
    const description = initialData ? "Edit a size." : "Add a new size";
    const toastMessage = initialData
        ? "size updated."
        : "size created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            value: "",
            name: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                const res = await axios.patch(
                    `/api/${params.storeId}/sizes/${params.sizeId}`,
                    data
                );
            } else {
                const res = await axios.post(
                    `/api/${params.storeId}/sizes`,
                    data
                );
            }
            router.refresh();
            router.push(`/${params.storeId}/sizes`);

            toast.success(toastMessage);
        } catch (error: any) {
            if (error.response.status === 400) {
                toast.error(error.response.data);
            } else {
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
          await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
          router.refresh();
          router.push(`/${params.storeId}/categories`);
          toast.success('Category deleted.');
        } catch (error: any) {
          toast.error('Make sure you removed all products using this category first.');
        } finally {
          setLoading(false);
          setOpen(false);
        }
      }

    console.log(params)
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
                    <div className="grid grid-cols-3 gap-8 grid-flow-col ">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Size Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Value Name"
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
                        type="submit">
                        {action}
                    </Button>
                </form>
            </Form>

            <Separator />
        </>
    );
}

export default SizeForm;
