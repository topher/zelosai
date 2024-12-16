'use client'
import React, { createContext, useState, useEffect, useContext } from 'react';
import loadRDFData from '@/app/utils/loadRDFData'; // Adjust the import path as needed

interface RDFContextType {
    rdfData: { subject: string; predicate: string; object: string; }[] | null;
    setRdfData: React.Dispatch<React.SetStateAction<{ subject: string; predicate: string; object: string; }[] | null>>;
}

interface RDFContextProviderProps {
    children: React.ReactNode;
}

export const RDFContext = createContext<RDFContextType>({
  rdfData: null,
  setRdfData: () => {},
});

export const useRDFContext = () => {
    const context = useContext(RDFContext);
    if (!context) {
        throw new Error("useRDFContext must be used within a RDFContextProvider");
    }
    return context;
};

export const RDFContextProvider: React.FC<RDFContextProviderProps> = ({ children }) => {
    const [rdfData, setRdfData] = useState<RDFContextType['rdfData']>(null);

    useEffect(() => {
        fetch('/api/rdf-data')
            .then(response => response.json())
            .then(data => setRdfData(data))
            .catch(error => console.error('Error fetching RDF data:', error));
    }, []);

    // console.log("Current RDF data:", rdfData);

    return (
        <RDFContext.Provider value={{ rdfData, setRdfData }}>
            {children}
        </RDFContext.Provider>
    );
};
