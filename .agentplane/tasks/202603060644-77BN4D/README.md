---
id: "202603060644-77BN4D"
title: "Make audio generate streaming implicit"
result_summary: "Generate now always uses stream=true and the CLI/docs no longer expose a stream option."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T06:45:09.910Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved implicit streaming change."
verification:
  state: "ok"
  updated_at: "2026-03-06T06:46:15.165Z"
  updated_by: "TESTER"
  note: "Verified: build succeeds; help no longer documents --stream; generate dry-run returns JSON without stream and still reports tmp path plus format mp3; docs are aligned."
commit:
  hash: "d0a825bff45fdc022792f81451559d35b7a0ed8d"
  message: "✅ 77BN4D cli: make audio streaming implicit"
comments:
  -
    author: "CODER"
    body: "Start: Removing stream selection from the CLI and forcing stream=true for audio generation."
  -
    author: "CODER"
    body: "Verified: rebuilt CLI help no longer contains --stream; generation dry-run works and docs reflect implicit streaming."
events:
  -
    type: "status"
    at: "2026-03-06T06:45:10.071Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Removing stream selection from the CLI and forcing stream=true for audio generation."
  -
    type: "verify"
    at: "2026-03-06T06:46:15.165Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build succeeds; help no longer documents --stream; generate dry-run returns JSON without stream and still reports tmp path plus format mp3; docs are aligned."
  -
    type: "status"
    at: "2026-03-06T06:46:23.033Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: rebuilt CLI help no longer contains --stream; generation dry-run works and docs reflect implicit streaming."
doc_version: 2
doc_updated_at: "2026-03-06T06:46:23.033Z"
doc_updated_by: "CODER"
description: "Set generate requests to stream=true by default, remove --stream from CLI/help/docs, and update defaults documentation accordingly."
id_source: "generated"
---
## Summary

Make audio generation streaming implicit and remove stream selection from the public CLI surface.

## Scope

In scope: generate request defaults in src/openrouter-audio.ts, CLI help, README.md, and SKILL.md. Out of scope: transcribe behavior and model catalog changes.

## Plan

1) Remove --stream from generate CLI usage/help and force stream=true in generation requests. 2) Update README.md and SKILL.md to describe streaming as implicit behavior. 3) Rebuild the skill and verify help plus dry-run output. 4) Commit and finish task.

## Risks

Risk: docs/help drift if stream is removed from one place but not others. Mitigation: update code help plus both documentation files and rebuild the CLI artifact.

## Verify Steps

1) npm run build succeeds. 2) build/openrouter-audio/openrouter-audio --help no longer mentions --stream. 3) generate dry-run succeeds and reports output path(s) without requiring stream input. 4) README.md and SKILL.md no longer instruct users to pass --stream.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T06:46:15.165Z — VERIFY — ok

By: TESTER

Note: Verified: build succeeds; help no longer documents --stream; generate dry-run returns JSON without stream and still reports tmp path plus format mp3; docs are aligned.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T06:46:14.908Z, excerpt_hash=sha256:e37b499d2a1103c5b6747c2da66052989d2e824ae0d0464a42cb48c17b99eaae

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Notes

### Approvals / Overrides
- No overrides needed.

### Decisions
- Removed stream selection from the public CLI because OpenRouter audio output requires streaming.
- Generation now always sends stream=true internally.
- Removed stream from documented JSON output because it is no longer a configurable/user-meaningful field.

### Implementation Notes
- Updated src/openrouter-audio.ts usage/help and generate request flow.
- Updated README.md and SKILL.md examples, defaults, and troubleshooting notes.

### Evidence / Links
- Verified rebuilt CLI help no longer mentions --stream.
- Verified generate --dry-run still returns tmp path(s) and format without a stream field.
