"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StrategyLayout from "@/app/components/atomic/ttemplates/StrategyLayout";
import { ModelSubject } from '@/app/types'

const ModelSubjectsPage: React.FC = () => {
    const [modelSubjects, setModelSubjects] = useState<ModelSubject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchModelSubjects = async () => {
        try {
          const response = await fetch("/api/resource/model_subjects");
          if (response.ok) {
            const data = await response.json();
            setModelSubjects(data.resources);
          } else {
            setError("Failed to fetch model subjects.");
          }
        } catch (error) {
          console.error("Error fetching model subjects:", error);
          setError("Failed to fetch model subjects.");
        } finally {
          setLoading(false);
        }
      };
      fetchModelSubjects();
    }, []);
  
    if (loading) return <p>Loading model subjects...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <StrategyLayout>
        <div className="space-y-8 p-6">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {modelSubjects.map((subject) => (
              <Card key={subject.id} className="bg-white border border-gray-200 shadow-md">
                <CardHeader>
                  <CardTitle>{subject.subjectName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p>{subject.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {subject.expertiseLevel && (
                      <Badge color="primary">{subject.expertiseLevel}</Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <p>Related Models:</p>
                    <div className="flex flex-wrap gap-2">
                      {subject.relatedAIModels.map((model, idx) => (
                        <Badge key={idx} color="secondary">
                          {model}
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
  
  export default ModelSubjectsPage;