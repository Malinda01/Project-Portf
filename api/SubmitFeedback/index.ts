import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { container } from "../shared/db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { message } = req.body;

    if (!message) {
        context.res = { status: 400, body: "Please pass a message" };
        return;
    }

    const newItem = {
        message,
        timestamp: new Date().toISOString(),
    };

    await container.items.create(newItem);

    context.res = {
        status: 201,
        body: { message: "Feedback submitted successfully" }
    };
};

export default httpTrigger;