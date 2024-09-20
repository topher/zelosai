"use client";

import { AIModel } from "@/app/types";
import { Loader } from "@/components/loader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"; // Ensure these components are available
import {
  Edit3,
  Save,
  XCircle,
  Shield,
  Info,
  TrendingUp,
  Database,
  Server,
  Leaf,
  Code,
  ExternalLink,
  Calendar,
} from "lucide-react"; // Import necessary icons from lucide-react
import { cn } from "@/lib/utils"; // Utility for conditional classNames

interface DocumentationTabProps {
  modelData: AIModel | null;
}

export const DocumentationTab: React.FC<DocumentationTabProps> = ({
  modelData,
}) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<AIModel>({
    defaultValues: modelData || {},
  });

  const onSubmit = async (data: AIModel) => {
    try {
      await axios.put(`/api/models/${modelData?.modelId}`, data);
      toast.success("Model data updated successfully.");
      setIsEditing(false);
      reset(data);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update model data.");
    }
  };

  if (!modelData) {
    return <Loader />;
  }

  return (
    <div className="px-4 lg:px-12 py-8">
      {/* Main Card */}
      <Card className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl border border-gray-200">
        {/* Card Header */}
        <CardHeader className="flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-t-3xl">
          <CardTitle className="flex items-center text-3xl font-bold">
            <Shield className="mr-3 h-7 w-7" />
            Model Documentation
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-white text-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
            >
              <Edit3 className="mr-2 h-5 w-5" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                type="submit"
                form="documentation-form"
                disabled={isSubmitting}
                size="sm"
                className="flex items-center bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
              >
                <Save className="mr-2 h-5 w-5" />
                Save
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  reset(modelData);
                }}
                className="flex items-center bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Cancel
              </Button>
            </div>
          )}
        </CardHeader>

        {/* Card Content */}
        <form id="documentation-form" onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-8 space-y-8">
            {/* General Information Section */}
            <Card className="border border-gray-300 rounded-xl shadow-md">
              <CardHeader className="bg-gray-50 p-5 rounded-t-xl flex items-center">
                <Info className="mr-3 h-6 w-6 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">General Information</CardTitle>
              </CardHeader>
              <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Account ID */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Database className="mr-2 h-4 w-4 text-indigo-400" />
                    Account ID:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        {...register("accountId")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Account ID"
                      />
                      {errors.accountId && (
                        <p className="text-red-500 text-sm mt-1">{errors.accountId.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">{modelData.accountId || "Not provided."}</p>
                  )}
                </div>

                {/* Label */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Info className="mr-2 h-4 w-4 text-indigo-400" />
                    Label:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        {...register("label")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Model Label"
                      />
                      {errors.label && (
                        <p className="text-red-500 text-sm mt-1">{errors.label.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">{modelData.label || "Not provided."}</p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <TrendingUp className="mr-2 h-4 w-4 text-indigo-400" />
                    Tags:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        {...register("tags")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter tags separated by commas"
                      />
                      {errors.tags && (
                        <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">
                      {modelData.tags?.join(", ") || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Default Language */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Code className="mr-2 h-4 w-4 text-indigo-400" />
                    Default Language:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        {...register("default_language")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Default Language"
                      />
                      {errors.default_language && (
                        <p className="text-red-500 text-sm mt-1">{errors.default_language.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">{modelData.default_language || "Not provided."}</p>
                  )}
                </div>

                {/* Subject Prompt Key */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Info className="mr-2 h-4 w-4 text-indigo-400" />
                    Subject Prompt Key:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        {...register("subject_prompt_key")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Subject Prompt Key"
                      />
                      {errors.subject_prompt_key && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject_prompt_key.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">{modelData.subject_prompt_key || "Not provided."}</p>
                  )}
                </div>

                {/* Subject Prompt Alias */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Info className="mr-2 h-4 w-4 text-indigo-400" />
                    Subject Prompt Alias:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        {...register("subject_prompt_alias")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter aliases separated by commas"
                      />
                      {errors.subject_prompt_alias && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject_prompt_alias.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">
                      {modelData.subject_prompt_alias?.join(", ") || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Info className="mr-2 h-4 w-4 text-indigo-400" />
                    Description:
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        {...register("description")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter model description..."
                      />
                      {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">{modelData.description || "Not provided."}</p>
                  )}
                </div>

                {/* Foundational Model */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Server className="mr-2 h-4 w-4 text-indigo-400" />
                    Foundational Model:
                  </label>
                  {isEditing ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("foundational_model")}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-700">
                      {modelData.foundational_model ? "Yes" : "No"}
                    </p>
                  )}
                </div>

                {/* Model ID */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Database className="mr-2 h-4 w-4 text-indigo-400" />
                    Model ID:
                  </label>
                  <p className="text-gray-700">{modelData.modelId || "Not provided."}</p>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <ExternalLink className="mr-2 h-4 w-4 text-indigo-400" />
                    Thumbnail URL:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="url"
                        {...register("thumbnail")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Thumbnail URL"
                      />
                      {errors.thumbnail && (
                        <p className="text-red-500 text-sm mt-1">{errors.thumbnail.message}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {modelData.thumbnail ? (
                        <img
                          src={modelData.iconName}
                          alt={`${modelData.label} Thumbnail`}
                          className="h-24 w-24 object-cover rounded-lg mr-4"
                        />
                      ) : (
                        <div className="h-24 w-24 bg-gray-200 rounded-lg mr-4 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <a
                        href={modelData.thumbnail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        {modelData.thumbnail || "Not provided."}
                      </a>
                    </div>
                  )}
                </div>

                {/* Prompt Template */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Code className="mr-2 h-4 w-4 text-indigo-400" />
                    Prompt Template:
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        {...register("prompt_template")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter prompt template..."
                      />
                      {errors.prompt_template && (
                        <p className="text-red-500 text-sm mt-1">{errors.prompt_template.message}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700">{modelData.prompt_template || "Not provided."}</p>
                  )}
                </div>

                {/* Created At */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="mr-2 h-4 w-4 text-indigo-400" />
                    Created At:
                  </label>
                  <p className="text-gray-700">
                    {modelData.createdAt
                      ? new Date(modelData.createdAt).toLocaleString()
                      : "Not provided."}
                  </p>
                </div>

                {/* Updated At */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="mr-2 h-4 w-4 text-indigo-400" />
                    Updated At:
                  </label>
                  <p className="text-gray-700">
                    {modelData.updatedAt
                      ? new Date(modelData.updatedAt).toLocaleString()
                      : "Not provided."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Safety Details Section */}
            <Card className="border border-gray-300 rounded-xl shadow-md">
              <CardHeader className="bg-gray-50 p-5 rounded-t-xl flex items-center">
                <Shield className="mr-3 h-6 w-6 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">Safety Details</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                {/* Bias Risks */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Info className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Bias Risks</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("safety_details.bias_risks")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe bias risks..."
                        />
                        {errors.safety_details?.bias_risks && (
                          <p className="text-red-500 text-sm mt-1">{errors.safety_details.bias_risks.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.safety_details?.bias_risks || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Limitations */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Info className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Limitations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("safety_details.limitations")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe limitations..."
                        />
                        {errors.safety_details?.limitations && (
                          <p className="text-red-500 text-sm mt-1">{errors.safety_details.limitations.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.safety_details?.limitations || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Out of Scope Use */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Info className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Out of Scope Use</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("safety_details.out_of_scope_use")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe out of scope uses..."
                        />
                        {errors.safety_details?.out_of_scope_use && (
                          <p className="text-red-500 text-sm mt-1">{errors.safety_details.out_of_scope_use.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.safety_details?.out_of_scope_use || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Info className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("safety_details.recommendations")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Provide recommendations..."
                        />
                        {errors.safety_details?.recommendations && (
                          <p className="text-red-500 text-sm mt-1">{errors.safety_details.recommendations.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.safety_details?.recommendations || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Training Details Section */}
            <Card className="border border-gray-300 rounded-xl shadow-md">
              <CardHeader className="bg-gray-50 p-5 rounded-t-xl flex items-center">
                <Database className="mr-3 h-6 w-6 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">Training Details</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                {/* Training Data */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Database className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Training Data</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("training_details.training_data")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe training data..."
                        />
                        {errors.training_details?.training_data && (
                          <p className="text-red-500 text-sm mt-1">{errors.training_details.training_data.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.training_details?.training_data || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Preprocessing Steps */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Database className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Preprocessing Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("training_details.preprocessing_steps")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe preprocessing steps..."
                        />
                        {errors.training_details?.preprocessing_steps && (
                          <p className="text-red-500 text-sm mt-1">{errors.training_details.preprocessing_steps.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.training_details?.preprocessing_steps || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Hyperparameters */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Code className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Hyperparameters</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {/* Training Regime */}
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Code className="mr-2 h-4 w-4 text-indigo-400" />
                        Training Regime:
                      </label>
                      {isEditing ? (
                        <div>
                          <Textarea
                            {...register("training_details.hyperparameters.training_regime")}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Describe training regime..."
                          />
                          {errors.training_details?.hyperparameters?.training_regime && (
                            <p className="text-red-500 text-sm mt-1">{errors.training_details.hyperparameters.training_regime.message}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-700">
                          {modelData.training_details?.hyperparameters.training_regime || "Not provided."}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Evaluation Section */}
            <Card className="border border-gray-300 rounded-xl shadow-md">
              <CardHeader className="bg-gray-50 p-5 rounded-t-xl flex items-center">
                <TrendingUp className="mr-3 h-6 w-6 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">Evaluation</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                {/* Testing Data */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Info className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Testing Data</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("evaluation.testing_data")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe testing data..."
                        />
                        {errors.evaluation?.testing_data && (
                          <p className="text-red-500 text-sm mt-1">{errors.evaluation.testing_data.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.evaluation?.testing_data || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Metrics */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("evaluation.metrics")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe metrics..."
                        />
                        {errors.evaluation?.metrics && (
                          <p className="text-red-500 text-sm mt-1">{errors.evaluation.metrics.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.evaluation?.metrics || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Results */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Results</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Textarea
                          {...register("evaluation.results")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Describe results..."
                        />
                        {errors.evaluation?.results && (
                          <p className="text-red-500 text-sm mt-1">{errors.evaluation.results.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.evaluation?.results || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Environmental Impact Section */}
            <Card className="border border-gray-300 rounded-xl shadow-md">
              <CardHeader className="bg-gray-50 p-5 rounded-t-xl flex items-center">
                <Leaf className="mr-3 h-6 w-6 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                {/* Hardware Type */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Server className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Hardware Type</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("environmental_impact.hardware_type")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Hardware Type"
                        />
                        {errors.environmental_impact?.hardware_type && (
                          <p className="text-red-500 text-sm mt-1">{errors.environmental_impact.hardware_type.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.environmental_impact?.hardware_type || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Hours Used */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Hours Used</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="number"
                          {...register("environmental_impact.hours_used", { valueAsNumber: true })}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Hours Used"
                        />
                        {errors.environmental_impact?.hours_used && (
                          <p className="text-red-500 text-sm mt-1">{errors.environmental_impact.hours_used.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.environmental_impact?.hours_used !== undefined
                          ? modelData.environmental_impact.hours_used
                          : "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Cloud Provider */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Server className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Cloud Provider</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("environmental_impact.cloud_provider")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Cloud Provider"
                        />
                        {errors.environmental_impact?.cloud_provider && (
                          <p className="text-red-500 text-sm mt-1">{errors.environmental_impact.cloud_provider.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.environmental_impact?.cloud_provider || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Compute Region */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Server className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Compute Region</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("environmental_impact.compute_region")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Compute Region"
                        />
                        {errors.environmental_impact?.compute_region && (
                          <p className="text-red-500 text-sm mt-1">{errors.environmental_impact.compute_region.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.environmental_impact?.compute_region || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Carbon Emitted */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Carbon Emitted</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("environmental_impact.carbon_emitted")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Carbon Emitted"
                        />
                        {errors.environmental_impact?.carbon_emitted && (
                          <p className="text-red-500 text-sm mt-1">{errors.environmental_impact.carbon_emitted.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.environmental_impact?.carbon_emitted || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Technical Specifications Section */}
            <Card className="border border-gray-300 rounded-xl shadow-md">
              <CardHeader className="bg-gray-50 p-5 rounded-t-xl flex items-center">
                <Code className="mr-3 h-6 w-6 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6">
                {/* Model Architecture */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Code className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Model Architecture</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("technical_specifications.model_architecture")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Model Architecture"
                        />
                        {errors.technical_specifications?.model_architecture && (
                          <p className="text-red-500 text-sm mt-1">{errors.technical_specifications.model_architecture.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.technical_specifications?.model_architecture || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Compute Infrastructure */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Server className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Compute Infrastructure</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("technical_specifications.compute_infrastructure")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Compute Infrastructure"
                        />
                        {errors.technical_specifications?.compute_infrastructure && (
                          <p className="text-red-500 text-sm mt-1">{errors.technical_specifications.compute_infrastructure.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.technical_specifications?.compute_infrastructure || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Hardware */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Server className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Hardware</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("technical_specifications.hardware")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Hardware Details"
                        />
                        {errors.technical_specifications?.hardware && (
                          <p className="text-red-500 text-sm mt-1">{errors.technical_specifications.hardware.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.technical_specifications?.hardware || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Software */}
                <Card className="border border-gray-200 rounded-lg shadow-sm">
                  <CardHeader className="bg-gray-100 p-4 rounded-t-lg flex items-center">
                    <Code className="mr-2 h-5 w-5 text-indigo-400" />
                    <CardTitle className="text-md font-medium">Software</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          {...register("technical_specifications.software")}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter Software Details"
                        />
                        {errors.technical_specifications?.software && (
                          <p className="text-red-500 text-sm mt-1">{errors.technical_specifications.software.message}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-700">
                        {modelData.technical_specifications?.software || "Not provided."}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Model Sources Section */}
            <Card className="border border-gray-300 rounded-xl shadow-md">
              <CardHeader className="bg-gray-50 p-5 rounded-t-xl flex items-center">
                <ExternalLink className="mr-3 h-6 w-6 text-indigo-500" />
                <CardTitle className="text-xl font-semibold">Model Sources</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Repository */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <ExternalLink className="mr-2 h-4 w-4 text-indigo-400" />
                    Repository:
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="url"
                        {...register("model_sources.repository")}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Repository URL"
                      />
                      {errors.model_sources?.repository && (
                        <p className="text-red-500 text-sm mt-1">{errors.model_sources.repository.message}</p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={modelData.model_sources?.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      {modelData.model_sources?.repository || "Not provided."}
                    </a>
                  )}
                </div>

                {/* Demo */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <ExternalLink className="mr-2 h-4 w-4 text-indigo-400" />
                    Demo:
                  </label>
                  {isEditing ? (
                    <Input
                      type="url"
                      {...register("model_sources.demo")}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter Demo URL"
                    />
                  ) : (
                    <a
                      href={modelData.model_sources?.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      {modelData.model_sources?.demo || "Not provided."}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </form>

        {/* Card Footer (Optional) */}
        <CardFooter className="p-6 bg-gray-50 rounded-b-3xl">
          {/* You can add additional actions or information here if needed */}
        </CardFooter>
      </Card>
    </div>
  );
};
