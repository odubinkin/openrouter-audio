---
id: "202603061107-2A3YPP"
title: "Adjust SKILL.md wording for help and prompt behavior"
status: "DOING"
priority: "low"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T11:07:53.937Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: wording-only update in SKILL.md."
verification:
  state: "ok"
  updated_at: "2026-03-06T11:08:11.939Z"
  updated_by: "TESTER"
  note: "Wording updated as requested: removed strict hardcode/always language, clarified that full utility details are in --help when needed, and added concise default vs custom prompt behavior examples (summary and answer audio)."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: adjust SKILL.md wording around help guidance and add concise default/custom prompt behavior notes."
events:
  -
    type: "status"
    at: "2026-03-06T11:07:56.599Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: adjust SKILL.md wording around help guidance and add concise default/custom prompt behavior notes."
  -
    type: "verify"
    at: "2026-03-06T11:08:11.939Z"
    author: "TESTER"
    state: "ok"
    note: "Wording updated as requested: removed strict hardcode/always language, clarified that full utility details are in --help when needed, and added concise default vs custom prompt behavior examples (summary and answer audio)."
doc_version: 2
doc_updated_at: "2026-03-06T11:08:11.941Z"
doc_updated_by: "TESTER"
description: "Refine unclear wording in SKILL.md: replace strict 'always' guidance about help, remove hardcode warning phrasing, and add concise explanation of default vs custom prompt behavior with practical examples."
id_source: "generated"
---
## Summary

Polish SKILL.md wording for clarity around help usage and prompt behavior.

## Scope

In scope: SKILL.md phrasing updates only. Out of scope: CLI code changes and other docs.

## Plan

1) Replace strict wording in Models and Formats with neutral note about help availability. 2) Add short section explaining default prompt behavior and custom prompt overrides with practical examples. 3) Verify brevity and alignment with user wording.

## Risks

Risk: wording may imply unsupported behavior. Mitigation: keep examples at high level and aligned with existing CLI prompt options.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T11:08:11.939Z — VERIFY — ok

By: TESTER

Note: Wording updated as requested: removed strict hardcode/always language, clarified that full utility details are in --help when needed, and added concise default vs custom prompt behavior examples (summary and answer audio).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T11:07:56.599Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert SKILL.md and this task README from task commit if wording does not match user intent.

## Context

User requested less strict and more understandable wording, plus a short explanation of what default prompts do and how custom prompts can alter behavior.
