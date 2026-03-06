---
id: "202603060654-QQQNDR"
title: "Add default transcript-only prompt for generate"
result_summary: "Generate requests now include a default English instruction to return only the spoken transcript."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T06:54:42.860Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved transcript-only default prompt addition."
verification:
  state: "ok"
  updated_at: "2026-03-06T06:55:18.099Z"
  updated_by: "TESTER"
  note: "Verified: build succeeds; generate flow includes a default English system instruction constraining transcript output to spoken text only; dry-run remains functional and docs are aligned."
commit:
  hash: "58bd0f3fc0d78cf199520436498104baad3019a7"
  message: "✅ QQQNDR cli: add transcript-only generate prompt"
comments:
  -
    author: "CODER"
    body: "Start: Adding a default English instruction so generate returns only the spoken transcript without extra commentary."
  -
    author: "CODER"
    body: "Verified: rebuilt CLI succeeds; generate payload now injects a transcript-only system instruction and dry-run behavior is unchanged."
events:
  -
    type: "status"
    at: "2026-03-06T06:54:43.026Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding a default English instruction so generate returns only the spoken transcript without extra commentary."
  -
    type: "verify"
    at: "2026-03-06T06:55:18.099Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build succeeds; generate flow includes a default English system instruction constraining transcript output to spoken text only; dry-run remains functional and docs are aligned."
  -
    type: "status"
    at: "2026-03-06T06:55:20.425Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: rebuilt CLI succeeds; generate payload now injects a transcript-only system instruction and dry-run behavior is unchanged."
doc_version: 2
doc_updated_at: "2026-03-06T06:55:20.425Z"
doc_updated_by: "CODER"
description: "Add an English default instruction for audio generation so the model returns only the spoken transcript and no extra commentary."
id_source: "generated"
---
## Summary


## Scope

In scope: generate request prompting in src/openrouter-audio.ts and any documentation note needed for transcript behavior. Out of scope: CLI surface changes.

## Plan

1) Add a narrow English default instruction to generate requests so transcript output should mirror only the spoken text. 2) Update docs if transcript behavior is described. 3) Rebuild and smoke-check the CLI. 4) Commit and finish task.

## Risks


## Verify Steps

1) npm run build succeeds. 2) generate code includes a default instruction constraining transcript output to spoken text only. 3) CLI help/dry-run still work after rebuild.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T06:55:18.099Z — VERIFY — ok

By: TESTER

Note: Verified: build succeeds; generate flow includes a default English system instruction constraining transcript output to spoken text only; dry-run remains functional and docs are aligned.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T06:55:17.822Z, excerpt_hash=sha256:4ada3316ffd512f4fcc69080b396f480bc2df58378d23b49b39e3cbe7932987c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to remove the default transcript-only instruction.

## Notes

### Approvals / Overrides
- No overrides needed.

### Decisions
- Added a narrow English system instruction for generate requests.
- The instruction is limited to transcript behavior and does not change the CLI surface.

### Implementation Notes
- Added DEFAULT_GENERATE_TRANSCRIPT_PROMPT in src/openrouter-audio.ts.
- Generate requests now include a system message before the user text.
- Updated README.md and SKILL.md to document transcript-only behavior.

### Evidence / Links
- Verified rebuild succeeds.
- Verified dry-run generate still works.
- Verified source contains the default transcript-only system instruction.
