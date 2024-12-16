// /app/(dashboard)/(routes)/strategy/personas/page.tsx

"use client";

import { useEffect, useState } from "react";
import CardGridLayout from "@/app/components/atomic/templates/CardGridLayout";
import PersonaCard from "@/app/components/atomic/molecules/cards/PersonaCard";
import { Persona } from "@/app/types";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

const PersonasPage = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch("/api/resource/personas");
        if (response.ok) {
          const data = await response.json();
          setPersonas(data.resources);
        } else {
          setError(`Failed to fetch personas: ${response.statusText}`);
        }
      } catch (error: any) {
        setError(`Error fetching personas: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPersonas();
  }, []);

  const header = {
    title: "Personas",
    description: "Manage and view all your personas.",
    actions: (
      <Button>
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        Add New Persona
      </Button>
    ),
  };

  return (
    <CardGridLayout
      header={header}
      isLoading={isLoading}
      error={error}
      items={personas}
      renderItem={(persona: Persona) => (
        <PersonaCard key={persona.id} persona={persona} />
      )}
    />
  );
};

export default PersonasPage;
