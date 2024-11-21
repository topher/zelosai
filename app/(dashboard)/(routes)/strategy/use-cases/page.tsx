"use client";
import { useEffect, useState } from "react";
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
import {
  createUseCase,
  updateUseCase,
  deleteUseCase,
} from "@/app/actions/useCaseActions"; // Import all CRUD actions
import StrategyLayout from "../../../../components/atomic/ttemplates/StrategyLayout";

const UseCasesPage = () => {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [accountId] = useState("12345"); // Static accountId for now
  const [showModels, setShowModels] = useState(true); // State for controlling model visibility

  // Fetch use cases on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/resource/use_cases");
        if (response.ok) {
          const data = await response.json();
          setUseCases(data.resources);
        } else {
          console.error("Error fetching use cases:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching use cases:", error);
      }
    };
    fetchData();
  }, []);



  // Handle creating a new use case
  const handleCreateUseCase = async () => {
    const newUseCase = {
      Description: "New Use Case",
      Subject: "New Subject",
      Target: "New Target",
      ForPurpose: ["New Purpose"],
      Models: 5,
      accountId: accountId, // Include accountId in the new use case
    };

    try {
      const createdUseCase = await createUseCase(newUseCase);
      setUseCases([...useCases, createdUseCase]);
    } catch (error) {
      console.error("Error creating use case:", error);
    }
  };

  // Handle deleting a use case
  const handleDeleteUseCase = async (useCaseId: string) => {
    try {
      await deleteUseCase(useCaseId);
      setUseCases(useCases.filter((useCase) => useCase.id !== useCaseId));
    } catch (error) {
      console.error("Error deleting use case:", error);
    }
  };

  // Handle updating a use case
  const handleUpdateUseCase = async (useCaseId: string) => {
    const updatedUseCase = {
      Description: "Updated Use Case",
      Subject: "Updated Subject",
      Target: "Updated Target",
      ForPurpose: ["Updated Purpose"],
      Models: 7,
    };

    try {
      await updateUseCase(useCaseId, updatedUseCase);
      setUseCases(
        useCases.map((useCase) =>
          useCase.id === useCaseId ? { ...useCase, ...updatedUseCase } : useCase
        )
      );
    } catch (error) {
      console.error("Error updating use case:", error);
    }
  };

  return (
    <StrategyLayout>
    <div className="space-y-8 p-6">
      {/* Add New Use Case Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreateUseCase}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Use Case
        </button>
      </div>

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
                    <label
                      htmlFor="toggleModels"
                      className="flex items-center cursor-pointer"
                    >
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
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <TableCell className="p-4">{useCase.Description}</TableCell>
                <TableCell className="p-4">{useCase.Subject}</TableCell>
                <TableCell className="p-4">{useCase.Target}</TableCell>
                <TableCell className="p-4">
                  {useCase.ForPurpose.map((purpose, index) => (
                    <Badge key={index} variant="outline" className="mr-2">
                      {purpose}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell className="p-4">
                  {showModels ? useCase.Models : "Hidden"}
                </TableCell>
                <TableCell className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleUpdateUseCase(useCase.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUseCase(useCase.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
    </StrategyLayout>
  );
};

export default UseCasesPage;
