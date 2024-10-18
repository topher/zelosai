// // app/components/profile/BrandProfile.tsx

// "use client";

// import React, { useState, useEffect } from 'react';
// import ProfileHead from './ProfileHead';
// import ProfileUserActions from './ProfileUserActions';
// import ProfileGrid from './ProfileGrid';
// import { Triple } from '@/app/types';

// interface BrandProfileProps {
//   resource: Triple[];
// }

// const BrandProfile: React.FC<BrandProfileProps> = ({ resource }) => {
//   const [triples, setTriples] = useState<Triple[]>([]);

//   useEffect(() => {
//     const filteredTriples = resource.filter(
//       (triple) => triple.predicate !== 'BRAND' && triple.predicate !== 'URL'
//     );
//     setTriples(filteredTriples);
//   }, [resource]);

//   // Retrieve nameTriple and imageTriple from the unfiltered resource
//   const nameTriple = resource.find((triple) => triple.predicate === 'has_name');
//   const imageTriple = resource.find((triple) => triple.predicate === 'has_wiki_logo_url');
//   const imageSrc = imageTriple?.object || '/brand_avatar.png';

//   return (
//     <div className="brand-profile">
//       {/* Header */}
//       <div className="p-8">
//         <ProfileHead
//           name={nameTriple?.object || 'Unnamed Brand'}
//           imageSrc={imageSrc}
//         />
//       </div>

//       <div style={{ minHeight: '100px' }}>
//         <ProfileUserActions type="brand" />
//       </div>

//       {/* Mosaic Grid */}
//       <ProfileGrid triples={triples} gridClassName="my-masonry-grid" />
//     </div>
//   );
// };

// export default BrandProfile;
