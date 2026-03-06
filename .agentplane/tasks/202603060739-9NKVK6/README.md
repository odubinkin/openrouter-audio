---
id: "202603060739-9NKVK6"
title: "Add --prompt option to generate"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Adding --prompt support to generate and wiring it to override DEFAULT_GENERATE_PROMPT."
events:
  -
    type: "status"
    at: "2026-03-06T07:39:52.549Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding --prompt support to generate and wiring it to override DEFAULT_GENERATE_PROMPT."
doc_version: 2
doc_updated_at: "2026-03-06T07:39:52.549Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan
