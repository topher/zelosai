import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_COUNTS = 50;

// Type of Activity
export const user_activity = [
  {
    avatarSrc: "/avatars/01.png",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    action: "Downloaded",
    content: "Ontology Framework Guide",
    timestamp: "2 hours ago",
    target: "knowledge_bank"
  },
  {
    avatarSrc: "/avatars/02.png",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    action: "Contributed",
    content: "Semantic Web Case Study",
    timestamp: "5 hours ago",
    target: "knowledge_bank"
  },
  {
    avatarSrc: "/avatars/01.png",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    action: "Shared",
    content: "Data Ontology Whitepaper",
    timestamp: "1 day ago",
    target: "knowledge_bank"
  },
  {
    avatarSrc: "/avatars/02.png",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    action: "Downloaded",
    content: "Linked Data Principles",
    timestamp: "2 days ago",
    target: "knowledge_bank"
  },
  // Add more recent activity data objects as needed
];

//qwerty
export const tasks = [
    {
      "id": "TASK-8782",
      "title": "You can't compress the program without quantifying the open-source SSD pixel!",
      "status": "in progress",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-7878",
      "title": "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      "status": "backlog",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-7839",
      "title": "We need to bypass the neural TCP card!",
      "status": "todo",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-5562",
      "title": "The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!",
      "status": "backlog",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-8686",
      "title": "I'll parse the wireless SSL protocol, that should driver the API panel!",
      "status": "canceled",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-1280",
      "title": "Use the digital TLS panel, then you can transmit the haptic system!",
      "status": "done",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-7262",
      "title": "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!",
      "status": "done",
      "label": "feature",
      "priority": "high"
    },
    {
      "id": "TASK-1138",
      "title": "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
      "status": "in progress",
      "label": "feature",
      "priority": "medium"
    },
    {
      "id": "TASK-7184",
      "title": "We need to program the back-end THX pixel!",
      "status": "todo",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-5160",
      "title": "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
      "status": "in progress",
      "label": "documentation",
      "priority": "high"
    },
    {
      "id": "TASK-5618",
      "title": "Generating the driver won't do anything, we need to index the online SSL application!",
      "status": "done",
      "label": "documentation",
      "priority": "medium"
    },
    
    {
      "id": "TASK-4136",
      "title": "You can't hack the hard drive without hacking the primary JSON program!",
      "status": "canceled",
      "label": "bug",
      "priority": "medium"
    },
    {
      "id": "TASK-3939",
      "title": "Use the back-end SQL firewall, then you can connect the neural hard drive!",
      "status": "done",
      "label": "feature",
      "priority": "low"
    },
    {
      "id": "TASK-2007",
      "title": "I'll input the back-end USB protocol, that should bandwidth the PCI system!",
      "status": "backlog",
      "label": "bug",
      "priority": "high"
    },
    {
      "id": "TASK-7516",
      "title": "Use the primary SQL program, then you can generate the auxiliary transmitter!",
      "status": "done",
      "label": "documentation",
      "priority": "medium"
    },
    {
      "id": "TASK-6906",
      "title": "Try to back up the DRAM system, maybe it will reboot the online transmitter!",
      "status": "done",
      "label": "feature",
      "priority": "high"
    },
]

//qwerty
export const tier_data = {
  "Zelos_Tiers": {
    "Price (USD)": {
      "Basic": "$1k / mo",
      "Silver": "$2.5k / mo",
      "Premium": "$5k / mo"
    },
  },
  "Platform Features": {
    "Digital_Twin_Launch_Program": {
      "Basic": "Included (w/ pilot program)",
      "Silver": "Included",
      "Premium": "Included"
    },
    "Zelos_Platform_Access": {
      "Basic": "Basic",
      "Silver": "Standard",
      "Premium": "Advanced"
    },
    "Training_Credits": {
      "Basic": "10k credits/mo",
      "Silver": "25k credits/mo",
      "Premium": "50k credits/no"
    },
    "Generation_Credits": {
      "Basic": "5k credits/mo",
      "Silver": "15k credits/mo",
      "Premium": "25k credits/mo"
    },
    "Data_Storage": {
      "Basic": "10GB",
      "Silver": "50GB",
      "Premium": "100GB"
    },
    "Knowledge_Vault_Storage": {
      "Basic": "5GB",
      "Silver": "25GB",
      "Premium": "50GB"
    },
    "Customer_Support": {
      "Basic": "Basic (24-48 hrs)",
      "Silver": "Priority (12-24 hrs)",
      "Premium": "Dedicated (same-day)"
    }
  },
  "Content_Hub_Features": {
    "Custom_AI_Model_Creation": {
      "Basic": "3",
      "Silver": "5",
      "Premium": "10+"
    },
    "Live_Data_Integration": {
      "Basic": "Limited to 1-2 sources",
      "Silver": "Standard (3-5 sources)",
      "Premium": "Advanced (customizable)"
    },
    "Knowledge_Extraction_Capabilities": {
      "Basic": "None",
      "Silver": "Basic",
      "Premium": "Advanced"
    },
    "Content_Collaboration": {
      "Basic": "None",
      "Silver": "Up to 3 users",
      "Premium": "Unlimited users"
    }
  },
  "Strategy_Hub_Features": {
    "Use_Case_and_Goal_Optimization": {
      "Basic": "3 pre-defined",
      "Silver": "5 pre-defined",
      "Premium": "Customizable goals"
    },
    "AI_Recommendations": {
      "Basic": "Basic (limited)",
      "Silver": "Standard (detailed)",
      "Premium": "Advanced (in-depth)"
    },
    "IP_Optimization_Tools": {
      "Basic": "Limited access",
      "Silver": "Standard access",
      "Premium": "Advanced access"
    },
    "User_Personas_Profiles": {
      "Basic": "3",
      "Silver": "5",
      "Premium": "Unlimited"
    },
    "Reporting_Analytics": {
      "Basic": "Basic dashboards",
      "Silver": "Standard dashboards",
      "Premium": "Advanced dashboards & reports"
    }
  },
  "Workflow_Designer_Features": {
    "Preset_Workflows": {
      "Basic": "3 steps, single user",
      "Silver": "5 steps, single user",
      "Premium": "Unlimited steps, multi-user"
    },
    "Conditional_Branching": {
      "Basic": "None",
      "Silver": "Limited branching",
      "Premium": "Unlimited branching"
    },
    "Automation_Capabilities": {
      "Basic": "Limited to basic triggers",
      "Silver": "Standard automation",
      "Premium": "Advanced automation (custom)"
    },
    "Standard_Operating_Procedures": {
      "Basic": "None",
      "Silver": "Basic SOP templates",
      "Premium": "Advanced SOP builder"
    },
    "Workflow_Collaboration": {
      "Basic": "None",
      "Silver": "Up to 3 users",
      "Premium": "Unlimited users"
    },
    "Workflow_Versioning_Rollback": {
      "Basic": "Limited version history",
      "Silver": "Standard version history",
      "Premium": "Advanced version control"
    }
  },
  // "Marketplace_Hub_Features": {
  //   "Access_to_Pre-built_Components": {
  //     "Basic": "Yes",
  //     "Silver": "Yes",
  //     "Premium": "Yes"
  //   },
  //   "Uploading_Custom_Components": {
  //     "Basic": "No",
  //     "Silver": "Up to 5 components",
  //     "Premium": "Unlimited components"
  //   },
  //   "Component_Search_Filtering": {
  //     "Basic": "Basic search",
  //     "Silver": "Standard search",
  //     "Premium": "Advanced search"
  //   },
  //   "Component_Reviews_Ratings": {
  //     "Basic": "No",
  //     "Silver": "Yes",
  //     "Premium": "Yes (additional data)"
  //   }
  // }    
};

// Type InfoAsset
export const info_assets = [
  {
    URI: "zelos/victor-amo/biography",
    name: "Victor Amo - Early Cycling Career",
    category: "Biography",
    content: "Victor Amo's passion for cycling began at a young age. He started competing in local races at the age of 12 and quickly rose through the ranks. By his teenage years, he was already considered a promising talent, winning several regional championships. This document details his early cycling career achievements and milestones.",
    "dc:creator": "John Smith (Agent)", // Dublin Core creator
    "dc:description": "A biography outlining Victor Amo's early cycling career successes.", // Dublin Core description
    "schema:dateCreated": "2023-12-01T09:00:00", // schema.org date created
    labels: ["Cycling", "Prospect"],
    creation_date: "2023-12-01T10:30:00",
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/victor-amo/highlight-reel.mp4",
    name: "Victor Amo - 2023 Season Highlights",
    category: "Media",
    media_link: "ipfs://...",
    mimetype: "video/mp4",
    "dc:creator": "Victor Amo", // Dublin Core creator (athlete)
    "dc:description": "Compilation of Victor Amo's best moments from the 2023 season.", // Dublin Core description
    "schema:dateCreated": "2023-11-15T11:45:00", // schema.org date created
    "schema:contentUrl": "ipfs://...", // schema.org content URL (IPFS link)
    "schema:contentType": "video/mp4", // schema.org content type
    labels: ["Performance", "2023 Season"],
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/victor-amo/contract-proposal-ac...", // Replace with actual contract ID
    name: "Team X - Contract Proposal",
    category: "Contracts",
    content: "This document outlines the contract proposal offered by Team X to Victor Amo for the 2024 season. It includes details on salary, bonuses, benefits, and other terms.",
    "dc:creator": "Team X", // Dublin Core creator (team)
    "dc:description": "Contract proposal for Victor Amo by Team X (2024 season).", // Dublin Core description
    "dc:rights": "Confidential", // Dublin Core rights
    "schema:dateCreated": "2023-11-01T13:15:00", // schema.org date created
    labels: ["Team X", "2024 Season", "Negotiation"],
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/scouting-reports/new-talent.pdf",
    name: "U-18 Talent Scouting Report (Europe)",
    category: "Scouting",
    content: "This report provides insights on promising young talent identified during the recent U-18 European Championships. It includes player profiles, strengths, weaknesses, and potential.",
    "dc:creator": "Jane Doe (Scout)", // Dublin Core creator (scout)
    "dc:description": "Scouting report on U-18 European Championship talent.", // Dublin Core description
    "schema:dateCreated": "2023-10-20T15:00:00", // schema.org date created
    labels: ["Europe", "U-18", "Recruitment"],
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/victor-amo/social-media-analysis.png",
    name: "Victor Amo - Social Media Engagement (October)",
    category: "Analytics",
    media_link: "ipfs://...", // Replace with actual IPFS link
    mimetype: "image/png",
    "dc:creator": "Social Media Monitoring Tool", // Dublin Core creator (tool)
    "dc:description": "Analysis of Victor Amo's social media engagement for October 2023.", // Dublin Core description
    "schema:dateCreated": "2023-10-20T16:30:00", // schema.org date created
    labels: ["Europe", "U-18", "Recruitment"],
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/victor-amo/performance-data-2023.csv",
    name: "Victor Amo - 2023 Performance Data",
    category: "Raw Core Data",
    content: "", // No textual content for raw data
    media_link: "ipfs://...", // Replace with actual IPFS link for downloadable file
    mimetype: "text/csv", 
    "dc:creator": "Training Sensor System", // Dublin Core creator (sensor system)
    "dc:description": "Raw performance data collected from Victor Amo's training sessions in 2023.", // Dublin Core description
    "schema:dateCreated": "2023-12-15T17:45:00", // schema.org date created
    "schema:contentUrl": "ipfs://...", // schema.org content URL (IPFS link)
    "schema:contentType": "text/csv", // schema.org content type
    labels: ["Performance", "2023 Season", "Training"],
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/victor-amo/training-recommendations-ai.pdf",
    name: "AI-Generated Training Recommendations for Victor Amo",
    category: "AI Generated Content",
    content: "This report provides personalized training recommendations for Victor Amo, generated by an AI system analyzing his performance data and historical trends.", // Textual content for AI-generated report
    media_link: "ipfs://...", // Replace with actual IPFS link for downloadable file
    mimetype: "application/pdf",
    "dc:creator": "Zelos AI Training System", // Dublin Core creator (your AI system)
    "dc:description": "AI-powered training recommendations for Victor Amo's improvement.", // Dublin Core description
    "schema:dateCreated": "2023-12-15T18:30:00", // schema.org date created
    "schema:contentUrl": "ipfs://...", // schema.org content URL (IPFS link)
    "schema:contentType": "application/pdf", // schema.org content type
    labels: ["AI-Powered", "Training", "Improvement"],
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/victor-amo/medical-records/2023", // Secured access required
    name: "Victor Amo - Medical Records (2023)",
    category: "Health Data",
    content: "", // No textual content due to privacy concerns
    labels: ["Confidential", "Medical", "2023"],
    "dc:creator": "Medical Professional", // Dublin Core creator (medical professional)
    "dc:description": "Victor Amo's medical records for the year 2023 (secured access).", // Dublin Core description with access note
    "dc:rights": "Highly Confidential", // Dublin Core rights emphasizing confidentiality
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },{
    URI: "zelos/scouting-reports/new-talent-ai.pdf",
    name: "U-18 Talent Scouting Report (Europe) with AI Insights",
    category: "Scouting", // Main category
    content: "This report combines insights from human scouts and AI analysis on promising young talent identified during the recent U-18 European Championships.", // Textual content
    media_link: "ipfs://...", // Replace with actual IPFS link for downloadable file
    mimetype: "application/pdf",
    "dc:creator": "Scouts & Zelos AI", // Dublin Core creator (combined)
    "dc:description": "U-18 European Championship talent report with AI analysis.", // Dublin Core description
    "schema:dateCreated": "2023-10-20T19:15:00", // schema.org date created
    "schema:contentUrl": "ipfs://...", // schema.org content URL (IPFS link)
    "schema:contentType": "application/pdf", // schema.org content type
    labels: ["Europe", "U-18", "Recruitment", "AI-Powered"],
    dcma_registrant_email: "admin@vamo.co",
    read: false
  },
  {
    URI: "zelos/victor-amo/KM200CoolblackSatelite", // Assuming unique identifier
    "schema:contentUrl": "./assets/grg_1/grg_01260434_fbx/model.fbx",
    name: "KM200 COOLBLACK SATELITE",
    category: "3D Model",
    scale: [3, 3, 3],
    labels: ["Jersey Ciclismo", "Needs minting", "Digital Twin", "Roblox"],
    "dc:description": "3D model scan of Jersey Ciclismo",
    "schema:dateCreated": "2023-11-15T11:45:00", // Set a suitable date
    mimetype: "model/fbx", // Assuming FBX format
  },
  {
    URI: "zelos/victor-amo/MangaCortaKM100HeladosTonny", // Assuming unique identifier
    "schema:contentUrl": "./assets/grg_1/helados_01281702_fbx/model.fbx",
    name: "Manga Corta KM100 Helados Tonny",
    category: "3D Model",
    scale: [3, 3, 3],
    labels: ["Jersey Ciclismo", "Needs minting", "Digital Twin", "Roblox"],
    "dc:description": "3D model of Manga Corta KM100 Helados Tonny", // Consider adding a description
    "schema:dateCreated": "2023-11-15T11:45:00", // Set a suitable date
    mimetype: "model/fbx", // Assuming FBX format
  },
  {
    URI: "zelos/victor-amo/OrbeaAlmaM502023OMR", // Assuming unique identifier
    "schema:contentUrl": "./assets/grg_1/helados_01281739_fbx/model.fbx",
    name: "ORBEA ALMA M50 2023 OMR",
    category: "3D Model",
    scale: [3, 3, 3],
    labels: ["BICICLETA", "Needs minting", "Digital Twin", "Roblox"],
    "dc:description": "3D model of ORBEA ALMA M50 2023 OMR", // Consider adding a description
    "schema:dateCreated": "2023-11-15T11:45:00", // Set a suitable date
    mimetype: "model/fbx", // Assuming FBX format
  },
  {
    URI: "zelos/victor-amo/FincaCafetera", // Assuming unique identifier
    "schema:contentUrl": "./assets/grg_1/uploads_files_2040232_mountain_Green_1.fbx",
    name: "Finca Cafetera",
    category: "3D Model",
    scale: [5, 5, 5],
    labels: ["GoRigoGo Campaign", "Needs minting", "Digital Twin", "Roblox"],
    "dc:description": "3D model of Finca Cafetera", // Consider adding a description
    "schema:dateCreated": "2023-11-15T11:45:00", // Set a suitable date
    mimetype: "model/fbx", // Assuming FBX format
  },
  {
    URI: "zelos/victor-amo/ZapatillaDMTKm0", // Assuming unique identifier
    "schema:contentUrl": "./assets/grg_1/cup_01280337_fbxt/model.fbx",
    name: "Zapatilla DMT Km0",
    category: "3D Model",
    scale: [5, 5, 5],
    labels: ["GoRigoGo Campaign", "Needs minting", "Digital Twin", "Roblox"],
    "dc:description": "3D model of Zapatilla DMT Km0", // Consider adding a description
    "schema:dateCreated": "2023-11-15T11:45:00", // Set a suitable date
    mimetype: "model/fbx", // Assuming FBX format
  },
  {
    URI: "zelos/victor-amo/BTwinTribanBike", // Assuming unique identifier
    "schema:contentUrl": "./assets/grg_1/BTwinTriban.fbx",
    name: "BTwin Triban Bike",
    category: "3D Model",
    scale: [0.01, 0.01, 0.01],
    labels: ["GoRigoGo Campaign", "Needs minting", "Digital Twin", "Roblox"],
    "dc:description": "3D model of BTwin Triban Bike", // Consider adding a description
    "schema:dateCreated": "2023-11-15T11:45:00", // Set a suitable date
    mimetype: "model/fbx", // Assuming FBX format
  },
  {
    URI: "zelos/victor-amo/CafeRigo", // Assuming unique identifier
    "schema:contentUrl": "./assets/grg_1/cup_01280414_fbx/model.fbx",
    name: "Cafe Rigo",
    category: "3D Model",
    scale: [5, 5, 5],
    labels: ["GoRigoGo Campaign", "Needs minting", "Digital Twin", "Roblox"],
    "dc:description": "3D model of Cafe Rigo", // Consider adding a description
    "schema:dateCreated": "2023-11-15T11:45:00", // Set a suitable date
    mimetype: "model/fbx", // Assuming FBX format
  },
]

// Type Account
export const accounts = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@gmail.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@me.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

// Type Contacts
export const contacts = [
  {
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
    agentTypes: ["PSNA-1"], // 0 persona type
    is_persona: false,
  },
  {
    name: "Daniel Garcia",
    email: "daniel.garcia@example.com",
    agentTypes: ["PSNA-2", "PSNA-3"], // 1 persona type
    is_persona: true,
  },
  {
    name: "Isabella Rodriguez",
    email: "isabella.rodriguez@example.com",
    agentTypes: [], // 0 persona type
    is_persona: false,
  },
  {
    name: "Sophia Hernandez",
    email: "sophia.hernandez@example.com",
    agentTypes: ["PSNA-4"], // 0 persona type
    is_persona: false,
  },
  {
    name: "Mateo Ramirez",
    email: "mateo.ramirez@example.com",
    agentTypes: ["PSNA-1", "PSNA-2"], // 2 persona types
    is_persona: true,
  },
  // Add more contacts following the persona type distribution (0:15, 1:70, 2:15)
];

// Type Workflow
export const workflows = [
  {
    name: "Social Media Engagement Booster",
    artist: "Victor Amo",
    description:
      "Craft personalized social media content to connect with your fans and expand your reach.",
    cover:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    workflow_creator: "user_defined"
  },
  {
    name: "Q&A with Victor Amo",
    artist: "Victor Amo",
    description:
      "Host interactive Q&A sessions with your fans using AI-powered moderation.",
    cover:
      "https://images.unsplash.com/photo-1599508704512-2f19efd1e35f",
    workflow_creator: "user_defined"
  },
  {
    name: "Cycling Performance Analysis",
    artist: "Victor Amo",
    description:
      "Analyze your training data to identify strengths and weaknesses. Gain insights to optimize your performance.",
    cover:
      "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86",
    workflow_creator: "user_defined"
  },
    {
      name: "Train Like Victor",
      artist: "Victor Amo",
      cover:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      description:
        "Get inspired by Victor's training routines and cycling tips.",
      workflow_creator: "suggested_workflow"
    },
    {
      name: "Fuel Your Ride",
      artist: "Victor Amo",
      cover:
        "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
      description:
        "Learn about Victor's favorite recipes and explore optimal nutrition strategies for cyclists.",
      workflow_creator: "suggested_workflow"
    },
    {
      name: "Victor's Recovery Rituals",
      artist: "Victor Amo",
      cover:
        "https://images.unsplash.com/photo-1642755622932-d1e0cb783dc5",
      description:
        "Discover Victor's recovery techniques to maximize performance and prevent injuries.",
      workflow_creator: "suggested_workflow"
    },
    {
      name: "Ask Victor Anything",
      artist: "Victor Amo",
      cover:
        "https://images.unsplash.com/photo-1508882100003-8ae16a4abbaf",
      description:
        "Submit your cycling questions and get a chance to be featured in Victor's next Q&A session.",
      workflow_creator: "suggested_workflow"
    },
]

// Type AIModel
export const complete_trained_models = [
  {
    label: "Rigo Voice Model",
    tags: ["voice"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model providing personalized fitness coaching advice.",
    elabs_voice_id: "jN5TCsR2ZXbqqnS2ndtA",
    elabs_model_id: "eleven_multilingual_v2",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/fitness_coaching_model.pt',
    modelId: 'FITCOACH',
    thumbnail: '/thumbnails/fitness_coaching_thumbnail.png',
    prompt_template: 'Get fitness coaching advice:',
    use_case_ids: [""]
  },
  {
    label: "Fitness Coaching Model",
    tags: ["recent-used"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model providing personalized fitness coaching advice.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/fitness_coaching_model.pt',
    modelId: 'FITCOACH',
    thumbnail: '/thumbnails/fitness_coaching_thumbnail.png',
    prompt_template: 'Get fitness coaching advice:',
    use_case_ids: [""]
  },
  {
    label: "Motivational Speech Model",
    tags: ["recent-used"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model generating motivational speeches to inspire others.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/motivational_speech_model.pt',
    modelId: 'MOTISPEE',
    thumbnail: '/thumbnails/motivational_speech_thumbnail.png',
    prompt_template: 'Get motivational speech:',
    use_case_ids: [""]
  },
  {
    label: "Social Media Engagement Model",
    tags: ["recent-used"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model designed to enhance social media engagement strategies.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/social_media_engagement_model.pt',
    modelId: 'SOCMEDI',
    thumbnail: '/thumbnails/social_media_engagement_thumbnail.png',
    prompt_template: 'Boost social media engagement:',
    use_case_ids: [""]
  },
  {
    label: "Fan Q&A Model",
    tags: ["recent-used"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model providing automated responses to fan questions.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/fan_qa_model.pt',
    modelId: 'FANQANDA',
    thumbnail: '/thumbnails/fan_qa_thumbnail.png',
    prompt_template: 'Answer fan questions:',
    use_case_ids: [""]
  },
  {
    label: "Injury Prevention Model",
    tags: ["recent-used"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model offering suggestions for injury prevention techniques.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/injury_prevention_model.pt',
    modelId: 'INJURYPV',
    thumbnail: '/thumbnails/injury_prevention_thumbnail.png',
    prompt_template: 'Prevent injuries:',
    use_case_ids: [""]
  },
  {
    label: "Healthy Lifestyle Guidance",
    tags: ["recent-used"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model providing guidance on maintaining a healthy lifestyle.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/healthy_lifestyle_guidance_model.pt',
    modelId: 'HEALGUID',
    thumbnail: '/thumbnails/healthy_lifestyle_guidance_thumbnail.png',
    prompt_template: 'Get healthy lifestyle tips:',
    use_case_ids: [""]
  },
  {
    label: "Sports Nutrition Assistant",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model offering advice on sports nutrition and diet plans.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/sports_nutrition_assistant_model.pt',
    modelId: 'SPONUTAS',
    thumbnail: '/thumbnails/sports_nutrition_assistant_thumbnail.png',
    prompt_template: 'Get sports nutrition advice:',
    use_case_ids: [""]
  },
  {
    label: "Training Partner Simulation",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model simulating the behavior of a training partner for workout sessions.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/training_partner_simulation_model.pt',
    modelId: 'TRNPARTN',
    thumbnail: '/thumbnails/training_partner_simulation_thumbnail.png',
    prompt_template: 'Simulate training partner:',
    use_case_ids: [""]
  },
  {
    label: "Community Building Model",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model facilitating community engagement and interaction.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/community_building_model.pt',
    modelId: 'COMBUILD',
    thumbnail: '/thumbnails/community_building_thumbnail.png',
    prompt_template: 'Build community engagement:',
    use_case_ids: [""]
  },
  {
    label: "Affiliate Optimization",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model aimed at optimizing affiliate marketing strategies for increased performance.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/affiliate_optimization_model.pt',
    modelId: 'AFFOPTIM',
    thumbnail: '/thumbnails/affiliate_optimization_thumbnail.png',
    prompt_template: 'Optimize affiliate marketing strategy:',
    use_case_ids: [""]
  },
  {
    label: "Monetize a Victor training suggestion bot",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model suggesting ways to monetize the Victor bot's training recommendations.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/monetize_victor_bot_model.pt',
    modelId: 'MONVBOT',
    thumbnail: '/thumbnails/monetize_victor_bot_thumbnail.png',
    prompt_template: 'Monetize Victor bot suggestions:',
    use_case_ids: [""]
  },
  {
    label: "Extractions train on social media success",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model for training extractions based on successful social media data.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/extractions_social_media_model.pt',
    modelId: 'EXTSOCIA',
    thumbnail: '/thumbnails/extractions_social_media_thumbnail.png',
    prompt_template: 'Train extractions on social media data:',
    use_case_ids: [""]
  },
  {
    label: "Campaigns Examples/Ideas",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model providing examples and ideas for marketing campaigns.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/campaigns_examples_model.pt',
    modelId: 'CAMPEXID',
    thumbnail: '/thumbnails/campaigns_examples_thumbnail.png',
    prompt_template: 'Get campaign examples and ideas:',
    use_case_ids: [""]
  },
  {
    label: "Victor comic book",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model generating comic books featuring the character Victor.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/victor_comic_model.pt',
    modelId: 'VICCOMIC',
    thumbnail: '/thumbnails/victor_comic_thumbnail.png',
    prompt_template: 'Generate Victor comic book:',
    use_case_ids: [""]
  },
  {
    label: "Digital Chivas Skins",
    tags: ["recent-used"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model for creating digital designs for Chivas products.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/digital_chivas_skins_model.pt',
    modelId: 'DIGCHSKN',
    thumbnail: '/thumbnails/digital_chivas_skins_thumbnail.png',
    prompt_template: 'Create digital Chivas skins:',
    use_case_ids: [""]
  },
  {
    label: "the who am I campaign",
    tags: ["text"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
    description: "Model initiating the 'Who Am I' campaign for self-discovery and exploration.",
    iconName: "",
    href: "",
    color: "#FFFFFF",
    bgColor: "#000000",
    foundational_model: true,
    model_file_path: '/models/who_am_i_campaign_model.pt',
    modelId: 'WHOAMICM',
    thumbnail: '/thumbnails/who_am_i_campaign_thumbnail.png',
    prompt_template: 'Start the "Who Am I" campaign:',
    use_case_ids: [""]
  },
  {
    label: 'Conversation',
    description: 'Engage in dynamic, AI-driven conversations that emulate human-like interaction. Dive into a new era of digital communication.',
    iconName: 'chat-bubble-dynamic-gradient.png',
    href: '/digital-twin/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    foundational_model: true,
    model_file_path: '/models/conversation_model.pt',
    modelId: 'CONVCHAI',
    thumbnail: '/thumbnails/conversation_thumbnail.png',
    prompt_template: 'Start a conversation:',
    use_case_ids: ['Fitness Coaching Model', 'Social Media Engagement Model', 'Fan Q&A Model'],
    tags: ["foundational"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Voice Generation',
    description: 'Transform text into lifelike speech with our advanced voice synthesis. Experience the future of digital storytelling and audio content.',
    iconName: 'mic-dynamic-gradient.png',
    href: '/digital-twin/voice',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    foundational_model: true,
    model_file_path: '/models/voice_generation_model.pt',
    modelId: 'VOIGENAI',
    thumbnail: '/thumbnails/voice_generation_thumbnail.png',
    prompt_template: 'Generate voice:',
    use_case_ids: ['Motivational Speech Model', 'Training Partner Simulation'],
    tags: ["foundational"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Image Generation',
    description: 'Create stunning, high-resolution images from simple descriptions. Unleash creativity with AI-powered visual generation.',
    iconName: 'paint-brush-dynamic-gradient.png',
    href: '/digital-twin/image',
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    foundational_model: true,
    model_file_path: '/models/image_generation_model.pt',
    modelId: 'IMGGENAI',
    thumbnail: '/thumbnails/image_generation_thumbnail.png',
    prompt_template: 'Generate image from description:',
    use_case_ids: ['Photo-realistic Cyclists', 'Victor Night Cream Mood Board'],
    tags: ["foundational"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Video Generation',
    description: 'Craft compelling videos with the aid of AI. From concept to reality, revolutionize the way visual stories are told.',
    iconName: 'video-camera-dynamic-gradient.png',
    href: '/digital-twin/video',
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    foundational_model: true,
    model_file_path: '/models/video_generation_model.pt',
    modelId: 'VIDGENAI',
    thumbnail: '/thumbnails/video_generation_thumbnail.png',
    prompt_template: 'Create video concept:',
    use_case_ids: ['Coffee World Environment Generator'],
    tags: ["foundational"], 
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Lego Campaign Launch',
    description: 'Engage in dynamic, AI-driven conversations that emulate human-like interaction. Dive into a new era of digital communication.',
    iconName: 'lego-athlete.png',
    href: '/digital-twin/conversation',
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    miniIconName: 'chat-bubble-dynamic-gradient.png',
    foundational_model: true,
    model_file_path: '/models/lego_campaign_model.pt',
    modelId: 'LEGOCAM',
    thumbnail: '/thumbnails/lego_campaign_thumbnail.png',
    prompt_template: 'Start a Lego campaign conversation:',
    use_case_ids: ['Campaigns Examples/Ideas'],
    tags: ["image"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Photo-realistic Cyclists',
    description: 'Transform text into lifelike speech with our advanced voice synthesis. Experience the future of digital storytelling and audio content.',
    iconName: 'cyclist.jpg',
    href: '/digital-twin/voice',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    miniIconName: 'night_cream.jpeg',
    foundational_model: true,
    model_file_path: '/models/photo_realistic_cyclists_model.pt',
    modelId: 'CYCLIST',
    thumbnail: '/thumbnails/photo_realistic_cyclists_thumbnail.png',
    prompt_template: 'Generate voice for photo-realistic cyclists:',
    use_case_ids: ['Campaigns Examples/Ideas'],
    tags: ["image"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Victor Night Cream Mood Board',
    description: 'Create stunning, high-resolution images from simple descriptions. Unleash creativity with AI-powered visual generation.',
    iconName: 'night_cream.jpeg',
    href: '/digital-twin/image',
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    miniIconName: 'paint-brush-dynamic-gradient.png',
    foundational_model: true,
    model_file_path: '/models/night_cream_mood_board_model.pt',
    modelId: 'MOODBRD',
    thumbnail: '/thumbnails/night_cream_mood_board_thumbnail.png',
    prompt_template: 'Generate mood board from description:',
    use_case_ids: ['Victor comic book', 'Digital Chivas Skins'],
    tags: ["image"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Coffee World Environment Generator',
    description: 'Craft compelling videos with the aid of AI. From concept to reality, revolutionize the way visual stories are told.',
    iconName: 'coffee_bean_windmill.jpeg',
    href: '/digital-twin/video',
    color: "text-orange-700",
    bgColor: "bg-orange-700/10",
    miniIconName: 'video-camera-dynamic-gradient.png',
    foundational_model: true,
    model_file_path: '/models/coffee_world_model.pt',
    modelId: 'COFFWRL',
    thumbnail: '/thumbnails/coffee_world_thumbnail.png',
    prompt_template: 'Generate coffee world video concept:',
    use_case_ids: ['Digital Chivas Skins'],
    tags: ["image"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
  {
    label: 'Victor Cologne Brainstorm',
    description: 'Build digital twins of real-world objects and systems. Harness the power of digital replication for innovation and analysis.',
    iconName: 'perfume_ad.png',
    href: '/digital-twin',
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    miniIconName: '3d-dynamic-gradient.png',
    foundational_model: true,
    model_file_path: '/models/victor_cologne_model.pt',
    modelId: 'VICCOLO',
    thumbnail: '/thumbnails/victor_cologne_thumbnail.png',
    prompt_template: 'Generate digital twin for Victor Cologne:',
    use_case_ids: ['Victor comic book', 'the who am I campaign'],
    tags: ["image"],
    default_language: "es",
    subject_prompt_key: "ohwx man",
    subject_prompt_alias: ["Rigo", "Rigoberto", "Rigoberto Uran" ],
  },
];

// Type Rule
export const rules = [
  // Access Rules (GDPR)
  {
    id: "rule-1",
    ruleType: "access",
    subject: "user",
    operator: "in",
    attribute: "location",
    value: "EU",
    duty: "obligated",
    action: "consent_to_share",
    target: "data",
    rule_nlp_description: JSON.stringify({
      text: "Users located in the European Union (EU) require consent before processing their personal data.",
    }),
  },
  {
    id: "rule-2",
    ruleType: "access",
    subject: "user",
    attribute: "data_usage",
    operator: "includes",
    value: "marketing",
    duty: "inform",
    action: "opt-out",
    target: "user",
    rule_nlp_description: JSON.stringify({
      text: "Users have the right to be informed about and opt-out of their data being used for marketing purposes.",
    }),
  },
  {
    id: "rule-3",
    ruleType: "access",
    subject: "user",
    attribute: "data_storage",
    operator: "gt",
    value: "6", // Assuming value is in months
    duty: "allow",
    action: "download",
    target: "personal_data",
    rule_nlp_description: JSON.stringify({
      text: "Users can download their personal data that has been stored for more than 6 months.",
    }),
  },
  // Action Rules (Mpeg21 Copyright Ontology)
  {
    id: "rule-4",
    ruleType: "action",
    subject: "content",
    attribute: "mime_type",
    operator: "is",
    value: "image/jpeg",
    duty: "permit",
    action: "display",
    presides_over: "user",
    rule_nlp_description: JSON.stringify({
      text: "JPEG image content can be displayed to the user.",
    }),
  },
  {
    id: "rule-5",
    ruleType: "action",
    subject: "content",
    attribute: "copyright_owner",
    operator: "is",
    value: "Victor, the Athlete",
    duty: "restrict",
    action: "modify",
    target: "content",
    rule_nlp_description: JSON.stringify({
      text: "Content owned by Victor, the Athlete cannot be modified by users.",
    }),
  },
  {
    id: "rule-6",
    ruleType: "action",
    subject: "user",
    attribute: "permission",
    operator: "has",
    value: "edit",
    duty: "permit",
    action: "modify",
    target: "content",
    rule_nlp_description: JSON.stringify({
      text: "Users with edit permission can modify content.",
    }),
  },
  // Content Rules (Victor's Guidelines)
  {
    id: "rule-7",
    ruleType: "content",
    subject: "Victor",
    attribute: "attire",
    operator: "should_wear",
    value: "athletic clothing",
    duty: "recommend",
    action: "suggest",
    target: "Victor",
    rule_nlp_description: JSON.stringify({
      text: "It is recommended for Victor to wear athletic clothing for training and competition.",
    }),
  },
  {
    id: "rule-8",
    ruleType: "content",
    subject: "Victor",
    attribute: "diet",
    operator: "should_avoid",
    value: "processed foods",
    duty: "prohibit",
    action: "warn",
    target: "Victor",
    rule_nlp_description: JSON.stringify({
      text: "Victor should avoid processed foods to maintain a healthy diet.",
    }),
  },
  {
    id: "rule-9",
    ruleType: "content",
    subject: "Victor",
    attribute: "emotions",
    operator: "should_express",
    value: "positive",
    duty: "encourage",
    action: "motivate",
    target: "Victor",
    rule_nlp_description: JSON.stringify({
      text: "Victor should strive to express positive emotions for mental well-being and performance.",
    }),
  },
  {
    id: "rule-10",
    ruleType: "content",
    subject: "Victor",
    attribute: "speech",
    operator: "should_avoid",
    value: "discouragement",
    duty: "prohibit",
    action: "redirect",
    target: "Victor",
    rule_nlp_description: JSON.stringify({
      text: "Victor should avoid discouraging self-talk. Redirect negative thoughts to positive affirmations.",
    }),
  },
  {
    id: "rule-11",
    ruleType: "content",
    subject: "training",
    attribute: "frequency",
    operator: "should_be",
    value: "regular",
    duty: "recommend",
    action: "schedule",
    target: "Victor",
    rule_nlp_description: JSON.stringify({
      text: "Regular training is recommended for Victor to maintain peak performance.",
    }),
  }
];
  
// Type DataConnector
export const connectors = [
  {
    id: "connector-1",
    name: "Shopify",
    description: "Connect your Shopify store to streamline your workflow.",
    icon: "/icons/shopify.svg",
    connectionType: "API",
    disabled: false,
    metadata: {
      api_key: "",
      shop_name: "",
    },
  },
  {
    id: "connector-2",
    name: "Instagram",
    description: "Manage your Instagram posts and schedule content.",
    icon: "/icons/instagram.svg",
    connectionType: "Social Media",
    disabled: false,
    metadata: {
      username: "",
      password: "", // Consider secure storage for passwords
    },
  },
  {
    id: "connector-3",
    name: "HTTP Connector",
    description: "Connect to any HTTP API using custom URLs and methods.",
    icon: "/icons/http.svg",
    connectionType: "HTTP",
    disabled: false,
    metadata: {
      url: "",
      method: "GET", // Default method
      headers: {}, // Optional headers object
      body: "", // Optional request body (string)
    },
  },
  {
    id: "connector-10",
    name: "Mailchimp",
    description: "Manage your email marketing campaigns with ease.",
    icon: "/icons/mailchimp.svg",
    connectionType: "Email Marketing",
    disabled: false,
    metadata: {
      api_key: "",
      list_id: "", // Example metadata specific to Mailchimp
    },
  },
];

// Type StrategicIssue
export const issues = [
    {
      "Topic": "Market Expansion",
      "SWOT Type": "Opportunity",
      "Subscribed": true,
      "RelatedGoals": ["Increase revenue"],
      "RelatedUseCases": ["Respond to customer inquiries via chatbot"]
    },
    {
      "Topic": "Product Launch",
      "SWOT Type": "Opportunity",
      "Subscribed": true,
      "RelatedGoals": ["Increase revenue"]
    },
    {
      "Topic": "Brand Reputation Management",
      "SWOT Type": "Strength",
      "Subscribed": false,
      "RelatedGoals": ["Maintain authenticity"]
    }
];

// Type Goal
export const goals = [
  {
    "Goal": "Increase revenue",
    "Description": "To enhance the company's financial performance and profitability.",
    "StrategicIndicator": "Revenue Growth",
    "KPI": "Revenue Growth Rate",
    "Developer": "Finance Department",
    "RelatedIssues": ["Market Expansion", "Product Launch"],
    "isActive":true
  },
  {
    "Goal": "Maintain authenticity",
    "Description": "To preserve the genuine and unique identity of the brand or product.",
    "StrategicIndicator": "Brand Authenticity Index",
    "KPI": "Customer Trust Score",
    "Developer": "Marketing Team",
    "RelatedIssues": ["Brand Reputation Management"],
    "isActive":true
  }
];

// Type UseCase
export const useCases = [
  {
    "Description": "Respond to customer inquiries via chatbot",
    "Subject": "Customer Support Team",
    "Target": "Customers",
    "ForPurpose": ["Increase revenue"],
    "Models":5
  },
  {
    "Description": "Generate personalized product recommendations",
    "Subject": "Recommendation Engine",
    "Target": "Customers",
    "ForPurpose": ["Increase revenue"],
    "Models":5
  }
];

// Type Agent
export const agents = [
  {
    "id": "PSNA-0",
    "Name": "John Doe",
    "Description": "Marketing Lead of Sponsors Inc.",
    "Type": "Corporate Entity",
    "AssociatedUseCases": ["Respond to customer inquiries via chatbot"],
    "is_persona": true,
    "Image": "/image57.png" // Placeholder image for John Doe
  },
  {
    "id": "PSNA-1",
    "Name": "Alice Smith",
    "Description": "Longtime customer of the company",
    "Type": "Individual",
    "AssociatedUseCases": ["Generate personalized product recommendations"],
    "is_persona": true,
    "Image": "/image266.png" // Placeholder image for Alice Smith
  },
  {
      "id": "PSNA-2",
      "Name": "Karly Carmicheal",
      "Description": "Disgruntled Shopper",
      "Type": "Corporate Entity",
      "AssociatedUseCases": ["Respond to customer inquiries via chatbot"],
      "is_persona": true,
      "Image": "/image58.png" // Placeholder image for John Doe
    },
    {
      "id": "PSNA-3",
      "Name": "Superman Inc.",
      "Description": "Regular data provider of the company",
      "Type": "Individual",
      "AssociatedUseCases": ["Generate personalized product recommendations"],
      "is_persona": true,
      "Image": "/image269.png" // Placeholder image for Alice Smith
    }
];

// Type BusinessModel
export const business_model = {
  "companyName": "Amotion",
  "logo": "https://example.com/logo.png",
  "industry": "Tecnología",
  "location": "San Francisco, CA",
  "foundedYear": 2010,
  "description": "Amotion es una empresa líder en tecnología especializada en soluciones de IA inmersivas.",
  "website": "https://www.gorigogo.com",
  "socialMedia": {
    "linkedin": "https://www.linkedin.com/company/gorigogo",
    "twitter": "https://twitter.com/gorigogo",
    "facebook": "https://www.facebook.com/gorigogo"
  },
  "customerSegments": {
    "segment1": {
      "name": "Empresas",
      "description": "Grandes empresas buscando soluciones con IA para automatización y optimización."
    },
    "segment2": {
      "name": "Startups",
      "description": "Startups tecnológicas buscando innovación impulsada por IA para obtener una ventaja competitiva."
    },
    "segment3": {
      "name": "Educación",
      "description": "Instituciones educativas interesadas en aplicaciones de IA para el e-learning."
    }
  },
  "valuePropositions": {
    "valueProp1": {
      "name": "Automatización con IA",
      "description": "Nuestra tecnología inmersiva con IA simplifica procesos y aumenta la eficiencia."
    },
    "valueProp2": {
      "name": "Innovación",
      "description": "Ofrecemos soluciones de IA de vanguardia para impulsar la innovación y el crecimiento."
    },
    "valueProp3": {
      "name": "Personalización",
      "description": "Soluciones de IA adaptadas para satisfacer necesidades y objetivos empresariales únicos."
    }
  },
  "channels": {
    "channel1": {
      "name": "Plataforma en Línea",
      "description": "Nuestro sitio web y plataforma en línea para la interacción con clientes."
    },
    "channel2": {
      "name": "Asociaciones B2B",
      "description": "Colaboración con socios B2B para alcanzar un público más amplio."
    },
    "channel3": {
      "name": "Ventas Directas",
      "description": "Ventas directas y soporte para clientes empresariales."
    }
  },
  "customerRelationships": {
    "relationship1": {
      "name": "Soporte Personalizado",
      "description": "Gerentes de cuenta dedicados para un soporte al cliente personalizado."
    },
    "relationship2": {
      "name": "Comunidad de Usuarios",
      "description": "Construir una comunidad de usuarios activa para retroalimentación e interacción."
    },
    "relationship3": {
      "name": "Actualizaciones Regulares",
      "description": "Proporcionar actualizaciones regulares y sesiones de formación en IA para clientes."
    }
  },
  "revenueStreams": {
    "stream1": {
      "name": "Suscripciones SaaS",
      "description": "Modelo de ingresos basado en suscripciones para software de IA."
    },
    "stream2": {
      "name": "Servicios de Consultoría",
      "description": "Servicios de consultoría para estrategias e implementación de IA."
    },
    "stream3": {
      "name": "Soluciones Personalizadas",
      "description": "Ingresos de soluciones de IA personalizadas para clientes."
    }
  },
  "keyResources": {
    "resource1": {
      "name": "Equipo de Investigación en IA",
      "description": "Un equipo dedicado de investigadores y desarrolladores de IA."
    },
    "resource2": {
      "name": "Centros de Datos",
      "description": "Centros de datos de última generación para entrenamiento de modelos de IA."
    },
    "resource3": {
      "name": "Propiedad Intelectual",
      "description": "Patentes valiosas relacionadas con IA y propiedad intelectual."
    }
  },
  "keyActivities": {
    "activity1": {
      "name": "Desarrollo de IA",
      "description": "Desarrollo y mejora continua de modelos de IA."
    },
    "activity2": {
      "name": "Investigación de Mercado",
      "description": "Investigación de mercado continua para identificar nuevas oportunidades."
    },
    "activity3": {
      "name": "Integración de Clientes",
      "description": "Integración y capacitación de clientes en soluciones de IA."
    }
  },
  "keyPartners": {
    "partner1": {
      "name": "Zelos",
      "description": "Colaboración con startups tecnológicas para proyectos conjuntos."
    },
    "partner2": {
      "name": "Proveedores de Nube",
      "description": "Asociaciones con proveedores de nube para infraestructura."
    },
    "partner3": {
      "name": "Universidades",
      "description": "Colaboración con universidades para investigación en IA."
    }
  },
  "cost": {
    "cost1": {
      "name": "Investigación y Desarrollo",
      "description": "Inversión en investigación y desarrollo de IA."
    },
    "cost2": {
      "name": "Infraestructura",
      "description": "Costos asociados con centros de datos y servicios en la nube."
    },
    "cost3": {
      "name": "Marketing y Ventas",
      "description": "Gastos relacionados con esfuerzos de marketing y ventas."
    }
  }
}

// Type UserDefinedModelCategory
export const user_defined_model_categories = [
  {
    name: "Base Models",
    includes: ["foundational"],
  },
  {
    name: "Image Models",
    includes: ["image"],
    excludes: ["foundational"],
  },
  {
    name: "Text Models",
    includes: ["text"],
    excludes: ["foundational"],
  },
  {
    name: "Voice Models",
    includes: ["voice"],
  },
  {
    name: "Recently Used",
    includes: ["recent-used"],
  },

];

// Type StatCard
export const allStatCards = [
  {
    title: "Total Visits",
    value: 12345,
    subtitle: "This month",
    icon: "path/to/svg.svg",
    measureId: "M_001",
    page: "workflow_analytics",
  },
  {
    title: "Avg. Visit Duration",
    value: "00:03:22",
    subtitle: "This session",
    icon: "path/to/another/svg.svg",
    measureId: "M_002",
    page: "workflow_analytics",
  },
  {
    title: "Goal Alignment",
    value: "8/10",
    subtitle: "This month",
    icon: "path/to/svg.svg",
    measureId: "M_001",
    page: "workflow_analytics",
  },
  {
    title: "Total Roles",
    value: "22",
    subtitle: "Across all workflows",
    icon: "path/to/another/svg.svg",
    measureId: "M_002",
    page: "workflow_analytics",
  },
  {
    title: "Generations",
    value: 749,
    subtitle: "This month",
    icon: "path/to/svg.svg",
    measureId: "M_003",
    page: "dashboard",
  },
  {
    title: "Unique Models",
    value: "12",
    subtitle: "This session",
    icon: "path/to/another/svg.svg",
    measureId: "M_004",
    page: "dashboard",
  },
  {
    title: "Cost",
    value: "$39.86",
    subtitle: "This month",
    icon: "path/to/svg.svg",
    measureId: "M_005",
    page: "dashboard",
  },
  {
    title: "Revenue",
    value: "$2,056.62",
    subtitle: "This session",
    icon: "path/to/another/svg.svg",
    measureId: "M_006",
    page: "dashboard",
  },
  {
    title: "Generations",
    value: 749,
    subtitle: "This month",
    icon: "path/to/svg.svg",
    measureId: "M_007",
    page: "digital_twin",
  },
  {
    title: "Unique Models",
    value: "12",
    subtitle: "This session",
    icon: "path/to/another/svg.svg",
    measureId: "M_008",
    page: "digital_twin",
  },
  {
    title: "Cost",
    value: "$39.86",
    subtitle: "This month",
    icon: "path/to/svg.svg",
    measureId: "M_009",
    page: "digital_twin",
  },
  {
    title: "Revenue",
    value: "$2,056.62",
    subtitle: "This session",
    icon: "path/to/another/svg.svg",
    measureId: "M_010",
    page: "digital_twin",
  },
  {
    title: "Total Assets",
    value: "1,234",
    subtitle: "As of today",
    icon: "path/to/assets-icon.svg",
    page: "knowledge_bank"
  },
  {
    title: "Total Rules",
    value: "134",
    subtitle: "Active connections",
    icon: "path/to/relationship-icon.svg",
    page: "knowledge_bank"
  },
  {
    title: "Health Percentage",
    value: "87%",
    subtitle: "Overall system health",
    icon: "path/to/health-icon.svg",
    page: "knowledge_bank"
  },
  {
    title: "Enforcement Violations",
    value: "25",
    subtitle: "Current violations",
    icon: "path/to/violations-icon.svg",
    page: "knowledge_bank"
  },
  {
    title: "Generations",
    value: 749,
    subtitle: "This month",
    icon: "path/to/svg.svg",
    page: "business_terminology"
  },
  {
    title: "Unique Models",
    value: "12",
    subtitle: "This session",
    icon: "path/to/another/svg.svg",
    page: "business_terminology"
  },
  {
    title: "Cost",
    value: "$39.86",
    subtitle: "This month",
    icon: "path/to/svg.svg",
    page: "business_terminology"
  },
  {
    title: "Revenue",
    value: "$2,056.62",
    subtitle: "This session",
    icon: "path/to/another/svg.svg",
    page: "business_terminology"
  },
];

export const caseStudies = [
  {
    "title": "Nike in the Metaverse",
    "url": "https://www.wired.co.uk/article/nike-will-let-people-design-and-sell-sneakers-for-the-metaverse",
    "date": "2022-11-18",
    "image": "https://media.wired.co.uk/photos/63727049ab57b5ecdfc2fb42/16:9/w_1920,c_limit/Nike-Swoosh-News-Gear.jpg",
    "bullets": [
      "Launch of .Swoosh, a Web3-enabled platform for virtual products",
      "Focus on community building with interactive voting",
      "Virtual collection of footwear, apparel and accessories",
      "Use of cash (USD) for transactions on the Polygon chain",
      "Plans for members to co-develop products and earn royalties"
    ]
  },
  {
    "title": "The AT&T and Karol G Fan Experience",
    "date": "2022-09-15",
    "url": "https://shortyawards.com/15th/att-presents-karol-g",
    "image": "https://shortyawards.imgix.net/entries/15th/150e9859-b58a-4ac9-9c16-3413804bdaf6.JPG?auto=format&fit=crop&h=300&q=65&w=500&s=43bf4ad7996348a3393609bc80afde0a",
    "bullets": [
      "Partnership for the $trip Love 2022 tour with exclusive content",
      "Innovative bilingual AR experiences in stores and at events",
      "Engagement with next-generation Hispanic consumers",
      "Successful in achieving a positive brand perception"
    ]
  },
  {
    "title": "Coca-Cola's Metaverse Strategy",
    "date": "2023-02-27",
    "url": "https://info.6connex.com/blog/a-case-study-of-coca-cola-and-the-metaverse",
    "image": "https://info.6connex.com/hubfs/6_Blog/2023/02_FEB_Social_16x9_CocaCola-Blank.jpg",
    "bullets": [
      "Participation in virtual reality with digital collectibles",
      "Coca-Cola metaverse beverage for a unique consumer experience",
      "Significant increase in sales and brand reinforcement in digital spaces",
      "Partnership with Meta for virtual products in the Avatar Store"
    ]
  }
]

export const data_categories = [
  {
    "fides_key": "data_category",
    "is_default": "",
    "name": "Data Category",
    "organization_fides_key": "",
    "parent_key": "",
    "replaced_by": "",
    "tags": "",
    "version_added": "",
    "version_deprecated": "",
    "description": ""
  },
  {
    "fides_key": "system",
    "is_default": "True",
    "name": "System Data",
    "organization_fides_key": "default_organization",
    "parent_key": "data_category",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data unique to, and under control of the system."
  },
  {
    "fides_key": "system.authentication",
    "is_default": "True",
    "name": "Authentication Data",
    "organization_fides_key": "default_organization",
    "parent_key": "system",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data used to manage access to the system."
  },
  {
    "fides_key": "system.operations",
    "is_default": "True",
    "name": "Operations Data",
    "organization_fides_key": "default_organization",
    "parent_key": "system",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data used for system operations."
  },
  {
    "fides_key": "user",
    "is_default": "True",
    "name": "User Data",
    "organization_fides_key": "default_organization",
    "parent_key": "data_category",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data related to the user of the system, either provided directly or derived based on their usage."
  },
  {
    "fides_key": "user.account",
    "is_default": "True",
    "name": "Account Information",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Account creation or registration information."
  },
  {
    "fides_key": "user.authorization",
    "is_default": "True",
    "name": "Authorization Information",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Scope of permissions and access to a system."
  },
  {
    "fides_key": "user.behavior",
    "is_default": "True",
    "name": "Observed Behavior",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Behavioral data about the subject."
  },
  {
    "fides_key": "user.biometric",
    "is_default": "True",
    "name": "Biometric Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Encoded characteristics provided by a user."
  },
  {
    "fides_key": "user.childrens",
    "is_default": "True",
    "name": "Children's Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data relating to children."
  },
  {
    "fides_key": "user.contact",
    "is_default": "True",
    "name": "Contact Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Contact data collected about a user."
  },
  {
    "fides_key": "user.content",
    "is_default": "True",
    "name": "User Content",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Content related to, or created by the subject."
  },
  {
    "fides_key": "user.demographic",
    "is_default": "True",
    "name": "Demographic Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Demographic data about a user."
  },
  {
    "fides_key": "user.location",
    "is_default": "True",
    "name": "Location Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Records of the location of a user."
  },
  {
    "fides_key": "user.device",
    "is_default": "True",
    "name": "Device Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data related to a user's device, configuration and setting."
  },
  {
    "fides_key": "user.payment",
    "is_default": "True",
    "name": "Payment Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Payment data related to user."
  },
  {
    "fides_key": "user.social",
    "is_default": "True",
    "name": "Social Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Social activity and interaction data."
  },
  {
    "fides_key": "user.unique_id",
    "is_default": "True",
    "name": "Unique ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Unique identifier for a user assigned through system use."
  },
  {
    "fides_key": "user.telemetry",
    "is_default": "True",
    "name": "Telemetry Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User identifiable measurement data from system sensors and monitoring."
  },
  {
    "fides_key": "user.user_sensor",
    "is_default": "True",
    "name": "User Sensor Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Measurement data about a user's environment through system use."
  },
  {
    "fides_key": "user.workplace",
    "is_default": "True",
    "name": "Workplace",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Organization of employment."
  },
  {
    "fides_key": "user.sensor",
    "is_default": "True",
    "name": "Sensor Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Measurement data from sensors and monitoring systems."
  },
  {
    "fides_key": "user.financial",
    "is_default": "True",
    "name": "Financial Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Payment data and financial history."
  },
  {
    "fides_key": "user.government_id",
    "is_default": "True",
    "name": "Government ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "State provided identification data."
  },
  {
    "fides_key": "user.health_and_medical",
    "is_default": "True",
    "name": "Health and Medical Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Health records or individual's personal medical information."
  },
  {
    "fides_key": "user.name",
    "is_default": "True",
    "name": "Name",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's real name."
  },
  {
    "fides_key": "user.criminal_history",
    "is_default": "True",
    "name": "Criminal History",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Criminal records or information about the data subject."
  },
  {
    "fides_key": "user.privacy_preferences",
    "is_default": "True",
    "name": "Privacy Preferences",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Privacy preferences or settings set by the subject."
  },
  {
    "fides_key": "user.job_title",
    "is_default": "True",
    "name": "Job Title",
    "organization_fides_key": "default_organization",
    "parent_key": "user",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Professional data."
  },
  {
    "fides_key": "user.account.settings",
    "is_default": "True",
    "name": "Account Settings",
    "organization_fides_key": "default_organization",
    "parent_key": "user.account",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Account preferences and settings."
  },
  {
    "fides_key": "user.account.username",
    "is_default": "True",
    "name": "Account Username",
    "organization_fides_key": "default_organization",
    "parent_key": "user.account",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Username associated with account."
  },
  {
    "fides_key": "user.authorization.credentials",
    "is_default": "True",
    "name": "Account password",
    "organization_fides_key": "default_organization",
    "parent_key": "user.authorization",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Authentication credentials to a system."
  },
  {
    "fides_key": "user.authorization.biometric",
    "is_default": "True",
    "name": "Biometric Credentials",
    "organization_fides_key": "default_organization",
    "parent_key": "user.authorization",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Credentials for system authentication."
  },
  {
    "fides_key": "user.authorization.password",
    "is_default": "True",
    "name": "Password",
    "organization_fides_key": "default_organization",
    "parent_key": "user.authorization",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Password for system authentication."
  },
  {
    "fides_key": "user.behavior.browsing_history",
    "is_default": "True",
    "name": "Browsing History",
    "organization_fides_key": "default_organization",
    "parent_key": "user.behavior",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Content browsing history of a user."
  },
  {
    "fides_key": "user.behavior.media_consumption",
    "is_default": "True",
    "name": "Media Consumption",
    "organization_fides_key": "default_organization",
    "parent_key": "user.behavior",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Content consumption history of the subject."
  },
  {
    "fides_key": "user.behavior.purchase_history",
    "is_default": "True",
    "name": "Purchase History",
    "organization_fides_key": "default_organization",
    "parent_key": "user.behavior",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Purchase history of the subject."
  },
  {
    "fides_key": "user.behavior.search_history",
    "is_default": "True",
    "name": "Search History",
    "organization_fides_key": "default_organization",
    "parent_key": "user.behavior",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Search history of the subject."
  },
  {
    "fides_key": "user.biometric.fingerprint",
    "is_default": "True",
    "name": "Fingerprint",
    "organization_fides_key": "default_organization",
    "parent_key": "user.biometric",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Fingerprint encoded data about a subject."
  },
  {
    "fides_key": "user.biometric.retinal",
    "is_default": "True",
    "name": "Retina Scan",
    "organization_fides_key": "default_organization",
    "parent_key": "user.biometric",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Retinal data about a subject."
  },
  {
    "fides_key": "user.biometric.voice",
    "is_default": "True",
    "name": "Voice Recording",
    "organization_fides_key": "default_organization",
    "parent_key": "user.biometric",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Voice encoded data about a subject."
  },
  {
    "fides_key": "user.biometric.health",
    "is_default": "True",
    "name": "Biometric Health Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user.biometric",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Encoded characteristic collected about a user."
  },
  {
    "fides_key": "user.contact.address",
    "is_default": "True",
    "name": "User Contact Address",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Contact address data collected about a user."
  },
  {
    "fides_key": "user.contact.email",
    "is_default": "True",
    "name": "User Contact Email",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's contact email address."
  },
  {
    "fides_key": "user.contact.phone_number",
    "is_default": "True",
    "name": "User Contact Phone Number",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's phone number."
  },
  {
    "fides_key": "user.contact.url",
    "is_default": "True",
    "name": "User Website",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Subject's websites or links to social and personal profiles."
  },
  {
    "fides_key": "user.contact.fax_number",
    "is_default": "True",
    "name": "Fax Number",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data Subject's fax number."
  },
  {
    "fides_key": "user.contact.organization",
    "is_default": "True",
    "name": "Organization",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data Subject's Organization."
  },
  {
    "fides_key": "user.contact.address.city",
    "is_default": "True",
    "name": "User Contact City",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact.address",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's city level address data."
  },
  {
    "fides_key": "user.contact.address.country",
    "is_default": "True",
    "name": "User Contact Country",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact.address",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's country level address data."
  },
  {
    "fides_key": "user.contact.address.postal_code",
    "is_default": "True",
    "name": "User Contact Postal Code",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact.address",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's postal code."
  },
  {
    "fides_key": "user.contact.address.state",
    "is_default": "True",
    "name": "User Contact State",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact.address",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's state level address data."
  },
  {
    "fides_key": "user.contact.address.street",
    "is_default": "True",
    "name": "User Contact Street",
    "organization_fides_key": "default_organization",
    "parent_key": "user.contact.address",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "User's street level address data."
  },
  {
    "fides_key": "user.content.private",
    "is_default": "True",
    "name": "Private Content",
    "organization_fides_key": "default_organization",
    "parent_key": "user.content",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Private content related to, or created by the subject, not publicly available."
  },
  {
    "fides_key": "user.content.public",
    "is_default": "True",
    "name": "Public Content",
    "organization_fides_key": "default_organization",
    "parent_key": "user.content",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Publicly shared Content related to, or created by the subject."
  },
  {
    "fides_key": "user.content.self_image",
    "is_default": "True",
    "name": "User Image",
    "organization_fides_key": "default_organization",
    "parent_key": "user.content",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Photograph or image in which subject is whole or partially recognized."
  },
  {
    "fides_key": "user.demographic.age_range",
    "is_default": "True",
    "name": "Age Range",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Non specific age or age-range of data subject."
  },
  {
    "fides_key": "user.demographic.date_of_birth",
    "is_default": "True",
    "name": "Birth Date",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Date of birth of data subject."
  },
  {
    "fides_key": "user.demographic.gender",
    "is_default": "True",
    "name": "Gender",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Gender of data subject."
  },
  {
    "fides_key": "user.demographic.language",
    "is_default": "True",
    "name": "Language",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Spoken or written language of subject."
  },
  {
    "fides_key": "user.demographic.marital_status",
    "is_default": "True",
    "name": "Marital Status",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Marital status of data subject."
  },
  {
    "fides_key": "user.demographic.political_opinion",
    "is_default": "True",
    "name": "Political Opinion",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Political opinion or belief of data subject."
  },
  {
    "fides_key": "user.demographic.profile",
    "is_default": "True",
    "name": "User Profile Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Profile or preference information about the data subject."
  },
  {
    "fides_key": "user.demographic.race_ethnicity",
    "is_default": "True",
    "name": "Race",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Race or ethnicity of data subject."
  },
  {
    "fides_key": "user.demographic.religious_belief",
    "is_default": "True",
    "name": "Religion",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Religion or religious beliefs of the data subject."
  },
  {
    "fides_key": "user.demographic.sexual_orientation",
    "is_default": "True",
    "name": "Sexual Orientation",
    "organization_fides_key": "default_organization",
    "parent_key": "user.demographic",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Sexual orientation of data subject."
  },
  {
    "fides_key": "user.device.cookie",
    "is_default": "True",
    "name": "Device Cookie",
    "organization_fides_key": "default_organization",
    "parent_key": "user.device",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data related to a subject, stored within a cookie."
  },
  {
    "fides_key": "user.device.cookie_id",
    "is_default": "True",
    "name": "Cookie ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user.device",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Cookie unique identification number."
  },
  {
    "fides_key": "user.device.device_id",
    "is_default": "True",
    "name": "Device ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user.device",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Device unique identification number."
  },
  {
    "fides_key": "user.device.ip_address",
    "is_default": "True",
    "name": "IP Address",
    "organization_fides_key": "default_organization",
    "parent_key": "user.device",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Unique identifier related to device connection."
  },
  {
    "fides_key": "user.financial.bank_account",
    "is_default": "True",
    "name": "Bank Account Information",
    "organization_fides_key": "default_organization",
    "parent_key": "user.financial",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Bank account information belonging to the subject."
  },
  {
    "fides_key": "user.financial.credit_card",
    "is_default": "True",
    "name": "Credit Card Information",
    "organization_fides_key": "default_organization",
    "parent_key": "user.financial",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Credit card information belonging to the subject."
  },
  {
    "fides_key": "user.government_id.birth_certificate",
    "is_default": "True",
    "name": "Birth Certificate",
    "organization_fides_key": "default_organization",
    "parent_key": "user.government_id",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "State issued certificate of birth."
  },
  {
    "fides_key": "user.government_id.drivers_license_number",
    "is_default": "True",
    "name": "Driver's License Number",
    "organization_fides_key": "default_organization",
    "parent_key": "user.government_id",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "State issued driving identification number."
  },
  {
    "fides_key": "user.government_id.immigration",
    "is_default": "True",
    "name": "Immigration ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user.government_id",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "State issued immigration or residency data."
  },
  {
    "fides_key": "user.government_id.national_identification_number",
    "is_default": "True",
    "name": "National Identification Number",
    "organization_fides_key": "default_organization",
    "parent_key": "user.government_id",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "State issued personal identification number."
  },
  {
    "fides_key": "user.government_id.passport_number",
    "is_default": "True",
    "name": "Passport Number",
    "organization_fides_key": "default_organization",
    "parent_key": "user.government_id",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "State issued passport data."
  },
  {
    "fides_key": "user.government_id.vehicle_registration",
    "is_default": "True",
    "name": "Vehicle Registration",
    "organization_fides_key": "default_organization",
    "parent_key": "user.government_id",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "State issued license plate or vehicle registration data."
  },
  {
    "fides_key": "user.health_and_medical.genetic",
    "is_default": "True",
    "name": "User's Genetic Data",
    "organization_fides_key": "default_organization",
    "parent_key": "user.health_and_medical",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Data about the genetic makeup provided by the subject."
  },
  {
    "fides_key": "user.health_and_medical.insurance_beneficiary_id",
    "is_default": "True",
    "name": "Medical Insurance ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user.health_and_medical",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Health insurance beneficiary number of the subject."
  },
  {
    "fides_key": "user.health_and_medical.record_id",
    "is_default": "True",
    "name": "Medical Record ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user.health_and_medical",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Medical record identifiers belonging to a subject."
  },
  {
    "fides_key": "user.location.imprecise",
    "is_default": "True",
    "name": "Imprecise Subject Location",
    "organization_fides_key": "default_organization",
    "parent_key": "user.location",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Imprecise location derived from sensors (more than 500M)."
  },
  {
    "fides_key": "user.location.precise",
    "is_default": "True",
    "name": "Precise Subject Location",
    "organization_fides_key": "default_organization",
    "parent_key": "user.location",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Precise location derived from sensors (less than 500M)."
  },
  {
    "fides_key": "user.name.first",
    "is_default": "True",
    "name": "First Name",
    "organization_fides_key": "default_organization",
    "parent_key": "user.name",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Subject's first name."
  },
  {
    "fides_key": "user.name.last",
    "is_default": "True",
    "name": "Last Name",
    "organization_fides_key": "default_organization",
    "parent_key": "user.name",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "Subject's last, or family, name."
  },
  {
    "fides_key": "user.unique_id.pseudonymous",
    "is_default": "True",
    "name": "Pseudonymous User ID",
    "organization_fides_key": "default_organization",
    "parent_key": "user.unique_id",
    "replaced_by": "",
    "tags": "",
    "version_added": "2.0.0",
    "version_deprecated": "",
    "description": "A pseudonymous, or probabilistic identifier generated from other subject or device data belonging to the subject."
  },
  {
    "fides_key": "user.personality_rights.tracking",
    "is_default": "True",
    "name": "User Behavior Tracking",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights",
    "replaced_by": "",
    "tags": "tracking_data",
    "version_added": "user_behavior_data",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.tracking.content",
    "is_default": "True",
    "name": "Content Interaction",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.tracking",
    "replaced_by": "",
    "tags": "viewed_content",
    "version_added": "interacted_content",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.tracking.social",
    "is_default": "True",
    "name": "Social Media Engagement",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.tracking",
    "replaced_by": "",
    "tags": "social_media_posts",
    "version_added": "engagement_metrics",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.tracking.browsing",
    "is_default": "True",
    "name": "Web Browsing Behavior",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.tracking",
    "replaced_by": "",
    "tags": "visited_websites",
    "version_added": "browsing_history",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.security",
    "is_default": "True",
    "name": "Security Preferences",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights",
    "replaced_by": "",
    "tags": "security_settings",
    "version_added": "privacy_preferences",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.security.privacy",
    "is_default": "True",
    "name": "Privacy Preferences",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.security",
    "replaced_by": "",
    "tags": "data_sharing_settings",
    "version_added": "consent_options",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.security.authentication",
    "is_default": "True",
    "name": "Authentication Preferences",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.security",
    "replaced_by": "",
    "tags": "login_methods",
    "version_added": "authentication_settings",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.security.device",
    "is_default": "True",
    "name": "Device Security Settings",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.security",
    "replaced_by": "",
    "tags": "device_lock_options",
    "version_added": "biometric_settings",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.expression",
    "is_default": "True",
    "name": "Expressive Output",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights",
    "replaced_by": "",
    "tags": "voice",
    "version_added": "text",
    "version_deprecated": "image",
    "description": "behavior"
  },
  {
    "fides_key": "user.personality_rights.expression.communication",
    "is_default": "True",
    "name": "Communication Style",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.expression",
    "replaced_by": "",
    "tags": "tone",
    "version_added": "vocabulary",
    "version_deprecated": "sentence structure",
    "description": "2.0.0"
  },
  {
    "fides_key": "user.personality_rights.expression.creative_output",
    "is_default": "True",
    "name": "Creative Output",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.expression",
    "replaced_by": "",
    "tags": "generated_content",
    "version_added": "artistic_style",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.perception",
    "is_default": "True",
    "name": "Public Perception",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights",
    "replaced_by": "",
    "tags": "sentiment_analysis",
    "version_added": "inferred_traits",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.perception.inferred_traits",
    "is_default": "True",
    "name": "Inferred Traits",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.perception",
    "replaced_by": "",
    "tags": "personality_type",
    "version_added": "interests",
    "version_deprecated": "values",
    "description": "2.0.0"
  },
  {
    "fides_key": "user.personality_rights.perception.sentiment_analysis",
    "is_default": "True",
    "name": "Sentiment Analysis",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.perception",
    "replaced_by": "",
    "tags": "sentiment_towards_topics",
    "version_added": "emotional_tone",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.preferences",
    "is_default": "True",
    "name": "User Preferences",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights",
    "replaced_by": "",
    "tags": "content_preferences",
    "version_added": "interaction_style",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.preferences.content_preferences",
    "is_default": "True",
    "name": "Content Preferences",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.preferences",
    "replaced_by": "",
    "tags": "preferred_topics",
    "version_added": "humor style",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "user.personality_rights.preferences.interaction_style",
    "is_default": "True",
    "name": "Interaction Style",
    "organization_fides_key": "default_organization",
    "parent_key": "user.personality_rights.preferences",
    "replaced_by": "",
    "tags": "level_of_formality",
    "version_added": "preferred_communication_channels",
    "version_deprecated": "2.0.0",
    "description": ""
  },
  {
    "fides_key": "data_category",
    "is_default": "True",
    "name": "Data Category",
    "organization_fides_key": "default_organization",
    "parent_key": "",
    "replaced_by": "",
    "tags": "2.0.0",
    "version_added": "",
    "version_deprecated": "Data unique to",
    "description": "and under control of the system."
  },
  {
    "fides_key": "user.personality_rights",
    "is_default": "True",
    "name": "Personality Rights Data",
    "organization_fides_key": "default_organization",
    "parent_key": "data_category",
    "replaced_by": "",
    "tags": "2.0.0",
    "version_added": "",
    "version_deprecated": "Data reflecting aspects of a user's identity protected by personality rights.",
    "description": ""
  }
]

export const demoData = {
  id: 'demo-board',
  title: 'Demo Board',
  lists: [
    {
      id: 'list-1',
      title: 'To Do',
      boardId: 'demo-board',
      order: 1,
      cards: [
        { id: 'card-1', title: 'Task 1',listId:'list-1', description: 'Description for Task 1', order: 1 },
        { id: 'card-2', title: 'Task 2', listId:'list-1',description: 'Description for Task 2', order: 2 },
      ],
    },
    {
      id: 'list-2',
      title: 'In Progress',
      boardId: 'demo-board',
      order: 2,
      cards: [
        { id: 'card-3', title: 'Task 3', listId:'list-2', description: 'Description for Task 3', order: 1 },
      ],
    },
    {
      id: 'list-3',
      title: 'Done',
      boardId: 'demo-board',
      order: 3,
      cards: [
        { id: 'card-4', title: 'Task 4', listId:'list-3',description: 'Description for Task 4', order: 1 },
      ],
    },
  ],
};
