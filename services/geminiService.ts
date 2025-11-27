
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, PredictionResult } from "../types";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey });

// Schema definition for the JSON response
const predictionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    bazis: {
      type: Type.ARRAY,
      description: "List of Ba Zi charts for the people involved",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the person" },
          role: { type: Type.STRING, description: "Role of the person (e.g. Groom)" },
          yearPillar: { type: Type.STRING, description: "Year pillar (Gan-Zhi)" },
          monthPillar: { type: Type.STRING, description: "Month pillar (Gan-Zhi)" },
          dayPillar: { type: Type.STRING, description: "Day pillar (Gan-Zhi)" },
          hourPillar: { type: Type.STRING, description: "Hour pillar (Gan-Zhi)" },
          element: { type: Type.STRING, description: "The Day Master element (e.g., Yang Fire)" },
          strength: { type: Type.STRING, description: "Strength of the Day Master (e.g., Strong, Weak)" },
        },
        required: ["name", "yearPillar", "monthPillar", "dayPillar", "hourPillar", "element", "strength"]
      }
    },
    generalAdvice: {
      type: Type.STRING,
      description: "General astrological advice for the provided profile(s) for the selected month regarding the purpose."
    },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "YYYY-MM-DD format" },
          score: { type: Type.NUMBER, description: "A score from 0 to 100 indicating auspiciousness" },
          auspiciousLevels: { type: Type.STRING, description: "Level, e.g., 'Da Ji' (Great Luck), 'Xiao Ji' (Small Luck)" },
          reason: { type: Type.STRING, description: "Why this day is good based on Ba Zi interaction" },
          conflicts: { type: Type.STRING, description: "Zodiac sign that conflicts with this day (Chong)" },
          activities: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of suitable activities"
          }
        },
        required: ["date", "score", "auspiciousLevels", "reason", "conflicts", "activities"]
      }
    }
  },
  required: ["bazis", "generalAdvice", "days"]
};

export const calculateAuspiciousDays = async (input: UserInput): Promise<PredictionResult> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure the environment.");
  }

  const modelId = "gemini-2.5-flash";
  
  // Construct profile strings with roles
  const profilesText = input.people.map((p, index) => `
    Person ${index + 1} (${input.roles[index] || 'Unknown Role'}):
    - Name: ${p.name}
    - Gender: ${p.gender}
    - Birth Date: ${p.birthDate}
    - Birth Time: ${p.birthTime}
  `).join('\n');

  const prompt = `
    You are a grandmaster of Traditional Chinese Metaphysics, specialized in Ba Zi (Four Pillars of Destiny) and Ze Ji (Date Selection).
    
    Context:
    The user wants to select an auspicious date for: "${input.purposeLabel}" (${input.purpose}).
    
    Profiles Involved:
    ${profilesText}
    
    Request:
    - Target Month/Year: ${input.targetMonth}
    
    Task:
    1. Calculate the Ba Zi chart (Year, Month, Day, Hour pillars) for EACH person provided. Return the "role" exactly as provided in input.
    2. Analyze the Day Master and strength for each.
    3. Find the most auspicious dates in the "Target Month" specifically for the purpose of "${input.purposeLabel}".
    ${input.people.length > 1 ? '4. IMPORTANT: Since there are multiple people (e.g., Wedding), finding dates that harmonize with BOTH charts is critical. Avoid days that clash with either person\'s Year Pillar (Zodiac) or Day Pillar. Provide analysis on their compatibility if relevant to the date.' : ''}
    5. Provide a compatibility/auspiciousness score (0-100) for each date.
    6. List zodiac conflicts (e.g., "Clash Rat").
    
    Return the result strictly in JSON format matching the schema provided. 
    Ensure dates are within the requested target month (${input.targetMonth}).
    Provide at least 3-5 recommended dates.
    The content should be in Simplified Chinese (zh-CN). Use professional but accessible terminology.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: predictionSchema,
        temperature: 0.7, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as PredictionResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to calculate auspicious dates. Please try again.");
  }
};
