#!/bin/bash

# =============================================================================
# Script: create_mappings.sh
# Description: Creates Elasticsearch mapping files for specified JSON resources.
# Author: [Your Name]
# Date: [Current Date]
# =============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Define the mappings directory
MAPPINGS_DIR="mappings"

# Create the mappings directory if it doesn't exist
if [ ! -d "$MAPPINGS_DIR" ]; then
  echo "Creating '$MAPPINGS_DIR' directory..."
  mkdir "$MAPPINGS_DIR"
  echo "'$MAPPINGS_DIR' directory created."
else
  echo "'$MAPPINGS_DIR' directory already exists. Proceeding..."
fi

# Function to create a mapping file
create_mapping() {
  local filename=$1
  shift
  local content=$@

  echo "Creating mapping file: $MAPPINGS_DIR/$filename..."
  cat <<EOF > "$MAPPINGS_DIR/$filename"
$content
EOF
  echo "Mapping file '$filename' created successfully."
}

# 1. agents_mapping.json
create_mapping "agents_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "URI": {
        "type": "keyword"
      },
      "agentType": {
        "type": "keyword"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "expertiseAreas": {
        "type": "keyword"
      },
      "availabilityStatus": {
        "type": "keyword"
      },
      "aiCapabilities": {
        "properties": {
          "supportedLanguages": {
            "type": "keyword"
          },
          "responseTime": {
            "type": "integer"
          },
          "integrations": {
            "type": "keyword"
          }
        }
      },
      "tags": {
        "type": "keyword"
      }
    }
  }
}'

# 2. brand_model_cards_mapping.json
create_mapping "brand_model_cards_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "sectionName": {
        "type": "keyword"
      },
      "brandFacetId": {
        "type": "keyword"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "updatedAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "visibility": {
        "type": "keyword"
      }
    }
  }
}'

# 3. business_model_cards_mapping.json
create_mapping "business_model_cards_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "sectionName": {
        "type": "keyword"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "updatedAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "visibility": {
        "type": "keyword"
      },
      "tags": {
        "type": "keyword"
      }
    }
  }
}'

# 4. connectors_mapping.json
create_mapping "connectors_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text"
      },
      "icon": {
        "type": "keyword"
      },
      "connectionType": {
        "type": "keyword"
      },
      "disabled": {
        "type": "boolean"
      },
      "metadata": {
        "properties": {
          "api_key": {
            "type": "keyword",
            "index": false
          },
          "shop_name": {
            "type": "keyword",
            "index": false
          }
        }
      }
    }
  }
}'

# 5. data_categories_mapping.json
create_mapping "data_categories_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "fides_key": {
        "type": "keyword"
      },
      "is_default": {
        "type": "boolean"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "organization_fides_key": {
        "type": "keyword"
      },
      "parent_key": {
        "type": "keyword"
      },
      "replaced_by": {
        "type": "keyword"
      },
      "tags": {
        "type": "keyword"
      },
      "version_added": {
        "type": "keyword"
      },
      "version_deprecated": {
        "type": "keyword"
      },
      "description": {
        "type": "text"
      }
    }
  }
}'

# 6. issues_mapping.json
create_mapping "issues_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "Topic": {
        "type": "text"
      },
      "SWOT Type": {
        "type": "keyword"
      },
      "Subscribed": {
        "type": "boolean"
      },
      "RelatedGoals": {
        "type": "keyword"
      },
      "RelatedUseCases": {
        "type": "keyword"
      }
    }
  }
}'

# 7. messages_mapping.json
create_mapping "messages_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "senderId": {
        "type": "keyword"
      },
      "recipientId": {
        "type": "keyword"
      },
      "content": {
        "type": "text"
      },
      "sentAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "subject": {
        "type": "text"
      },
      "messageType": {
        "type": "keyword"
      },
      "priority": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      }
    }
  }
}'

# 8. model_subjects_mapping.json
create_mapping "model_subjects_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "URI": {
        "type": "keyword"
      },
      "subjectName": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text"
      },
      "relatedModels": {
        "type": "keyword"
      },
      "expertiseLevel": {
        "type": "keyword"
      },
      "tags": {
        "type": "keyword"
      }
    }
  }
}'

# 9. model_trainings_mapping.json
create_mapping "model_trainings_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "URI": {
        "type": "keyword"
      },
      "modelName": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text"
      },
      "trainingDataSources": {
        "type": "keyword"
      },
      "trainingStatus": {
        "type": "keyword"
      },
      "accuracy": {
        "type": "float"
      },
      "lastTrainedAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "parameters": {
        "properties": {
          "epochs": {
            "type": "integer"
          },
          "learningRate": {
            "type": "float"
          },
          "batchSize": {
            "type": "integer"
          },
          "optimizer": {
            "type": "keyword"
          },
          "layers": {
            "type": "integer"
          }
        }
      },
      "tags": {
        "type": "keyword"
      }
    }
  }
}'

# 10. offers_mapping.json
create_mapping "offers_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text"
      },
      "price": {
        "type": "float"
      },
      "priceCurrency": {
        "type": "keyword"
      },
      "availability": {
        "type": "keyword"
      },
      "validFrom": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "validThrough": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "itemOffered": {
        "type": "keyword"
      },
      "sellerId": {
        "type": "keyword"
      },
      "offerType": {
        "type": "keyword"
      },
      "termsOfService": {
        "type": "text"
      },
      "priority": {
        "type": "keyword"
      }
    }
  }
}'

# 11. personas_mapping.json
create_mapping "personas_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "Name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "Description": {
        "type": "text"
      },
      "Type": {
        "type": "keyword"
      },
      "AssociatedUseCases": {
        "type": "keyword"
      },
      "is_persona": {
        "type": "boolean"
      },
      "Image": {
        "type": "keyword"
      }
    }
  }
}'

# 12. recommendations_mapping.json
create_mapping "recommendations_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "title": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text"
      },
      "recommendedResourceId": {
        "type": "keyword"
      },
      "recommendedResourceType": {
        "type": "keyword"
      },
      "reason": {
        "type": "text"
      },
      "recommenderId": {
        "type": "keyword"
      },
      "priority": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "featureKey": {
        "type": "keyword"
      },
      "actionFeatureKey": {
        "type": "keyword"
      }
    }
  }
}'

# 13. scheduled_events_mapping.json
create_mapping "scheduled_events_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "description": {
        "type": "text"
      },
      "startDate": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "endDate": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "location": {
        "type": "text"
      },
      "organizerId": {
        "type": "keyword"
      },
      "participantIds": {
        "type": "keyword"
      },
      "eventStatus": {
        "type": "keyword"
      },
      "eventType": {
        "type": "keyword"
      },
      "priority": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      }
    }
  }
}'

# 14. tasks_mapping.json
create_mapping "tasks_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "updatedAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "tags": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "title": {
        "type": "text"
      },
      "priority": {
        "type": "keyword"
      },
      "workflowId": {
        "type": "keyword"
      },
      "stageId": {
        "type": "keyword"
      },
      "description": {
        "type": "text"
      }
    }
  }
}'

# 15. transactions_mapping.json
create_mapping "transactions_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "transactionType": {
        "type": "keyword"
      },
      "amount": {
        "type": "float"
      },
      "currency": {
        "type": "keyword"
      },
      "senderId": {
        "type": "keyword"
      },
      "recipientId": {
        "type": "keyword"
      },
      "transactionDate": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "status": {
        "type": "keyword"
      },
      "relatedResourceId": {
        "type": "keyword"
      },
      "notes": {
        "type": "text"
      },
      "priority": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      }
    }
  }
}'

# 16. use_cases_mapping.json
create_mapping "use_cases_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "Description": {
        "type": "text"
      },
      "Subject": {
        "type": "keyword"
      },
      "Target": {
        "type": "keyword"
      },
      "ForPurpose": {
        "type": "keyword"
      },
      "Models": {
        "type": "integer"
      }
    }
  }
}'

# 17. user_actions_mapping.json
create_mapping "user_actions_mapping.json" '{
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "accountId": {
        "type": "keyword"
      },
      "ownerId": {
        "type": "keyword"
      },
      "visibility": {
        "type": "keyword"
      },
      "resourceType": {
        "type": "keyword"
      },
      "avatarSrc": {
        "type": "keyword"
      },
      "name": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "email": {
        "type": "keyword"
      },
      "action": {
        "type": "keyword"
      },
      "content": {
        "type": "text"
      },
      "createdAt": {
        "type": "date",
        "format": "strict_date_optional_time||epoch_millis"
      },
      "target": {
        "type": "keyword"
      },
      "creditsUsed": {
        "type": "integer"
      }
    }
  }
}'

echo "✅ All Elasticsearch mapping files have been created successfully in the '$MAPPINGS_DIR' directory."
