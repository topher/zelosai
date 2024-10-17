// app/components/profile/AthleteProfile_leg.tsx

'use client'

import { useEffect, useState } from "react";
import { SafeAthlete } from "@/app/types";
import Container from "@/app/components/Container";
import AthleteHead from "@/app/components/profile/ProfileHead";
import AthleteInfo from "@/app/components/profile/ProfileInfo";
import Description from "@/app/components/profile/Description";
import CollaborationRequest from "./CollaborationRequest";

interface AthleteProfileProps {
  athlete: SafeAthlete;
}

const AthleteProfile: React.FC<AthleteProfileProps> = ({ athlete }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (athlete) {
      setIsReady(true);
    }
  }, [athlete]);

  if (!isReady) return <p>Loading...</p>;
  return (
    <Container>
      <div className="max-w-screen-md mx-auto p-4">
        <AthleteHead name={athlete.name} imageSrc={athlete.imageSrc} hdriPath={"../images/christmas_photo_studio_03_4k.hdr"} />
        <AthleteInfo athlete={athlete} />
        <CollaborationRequest price={1000} />
        <Description description={athlete.description} />
      </div>
    </Container>
  );
};

export default AthleteProfile;
