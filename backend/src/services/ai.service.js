const Groq = require('groq-sdk');

const getAIReview = async (diffText) => {

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  const prompt = `You are an expert senior software engineer performing a code review.
Analyze the GitHub Pull Request diff below and return ONLY a valid JSON object. No explanation, no markdown, no extra text — ONLY the raw JSON.

Return exactly this structure:
{"summary":"overall summary in 2-3 lines","bugs":[{"file":"filename","line":"line number","issue":"what is wrong","fix":"how to fix"}],"security":[{"file":"filename","issue":"security problem","fix":"solution"}],"performance":[{"file":"filename","issue":"performance issue","fix":"optimization"}],"suggestions":[{"file":"filename","issue":"improvement","fix":"suggestion"}],"score":75}

Rules:
- score must be 0-100 (100 = perfect code)
- Use empty array [] if no issues found in a category
- Return ONLY the JSON, nothing else

PR Diff to analyze:
${diffText.substring(0, 6000)}`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'You are a code reviewer. You ONLY respond with valid JSON. Never add explanations or markdown formatting.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.1,
    response_format: { type: 'json_object' },
  });

  const responseText = chatCompletion.choices[0]?.message?.content || '';

  if (!responseText) {
    throw new Error('AI returned an empty response. Please try again.');
  }

  const cleaned = responseText
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (parseError) {
    console.error('JSON parse error. AI response:', cleaned.substring(0, 200));
    throw new Error('Failed to parse AI response. Please try again.');
  }
};

module.exports = { getAIReview };
