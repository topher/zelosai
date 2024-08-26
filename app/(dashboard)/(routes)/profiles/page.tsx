// import Splash from "@/app/Splash";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ProfileCard"
import EmptyState from "@/app/components/EmptyState";

import getProfiles, { IProfileParams } from "@/app/actions/getProfiles";

import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
// import { useEffect, useState } from "react";
// import { SafeProfile, SafeUser } from "./types";
import ProfileCard from "@/app/components/listings/ProfileCard";


interface HomeProps {
  searchParams: IProfileParams
};

// Home Component
const Home = async ({ searchParams }: HomeProps) => {
  console.log("Home component rendered with searchParams:", searchParams);
  // const [profiles, setProfiles] = useState<SafeProfile[]>([]);
  // const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

      const profiles = await getProfiles(searchParams);
      // const currentUser = await getCurrentUser();

  

  if (profiles.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >
          {profiles.map((profile) => (
            <ProfileCard 
              key={profile.id}
              data={profile}
              // currentUser={currentUser} 
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
