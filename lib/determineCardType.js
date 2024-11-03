import StatCard from '@/app/components/dashboard/StatCard';
import ProgressCard from '@/app/components/dashboard/ProgressCard';
import CalendarCard from '@/app/components/dashboard/CalendarCard';
import LabelCard from '@/app/components/dashboard/LabelCard';
import TaskCard from '@/app/components/dashboard/TaskCard';
import ChartCard from '@/app/components/dashboard/ChartCard';
import UserCard from '@/app/components/dashboard/UserCard';
import InteractiveCard from '@/app/components/dashboard/InteractiveCard';
import NotificationCard from '@/app/components/dashboard/NotificationCard';
import AnalyticsOverviewCard from '@/app/components/dashboard/AnalyticsOverviewCard';
import RecommendedActions from '@/app/components/dashboard/RecommendedActions';
import UploadIPCard from '@/app/components/dashboard/UploadIPCard';
import DraftStrategyCard from '@/app/components/dashboard/DraftStrategyCard';
import MintSmartContractCard from '@/app/components/dashboard/MintSmartContractCard';
import UploadContractCard from '@/app/components/dashboard/UploadContractCard';
import SetGoalsCard from '@/app/components/dashboard/SetGoalsCard';
import TripleCardPredicate from "@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardPredicate"
import TripleCardSubject from "@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardSubject"
import TripleCardObject from "@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardObject"
import TripleCardWhole from "@/app/(dashboard)/(routes)/profiles/[type]/[id]/components/TripleCardWhole"

const cardTypeMapping = {
  'stat': StatCard,
  'progress': ProgressCard,
  'calendar': CalendarCard,
  'label': LabelCard,
  'task': TaskCard,
  'chart': ChartCard,
  'user': UserCard,
  'interactive': InteractiveCard,
  'notification': NotificationCard,
  'analytics': AnalyticsOverviewCard, // Assuming analytics is a type of overview card
  'analytics_overview': AnalyticsOverviewCard,
  // 'recommended_action': RecommendedActions,
  'Upload IP': UploadIPCard,
  'Draft Monetization Strategy': DraftStrategyCard,
  'Mint Smart Contract': MintSmartContractCard,
  'Upload Contract': UploadContractCard,
  'Set Goals': SetGoalsCard,
  
};

export const determineCardType = (triple) => {
  // Special handling for 'canTake' predicate
  if (triple.predicate === 'canTake') {
    return cardTypeMapping[triple.object] || TripleCardWhole; // DefaultActionCard is a fallback component for actions
  }
  
  // Handling for other predicates
  return cardTypeMapping[triple.predicate] || TripleCardWhole; // DefaultCard is a fallback component for general cases
};