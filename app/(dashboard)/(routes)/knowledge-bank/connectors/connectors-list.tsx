import { DataConnector } from '@/app/types'
import React from 'react'

const ConnectorsList = ({ connectors }: { connectors: DataConnector[] }) => {
  return (
    <ul className="space-y-2">
      {connectors.map((connector) => (
        <li key={connector.name} className="flex items-center">
          {connector.icon && <img src={connector.icon} alt={connector.name} className="w-6 h-6 mr-2" />}
          <span className="text-base font-medium">{connector.name}</span>
          {connector.description && (
            <p className="text-muted-foreground ml-2">{connector.description}</p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default ConnectorsList
