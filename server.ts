import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = express();
app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback intelligent response generator when Gemini key is not set or network fails
function generateFallbackCounselingResponse(
  userQuery: string,
  persona: 'student' | 'parent',
  language: 'en' | 'hi' | 'mr',
  profile?: any
): { text: string; suggestions: string[] } {
  const queryLower = userQuery.toLowerCase();
  const lang = language || 'en';

  if (queryLower.includes('72%') || queryLower.includes('percent') || queryLower.includes('mark') || queryLower.includes('eligib')) {
    if (lang === 'mr') {
      return {
        text: `🎓 **पात्रता आणि प्रवेश विश्लेषण:**
१२ वी मध्ये ७२% गुणांसह तुम्ही अभियांत्रिकी (B.E./B.Tech) साठी पात्र आहात (Open साठी किमान ४५% आणि आरक्षित प्रवर्गासाठी ४०% PCM आवश्यक असते).
Computer Engineering आणि IT साठी कटऑफ जास्त असल्याने खालील धोरण वापरा:
1. **CET / JEE स्कोअर:** तुमचे कॉलेज वाटप मुख्यत्वे MHT-CET/JEE च्या गुणांवर ठरेल.
2. **शिफारस शाखा:** Computer Engineering, AI & Data Science, Information Technology, आणि E&TC.
3. **कॅप (CAP) ऑप्शन फॉर्म:** टॉप स्वायत्त कॉलेजपासून सुरुवात करून Tier-2 कॉलेजचे सुरक्षित पर्याय शेवटी ठेवा.
4. **कागदपत्रे:** १२ वी गुणपत्रिका, अधिवास प्रमाणपत्र (Domicile), आणि जात प्रमाणपत्र/उत्पन्न दाखला तयार ठेवा.`,
        suggestions: ['माझ्यासाठी योग्य कॉलेजेस शोधा', 'शिष्यवृत्ती पात्रता तपासा', 'आवश्यक कागदपत्रांची यादी']
      };
    } else if (lang === 'hi') {
      return {
        text: `🎓 **पात्रता एवं प्रवेश मार्गदर्शन:**
१२वीं में ७२% अंकों के साथ आप बी.टेक/इंजीनियरिंग में प्रवेश हेतु पूर्ण पात्र हैं (ओपन वर्ग के लिए ४५% तथा आरक्षित वर्गों हेतु ४०% पीसीएम आवश्यक है)।
कंप्यूटर इंजीनियरिंग हेतु प्रवेश मुख्य रूप से MHT-CET / JEE स्कोर पर आधारित होगा:
1. **प्राथमिकता शाखाएं:** Computer Engineering, AI & Data Science, Information Technology, Electronics & Telecommunication.
2. **काउंसलिंग रणनीति:** कैप ऑप्शन फॉर्म में Ambitious (सपनों के कॉलेज), Moderate (संभावित कॉलेज), और Safe (निश्चित कॉलेज) का संतुलित क्रम बनाएं।
3. **स्कॉलरशिप लाभ:** यदि पारिवारिक आय ८ लाख से कम है तो ईबीसी (EBC) के तहत ५०% ट्यूशन फीस छूट मिलेगी।`,
        suggestions: ['कॉलेज कटऑफ की सूची दें', 'स्कॉलरशिप कैलकुलेटर देखें', 'कागजात चेकलिस्ट']
      };
    } else {
      return {
        text: `🎓 **Eligibility & Admission Analysis:**
With 72% in Class 12th PCM, you meet the statutory eligibility criteria for Engineering Admissions (minimum 45% aggregate in Physics + Math + Chem/CS for General, 40% for Reserved categories).

**Strategic Admission Blueprint:**
1. **Branch Suitability:** Computer Engineering, AI & Data Science (AI&DS), Information Technology (IT), and Electronics & Telecommunication (E&TC).
2. **Cutoff Reality:** For Tier-1 colleges (COEP, VJTI, PICT, SPIT), CS cutoffs exceed 98-99 percentile. For percentiles between 70-90, emerging colleges in Pune, Mumbai, and regional hubs offer strong computer/IT curricula with 6-10 LPA placements.
3. **Fee Concession:** If your family income is under ₹8 LPA, you are eligible for the Maharashtra EBC 50% tuition fee waiver, saving ₹40,000 to ₹80,000 every year!
4. **Action Step:** Check our Course Recommendation Engine to map your exact percentile to safe and moderate colleges.`,
        suggestions: ['Show Safe Colleges for my Marks', 'Check Required Documents', 'Calculate Net Fees & Scholarships']
      };
    }
  }

  if (queryLower.includes('document') || queryLower.includes('कागद') || queryLower.includes('दस्तावेज')) {
    if (lang === 'mr') {
      return {
        text: `📄 **आवश्यक कागदपत्रांची अधिकृत यादी:**
- १० वी व १२ वी मूळ गुणपत्रिका
- MHT-CET / JEE अधिकृत स्कोअर कार्ड
- महाराष्ट्र अधिवास व राष्ट्रीयत्व प्रमाणपत्र (Domicile & Nationality)
- जातीचे प्रमाणपत्र व जात पडताळणी प्रमाणपत्र (Caste Validity - अत्यंत महत्त्वाचे)
- नॉन-क्रीमी लेयर (NCL - ३१ मार्च २०२७ पर्यंत वैध)
- तहसीलदार उत्पन्न प्रमाणपत्र (८ लाखांच्या आत - EBC/TFWS साठी)
- आधार कार्ड बँक खात्याशी NPCI लिंक केलेले`,
        suggestions: ['गॅप सर्टिफिकेट नियम काय आहेत?', 'कास्ट व्हॅलिडिटी नसेल तर काय करावे?', 'प्रिंट करण्यायोग्य चेकलिस्ट']
      };
    } else {
      return {
        text: `📄 **Mandatory Admission Document Dossier:**
1. **Academic Records:** 10th & 12th Original Marksheets + Passing Certificates.
2. **Entrance Proof:** Official MHT-CET / JEE Score Card.
3. **Candidature:** Domicile & Nationality Certificate (State of Maharashtra).
4. **Reservation Documents:** Caste Certificate + Caste Validity Certificate + Non-Creamy Layer (NCL valid through March 31).
5. **Fee Waivers:** Tahsildar Income Certificate (FY 2025-26 under ₹8 LPA) for EBC & TFWS schemes.
6. **Financial DBT:** Bank passbook seeded with Aadhaar via NPCI mapping.`,
        suggestions: ['What if Caste Validity is pending?', 'Rules for Gap Certificate', 'Download Printable Checklist']
      };
    }
  }

  if (persona === 'parent') {
    return {
      text: `👨‍👩‍👦 **Parent Advisory & Campus Guidance:**
As a parent, your primary concerns are financial transparency, student safety, and hostel security:
- **Tuition & Expenses:** Government tuition waivers (EBC 50%, TFWS 100%, SC/ST 100%) can reduce 4-year tuition by up to ₹3,00,000.
- **Hostel Safety:** Reputed institutions enforce biometric turnstiles, 9:00 PM curfews with automated SMS alerts to parents, and resident wardens.
- **Financial Planning:** Hostels cost approximately ₹25,000 to ₹70,000 annually. Under the Dr. Panjabrao Deshmukh scheme, eligible students receive ₹30,000/year hostel assistance.
- **Campus Vigilance:** All accredited colleges maintain strict Anti-Ragging squads with statutory police liaison.`,
      suggestions: ['Compare Hostel Fees & Curfew', 'Breakdown of 4-Year Total Expenses', 'Anti-Ragging Safety Protocols']
    };
  }

  return {
    text: `🎓 **EduGuide AI Admission Assistant:**
I am your end-to-end counselor for College Admissions, CAP Option Form filling, cutoffs, document verification, scholarships, and emergency problem solving.

You can ask me anything, such as:
- *"I scored 85% in CET, which Computer colleges can I get in Pune or Mumbai?"*
- *"Explain the difference between Freeze and Betterment in CAP Round 1."*
- *"How to claim 50% EBC scholarship on Mahadbt?"*
- *"My payment was debited but the CET portal says pending."*`,
    suggestions: [
      'Compare Top Colleges in Pune & Mumbai',
      'Explain Freeze vs Betterment in CAP 1',
      'Check Document Validity & Rules'
    ]
  };
}

// API: AI Admission Copilot Chat
app.post('/api/admission/chat', async (req: Request, res: Response) => {
  try {
    const { message, persona = 'student', language = 'en', studentProfile, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message text is required' });
      return;
    }

    if (!ai) {
      const fallback = generateFallbackCounselingResponse(message, persona, language, studentProfile);
      res.json({
        reply: fallback.text,
        suggestions: fallback.suggestions,
        modelUsed: 'heuristic-engine',
      });
      return;
    }

    const systemPrompt = `You are "EduGuide AI", an elite, authoritative, empathetic, and knowledgeable Senior Admissions Counselor and CET/DTE Maharashtra regulatory expert.
Current user persona: ${persona === 'parent' ? 'PARENT MODE (Focus on 4-year total costs, safety, anti-ragging, hostel security, mess hygiene, parent alerts, scholarships)' : 'STUDENT MODE (Focus on cutoff percentiles, CS/IT/AI branches, coding culture, hackathons, placements, CAP option filling strategy, campus life)'}.
Language requested: ${language === 'mr' ? 'Marathi (मराठी)' : language === 'hi' ? 'Hindi (हिंदी)' : 'English'}.
Candidate context (if provided):
- Marks: 12th: ${studentProfile?.twelfthPercentage || 'Not specified'}%, Entrance: ${studentProfile?.entranceExam || 'MHT-CET'}: ${studentProfile?.entrancePercentile || 'Not specified'} percentile
- Category: ${studentProfile?.category || 'OPEN'}
- Family Income: ₹${studentProfile?.annualFamilyIncome || 'Not specified'}
- Preferred Branch: ${studentProfile?.preferredBranch || 'Computer Engineering / IT'}
- Preferred City: ${studentProfile?.preferredCity || 'Pune / Mumbai'}
- Hostel Needed: ${studentProfile?.hostelNeeded ? 'Yes' : 'No'}

Key Instructions:
1. Provide concrete, well-structured, actionable advice with bullet points and bold highlights.
2. If the user mentions marks, percentiles, or course interest, proactively give eligibility check, cutoff expectations, branch alternatives, and specific scholarship advice (e.g. EBC 50% waiver, TFWS 100% waiver, Panjabrao Deshmukh hostel ₹30k allowance).
3. If the user asks about deadlines, option filling, or CAP rounds, clearly explain the rules (e.g. Preference 1 Auto-freeze, Betterment procedure, seat acceptance fee of ₹1,000).
4. Tone: Encouraging, precise, professional, and free of vague fluff. Respond in the requested language (${language}).`;

    // Construct contents
    const prompt = `User Query: "${message}"`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      const replyText = response.text || generateFallbackCounselingResponse(message, persona, language, studentProfile).text;

      // Generate context-aware suggestions
      const suggestions = persona === 'parent'
        ? ['Explain Fee Installment Rules', 'Hostel Security & Curfew Details', 'Scholarship Net Payable Fee']
        : ['What is my chance in CAP Round 1?', 'Which documents are needed for my category?', 'Difference between Freeze & Betterment'];

      res.json({
        reply: replyText,
        suggestions,
        modelUsed: 'gemini-3.8-flash',
      });
    } catch (genErr: any) {
      console.error('Gemini API call failed, falling back to local reasoning:', genErr);
      const fallback = generateFallbackCounselingResponse(message, persona, language, studentProfile);
      res.json({
        reply: fallback.text,
        suggestions: fallback.suggestions,
        modelUsed: 'heuristic-fallback',
      });
    }
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal counseling server error' });
  }
});

// Setup dev server with Vite middlewares or static files for production
async function startServer() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    // In production, serve dist assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduGuide AI Server running on http://0.0.0.0:${PORT} [${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
  });
}

startServer();
