import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { FaBrain, FaBolt, FaTrophy, FaChartLine, FaHandsHelping, FaBalanceScale, FaExpandArrowsAlt } from 'react-icons/fa';

export const MAX_FREE_COUNTS = 50;

export const reasonsToUseZelos = [
  {
    name: "Unlock Audience Insights",
    icon: <FaChartLine size={30} style={{ color: "#FF6347" }} />, // Tomato color 
    description: "Go beyond demographics. Get deep fan understanding to win in sports marketing.",
  },
  {
    name: "Reimagine Fan Engagement",
    icon: <FaBolt size={30} style={{ color: "#FFD700" }} />, // Gold color  
    description: "AI-powered assets boost engagement & redefine athlete representation.",
  },
  {
    name: "Empower Your Athletes",
    icon: <FaTrophy size={30} style={{ color: "#32CD32" }} />, // LimeGreen color 
    description: "Give athletes control over digital assets, opening new revenue streams.",
  },
  {
    name: "Data-Driven Decisions",
    icon: <FaBrain size={30} style={{ color: "#1E90FF" }} />, // DodgerBlue color 
    description: "Turn insights into action. Run targeted campaigns & activate sponsors with confidence.",
  },
  {
    name: "Try Zelos Risk-Free",
    icon: <FaHandsHelping size={30} style={{ color: "#9370DB" }} />, // MediumPurple color  
    description: "See the Zelos difference. Get a free, interactive demo today.",
  },
  {
    name: "Real-World Results",
    icon: <FaTrophy size={30} style={{ color: "#FF69B4" }} />, // HotPink color 
    description: "Get inspired by athlete-brand success stories powered by Zelos.",
  },
  {
    name: "Built-in Trust & Security",
    icon: <FaBalanceScale size={30} style={{ color: "#FFA07A" }} />, // LightSalmon color 
    description: "Focus on what matters. Zelos ensures ethical practices & IP protection.",
  },
  {
    name: "Grow with Zelos",
    icon: <FaExpandArrowsAlt size={30} style={{ color: "#20B2AA" }} />, // LightSeaGreen color  
    description: "Zelos scales with your brand. Adapt to any sports marketing need.",
  },
];
