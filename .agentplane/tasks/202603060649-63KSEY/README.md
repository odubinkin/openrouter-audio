---
id: "202603060649-63KSEY"
title: "Change default generate format to pcm16"
result_summary: "Default generate format changed to pcm16 while keeping the format option configurable."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T06:49:26.659Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved default format change to pcm16."
verification:
  state: "ok"
  updated_at: "2026-03-06T06:50:15.866Z"
  updated_by: "TESTER"
  note: "Verified: build succeeds; help reports pcm16 as default format; generate dry-run returns tmp path with .pcm16 and format pcm16; docs are aligned."
commit:
  hash: "3b2080f25cb3a1072a4f658a2c6773affb277047"
  message: "✅ 63KSEY cli: change default generate format to pcm16"
comments:
  -
    author: "CODER"
    body: "Start: Changing default generate format to pcm16 while keeping the --format CLI option available."
  -
    author: "CODER"
    body: "Verified: rebuilt CLI help shows pcm16 as the default format and generate dry-run returns a .pcm16 tmp file path."
events:
  -
    type: "status"
    at: "2026-03-06T06:49:26.827Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Changing default generate format to pcm16 while keeping the --format CLI option available."
  -
    type: "verify"
    at: "2026-03-06T06:50:15.866Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build succeeds; help reports pcm16 as default format; generate dry-run returns tmp path with .pcm16 and format pcm16; docs are aligned."
  -
    type: "status"
    at: "2026-03-06T06:50:18.164Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: rebuilt CLI help shows pcm16 as the default format and generate dry-run returns a .pcm16 tmp file path."
doc_version: 2
doc_updated_at: "2026-03-06T06:50:18.164Z"
doc_updated_by: "CODER"
description: "Set default audio generation format to pcm16 while keeping the --format option available, and update help/docs accordingly."
id_source: "generated"
---
## Summary

Change the default generate format from mp3 to pcm16 and align CLI help plus documentation.

## Scope


## Plan

1) Change generate default format from mp3 to pcm16 in the CLI source. 2) Update help output, README.md, and SKILL.md to reflect the new default while keeping --format available. 3) Rebuild and verify help plus dry-run output. 4) Commit and finish task.

## Risks


## Verify Steps

1) npm run build succeeds. 2) build/openrouter-audio/openrouter-audio --help reports --format defaults to pcm16. 3) build/openrouter-audio/openrouter-audio generate "smoke" --dry-run returns a tmp path ending in .pcm16. 4) README.md and SKILL.md reflect pcm16 as the default generate format.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T06:50:15.866Z — VERIFY — ok

By: TESTER

Note: Verified: build succeeds; help reports pcm16 as default format; generate dry-run returns tmp path with .pcm16 and format pcm16; docs are aligned.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T06:50:15.571Z, excerpt_hash=sha256:d780476f1bcf6b8f11b49cf852fbae81f70925991edeca19577e3d737bf878ae

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore the prior default generate format.

## Notes

### Approvals / Overrides
- No overrides needed.

### Decisions
- Changed only the default generate format to pcm16.
- Kept the --format option intact for explicit overrides.

### Implementation Notes
- Updated src/openrouter-audio.ts default format fallback and help text.
- Updated README.md and SKILL.md defaults/examples.

### Evidence / Links
- Verified rebuilt CLI help now says --format defaults to pcm16.
- Verified generate --dry-run returns a tmp path ending in .pcm16.
