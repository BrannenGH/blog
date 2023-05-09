import { RawArticle } from "@/models";

export const articles: RawArticle[] = [
  {
    title: "How to filter test cases when executing by Azure DevOps test plan",
    author: "Brannen Hall",
    date: "2023-04-18",
    content: `
When using the \`testPlan\` method to select VSTest tests for execution in Azure DevOps (ADO) YAML pipelines, you cannot directly use the \`testFiltercriteria\` option on the VSTest@2 task to filter test cases — it only works when using the \`testAssemblies\` test selector.
Instead, you can add it to the test run parameters using \`overrideTestRunParameters\` and the \`TestCaseFilter\` run parameter. Please see the example below, where \`your_filter\` is the test filter criteria.

\`\`\`yaml
- task: VSTest@2
  displayName: 'Run VSTest with testPlan and filtering'
  inputs:
    testSelector: testPlan
    testPlan: 'your_test_plan_id'
    testSuites: 'your_test_suite_id1,your_test_suite_id2'
    testConfiguration: 'your_test_configuration_id'
    overrideTestRunParameters: >
      -TestCaseFilter "your_filter"
    platform: '$(buildPlatform)'
    configuration: '$(buildConfiguration)'
\`\`\``,
    summary:
      "When using the `testPlan` method to select VSTest tests for execution in Azure DevOps (ADO) YAML pipelines",
    tags: ["Code Snippet"],
  },
];
