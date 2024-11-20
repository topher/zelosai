// /app/components/atomic/molecules/cards/IssueCard.tsx

'use client'

import React, { useState } from 'react'
import { StategicIssue } from '@/app/types'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

interface IssueCardProps {
  issue: StategicIssue
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative group cursor-pointer rounded-xl overflow-hidden bg-gray-800 p-6 transition-transform duration-300 transform ${
        isHovered ? 'scale-105 shadow-xl' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Header */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-2">
            {issue.Topic}
          </h3>
        </div>

        {/* Content */}
        <div>
          <div className="mb-4">
            <p className="text-sm text-gray-300">{issue['SWOT Type']}</p>
            <p className="text-sm text-gray-300">
              Subscribed: {issue.Subscribed.toString()}
            </p>
          </div>

          {/* Related Goals */}
          {issue.RelatedGoals && issue.RelatedGoals.length > 0 && (
            <div className="mb-2">
              <p className="text-sm font-medium text-white mb-1">
                Related Goals:
              </p>
              <div className="flex flex-wrap gap-2">
                {issue.RelatedGoals.map((goal, i) => (
                  <Badge key={i} variant="default">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Use Cases */}
          {issue.RelatedUseCases && issue.RelatedUseCases.length > 0 && (
            <div className="mb-2">
              <p className="text-sm font-medium text-white mb-1">
                Related Use Cases:
              </p>
              <div className="flex flex-wrap gap-2">
                {issue.RelatedUseCases.map((useCase, i) => (
                  <Badge key={i} variant="secondary">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-300">Active</p>
          <Switch
            checked={issue.Subscribed}
            onCheckedChange={() => {
              // Placeholder function: logs to console
              console.log(`Toggled subscribed status for issue ID: ${issue.id}`)
            }}
            className="w-10 h-6 bg-gray-200 rounded-full relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                issue.Subscribed ? 'translate-x-4' : 'translate-x-0'
              }`}
            ></span>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default IssueCard;
