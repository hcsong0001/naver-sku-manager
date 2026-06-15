const fs = require('fs');

try {
  const data = JSON.parse(fs.readFileSync('channel-product-res.json', 'utf8'));
  const originProduct = data.originProduct || {};
  const detailAttribute = originProduct.detailAttribute || {};
  
  const result = {
    "originProduct.detailAttribute.optionInfo": detailAttribute.optionInfo || null,
    "originProduct.detailAttribute.supplementProductInfo": detailAttribute.supplementProductInfo || null
  };
  
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error("Error reading file:", e);
}
