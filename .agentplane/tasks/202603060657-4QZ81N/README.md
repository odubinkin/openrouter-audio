---
id: "202603060657-4QZ81N"
title: "Split generate prompt constants"
result_summary: "Split the generate prompt into separate generation and transcript constants."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T06:57:37.869Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved prompt constant split refactor."
verification:
  state: "ok"
  updated_at: "2026-03-06T06:58:07.494Z"
  updated_by: "TESTER"
  note: "Verified: build succeeds; source defines DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT; generate payload uses both system prompts; dry-run remains functional."
commit:
  hash: "28df123a166c739576d4aaea6b118014e3a82ab9"
  message: "✅ 4QZ81N cli: split generate prompt constants"
comments:
  -
    author: "CODER"
    body: "Start: Splitting the combined generate prompt into separate generate and transcript prompt constants."
  -
    author: "CODER"
    body: "Verified: rebuilt CLI succeeds; generate payload now composes DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT as separate system messages."
events:
  -
    type: "status"
    at: "2026-03-06T06:57:38.041Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting the combined generate prompt into separate generate and transcript prompt constants."
  -
    type: "verify"
    at: "2026-03-06T06:58:07.494Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build succeeds; source defines DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT; generate payload uses both system prompts; dry-run remains functional."
  -
    type: "status"
    at: "2026-03-06T06:58:09.696Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: rebuilt CLI succeeds; generate payload now composes DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT as separate system messages."
doc_version: 2
doc_updated_at: "2026-03-06T06:58:09.696Z"
doc_updated_by: "CODER"
description: "Refactor the generate prompting into separate DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT constants instead of a single combined constant."
id_source: "generated"
---
## Summary


## Scope

In scope: src/openrouter-audio.ts prompt constants and payload composition only. Out of scope: CLI behavior or docs changes unless needed by the refactor.

## Plan

1) Replace the combined generate prompt constant with DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT. 2) Keep payload semantics equivalent by composing both instructions. 3) Rebuild the CLI and verify the new constants are wired in. 4) Commit and finish task.

## Risks


## Verify Steps

1) npm run build succeeds. 2) src/openrouter-audio.ts defines DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT. 3) generate payload uses both prompts after the refactor. 4) CLI dry-run still works.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T06:58:07.494Z — VERIFY — ok

By: TESTER

Note: Verified: build succeeds; source defines DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT; generate payload uses both system prompts; dry-run remains functional.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T06:58:07.231Z, excerpt_hash=sha256:a584fc42f527f2cba1200c7d8f3a721a13910b08397a86fb6f73588e9d9a197d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Notes

### Approvals / Overrides
- No overrides needed.

### Decisions
- Split the previous combined prompt into DEFAULT_GENERATE_PROMPT and DEFAULT_TRANSCRIPT_PROMPT.
- Kept effective behavior equivalent by sending both instructions as separate system messages.

### Implementation Notes
- Refactored src/openrouter-audio.ts prompt constants and generate payload composition.
- No CLI or docs wording changes were required for this refactor.

### Evidence / Links
- Verified rebuild succeeds.
- Verified both new constants exist in source and are used in the generate payload.
- Verified generate --dry-run still works.
