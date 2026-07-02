import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView,
} from './tms-fast-connection-naver-product-identity-confirmation-decision-view.service';
import { type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView } from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-actual-collection-view.service';
import { type TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult } from './tms-naver-product-lookup-masked-response-shape-augmentation.harness';

function makeCandidate(
  candidatePath: TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult['candidatePath'],
  overrides: Partial<{
    exists: boolean;
    valueType: TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult['valueType'];
    maskedPreviewLast4: string | null;
    equalsTargetProductNo: boolean | null;
  }> = {}
): TmsNaverProductLookupMaskedResponseShapeAugmentationCandidatePathResult {
  return {
    candidatePath,
    exists: overrides.exists ?? false,
    valueType: overrides.valueType ?? 'undefined',
    maskedPreviewLast4: overrides.maskedPreviewLast4 ?? null,
    equalsTargetProductNo: overrides.equalsTargetProductNo ?? null,
    rawValueDisplayed: false,
    rawValueStored: false,
    rawResponseAccessedForDisplay: false,
  };
}

function makeTask416View(
  overrides: Partial<TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView> = {}
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView {
  return {
    actualMaskedShapeAugmentationExecuted: true,
    success: true,
    httpStatusCode: 200,
    responseShapeKeys: ['originProduct', 'smartstoreChannelProduct'],
    productIdentityConfidenceScore: 30,
    productIdentityMatchConfirmed: false,
    candidatePathResults: [
      makeCandidate('smartstoreChannelProduct.channelProductNo'),
      makeCandidate('smartstoreChannelProduct.id'),
      makeCandidate('smartstoreChannelProduct.productNo'),
      makeCandidate('smartstoreChannelProduct.originProductNo'),
      makeCandidate('originProduct.originProductNo'),
      makeCandidate('originProduct.id'),
      makeCandidate('originProduct.productNo'),
    ],
    ...overrides,
  } as unknown as TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView;
}

describe('Task 417 - Naver Product Identity Confirmation Decision View', () => {
  it('Task 416 실제 결과 기준이면 PRODUCT_IDENTITY_NOT_CONFIRMED / BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView(makeTask416View());

    assert.equal(view.productIdentityConfidenceScore, 30);
    assert.equal(view.productIdentityMatchConfirmed, false);
    assert.equal(view.confirmedCandidatePathCount, 0);
    assert.equal(view.failedCandidatePathCount, 7);
    assert.equal(view.status, 'PRODUCT_IDENTITY_NOT_CONFIRMED');
    assert.equal(view.productUpdateApiEntryDecision, 'BLOCKED');
    assert.equal(
      view.blockedReason,
      'PRODUCT_IDENTITY_NOT_CONFIRMED_FROM_MASKED_SHAPE_AUGMENTATION'
    );
  });

  it('confidence score가 100이어도 equalsTargetProductNo true candidate가 없으면 BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView(
      makeTask416View({
        productIdentityConfidenceScore: 100,
        productIdentityMatchConfirmed: true,
      })
    );

    assert.equal(view.status, 'PRODUCT_IDENTITY_NOT_CONFIRMED');
    assert.equal(view.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('equalsTargetProductNo true가 있어도 confidence score가 100이 아니면 BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView(
      makeTask416View({
        productIdentityConfidenceScore: 70,
        productIdentityMatchConfirmed: true,
        candidatePathResults: [
          makeCandidate('smartstoreChannelProduct.channelProductNo', {
            exists: true,
            valueType: 'number',
            maskedPreviewLast4: '****0207',
            equalsTargetProductNo: true,
          }),
        ],
      })
    );

    assert.equal(view.confirmedCandidatePathCount, 1);
    assert.equal(view.status, 'PRODUCT_IDENTITY_NOT_CONFIRMED');
    assert.equal(view.productUpdateApiEntryDecision, 'BLOCKED');
  });

  it('confidence score 100 + equalsTargetProductNo true candidate 1개 이상이면 PRODUCT_IDENTITY_CONFIRMED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView(
      makeTask416View({
        productIdentityConfidenceScore: 100,
        productIdentityMatchConfirmed: true,
        candidatePathResults: [
          makeCandidate('smartstoreChannelProduct.channelProductNo', {
            exists: true,
            valueType: 'number',
            maskedPreviewLast4: '****0207',
            equalsTargetProductNo: true,
          }),
          makeCandidate('originProduct.id', {
            exists: true,
            valueType: 'string',
            maskedPreviewLast4: '****0207',
            equalsTargetProductNo: false,
          }),
        ],
      })
    );

    assert.equal(view.confirmedCandidatePathCount, 1);
    assert.equal(view.status, 'PRODUCT_IDENTITY_CONFIRMED');
    assert.equal(
      view.productUpdateApiEntryDecision,
      'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL'
    );
  });

  it('confirmed 상태여도 실제 상품 수정 API 호출은 허용하지 않고 별도 승인 필요 문구가 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView(
      makeTask416View({
        productIdentityConfidenceScore: 100,
        productIdentityMatchConfirmed: true,
        candidatePathResults: [
          makeCandidate('smartstoreChannelProduct.channelProductNo', {
            exists: true,
            valueType: 'number',
            maskedPreviewLast4: '****0207',
            equalsTargetProductNo: true,
          }),
        ],
      })
    );

    assert.equal(view.actualProductUpdateApiCall, false);
    assert.match(view.separateApprovalRequiredNotice, /별도 사용자 승인/);
  });

  it('안전 금지선 항목에 product update API, price/stock change, DB write, raw response, secret exposure가 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityConfirmationDecisionView(makeTask416View());
    const labels = view.safetyNoticeItems.map((item) => item.label);

    assert.ok(labels.includes('상품 수정 API'));
    assert.ok(labels.includes('가격/재고 변경'));
    assert.ok(labels.includes('DB write'));
    assert.ok(labels.includes('raw response'));
    assert.ok(labels.includes('secret/token/header/signature'));
  });
});
