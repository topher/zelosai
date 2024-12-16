"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predicates = exports.ResourceType = void 0;
var ResourceType;
(function (ResourceType) {
    ResourceType["UserAction"] = "UserAction";
    ResourceType["Recommendation"] = "Recommendation";
    ResourceType["Statistic"] = "Statistic";
    ResourceType["Alert"] = "Alert";
    ResourceType["Goal"] = "Goal";
    ResourceType["Persona"] = "Persona";
    ResourceType["StrategicIssue"] = "StrategicIssue";
    ResourceType["BusinessModelCard"] = "BusinessModelCard";
    ResourceType["BrandModelCard"] = "BrandModelCard";
    ResourceType["AIModel"] = "AIModel";
    ResourceType["ModelSubject"] = "ModelSubject";
    ResourceType["ModelTraining"] = "ModelTraining";
    ResourceType["UseCase"] = "UseCase";
    ResourceType["DataConnector"] = "DataConnector";
    ResourceType["Topic"] = "Topic";
    ResourceType["InfoAsset"] = "InfoAsset";
    ResourceType["Policy"] = "Policy";
    ResourceType["DataCategory"] = "DataCategory";
    ResourceType["Message"] = "Message";
    ResourceType["Offer"] = "Offer";
    ResourceType["ScheduledEvent"] = "ScheduledEvent";
    ResourceType["Transaction"] = "Transaction";
    ResourceType["Contract"] = "Contract";
    ResourceType["Workflow"] = "Workflow";
    ResourceType["Task"] = "Task";
    ResourceType["Agent"] = "Agent";
    ResourceType["ProfileAthlete"] = "ProfileAthlete";
    ResourceType["ProfileContract"] = "ProfileContract";
    ResourceType["ProfileModel"] = "ProfileModel";
    ResourceType["ProfileBrand"] = "ProfileBrand";
    ResourceType["ProfileUser"] = "ProfileUser";
    ResourceType["SearchableAthlete"] = "SearchableAthlete";
    ResourceType["SearchableContract"] = "SearchableContract";
    ResourceType["SearchableModel"] = "SearchableModel";
    ResourceType["SearchableBrand"] = "SearchableBrand";
    ResourceType["SearchableUser"] = "SearchableUser";
    ResourceType["Triple"] = "Triple";
    ResourceType["ModelInference"] = "ModelInference";
    ResourceType["scalarString"] = "scalarString";
    ResourceType["ScalarString"] = "ScalarString";
    ResourceType["ScalarInt"] = "ScalarInt";
    ResourceType["ScalarFloat"] = "ScalarFloat";
    ResourceType["ScalarBoolean"] = "ScalarBoolean";
    ResourceType["ScalarDate"] = "ScalarDate";
    ResourceType["ScalarEnum"] = "ScalarEnum";
    ResourceType["ProfileOrganization"] = "ProfileOrganization";
    ResourceType["Interest"] = "Interest";
    ResourceType["Industry"] = "Industry";
    ResourceType["Reference"] = "Reference";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
// Mapping from your `predicate_mappings`
exports.predicates = {
    represents_noc: {
        id: 'represents_noc',
        label: "Represents NOC",
        description: "The National Olympic Committee that the athlete represents.",
        synonyms: ["nationality", "country"],
        icon: "MapPin",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_name: {
        id: 'has_name',
        label: "Has Name",
        description: "The full name of the individual or brand.",
        synonyms: ["name", "full name"],
        icon: "Users",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileBrand, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_short_name: {
        id: 'has_short_name',
        label: "Has Short Name",
        description: "The nickname or short name.",
        synonyms: ["nickname", "alias"],
        icon: "Users",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    participates_in_sport: {
        id: 'participates_in_sport',
        label: "Participates in Sport",
        description: "The sport in which the athlete participates.",
        synonyms: ["sport", "discipline"],
        icon: "Activity",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    represents_location: {
        id: 'represents_location',
        label: "Represents Location",
        description: "The location or region the athlete represents.",
        synonyms: ["location", "region", "hometown"],
        icon: "MapPin",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_occupation: {
        id: 'has_occupation',
        label: "Has Occupation",
        description: "The occupation or profession.",
        synonyms: ["job", "profession"],
        icon: "Briefcase",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_family: {
        id: 'has_family',
        label: "Has Family",
        description: "Information about family members.",
        synonyms: ["family", "relatives"],
        icon: "GroupIcon",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ProfileUser],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    speaks_language: {
        id: 'speaks_language',
        label: "Speaks Language",
        description: "Languages spoken by the individual.",
        synonyms: ["languages", "language proficiency"],
        icon: "Languages",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ScalarEnum],
        enumOptions: ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Russian", "Arabic", "Portuguese", "Hindi"],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    belongs_to_club: {
        id: 'belongs_to_club',
        label: "Belongs to Club",
        description: "The club or team the athlete is associated with.",
        synonyms: ["club", "team"],
        icon: "Users",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ProfileOrganization],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_coach: {
        id: 'has_coach',
        label: "Has Coach",
        description: "The coach of the athlete.",
        synonyms: ["coach", "trainer"],
        icon: "UserPlus",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ProfileUser],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_position_style: {
        id: 'has_position_style',
        label: "Has Position Style",
        description: "The position or style the athlete plays.",
        synonyms: ["position", "style"],
        icon: "Target",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_sporting_relatives: {
        id: 'has_sporting_relatives',
        label: "Has Sporting Relatives",
        description: "Relatives who are also involved in sports.",
        synonyms: ["sporting family", "athletic relatives"],
        icon: "GroupIcon",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ProfileAthlete],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_injuries: {
        id: 'has_injuries',
        label: "Has Injuries",
        description: "Information about past injuries.",
        synonyms: ["injuries", "medical history"],
        icon: "Heart",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    competes_in_national_league: {
        id: 'competes_in_national_league',
        label: "Competes in National League",
        description: "Participation in national leagues.",
        synonyms: ["league", "competition"],
        icon: "Trophy",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_award: {
        id: 'has_award',
        label: "Has Award",
        description: "Awards received by the individual.",
        synonyms: ["awards", "recognition"],
        icon: "Award",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_achievements: {
        id: 'has_achievements',
        label: "Has Achievements",
        description: "Notable achievements.",
        synonyms: ["achievements", "accomplishments"],
        icon: "Star",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_description: {
        id: 'has_description',
        label: "Has Description",
        description: "A description or bio.",
        synonyms: ["bio", "about"],
        icon: "Info",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileBrand, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_start: {
        id: 'has_start',
        label: "Has Start",
        description: "When the individual started their career.",
        synonyms: ["career start", "beginning"],
        icon: "Clock",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarDate],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_reason: {
        id: 'has_reason',
        label: "Has Reason",
        description: "Reason for starting or pursuing something.",
        synonyms: ["motivation", "inspiration"],
        icon: "Pen",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_ambition: {
        id: 'has_ambition',
        label: "Has Ambition",
        description: "Future goals or ambitions.",
        synonyms: ["goals", "aspirations"],
        icon: "TrendingUp",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.Goal],
        referenceResourceTypes: [ResourceType.Goal],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_training: {
        id: 'has_training',
        label: "Has Training",
        description: "Training routines or methods.",
        synonyms: ["training", "practice"],
        icon: "Activity",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_influence: {
        id: 'has_influence',
        label: "Has Influence",
        description: "Influential people or factors.",
        synonyms: ["influences", "role models"],
        icon: "UserCheck",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    has_interest: {
        id: 'has_interest',
        label: "Has Interest",
        description: "Interests or hobbies.",
        synonyms: ["hobbies", "interests"],
        icon: "Smile",
        applicableSubjectResourceTypes: [ResourceType.ProfileAthlete, ResourceType.ProfileUser],
        applicableObjectResourceTypes: [ResourceType.Interest],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    // Additional predicates for brand profiles
    mission_vision: {
        id: 'mission_vision',
        label: "Mission Vision",
        description: "The mission and vision statement of the brand.",
        synonyms: ["mission", "vision", "purpose"],
        icon: "Eye",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    sponsorship_activities: {
        id: 'sponsorship_activities',
        label: "Sponsorship Activities",
        description: "Sponsorship activities and their details.",
        synonyms: ["sponsorships", "sponsorship activities"],
        icon: "Gift",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    channels: {
        id: 'channels',
        label: "Channels",
        description: "Marketing and distribution channels used by the brand.",
        synonyms: ["marketing channels", "distribution channels"],
        icon: "Link",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    primary_industry: {
        id: 'primary_industry',
        label: "Primary Industry",
        description: "The primary industry in which the brand operates.",
        synonyms: ["industry", "sector"],
        icon: "Briefcase",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.Industry],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    secondary_industry: {
        id: 'secondary_industry',
        label: "Secondary Industry",
        description: "The secondary industry in which the brand operates.",
        synonyms: ["secondary sector"],
        icon: "Briefcase",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.Industry],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    regions: {
        id: 'regions',
        label: "Regions",
        description: "Geographical regions where the brand is active.",
        synonyms: ["locations", "areas"],
        icon: "Globe",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    audience_lifestyle: {
        id: 'audience_lifestyle',
        label: "Audience Lifestyle",
        description: "VALS psychographic segmentation framework used to categorize consumers.",
        synonyms: ["lifestyle", "psychographics"],
        icon: "Smile",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    key_partners: {
        id: 'key_partners',
        label: "Key Partners",
        description: "Key partners in the brand's business model.",
        synonyms: ["partners", "alliances"],
        icon: "Users",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ProfileOrganization],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    key_activities: {
        id: 'key_activities',
        label: "Key Activities",
        description: "Key activities in the brand's business model.",
        synonyms: ["activities", "operations"],
        icon: "Activity",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    value_propositions: {
        id: 'value_propositions',
        label: "Value Propositions",
        description: "Value propositions of the brand's business model.",
        synonyms: ["value", "propositions"],
        icon: "Gift",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    customer_relationships: {
        id: 'customer_relationships',
        label: "Customer Relationships",
        description: "Customer relationships in the brand's business model.",
        synonyms: ["customer relations", "client relationships"],
        icon: "UserCheck",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    customer_segments: {
        id: 'customer_segments',
        label: "Customer Segments",
        description: "Customer segments of the brand.",
        synonyms: ["segments", "target market"],
        icon: "Users",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    cost_structure: {
        id: 'cost_structure',
        label: "Cost Structure",
        description: "Cost structure of the brand's business model.",
        synonyms: ["costs", "expenses"],
        icon: "DollarSign",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
    revenue_streams: {
        id: 'revenue_streams',
        label: "Revenue Streams",
        description: "Revenue streams of the brand's business model.",
        synonyms: ["revenues", "income sources"],
        icon: "DollarSign",
        applicableSubjectResourceTypes: [ResourceType.ProfileBrand],
        applicableObjectResourceTypes: [ResourceType.ScalarString],
        accountId: "",
        resourceType: ResourceType.UserAction,
        ownerId: "",
        createdAt: undefined
    },
};
