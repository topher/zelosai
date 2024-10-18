// // app/components/profile/AthleteProfile.tsx

// "use client";

// import React, { useState, useEffect } from 'react';
// import ProfileHead from './ProfileHead';
// import ProfileUserActions from './ProfileUserActions';
// import ProfileGrid from './ProfileGrid';
// import { Triple } from '@/app/types';

// interface AthleteProfileProps {
//   resource: Triple[];
// }

// const AthleteProfile: React.FC<AthleteProfileProps> = ({ resource }) => {
//   const [triples, setTriples] = useState<Triple[]>([]);

//   useEffect(() => {
//     const filteredTriples = resource.filter(
//       (triple) => triple.predicate !== 'ATHLETE' && triple.predicate !== 'URL'
//     );
//     setTriples(filteredTriples);
//   }, [resource]);

//   // Retrieve nameTriple from the original resource before filtering
//   const nameTriple = resource.find((triple) => triple.predicate === 'has_name');

//   return (
//     <div className="athlete-profile">
//       {/* Header */}
//       <div className="p-8">
//         <ProfileHead
//           name={nameTriple?.object || 'Name Unavailable'}
//           imageSrc="/placeholder_avatar.png"
//         />
//       </div>

//       <div style={{ minHeight: '100px' }}>
//         <ProfileUserActions type="athlete" />
//       </div>

//       {/* Mosaic Grid */}
//       <ProfileGrid triples={triples} gridClassName="my-masonry-grid" />
//     </div>
//   );
// };

// export default AthleteProfile;
