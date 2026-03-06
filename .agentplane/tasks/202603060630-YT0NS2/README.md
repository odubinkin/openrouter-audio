---
id: "202603060630-YT0NS2"
title: "Add model lists to audio CLI help"
result_summary: "CLI help now documents explicit model overrides and current OpenRouter audio model lists for transcribe and generate."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-06T06:31:16.120Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved CLI help and docs update using current OpenRouter model metadata."
verification:
  state: "ok"
  updated_at: "2026-03-06T06:32:51.931Z"
  updated_by: "TESTER"
  note: "Verified: npm run build succeeded; help output documents explicit --model usage and lists current OpenRouter audio input/output model ids; generate --dry-run still returns tmp path with format mp3 and stream false; README.md and SKILL.md are aligned."
commit:
  hash: "a4348346ed81140bd7fbcb3bbcfb238309e22e7f"
  message: "✅ YT0NS2 cli: add audio model lists to help"
comments:
  -
    author: "CODER"
    body: "Start: Fetching current OpenRouter audio model lists and wiring them into CLI help and docs."
  -
    author: "CODER"
    body: "Verified: build succeeds; --help includes explicit --model usage plus current OpenRouter audio-input and audio-output model identifiers; docs were updated to match and dry-run defaults remain unchanged."
events:
  -
    type: "status"
    at: "2026-03-06T06:31:18.474Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fetching current OpenRouter audio model lists and wiring them into CLI help and docs."
  -
    type: "verify"
    at: "2026-03-06T06:32:51.931Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: npm run build succeeded; help output documents explicit --model usage and lists current OpenRouter audio input/output model ids; generate --dry-run still returns tmp path with format mp3 and stream false; README.md and SKILL.md are aligned."
  -
    type: "status"
    at: "2026-03-06T06:33:04.549Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: build succeeds; --help includes explicit --model usage plus current OpenRouter audio-input and audio-output model identifiers; docs were updated to match and dry-run defaults remain unchanged."
doc_version: 2
doc_updated_at: "2026-03-06T06:33:04.549Z"
doc_updated_by: "CODER"
description: "Update openrouter-audio CLI to support explicit --model usage in help and include current OpenRouter audio input/output model lists in --help output using OpenRouter documentation and models metadata."
id_source: "generated"
---
## Summary

Add explicit model option guidance and current OpenRouter audio model lists to the CLI help and documentation.

## Scope


## Plan

1) Fetch current OpenRouter audio documentation and models metadata for audio input and output capable models. 2) Update CLI help to document explicit --model usage and embed current transcribe/generate model lists. 3) Update README.md and SKILL.md to keep model guidance consistent. 4) Run build and help smoke checks. 5) Record sources, commit, and finish task.

## Risks

Risk: model catalog changes over time, causing embedded help lists to drift. Mitigation: derive lists from current OpenRouter metadata during this update and record source URLs in task notes.

## Verify Steps

1) npm run build succeeds. 2) build/openrouter-audio/openrouter-audio --help lists explicit --model support and current transcribe/generate model identifiers. 3) README.md and SKILL.md mention model override usage and match help output. 4) Dry-run generate still reports default format mp3 and stream false.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-06T06:32:51.931Z — VERIFY — ok

By: TESTER

Note: Verified: npm run build succeeded; help output documents explicit --model usage and lists current OpenRouter audio input/output model ids; generate --dry-run still returns tmp path with format mp3 and stream false; README.md and SKILL.md are aligned.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-06T06:32:48.787Z, excerpt_hash=sha256:00a0b2e43a646c051065b31782049e2b155217487fa6c5bc33996b467788a867

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore previous help text and documentation.

## Context

The CLI already accepts model overrides, but help output does not explain available OpenRouter audio-capable models. User requested lists sourced from OpenRouter documentation and model metadata.

## Notes

### Approvals / Overrides
- User approved network access for this task, limited to OpenRouter documentation and model catalog pages.

### Decisions
- Kept model lists embedded in CLI help for immediate discoverability.
- Split model lists by audio input (transcribe) and audio output (generate) to match OpenRouter modality metadata.
- Preserved existing runtime behavior; only help/documentation and model list constants changed.

### Implementation Notes
- Added explicit model guidance and current model lists to src/openrouter-audio.ts help output.
- Updated README.md and SKILL.md to reflect model override usage and current lists.
- Model identifiers were derived from OpenRouter model metadata on 2026-03-06.

### Evidence / Links
- Source: https://openrouter.ai/docs/guides/overview/multimodal/audio
- Source: https://openrouter.ai/models?fmt=cards&input_modalities=audio
- Source: https://openrouter.ai/models?fmt=cards&output_modalities=audio
- Source metadata endpoint used for exact ids: https://openrouter.ai/api/v1/models
- Verified npm run build, --help model list presence, and generate --dry-run defaults.
