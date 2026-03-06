---
id: "202603060708-6MZBNP"
title: "Separate generate and transcribe prompts by method"
result_summary: "Generate and transcribe prompt constants are now wired to their respective methods only."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T07:08:31.348Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved method-specific prompt wiring."
verification:
  state: "ok"
  updated_at: "2026-03-06T07:08:56.687Z"
  updated_by: "TESTER"
  note: "Verified: build succeeds; DEFAULT_TRANSCRIPT_PROMPT is used only in transcribe, DEFAULT_GENERATE_PROMPT only in generate, and generate dry-run remains functional."
commit:
  hash: "8914fe73fdcfe967dde88d08ed8b0d8ff5abe0c1"
  message: "✅ 6MZBNP cli: separate method prompt wiring"
comments:
  -
    author: "CODER"
    body: "Start: Wiring transcript and generate prompts to their respective methods only."
  -
    author: "CODER"
    body: "Verified: rebuilt CLI succeeds; transcribe uses DEFAULT_TRANSCRIPT_PROMPT and generate uses only DEFAULT_GENERATE_PROMPT."
events:
  -
    type: "status"
    at: "2026-03-06T07:08:31.523Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Wiring transcript and generate prompts to their respective methods only."
  -
    type: "verify"
    at: "2026-03-06T07:08:56.687Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build succeeds; DEFAULT_TRANSCRIPT_PROMPT is used only in transcribe, DEFAULT_GENERATE_PROMPT only in generate, and generate dry-run remains functional."
  -
    type: "status"
    at: "2026-03-06T07:08:59.037Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: rebuilt CLI succeeds; transcribe uses DEFAULT_TRANSCRIPT_PROMPT and generate uses only DEFAULT_GENERATE_PROMPT."
doc_version: 2
doc_updated_at: "2026-03-06T07:08:59.037Z"
doc_updated_by: "CODER"
description: "Use DEFAULT_GENERATE_PROMPT only in generate requests and DEFAULT_TRANSCRIPT_PROMPT only as the default transcription prompt in transcribe requests."
id_source: "generated"
---
## Summary

Assign the generate and transcript prompt constants to their corresponding methods instead of using transcript prompting inside generate.

## Scope


## Plan

1) Route DEFAULT_TRANSCRIPT_PROMPT to transcribe as the default prompt. 2) Route DEFAULT_GENERATE_PROMPT only to generate. 3) Remove transcript prompt usage from generate. 4) Rebuild and verify the new mapping in source and CLI smoke checks. 5) Commit and finish task.

## Risks

Low risk refactor. Main concern is changing provider behavior unexpectedly; mitigate by making the method-to-prompt mapping explicit and verifying the built CLI still works.

## Verify Steps

1) npm run build succeeds. 2) src/openrouter-audio.ts uses DEFAULT_TRANSCRIPT_PROMPT in transcribe and DEFAULT_GENERATE_PROMPT in generate. 3) generate no longer injects DEFAULT_TRANSCRIPT_PROMPT. 4) CLI dry-run still works.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T07:08:56.687Z — VERIFY — ok

By: TESTER

Note: Verified: build succeeds; DEFAULT_TRANSCRIPT_PROMPT is used only in transcribe, DEFAULT_GENERATE_PROMPT only in generate, and generate dry-run remains functional.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T07:08:56.403Z, excerpt_hash=sha256:44ec94f1d9d7fb46a5dc76acfc20c566bcda18b1ba64a990b0d8d53136a7ad16

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore the prior prompt wiring.

## Notes

### Approvals / Overrides
- No overrides needed.

### Decisions
- DEFAULT_TRANSCRIPT_PROMPT is now the default prompt only for transcribe.
- DEFAULT_GENERATE_PROMPT is now the only prompt injected into generate.

### Implementation Notes
- Updated src/openrouter-audio.ts prompt text and method wiring.
- No public CLI changes were required.

### Evidence / Links
- Verified rebuild succeeds.
- Verified transcribe uses prompt ?? DEFAULT_TRANSCRIPT_PROMPT.
- Verified generate uses only DEFAULT_GENERATE_PROMPT as a system message.
