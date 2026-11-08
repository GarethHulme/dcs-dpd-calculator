# Peak calculator copy — 8 November 2026

Scope: Gaz requested a separate peak copy of the existing DPD sliding-scale calculator, anchored at 80 miles / 100 parcels = £2.59 per parcel, never below £2.59. Original: [index.html](../index.html), original blob bc6fde196d7a4fe0f4effbf72b3685fb3caa069d; original running endpoint https://garethhulme.github.io/dcs-dpd-calculator/ returned HTTP 200 during discovery.

Owner: existing embedded DPD_SCALE matrix. No new data source, integration, database or financial workflow. The original matrix anchor is £2.15. This copy uses integer-pence adjustment: max(259p, original band price + 44p). Assumption: preserve additive differences from the original matrix; parcel count replaces the original stop volume input for peak. This is a commercial planning calculator, not a payroll or invoicing mutation.

Acceptance: 100 parcels / 80 miles = £2.59 and £259 route total; 100 / 90 = £2.62 and £262; 150 / 90 = floor £2.59 and £388.50. All 1,800 matrix cells in all four lookup modes (7,200 comparisons) preserve the formula and floor. Full embedded script initialized using a synthetic DOM harness; mobile input events and saved-state keys tested. No production records used. Original desktop/mobile saved-state keys are not read/written by this copy. Run node peak/verify.cjs.

Safeguards: original index.html and original matrix unchanged. Existing band selection and range clamping retained; the copy labels matrix bands and the explicit rebasing rule. Inherited £12.71 hourly reference is labelled historical/inherited rather than a live statutory lookup. Existing live/cached/default/manual diesel behavior retained; not independently validated.

Limitations: local Chromium could not launch because the runtime prohibits socket creation. No desktop/mobile visual browser acceptance or actual diesel network acceptance claimed. Tests are logic/event acceptance, not production readiness certification.

Status: isolated source copy only on feat/peak-calculator-20261108. No merge, deployment, production data change or external communications. Authority covers creating the requested copy; publication remains separate. Next: visual review and, if requested, publish only the peak path while preserving original. Rollback for a later publication: remove/revert only peak files; no data rollback or changes to original required.
