import * as uuid from "uuid";
import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      PK: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      SK: uuid.v1(), // A unique uuid
      modifyDate: Date.now(),
      createDate: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
