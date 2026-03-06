---
id: "202603060634-86QMK1"
title: "Change default audio models"
result_summary: "Default transcribe and generate models updated to openrouter/auto and openai/gpt-audio-mini."
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T06:35:12.554Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved default audio model change."
verification:
  state: "ok"
  updated_at: "2026-03-06T06:36:01.431Z"
  updated_by: "TESTER"
  note: "Verified: build succeeds; help now shows default transcribe model openrouter/auto and default generate model openai/gpt-audio-mini; dry-run generate still returns tmp path with format mp3 and stream false."
commit:
  hash: "7aca97ed95f07dbaf21090542478b95b175fbafd"
  message: "✅ 86QMK1 cli: change default audio models"
comments:
  -
    author: "CODER"
    body: "Start: Updating default transcribe and generate models in code, help, and docs."
  -
    author: "CODER"
    body: "Verified: build succeeds; help output shows new defaults; docs are aligned; generate dry-run behavior is unchanged."
events:
  -
    type: "status"
    at: "2026-03-06T06:35:12.736Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Updating default transcribe and generate models in code, help, and docs."
  -
    type: "verify"
    at: "2026-03-06T06:36:01.431Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build succeeds; help now shows default transcribe model openrouter/auto and default generate model openai/gpt-audio-mini; dry-run generate still returns tmp path with format mp3 and stream false."
  -
    type: "status"
    at: "2026-03-06T06:36:10.190Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: build succeeds; help output shows new defaults; docs are aligned; generate dry-run behavior is unchanged."
doc_version: 2
doc_updated_at: "2026-03-06T06:36:10.190Z"
doc_updated_by: "CODER"
description: "Set default transcribe model to openrouter/auto and default generate model to openai/gpt-audio-mini, then update help and docs accordingly."
id_source: "generated"
---
## Summary


## Scope

In scope: src/openrouter-audio.ts defaults and related docs/help text in README.md and SKILL.md. Out of scope: model list changes or API behavior changes.

## Plan

1) Change default transcribe model to openrouter/auto and default generate model to openai/gpt-audio-mini in the CLI source. 2) Update help output and documentation references to match the new defaults. 3) Build and verify help plus dry-run output. 4) Commit and finish task.

## Risks


## Verify Steps

1) npm run build succeeds. 2) build/openrouter-audio/openrouter-audio --help shows default transcribe model openrouter/auto and default generate model openai/gpt-audio-mini. 3) build/openrouter-audio/openrouter-audio generate "smoke" --dry-run still reports format mp3 and stream false. 4) README.md and SKILL.md reflect the new defaults.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T06:36:01.431Z — VERIFY — ok

By: TESTER

Note: Verified: build succeeds; help now shows default transcribe model openrouter/auto and default generate model openai/gpt-audio-mini; dry-run generate still returns tmp path with format mp3 and stream false.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T06:36:01.169Z, excerpt_hash=sha256:4606b659fe245138d6aa118ebc6d3e22611aba25e945456ff2475d86554e6541

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore prior default model selections.

## Notes

### Approvals / Overrides
- No overrides needed.

### Decisions
- Default transcribe model changed to openrouter/auto.
- Default generate model changed to openai/gpt-audio-mini.
- Help and docs were updated to keep defaults consistent everywhere.

### Implementation Notes
- Updated default model constants in src/openrouter-audio.ts.
- Updated README.md and SKILL.md examples/defaults.

### Evidence / Links
- Verified sequential build plus help output shows new defaults.
- Verified generate --dry-run still reports default format mp3 and stream false.
