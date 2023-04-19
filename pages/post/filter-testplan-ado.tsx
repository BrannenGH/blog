/**
 * A first blog post for the new blog format
 * Will eventually come from a CMS.
 */

import Highlight, { defaultProps } from "prism-react-renderer";
import { Fragment } from "react";

const exampleCode = `
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
`;

const body =
  "When using the `testPlan` method to select VSTest tests for execution in Azure DevOps (ADO) YAML pipelines, you cannot directly use the `testFiltercriteria` option on the VSTest@2 task to filter test cases — it only works when using the `testAssemblies` test selector." +
  "Instead, you can add it to the test run parameters using `overrideTestRunParameters` and the `TestCaseFilter` run parameter. Please see the example below, where `your_filter` is the test filter criteria. ";

export default function FilterTestPlanAdo() {
  return (
    <Fragment>
      <h1>How to filter test cases when executing by Azure DevOps test plan</h1>
      <p>{body}</p>
      <Highlight {...defaultProps} code={exampleCode} language="yaml">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span>{i + 1}</span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Fragment>
  );
}
