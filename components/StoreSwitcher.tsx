"use client";

import { cn } from "@/lib/utils";
import { useStoreMal } from "@/hooks/use-store-modal";
import { Store } from "@prisma/client"
import { PopoverTriggerProps } from "@radix-ui/react-popover"
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusCircleIcon, StoreIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "@/components/ui/button";
import { useState } from "react";



interface Props extends PopoverTriggerProps{
    items: Store[]
}

function StoreSwitcher({className, items=[]}: Props) {

    const [isOpen, openModal] = useStoreMal((state) => [
        state.isOpen,
        state.openModal,
    ]);

    const [open, setOpen] = useState<boolean>(false)
    const router=  useRouter();
    const params = useParams();

    const formattedItems = items.map((item) => ({
        label : item.name,
        value : item.id
    }) )

    const currentStore = formattedItems.find((item) => item.value === params.storeId)
    const onStoreSelect = (store: { value: string, label: string }) => {
      setOpen(false);
      router.push(`/${store.value}`);
    };

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild >

     <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
            <StoreIcon className="mr-2 h-4 w-4" size={24} />
            {currentStore?.label || "Select a store"}
            <ChevronsUpDown className="ml-auto h4 w-4 shrink-0 opacity-50"/>
        </Button>

        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup heading="Stores">
            {formattedItems.map((store) => (
              <CommandItem
                key={store.value}
                onSelect={() => onStoreSelect(store)}
              >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                  )}
                />

              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Actions">
            <CommandItem onSelect={openModal}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              Create a new store
            </CommandItem>
          </CommandGroup>

        </Command>
      </PopoverContent>

    </Popover>
  )
}

export default StoreSwitcher
