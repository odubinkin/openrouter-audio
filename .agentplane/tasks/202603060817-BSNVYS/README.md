---
id: "202603060817-BSNVYS"
title: "Add --format usage details to SKILL.md"
status: "DOING"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T08:18:06.211Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved docs-only update for --format guidance in SKILL.md."
verification:
  state: "ok"
  updated_at: "2026-03-06T08:18:37.049Z"
  updated_by: "CODER"
  note: "Verified SKILL.md now documents --format usage for both transcribe and generate, including defaults and supported formats aligned with source implementation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: updating SKILL.md to add explicit --format usage details for transcribe and generate while preserving user's shortened style."
events:
  -
    type: "status"
    at: "2026-03-06T08:18:10.144Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: updating SKILL.md to add explicit --format usage details for transcribe and generate while preserving user's shortened style."
  -
    type: "verify"
    at: "2026-03-06T08:18:37.049Z"
    author: "CODER"
    state: "ok"
    note: "Verified SKILL.md now documents --format usage for both transcribe and generate, including defaults and supported formats aligned with source implementation."
doc_version: 2
doc_updated_at: "2026-03-06T08:18:37.050Z"
doc_updated_by: "CODER"
description: "Add concise documentation in SKILL.md describing how --format works for transcribe and generate."
id_source: "generated"
---
## Summary

Add concise --format usage details to SKILL.md for both transcribe and generate commands.

## Scope

In scope: SKILL.md only. Out of scope: source code and README.

## Plan

1) Add concise section in SKILL.md describing --format behavior for transcribe and generate. 2) Include supported values and defaults matching src/openrouter-audio.ts. 3) Verify via grep and final file check. 4) Commit and finish task.

## Risks

Low risk docs-only change; ensure statements match current CLI behavior in src/openrouter-audio.ts.

## Verify Steps

### Scope
- Primary tag: `docs`

### Checks
- `rg -n "--format|Input formats|Output formats|Generation format" SKILL.md`

### Evidence / Commands
- Provide grep output showing explicit --format guidance exists for both commands.

### Pass criteria
- SKILL.md documents `--format` for `transcribe` and `generate`.
- Defaults and supported formats align with `src/openrouter-audio.ts`.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T08:18:37.049Z — VERIFY — ok

By: CODER

Note: Verified SKILL.md now documents --format usage for both transcribe and generate, including defaults and supported formats aligned with source implementation.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T08:18:33.594Z, excerpt_hash=sha256:ef435ce3fc1625ae4c8bdbe24f9c89491d0d727658447c88a57d80092752a6dd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Context

User requested adding --format documentation after manually shortening SKILL.md.

## Notes

### Approvals / Overrides
- None.

### Decisions
- Kept SKILL.md concise and added a dedicated compact `--format` section.

### Implementation Notes
- Added `## Format Option (--format)` with behavior for both commands.
- Included defaults and supported input/output format values consistent with `src/openrouter-audio.ts`.

### Evidence / Links
- `rg -n -- "--format|Format Option|Input formats|Output formats|Generation format" SKILL.md`
