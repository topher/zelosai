'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { 
  FaMedal, 
  FaGlobe, 
  FaInstagram, 
  FaHandHoldingHeart,
  FaStarOfLife, 
  FaOldRepublic, 
  FaDumbbell,
  FaMountain,
  FaHeart,
  FaShoePrints,
  FaRegSmileWink,
  FaRegThumbsUp,
  FaRunning,
  FaRegSmile,
  FaRegHandshake,
  FaRegLightbulb,
  FaRegHeart,
  FaRegKissWinkHeart,
  FaLeaf,
  FaBrain,
  FaTshirt,
  FaHamburger,
  FaPlane,
  FaLaptop,
  FaGamepad,
  FaPalette,
  FaMusic,
  FaHome,
} from 'react-icons/fa';

import CategoryBox from "../CategoryBox";
import Container from '../Container';

export const categories = [
  {
    label: 'Medalists',
    code: 'Medalist_isCategory',
    icon: FaMedal,
    description: 'Olympic and World Medalists',
  },
  {
    label: 'Record Holders',
    code: 'RecordHolder_isCategory',
    icon: FaGlobe,
    description: 'World and National Record Holders',
  },
  {
    label: 'Social Sensations',
    code: 'SocialSensation_isCategory',
    icon: FaInstagram,
    description: 'Strong Social Media Presence',
  },
  {
    label: 'Philanthropy',
    code: 'Philanthropist_isCategory',
    icon: FaHandHoldingHeart,
    description: 'Involved in Philanthropy',
  },
  {
    label: 'Rising Stars',
    code: 'RisingStar_isCategory',
    icon: FaStarOfLife,
    description: 'Emerging Talents',
  },
  {
    label: 'Veterans',
    code: 'Veteran_isCategory',
    icon: FaOldRepublic,
    description: 'Experienced Athletes',
  },
  {
    label: 'Fitness Gurus',
    code: 'FitnessGuru_isCategory',
    icon: FaDumbbell,
    description: 'Fitness Influencers',
  },
  {
    label: 'Adventurers',
    code: 'Adventurer_isCategory',
    icon: FaMountain,
    description: 'Outdoor Adventure Sports',
  },
  {
    label: 'Wellness',
    code: 'Wellnessadvocate_isCategory',
    icon: FaHeart,
    description: 'Wellness Advocates',
  },
  {
    label: 'Lifestyle',
    code: 'Lifestyleadvocate_isCategory',
    icon: FaShoePrints,
    description: 'Lifestyle Influencers',
  },
  {
    label: 'Comebacks',
    code: 'Comebackathlete_isCategory',
    icon: FaRegSmileWink,
    description: 'Overcame Injuries or Setbacks',
  },
  {
    label: 'Inspirational',
    code: 'Inspirationalfigure_isCategory',
    icon: FaRegThumbsUp,
    description: 'Inspiring Life Stories',
  },
  {
    label: 'Team Players',
    code: 'TeamPlayer_isCategory',
    icon: FaRegHandshake,
    description: 'Excel in Team Sports',
  },
  {
    label: 'Innovators',
    code: 'Innovator_isCategory',
    icon: FaRegLightbulb,
    description: 'Innovative Athletes',
  },
  {
    label: 'Fan Favorites',
    code: 'FanFavorite_isCategory',
    icon: FaRegHeart,
    description: 'Popular Among Fans',
  },
  {
    label: 'Romantic',
    code: 'Romanticfigure_isCategory',
    icon: FaRegKissWinkHeart,
    description: 'Romantic Life Stories',
  },
  {
    label: 'Endurance',
    code: 'Enduranceathlete_isCategory',
    icon: FaRunning,
    description: 'Excel in Endurance Sports',
  },
  {
    label: 'Charismatic',
    code: 'Charismaticfigure_isCategory',
    icon: FaRegSmile,
    description: 'Charismatic Personalities',
  },
  {
    label: 'Eco-Friendly',
    code: 'EcoFriendlyadvocate_isCategory',
    icon: FaLeaf,
    description: 'Eco-Friendly Advocates',
  },
  {
    label: 'Mental Health',
    code: 'MentalHealthadvocate_isCategory',
    icon: FaBrain,
    description: 'Mental Health Advocates',
  },
  {
    label: 'Fashionistas',
    code: 'Fashionista_isCategory',
    icon: FaTshirt,
    description: 'Fashion Influencers',
  },
  {
    label: 'Foodies',
    code: 'Foodie_isCategory',
    icon: FaHamburger,
    description: 'Food Enthusiasts',
  },
  {
    label: 'Travelers',
    code: 'Traveler_isCategory',
    icon: FaPlane,
    description: 'Frequent Travelers',
  },
  {
    label: 'Tech-Savvy',
    code: 'TechSavvyindividual_isCategory',
    icon: FaLaptop,
    description: 'Tech Enthusiasts',
  },
  {
    label: 'Gamers',
    code: 'Gamer_isCategory',
    icon: FaGamepad,
    description: 'Gaming Enthusiasts',
  },
  {
    label: 'Art Lovers',
    code: 'ArtLover_isCategory',
    icon: FaPalette,
    description: 'Art Enthusiasts',
  },
  {
    label: 'Music Lovers',
    code: 'MusicLover_isCategory',
    icon: FaMusic,
    description: 'Music Enthusiasts',
  },
  {
    label: 'Family-Oriented',
    code: 'FamilyOrientedindividual_isCategory',
    icon: FaHome,
    description: 'Family-Oriented Athletes',
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={params?.get(item.code) === "true"} // this checks if the category is present in the params
          code={item.code}
      />

        ))}
      </div>
    </Container>
  );
}

export default Categories;
