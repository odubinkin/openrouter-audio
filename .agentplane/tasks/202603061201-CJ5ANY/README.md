---
id: "202603061201-CJ5ANY"
title: "Rename wrapper script to openrouter.sh and sync docs"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T12:02:25.369Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: rename launcher and sync docs/build artifacts."
verification:
  state: "ok"
  updated_at: "2026-03-06T12:03:48.301Z"
  updated_by: "TESTER"
  note: "Build now generates build/openrouter-audio/openrouter.sh, CLI usage/help shows openrouter.sh, docs and SKILL paths were updated, and npm test passes (9/9)."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: rename generated launcher to openrouter.sh and synchronize usage/help/docs references."
events:
  -
    type: "status"
    at: "2026-03-06T12:02:28.442Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rename generated launcher to openrouter.sh and synchronize usage/help/docs references."
  -
    type: "verify"
    at: "2026-03-06T12:03:48.301Z"
    author: "TESTER"
    state: "ok"
    note: "Build now generates build/openrouter-audio/openrouter.sh, CLI usage/help shows openrouter.sh, docs and SKILL paths were updated, and npm test passes (9/9)."
doc_version: 2
doc_updated_at: "2026-03-06T12:03:48.307Z"
doc_updated_by: "TESTER"
description: "Rename generated bash wrapper from openrouter-audio to openrouter.sh for ClawHub requirement, and update README/SKILL/help references accordingly."
id_source: "generated"
---
## Summary


## Scope

In scope: scripts/build.mjs, src/openrouter-audio.ts usage text, README.md, SKILL.md, build/openrouter-audio artifacts, and tests impacted by help text. Out of scope: API behavior and model defaults.

## Plan

1) Rename generated shell wrapper to openrouter.sh in build script output. 2) Update CLI help usage lines and all documentation command paths. 3) Rebuild artifacts and update tests tied to help text. 4) Verify references and test results, then close task.

## Risks

Risk: mismatch between source docs and generated build docs/artifacts. Mitigation: rebuild after edits and verify references via ripgrep plus tests.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T12:03:48.301Z — VERIFY — ok

By: TESTER

Note: Build now generates build/openrouter-audio/openrouter.sh, CLI usage/help shows openrouter.sh, docs and SKILL paths were updated, and npm test passes (9/9).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T12:02:28.442Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Context

ClawHub skill requirements mandate a .sh launcher name. Current build outputs openrouter-audio wrapper and docs reference that path.
