// mockData/policies.ts

export const mockPolicies = [
    {
      id: 'policy-athlete-admin',
      organizationId: 'org_2ncENhn6JwWpZA2lTOdmnXAFjaG',
      description: 'Athlete Admin has full access to all resources in Athletes Org.',
      rules: [
        {
          id: 'rule-athlete-admin-access',
          ruleType: 'access',
          deontologicalDuty: 'allowed',
          predicate: ['read', 'create', 'update', 'delete'],
          subjectCondition: {
            type: 'group',
            operator: 'AND',
            conditions: [
              {
                type: 'condition',
                attribute: 'orgRole',
                operator: 'is',
                value: 'org:admin',
              },
            ],
          },
          objectCondition: null,
          createdBy: 'system',
          ownedBy: 'admin',
        },
      ],
    },
    {
      id: 'policy-agent-access',
      organizationId: 'org_2nc9c87ihMBSTJxcYc4X4dwmdH4',
      description: 'Agent has read and write access to Agent Org resources.',
      rules: [
        {
          id: 'rule-agent-read',
          ruleType: 'access',
          deontologicalDuty: 'allowed',
          predicate: ['read'],
          subjectCondition: {
            type: 'group',
            operator: 'AND',
            conditions: [
              {
                type: 'condition',
                attribute: 'orgRole',
                operator: 'is',
                value: 'org:admin',
              },
            ],
          },
          objectCondition: null,
          createdBy: 'system',
          ownedBy: 'admin',
        },
        {
          id: 'rule-agent-write',
          ruleType: 'access',
          deontologicalDuty: 'allowed',
          predicate: ['write'],
          subjectCondition: {
            type: 'group',
            operator: 'AND',
            conditions: [
              {
                type: 'condition',
                attribute: 'orgRole',
                operator: 'is',
                value: 'org:admin',
              },
            ],
          },
          objectCondition: null,
          createdBy: 'system',
          ownedBy: 'admin',
        },
      ],
    },
    {
      id: 'policy-member-public-read',
      organizationId: '*', // Applies to all organizations
      description: 'Members can read public resources within their organization.',
      rules: [
        {
          id: 'rule-member-read-public',
          ruleType: 'access',
          deontologicalDuty: 'allowed',
          predicate: ['read'],
          subjectCondition: {
            type: 'group',
            operator: 'AND',
            conditions: [
              {
                type: 'condition',
                attribute: 'orgRole',
                operator: 'is',
                value: 'org:member',
              },
            ],
          },
          objectCondition: {
            type: 'group',
            operator: 'AND',
            conditions: [
              {
                type: 'condition',
                attribute: 'visibility',
                operator: 'is',
                value: 'public',
              },
            ],
          },
          createdBy: 'system',
          ownedBy: 'admin',
        },
      ],
    },
    {
      id: 'policy-prohibit-member-delete',
      organizationId: '*', // Applies to all organizations
      description: 'Members are prohibited from deleting any resources.',
      rules: [
        {
          id: 'rule-prohibit-delete',
          ruleType: 'access',
          deontologicalDuty: 'prohibited',
          predicate: ['delete'],
          subjectCondition: {
            type: 'group',
            operator: 'AND',
            conditions: [
              {
                type: 'condition',
                attribute: 'orgRole',
                operator: 'is',
                value: 'org:member',
              },
            ],
          },
          objectCondition: null,
          createdBy: 'system',
          ownedBy: 'admin',
        },
      ],
    },
    {
      id: 'policy-manager-access',
      organizationId: '*', // Applies to all organizations
      description: "Users in 'manager' group have elevated access.",
      rules: [
        {
          id: 'rule-manager-read-write',
          ruleType: 'access',
          deontologicalDuty: 'allowed',
          predicate: ['read', 'write'],
          subjectCondition: {
            type: 'group',
            operator: 'AND',
            conditions: [
              {
                type: 'condition',
                attribute: 'groups',
                operator: 'contains',
                value: 'manager',
              },
            ],
          },
          objectCondition: null,
          createdBy: 'system',
          ownedBy: 'admin',
        },
      ],
    },
  ];
  