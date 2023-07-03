import { useStoreMal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    name: z.string().min(1)
});

function StoreModal() {
    const storeModal = useStoreMal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        // TODO: Create Store
        console.log(data);
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
                                    variant="outline"
                                    onClick={storeModal.closeModal}>
                                    Cancel
                                </Button>
                                <Button type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    );
}

export default StoreModal;
