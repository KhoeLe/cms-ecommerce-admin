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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useOrigin from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface Props {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(3).max(255),
});

type FormValues = z.infer<typeof formSchema>;

function SettingsForm({ initialData }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    console.log(params.storeId, "StoreID");
    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);

            console.log(data);
            const res = await axios.patch(
                `/api/${params.storeId}`,
                data
            );
            router.refresh();

            toast.success("Store update successfully");
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Something went wrong", error);
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}`);
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
                <Heading
                    title="Settings"
                    description="Manage your store settings"
                />
                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}>
                    <Trash className="h-4 w-4" />
                </Button>
            </div>

            <Separator />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Store Name"
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
                        Save changes
                    </Button>
                </form>
            </Form>

            <Separator />

            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                variant="public"
                description={`${origin}/api/${params.storeId}`}
            />
        </>
    );
}

export default SettingsForm;
