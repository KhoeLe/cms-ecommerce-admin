import { useStoreMal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import { z } from "zod";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
    name: z.string().min(1),
});

function StoreModal() {
    const storeModal = useStoreMal();
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const res =  await axios.post("/api/stores", data );

            toast.success("Store created successfully");

            window.location.assign(`${res.data.id}`)
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Something went wrong", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={"Create Store"}
            description={" Add a new store manage products and categories"}
            isOpen={storeModal.isOpen}
            onClose={storeModal.closeModal}>
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-Commerce"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="pt-5 space-x-2 flex items-center justify-end w-full ">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.closeModal}>
                                    Cancel
                                </Button>
                                <Button disabled={loading} type="submit">
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default StoreModal;
