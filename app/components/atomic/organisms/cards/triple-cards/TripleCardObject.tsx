// /app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardObject.tsx

"use client";

import React, { useState } from "react";
import TripleCardUserActions from "@/app/components/atomic/organisms/cards/triple-cards/TripleCardUserActions";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin, FaYoutube, FaTiktok, FaSnapchat } from "react-icons/fa";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import DynamicResourceModal from "@/app/components/atomic/ttemplates/modals/DynamicResourceModal";
import { Triple } from "@/app/types";
import { ResourceType } from "@/config/resourceTypes";
import { toast } from "react-hot-toast";

interface TripleCardObjectProps {
  triple: Triple;
  onUpdateTriple: (updatedTriples: Triple[]) => void;
  onDeleteTriple: (deletedTripleId: string) => void;
  onEditTriple: (triple: Triple) => void; // New prop
}

const TripleCardObject: React.FC<TripleCardObjectProps> = ({
  triple,
  onUpdateTriple,
  onDeleteTriple,
  onEditTriple,
}) => {
  const { subject, predicate, object, citation, id, type } = triple;

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  // State to manage modal visibility and action
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'create' | 'update' | 'delete'>('update');

  // Function to handle edit action
  const handleEdit = () => {
    setModalAction('update');
    setModalOpen(true);
  };

  // Function to handle delete action
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this triple?")) {
      onDeleteTriple(id);
    }
  };

  // Extract 'type' from 'subject' URI if not already provided
  const getProfileTypeFromTripleURI = (subjectUri: string): "athlete" | "brand" | "user" | string => {
    const temporaryTypeToResourceTypeMapping = {
      ProfileUser: "user",
      ProfileAthlete: "athlete",
      ProfileBrand: "brand",
    } as const;
  
    const uriParts = subjectUri.split("/");
    const typeIndex = uriParts.findIndex((part) => part === "knowledge") + 1;
  
    // Narrow down `type` to match the keys of the mapping object
    const type = uriParts[typeIndex] as keyof typeof temporaryTypeToResourceTypeMapping;
  
    // Map the type using the mapping, or return the original type if not found
    const mappedType = temporaryTypeToResourceTypeMapping[type] || type;
  
    return mappedType;
  };  

  const resourceType = type || getProfileTypeFromTripleURI(subject);

  // Randomly decide on card style
  const [isGradientStyle, setIsGradientStyle] = useState<boolean>(false);

  React.useEffect(() => {
    setIsGradientStyle(Math.random() >= 0.5); // 50% chance for gradient style
  }, []);

  const plainCardStyles =
    "group bg-white/20 backdrop-blur-lg shadow-md rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white/30";

  const gradientCardStyles =
    "group bg-gradient-to-br from-indigo to-blue text-white shadow-md rounded-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 hover:from-blue hover:to-indigo-light";

  const cardStyles = isGradientStyle ? gradientCardStyles : plainCardStyles;

  // Function to get social media icon with hover effect
  const getSocialMediaIcon = (url: string) => {
    const baseClass =
      "h-20 w-20 text-white cursor-pointer transition-colors duration-200";
    if (url.includes("twitter.com")) {
      return <FaTwitter className={`${baseClass} hover:text-blue-400`} />;
    } else if (url.includes("instagram.com")) {
      return <FaInstagram className={`${baseClass} hover:text-pink-500`} />;
    } else if (url.includes("facebook.com")) {
      return <FaFacebook className={`${baseClass} hover:text-blue-600`} />;
    } else if (url.includes("linkedin.com")) {
      return <FaLinkedin className={`${baseClass} hover:text-blue-700`} />;
    } else if (url.includes("youtube.com")) {
      return <FaYoutube className={`${baseClass} hover:text-red-600`} />;
    } else if (url.includes("tiktok.com")) {
      return <FaTiktok className={`${baseClass} hover:text-black`} />;
    } else if (url.includes("snapchat.com")) {
      return <FaSnapchat className={`${baseClass} hover:text-yellow-500`} />;
    }
    return null;
  };

  const socialMediaIcon =
    predicate.includes("has_social_media") ? getSocialMediaIcon(object) : null;

  return (
    <>
      <div
        className={`${cardStyles} flex flex-col cursor-pointer`}
      >
        {/* Main Content */}
        <div className="flex-grow">
          <Link href={`/search/predicates/${resourceType}/${predicate}`} passHref>
            <div
              className={`content flex-grow ${
                !socialMediaIcon ? "p-4" : "pl-4 pt-2"
              }`}
            >
              {/* Hide the object text if it's a social media link */}
              {!socialMediaIcon && (
                <p
                  className={`
                      object-text text-xl text-white font-semibold transition-colors duration-300 
                      ${
                        isGradientStyle
                          ? "group-hover:text-darkGray"
                          : "group-hover:text-gold"
                      } break-words
                    `}
                >
                  {object}
                </p>
              )}
              <p
                className={`predicate-text text-white/60 text-sm capitalize mt-2 break-words ${
                  socialMediaIcon ? "mt-0" : ""
                }`}
              >
                {predicate.replace(/_/g, " ")}
              </p>
              {citation && (
                <div
                  className={`citation-text text-white/40 text-xs italic mt-4 break-words ${
                    socialMediaIcon ? "mt-0" : ""
                  }`}
                >
                  {citation}
                </div>
              )}
            </div>
          </Link>
        </div>

        {/* Social Media Icon */}
        {socialMediaIcon && (
          <div className="p-4 flex items-center justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={object}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {socialMediaIcon}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="z-50">
                  <span>{object}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* User Actions */}
        <TripleCardUserActions
          likes={likes}
          dislikes={dislikes}
          comments={0}
          onLike={() => setLikes(likes + 1)}
          onDislike={() => setDislikes(dislikes + 1)}
          onComment={() => { /* Handle comment action */ }}
          onBookmark={() => { /* Handle bookmark action */ }}
          onShare={() => { /* Handle share action */ }}
          onGetLink={() => { /* Handle get link action */ }}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* Modal for CRUD operations */}
      {isModalOpen && (
        <DynamicResourceModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          resourceType={ResourceType.Triple}
          action={modalAction}
          resourceId={id} // Ensure this can handle multiple IDs if needed
          initialData={triple}
          onSuccess={(updatedTriples: Triple[]) => {
            onUpdateTriple(updatedTriples);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default TripleCardObject;
