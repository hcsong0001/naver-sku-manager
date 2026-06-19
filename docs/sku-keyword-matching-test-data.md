# SKU Keyword Matching 테스트 데이터 기준

## 공식 테스트 세트

경로:
`test-data/sku-keyword-matching/`

현재 기준:
- ERP rows: 184
- product CSV rows: 85
- stock rows: 100
- stock barcode rows: 100
- unique stock barcodes: 100
- DB matched barcodes: 100
- Preview matchedRows: 0
- warningRows: 184
- errorRows: 0

설명:
이 세트는 현재 공식 테스트 세트입니다.
재고현황 100행 데이터와 ERP 미매핑 목록의 자동 확정 조건이 맞지 않기 때문에 matchedRows 0이 정상입니다.

## Regression 4-match 테스트 세트

경로:
`test-data/sku-keyword-matching-regression-4match/`

기준:
- Preview matchedRows: 4
- warningRows: 180
- errorRows: 0

설명:
이 세트는 과거 자동 매칭 4건 동작을 재현하기 위한 regression fixture입니다.
Preview 로직이 깨졌는지 확인할 때 사용합니다.

## 주의

같은 파일명이 여러 폴더에 있을 수 있으므로 테스트 시 반드시 full path를 확인해야 합니다.
브라우저 업로드 테스트에서는 파일 탐색기에서 정확한 폴더를 직접 열어 선택해야 합니다.
