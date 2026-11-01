export type IndustryCategory =
  | "dental_health"
  | "home_services"
  | "fitness_wellness"
  | "pet_care"
  | "professional_legal_finance"
  | "beauty_wellness"
  | "education"
  | "retail_boutique"
  | "food_hospitality"
  | "general_service";

export interface ChannelTemplate {
  type: string;
  titles: string[];
  ideas: string[];
}

export function getIndustryCategory(
  industry?: string,
  whatYouSell?: string,
  businessName?: string
): IndustryCategory {
  const text = `${industry || ""} ${whatYouSell || ""} ${businessName || ""}`.toLowerCase();

  if (text.match(/dent|teeth|smile|clinic|health|medical|doctor|ortho|chiro|therapy|hygiene|patient/)) {
    return "dental_health";
  }
  if (text.match(/roof|solar|plumb|contract|construct|hvac|electric|home service|landscap|remodel|gutter|paint|handyman/)) {
    return "home_services";
  }
  if (text.match(/fit|gym|coach|train|workout|strength|pilates|yoga|crossfit|athletic|martial/)) {
    return "fitness_wellness";
  }
  if (text.match(/pet|dog|cat|groom|veterin|paw|animal|pup/)) {
    return "pet_care";
  }
  if (text.match(/finan|account|wealth|tax|advis|invest|legal|law|attorney|consult|cpa|bookkeep/)) {
    return "professional_legal_finance";
  }
  if (text.match(/spa|facial|skin|beauty|salon|esthetic|lash|hair|cosmetic|massage|glow/)) {
    return "beauty_wellness";
  }
  if (text.match(/school|stem|teach|robot|enrich|tutor|class|course|kid|child|camp|academy|learn/)) {
    return "education";
  }
  if (text.match(/plant|garden|boutique|retail|shop|cloth|store|apparel|flower|nursery|decor/)) {
    return "retail_boutique";
  }
  if (text.match(/baker|cafe|coffee|restaurant|food|brew|kitchen|dining|bistro|culinary|croissant|pastry|pizza|menu/)) {
    return "food_hospitality";
  }

  return "general_service";
}

export function getCalendarTemplates(
  category: IndustryCategory,
  businessName = "Our Business"
): Record<string, ChannelTemplate> {
  switch (category) {
    case "dental_health":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Smile Transformation Spotlight",
            "Behind the Scenes: Modern Tech & Comfort",
            "Overcoming Dental Anxiety Tips",
            "Meet Your Friendly Care Team",
          ],
          ideas: [
            `Showcase a real smile transformation at ${businessName} with patient quotes on gentle care.`,
            `Take followers on a 30-second tour of our calming amenities, modern digital imaging, and zero-pain approach.`,
            `Share 3 quick, everyday habits for keeping teeth bright and enamel strong between routine cleanings.`,
            `Highlight our passionate hygienists and doctors sharing why patient comfort always comes first.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Patient Story of the Week",
            "Family Prevention & Oral Health Guide",
            "Neighborhood Dental Q&A",
            "New Patient Welcome Special",
          ],
          ideas: [
            `Share a heartwarming review from a local family about their anxiety-free routine checkup at ${businessName}.`,
            `Helpful guide breaking down why preventative cleanings save families time and money long-term.`,
            `Answering the top question parents ask our team about pediatric care and comfortable appointments.`,
            `Announce our introductory welcome examination and complimentary teeth whitening consultation.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Your Smile Wellness & Prevention Checklist",
            "Exclusive Patient Appreciation Perk",
            "Is It Time for Your Biannual Cleaning?",
            "A Personal Note From Our Dental Team",
          ],
          ideas: [
            `Remind patients to utilize their annual dental insurance benefits before they expire.`,
            `Offer a special teeth whitening or family checkup voucher for our loyal community.`,
            `Friendly check-in outlining the key signs it's time to refresh your routine dental checkup.`,
            `Warm update sharing our practice's latest comfort technology and tips for stress-free visits.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Gentle Family Dentistry & Cleanings",
            "New Patient Smile Special & Exam",
            "Painless Cosmetic Dentistry & Aligners",
          ],
          ideas: [
            `Target local searches for gentle family dentist, emergency care, and tooth cleanings nearby.`,
            `Promote introductory new patient examination and cleaning packages within 10 miles.`,
            `Capture high-intent searches for clear aligners, teeth whitening, and cosmetic smile consultations.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Dental Myths Debunked in 30 Seconds", "Day in the Life at Our Dental Studio"],
          ideas: [
            `Fun, fast-paced video showing what teeth whitening hacks actually work vs. what damages enamel.`,
            `Soothing sensory video showing our modern dental clinic setup and anxiety-free patient perks.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Investing in Modern Patient Comfort Technology", "Why Oral Health Matters for Busy Professionals"],
          ideas: [
            `Discussing how advanced diagnostic tools reduce chair time and improve patient outcomes at ${businessName}.`,
            `Helpful post on maintaining oral health and stress-reduction habits during hectic work weeks.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Complete Guide to Painless Modern Dentistry", "Clear Aligners vs. Traditional Braces"],
          ideas: [
            `Detailed patient guide explaining how ultrasonic instruments and gentle care eliminate dental anxiety.`,
            `In-depth comparison of smile straightening options to help patients choose the right solution.`,
          ],
        },
      };

    case "home_services":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Jobsite Transformation Before & After",
            "Behind the Scenes: Crew in Action",
            "Pro Homeowner Maintenance Tip",
            "Project Walkthrough & Quality Spotlight",
          ],
          ideas: [
            `Dramatic aerial or before-and-after footage of a complete residential project by ${businessName}.`,
            `High-energy timelapse showing precision craftsmanship, safety standards, and clean worksites.`,
            `Quick 30-second inspection checklist to identify hidden damage or seasonal wear on your home.`,
            `Walkthrough with our lead technician explaining durable materials and lifetime warranties.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Customer Home Transformation Story",
            "Local Neighborhood Project Feature",
            "Seasonal Weather Preparedness Checklist",
            "Free Home Inspection Special",
          ],
          ideas: [
            `Share a verified homeowner review praising timely completion, honest pricing, and spotless cleanup.`,
            `Showcase a recently completed project in the local area to build neighborhood trust.`,
            `Helpful guide on stormproofing, energy efficiency rebates, or routine equipment maintenance.`,
            `Invite local homeowners to claim a complimentary multi-point safety and efficiency inspection.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Seasonal Home Protection & Efficiency Guide",
            "Exclusive Neighborhood Installation Perk",
            "How to Maximize Your Energy & Utility Savings",
            "A Message From Our Founder & Crew",
          ],
          ideas: [
            `Actionable maintenance checklist to safeguard your home against seasonal weather extremes.`,
            `Special seasonal discount for homeowners booking their project this month with ${businessName}.`,
            `Breakdown of tax credits, utility savings, and warranty protection on new upgrades.`,
            `Sharing our company's dedication to honest quotes, licensed work, and community service.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Licensed Local Installation & Repair",
            "Free Multi-Point Home Inspection",
            "Fast Emergency Repairs & Estimates",
          ],
          ideas: [
            `Target homeowners actively searching for licensed, insured local contractors and installers.`,
            `Promote free on-site estimates and zero-pressure inspections within the service radius.`,
            `Capture emergency repair and storm damage keyword searches with fast response guarantees.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Satisfying Worksite Timelapse", "Contractor Mistake You Must Avoid"],
          ideas: [
            `Mesmerizing timelapse of seamless installation and clean finished work.`,
            `Quick video revealing common low-quality contractor shortcuts and how ${businessName} does it right.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Quality Standards in Modern Contracting", "Investing in Sustainable Infrastructure"],
          ideas: [
            `Thought leadership on training certified tradespeople and maintaining OSHA safety standards.`,
            `Case study on energy-efficient building materials and long-term property valuation.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Ultimate Homeowner's Guide to Property Upgrades", "How to Spot Storm Damage Before Leaks Start"],
          ideas: [
            `Comprehensive guide comparing installation materials, longevity, and investment returns.`,
            `Step-by-step inspection guide helping homeowners document wear and file insurance claims.`,
          ],
        },
      };

    case "fitness_wellness":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Member Transformation & Milestone",
            "3 Form Mistakes to Avoid Today",
            "Coach Breakdown & Technique",
            "Behind the Daily Workout Energy",
          ],
          ideas: [
            `Celebrate a member's milestone with an inspiring quote on consistency and feeling strong at ${businessName}.`,
            `Quick demonstration showing how a small adjustment in posture unlocks better results and prevents injury.`,
            `Coach explanation of why progressive training beats guessing every time you work out.`,
            `High-energy video capturing the supportive, welcoming team atmosphere in our studio.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Member Success Story of the Week",
            "Nutrition & Sustainable Habit Guide",
            "Beginner Workshop Announcement",
            "14-Day Kickstart Challenge Invite",
          ],
          ideas: [
            `Spotlight a member who balanced busy family life and regained their strength and energy.`,
            `Actionable tips for protein intake, hydration, and sleep to fuel your busy routine.`,
            `Announce our upcoming beginner-friendly fundamentals clinic at ${businessName}.`,
            `Invite local residents to join our coached 14-day kickstart challenge.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Your Weekly Training & Nutrition Blueprint",
            "Bring a Friend Free Week Perk",
            "Overcoming Fitness Plateaus",
            "Coach Update & Member Wins",
          ],
          ideas: [
            `Weekly motivation and actionable recovery tips from our coaching team.`,
            `Special invitation for subscribers to bring a workout partner free all next week.`,
            `How to stay consistent and maintain momentum when life gets busy.`,
            `Celebrating community milestones and previewing next week's workout schedule.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Top-Rated Personal & Small Group Training",
            "Start Your 14-Day Trial Today",
            "Personalized Fitness & Nutrition Coaching",
          ],
          ideas: [
            `Target local searches for personal trainer, gym membership, and fitness classes.`,
            `Promote an introductory consultation or low-risk trial pass at ${businessName}.`,
            `Capture searches for strength conditioning and weight loss programs nearby.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Fix Your Squat Form in 15s", "Gym Myths That Hold You Back"],
          ideas: [
            `Punchy side-by-side clip showing proper vs improper movement mechanics.`,
            `Quick debunking of crash diets and extreme cardio routines in favor of sustainable strength.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Health & Performance for High Achievers", "Building Healthy Workplace Habits"],
          ideas: [
            `Article on how consistent strength training enhances mental clarity and executive performance.`,
            `Tips for busy professionals to fit purposeful movement into packed schedules.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Science of Sustainable Strength Training", "How to Build a Workout Habit That Lasts"],
          ideas: [
            `Deep dive into progressive overload, rest intervals, and muscle retention for longevity.`,
            `Practical habit-stacking strategies to stay consistent with fitness year-round.`,
          ],
        },
      };

    case "pet_care":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Puppy Spa Day Transformation",
            "Gentle Coat Health & Brushing Tips",
            "Behind the Grooming Table",
            "Pet of the Week Spotlight",
          ],
          ideas: [
            `Satisfying before-and-after fluffy groom video with soothing music at ${businessName}.`,
            `Pro groomer tip on preventing matting and keeping ears clean between appointments.`,
            `Showcase our quiet, stress-free handling methods and organic shampoo bar.`,
            `Feature an adorable regular pet with their quirky personality traits.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Happy Pup Story of the Week",
            "Seasonal Pet Care & Paw Health",
            "Meet Our Gentle Stylists",
            "New Client First Pampering Special",
          ],
          ideas: [
            `Share pet parent review praising the calm, fear-free atmosphere at ${businessName}.`,
            `Advice on seasonal shedding, paw protection, and skin allergy relief for pets.`,
            `Intro post spotlighting our certified pet groomers and their gentle handling philosophy.`,
            `Special introductory perk for first-time dog grooming or spa bath packages.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Pamper Your Pup: Coat Care Guide",
            "Upcoming Holiday Booking Reminder",
            "Stress-Free Grooming Secrets",
            "A Note From Our Head Stylist",
          ],
          ideas: [
            `Tips to maintain a soft, tangle-free coat at home between professional visits.`,
            `Friendly reminder that weekend appointments fill fast—book ahead for your pet.`,
            `How cage-free drying and low-stress techniques make grooming enjoyable for pets.`,
            `Updates on our seasonal scented shampoo treatments and spa upgrades at ${businessName}.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Stress-Free Dog Grooming & Spa",
            "Gentle Certified Pet Stylists",
            "Book Your Pup's Pampering",
          ],
          ideas: [
            `Target pet owners searching for local dog grooming, bathing, and nail trims.`,
            `Highlight cage-free, organic products, and gentle handling differentiators at ${businessName}.`,
            `Capture high-intent searches for top-rated pet spas nearby.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Dog Spa ASMR Bath Time", "Crazy Fluffy Groom Transformation"],
          ideas: [
            `Gentle ASMR video showing warm water rinsing, bubbles, and blow-drying fluffiness.`,
            `Upbeat before-and-after reveal of an overgrown pup leaving like a superstar.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Pet Wellness Industry Standards", "The Importance of Stress-Free Pet Care"],
          ideas: [
            `Discussion on animal behavioral handling and stress reduction protocols in modern pet services.`,
            `Highlights of our team's ongoing pet first-aid certification and professional training.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["How to Keep Your Dog Calm During Grooming", "The Ultimate Guide to Canine Coat Care"],
          ideas: [
            `Expert advice on desensitizing pets to grooming tools and establishing trust.`,
            `Breed-specific breakdown of coat textures, seasonal shedding, and bathing schedules.`,
          ],
        },
      };

    case "professional_legal_finance":
      return {
        Instagram: {
          type: "Carousel / Post",
          titles: [
            "Client Success & Peace of Mind",
            "3 Costly Financial Mistakes to Avoid",
            "Behind Our Advisory Philosophy",
            "Weekly Strategy Breakdown",
          ],
          ideas: [
            `Share how proactive strategy helped a local client protect their assets and reduce risk.`,
            `Visual carousel breaking down common misconceptions about planning or legal protections.`,
            `Discussion on our fiduciary commitment and transparent client-first model at ${businessName}.`,
            `Quick visual explanation of how market volatility is navigated with a disciplined plan.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Family Protection & Planning Story",
            "Upcoming Educational Workshop",
            "Small Business Owner Q&A",
            "Complimentary Strategy Review",
          ],
          ideas: [
            `Explain how proper legal or financial structures preserve family wealth across generations.`,
            `Announce our upcoming free masterclass on retirement readiness or estate succession.`,
            `Answering common questions business founders face during rapid growth and transitions.`,
            `Invite local leaders to book a complimentary 30-minute discovery consultation with ${businessName}.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Your Monthly Strategy & Advisory Brief",
            "Important Upcoming Deadlines",
            "Case Study: Protecting Family Assets",
            "A Note From Our Principal Advisor",
          ],
          ideas: [
            `High-level summary of relevant regulatory trends and smart financial moves for families.`,
            `Action checklist for tax deadlines, compliance filings, or annual plan reviews.`,
            `Detailed walkthrough of a real client scenario and the proactive steps taken.`,
            `Personal reflections on fiduciary integrity and serving our local community.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Trusted Local Fiduciary Advisors",
            "Schedule a Complimentary Consultation",
            "Comprehensive Wealth & Legal Strategy",
          ],
          ideas: [
            `Target business owners and families searching for fee-only advisors or attorneys.`,
            `Promote confidential consultations for estate planning, tax strategy, and retirement.`,
            `Capture local high-intent keyword queries for experienced advisors nearby.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: [
            "Navigating Economic Transitions in 2026",
            "The True Value of Fiduciary Advisory",
          ],
          ideas: [
            `Strategic insights on managing business liquidity, tax mitigation, and capital allocation.`,
            `Explaining why objective, fee-only guidance protects clients from conflicts of interest.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Money Myth You Need to Unlearn", "3 Tax Deductions People Miss"],
          ideas: [
            `Quick breakdown of financial principles that save business owners significant stress.`,
            `High-value educational tips on legal and financial planning presented simply.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Small Business Owner's Roadmap to Succession", "Estate Planning Essentials for Modern Families"],
          ideas: [
            `Step-by-step guide on transitioning a family business smoothly and tax-efficiently.`,
            `In-depth overview of trusts, wills, and asset protection strategies.`,
          ],
        },
      };

    case "beauty_wellness":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Radiant Skin Transformation",
            "Esthetician Secrets for Healthy Glow",
            "Behind the Treatment Room",
            "Client Self-Care Spotlight",
          ],
          ideas: [
            `Showcase client before-and-after skin barrier restoration with soothing audio at ${businessName}.`,
            `Breakdown of the 3 essential daily steps for radiant, hydrated skin without harsh chemicals.`,
            `Sensory reel showing warm towels, botanical masks, and relaxing facial massage rituals.`,
            `Client testimonial sharing how their customized regimen cleared persistent skin concerns.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Client Glow Story of the Week",
            "Seasonal Skincare Transition Guide",
            "Meet Our Master Estheticians",
            "New Client Welcome Special",
          ],
          ideas: [
            `Share a 5-star review about our relaxing atmosphere and visible clinical results at ${businessName}.`,
            `How to adapt your skincare routine for seasonal temperature and humidity changes.`,
            `Spotlight our licensed specialists and their non-toxic, holistic approach.`,
            `Introductory offer: complimentary skin analysis and LED therapy with first facial treatment.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Your Seasonal Glow Blueprint",
            "VIP Booking Access & Monthly Perk",
            "Ingredient Spotlight: Why Natural Works",
            "A Message From Our Founder",
          ],
          ideas: [
            `Curated skincare advice tailored to current seasonal weather stressors.`,
            `Subscribers get priority access to next month's weekend appointments and exclusive gift.`,
            `Educational breakdown of active botanical ingredients and their clinical benefits.`,
            `Personal story on our dedication to clean, non-toxic, transformative skincare at ${businessName}.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Top-Rated Holistic Facials & Spa",
            "Custom Clinical Skincare Treatments",
            "Book Your Glow Facial Today",
          ],
          ideas: [
            `Target local searches for organic facials, skin treatments, and day spas nearby.`,
            `Promote introductory packages for deep cleansing, hydration, and glow.`,
            `Capture searches for targeted acne, anti-aging, and relaxation treatments.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Glass Skin ASMR Facial", "Stop Damaging Your Skin Barrier"],
          ideas: [
            `Relaxing ASMR video of botanical cleanser lathering and lymphatic face rolling.`,
            `Quick warning on over-exfoliation and how to restore moisture balance fast.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Wellness & Self-Care in High-Stress Careers", "Clean Ingredients in Esthetics"],
          ideas: [
            `Why restorative self-care practices prevent burnout for busy corporate professionals.`,
            `Research on clean cosmetic formulation and non-comedogenic organic ingredients.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Ultimate Guide to Skin Barrier Repair", "Holistic vs. Clinical Skincare: Why You Need Both"],
          ideas: [
            `Comprehensive guide on identifying compromised skin and restoring hydration naturally.`,
            `Explaining how organic botanicals and modern clinical modalities work in harmony.`,
          ],
        },
      };

    case "education":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Student Project in Action",
            "Why Hands-On Learning Wins",
            "Instructor Spotlight & Fun Facts",
            "Classroom Energy & Excitement",
          ],
          ideas: [
            `Watch students test their custom projects with genuine excitement at ${businessName}.`,
            `Quick video showing how experiential learning sparks long-term problem-solving skills.`,
            `Meet our passionate instructors and their real-world industry background.`,
            `Behind-the-scenes look at our engaging weekend teamwork challenges.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Student Breakthrough of the Week",
            "Parent Guide: Cultivating Curiosity",
            "Upcoming Workshop & Camp Dates",
            "Complimentary Trial Class Invite",
          ],
          ideas: [
            `Share an inspiring story of a student who gained confidence and creative problem-solving skills.`,
            `Helpful tips for parents on fostering curiosity and critical thinking at home.`,
            `Announce open enrollment dates and early-bird discounts for upcoming terms at ${businessName}.`,
            `Invite local families to experience a free introductory discovery workshop.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Upcoming Term Registration & Early Bird Perks",
            "Student Achievements of the Month",
            "Fun Brain Teasers for the Family",
            "Director's Note on Future Skills",
          ],
          ideas: [
            `Priority registration access for enrolled families before public registration opens.`,
            `Highlighting exceptional student projects and achievements at ${businessName}.`,
            `Engaging at-home activities to keep young minds active over the weekend.`,
            `Discussion on preparing the next generation with confidence and problem-solving skills.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Top-Rated STEM & Enrichment for Kids",
            "Hands-On Engineering & Tech Camps",
            "Free Trial Class: Enroll Today",
          ],
          ideas: [
            `Target parents searching for after-school enrichment, clubs, and camps.`,
            `Promote free introductory trial sessions to build trust and enrollment at ${businessName}.`,
            `Capture searches for youth STEM, robotics, and tutoring in the area.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Kids Building Cool Robots", "STEM Challenge in 30 Seconds"],
          ideas: [
            `Fun clip of young engineers cheering as their robotic build completes an obstacle course.`,
            `Quick interactive brain teaser for curious students and parents.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Preparing Future Tech Leaders", "The Case for Experiential STEM Education"],
          ideas: [
            `Insights on how early coding and engineering exposure builds resilience and logical thinking.`,
            `Partnership opportunities for local schools, tech companies, and community initiatives.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["How Hands-On STEM Builds Resilient Thinkers", "5 Signs Your Child Has an Engineering Mind"],
          ideas: [
            `In-depth analysis of why project-based learning outperforms passive memorization.`,
            `Parent guide to recognizing spatial reasoning, curiosity, and technical aptitude.`,
          ],
        },
      };

    case "retail_boutique":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "New Collection Unboxing",
            "Styling & Care Tips in 30s",
            "Behind the Store Shelves",
            "Customer Favorite Spotlight",
          ],
          ideas: [
            `Showcase this week's newest arrivals with aesthetic unboxing and close-up textures at ${businessName}.`,
            `Quick video showing 3 ways to style or display our best-selling pieces in your space.`,
            `Tour our shop floor highlighting curated displays and small-batch craftsmanship.`,
            `Feature our #1 most requested item with real customer photos and reviews.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Weekend In-Store Event & New Arrivals",
            "Curator's Top 5 Picks",
            "Customer Community Feature",
            "Seasonal Promotion Announcement",
          ],
          ideas: [
            `Invite the neighborhood to our weekend open house with refreshments and discounts.`,
            `Our shop owner shares this week's favorite pieces and why they stand out at ${businessName}.`,
            `Share photos of delighted customers enjoying their purchases in their own spaces.`,
            `Announce special weekend promotions or gift-with-purchase deals.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Just Arrived: Limited New Stock",
            "Exclusive VIP Subscriber Discount",
            "The Weekend Inspiration Guide",
            "A Note From Our Shop Curator",
          ],
          ideas: [
            `First-look preview of exclusive new inventory before it sells out online.`,
            `Enjoy 15% off your next purchase in-store or online with subscriber code.`,
            `Curated gift and styling guide tailored to current seasonal trends.`,
            `Story sharing the artisans and makers behind our newest unique collection at ${businessName}.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Unique Local Specialty Boutique",
            "Shop New Arrivals & Best Sellers",
            "Visit Our Neighborhood Store",
          ],
          ideas: [
            `Target local shoppers looking for unique gifts, boutique fashion, or home goods.`,
            `Promote online ordering with convenient in-store pickup options at ${businessName}.`,
            `Capture searches for sustainable, artisanal, and locally sourced items.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Aesthetic Shop Restock ASMR", "3 Items That Elevate Any Space"],
          ideas: [
            `Satisfying sound and visual flow of unpacking and displaying gorgeous boutique inventory.`,
            `Styling breakdown showing how one standout piece transforms a living room or outfit.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["The Revival of Independent Local Retail", "Curating Sustainable Supply Chains"],
          ideas: [
            `Why hyper-curated local boutique experiences outperform big-box department stores.`,
            `Spotlight on working with ethical independent makers and fair-trade craftspeople.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Art of Thoughtful Home & Lifestyle Curation", "5 Wardrobe & Decor Essentials for the Season"],
          ideas: [
            `Curator's guide to choosing timeless, high-quality pieces that last for years.`,
            `Styling advice blending contemporary accents with warm classic foundations.`,
          ],
        },
      };

    case "food_hospitality":
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Behind-the-Scenes Preparation",
            "Customer Favorite Spotlight",
            "Weekly Recipe Secret & Technique",
            "Weekend Special Preview",
          ],
          ideas: [
            `Capture the morning artisan craft with uplifting music and pure ingredients at ${businessName}.`,
            `Highlight our signature item with customer quotes and glowing smiles.`,
            `A 20-second quick visual tip showing how we achieve crisp perfection.`,
            `High-energy video showing what is coming out of the kitchen this weekend.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Local Event & Gathering Announcement",
            "Customer Story of the Week",
            "Neighborhood Special Hours",
            "Family Pre-Order Package Announcement",
          ],
          ideas: [
            `Share our weekend gathering hours and invite local families to visit ${businessName}.`,
            `Celebrate a longtime regular with a warm photo and kind words.`,
            `Community update with easy parking directions and special morning hours.`,
            `Early reservations for holiday family packages with pick-up times.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "VIP Community Exclusive Perk",
            "Weekend Reservation & Tasting Guide",
            "Seasonal Special Announcement",
            "A Note From Our Founder",
          ],
          ideas: [
            `Reward subscribers with a special 15% VIP code valid through Sunday.`,
            `Curated weekend menu preview with easy click-to-order links at ${businessName}.`,
            `Announce new seasonal flavors arriving this month.`,
            `A warm personal story sharing our passion for wholesome local quality.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Top-Rated Local Artisan Treats",
            "Fresh Daily Morning Pickup Promo",
            "Specialty Weekend Orders",
          ],
          ideas: [
            `Target active searches for artisan food treats within 5-mile radius.`,
            `Target morning commuters looking for fresh breakfast takeout.`,
            `Target event and celebration keyword queries in the local area.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Morning Kitchen Satisfying Prep", "Food Trend Taste Test"],
          ideas: [
            `Hypnotic 15-second ASMR food prep and presentation video.`,
            `Fun trending audio paired with delicious culinary craftsmanship at ${businessName}.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Behind Our Hospitality Small Business", "Why We Choose Local Sourcing"],
          ideas: [
            `Reflections on building a resilient small business rooted in community at ${businessName}.`,
            `Highlighting our local farm suppliers and sustainable practices.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Art of Handcrafted Quality", "A Guide to Sourcing Local Ingredients"],
          ideas: [
            `Educational blog post exploring slow craftsmanship and wholesome ingredients.`,
            `A guide to choosing the best natural flavors for home dining.`,
          ],
        },
      };

    default: // general_service
      return {
        Instagram: {
          type: "Reel / Video",
          titles: [
            "Behind the Scenes with Our Team",
            "Client Success & Five-Star Review",
            "Pro Tip of the Week",
            "Service Quality Spotlight",
          ],
          ideas: [
            `Showcase the care, craftsmanship, and dedication that goes into our daily work at ${businessName}.`,
            `Feature an authentic client review and thank our community for their trust.`,
            `Share a valuable insider tip that saves your customers time, hassle, or money.`,
            `Exciting update on our services, team milestones, or upcoming offerings.`,
          ],
        },
        Facebook: {
          type: "Community Post",
          titles: [
            "Community Spotlight & Appreciation",
            "Client Story of the Week",
            "Frequently Asked Questions Answered",
            "Exclusive Neighborhood Offer",
          ],
          ideas: [
            `Celebrate our local community and the wonderful clients we have the privilege to serve.`,
            `Share a real story of how ${businessName} helped a client solve a major challenge.`,
            `Answer the top questions new customers ask before booking or visiting.`,
            `Announce a special promotion or incentive for our local followers.`,
          ],
        },
        Email: {
          type: "Newsletter",
          titles: [
            "Your Insider Update & Exclusive Perk",
            "3 Tips to Get the Most from Our Services",
            "A Special Message from Our Founder",
            "Upcoming Service Highlights & News",
          ],
          ideas: [
            `Reward our loyal email community with a special VIP discount or booking priority.`,
            `Helpful advice to help customers maximize their results and satisfaction with ${businessName}.`,
            `A warm, personal note sharing our mission, values, and community impact.`,
            `Overview of this month's featured offerings and seasonal updates.`,
          ],
        },
        "Google Ads": {
          type: "Search Ad",
          titles: [
            "Top-Rated Local Service Experts",
            "Get Your Free Quote / Consultation",
            "Trusted Quality & Friendly Care",
          ],
          ideas: [
            `Target high-intent searches for reputable, certified local specialists.`,
            `Promote straightforward pricing, fast response times, and free estimates.`,
            `Highlight 5-star customer ratings and satisfaction guarantees at ${businessName}.`,
          ],
        },
        TikTok: {
          type: "Short Video",
          titles: ["Satisfying Work In Action", "Common Mistake in Our Industry"],
          ideas: [
            `Fast-paced, satisfying clip showing how our team delivers clean, professional results.`,
            `Helpful 15-second tip highlighting what to look for when choosing a reliable provider.`,
          ],
        },
        LinkedIn: {
          type: "Company Update",
          titles: ["Commitment to Client Excellence", "Building Long-Term Trust in Our Industry"],
          ideas: [
            `Sharing the values, standards, and customer-first mindset driving growth at ${businessName}.`,
            `Case study on delivering measurable, reliable results for clients.`,
          ],
        },
        Blog: {
          type: "Article",
          titles: ["The Ultimate Guide to Choosing the Right Service", "How to Get the Best Results and Value"],
          ideas: [
            `Educating clients on the critical questions to ask before hiring a professional.`,
            `Expert guide outlining best practices, timelines, and maintenance tips.`,
          ],
        },
      };
  }
}

export function getIndustryFallback(
  type: "ideas" | "script" | "copy" | "brief",
  category: IndustryCategory,
  businessName = "Our Business",
  whatYouSell = "our quality services",
  title = "Featured Announcement",
  _channel = "Social Media"
): string {
  const bName = businessName;
  const prod = whatYouSell;
  const postTitle = title;

  switch (category) {
    case "dental_health":
      if (type === "ideas") {
        return `1. Patient Smile Journey & Confidence
Highlight a real patient smile makeover or routine cleaning at ${bName}. Showcase the gentle, anxiety-free care and how comfortable modern dental visits feel.

2. Behind the Tech: 30-Second Comfort Tour
A short visual tour of our soothing patient amenities, modern digital imaging, and painless ultrasonic instruments that keep your teeth healthy.

3. 3 Habits to Protect Your Smile Between Visits
Educate followers with 3 simple, dentist-approved habits to prevent enamel wear, freshen breath, and keep your smile shining.`;
      }
      if (type === "script") {
        return `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook / Visual]: Smiling patient relaxing in a modern chair with noise-canceling headphones.
Voiceover: "Still putting off the dentist because of dental anxiety?"
[0:06 - Body]: Doctor gently explaining digital 3D imaging with a warm, caring smile.
Voiceover: "At ${bName}, our gentle care and modern comfort amenities make every visit relaxed and pain-free."
[0:11 - Call to Action]: Clean graphic displaying online booking link.
Voiceover: "Click the link to claim your new patient smile special and book today!"

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "When was the last time you actually looked forward to visiting the dentist?"
[0:07 - Problem / Relatability]: "For too many people, dental visits mean cold waiting rooms, noisy drills, and unnecessary stress."
[0:15 - Solution / Brand]: "At ${bName}, we built our practice differently. From soothing amenities to gentle ultrasonic cleanings and clear aligners, your comfort comes first."
[0:22 - Community Offer]: "Schedule your new patient visit this month and receive a complimentary smile wellness consult."
[0:27 - Final CTA]: "Experience gentle, modern dentistry at ${bName}—book your visit online today!"`;
      }
      if (type === "copy") {
        return `Your smile is the first thing people notice—keep it bright, healthy, and confident! ✨

At ${bName}, we believe dental visits should be relaxing, gentle, and completely stress-free. Whether it's time for your routine preventive cleaning, clear aligners, or a complete smile makeover, our caring team is here to give you the gentle care you deserve.

👉 Tap the link in our bio to book your appointment or claim our new patient welcome special!

#DentalCare #HealthySmile #${bName.replace(/\s+/g, "")} #GentleDentistry #SmileMakeover #OralHealth #LocalDentist`;
      }
      return `CREATIVE BRIEF: ${postTitle}
- Core Objective: Drive new patient appointment bookings and alleviate dental anxiety.
- Target Audience: Local families and adults seeking gentle, modern, pain-free dental care.
- Visual Direction: Bright, warm natural lighting, smiling patients, soothing modern clinic amenities.
- Key Messaging: Pain-free dentistry, compassionate care, state-of-the-art technology at ${bName}.
- Call to Action: Book your new patient examination and cleaning online today.`;

    case "home_services":
      if (type === "ideas") {
        return `1. The High-Impact Drone Transformation
Capture crisp before-and-after footage of a finished residential project by ${bName}. Highlight durable craftsmanship and flawless cleanup.

2. 3 Warning Signs Your Home Needs Attention
A quick educational breakdown showing subtle signs of wear or damage that homeowners often miss before costly emergencies occur.

3. Meet the Certified Crew Behind the Work
Spotlight our licensed technicians on-site sharing why precision installation and safety standards matter for your biggest investment.`;
      }
      if (type === "script") {
        return `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook]: Drone footage swooping over a pristine newly completed installation.
Voiceover: "Thinking about upgrading your home this season?"
[0:06 - Body]: Lead technician inspecting precision fittings and smiling with the homeowner.
Voiceover: "At ${bName}, we deliver licensed, top-tier craftsmanship backed by industry-leading warranties."
[0:11 - Call to Action]: Contact banner overlay.
Voiceover: "Call today or click below for your free on-site estimate!"

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "Your home is your most valuable asset—don't trust it to unlicensed shortcuts."
[0:07 - Problem / Relatability]: "Weather wear, rising energy bills, and aging systems can quietly cost homeowners thousands."
[0:15 - Solution / Brand]: "At ${bName}, we provide licensed, insured upgrades and precision repairs that stand the test of time."
[0:22 - Community Offer]: "Schedule your free multi-point property inspection this week and receive $500 off complete installations."
[0:27 - Final CTA]: "Protect your home with ${bName}—request your free quote now!"`;
      }
      if (type === "copy") {
        return `Upgrade your home with confidence and guaranteed craftsmanship! 🏡⚡

At ${bName}, our licensed specialists specialize in ${prod}. We bring honest pricing, transparent timelines, and spotless cleanups to every neighborhood project.

Ready to increase your property value and lower your monthly energy costs?

📞 Message us or tap the link in our bio to claim your free, no-obligation on-site estimate!

#HomeImprovement #LicensedContractor #${bName.replace(/\s+/g, "")} #QualityCraftsmanship #HomeRenovation #LocalPros`;
      }
      return `CREATIVE BRIEF: ${postTitle}
- Core Objective: Generate qualified homeowner consultation inquiries and estimate requests.
- Target Audience: Local homeowners seeking licensed, reliable contracting and installation.
- Visual Direction: Crisp before-and-after imagery, high-resolution worksite details, clean uniforms.
- Key Messaging: Transparent pricing, lifetime warranty backing, licensed expertise at ${bName}.
- Call to Action: Schedule your free multi-point property inspection today.`;

    case "fitness_wellness":
      if (type === "ideas") {
        return `1. Member Milestone & Strength Transformation
Spotlight a real member celebrating their consistency at ${bName}. Feature their inspiring journey from hesitant beginner to feeling unstoppable.

2. Fix This Common Form Mistake in 30 Seconds
Coach demonstration showing a simple mechanical adjustment that protects joints and maximizes strength gains.

3. The 14-Day Kickstart Challenge Reveal
Tease our upcoming coached community challenge designed to rebuild routine, energy, and sustainable habits.`;
      }
      if (type === "script") {
        return `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook]: Member finishing a strong set with a high-five from the coach.
Voiceover: "Tired of generic gyms where nobody knows your name?"
[0:06 - Body]: Coach providing personalized feedback in an uplifting small-group setting.
Voiceover: "At ${bName}, personalized coaching and real accountability get you results that last."
[0:11 - Call to Action]: Trial offer graphic.
Voiceover: "Claim your 14-day trial pass today—link in bio!"

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "Ready to feel strong, energized, and confident in your own skin again?"
[0:07 - Problem / Relatability]: "Busy schedules, confusing fitness trends, and lack of accountability make staying consistent hard."
[0:15 - Solution / Brand]: "At ${bName}, our expert coaches guide you every step of the way with semi-private strength training and sustainable nutrition habits."
[0:22 - Community Offer]: "Join our upcoming 14-day kickstart challenge and experience the difference true coaching makes."
[0:27 - Final CTA]: "Take the first step at ${bName}—book your free discovery session today!"`;
      }
      if (type === "copy") {
        return `Consistency beats intensity every single time. 💪

At ${bName}, we don't believe in extreme crash diets or aimless workouts. We believe in purposeful strength, personalized coaching, and an uplifting community that cheers you on every step of the way.

Whether you're starting from scratch or looking to break through a fitness plateau, our coaches are ready to help you thrive.

👉 Tap the link in our bio to claim your 14-Day Trial Pass and meet your coaching team!

#FitnessMotivation #StrengthTraining #${bName.replace(/\s+/g, "")} #HealthyHabits #PersonalCoaching #FitnessJourney`;
      }
      return `CREATIVE BRIEF: ${postTitle}
- Core Objective: Drive trial memberships and consultation bookings for personal/group coaching.
- Target Audience: Adults and professionals looking for structured coaching, accountability, and strength.
- Visual Direction: Uplifting gym atmosphere, natural sweat and smiles, coach-client interaction.
- Key Messaging: Personalized coaching, welcoming culture, sustainable lifelong health at ${bName}.
- Call to Action: Claim your introductory 14-day pass today.`;

    case "pet_care":
      if (type === "ideas") {
        return `1. The Fluffy Spa Transformation
Showcase a gentle before-and-after grooming session at ${bName}. Highlight our calm, cage-free environment and pampering organic treatments.

2. Pro Groomer Tip: Matting Prevention & Paw Health
Educate pet parents with simple 2-minute brushing techniques that keep coats silky and prevent painful tangles between salon visits.

3. Meet the Stylists Who Treat Pets Like Family
Spotlight our certified pet stylists sharing their gentle handling philosophy and how they soothe nervous dogs.`;
      }
      if (type === "script") {
        return `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook]: Adorable puppy getting a gentle bubble bath and wagging its tail.
Voiceover: "Does your dog get anxious on grooming day?"
[0:06 - Body]: Stylist gently brushing and hand-drying in a calm, quiet suite.
Voiceover: "At ${bName}, we provide one-on-one, stress-free pampering that pets actually enjoy."
[0:11 - Call to Action]: Booking button overlay.
Voiceover: "Treat your best friend today—book online now!"

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "Your dog deserves the same gentle love and care they give you every day."
[0:07 - Problem / Relatability]: "Crowded grooming salons and loud barking can make regular grooming overwhelming for sensitive pets."
[0:15 - Solution / Brand]: "At ${bName}, our cage-free, certified stylists use organic oatmeal spas and gentle handling to keep your pet relaxed and happy."
[0:22 - Community Offer]: "New clients receive $15 off their dog's first luxury grooming or spa bath package."
[0:27 - Final CTA]: "Pamper your pup with ${bName}—book your appointment online today!"`;
      }
      if (type === "copy") {
        return `Every pup deserves a stress-free spa day! 🐾✨

At ${bName}, we specialize in gentle, one-on-one pet care that leaves your furry family member smelling incredible, looking fabulous, and feeling completely relaxed.

From organic botanical baths to precision scissor styling, we treat every pet with patience and gentle affection.

🐶 Spaces fill up quickly! Tap the link in our bio to book your pup's next spa appointment!

#PetGrooming #DogSpa #${bName.replace(/\s+/g, "")} #PamperedPup #DogLovers #GentleGrooming`;
      }
      return `CREATIVE BRIEF: ${postTitle}
- Core Objective: Fill weekday grooming appointments with high-retention pet parents.
- Target Audience: Dedicated dog and pet owners seeking gentle, fear-free grooming.
- Visual Direction: Cute pups, bubbly baths, soft clean coats, gentle stylist interactions.
- Key Messaging: Low-stress handling, organic products, five-star love and care at ${bName}.
- Call to Action: Book your pet's appointment online today.`;

    default: // universal dynamic fallback
      if (type === "ideas") {
        return `1. Behind-the-Scenes Craftsmanship & Care
Take your audience behind the curtain at ${bName}. Highlight the meticulous attention to detail and dedication that goes into ${prod}.

2. Real Client Problem Solved: The Transformation Story
Share an authentic client case study illustrating the exact pain point they faced and how ${bName} delivered an exceptional outcome.

3. 3 Expert Tips Your Customers Need to Know
Provide actionable, high-value advice related to ${prod} that establishes ${bName} as the trusted local authority in your field.`;
      }
      if (type === "script") {
        return `--- 15-SECOND REEL / HOOK SCRIPT ---
[0:00 - Hook / Visual]: Fast, engaging visual showing our team in action at ${bName}.
Voiceover: "Looking for trusted quality and real results you can count on?"
[0:06 - Body]: Close-up of our precision work and a delighted client.
Voiceover: "At ${bName}, we provide ${prod} with unmatched dedication and care."
[0:11 - Call to Action]: Clean overlay showing website and booking link.
Voiceover: "Discover the difference at ${bName}—reach out today!"

--- 30-SECOND COMMERCIAL SCRIPT ---
[0:00 - Hook]: "When it comes to finding the right partner for your needs, you shouldn't have to compromise."
[0:07 - Relatability]: "Too many providers promise great service but deliver delays, hidden costs, or generic work."
[0:15 - Solution / Brand]: "At ${bName}, our experienced team specializes in ${prod}. We listen closely to your goals and deliver tailored, dependable solutions."
[0:22 - Community Offer]: "Connect with us this month to take advantage of our exclusive seasonal offer."
[0:27 - Final CTA]: "Experience the trusted quality of ${bName}—contact us or visit online today!"`;
      }
      if (type === "copy") {
        return `Quality you can trust, delivered with care right here in our community. 🌟

At ${bName}, we are passionate about providing ${prod}. Whether you're working with us for the first time or returning as a longtime client, our team is committed to delivering five-star results every single time.

Ready to see how we can help you?

👉 Click the link in our bio to learn more or schedule your consultation today!

#LocalBusiness #${bName.replace(/\s+/g, "")} #QualityService #CustomerFirst #CommunitySupport #ShopSmall`;
      }
      return `CREATIVE BRIEF: ${postTitle}
- Core Objective: Generate client interest, inquiries, and engagement for ${bName}.
- Target Audience: Local clients seeking dependable, high-quality ${prod}.
- Visual Direction: Professional, warm, authentic photography/video highlighting quality and teamwork.
- Key Messaging: Dependability, expert care, and transparent service at ${bName}.
- Call to Action: Contact our team or visit our website to get started.`;
  }
}
