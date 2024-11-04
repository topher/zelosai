"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Persona } from "@/app/types";
import StrategyLayout from "@/app/(dashboard)/(routes)/strategy/StrategyLayout";

const PersonasPage = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await fetch("/api/resource/persona");
        if (response.ok) {
          const data = await response.json();
          setPersonas(data.resources);
        } else {
          console.error("Failed to fetch personas:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching personas:", error);
      }
    };
    fetchPersonas();
  }, []);

  return (
    <StrategyLayout>
      <div className="space-y-8 p-6">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {personas.map((persona) => (
            <Card key={persona.id} className="bg-white border border-gray-200 shadow-md">
              <CardHeader>
                <CardTitle>{persona.personaName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p>{persona.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge color="primary">{persona.attributes.profession}</Badge>
                  <Badge color="secondary">{persona.attributes.location}</Badge>
                  <Badge color="success">{persona.attributes.ageRange}</Badge>
                </div>
                <div className="mt-2">
                  <p>Interests:</p>
                  <div className="flex flex-wrap gap-2">
                    {persona.attributes.interests.map((interest, idx) => (
                      <Badge key={idx} color="warning">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StrategyLayout>
  );
};

export default PersonasPage;
