// smithers-source: custom
// smithers-metadata-version: 1
// smithers-display-name: Go Review
// smithers-description: Harsh Go code review against go.dev/wiki/CodeReviewComments with structured output.
// smithers-tags: go, review, quality
/** @jsxImportSource smithers-orchestrator */
import { createSmithers } from "smithers-orchestrator";
import { z } from "zod/v4";
import { agents } from "../agents";
import GoReviewPrompt from "../prompts/go-review.mdx";

const reviewOutputSchema = z.looseObject({
  overallGrade: z.string().default(""),
  summary: z.string().default(""),
  criticalIssues: z.array(z.string()).default([]),
  majorIssues: z.array(z.string()).default([]),
  minorIssues: z.array(z.string()).default([]),
  testingGaps: z.array(z.string()).default([]),
  architectureConcerns: z.array(z.string()).default([]),
});

const outputSchema = z.looseObject({
  overallGrade: z.string().default(""),
  summary: z.string().default(""),
  totalIssues: z.number().default(0),
});

const inputSchema = z.object({
  prompt: z.string().default("Review the Go code in this codebase against https://go.dev/wiki/CodeReviewComments"),
});

const { Workflow, Task, Sequence, smithers, outputs } = createSmithers({
  input: inputSchema,
  review: reviewOutputSchema,
  output: outputSchema,
});

export default smithers((ctx) => {
  const prompt = ctx.input.prompt;
  const review = ctx.outputs.review?.at(-1);
  const issues = [
    ...(review?.criticalIssues ?? []),
    ...(review?.majorIssues ?? []),
    ...(review?.minorIssues ?? []),
    ...(review?.testingGaps ?? []),
    ...(review?.architectureConcerns ?? []),
  ];

  return (
    <Workflow name="go-review">
      <Sequence>
        <Task
          id="review"
          output={reviewOutputSchema}
          agent={agents.reviewer}
          timeoutMs={1_800_000}
          heartbeatTimeoutMs={600_000}
        >
          <GoReviewPrompt prompt={prompt} />
        </Task>
        <Task id="output" output={outputs.output}>
          {() => ({
            overallGrade: review?.overallGrade ?? "",
            summary: review?.summary ?? "",
            totalIssues: issues.length,
          })}
        </Task>
      </Sequence>
    </Workflow>
  );
});
