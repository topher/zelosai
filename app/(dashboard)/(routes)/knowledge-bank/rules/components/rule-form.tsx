'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { SetStateAction, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormControl } from '@/components/ui/form';
import { PlusIcon, TrashIcon, UserIcon, FileTextIcon, ShieldCheckIcon, BriefcaseIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const accessRightsSchema = z.object({
  rules: z.array(z.object({
    id: z.string(),
    ruleType: z.string(),
    duty: z.string(),
    action: z.string(),
    conditions: z.array(z.object({
      subjectCondition: z.string(),
      operator: z.string(),
      value: z.string(),
    })),
    objectCondition: z.object({
      subjectCondition: z.string(),
      operator: z.string(),
      value: z.string(),
    }),
  })),
});

type AccessRightsFormType = z.infer<typeof accessRightsSchema>;

interface OntologyNode {
  validPredicates: Record<string, string[]> | string[]; // Allow for both string[] and Record<string, string[]>
  validActions: string[];
  validValues: Record<string, string[]>;
}

const ontologyGraph: Record<string, Record<string, OntologyNode>> = {
    // Example for GDPR framework
    GDPR: {
      Agent: {
        validPredicates: ['is', 'is not', 'is going to'],
        validActions: ["Store", "Infer", "Communicate", "Provide", "Derive", "Transmit", "Observe"],
        validValues: {
          'is': ['Data Subject (DS)', 'Data Controller (DC)', 'Data Processor (DP)', 'Recipient (Rp)', 'Supervisory Authority (SA)', 'Data Protection Officer (DPO)[2]'],
          'is going to': ['Providing a service', 'Marketing', 'Analytics', 'Legal compliance', 'Security'],
        },
      },
      Document: {
        validPredicates: ['contains', "doesn't contain"],
        validActions: ["Store", "Infer", "Communicate", "Provide", "Derive", "Transmit", "Observe"],
        validValues: {
          'contains': ['Names', 'Social security numbers', 'Addresses (more specific than state-level)', 'Dates (more specific than year)', 'Telephone numbers', 'Email addresses'],
          "doesn't contain": ['Health plan beneficiary numbers', 'Account and payment numbers', 'Certificates or license numbers', 'Vehicle identifiers and serial numbers'],
        },
      },
    },
    // Example for MPEG-21 framework
    'MPEG-21': {
      Agent: {
        validPredicates: ['is', 'is not'],
        validActions: ["Adapt", "Install", "Uninstall", "Delete", "Modify", "Diminish", "Move", "Embed", "Play", "Enhance", "Print", "Enlarge", "Reduce", "Execute"],
        validValues: {
          'is': ['Creator / Adaptor', 'Instantiator', 'Producer', 'Distributor', 'EndUser'],
        },
      },
      Document: {
        validPredicates: ['contains', "doesn't contain"],
        validActions: ["Adapt", "Install", "Uninstall", "Delete", "Modify", "Diminish", "Move", "Embed", "Play", "Enhance", "Print", "Enlarge", "Reduce", "Execute"],
        validValues: {
          'contains': ['Names', 'Social security numbers', 'Addresses (more specific than state-level)', 'Dates (more specific than year)', 'Telephone numbers', 'Email addresses'],
          "doesn't contain": ['Medical records', 'Health plan beneficiary numbers', 'Account and payment numbers', 'Certificates or license numbers'],
        },
      },
    },
  };

const AccessRightsForm = () => {
  const form = useForm<AccessRightsFormType>({
    resolver: zodResolver(accessRightsSchema),
  });

  const { fields: rulesFields, append: appendRule } = useFieldArray({
    control: form.control,
    name: 'rules',
  });

  const [subjectType, setSubjectType] = useState<string | null>(null);
  const [validPredicates, setValidPredicates] = useState<string[]>([]);
  const [validValues, setValidValues] = useState<string[]>([]);
  const [validActions, setValidActions] = useState<string[]>([]);
  const [frameworkType, setFrameworkType] = useState<string | null>(null);

  const handleFrameworkChange = (framework: string) => {
    setFrameworkType(framework);
    setSubjectType(null);
    setValidPredicates([]);
    setValidValues([]);
    setValidActions([]);
  };

  const handleSubjectChange = (subject: string, ruleIndex: number) => {
    setSubjectType(subject);
  
    if (frameworkType && subject) {
      let predicates = ontologyGraph[frameworkType]?.[subject]?.validPredicates;
      console.log('ontologyGraph woo', ontologyGraph[frameworkType], subject);
  
      if (Array.isArray(predicates)) {
        setValidPredicates(predicates);
      } else if (predicates && typeof predicates === 'object') {
        // Flatten the Record<string, string[]> to string[]
        const flattenedPredicates = Object.keys(predicates);
        setValidPredicates(flattenedPredicates);
      } else {
        setValidPredicates([]); // Handle the case where no valid predicates are found
      }
  
      const actions = ontologyGraph[frameworkType]?.[subject]?.validActions || [];
      setValidActions(actions);
      console.log('Valid predicates:', predicates);
      console.log('Valid actions:', actions);
    }
  };
  
  const handleOperatorChange = (operator: string, ruleIndex: number, subjectCategory: string) => {
    if (frameworkType && subjectCategory) {
        console.log('Framework Type:', frameworkType);
        console.log('Subject Category:', subjectCategory);
        console.log('Operator:', operator);
        
        const validValuesForOperator = ontologyGraph[frameworkType]?.[subjectCategory]?.validValues?.[operator];
        
        console.log('Valid Values for Operator:', validValuesForOperator);

        if (Array.isArray(validValuesForOperator)) {
            setValidValues(validValuesForOperator);
        } else {
            setValidValues([]); // Handle the case where validValuesForOperator is not an array
        }
    }
};


  
  
  const onSubmit = (data: AccessRightsFormType) => {
    console.log('Submitted access rights:', data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {rulesFields.map((rule, ruleIndex) => (
          <div key={rule.id} className="border rounded-lg p-4 space-y-4">
            {/* Rule Type with Icon */}
            <FormItem>
              <div className="flex items-center space-x-2">
                <BriefcaseIcon className="w-5 h-5 text-gray-600" />
                <FormControl>
                  <Controller
                    name={`rules.${ruleIndex}.ruleType`}
                    control={form.control}
                    render={({ field }) => (
                      <select
                        className="w-full appearance-none border border-gray-300 rounded p-2"
                        {...field}
                        onChange={(e) => {
                          handleFrameworkChange(e.target.value);
                          field.onChange(e);
                        }}
                      >
                        <option value="">Framework Type...</option>
                        <option value="GDPR">GDPR</option>
                        <option value="MPEG-21">MPEG-21</option>
                      </select>
                    )}
                  />
                </FormControl>
              </div>
            </FormItem>

            {/* Subject Condition with Icon */}
            {rule.conditions.map((condition, conditionIndex) => (
              <div key={conditionIndex} className="flex items-center space-x-4">
                <FormItem className="flex-grow">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-5 h-5 text-gray-600" />
                    <FormControl>
                      <Controller
                        name={`rules.${ruleIndex}.conditions.${conditionIndex}.subjectCondition`}
                        control={form.control}
                        render={({ field }) => (
                          <select
                            className="w-full appearance-none border border-gray-300 rounded p-2"
                            {...field}
                            onChange={(e) => {
                              handleSubjectChange(e.target.value, ruleIndex);
                              field.onChange(e);
                            }}
                          >
                            <option value="">Select Subject...</option>
                            {['Agent','User', 'Group', 'AI Agent'].map((object) => (
                            <option key={object} value={object}>
                              {object}
                            </option>
                          ))}
                          </select>
                        )}
                      />
                    </FormControl>
                  </div>
                </FormItem>

                {/* Operator */}
                <FormItem className="flex-grow">
                  <FormControl>
                    <Controller
                      name={`rules.${ruleIndex}.conditions.${conditionIndex}.operator`}
                      control={form.control}
                      render={({ field }) => (
                        <select
                          className="w-full appearance-none border border-gray-300 rounded p-2"
                          {...field}
                          onChange={(e) => {
                            handleOperatorChange(e.target.value, ruleIndex, 'Agent');
                            field.onChange(e);
                          }}
                        >
                          <option value="">Operator...</option>
                          {validPredicates.map((predicate) => (
                            <option key={predicate} value={predicate}>
                              {predicate}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </FormControl>
                </FormItem>

                {/* Value */}
                <FormItem className="flex-grow">
                  <FormControl>
                    <Controller
                      name={`rules.${ruleIndex}.conditions.${conditionIndex}.value`}
                      control={form.control}
                      render={({ field }) => (
                        <select
                          className="w-full appearance-none border border-gray-300 rounded p-2"
                          {...field}
                        >
                          <option value="">Value...</option>
                          {validValues.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </FormControl>
                </FormItem>
              </div>
            ))}

            {/* Predicate (Duty and Action) with Icon */}
            <div className="flex items-center space-x-4">
              <FormItem className="flex-grow">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
                  <FormControl>
                    <Controller
                      name={`rules.${ruleIndex}.duty`}
                      control={form.control}
                      render={({ field }) => (
                        <select
                          className="w-full appearance-none border border-gray-300 rounded p-2"
                          {...field}
                        >
                          <option value="">Duty...</option>
                          <option value="obligated">obligated</option>
                          <option value="allowed">allowed</option>
                          <option value="prohibited">prohibited</option>
                        </select>
                      )}
                    />
                  </FormControl>
                </div>
              </FormItem>

              {/* Action */}
              <FormItem className="flex-grow">
                <FormControl>
                  <Controller
                    name={`rules.${ruleIndex}.action`}
                    control={form.control}
                    render={({ field }) => (
                      <select
                        className="w-full appearance-none border border-gray-300 rounded p-2"
                        {...field}
                      >
                        <option value="">Action...</option>
                        {validActions.map((action) => (
                          <option key={action} value={action}>
                            {action}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </FormControl>
              </FormItem>
            </div>

            {/* Object Condition with Icon */}
            <div className="flex items-center space-x-4">
              <FormItem className="flex-grow">
                <div className="flex items-center space-x-2">
                  <FileTextIcon className="w-5 h-5 text-gray-600" />
                  <FormControl>
                    <Controller
                      name={`rules.${ruleIndex}.objectCondition.subjectCondition`}
                      control={form.control}
                      render={({ field }) => (
                        <select
                          className="w-full appearance-none border border-gray-300 rounded p-2"
                          {...field}
                          onChange={(e) => {
                            handleSubjectChange(e.target.value, ruleIndex);
                            field.onChange(e);
                          }}
                        >
                          <option value="">Select Object...</option>
                          {['Object','Document', 'Photos', 'Audio', 'Text'].map((object) => (
                            <option key={object} value={object}>
                              {object}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                  </FormControl>
                </div>
              </FormItem>

              {/* Operator */}
              <FormItem className="flex-grow">
                <FormControl>
                  <Controller
                    name={`rules.${ruleIndex}.objectCondition.operator`}
                    control={form.control}
                    render={({ field }) => (
                      <select
                        className="w-full appearance-none border border-gray-300 rounded p-2"
                        {...field}
                        onChange={(e) => {
                          handleOperatorChange(e.target.value, ruleIndex, 'Document');
                          field.onChange(e);
                        }}
                      >
                        <option value="">Operator...</option>
                        {validPredicates.map((predicate) => (
                          <option key={predicate} value={predicate}>
                            {predicate}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </FormControl>
              </FormItem>

              {/* Value */}
              <FormItem className="flex-grow">
                <FormControl>
                  <Controller
                    name={`rules.${ruleIndex}.objectCondition.value`}
                    control={form.control}
                    render={({ field }) => (
                      <select
                        className="w-full appearance-none border border-gray-300 rounded p-2"
                        {...field}
                      >
                        <option value="">Value...</option>
                        {validValues.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </FormControl>
              </FormItem>
            </div>

            {/* Add Statement Button */}
            <Button
              variant="secondary"
              type="button"
              onClick={() =>
                form.setValue(`rules.${ruleIndex}.conditions`, [
                  ...rule.conditions,
                  { subjectCondition: '', operator: '', value: '' },
                ])
              }
              className="flex items-center space-x-2 text-blue-600"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Statement</span>
            </Button>
          </div>
        ))}

        {/* Add Rule Button */}
        <Button
          variant="secondary"
          type="button"
          onClick={() =>
            appendRule({
              id: `rule-${rulesFields.length + 1}`,
              ruleType: '',
              duty: '',
              action: '',
              conditions: [{ subjectCondition: '', operator: '', value: '' }],
              objectCondition: { subjectCondition: '', operator: '', value: '' },
            })
          }
          className="flex items-center space-x-2 text-blue-600"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Add Rule</span>
        </Button>

        <div className="flex justify-end mt-4">
          <Button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccessRightsForm;
