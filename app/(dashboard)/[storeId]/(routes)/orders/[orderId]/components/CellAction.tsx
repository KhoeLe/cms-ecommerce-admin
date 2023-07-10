"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BillboardColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { CopyIcon, EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

interface Props {
    data: BillboardColumn;
}

function CellAction({ data }: Props) {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("BillBoard Id copied to clipboard.");
    };

    const onConfirm = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
            toast.success("BillBoard deleted.");
            router.refresh();
        } catch (error) {
            toast.error(
                "Make sure you removed all products using this BillBoard first."
            );
        } finally {
            setOpen(false);
            setLoading(false);
        }
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onCopy(data.id)}>
                    <CopyIcon className="mr-2 w-4 h-4" />
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        router.push(`/${params.storeId}/billboards/${data.id}`)
                    }>
                    <EditIcon className="mr-2 w-4 h-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onConfirm}>
                    <Trash2Icon className="mr-2 w-4 h-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default CellAction;
