"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { agents } from "@/app/data"; // Assuming connectors data defined here
import { Agent } from "@/app/types";

const AgentsPage = () => {


  return (
    <div className="space-y-8 p-6">
    <div>
      <h3 className="text-xl font-medium">Personas</h3>
      <p className="text-sm text-muted-foreground">
        Describe the most important stakeholders in your Value Network
      </p>
    </div>
    <Separator />
      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {agents.map((agent: Agent, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{agent.Name}</CardTitle>
                <CardDescription>{agent.Description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img src={agent.Image} alt={agent.Name} className="w-full h-auto rounded-md" />
                <p className="mt-4 text-sm">{agent.Type}</p>
                <p className="mt-2 text-sm font-semibold">Associated Use Cases:</p>
                <ul className="list-disc ml-4">
                  {agent.AssociatedUseCases.map((useCase, idx) => (
                    <li key={idx} className="text-sm">{useCase}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default AgentsPage;
