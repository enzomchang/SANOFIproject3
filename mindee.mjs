import * as mindee from "mindee";
import { v4 } from "uuid";

export async function callMindeeApi(url) {
  let obj = {};
  const mindeeClient = new mindee.Client({
    apiKey: "90feff09f17391f2e68c6c5473a97636",
  });

  const inputSource = mindeeClient.docFromUrl(url);

  const apiResponse = mindeeClient.parse(mindee.product.ReceiptV5, inputSource);

  await apiResponse.then((resp) => {
    obj = {
      establishmentName: resp.document.inference.prediction.supplierName.value,
      date: resp.document.inference.prediction.date.value,
      time: resp.document.inference.prediction.time.value,
      value: resp.document.inference.prediction.totalAmount.value,
      id: v4(),
    };
  });
  return obj;
}
