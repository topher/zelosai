// app/(dashboard)/(routes)/contracts/[id]/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { getContractById } from '@/utils/contracts';
import { ContractModel } from '@/app/types';

export default function ContractDetailPage() {
  const { id } = useParams();
  const contract: ContractModel | undefined = id ? getContractById(id as string) : undefined;

  if (!contract) {
    return <p>Loading or contract not found...</p>;
  }

  return (
    <div className="contract-detail px-12 py-8 bg-white text-gray-900">
      <h1 className="text-4xl font-serif font-bold mb-6 border-b pb-4">{contract.title}</h1>
      <p className="text-lg mb-10">{contract.description}</p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Parties Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contract.parties.map((party) => (
            <div key={party.id} className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">{party.name}</h3>
              <p className="text-gray-700 mb-1">{party.role}</p>
              <p className="text-gray-600 text-sm">Contact: {party.contactInfo}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Sections</h2>
        {contract.sections.length > 0 ? (
          contract.sections.map((section) => (
            <div key={section.id} className="mb-8">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-700 mb-4">Order: {section.order}</p>
              <ul className="list-disc list-inside ml-5">
                {section.clauses.map((clause) => (
                  <li key={clause.id} className="text-gray-800 mb-1">{clause.title}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No sections available for this contract.</p>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Obligations</h2>
        {contract.obligations.length > 0 ? (
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Due Date</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Debtor</th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Creditor</th>
              </tr>
            </thead>
            <tbody>
              {contract.obligations.map((obligation, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-6">{obligation.status}</td>
                  <td className="py-4 px-6">{obligation.dueDate}</td>
                  <td className="py-4 px-6">{obligation.debtorPartyId}</td>
                  <td className="py-4 px-6">{obligation.creditorPartyId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No obligations found for this contract.</p>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Events</h2>
        {contract.events.length > 0 ? (
          <ul className="space-y-6">
            {contract.events.map((event) => (
              <li key={event.id} className="border p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-1">{event.type}</h3>
                <p className="text-gray-700 mb-2">Date: {event.date}</p>
                <p className="text-gray-800">{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No events recorded for this contract.</p>
        )}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Created:</strong> {contract.creationDate}
          </p>
          <p>
            <strong>Last Updated:</strong> {contract.lastUpdated}
          </p>
          <p>
            <strong>URI:</strong>{' '}
            <a href={contract.uri} className="text-blue-600 underline">
              {contract.uri}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
