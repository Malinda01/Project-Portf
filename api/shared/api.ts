import { CosmosClient } from "@azure/cosmos";

const endpoint = (process.env.COSMOS_ENDPOINT as string) || "";
const key = (process.env.COSMOS_KEY as string) || "";
const client = new CosmosClient({ endpoint, key });

export const container = client
    .database("FeedbackDB")
    .container("Submissions");