import { GoogleGenerativeAI } from "@google/generative-ai";

const MODEL_NAME = "gemini-2.5-flash";

export function buildPrompt(variables) {
    const dictOfVarsStr = JSON.stringify(variables ?? {});
    return (
        `You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. ` +
        `Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). Parentheses have the highest priority, followed by Exponents, then Multiplication and Division, and lastly Addition and Subtraction. ` +
        `For example: Q. 2 + 3 * 4 -> (3 * 4) = 12, 2 + 12 = 14. ` +
        `YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE, AND ONLY ONE CASE SHALL APPLY EVERY TIME: ` +
        `1. Simple mathematical expressions like 2 + 2, 3 * 4, etc.: In this case, solve and return the answer in the format of a JSON string representing an array of one object: '[{"expr": "given expression", "result": "calculated answer"}]'. ` +
        `2. Set of Equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, etc.: In this case, solve for the given variable(s). The format should be a JSON string of an array of objects, one for each variable, like '[{"expr": "x", "result": "2", "assign": true}, {"expr": "y", "result": "5", "assign": true}]'. ` +
        `3. Assigning values to variables like x = 4, y = 5, z = 6, etc.: In this case, return a JSON string of an array of objects, where each object has an 'assign' key set to true, like '[{"expr": "x", "result": "4", "assign": true}]'. ` +
        `4. Analyzing Graphical Math problems (e.g., geometry, physics diagrams): Analyze the drawing and return the answer in the format of a JSON string of an array of one object: '[{"expr": "problem description", "result": "calculated answer"}]'. PAY CLOSE ATTENTION TO DIFFERENT COLORS. ` +
        `5. Detecting Abstract Concepts (e.g., love, patriotism, historical references): Use the same format, where 'expr' is an explanation of the drawing and 'result' is the abstract concept. ` +
        `Analyze the expression in the image and return the answer according to the given rules. ` +
        `Here is an object of user-assigned variables. If the given expression has any of these variables, use its value from this object: ${dictOfVarsStr}. ` +
        `YOUR ENTIRE RESPONSE MUST BE A VALID JSON STRING. DO NOT USE MARKDOWN, BACKTICKS, OR ANY OTHER FORMATTING. The output must be parsable by 'JSON.parse()' in JavaScript.`
    );
}

export function getGeminiModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing GEMINI_API_KEY");
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: MODEL_NAME });
}
