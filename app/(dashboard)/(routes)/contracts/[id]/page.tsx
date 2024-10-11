// app/(dashboard)/(routes)/contracts/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getContractById } from '@/utils/contracts';
import { ContractModel } from '@/app/types';
import { Separator } from '@/components/ui/separator';
import Tag from '@/app/(dashboard)/(routes)/strategy/components/tag'; // Ensure this path is correct
import { Loader } from 'lucide-react'; // For loading indicator

export default function ContractDetailPage() {
  const { id } = useParams();
  const [contract, setContract] = useState<ContractModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (id) {
          const fetchedContract = await getContractById(id as string);
          setContract(fetchedContract);
        } else {
          setError('No contract ID provided.');
        }
      } catch (err: any) {
        console.error('Error fetching contract:', err);
        setError('Failed to load contract. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader size={50} color="#4F46E5" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!contract) {
    return <p className="text-center">Contract not found.</p>;
  }

  return (
    <div className="contract-detail px-8 py-6 bg-white text-gray-900 max-w-5xl mx-auto">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2 border-b pb-4">{contract.title}</h1>
        <p className="text-lg text-gray-700">{contract.description}</p>
      </header>

      {/* Parties Involved */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Parties Involved</h2>
        <Separator className="mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contract.parties.map((party) => (
            <div key={party.id} className="border p-6 rounded-lg shadow-sm flex flex-col">
              <h3 className="text-xl font-medium mb-1">{party.name}</h3>
              <p className="text-gray-700 mb-1">Role: {party.role}</p>
              <p className="text-gray-600 text-sm">Contact: {party.contactInfo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sections</h2>
        <Separator className="mb-6" />
        {contract.sections.length > 0 ? (
          contract.sections.map((section) => (
            <div key={section.id} className="mb-8">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-700 mb-4">Order: {section.order}</p>
              <ul className="list-disc list-inside ml-5">
                {section.clauses.map((clause) => (
                  <li key={clause.id} className="text-gray-800 mb-1">
                    {clause.title}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No sections available for this contract.</p>
        )}
      </section>

      {/* Obligations */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Obligations</h2>
        <Separator className="mb-6" />
        {contract.obligations.length > 0 ? (
          <div className="overflow-x-auto">
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
                {contract.obligations.map((obligation) => (
                  <tr key={obligation.id} className="border-t">
                    <td className="py-4 px-6">{obligation.status}</td>
                    <td className="py-4 px-6">{obligation.dueDate}</td>
                    <td className="py-4 px-6">{obligation.debtorPartyId}</td>
                    <td className="py-4 px-6">{obligation.creditorPartyId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No obligations found for this contract.</p>
        )}
      </section>

      {/* Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Events</h2>
        <Separator className="mb-6" />
        {contract.events.length > 0 ? (
          <ul className="space-y-6">
            {contract.events.map((event) => (
              <li key={event.id} className="border p-6 rounded-lg shadow-sm flex flex-col">
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

      {/* Additional Information */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
        <Separator className="mb-6" />
        <div className="space-y-3 text-gray-800">
          <p>
            <strong>Created:</strong> {new Date(contract.creationDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Last Updated:</strong> {new Date(contract.lastUpdated).toLocaleDateString()}
          </p>
          <p>
            <strong>URI:</strong>{' '}
            <a href={contract.uri} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              {contract.uri}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
