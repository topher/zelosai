// models/components/DocumentationTab.tsx

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
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
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

  return (
    <div className="py-8 w-full bg-offWhite">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-darkGray">
            <Shield className="inline-block h-8 w-8 text-indigo mr-2" />
            Model Documentation
          </h1>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center bg-indigo text-white hover:bg-indigo-light transition-colors duration-300"
              aria-label="Edit Model Documentation"
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
                className="flex items-center bg-gold text-darkGray hover:bg-gold-light transition-colors duration-300"
                aria-label="Save Changes"
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
                className="flex items-center bg-red text-white hover:bg-red-light transition-colors duration-300"
                aria-label="Cancel Editing"
              >
                <XCircle className="mr-2 h-5 w-5" />
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Content */}
        <form id="documentation-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10">
            {/* General Information */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-darkGray mb-6 flex items-center">
                <Info className="h-7 w-7 text-indigo mr-2" />
                General Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Thumbnail and Basic Info */}
                <div className="flex flex-col items-center md:items-start">
                  {isEditing ? (
                    <div className="w-full">
                      <label
                        htmlFor="thumbnail"
                        className="block text-sm font-medium text-lightGray mb-2"
                      >
                        Thumbnail URL
                      </label>
                      <Input
                        type="url"
                        id="thumbnail"
                        {...register("thumbnail")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Enter Thumbnail URL"
                      />
                      {errors.thumbnail && (
                        <p className="text-red text-sm mt-1">
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
                    <div className="h-48 w-48 bg-lightGray rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white">No Image</span>
                    </div>
                  )}

                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-darkGray">
                      {modelData.label || "Model Label"}
                    </h3>
                    <p className="text-lightGray">
                      {modelData.description || "No description provided."}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  {/* Account ID */}
                  <div>
                    <label
                      htmlFor="accountId"
                      className="block text-sm font-medium text-lightGray"
                    >
                      Account ID
                    </label>
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          id="accountId"
                          {...register("accountId")}
                          className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                          placeholder="Enter Account ID"
                        />
                        {errors.accountId && (
                          <p className="text-red text-sm mt-1">
                            {errors.accountId.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-darkGray">
                        {modelData.accountId || "Not provided."}
                      </p>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-lightGray"
                    >
                      Tags
                    </label>
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          id="tags"
                          {...register("tags")}
                          className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                          placeholder="Enter tags separated by commas"
                        />
                        {errors.tags && (
                          <p className="text-red text-sm mt-1">
                            {errors.tags.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap">
                        {modelData.tags?.length ? (
                          modelData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="mr-2 mb-2 px-3 py-1 bg-indigo-light text-white rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <p className="text-darkGray">No tags provided.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Default Language */}
                  <div>
                    <label
                      htmlFor="default_language"
                      className="block text-sm font-medium text-lightGray"
                    >
                      Default Language
                    </label>
                    {isEditing ? (
                      <div>
                        <Input
                          type="text"
                          id="default_language"
                          {...register("default_language")}
                          className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                          placeholder="Enter Default Language"
                        />
                        {errors.default_language && (
                          <p className="text-red text-sm mt-1">
                            {errors.default_language.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-darkGray">
                        {modelData.default_language || "Not provided."}
                      </p>
                    )}
                  </div>

                  {/* Foundational Model */}
                  <div>
                    <label
                      htmlFor="foundational_model"
                      className="block text-sm font-medium text-lightGray"
                    >
                      Foundational Model
                    </label>
                    {isEditing ? (
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="foundational_model"
                          {...register("foundational_model")}
                          className="h-4 w-4 text-indigo border-lightGray rounded focus:ring-indigo"
                        />
                        <label
                          htmlFor="foundational_model"
                          className="ml-2 text-sm text-lightGray"
                        >
                          Yes
                        </label>
                      </div>
                    ) : (
                      <p className="text-darkGray">
                        {modelData.foundational_model ? "Yes" : "No"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Safety Details */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-darkGray mb-6 flex items-center">
                <Shield className="h-7 w-7 text-indigo mr-2" />
                Safety Details
              </h2>
              <div className="space-y-6">
                {/* Bias Risks */}
                <div>
                  <label
                    htmlFor="bias_risks"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Bias Risks
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="bias_risks"
                        {...register("safety_details.bias_risks")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe bias risks..."
                      />
                      {errors.safety_details?.bias_risks && (
                        <p className="text-red text-sm mt-1">
                          {errors.safety_details.bias_risks.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.safety_details?.bias_risks || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Limitations */}
                <div>
                  <label
                    htmlFor="limitations"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Limitations
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="limitations"
                        {...register("safety_details.limitations")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe limitations..."
                      />
                      {errors.safety_details?.limitations && (
                        <p className="text-red text-sm mt-1">
                          {errors.safety_details.limitations.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.safety_details?.limitations || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Out of Scope Use */}
                <div>
                  <label
                    htmlFor="out_of_scope_use"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Out of Scope Use
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="out_of_scope_use"
                        {...register("safety_details.out_of_scope_use")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe out of scope uses..."
                      />
                      {errors.safety_details?.out_of_scope_use && (
                        <p className="text-red text-sm mt-1">
                          {errors.safety_details.out_of_scope_use.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.safety_details?.out_of_scope_use ||
                        "Not provided."}
                    </p>
                  )}
                </div>

                {/* Recommendations */}
                <div>
                  <label
                    htmlFor="recommendations"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Recommendations
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="recommendations"
                        {...register("safety_details.recommendations")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Provide recommendations..."
                      />
                      {errors.safety_details?.recommendations && (
                        <p className="text-red text-sm mt-1">
                          {errors.safety_details.recommendations.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.safety_details?.recommendations ||
                        "Not provided."}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Training Details */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-darkGray mb-6 flex items-center">
                <Database className="h-7 w-7 text-indigo mr-2" />
                Training Details
              </h2>
              <div className="space-y-6">
                {/* Training Data */}
                <div>
                  <label
                    htmlFor="training_data"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Training Data
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="training_data"
                        {...register("training_details.training_data")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe training data..."
                      />
                      {errors.training_details?.training_data && (
                        <p className="text-red text-sm mt-1">
                          {errors.training_details.training_data.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.training_details?.training_data ||
                        "Not provided."}
                    </p>
                  )}
                </div>

                {/* Preprocessing Steps */}
                <div>
                  <label
                    htmlFor="preprocessing_steps"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Preprocessing Steps
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="preprocessing_steps"
                        {...register("training_details.preprocessing_steps")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe preprocessing steps..."
                      />
                      {errors.training_details?.preprocessing_steps && (
                        <p className="text-red text-sm mt-1">
                          {errors.training_details.preprocessing_steps.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.training_details?.preprocessing_steps ||
                        "Not provided."}
                    </p>
                  )}
                </div>

                {/* Hyperparameters */}
                <div>
                  <label
                    htmlFor="training_regime"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Training Regime
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="training_regime"
                        {...register(
                          "training_details.hyperparameters.training_regime"
                        )}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe training regime..."
                      />
                      {errors.training_details?.hyperparameters
                        ?.training_regime && (
                        <p className="text-red text-sm mt-1">
                          {
                            errors.training_details.hyperparameters
                              .training_regime.message
                          }
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {
                        modelData.training_details?.hyperparameters
                          .training_regime || "Not provided."
                      }
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Evaluation */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-darkGray mb-6 flex items-center">
                <TrendingUp className="h-7 w-7 text-indigo mr-2" />
                Evaluation
              </h2>
              <div className="space-y-6">
                {/* Testing Data */}
                <div>
                  <label
                    htmlFor="testing_data"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Testing Data
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="testing_data"
                        {...register("evaluation.testing_data")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe testing data..."
                      />
                      {errors.evaluation?.testing_data && (
                        <p className="text-red text-sm mt-1">
                          {errors.evaluation.testing_data.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.evaluation?.testing_data || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Metrics */}
                <div>
                  <label
                    htmlFor="metrics"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Metrics
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="metrics"
                        {...register("evaluation.metrics")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe metrics..."
                      />
                      {errors.evaluation?.metrics && (
                        <p className="text-red text-sm mt-1">
                          {errors.evaluation.metrics.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.evaluation?.metrics || "Not provided."}
                    </p>
                  )}
                </div>

                {/* Results */}
                <div>
                  <label
                    htmlFor="results"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Results
                  </label>
                  {isEditing ? (
                    <div>
                      <Textarea
                        id="results"
                        {...register("evaluation.results")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Describe results..."
                      />
                      {errors.evaluation?.results && (
                        <p className="text-red text-sm mt-1">
                          {errors.evaluation.results.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray whitespace-pre-wrap">
                      {modelData.evaluation?.results || "Not provided."}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Environmental Impact */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-darkGray mb-6 flex items-center">
                <Leaf className="h-7 w-7 text-indigo mr-2" />
                Environmental Impact
              </h2>
              <div className="space-y-6">
                {/* Hardware Type */}
                <div>
                  <label
                    htmlFor="hardware_type"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Hardware Type
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        id="hardware_type"
                        {...register("environmental_impact.hardware_type")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Enter Hardware Type"
                      />
                      {errors.environmental_impact?.hardware_type && (
                        <p className="text-red text-sm mt-1">
                          {errors.environmental_impact.hardware_type.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray">
                      {modelData.environmental_impact?.hardware_type ||
                        "Not provided."}
                    </p>
                  )}
                </div>

                {/* Hours Used */}
                <div>
                  <label
                    htmlFor="hours_used"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
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
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Enter Hours Used"
                      />
                      {errors.environmental_impact?.hours_used && (
                        <p className="text-red text-sm mt-1">
                          {errors.environmental_impact.hours_used.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray">
                      {modelData.environmental_impact?.hours_used !== undefined
                        ? modelData.environmental_impact.hours_used
                        : "Not provided."}
                    </p>
                  )}
                </div>

                {/* Carbon Emitted */}
                <div>
                  <label
                    htmlFor="carbon_emitted"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Carbon Emitted
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="text"
                        id="carbon_emitted"
                        {...register("environmental_impact.carbon_emitted")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Enter Carbon Emitted"
                      />
                      {errors.environmental_impact?.carbon_emitted && (
                        <p className="text-red text-sm mt-1">
                          {errors.environmental_impact.carbon_emitted.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-darkGray">
                      {modelData.environmental_impact?.carbon_emitted ||
                        "Not provided."}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Model Sources */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-darkGray mb-6 flex items-center">
                <ExternalLink className="h-7 w-7 text-indigo mr-2" />
                Model Sources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Repository */}
                <div>
                  <label
                    htmlFor="repository"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Repository
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="url"
                        id="repository"
                        {...register("model_sources.repository")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Enter Repository URL"
                      />
                      {errors.model_sources?.repository && (
                        <p className="text-red text-sm mt-1">
                          {errors.model_sources.repository.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={modelData.model_sources?.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo hover:underline break-all"
                    >
                      {modelData.model_sources?.repository || "Not provided."}
                    </a>
                  )}
                </div>

                {/* Demo */}
                <div>
                  <label
                    htmlFor="demo"
                    className="block text-sm font-medium text-lightGray mb-2"
                  >
                    Demo
                  </label>
                  {isEditing ? (
                    <div>
                      <Input
                        type="url"
                        id="demo"
                        {...register("model_sources.demo")}
                        className="w-full p-2 border border-lightGray rounded focus:outline-none focus:ring-2 focus:ring-indigo"
                        placeholder="Enter Demo URL"
                      />
                      {errors.model_sources?.demo && (
                        <p className="text-red text-sm mt-1">
                          {errors.model_sources.demo.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <a
                      href={modelData.model_sources?.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo hover:underline break-all"
                    >
                      {modelData.model_sources?.demo || "Not provided."}
                    </a>
                  )}
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};
