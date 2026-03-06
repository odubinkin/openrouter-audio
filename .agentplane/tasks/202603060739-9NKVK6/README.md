---
id: "202603060739-9NKVK6"
title: "Add --prompt option to generate"
result_summary: "Generate now supports --prompt to override DEFAULT_GENERATE_PROMPT."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T07:39:52.385Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved generate prompt option addition."
verification:
  state: "ok"
  updated_at: "2026-03-06T07:40:52.420Z"
  updated_by: "TESTER"
  note: "Verified: build succeeds; generate help includes --prompt; source uses prompt override fallback to DEFAULT_GENERATE_PROMPT; dry-run works."
commit:
  hash: "869f619351cf9a1fdeb2d223396421e79c911ec1"
  message: "✅ 9NKVK6 cli: add --prompt for generate"
comments:
  -
    author: "CODER"
    body: "Start: Adding --prompt support to generate and wiring it to override DEFAULT_GENERATE_PROMPT."
  -
    author: "CODER"
    body: "Verified: rebuilt CLI exposes --prompt for generate and behavior remains stable."
events:
  -
    type: "status"
    at: "2026-03-06T07:39:52.549Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding --prompt support to generate and wiring it to override DEFAULT_GENERATE_PROMPT."
  -
    type: "verify"
    at: "2026-03-06T07:40:52.420Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build succeeds; generate help includes --prompt; source uses prompt override fallback to DEFAULT_GENERATE_PROMPT; dry-run works."
  -
    type: "status"
    at: "2026-03-06T07:40:52.732Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: rebuilt CLI exposes --prompt for generate and behavior remains stable."
doc_version: 2
doc_updated_at: "2026-03-06T07:40:52.732Z"
doc_updated_by: "CODER"
description: "Allow generate command to accept --prompt and use it instead of DEFAULT_GENERATE_PROMPT when provided."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add --prompt option to generate command in CLI usage and argument parsing. 2) Pass generate prompt override into generateAudio and use it instead of DEFAULT_GENERATE_PROMPT when provided. 3) Update README.md and SKILL.md usage examples. 4) Rebuild and smoke-check help plus dry-run. 5) Commit with task artifacts and finish task.

## Risks


## Verify Steps

1) npm run build succeeds. 2) --help shows --prompt on generate syntax. 3) source wiring uses prompt override fallback to DEFAULT_GENERATE_PROMPT. 4) generate --dry-run still works.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T07:40:52.420Z — VERIFY — ok

By: TESTER

Note: Verified: build succeeds; generate help includes --prompt; source uses prompt override fallback to DEFAULT_GENERATE_PROMPT; dry-run works.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T07:40:52.158Z, excerpt_hash=sha256:644e4b1ec78fccae07ac3e4f58dc40f641ab72bc32f836c6ae341d5f718b6cbb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Notes

### Approvals / Overrides
- No overrides needed.

### Decisions
- Added --prompt option to generate and wired it as an override for DEFAULT_GENERATE_PROMPT.
- Kept the rest of generate behavior unchanged.

### Implementation Notes
- Updated src/openrouter-audio.ts usage, parsing, and generate payload prompt selection.
- Updated README.md and SKILL.md usage examples and behavior notes.
- Included current task artifact in the same commit.

### Evidence / Links
- Verified build succeeds.
- Verified help lists --prompt for generate.
- Verified generate --dry-run remains functional.
