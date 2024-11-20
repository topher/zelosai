// /app/components/atomic/molecules/cards/ModelSubjectCard.tsx

'use client'

import React, { useState } from 'react'
import { ModelSubject } from '@/app/types'
import { Badge } from '@/components/ui/badge'

interface ModelSubjectCardProps {
  subject: ModelSubject
}

const ModelSubjectCard: React.FC<ModelSubjectCardProps> = ({ subject }) => {
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
            {subject.subjectName}
          </h3>
          <p className="text-sm text-gray-300">{subject.description}</p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {subject.expertiseLevel && (
            <Badge variant="default">{subject.expertiseLevel}</Badge>
          )}
        </div>

        {/* Related Models */}
        {subject.relatedModels && subject.relatedModels.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-white mb-1">Related Models:</p>
            <div className="flex flex-wrap gap-2">
              {subject.relatedModels.map((model, idx) => (
                <Badge key={idx} variant="secondary">
                  {model}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModelSubjectCard
