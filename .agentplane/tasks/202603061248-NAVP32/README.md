---
id: "202603061248-NAVP32"
title: "Use workspace tmp directory for generated audio"
result_summary: "CLI now prefers WORKSPACE_DIR/tmp for generated audio with system tmp fallback."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T12:48:50.212Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: scoped change with explicit fallback and verification."
verification:
  state: "ok"
  updated_at: "2026-03-06T12:51:14.705Z"
  updated_by: "TESTER"
  note: "CLI build/test checks passed"
commit:
  hash: "4231a56e64a70323437d8d51b37303b46b602ba2"
  message: "✨ NAVP32 code: route default audio output to workspace tmp"
comments:
  -
    author: "CODER"
    body: "Start: implement workspace tmp resolution with safe fallback and sync docs for optional env usage plus cleanup requirement."
  -
    author: "CODER"
    body: "Verified: workspace tmp resolution implemented with fallback, docs updated, and CLI build/tests passed."
events:
  -
    type: "status"
    at: "2026-03-06T12:48:53.712Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement workspace tmp resolution with safe fallback and sync docs for optional env usage plus cleanup requirement."
  -
    type: "verify"
    at: "2026-03-06T12:51:14.705Z"
    author: "TESTER"
    state: "ok"
    note: "CLI build/test checks passed"
  -
    type: "status"
    at: "2026-03-06T12:52:03.744Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workspace tmp resolution implemented with fallback, docs updated, and CLI build/tests passed."
doc_version: 2
doc_updated_at: "2026-03-06T12:52:03.744Z"
doc_updated_by: "CODER"
description: "Resolve WORKSPACE_DIR from optional OpenClaw env/profile paths and write generated audio to WORKSPACE_DIR/tmp when available, with fallback to system tmp. Update skill docs to mention optional env behavior and mandatory post-use audio cleanup."
id_source: "generated"
---
## Summary

Update CLI temporary-file strategy so generated audio is written to a workspace-scoped tmp directory when an OpenClaw workspace exists. Keep deterministic fallback to system tmp when no workspace directory is available, and align skill instructions with optional env usage plus explicit post-use audio cleanup.

## Scope

In scope: src/openrouter-audio.ts temp path resolution and directory creation logic; build/openrouter-audio/openrouter-audio.js regeneration/update; SKILL.md updates for optional envs and cleanup note. Out of scope: API request logic, model defaults, and unrelated CLI commands.

## Plan

1. Implement workspace resolution helper with priority: OPENCLAW_STATE_DIR(existing dir) -> ~/.openclaw/workspace-(existing dir) -> ~/.openclaw/workspace(existing dir) -> system tmp fallback.\n2. Route default generated output path through WORKSPACE_DIR/tmp, creating tmp when missing.\n3. Sync built JS artifact and user-facing skill text.\n4. Run build/tests and capture results in verification.

## Risks

Risk: incorrect directory existence checks can break output path generation or create directories in unintended locations. Mitigation: check path existence before selection and only mkdir WORKSPACE_DIR/tmp for selected workspace paths; preserve system tmp fallback path.

## Verify Steps

1. Run: npm run build\nExpected: build completes and generated JS reflects workspace tmp logic.\n2. Run: npm test\nExpected: existing CLI tests pass.\n3. Inspect path-resolution code for fallback behavior.\nExpected: if no candidate workspace dir exists, output path uses system tmp; otherwise uses WORKSPACE_DIR/tmp.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T12:51:14.705Z — VERIFY — ok

By: TESTER

Note: CLI build/test checks passed

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T12:51:10.546Z, excerpt_hash=sha256:dd22c19f4c8b63d182841d1ee2dcf7e9fddf93fb4d9f7c8feb2e4dcfbd7ba82e

Details:

Ran npm run build and npm test. Result: 10 tests passed, 0 failed. Confirmed new dry-run path behavior for OPENCLAW_STATE_DIR/tmp.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

If verification fails, revert the implementation commit for this task and rerun build/tests to confirm baseline behavior is restored.

## Context

Current implementation writes generated audio to os.tmpdir() by default. New behavior must prefer an existing OpenClaw workspace directory resolved from optional environment variables, without introducing mandatory env requirements in skill docs.

## Notes

### Approvals / Overrides
No overrides requested.

### Decisions
Prefer directory existence checks over variable presence. OPENCLAW_STATE_DIR and OPENCLAW_PROFILE remain optional selectors and are not treated as required runtime setup.

### Implementation Notes
Updated default generate output path resolution in src/openrouter-audio.ts to prefer workspace tmp directories in this order: OPENCLAW_STATE_DIR -> ~/.openclaw/workspace- -> ~/.openclaw/workspace -> system tmp fallback. Added auto-create for <WORKSPACE_DIR>/tmp when workspace is selected. Updated help/docs text in SKILL.md and README.md. Added CLI test covering OPENCLAW_STATE_DIR/tmp dry-run behavior and switched test temp dirs to repo-local .tmp-cli-tests.

### Evidence / Links
Verification commands run: npm run build; npm test (10 passed).
