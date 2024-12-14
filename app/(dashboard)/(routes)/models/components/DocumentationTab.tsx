// /app/(dashboard)/(routes)/models/components/DocumentationTab.tsx

"use client";

import { AIModel } from "@/app/types";
import { Loader } from "@/app/components/atomic/atoms/loader_b";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Edit3,
  Save,
  XCircle,
  Shield,
  Info,
  TrendingUp,
  Database,
  Leaf,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Image from "next/image";

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

  const sectionClass = "bg-gray-800 text-white rounded-xl shadow-sm p-6";
  const sectionHeadingClass = "text-2xl font-semibold text-white mb-6 flex items-center";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";
  const inputClass = "w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white";
  const textareaClass = "w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-white";
  const chipClass = "mr-2 mb-2 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm";

  return (
    <div className="py-8 w-full bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Shield className="inline-block h-8 w-8 text-indigo-400 mr-2" />
            Model Documentation
          </h1>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
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
                className="flex items-center bg-primary text-white hover:scale-105 transition-transform"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Save className="mr-2 h-5 w-5" />
                )}
                Save
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  reset(modelData);
                }}
                className="flex items-center bg-red-600 text-white hover:bg-red-500 transition-colors"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <form id="documentation-form" onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* General Information */}
          <section className={sectionClass}>
            <h2 className={sectionHeadingClass}>
              <Info className="h-7 w-7 text-indigo-400 mr-2" />
              General Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center md:items-start">
                {isEditing ? (
                  <div className="w-full">
                    <label htmlFor="thumbnail" className={labelClass}>
                      Thumbnail URL
                    </label>
                    <Input
                      type="url"
                      id="thumbnail"
                      {...register("thumbnail")}
                      className={inputClass}
                      placeholder="Enter Thumbnail URL"
                    />
                    {errors.thumbnail && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.thumbnail.message}
                      </p>
                    )}
                  </div>
                ) : modelData.thumbnail ? (
                  <Image
                    src={modelData.thumbnail}
                    alt={`${modelData.label} Thumbnail`}
                    width={200}
                    height={200}
                    className="object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="h-48 w-48 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white">No Image</span>
                  </div>
                )}
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white">
                    {modelData.label || "Model Label"}
                  </h3>
                  <p className="text-gray-300">
                    {modelData.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Account ID */}
                <div>
                  <label htmlFor="accountId" className={labelClass}>
                    Account ID
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        id="accountId"
                        {...register("accountId")}
                        className={inputClass}
                        placeholder="Enter Account ID"
                      />
                      {errors.accountId && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.accountId.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-300">
                      {modelData.accountId || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className={labelClass}>
                    Tags
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        id="tags"
                        {...register("tags")}
                        className={inputClass}
                        placeholder="Enter tags separated by commas"
                      />
                      {errors.tags && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.tags.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap">
                      {modelData.tags?.length ? (
                        modelData.tags.map((tag, index) => (
                          <span key={index} className={chipClass}>
                            {tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-300">No tags provided.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Default Language */}
                <div>
                  <label htmlFor="default_language" className={labelClass}>
                    Default Language
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        id="default_language"
                        {...register("default_language")}
                        className={inputClass}
                        placeholder="Enter Default Language"
                      />
                      {errors.default_language && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.default_language.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-300">
                      {modelData.default_language || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Foundational Model */}
                <div>
                  <label htmlFor="foundational_model" className={labelClass}>
                    Foundational Model
                  </label>
                  {isEditing ? (
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        id="foundational_model"
                        {...register("foundational_model")}
                        className="h-4 w-4 text-purple-500 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <label
                        htmlFor="foundational_model"
                        className="ml-2 text-sm text-gray-300"
                      >
                        Yes
                      </label>
                    </div>
                  ) : (
                    <p className="text-gray-300">
                      {modelData.foundational_model ? "Yes" : "No"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Safety Details */}
          <section className={sectionClass}>
            <h2 className={sectionHeadingClass}>
              <Shield className="h-7 w-7 text-indigo-400 mr-2" />
              Safety Details
            </h2>
            <div className="space-y-6">
              {/* Bias Risks */}
              <div>
                <label htmlFor="bias_risks" className={labelClass}>
                  Bias Risks
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="bias_risks"
                      {...register("safety_details.bias_risks")}
                      className={textareaClass}
                      placeholder="Describe bias risks..."
                    />
                    {errors.safety_details?.bias_risks && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.safety_details.bias_risks.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.safety_details?.bias_risks || "Not provided."}
                  </p>
                )}
              </div>

              {/* Limitations */}
              <div>
                <label htmlFor="limitations" className={labelClass}>
                  Limitations
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="limitations"
                      {...register("safety_details.limitations")}
                      className={textareaClass}
                      placeholder="Describe limitations..."
                    />
                    {errors.safety_details?.limitations && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.safety_details.limitations.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.safety_details?.limitations || "Not provided."}
                  </p>
                )}
              </div>

              {/* Out of Scope Use */}
              <div>
                <label htmlFor="out_of_scope_use" className={labelClass}>
                  Out of Scope Use
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="out_of_scope_use"
                      {...register("safety_details.out_of_scope_use")}
                      className={textareaClass}
                      placeholder="Describe out of scope uses..."
                    />
                    {errors.safety_details?.out_of_scope_use && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.safety_details.out_of_scope_use.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.safety_details?.out_of_scope_use ||
                      "Not provided."}
                  </p>
                )}
              </div>

              {/* Recommendations */}
              <div>
                <label htmlFor="recommendations" className={labelClass}>
                  Recommendations
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="recommendations"
                      {...register("safety_details.recommendations")}
                      className={textareaClass}
                      placeholder="Provide recommendations..."
                    />
                    {errors.safety_details?.recommendations && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.safety_details.recommendations.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.safety_details?.recommendations ||
                      "Not provided."}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Training Details */}
          <section className={sectionClass}>
            <h2 className={sectionHeadingClass}>
              <Database className="h-7 w-7 text-indigo-400 mr-2" />
              Training Details
            </h2>
            <div className="space-y-6">
              {/* Training Data */}
              <div>
                <label htmlFor="training_data" className={labelClass}>
                  Training Data
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="training_data"
                      {...register("training_details.training_data")}
                      className={textareaClass}
                      placeholder="Describe training data..."
                    />
                    {errors.training_details?.training_data && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.training_details.training_data.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.training_details?.training_data ||
                      "Not provided."}
                  </p>
                )}
              </div>

              {/* Preprocessing Steps */}
              <div>
                <label htmlFor="preprocessing_steps" className={labelClass}>
                  Preprocessing Steps
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="preprocessing_steps"
                      {...register("training_details.preprocessing_steps")}
                      className={textareaClass}
                      placeholder="Describe preprocessing steps..."
                    />
                    {errors.training_details?.preprocessing_steps && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.training_details.preprocessing_steps.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.training_details?.preprocessing_steps ||
                      "Not provided."}
                  </p>
                )}
              </div>

              {/* Hyperparameters */}
              <div>
                <label htmlFor="training_regime" className={labelClass}>
                  Training Regime
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="training_regime"
                      {...register("training_details.hyperparameters.training_regime")}
                      className={textareaClass}
                      placeholder="Describe training regime..."
                    />
                    {errors.training_details?.hyperparameters?.training_regime && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.training_details.hyperparameters.training_regime.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.training_details?.hyperparameters.training_regime ||
                      "Not provided."}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Evaluation */}
          <section className={sectionClass}>
            <h2 className={sectionHeadingClass}>
              <TrendingUp className="h-7 w-7 text-indigo-400 mr-2" />
              Evaluation
            </h2>
            <div className="space-y-6">
              {/* Testing Data */}
              <div>
                <label htmlFor="testing_data" className={labelClass}>
                  Testing Data
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="testing_data"
                      {...register("evaluation.testing_data")}
                      className={textareaClass}
                      placeholder="Describe testing data..."
                    />
                    {errors.evaluation?.testing_data && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.evaluation.testing_data.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.evaluation?.testing_data || "Not provided."}
                  </p>
                )}
              </div>

              {/* Metrics */}
              <div>
                <label htmlFor="metrics" className={labelClass}>
                  Metrics
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="metrics"
                      {...register("evaluation.metrics")}
                      className={textareaClass}
                      placeholder="Describe metrics..."
                    />
                    {errors.evaluation?.metrics && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.evaluation.metrics.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.evaluation?.metrics || "Not provided."}
                  </p>
                )}
              </div>

              {/* Results */}
              <div>
                <label htmlFor="results" className={labelClass}>
                  Results
                </label>
                {isEditing ? (
                  <div>
                    <Textarea
                      id="results"
                      {...register("evaluation.results")}
                      className={textareaClass}
                      placeholder="Describe results..."
                    />
                    {errors.evaluation?.results && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.evaluation.results.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {modelData.evaluation?.results || "Not provided."}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Environmental Impact */}
          <section className={sectionClass}>
            <h2 className={sectionHeadingClass}>
              <Leaf className="h-7 w-7 text-indigo-400 mr-2" />
              Environmental Impact
            </h2>
            <div className="space-y-6">
              {/* Hardware Type */}
              <div>
                <label htmlFor="hardware_type" className={labelClass}>
                  Hardware Type
                </label>
                {isEditing ? (
                  <div>
                    <Input
                      type="text"
                      id="hardware_type"
                      {...register("environmental_impact.hardware_type")}
                      className={inputClass}
                      placeholder="Enter Hardware Type"
                    />
                    {errors.environmental_impact?.hardware_type && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.environmental_impact.hardware_type.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300">
                    {modelData.environmental_impact?.hardware_type ||
                      "Not provided."}
                  </p>
                )}
              </div>

              {/* Hours Used */}
              <div>
                <label htmlFor="hours_used" className={labelClass}>
                  Hours Used
                </label>
                {isEditing ? (
                  <div>
                    <Input
                      type="number"
                      id="hours_used"
                      {...register("environmental_impact.hours_used", {
                        valueAsNumber: true,
                      })}
                      className={inputClass}
                      placeholder="Enter Hours Used"
                    />
                    {errors.environmental_impact?.hours_used && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.environmental_impact.hours_used.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300">
                    {modelData.environmental_impact?.hours_used !== undefined
                      ? modelData.environmental_impact.hours_used
                      : "Not provided."}
                  </p>
                )}
              </div>

              {/* Carbon Emitted */}
              <div>
                <label htmlFor="carbon_emitted" className={labelClass}>
                  Carbon Emitted
                </label>
                {isEditing ? (
                  <div>
                    <Input
                      type="text"
                      id="carbon_emitted"
                      {...register("environmental_impact.carbon_emitted")}
                      className={inputClass}
                      placeholder="Enter Carbon Emitted"
                    />
                    {errors.environmental_impact?.carbon_emitted && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.environmental_impact.carbon_emitted.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300">
                    {modelData.environmental_impact?.carbon_emitted ||
                      "Not provided."}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Model Sources */}
          <section className={sectionClass}>
            <h2 className={sectionHeadingClass}>
              <ExternalLink className="h-7 w-7 text-indigo-400 mr-2" />
              Model Sources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Repository */}
              <div>
                <label htmlFor="repository" className={labelClass}>
                  Repository
                </label>
                {isEditing ? (
                  <div>
                    <Input
                      type="url"
                      id="repository"
                      {...register("model_sources.repository")}
                      className={inputClass}
                      placeholder="Enter Repository URL"
                    />
                    {errors.model_sources?.repository && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.model_sources.repository.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <a
                    href={modelData.model_sources?.repository || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline break-all"
                  >
                    {modelData.model_sources?.repository || "Not provided."}
                  </a>
                )}
              </div>

              {/* Demo */}
              <div>
                <label htmlFor="demo" className={labelClass}>
                  Demo
                </label>
                {isEditing ? (
                  <div>
                    <Input
                      type="url"
                      id="demo"
                      {...register("model_sources.demo")}
                      className={inputClass}
                      placeholder="Enter Demo URL"
                    />
                    {errors.model_sources?.demo && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.model_sources.demo.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <a
                    href={modelData.model_sources?.demo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline break-all"
                  >
                    {modelData.model_sources?.demo || "Not provided."}
                  </a>
                )}
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
