// contexts/ListingContext.tsx
"use client"

import React, { createContext, useContext, useState } from "react";

interface ListingContextType {
    listingId: string | null;
    setListingId: (id: string | null) => void;
    dealerEmail: string | null;
    setDealerEmail: (email: string | null) => void;
}


interface ListingProviderProps {
    children: React.ReactNode;
}


const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const useListingContext = () => {
    const context = useContext(ListingContext);
    if (!context) {
        throw new Error("useListingContext must be used within a ListingProvider");
    }
    return context;
};

export const ListingProvider: React.FC<ListingProviderProps> = ({ children }) => {
    const [listingId, setListingId] = useState<string | null>(null);
    const [dealerEmail, setDealerEmail] = useState<string | null>(null); // add this
    console.log("listingId", listingId)
    console.log("dealerEmail", dealerEmail)


    return (
        <ListingContext.Provider value={{ listingId, setListingId, dealerEmail, setDealerEmail }}>
            {children}
        </ListingContext.Provider>
    );
};
