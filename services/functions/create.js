import * as uuid from "uuid";
import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
	const date = Date.now();
	const id = uuid.v1();

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      PK: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
			SK: `${data.type}${id}`,
			id: id,
			...data,
      modifyDate: date,
      createDate: date,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
