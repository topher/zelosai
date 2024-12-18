// /app/(dashboard)/(routes)/models/model-subjects/page.tsx

'use client'

import React, { useEffect, useState } from 'react'
import CardGridLayout from '@/app/components/atomic/templates/CardGridLayout'
import ModelSubjectCard from '@/app/components/atomic/molecules/cards/ModelSubjectCard'
import { ModelSubject } from '@/app/types'

const ModelSubjectsPage: React.FC = () => {
  const [modelSubjects, setModelSubjects] = useState<ModelSubject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModelSubjects = async () => {
      try {
        const response = await fetch('/api/resource/model_subjects')
        if (response.ok) {
          const data = await response.json()
          setModelSubjects(data.resources)
        } else {
          setError('Failed to fetch model subjects.')
        }
      } catch (error) {
        console.error('Error fetching model subjects:', error)
        setError('Failed to fetch model subjects.')
      } finally {
        setLoading(false)
      }
    }
    fetchModelSubjects()
  }, [])

  const header = {
    title: 'Model Subjects',
    description: 'Manage and view all your model subjects.',
  }

  return (
    <CardGridLayout
      header={header}
      isLoading={loading}
      error={error}
      items={modelSubjects}
      renderItem={(subject: ModelSubject) => (
        <ModelSubjectCard key={subject.id} subject={subject} />
      )}
    />
  )
}

export default ModelSubjectsPage
