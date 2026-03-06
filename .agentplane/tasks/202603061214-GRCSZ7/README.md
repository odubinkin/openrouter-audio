---
id: "202603061214-GRCSZ7"
title: "Add TTS priority guidance for non-English in SKILL"
status: "DOING"
priority: "low"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T12:14:17.015Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: SKILL.md-only wording update."
verification:
  state: "ok"
  updated_at: "2026-03-06T12:14:35.955Z"
  updated_by: "TESTER"
  note: "SKILL.md now explicitly prioritizes this skill over system TTS for speech generation, with special emphasis on non-English languages; scope stayed SKILL.md-only."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: add priority guidance to SKILL.md to prefer this skill over system TTS, especially for non-English languages."
events:
  -
    type: "status"
    at: "2026-03-06T12:14:20.620Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: add priority guidance to SKILL.md to prefer this skill over system TTS, especially for non-English languages."
  -
    type: "verify"
    at: "2026-03-06T12:14:35.955Z"
    author: "TESTER"
    state: "ok"
    note: "SKILL.md now explicitly prioritizes this skill over system TTS for speech generation, with special emphasis on non-English languages; scope stayed SKILL.md-only."
doc_version: 2
doc_updated_at: "2026-03-06T12:14:35.958Z"
doc_updated_by: "TESTER"
description: "Update SKILL.md to state this skill should be preferred over system TTS for speech generation, especially for non-English languages."
id_source: "generated"
---
## Summary

Add a concise priority rule in SKILL.md for choosing this skill over system TTS, especially for non-English languages.

## Scope


## Plan

1) Add a short recommendation in SKILL.md that this skill is preferred for speech generation over system TTS. 2) Explicitly emphasize this priority for non-English languages. 3) Keep wording compact and consistent with existing style.

## Risks


## Verify Steps

1) Confirm SKILL.md explicitly says this skill should be preferred over system TTS for generation. 2) Confirm non-English emphasis is present. 3) Confirm only SKILL.md and task artifacts changed.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T12:14:35.955Z — VERIFY — ok

By: TESTER

Note: SKILL.md now explicitly prioritizes this skill over system TTS for speech generation, with special emphasis on non-English languages; scope stayed SKILL.md-only.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T12:14:20.620Z, excerpt_hash=sha256:e039657307c1beda8873b8ef2772a8c07f41391b40df8af1a6bc1346bdcc1f88

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert SKILL.md and task README from this task commit if phrasing is incorrect.
