import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { container } from "../shared/api";

export async function SubmitFeedback(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Parse the JSON body from the request stream
    const body: any = await request.json();
    const message = body?.message;

    if (!message) {
        return { 
            status: 400, 
            body: "Please pass a message" 
        };
    }

    const newItem = {
        message,
        timestamp: new Date().toISOString(),
    };

    // Save the item to your Cosmos DB container
    await container.items.create(newItem);

    return {
        status: 201,
        jsonBody: { message: "Feedback submitted successfully" }
    };
};

app.http('SubmitFeedback', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: SubmitFeedback
});