import StatCard from '@/app/components/atomic/organisms/cards/triple-cards/StatCard';
import ProgressCard from '@/app/components/atomic/organisms/cards/triple-cards/ProgressCard';
import CalendarCard from '@/app/components/atomic/organisms/cards/triple-cards/CalendarCard';
import LabelCard from '@/app/components/atomic/organisms/cards/triple-cards/LabelCard';
import TaskCard from '@/app/components/atomic/organisms/cards/triple-cards/TaskCard';
import ChartCard from '@/app/components/atomic/organisms/cards/triple-cards/ChartCard';
import UserCard from '@/app/components/atomic/organisms/cards/triple-cards/UserCard';
import InteractiveCard from '@/app/components/atomic/organisms/cards/triple-cards/InteractiveCard';
import NotificationCard from '@/app/components/atomic/organisms/cards/triple-cards/NotificationCard';
import AnalyticsOverviewCard from '@/app/components/atomic/organisms/cards/triple-cards/AnalyticsOverviewCard';
import RecommendedActions from '@/app/components/atomic/organisms/cards/triple-cards/RecommendedActions';
import UploadIPCard from '@/app/components/atomic/organisms/cards/triple-cards/UploadIPCard';
import DraftStrategyCard from '@/app/components/atomic/organisms/cards/triple-cards/DraftStrategyCard';
import MintSmartContractCard from '@/app/components/atomic/organisms/cards/triple-cards/MintSmartContractCard';
import UploadContractCard from '@/app/components/atomic/organisms/cards/triple-cards/UploadContractCard';
import SetGoalsCard from '@/app/components/atomic/organisms/cards/triple-cards/SetGoalsCard';
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