import { useEffect, useState } from "react";
import { DataConnector } from "@/app/types";
import { getConnectorsByAccountId } from "@/app/actions/connectorsActions"; // Import the action

const ConnectorsList = ({ accountId }: { accountId: string }) => {
  const [connectors, setConnectors] = useState<DataConnector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConnectors = async () => {
      try {
        const data = await getConnectorsByAccountId(accountId); // Pass accountId
        setConnectors(data);
      } catch (err) {
        setError("Failed to load connectors.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnectors();
  }, [accountId]); // Use accountId as a dependency to refetch when it changes

  if (loading) return <p>Loading connectors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul className="space-y-2">
      {connectors.map((connector) => (
        <li key={connector.id} className="flex items-center">
          {connector.icon && <img src={connector.icon} alt={connector.name} className="w-6 h-6 mr-2" />}
          <span className="text-base font-medium">{connector.name}</span>
          {connector.description && <p className="text-muted-foreground ml-2">{connector.description}</p>}
        </li>
      ))}
    </ul>
  );
};

export default ConnectorsList;