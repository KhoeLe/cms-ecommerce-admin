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
import { Billboard, Category } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
    initialData: Category | null;
    billboards: Billboard[];
}

const formSchema = z.object({
    billboardId: z.string().min(3).max(255),
    name: z.string().max(255),
});

type FormValues = z.infer<typeof formSchema>;

function CategoryForm({ initialData, billboards }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const title = initialData ? "Edit category" : "Create category";
    const description = initialData ? "Edit a category." : "Add a new category";
    const toastMessage = initialData
        ? "category updated."
        : "category created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            billboardId: "",
            name: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                const res = await axios.patch(
                    `/api/${params.storeId}/categories/${params.categoryId}`,
                    data
                );
            } else {
                const res = await axios.post(
                    `/api/${params.storeId}/categories`,
                    data
                );
            }
            router.refresh();
            router.push(`/${params.storeId}/categories`);

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
                                            placeholder="Category Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder="Select a billboard"
                                                    defaultValue={field.value}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem
                                                    key={billboard.id}
                                                    value={billboard.id}>
                                                    {billboard.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

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

export default CategoryForm;
