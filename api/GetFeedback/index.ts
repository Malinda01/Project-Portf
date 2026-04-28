import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { container } from "../shared/api";

export async function GetFeedback(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const authHeader = request.headers.get('authorization');
    
    // Validate the bearer token
    if (authHeader !== "Bearer password123") {
        return { status: 401, body: "Unauthorized" };
    }

    const { resources } = await container.items
        .query("SELECT * FROM c ORDER BY c.timestamp DESC")
        .fetchAll();

    return {
        status: 200,
        jsonBody: resources
    };
};

app.http('GetFeedback', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: GetFeedback
});