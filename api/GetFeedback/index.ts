import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { container } from "../shared/db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // For your 'Predefined Password' requirement:
    const authHeader = req.headers.authorization;
    
    // Simple check (In production, use a JWT or Azure AD)
    if (authHeader !== "Bearer password123") {
        context.res = { status: 401, body: "Unauthorized" };
        return;
    }

    const { resources } = await container.items
        .query("SELECT * FROM c ORDER BY c.timestamp DESC")
        .fetchAll();

    context.res = {
        body: resources
    };
};

export default httpTrigger;