"use client"
import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UseCase } from "@/app/types"; // Import the UseCase interface
import { useCases } from "@/app/data";

const UseCasesPage = () => {
  const [showModels, setShowModels] = useState(true); // State for controlling model visibility

  return (
    // <div className="flex min-h-screen w-full flex-col bg-muted/40">
    <div className="space-y-8 p-6">
    <div>
      <h3 className="text-xl font-medium">Use Cases</h3>
      <p className="text-sm text-muted-foreground">
        Describe the use cases for your AI Models and Products
      </p>
    </div>
    <Separator />
      <main className="flex-1 p-4">
        <Table className="w-full table-fixed">
          <TableHead className="bg-primary-foreground text-primary">
            <TableRow>
              <TableCell className="w-2/12 p-4 text-lg">
                <div className="flex items-center">
                  <Users2 className="mr-2 h-6 w-6" />
                  Description
                </div>
              </TableCell>
              <TableCell className="w-2/12 p-4 text-lg">Subject</TableCell>
              <TableCell className="w-2/12 p-4 text-lg">Target</TableCell>
              <TableCell className="w-4/12 p-4 text-lg">Purpose</TableCell>
              <TableCell className="w-2/12 p-4 text-lg">
                <div className="flex items-center justify-center">
                  Models
                  <div className="ml-2">
                    <label htmlFor="toggleModels" className="flex items-center cursor-pointer">
                      <input
                        id="toggleModels"
                        type="checkbox"
                        className="toggle-switch sr-only"
                        checked={showModels}
                        onChange={() => setShowModels(!showModels)}
                      />
                      <span className="toggle-switch-label"></span>
                    </label>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="bg-white overflow-y-scroll">
            {useCases.map((useCase: UseCase, index: number) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <TableCell className="p-4">{useCase.Description}</TableCell>
                <TableCell className="p-4">{useCase.Subject}</TableCell>
                <TableCell className="p-4">{useCase.Target}</TableCell>
                <TableCell className="p-4">
                  {useCase.ForPurpose.map((purpose, index) => (
                    <Badge key={index} variant="outline" className="mr-2">{purpose}</Badge>
                  ))}
                </TableCell>
                <TableCell className="p-4">{showModels ? useCase.Models : 'Hidden'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

export default UseCasesPage;
