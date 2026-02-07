// =================================
// THEME & LANGUAGE MANAGEMENT
// =================================

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = `${savedTheme}-theme`;
    updateThemeIcon(savedTheme);
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.className = `${newTheme}-theme`;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Update theme icon
function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Language translations
const translations = {
    en: {
        'hero-title': 'Transform Your Brand with AI',
        'hero-subtitle': 'Generate stunning brand names, logos, marketing content, and design systems in seconds',
        'cta-button': 'Get Started',
        'features-title': 'Powerful AI Features',
        'feature-brand-title': 'Brand Names',
        'feature-brand-desc': 'Generate unique, memorable brand names tailored to your industry and tone',
        'feature-logo-title': 'Logo Generator',
        'feature-logo-desc': 'Create professional logo prompts powered by AI for stunning visual identity',
        'feature-content-title': 'Marketing Content',
        'feature-content-desc': 'Generate engaging product descriptions, captions, and ad copy instantly',
        'feature-design-title': 'Design System',
        'feature-design-desc': 'Get cohesive color palettes and design guidelines for your brand',
        'feature-sentiment-title': 'Sentiment Analysis',
        'feature-sentiment-desc': 'Analyze customer reviews and get improved, professional responses',
        'feature-chat-title': 'Branding Chat',
        'feature-chat-desc': 'Get expert AI consultation on all your branding questions',
        'why-choose-title': 'Why Choose BizForge?',
        'info-ai-title': 'AI-Powered Tools',
        'info-ai-desc': 'Leverage cutting-edge AI models for professional results',
        'info-instant-title': 'Instant Results',
        'info-instant-desc': 'Get your branding assets generated in seconds, not days',
        'info-multilingual-title': 'Multilingual Support',
        'info-multilingual-desc': 'Work in your preferred language with global support',
        'info-voice-title': 'Voice Input',
        'info-voice-desc': 'Use voice commands for hands-free brand creation',
        'info-professional-title': 'Professional Output',
        'info-professional-desc': 'Enterprise-grade quality suitable for any business'
    },
    es: {
        'hero-title': 'Transforma Tu Marca con IA',
        'hero-subtitle': 'Genera nombres de marca, logos, contenido de marketing y sistemas de diseño en segundos',
        'cta-button': 'Comenzar',
        'features-title': 'Funciones Potentes de IA',
        'feature-brand-title': 'Nombres de Marca',
        'feature-brand-desc': 'Genera nombres de marca únicos y memorables adaptados a tu industria y tono',
        'feature-logo-title': 'Generador de Logos',
        'feature-logo-desc': 'Crea prompts de logos profesionales con IA para una identidad visual impresionante',
        'feature-content-title': 'Contenido de Marketing',
        'feature-content-desc': 'Genera descripciones de productos, subtítulos y copias publicitarias al instante',
        'feature-design-title': 'Sistema de Diseño',
        'feature-design-desc': 'Obtén paletas de colores cohesivas y directrices de diseño para tu marca',
        'feature-sentiment-title': 'Análisis de Sentimientos',
        'feature-sentiment-desc': 'Analiza reseñas de clientes y obtén respuestas mejoradas y profesionales',
        'feature-chat-title': 'Chat de Marca',
        'feature-chat-desc': 'Obtén consultoría experta de IA sobre todas tus preguntas de marca',
        'why-choose-title': '¿Por Qué Elegir BizForge?',
        'info-ai-title': 'Herramientas Potenciadas por IA',
        'info-ai-desc': 'Aprovecha modelos de IA de vanguardia para resultados profesionales',
        'info-instant-title': 'Resultados Instantáneos',
        'info-instant-desc': 'Obtén tus activos de marca generados en segundos, no días',
        'info-multilingual-title': 'Soporte Multilingüe',
        'info-multilingual-desc': 'Trabaja en tu idioma preferido con soporte global',
        'info-voice-title': 'Entrada de Voz',
        'info-voice-desc': 'Usa comandos de voz para creación de marca sin manos',
        'info-professional-title': 'Salida Profesional',
        'info-professional-desc': 'Calidad de nivel empresarial adecuada para cualquier negocio'
    },
    fr: {
        'hero-title': 'Transformez Votre Marque avec l\'IA',
        'hero-subtitle': 'Générez des noms de marque, logos, contenu marketing et systèmes de design en secondes',
        'cta-button': 'Commencer',
        'features-title': 'Fonctionnalités IA Puissantes',
        'feature-brand-title': 'Noms de Marque',
        'feature-brand-desc': 'Générez des noms de marque uniques et mémorables adaptés à votre industrie et ton',
        'feature-logo-title': 'Générateur de Logo',
        'feature-logo-desc': 'Créez des prompts de logo professionnels alimentés par l\'IA pour une identité visuelle époustouflante',
        'feature-content-title': 'Contenu Marketing',
        'feature-content-desc': 'Générez des descriptions de produits, légendes et copies publicitaires instantanément',
        'feature-design-title': 'Système de Design',
        'feature-design-desc': 'Obtenez des palettes de couleurs cohésives et des directives de design pour votre marque',
        'feature-sentiment-title': 'Analyse de Sentiment',
        'feature-sentiment-desc': 'Analysez les avis clients et obtenez des réponses améliorées et professionnelles',
        'feature-chat-title': 'Chat de Marque',
        'feature-chat-desc': 'Obtenez une consultation IA experte sur toutes vos questions de marque',
        'why-choose-title': 'Pourquoi Choisir BizForge?',
        'info-ai-title': 'Outils Alimentés par l\'IA',
        'info-ai-desc': 'Tirez parti des modèles d\'IA de pointe pour des résultats professionnels',
        'info-instant-title': 'Résultats Instantanés',
        'info-instant-desc': 'Obtenez vos actifs de marque générés en secondes, pas en jours',
        'info-multilingual-title': 'Support Multilingue',
        'info-multilingual-desc': 'Travaillez dans votre langue préférée avec un support mondial',
        'info-voice-title': 'Entrée Vocale',
        'info-voice-desc': 'Utilisez des commandes vocales pour la création de marque mains libres',
        'info-professional-title': 'Sortie Professionnelle',
        'info-professional-desc': 'Qualité de niveau entreprise adaptée à toute entreprise'
    },
    de: {
        'hero-title': 'Transformieren Sie Ihre Marke mit KI',
        'hero-subtitle': 'Generieren Sie beeindruckende Markennamen, Logos, Marketinginhalte und Designsysteme in Sekunden',
        'cta-button': 'Loslegen',
        'features-title': 'Leistungsstarke KI-Funktionen',
        'feature-brand-title': 'Markennamen',
        'feature-brand-desc': 'Generieren Sie einzigartige, einprägsame Markennamen, die auf Ihre Branche und Ihren Ton zugeschnitten sind',
        'feature-logo-title': 'Logo-Generator',
        'feature-logo-desc': 'Erstellen Sie professionelle Logo-Prompts mit KI für eine atemberaubende visuelle Identität',
        'feature-content-title': 'Marketing-Inhalt',
        'feature-content-desc': 'Generieren Sie sofort ansprechende Produktbeschreibungen, Bildunterschriften und Werbetexte',
        'feature-design-title': 'Designsystem',
        'feature-design-desc': 'Erhalten Sie kohäsive Farbpaletten und Designrichtlinien für Ihre Marke',
        'feature-sentiment-title': 'Stimmungsanalyse',
        'feature-sentiment-desc': 'Analysieren Sie Kundenbewertungen und erhalten Sie verbesserte, professionelle Antworten',
        'feature-chat-title': 'Branding-Chat',
        'feature-chat-desc': 'Erhalten Sie fachmännische KI-Beratung zu allen Ihren Branding-Fragen',
        'why-choose-title': 'Warum BizForge Wählen?',
        'info-ai-title': 'KI-Gestützte Tools',
        'info-ai-desc': 'Nutzen Sie modernste KI-Modelle für professionelle Ergebnisse',
        'info-instant-title': 'Sofortige Ergebnisse',
        'info-instant-desc': 'Lassen Sie Ihre Marken-Assets in Sekunden generieren, nicht in Tagen',
        'info-multilingual-title': 'Mehrsprachige Unterstützung',
        'info-multilingual-desc': 'Arbeiten Sie in Ihrer bevorzugten Sprache mit globalem Support',
        'info-voice-title': 'Spracheingabe',
        'info-voice-desc': 'Verwenden Sie Sprachbefehle für freihändige Markenerstellung',
        'info-professional-title': 'Professionelle Ausgabe',
        'info-professional-desc': 'Unternehmensqualität für jedes Unternehmen geeignet'
    },
    hi: {
        'hero-title': 'AI के साथ अपने ब्रांड को बदलें',
        'hero-subtitle': 'सेकंडों में शानदार ब्रांड नाम, लोगो, मार्केटिंग सामग्री और डिज़ाइन सिस्टम बनाएं',
        'cta-button': 'शुरू करें',
        'features-title': 'शक्तिशाली AI सुविधाएं',
        'feature-brand-title': 'ब्रांड नाम',
        'feature-brand-desc': 'अपने उद्योग और टोन के अनुरूप अद्वितीय, यादगार ब्रांड नाम उत्पन्न करें',
        'feature-logo-title': 'लोगो जनरेटर',
        'feature-logo-desc': 'आश्चर्यजनक दृश्य पहचान के लिए AI द्वारा संचालित पेशेवर लोगो प्रॉम्प्ट बनाएं',
        'feature-content-title': 'मार्केटिंग सामग्री',
        'feature-content-desc': 'तुरंत आकर्षक उत्पाद विवरण, कैप्शन और विज्ञापन कॉपी उत्पन्न करें',
        'feature-design-title': 'डिज़ाइन सिस्टम',
        'feature-design-desc': 'अपने ब्रांड के लिए सामंजस्यपूर्ण रंग पैलेट और डिज़ाइन दिशानिर्देश प्राप्त करें',
        'feature-sentiment-title': 'भावना विश्लेषण',
        'feature-sentiment-desc': 'ग्राहक समीक्षाओं का विश्लेषण करें और बेहतर, पेशेवर प्रतिक्रियाएं प्राप्त करें',
        'feature-chat-title': 'ब्रांडिंग चैट',
        'feature-chat-desc': 'अपने सभी ब्रांडिंग प्रश्नों पर विशेषज्ञ AI परामर्श प्राप्त करें',
        'why-choose-title': 'BizForge क्यों चुनें?',
        'info-ai-title': 'AI-संचालित उपकरण',
        'info-ai-desc': 'पेशेवर परिणामों के लिए अत्याधुनिक AI मॉडल का लाभ उठाएं',
        'info-instant-title': 'तत्काल परिणाम',
        'info-instant-desc': 'अपनी ब्रांडिंग संपत्ति सेकंडों में उत्पन्न करें, दिनों में नहीं',
        'info-multilingual-title': 'बहुभाषी समर्थन',
        'info-multilingual-desc': 'वैश्विक समर्थन के साथ अपनी पसंदीदा भाषा में काम करें',
        'info-voice-title': 'वॉयस इनपुट',
        'info-voice-desc': 'हैंड्स-फ्री ब्रांड निर्माण के लिए वॉयस कमांड का उपयोग करें',
        'info-professional-title': 'पेशेवर आउटपुट',
        'info-professional-desc': 'किसी भी व्यवसाय के लिए उपयुक्त उद्यम-ग्रेड गुणवत्ता'
    }
};

// Change language
function changeLanguage(lang) {
    localStorage.setItem('language', lang);

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// =================================
// TAB NAVIGATION (Dashboard)
// =================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0) return; // Not on dashboard page

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const activeTab = document.getElementById(`${tabName}-tab`);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });
}

// =================================
// BRAND NAME GENERATOR
// =================================

function initBrandGenerator() {
    const generateBtn = document.getElementById('generateBrandBtn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', async () => {
        const keywords = document.getElementById('brandKeywords').value.trim();
        const industry = document.getElementById('brandIndustry').value;
        const tone = document.getElementById('brandTone').value;
        const outputDiv = document.getElementById('brandOutput');

        if (!keywords) {
            outputDiv.innerHTML = '<div class="error-message">Please enter keywords</div>';
            return;
        }

        // Show loading
        generateBtn.disabled = true;
        outputDiv.innerHTML = '<div class="loading-text"><span class="loading"></span> Generating brand names...</div>';

        try {
            const result = await generateBrandNames(keywords, industry, tone);

            // Display results
            let html = '<h3>Generated Brand Names:</h3><ul>';

            if (result.brand_names && Array.isArray(result.brand_names)) {
                result.brand_names.forEach(name => {
                    html += `<li>${name}</li>`;
                });
                html += '</ul>';
            } else if (result.response) {
                // Parse Markdown
                html += `<div class="markdown-content">${marked.parse(result.response)}</div>`;
            }

            outputDiv.innerHTML = html;
        } catch (error) {
            outputDiv.innerHTML = `<div class="error-message">Error: ${error.message}. Make sure the backend is running.</div>`;
        } finally {
            generateBtn.disabled = false;
        }
    });
}

// =================================
// LOGO GENERATOR
// =================================

function initLogoGenerator() {
    const generateBtn = document.getElementById('generateLogoBtn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', async () => {
        const brandName = document.getElementById('logoName').value.trim();
        const industry = document.getElementById('logoIndustry').value.trim();
        const keywords = document.getElementById('logoKeywords').value.trim();
        const outputDiv = document.getElementById('logoOutput');

        if (!brandName || !industry || !keywords) {
            outputDiv.innerHTML = '<div class="error-message">Please fill in all fields</div>';
            return;
        }

        // Show loading
        generateBtn.disabled = true;
        outputDiv.innerHTML = '<div class="loading-text"><span class="loading"></span> Generating logo prompt...</div>';

        try {
            const result = await generateLogo(brandName, industry, keywords);

            // Display results
            let html = '<h3>Your Generated Logo:</h3>';

            if (result.image_url) {
                window.currentLogoUrl = result.image_url;
                html += `<div class="logo-preview" style="text-align: center; margin-bottom: 20px;">
                    <img id="currentLogoImage" src="${result.image_url}" 
                         alt="Generated Logo" 
                         style="max-width: 100%; max-height: 400px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                </div>`;
                html += `<div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-top: 20px; border: 1px solid rgba(255,255,255,0.1);">
                    <h4 style="margin: 0 0 15px 0; color: #fff;">🎨 Edit with AI</h4>
                    <p style="color: #aaa; margin-bottom: 15px; font-size: 14px;">Describe changes: "make background blue", "add coffee cup", "make minimalist"</p>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <input type="text" id="editPromptInput" placeholder="Describe your edit..." style="flex: 1; min-width: 200px; padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: #fff;">
                        <select id="editStrength" style="padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: #1a1a2e; color: #fff;"><option value="0.5">Subtle</option><option value="0.7" selected>Normal</option><option value="0.9">Major</option></select>
                        <button id="applyEditBtn" style="background: linear-gradient(135deg, #9333ea, #7c3aed); padding: 12px 24px; border-radius: 8px; border: none; color: #fff; cursor: pointer; font-weight: 600;">✨ Apply Edit</button>
                    </div>
                    <div id="editStatus" style="margin-top: 10px; color: #aaa; font-size: 13px;"></div>
                </div>`;
                populateMockups(result.image_url, brandName);
            } else {
                html += '<p>No image generated.</p>';
            }
            outputDiv.innerHTML = html;
            if (document.getElementById('applyEditBtn')) {
                document.getElementById('applyEditBtn').addEventListener('click', handleLogoEdit);
            }
        } catch (error) {
            outputDiv.innerHTML = `<div class="error-message">Error: ${error.message}. Make sure the backend is running.</div>`;
        } finally {
            generateBtn.disabled = false;
        }
    });
}

// Handle AI logo editing
async function handleLogoEdit() {
    const editPrompt = document.getElementById('editPromptInput').value.trim();
    const editStrength = document.getElementById('editStrength').value;
    const editStatus = document.getElementById('editStatus');
    const applyEditBtn = document.getElementById('applyEditBtn');
    const currentLogoImage = document.getElementById('currentLogoImage');

    if (!editPrompt) { editStatus.innerHTML = '<span style="color:#ef4444;">Please describe what changes you want.</span>'; return; }
    if (!window.currentLogoUrl) { editStatus.innerHTML = '<span style="color:#ef4444;">No logo to edit.</span>'; return; }

    let imageBase64 = window.currentLogoUrl.startsWith('data:') ? window.currentLogoUrl.split(',')[1] : window.currentLogoUrl;

    try {
        applyEditBtn.disabled = true;
        applyEditBtn.textContent = '⏳ Editing...';
        editStatus.innerHTML = '<span class="loading"></span> AI is editing your logo...';

        const result = await editLogo(imageBase64, editPrompt, parseFloat(editStrength));

        if (result.success && result.image_url) {
            currentLogoImage.src = result.image_url;
            window.currentLogoUrl = result.image_url;
            const brandName = (document.getElementById('logoBrandName') || document.getElementById('brandName') || {}).value || 'Brand';
            populateMockups(result.image_url, brandName);
            editStatus.innerHTML = `<span style="color:#22c55e;">✓ Applied: "${result.edit_applied}"</span>`;
            document.getElementById('editPromptInput').value = '';
        } else {
            editStatus.innerHTML = '<span style="color:#ef4444;">Edit failed. Please try again.</span>';
        }
    } catch (error) {
        editStatus.innerHTML = `<span style="color:#ef4444;">Error: ${error.message}</span>`;
    } finally {
        applyEditBtn.disabled = false;
        applyEditBtn.textContent = '✨ Apply Edit';
    }
}

// Populate merchandise mockups with logo
function populateMockups(logoUrl, brandName) {
    const mockupContainer = document.getElementById('mockupPreviews');
    if (!mockupContainer) return;

    // Show the mockup container
    mockupContainer.style.display = 'block';

    // Business card logo
    const businessCardLogo = document.getElementById('businessCardLogo');
    if (businessCardLogo) {
        businessCardLogo.style.backgroundImage = `url('${logoUrl}')`;
    }

    // Update brand name on card
    const cardBrandName = document.getElementById('cardBrandName');
    if (cardBrandName) {
        cardBrandName.textContent = brandName;
    }

    // Signage logo
    const signageLogo = document.getElementById('signageLogo');
    if (signageLogo) {
        signageLogo.style.backgroundImage = `url('${logoUrl}')`;
    }
}


// =================================
// CONTENT GENERATOR
// =================================

function initContentGenerator() {
    const generateBtn = document.getElementById('generateContentBtn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', async () => {
        const brandName = document.getElementById('contentBrandName').value.trim();
        const description = document.getElementById('contentDescription').value.trim();
        const tone = document.getElementById('contentTone').value;
        const contentType = document.getElementById('contentType').value;
        const outputDiv = document.getElementById('contentOutput');

        if (!brandName || !description) {
            outputDiv.innerHTML = '<div class="error-message">Please enter brand name and description</div>';
            return;
        }

        // Show loading
        generateBtn.disabled = true;
        outputDiv.innerHTML = '<div class="loading-text"><span class="loading"></span> Generating content...</div>';

        try {
            const result = await generateContent(brandName, description, tone, contentType);

            // Display results
            let html = '<h3>Generated Content:</h3>';

            if (result.content) {
                html += `<div class="markdown-content">${marked.parse(result.content)}</div>`;
                // Populate social previews
                populateSocialPreviews(brandName, result.content);
            } else if (result.response) {
                html += `<div class="markdown-content">${marked.parse(result.response)}</div>`;
                populateSocialPreviews(brandName, result.response);
            }

            outputDiv.innerHTML = html;
        } catch (error) {
            outputDiv.innerHTML = `<div class="error-message">Error: ${error.message}. Make sure the backend is running.</div>`;
        } finally {
            generateBtn.disabled = false;
        }
    });
}

// Populate social media preview cards
function populateSocialPreviews(brandName, content) {
    const previewContainer = document.getElementById('socialPreviews');
    if (!previewContainer) return;

    // Show the preview container
    previewContainer.style.display = 'block';

    // Get first initial for avatar
    const initial = brandName.charAt(0).toUpperCase();

    // Instagram
    const instaAvatar = document.getElementById('instaAvatar');
    if (instaAvatar) instaAvatar.textContent = initial;

    const instaBrandName = document.getElementById('instaBrandName');
    if (instaBrandName) instaBrandName.textContent = brandName;

    const instaName = document.getElementById('instaName');
    if (instaName) instaName.textContent = brandName;

    const instaCaption = document.getElementById('instaCaption');
    if (instaCaption) {
        // Truncate for Instagram preview (max 125 chars for preview)
        const truncated = content.length > 125 ? content.substring(0, 125) + '... more' : content;
        instaCaption.textContent = truncated;
    }

    // LinkedIn
    const linkedinAvatar = document.getElementById('linkedinAvatar');
    if (linkedinAvatar) linkedinAvatar.textContent = initial;

    const linkedinBrandName = document.getElementById('linkedinBrandName');
    if (linkedinBrandName) linkedinBrandName.textContent = brandName;

    const linkedinCaption = document.getElementById('linkedinCaption');
    if (linkedinCaption) {
        // LinkedIn shows more text
        const truncated = content.length > 300 ? content.substring(0, 300) + '...' : content;
        linkedinCaption.textContent = truncated;
    }
}


// =================================
// DESIGN SYSTEM GENERATOR
// =================================

function initDesignGenerator() {
    const generateBtn = document.getElementById('generateDesignBtn');
    if (!generateBtn) return;

    generateBtn.addEventListener('click', async () => {
        const brandName = document.getElementById('designBrandName').value.trim();
        const tone = document.getElementById('designTone').value.trim();
        const industry = document.getElementById('designIndustry').value.trim();
        const outputDiv = document.getElementById('designOutput');

        if (!brandName || !tone || !industry) {
            outputDiv.innerHTML = '<div class="error-message">Please fill in all fields</div>';
            return;
        }

        // Show loading
        generateBtn.disabled = true;
        outputDiv.innerHTML = '<div class="loading-text"><span class="loading"></span> Generating design system...</div>';

        try {
            const result = await getDesignSystem(brandName, tone, industry);

            // Display results
            let html = '<h3>Design System Recommendations:</h3>';

            if (result.response) {
                html += `<div class="markdown-content">${marked.parse(result.response)}</div>`;
            }

            outputDiv.innerHTML = html;
        } catch (error) {
            outputDiv.innerHTML = `<div class="error-message">Error: ${error.message}. Make sure the backend is running.</div>`;
        } finally {
            generateBtn.disabled = false;
        }
    });
}

// =================================
// SENTIMENT ANALYZER
// =================================

function initSentimentAnalyzer() {
    const analyzeBtn = document.getElementById('analyzeSentimentBtn');
    if (!analyzeBtn) return;

    analyzeBtn.addEventListener('click', async () => {
        const review = document.getElementById('sentimentReview').value.trim();
        const outputDiv = document.getElementById('sentimentOutput');

        if (!review) {
            outputDiv.innerHTML = '<div class="error-message">Please enter a customer review</div>';
            return;
        }

        // Show loading
        analyzeBtn.disabled = true;
        outputDiv.innerHTML = '<div class="loading-text"><span class="loading"></span> Analyzing sentiment...</div>';

        try {
            const result = await analyzeSentiment(review);

            // Display results
            let html = '<div class="sentiment-result">';

            if (result.sentiment) {
                const sentimentClass = result.sentiment.toLowerCase();
                html += `<span class="sentiment-badge sentiment-${sentimentClass}">${result.sentiment}</span>`;
            }

            if (result.confidence) {
                html += `<p><strong>Confidence:</strong> ${(result.confidence * 100).toFixed(2)}%</p>`;
            }

            html += '</div>';

            if (result.improved_review) {
                html += `<h3>Improved Review:</h3><p>${result.improved_review}</p>`;
            } else if (result.response) {
                html += `<h3>Analysis:</h3><div class="markdown-content">${marked.parse(result.response)}</div>`;
            }

            outputDiv.innerHTML = html;
        } catch (error) {
            outputDiv.innerHTML = `<div class="error-message">Error: ${error.message}. Make sure the backend is running.</div>`;
        } finally {
            analyzeBtn.disabled = false;
        }
    });
}

// =================================
// AI CHAT
// =================================

function initChat() {
    const sendBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');

    if (!sendBtn || !chatInput || !chatMessages) return;

    // Handle send button click
    sendBtn.addEventListener('click', sendMessage);

    // Handle Enter key press
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = chatInput.value.trim();

        if (!message) return;

        // Add user message to chat
        addChatMessage('user', message);

        // Clear input
        chatInput.value = '';

        // Disable send button
        sendBtn.disabled = true;

        // Add loading indicator
        const loadingId = 'loading-' + Date.now();
        addChatMessage('assistant', '<span class="loading"></span> Thinking...', loadingId);

        try {
            const result = await chatWithAI(message);

            // Remove loading message
            const loadingMsg = document.getElementById(loadingId);
            if (loadingMsg) {
                loadingMsg.remove();
            }

            // Add AI response
            if (result.response) {
                addChatMessage('assistant', marked.parse(result.response));
            }
        } catch (error) {
            // Remove loading message
            const loadingMsg = document.getElementById(loadingId);
            if (loadingMsg) {
                loadingMsg.remove();
            }

            addChatMessage('assistant', `Error: ${error.message}. Make sure the backend is running.`);
        } finally {
            sendBtn.disabled = false;
            chatInput.focus();
        }
    }

    function addChatMessage(role, content, id = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;
        if (id) messageDiv.id = id;

        const roleLabel = role === 'user' ? 'You' : 'AI Assistant';
        messageDiv.innerHTML = `<strong>${roleLabel}:</strong> ${content}`;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// =================================
// EVENT LISTENERS
// =================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Language selector
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        const savedLanguage = localStorage.getItem('language') || 'en';
        languageSelector.value = savedLanguage;
        changeLanguage(savedLanguage);

        languageSelector.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }

    // Get Started button (index.html)
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'branding.html';
        });
    }

    // Initialize dashboard features (branding.html)
    initTabs();
    initBrandGenerator();
    initLogoGenerator();
    initContentGenerator();
    initDesignGenerator();
    initSentimentAnalyzer();
    initChat();
});
