import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView,
} from './tms-fast-connection-naver-product-identity-field-exploration-design-view.service';
import { type TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView } from './tms-fast-connection-naver-product-lookup-masked-response-shape-augmentation-actual-collection-view.service';
import { type TmsFastConnectionNaverProductIdentityConfirmationDecisionView } from './tms-fast-connection-naver-product-identity-confirmation-decision-view.service';

function makeTask416View(
  overrides: Partial<TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView> = {}
): TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView {
  return {
    candidatePathResults: [
      { candidatePath: 'smartstoreChannelProduct.channelProductNo' },
      { candidatePath: 'smartstoreChannelProduct.id' },
      { candidatePath: 'smartstoreChannelProduct.productNo' },
      { candidatePath: 'smartstoreChannelProduct.originProductNo' },
      { candidatePath: 'originProduct.originProductNo' },
      { candidatePath: 'originProduct.id' },
      { candidatePath: 'originProduct.productNo' },
    ],
    ...overrides,
  } as unknown as TmsFastConnectionNaverProductLookupMaskedResponseShapeAugmentationActualCollectionView;
}

function makeTask417View(
  overrides: Partial<TmsFastConnectionNaverProductIdentityConfirmationDecisionView> = {}
): TmsFastConnectionNaverProductIdentityConfirmationDecisionView {
  return {
    status: 'PRODUCT_IDENTITY_NOT_CONFIRMED',
    confirmedCandidatePathCount: 0,
    productUpdateApiEntryDecision: 'BLOCKED',
    ...overrides,
  } as unknown as TmsFastConnectionNaverProductIdentityConfirmationDecisionView;
}

describe('Task 418 - Naver Product Identity Field Exploration Design View', () => {
  it('Task 417 결과가 PRODUCT_IDENTITY_NOT_CONFIRMED이면 explorationNeeded true다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
      makeTask416View(),
      makeTask417View()
    );

    assert.equal(view.explorationNeeded, true);
    assert.equal(view.sourceDecisionStatus, 'PRODUCT_IDENTITY_NOT_CONFIRMED');
  });

  it('productUpdateApiEntryDecision은 항상 BLOCKED다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
      makeTask416View(),
      makeTask417View({
        status: 'PRODUCT_IDENTITY_CONFIRMED',
        productUpdateApiEntryDecision: 'REVIEW_ALLOWED_BUT_STILL_REQUIRES_SEPARATE_APPROVAL',
        confirmedCandidatePathCount: 1,
      })
    );

    assert.equal(view.currentProductUpdateApiEntryDecision, 'BLOCKED');
  });

  it('후보 그룹이 3개 이상 생성된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
      makeTask416View(),
      makeTask417View()
    );

    assert.ok(view.candidateExplorationGroups.length >= 3);
  });

  it('모든 후보 그룹은 requiresApiRecall false다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
      makeTask416View(),
      makeTask417View()
    );

    assert.equal(view.candidateExplorationGroups.every((group) => group.requiresApiRecall === false), true);
  });

  it('모든 후보 그룹은 requiresSeparateApproval true다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
      makeTask416View(),
      makeTask417View()
    );

    assert.equal(
      view.candidateExplorationGroups.every((group) => group.requiresSeparateApproval === true),
      true
    );
  });

  it('forbiddenData에 rawResponse, secret/token/header/signature, full product/option/seller code가 포함된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
      makeTask416View(),
      makeTask417View()
    );
    const allForbidden = new Set(view.candidateExplorationGroups.flatMap((group) => group.forbiddenData));

    assert.equal(allForbidden.has('rawResponse'), true);
    assert.equal(allForbidden.has('secret'), true);
    assert.equal(allForbidden.has('token'), true);
    assert.equal(allForbidden.has('authorizationHeader'), true);
    assert.equal(allForbidden.has('signature'), true);
    assert.equal(allForbidden.has('fullProductName'), true);
    assert.equal(allForbidden.has('fullOptionName'), true);
    assert.equal(allForbidden.has('fullSellerManagementCode'), true);
  });

  it('nextRecommendedTask가 Task 419 승인 Packet으로 표시된다', () => {
    const view = buildTmsFastConnectionNaverProductIdentityFieldExplorationDesignView(
      makeTask416View(),
      makeTask417View()
    );

    assert.equal(
      view.nextRecommendedTask,
      'Task 419 - Naver 상품 식별 필드 추가 탐색 승인 Packet'
    );
  });
});
