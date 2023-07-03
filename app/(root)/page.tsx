"use client"
import Modal from "@/components/ui/modal";
import { useStoreMal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const SetUpPage = () => {

   const [isOpen, openModal] = useStoreMal((state) => [
    state.isOpen,
    state.openModal,
   ]);

   useEffect(() => {
    if(!isOpen) openModal()
   }, [isOpen, openModal])



    return (
        <div className="p-4">
            {/* <UserButton afterSignOutUrl="/" /> */}
            <h1>Root Page</h1>
        </div>
    );
};

export default SetUpPage;
