const { GoogleGenAI, Type } = require("@google/genai");

// Single place the Gemini client lives. Constructed lazily so the app can boot
// (and the rest of the API keeps working) even when GEMINI_API_KEY is not set.
let client;
const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  if (!client) client = new GoogleGenAI({ apiKey });
  return client;
};

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

// Generic structured-output call. Gemini 2.5 Flash returns strict JSON matching
// responseSchema, so we can JSON.parse directly — no scrubbing.
const generate = async ({ systemPrompt, userInput, responseSchema }) => {
  const response = await getClient().models.generateContent({
    model: MODEL,
    contents: userInput,
    config: {
      systemInstruction: systemPrompt,
      responseMimeType: "application/json",
      responseSchema,
    },
  });
  return JSON.parse(response.text);
};

const strArray = { type: Type.ARRAY, items: { type: Type.STRING } };

// Feature 1 — Client Requirement Analyzer
const analyzeRequirements = async (text) => {
  const systemPrompt =
    "You are a senior freelance software consultant analyzing a raw client message " +
    "(a WhatsApp chat, email, or meeting notes). Extract only what is actually stated " +
    "or clearly implied — never invent scope, features, budgets, or timelines the client " +
    "did not suggest. Be concise and practical. Budget and timeline are rough ranges to " +
    "sanity-check against, phrased as short strings.";

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING },
      requestedFeatures: strArray,
      missingRequirements: strArray,
      questionsToAsk: strArray,
      estimatedComplexity: { type: Type.STRING },
      suggestedTimeline: { type: Type.STRING },
      suggestedBudgetRange: { type: Type.STRING },
    },
    required: [
      "summary",
      "requestedFeatures",
      "missingRequirements",
      "questionsToAsk",
      "estimatedComplexity",
      "suggestedTimeline",
      "suggestedBudgetRange",
    ],
  };

  return generate({ systemPrompt, userInput: text, responseSchema });
};

// Feature 2 — Proposal Generator
const generateProposal = async (text, tone = "Professional") => {
  const systemPrompt =
    `You are a freelancer writing a ${tone.toLowerCase()} client proposal from a project ` +
    "brief or requirements. Match that tone throughout. Be confident and concrete but do " +
    "not invent a real price — use a clear placeholder in pricingPlaceholder (e.g. '$X for " +
    "Y'). Keep each section tight.";

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      greeting: { type: Type.STRING },
      requirementUnderstanding: { type: Type.STRING },
      solution: { type: Type.STRING },
      deliverables: strArray,
      timeline: { type: Type.STRING },
      pricingPlaceholder: { type: Type.STRING },
      closing: { type: Type.STRING },
    },
    required: [
      "greeting",
      "requirementUnderstanding",
      "solution",
      "deliverables",
      "timeline",
      "pricingPlaceholder",
      "closing",
    ],
  };

  return generate({ systemPrompt, userInput: text, responseSchema });
};

// Feature 3 — Fiverr / Upwork Gig Generator
const generateGig = async (text) => {
  const systemPrompt =
    "You are a top-rated Fiverr/Upwork seller writing an optimized gig for the described " +
    "service. Write SEO-friendly copy, relevant search tags, and three tiered packages " +
    "(Basic, Standard, Premium) with realistic scoped features and placeholder prices.";

  const pkg = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      price: { type: Type.STRING },
      description: { type: Type.STRING },
      features: strArray,
    },
    required: ["name", "price", "description", "features"],
  };

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      seoDescription: { type: Type.STRING },
      shortDescription: { type: Type.STRING },
      tags: strArray,
      faqs: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            answer: { type: Type.STRING },
          },
          required: ["question", "answer"],
        },
      },
      packages: {
        type: Type.OBJECT,
        properties: { basic: pkg, standard: pkg, premium: pkg },
        required: ["basic", "standard", "premium"],
      },
      pricingSuggestions: strArray,
    },
    required: [
      "title",
      "seoDescription",
      "shortDescription",
      "tags",
      "faqs",
      "packages",
      "pricingSuggestions",
    ],
  };

  return generate({ systemPrompt, userInput: text, responseSchema });
};

// Feature 4 — Professional Client Reply Generator
const generateReply = async ({ scenario, tone, context }) => {
  const systemPrompt =
    `You are a freelancer writing a ${tone} reply to a client for this situation: ` +
    `"${scenario}". Produce a single ready-to-send message. Be concise, warm, and ` +
    "professional. Do not include a subject line unless it reads like an email.";

  const responseSchema = {
    type: Type.OBJECT,
    properties: { reply: { type: Type.STRING } },
    required: ["reply"],
  };

  return generate({
    systemPrompt,
    userInput: context || scenario,
    responseSchema,
  });
};

// Feature 5 — Meeting Notes Summarizer
const summarizeNotes = async (text) => {
  const systemPrompt =
    "You are summarizing raw meeting notes for a freelancer. Extract a short summary, " +
    "concrete action items (each a single actionable task), key decisions, and follow-up " +
    "questions. Do not invent items that were not discussed.";

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      summary: { type: Type.STRING },
      actionItems: strArray,
      decisions: strArray,
      followUpQuestions: strArray,
    },
    required: ["summary", "actionItems", "decisions", "followUpQuestions"],
  };

  return generate({ systemPrompt, userInput: text, responseSchema });
};

module.exports = {
  generate,
  analyzeRequirements,
  generateProposal,
  generateGig,
  generateReply,
  summarizeNotes,
};
