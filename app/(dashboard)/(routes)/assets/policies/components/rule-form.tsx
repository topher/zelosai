// app/(dashboard)/(routes)/assets/rules/components/rule-form.tsx

'use client';

import React from 'react';
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormControl } from '@/components/ui/form';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Condition, ConditionGroup, Policy, Rule } from '@/app/types';
import ConditionGroupComponent from './ConditionGroupComponent';

// Define Zod schemas using discriminated unions with explicit type annotations

const conditionSchema: z.ZodType<any> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({
      type: z.literal('condition'),
      attribute: z.string(),
      operator: z.string(),
      value: z.string(),
    }),
    z.object({
      type: z.literal('group'),
      operator: z.enum(['AND', 'OR']),
      conditions: z.array(conditionSchema),
    }),
  ])
);



const ruleSchema = z.object({
  id: z.string(),
  ruleType: z.string(),
  deontologicalDuty: z.string(),
  predicate: z.string(),
  subjectCondition: z.object({
    type: z.literal('group'),
    operator: z.enum(['AND', 'OR']),
    conditions: z.array(z.lazy(() => conditionSchema)),
  }),
  objectCondition: z.object({
    type: z.literal('group'),
    operator: z.enum(['AND', 'OR']),
    conditions: z.array(z.lazy(() => conditionSchema)),
  }),
  createdBy: z.string(),
  ownedBy: z.string(),
});

const policySchema = z.object({
  id: z.string(),
  description: z.string(),
  rules: z.array(ruleSchema),
});

const accessRightsSchema = z.object({
  policies: z.array(policySchema),
});

type AccessRightsFormType = z.infer<typeof accessRightsSchema>;

const AccessRightsForm: React.FC = () => {
  const form = useForm<AccessRightsFormType>({
    resolver: zodResolver(accessRightsSchema),
    defaultValues: {
      policies: [
        {
          id: 'policy-1',
          description: '',
          rules: [
            {
              id: 'rule-1',
              ruleType: '',
              deontologicalDuty: '',
              predicate: '',
              subjectCondition: {
                type: 'group',
                operator: 'AND',
                conditions: [],
              },
              objectCondition: {
                type: 'group',
                operator: 'AND',
                conditions: [],
              },
              createdBy: '',
              ownedBy: '',
            },
          ],
        },
      ],
    },
  });

  const {
    fields: policyFields,
    append: appendPolicy,
    remove: removePolicy,
  } = useFieldArray({
    control: form.control,
    name: 'policies',
  });

  const onSubmit: SubmitHandler<AccessRightsFormType> = (data) => {
    console.log('Submitted access rights:', data);
    // Handle form submission, e.g., send data to backend
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {policyFields.map((policy, policyIndex) => {
          const {
            fields: ruleFields,
            append: appendRule,
            remove: removeRule,
          } = useFieldArray({
            control: form.control,
            name: `policies.${policyIndex}.rules`,
          });

          return (
            <div key={policy.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <FormItem className="flex-1 mr-2">
                  <FormControl>
                    <input
                      placeholder="Policy Description"
                      {...form.register(
                        `policies.${policyIndex}.description` as const
                      )}
                      className="w-full border p-2 rounded"
                    />
                  </FormControl>
                </FormItem>
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => removePolicy(policyIndex)}
                  className="flex items-center space-x-1"
                >
                  <TrashIcon className="w-4 h-4" />
                  <span>Remove Policy</span>
                </Button>
              </div>
              {/* Rules Section */}
              <div className="space-y-4">
                {ruleFields.map((rule, ruleIndex) => (
                  <div key={rule.id} className="border p-4 rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <FormItem className="flex-1 mr-2">
                        <FormControl>
                          <input
                            placeholder="Rule Type"
                            {...form.register(
                              `policies.${policyIndex}.rules.${ruleIndex}.ruleType` as const
                            )}
                            className="w-full border p-2 rounded"
                          />
                        </FormControl>
                      </FormItem>
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={() => removeRule(ruleIndex)}
                        className="flex items-center space-x-1"
                      >
                        <TrashIcon className="w-4 h-4" />
                        <span>Remove Rule</span>
                      </Button>
                    </div>
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder="Deontological Duty"
                          {...form.register(
                            `policies.${policyIndex}.rules.${ruleIndex}.deontologicalDuty` as const
                          )}
                          className="w-full border p-2 rounded"
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder="Predicate"
                          {...form.register(
                            `policies.${policyIndex}.rules.${ruleIndex}.predicate` as const
                          )}
                          className="w-full border p-2 rounded"
                        />
                      </FormControl>
                    </FormItem>
                    {/* Subject Conditions */}
                    <div>
                      <strong>Subject Conditions:</strong>
                      <ConditionGroupComponent
                        control={form.control}
                        name={`policies.${policyIndex}.rules.${ruleIndex}.subjectCondition`}
                      />
                    </div>
                    {/* Object Conditions */}
                    <div>
                      <strong>Object Conditions:</strong>
                      <ConditionGroupComponent
                        control={form.control}
                        name={`policies.${policyIndex}.rules.${ruleIndex}.objectCondition`}
                      />
                    </div>
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder="Created By"
                          {...form.register(
                            `policies.${policyIndex}.rules.${ruleIndex}.createdBy` as const
                          )}
                          className="w-full border p-2 rounded"
                        />
                      </FormControl>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <input
                          placeholder="Owned By"
                          {...form.register(
                            `policies.${policyIndex}.rules.${ruleIndex}.ownedBy` as const
                          )}
                          className="w-full border p-2 rounded"
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                ))}
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() =>
                    appendRule({
                      id: `rule-${ruleFields.length + 1}`,
                      ruleType: '',
                      deontologicalDuty: '',
                      predicate: '',
                      subjectCondition: {
                        type: 'group',
                        operator: 'AND',
                        conditions: [],
                      },
                      objectCondition: {
                        type: 'group',
                        operator: 'AND',
                        conditions: [],
                      },
                      createdBy: '',
                      ownedBy: '',
                    })
                  }
                  className="flex items-center space-x-2 text-blue-600"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add Rule</span>
                </Button>
              </div>
            </div>
          );
        })}
        <Button
          variant="secondary"
          type="button"
          onClick={() =>
            appendPolicy({
              id: `policy-${policyFields.length + 1}`,
              description: '',
              rules: [],
            })
          }
          className="flex items-center space-x-2 text-blue-600"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Policy</span>
        </Button>
        <Button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AccessRightsForm;
