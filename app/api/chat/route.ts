import { type NextRequest, NextResponse } from "next/server"

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

interface ChatRequest {
  message: string
  context: string
  conversationHistory: ChatMessage[]
}

// System prompts for different contexts
const getSystemPrompt = (context: string): string => {
  const basePrompt = `You are EduBot, a friendly and knowledgeable study abroad assistant for MeritCap Education Platform. You help students with:
- University selection and applications
- Document preparation (SOP, LOR, transcripts)
- Test preparation (IELTS, TOEFL, GRE, GMAT)
- Scholarship opportunities
- Visa guidance
- Study abroad processes

Keep responses helpful, encouraging, and concise (2-3 sentences max). Always ask follow-up questions to better assist the student.`

  const contextPrompts: Record<string, string> = {
    dashboard: `${basePrompt} The student is currently in their dashboard managing applications. Focus on helping with application tracking, deadlines, and next steps.`,
    "study-abroad": `${basePrompt} The student is exploring international study options. Help them understand different countries, costs, and application processes.`,
    "study-india": `${basePrompt} The student is interested in studying in India. Focus on Indian universities, admission processes, and local requirements.`,
    "study-online": `${basePrompt} The student is exploring online education options. Emphasize flexibility, accreditation, and career outcomes.`,
    "test-prep": `${basePrompt} The student needs test preparation guidance. Provide specific strategies, study plans, and score targets.`,
    applications: `${basePrompt} The student is working on applications. Help with requirements, deadlines, and application strategies.`,
    documents: `${basePrompt} The student needs help with document preparation. Provide guidance on SOPs, LORs, transcripts, and other requirements.`,
    university: `${basePrompt} The student is researching a specific university. Provide insights on admission requirements, programs, and application tips.`,
  }

  return contextPrompts[context] || basePrompt
}

// Fallback responses for when API is unavailable
const getFallbackResponse = (message: string, context: string): string => {
  const input = message.toLowerCase()

  if (input.includes("application") || input.includes("apply")) {
    return "I'd be happy to help with your application! The typical process includes choosing universities, preparing documents (SOP, LOR, transcripts), meeting language requirements, and submitting applications. Which step would you like to know more about?"
  }

  if (input.includes("document") || input.includes("sop") || input.includes("lor")) {
    return "Document preparation is crucial! You'll typically need: Statement of Purpose (SOP), Letters of Recommendation (LOR), Academic transcripts, and language test scores. I can provide templates and guidance for each. What specific document do you need help with?"
  }

  if (input.includes("test") || input.includes("ielts") || input.includes("toefl")) {
    return "Test preparation is important! For English proficiency: IELTS (6.5-7.5) or TOEFL (80-100) are commonly required. For graduate programs: GRE/GMAT may be needed. Which test are you preparing for?"
  }

  if (input.includes("scholarship") || input.includes("funding")) {
    return "Great question! There are many scholarship opportunities: Merit-based scholarships, Need-based aid, Country-specific scholarships, and University scholarships. I can help you find scholarships that match your profile. What's your field of study?"
  }

  if (input.includes("cost") || input.includes("fee")) {
    return "Costs vary by country and program. Generally: US ($30k-60k/year), UK (£20k-40k/year), Canada (CAD 20k-35k/year), Australia (AUD 25k-45k/year). This includes tuition and living expenses. Would you like scholarship information?"
  }

  return "That's a great question! I'm here to help with all aspects of studying abroad - from choosing universities to application processes, document preparation, and test prep. Could you tell me more specifically what you'd like to know about?"
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, conversationHistory }: ChatRequest = await request.json()

    // Prepare messages for AI API
    const messages: ChatMessage[] = [
      { role: "system", content: getSystemPrompt(context) },
      ...conversationHistory.slice(-6), // Keep last 6 messages for context
      { role: "user", content: message },
    ]

    // Try ChatGPT API first
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 300,
            temperature: 0.7,
            presence_penalty: 0.1,
            frequency_penalty: 0.1,
          }),
        })

        if (openaiResponse.ok) {
          const data = await openaiResponse.json()
          const aiResponse = data.choices[0]?.message?.content || getFallbackResponse(message, context)

          return NextResponse.json({
            response: aiResponse,
            source: "openai",
          })
        }
      } catch (error) {
        console.error("OpenAI API error:", error)
      }
    }

    // Try Perplexity API as fallback
    if (process.env.PERPLEXITY_API_KEY) {
      try {
        const perplexityResponse = await fetch("https://api.perplexity.ai/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "llama-3.1-sonar-small-128k-online",
            messages: messages,
            max_tokens: 300,
            temperature: 0.7,
          }),
        })

        if (perplexityResponse.ok) {
          const data = await perplexityResponse.json()
          const aiResponse = data.choices[0]?.message?.content || getFallbackResponse(message, context)

          return NextResponse.json({
            response: aiResponse,
            source: "perplexity",
          })
        }
      } catch (error) {
        console.error("Perplexity API error:", error)
      }
    }

    // Use fallback response if both APIs fail
    return NextResponse.json({
      response: getFallbackResponse(message, context),
      source: "fallback",
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
