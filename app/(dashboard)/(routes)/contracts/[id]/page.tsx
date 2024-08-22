// app/(dashboard)/(routes)/contracts/[id]/page.tsx
'use client'
import { useParams } from 'next/navigation';
import { getContractById } from '@/utils/contracts'; // Import the utility function
import { ContractModel } from '@/app/types';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react';

export default function ContractDetailPage() {
  const { id } = useParams(); // Use useParams to get the id from the route

  // Fetch the contract using the ID from the URL
  const contract: ContractModel | undefined = id ? getContractById(id as string) : undefined;

  // Handle loading state or contract not found
  if (!contract) {
    return <p>Loading or contract not found...</p>; // You can customize this message or add a spinner
  }

  return (
    <div className="contract-detail p-6">
      <h1 className="text-3xl font-bold mb-4">{contract.title}</h1>
      <p className="text-gray-700 mb-8">{contract.description}</p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Parties Involved</h2>
        <ul className="list-disc list-inside">
          {contract.parties.map((party) => (
            <li key={party.id}>
              <strong>{party.name}</strong> - {party.role}
              <br />
              <span className="text-sm text-gray-600">Contact: {party.contactInfo}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Sections</h2>
        {contract.sections.length > 0 ? (
          <ul className="list-decimal list-inside">
            {contract.sections.map((section) => (
              <li key={section.id}>
                <h3 className="text-xl font-medium">{section.title}</h3>
                <p className="text-gray-600">{section.order}</p>
                <ul className="list-disc ml-6">
                  {section.clauses.map((clause: { id: Key; title: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | Iterable<ReactNode>; }) => (
                    <li key={clause.id}>{clause.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No sections available for this contract.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Obligations</h2>
        {contract.obligations.length > 0 ? (
          <ul className="list-disc list-inside">
            {contract.obligations.map((obligation, index) => (
              <li key={index}>
                <strong>Status:</strong> {obligation.status} | <strong>Due Date:</strong> {obligation.dueDate}
                <br />
                <span className="text-sm text-gray-600">
                  Debtor: {obligation.debtorPartyId}, Creditor: {obligation.creditorPartyId}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No obligations found for this contract.</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Events</h2>
        {contract.events.length > 0 ? (
          <ul className="list-disc list-inside">
            {contract.events.map((event) => (
              <li key={event.id}>
                <strong>{event.type}</strong> on {event.date}
                <br />
                <span className="text-sm text-gray-600">{event.description}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events recorded for this contract.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Additional Information</h2>
        <p>
          <strong>Created:</strong> {contract.creationDate}
        </p>
        <p>
          <strong>Last Updated:</strong> {contract.lastUpdated}
        </p>
        <p>
          <strong>URI:</strong> <a href={contract.uri} className="text-blue-500 underline">{contract.uri}</a>
        </p>
      </div>
    </div>
  );
}
