"use client"
import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { rules } from "@/app/data"; // Assuming rules data is defined here
import RulesList from "./components/rules-list"; // Import the new RulesList component
import AccessRightsForm from "./components/rule-form"; // Import the AccessRightsForm component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";

// Import from radix-ui
import { Dialog, DialogTrigger, DialogContent, DialogOverlay } from '@radix-ui/react-dialog';

export default function SettingsProfilePage() {

  return (
    <div className="space-y-6">
    </div>
  );
}
