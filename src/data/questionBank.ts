import { Question, SubjectId, QuestionCategory } from '../types/exam';

export interface ChapterItem {
  id: string;
  nameBn: string;
  paper: '১ম পত্র' | '২য় পত্র';
}

export const HSC_CHAPTERS: Record<'physics' | 'chemistry' | 'math' | 'biology', ChapterItem[]> = {
  physics: [
    { id: 'phy-c1', nameBn: 'ভৌতজগৎ ও পরিমাপ', paper: '১ম পত্র' },
    { id: 'phy-c2', nameBn: 'ভেক্টর', paper: '১ম পত্র' },
    { id: 'phy-c3', nameBn: 'গতিবিদ্যা', paper: '১ম পত্র' },
    { id: 'phy-c4', nameBn: 'নিউটনিয়ান বলবিদ্যা', paper: '১ম পত্র' },
    { id: 'phy-c5', nameBn: 'কাজ, শক্তি ও ক্ষমতা', paper: '১ম পত্র' },
    { id: 'phy-c6', nameBn: 'মহাকর্ষ ও অভিকর্ষ', paper: '১ম পত্র' },
    { id: 'phy-c7', nameBn: 'পদার্থের গাঠনিক ধর্ম', paper: '১ম পত্র' },
    { id: 'phy-c8', nameBn: 'পর্যাবৃত্ত গতি', paper: '১ম পত্র' },
    { id: 'phy-c9', nameBn: 'তরঙ্গ', paper: '১ম পত্র' },
    { id: 'phy-c10', nameBn: 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব', paper: '১ম পত্র' },
    { id: 'phy-c11', nameBn: 'তাপগতিবিদ্যা', paper: '২য় পত্র' },
    { id: 'phy-c12', nameBn: 'স্থির তড়িৎ', paper: '২য় পত্র' },
    { id: 'phy-c13', nameBn: 'চল তড়িৎ', paper: '২য় পত্র' },
    { id: 'phy-c14', nameBn: 'তড়িৎ প্রবাহের চৌম্বক ক্রিয়া', paper: '২য় পত্র' },
    { id: 'phy-c15', nameBn: 'ভৌত আলোকবিজ্ঞান', paper: '২য় পত্র' },
    { id: 'phy-c16', nameBn: 'আধুনিক পদার্থবিজ্ঞান', paper: '২য় পত্র' },
    { id: 'phy-c17', nameBn: 'পরমাণু মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান', paper: '২য় পত্র' },
    { id: 'phy-c18', nameBn: 'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স', paper: '২য় পত্র' }
  ],
  chemistry: [
    { id: 'chem-c1', nameBn: 'গুণগত রসায়ন', paper: '১ম পত্র' },
    { id: 'chem-c2', nameBn: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন', paper: '১ম পত্র' },
    { id: 'chem-c3', nameBn: 'রাসায়নিক পরিবর্তন (সাম্যাবস্থা)', paper: '১ম পত্র' },
    { id: 'chem-c4', nameBn: 'কর্মমুখী রসায়ন', paper: '১ম পত্র' },
    { id: 'chem-c5', nameBn: 'পরিবেশ রসায়ন', paper: '২য় পত্র' },
    { id: 'chem-c6', nameBn: 'জৈব রসায়ন', paper: '২য় পত্র' },
    { id: 'chem-c7', nameBn: 'পরিমাণগত রসায়ন', paper: '২য় পত্র' },
    { id: 'chem-c8', nameBn: 'তড়িৎ রসায়ন', paper: '২য় পত্র' }
  ],
  math: [
    { id: 'math-c1', nameBn: 'ম্যাট্রিক্স ও নির্ণায়ক', paper: '১ম পত্র' },
    { id: 'math-c2', nameBn: 'ভেক্টর', paper: '১ম পত্র' },
    { id: 'math-c3', nameBn: 'সরলরেখা', paper: '১ম পত্র' },
    { id: 'math-c4', nameBn: 'বৃত্ত', paper: '১ম পত্র' },
    { id: 'math-c5', nameBn: 'বিন্যাস ও সমাবেশ', paper: '১ম পত্র' },
    { id: 'math-c6', nameBn: 'ত্রিকোণমিতিক অনুপাত', paper: '১ম পত্র' },
    { id: 'math-c7', nameBn: 'ফাংশন ও ফাংশনের লেখচিত্র', paper: '১ম পত্র' },
    { id: 'math-c8', nameBn: 'অন্তরীকরণ (Calculus)', paper: '১ম পত্র' },
    { id: 'math-c9', nameBn: 'যোগজীকরণ (Integration)', paper: '১ম পত্র' },
    { id: 'math-c10', nameBn: 'জটিল সংখ্যা', paper: '২য় পত্র' },
    { id: 'math-c11', nameBn: 'বহুপদী ও বহুপদী সমীকরণ', paper: '২য় পত্র' },
    { id: 'math-c12', nameBn: 'কণিক (Conics)', paper: '২য় পত্র' },
    { id: 'math-c13', nameBn: 'বিপরীত ত্রিকোণমিতিক ফাংশন', paper: '২য় পত্র' },
    { id: 'math-c14', nameBn: 'স্থিতিবিদ্যা ও গতিবিদ্যা', paper: '২য় পত্র' }
  ],
  biology: [
    { id: 'bio-c1', nameBn: 'কোষ ও এর গঠন', paper: '১ম পত্র' },
    { id: 'bio-c2', nameBn: 'কোষ বিভাজন', paper: '১ম পত্র' },
    { id: 'bio-c3', nameBn: 'কোষ রসায়ন', paper: '১ম পত্র' },
    { id: 'bio-c4', nameBn: 'অণুজীব (Microbiology)', paper: '১ম পত্র' },
    { id: 'bio-c5', nameBn: 'শৈবাল ও ছত্রাক', paper: '১ম পত্র' },
    { id: 'bio-c6', nameBn: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ', paper: '১ম পত্র' },
    { id: 'bio-c7', nameBn: 'টিস্যু ও টিস্যুতন্ত্র', paper: '১ম পত্র' },
    { id: 'bio-c8', nameBn: 'উদ্ভিদ শারীরতত্ত্ব', paper: '১ম পত্র' },
    { id: 'bio-c9', nameBn: 'উদ্ভিদ প্রজনন ও জীবপ্রযুক্তি', paper: '১ম পত্র' },
    { id: 'bio-c10', nameBn: 'প্রাণীর বিভিন্নতা ও শ্রেণিবিন্যাস', paper: '২য় পত্র' },
    { id: 'bio-c11', nameBn: 'প্রাণীর পরিচিতি (ঘাসফড়িং/রুইমাছ)', paper: '২য় পত্র' },
    { id: 'bio-c12', nameBn: 'রক্ত ও সংবহন', paper: '২য় পত্র' },
    { id: 'bio-c13', nameBn: 'শ্বসন ও শ্বাসক্রিয়া', paper: '২য় পত্র' },
    { id: 'bio-c14', nameBn: 'রেচন ও বর্জ্য', paper: '২য় পত্র' },
    { id: 'bio-c15', nameBn: 'জিনতত্ত্ব ও বিবর্তন', paper: '২য় পত্র' }
  ]
};

export const QUESTION_POOL: Record<SubjectId, Question[]> = {
  physics: [
    {
      id: 'phy-1',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'একটি প্রাসের সর্বাধিক অনুভূমিক পাল্লার জন্য নিক্ষেপণ কোণ কত হতে হবে?',
      questionEn: 'What is the projection angle for the maximum horizontal range of a projectile?',
      options: ['30°', '45°', '60°', '90°'],
      correctIndex: 1,
      explanation: 'প্রাসের পাল্লা R = (v₀² sin 2θ)/g। পাল্লা সর্বোচ্চ হবে যখন sin 2θ = 1, অর্থাৎ 2θ = 90° বা θ = 45°।',
      category: 'knowledge',
      chapter: 'গতিবিদ্যা',
      topic: 'Mechanics (গতিবিদ্যা)'
    },
    {
      id: 'phy-2',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'দুটি সমমানের ভেক্টরের লব্ধির মান এদের যেকোনো একটির মানের সমান হলে ভেক্টরদ্বয়ের মধ্যবর্তী কোণ কত?',
      questionEn: 'If the resultant of two equal vectors equals the magnitude of either vector, what is the angle between them?',
      options: ['60°', '90°', '120°', '180°'],
      correctIndex: 2,
      explanation: 'R² = P² + Q² + 2PQ cos θ। এখানে P = Q = R হলে: P² = 2P²(1 + cos θ) ⇒ 1 = 2(1 + cos θ) ⇒ cos θ = -1/2 ⇒ θ = 120°।',
      category: 'math',
      chapter: 'ভেক্টর',
      topic: 'Vectors (ভেক্টর)'
    },
    {
      id: 'phy-3',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'একটি সরল ছন্দিত স্পন্দনরত কণার বিস্তার A হলে, সাম্যাবস্থা থেকে কত দূরত্বে এর গতিশক্তি ও স্থিতিশক্তি সমান হবে?',
      questionEn: 'At what displacement from equilibrium will the kinetic energy and potential energy of a simple harmonic oscillator be equal?',
      options: ['A/2', 'A/√2', 'A/4', '√3A/2'],
      correctIndex: 1,
      explanation: 'E_k = 1/2 k(A² - x²) এবং E_p = 1/2 k x²। শর্তমতে 1/2 k(A² - x²) = 1/2 k x² ⇒ A² = 2x² ⇒ x = A/√2।',
      category: 'math',
      chapter: 'পর্যাবৃত্ত গতি',
      topic: 'Oscillations (পর্যাবৃত্ত গতি)'
    },
    {
      id: 'phy-4',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'কার্নো ইঞ্জিনের কর্মদক্ষতা 100% হতে হলে তাপ গ্রাহকের পরম তাপমাত্রা কত হতে হবে?',
      questionEn: 'For a Carnot engine to have 100% efficiency, what must be the absolute temperature of the sink?',
      options: ['0°C', '273 K', '0 K', '100 K'],
      correctIndex: 2,
      explanation: 'দক্ষতা η = 1 - T₂/T₁। η = 1 (100%) হতে হলে T₂ = 0 K (পরম শূন্য তাপমাত্রা) হতে হবে।',
      category: 'comprehension',
      chapter: 'তাপগতিবিদ্যা',
      topic: 'Thermodynamics (তাপগতিবিদ্যা)'
    },
    {
      id: 'phy-5',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'একটি ধারকের দুই প্রান্তের বিভব পার্থক্য দ্বিগুণ করা হলে এর সঞ্চিত শক্তি কত গুণ হবে?',
      questionEn: 'If the potential difference across a capacitor is doubled, by what factor does its stored energy increase?',
      options: ['2 গুণ', '4 গুণ', 'অপরিবর্তিত থাকবে', '8 গুণ'],
      correctIndex: 1,
      explanation: 'ধারকে সঞ্চিত শক্তি U = 1/2 C V²। যেহেতু U ∝ V², বিভব পার্থক্য দ্বিগুণ (V → 2V) হলে সঞ্চিত শক্তি 2² = 4 গুণ হবে।',
      category: 'comprehension',
      chapter: 'স্থির তড়িৎ',
      topic: 'Electrostatics (স্থির তড়িৎ)'
    },
    {
      id: 'phy-6',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'একটি পরিবাহী তারকে টেনে দৈর্ঘ্য দ্বিগুণ করা হলে এর নতুন রোধ আদি রোধের কত গুণ হবে?',
      questionEn: 'If a conducting wire is stretched to double its original length, its new resistance will be how many times the original?',
      options: ['2 গুণ', '4 গুণ', '1/2 গুণ', '1/4 গুণ'],
      correctIndex: 1,
      explanation: 'তারের আয়তন ধ্রুব থাকে। দৈর্ঘ্য দ্বিগুণ হলে প্রস্থচ্ছেদের ক্ষেত্রফল অর্ধেক হয়। রোধ R = ρ(L/A) অনুযায়ী নতুন রোধ R\' = ρ(2L / (A/2)) = 4R।',
      category: 'math',
      chapter: 'চল তড়িৎ',
      topic: 'Current Electricity (চল তড়িৎ)'
    },
    {
      id: 'phy-7',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'ইয়ং-এর দ্বি-চির পরীক্ষায় ব্যবহৃত আলোর তরঙ্গদৈর্ঘ্য বৃদ্ধি পেলে ডোরা প্রস্থ (fringe width) কেমন পরিবর্তিত হবে?',
      questionEn: 'In Young’s double-slit experiment, if the wavelength of light used is increased, how does the fringe width change?',
      options: ['হ্রাস পাবে', 'বৃদ্ধি পাবে', 'একই থাকবে', 'প্রথমে বাড়বে পরে কমবে'],
      correctIndex: 1,
      explanation: 'ডোরা প্রস্থ β = λD / d। এখানে β ∝ λ, অর্থাৎ আলোর তরঙ্গদৈর্ঘ্য বাড়লে ডোরা প্রস্থ সমানুপাতিক হারে বৃদ্ধি পাবে।',
      category: 'comprehension',
      chapter: 'ভৌত আলোকবিজ্ঞান',
      topic: 'Wave Optics (ভৌত আলোকবিজ্ঞান)'
    },
    {
      id: 'phy-8',
      subjectId: 'physics',
      subjectName: 'Physics (পদার্থবিজ্ঞান)',
      questionBn: 'একটি তেজস্ক্রিয় পদার্থের অর্ধায়ু 5 দিন। 20 দিন পর এর কত অংশ অক্ষত থাকবে?',
      questionEn: 'The half-life of a radioactive element is 5 days. What fraction of it remains undecayed after 20 days?',
      options: ['1/4', '1/8', '1/16', '1/32'],
      correctIndex: 2,
      explanation: 'অর্ধায়ুর সংখ্যা n = t / T₁/₂ = 20 / 5 = 4। অবশিষ্ট অংশ = (1/2)ⁿ = (1/2)⁴ = 1/16।',
      category: 'math',
      chapter: 'আধুনিক পদার্থবিজ্ঞান',
      topic: 'Modern Physics (আধুনিক পদার্থবিজ্ঞান)'
    }
  ],

  chemistry: [
    {
      id: 'chem-1',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: 'নিচের কোন অণুর জ্যামিতিক আকৃতি ত্রিকোণাকার পিরামিডীয় (Trigonal Pyramidal)?',
      questionEn: 'Which of the following molecules has a trigonal pyramidal shape?',
      options: ['BF₃', 'CH₄', 'NH₃', 'H₂O'],
      correctIndex: 2,
      explanation: 'NH₃ অণুতে নাইট্রোজেনের sp³ সংকরণ ঘটে, যাতে ৩টি বন্ধনজোড় (bp) এবং ১টি মুক্তজোড় (lp) ইলেকট্রন থাকে। ফলে এর আকৃতি ত্রিকোণাকার পিরামিডীয় হয়।',
      category: 'comprehension',
      chapter: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
      topic: 'Chemical Bonding (রাসায়নিক বন্ধন)'
    },
    {
      id: 'chem-2',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: 'এসটিপিতে (STP) 16 গ্রাম মিথেন (CH₄) গ্যাসের আয়তন কত লিটার?',
      questionEn: 'What is the volume in liters of 16g of methane (CH₄) gas at STP?',
      options: ['11.2 L', '22.4 L', '44.8 L', '24.789 L'],
      correctIndex: 1,
      explanation: 'মিথেনের (CH₄) মোলার ভর = 12 + 4 = 16 g/mol। 16 g CH₄ = 1 মোল। STP-তে যেকোনো গ্যাসের 1 মোলের আয়তন 22.4 লিটার।',
      category: 'math',
      chapter: 'পরিবেশ রসায়ন',
      topic: 'Gas Laws (পরিবেশ রসায়ন)'
    },
    {
      id: 'chem-3',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: 'নিচের কোনটি ইলেকট্রোফাইল (Electrophile) হিসেবে কাজ করে?',
      questionEn: 'Which of the following acts as an electrophile?',
      options: ['NH₃', 'H₂O', 'AlCl₃', 'CN⁻'],
      correctIndex: 2,
      explanation: 'AlCl₃-তে কেন্দ্রীয় অ্যালুমিনিয়াম পরমাণুর অষ্টক অপূর্ণ থাকে (৬টি ইলেকট্রন), তাই এটি ইলেকট্রনগ্রাহী বা লুইস অ্যাসিড হিসেবে ইলেকট্রোফাইল রূপে আচরণ করে।',
      category: 'knowledge',
      chapter: 'জৈব রসায়ন',
      topic: 'Organic Chemistry (জৈব রসায়ন)'
    },
    {
      id: 'chem-4',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: 'হাইড্রোজেনের পারমাণবিক বর্ণালীর বামার (Balmer) সিরিজের রেখাসমূহ কোন অঞ্চলে দেখা যায়?',
      questionEn: 'In which electromagnetic region do the spectral lines of the Balmer series of hydrogen appear?',
      options: ['অতিবেগুনি (UV)', 'দৃশ্যমান (Visible)', 'অবলোহিত (IR)', 'এক্স-রে (X-ray)'],
      correctIndex: 1,
      explanation: 'লাইম্যান সিরিজ UV অঞ্চলে, বামার সিরিজ দৃশ্যমান (Visible) অঞ্চলে এবং প্যাসচেন ও ব্র্যাকেট সিরিজ অবলোহিত (IR) অঞ্চলে সৃষ্টি হয়।',
      category: 'knowledge',
      chapter: 'গুণগত রসায়ন',
      topic: 'Qualitative Chemistry (গুণগত রসায়ন)'
    },
    {
      id: 'chem-5',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: '0.001 M HCl দ্রবণের pH এর মান কত?',
      questionEn: 'What is the pH of a 0.001 M aqueous HCl solution?',
      options: ['1', '2', '3', '4'],
      correctIndex: 2,
      explanation: 'HCl তীব্র অ্যাসিড, তাই [H⁺] = 0.001 M = 10⁻³ M। সুতরাং pH = -log[H⁺] = -log(10⁻³) = 3।',
      category: 'math',
      chapter: 'রাসায়নিক পরিবর্তন (সাম্যাবস্থা)',
      topic: 'Chemical Equilibrium (রাসায়নিক পরিবর্তন)'
    },
    {
      id: 'chem-6',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: 'বেনজিনের নাইট্রেশনে কোন ইলেকট্রোফাইলটি অংশগ্রহণ করে?',
      questionEn: 'Which electrophile attacks the benzene ring during nitration?',
      options: ['NO⁺', 'NO₂⁺', 'NO₂⁻', 'NO₃⁻'],
      correctIndex: 1,
      explanation: 'গাঢ় HNO₃ ও গাঢ় H₂SO₄ এর বিক্রিয়ায় নাইট্রোনিয়াম আয়ন (NO₂⁺) উৎপন্ন হয়, যা শক্তিশালী ইলেকট্রোফাইল হিসেবে বেনজিন বলয় আক্রমণ করে।',
      category: 'comprehension',
      chapter: 'জৈব রসায়ন',
      topic: 'Organic Reactions (জৈব রসায়ন)'
    },
    {
      id: 'chem-7',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: 'নিচের কোন আয়নটির জলীয় দ্রবণ রঙিন এবং প্যারাম্যাগনেটিক?',
      questionEn: 'Which of the following ions has a colored and paramagnetic aqueous solution?',
      options: ['Sc³⁺', 'Zn²⁺', 'Cu²⁺', 'Ti⁴⁺'],
      correctIndex: 2,
      explanation: 'Cu²⁺ এর ইলেকট্রন বিন্যাস [Ar] 3d⁹, যাতে একটি বিজোড় ইলেকট্রন থাকে। বিজোড় ইলেকট্রন থাকার কারণে এটি প্যারাম্যাগনেটিক এবং d-d স্থানান্তরের ফলে রঙিন দ্রবণ তৈরি করে।',
      category: 'knowledge',
      chapter: 'মৌলের পর্যায়বৃত্ত ধর্ম ও রাসায়নিক বন্ধন',
      topic: 'Periodic Properties (পর্যায়বৃত্ত ধর্ম)'
    },
    {
      id: 'chem-8',
      subjectId: 'chemistry',
      subjectName: 'Chemistry (রসায়ন)',
      questionBn: 'ফ্যারাডের সূত্র অনুযায়ী 1 মোল Cu²⁺ আয়নকে ধাতব কপারে বিজারিত করতে কত ফ্যারাডে বিদ্যুৎ প্রয়োজন?',
      questionEn: 'According to Faraday\'s law, how many Faradays of electricity are required to reduce 1 mole of Cu²⁺ ions to metallic copper?',
      options: ['1 F', '2 F', '0.5 F', '96500 C'],
      correctIndex: 1,
      explanation: 'Cu²⁺ + 2e⁻ → Cu। এক মোল Cu²⁺ জারিত/বিজারিত করতে 2 মোল ইলেকট্রন অর্থাৎ 2 ফ্যারাডে (2F) চার্জ প্রয়োজন।',
      category: 'math',
      chapter: 'তড়িৎ রসায়ন',
      topic: 'Electrochemistry (তড়িৎ রসায়ন)'
    }
  ],

  math: [
    {
      id: 'math-1',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: 'মান নির্ণয় কর: lim (x → 0) (sin 5x) / (3x)',
      questionEn: 'Evaluate: lim (x → 0) (sin 5x) / (3x)',
      options: ['1', '5/3', '3/5', '0'],
      correctIndex: 1,
      explanation: 'lim (x→0) (sin 5x / 3x) = (5/3) × lim (5x→0) (sin 5x / 5x) = (5/3) × 1 = 5/3।',
      category: 'math',
      chapter: 'অন্তরীকরণ (Calculus)',
      topic: 'Calculus (ক্যালকুলাস)'
    },
    {
      id: 'math-2',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: 'y = x³ - 3x² + 2 বক্ররেখার কোন বিন্দুতে স্পর্শকের ঢাল শূন্য হবে?',
      questionEn: 'At which points on the curve y = x³ - 3x² + 2 is the slope of the tangent zero?',
      options: ['x = 0 এবং x = 2', 'x = 1 এবং x = -1', 'x = 0 এবং x = 3', 'x = 2 এবং x = -2'],
      correctIndex: 0,
      explanation: 'ঢাল dy/dx = 3x² - 6x = 0 ⇒ 3x(x - 2) = 0 ⇒ x = 0 অথবা x = 2।',
      category: 'math',
      chapter: 'অন্তরীকরণ (Calculus)',
      topic: 'Differentiation (অন্তরীকরণ)'
    },
    {
      id: 'math-3',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: '∫ (dx) / (1 + x²) এর মান নিচের কোনটি?',
      questionEn: 'What is the indefinite integral ∫ (dx) / (1 + x²)?',
      options: ['ln(1 + x²) + C', 'tan⁻¹(x) + C', 'sin⁻¹(x) + C', 'cot⁻¹(x) + C'],
      correctIndex: 1,
      explanation: 'আদর্শ সমাকলন সূত্রানুসারে, d/dx(tan⁻¹ x) = 1/(1+x²), সুতরাং ∫ dx/(1 + x²) = tan⁻¹(x) + C।',
      category: 'knowledge',
      chapter: 'যোগজীকরণ (Integration)',
      topic: 'Integration (যোগজীকরণ)'
    },
    {
      id: 'math-4',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: 'একটি উপবৃত্তের সমীকরণ x²/25 + y²/16 = 1 হলে, এর উৎকেন্দ্রিকতা (Eccentricity) কত?',
      questionEn: 'For the ellipse x²/25 + y²/16 = 1, what is its eccentricity?',
      options: ['3/5', '4/5', '9/25', '5/3'],
      correctIndex: 0,
      explanation: 'এখানে a² = 25, b² = 16 (a > b)। উৎকেন্দ্রিকতা e = √(1 - b²/a²) = √(1 - 16/25) = √(9/25) = 3/5।',
      category: 'math',
      chapter: 'কণিক (Conics)',
      topic: 'Conics (কণিক)'
    },
    {
      id: 'math-5',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: 'যদি A = [[2, 3], [1, 4]] একটি ম্যাট্রিক্স হয়, তবে এর নির্ণায়ক |A| এর মান কত?',
      questionEn: 'If A = [[2, 3], [1, 4]], what is the determinant |A|?',
      options: ['5', '11', '8', '-5'],
      correctIndex: 0,
      explanation: '|A| = (2 × 4) - (3 × 1) = 8 - 3 = 5।',
      category: 'math',
      chapter: 'ম্যাট্রিক্স ও নির্ণায়ক',
      topic: 'Matrices & Determinants (ম্যাট্রিক্স ও নির্ণায়ক)'
    },
    {
      id: 'math-6',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: '1 এর কাল্পনিক ঘনমূল ω হলে, (1 - ω + ω²)² + (1 + ω - ω²)² এর মান কত?',
      questionEn: 'If ω is a complex cube root of unity, find the value of (1 - ω + ω²)² + (1 + ω - ω²)².',
      options: ['-4', '4', '0', '-2'],
      correctIndex: 0,
      explanation: 'যেহেতু 1 + ω + ω² = 0, সুতরাং 1 + ω² = -ω এবং 1 + ω = -ω²। ফলে (-2ω)² + (-2ω²)² = 4ω² + 4ω⁴ = 4(ω² + ω) = 4(-1) = -4।',
      category: 'comprehension',
      chapter: 'জটিল সংখ্যা',
      topic: 'Complex Numbers (জটিল সংখ্যা)'
    },
    {
      id: 'math-7',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: '3x + 4y - 12 = 0 সরলরেখাটি অক্ষদ্বয়ের সাথে যে ত্রিভুজ উৎপন্ন করে তার ক্ষেত্রফল কত?',
      questionEn: 'What is the area of the triangle formed by the line 3x + 4y - 12 = 0 with the coordinate axes?',
      options: ['6 বর্গ একক', '12 বর্গ একক', '24 বর্গ একক', '7 বর্গ একক'],
      correctIndex: 0,
      explanation: 'রেখাটিকে আদর্শ আকারে নিলে: x/4 + y/3 = 1। x-ছেদাংশ a = 4, y-ছেদাংশ b = 3। ক্ষেত্রফল = 1/2 × a × b = 1/2 × 4 × 3 = 6 বর্গ একক।',
      category: 'math',
      chapter: 'সরলরেখা',
      topic: 'Straight Lines (সরলরেখা)'
    },
    {
      id: 'math-8',
      subjectId: 'math',
      subjectName: 'Higher Mathematics (উচ্চতর গণিত)',
      questionBn: 'tan(θ) = 3/4 হলে sin(2θ) এর মান কত?',
      questionEn: 'If tan(θ) = 3/4, what is the value of sin(2θ)?',
      options: ['24/25', '7/25', '12/25', '6/5'],
      correctIndex: 0,
      explanation: 'sin(2θ) = 2 tan θ / (1 + tan² θ) = 2(3/4) / (1 + 9/16) = (3/2) / (25/16) = (3/2) × (16/25) = 24/25।',
      category: 'math',
      chapter: 'ত্রিকোণমিতিক অনুপাত',
      topic: 'Trigonometry (ত্রিকোণমিতি)'
    }
  ],

  biology: [
    {
      id: 'bio-1',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'কোষের শক্তিঘর (Powerhouse of the cell) বলা হয় কোন অঙ্গাণুকে?',
      questionEn: 'Which cell organelle is known as the powerhouse of the cell?',
      options: ['রাইবোজোম', 'মাইটোকন্ড্রিয়া', 'গলগি বডি', 'লাইসোজোম'],
      correctIndex: 1,
      explanation: 'মাইটোকন্ড্রিয়াতে ক্রেবস চক্র, ফ্যাটি এসিড চক্র এবং ইলেকট্রন ট্রান্সপোর্ট সিস্টেমের মাধ্যমে বিপুল পরিমাণ ATP তৈরি হওয়ায় একে শক্তিঘর বলা হয়।',
      category: 'knowledge',
      chapter: 'কোষ ও এর গঠন',
      topic: 'Cell Biology (কোষ ও এর গঠন)'
    },
    {
      id: 'bio-2',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'মায়োসিস-১ এর প্রফেজ-১ দশার কোন উপপর্যায়ে ক্রসিং ওভার (Crossing Over) সম্পন্ন হয়?',
      questionEn: 'In which sub-stage of Prophase-I of Meiosis-I does crossing over occur?',
      options: ['লেপটোটিন', 'জাইগোটিন', 'প্যাকাইটিন', 'ডিপ্লোটিন'],
      correctIndex: 2,
      explanation: 'প্যাকাইটিন (Pachytene) উপপর্যায়ে হোমোলোগাস ক্রোমোজোমের দুটি নন-সিস্টার ক্রোমাটিডের মধ্যে খণ্ডাংশের বিনিময় অর্থাৎ ক্রসিং ওভার ঘটে।',
      category: 'comprehension',
      chapter: 'কোষ বিভাজন',
      topic: 'Cell Division (কোষ বিভাজন)'
    },
    {
      id: 'bio-3',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'মানবদেহে ইউরিয়া সংশ্লেষিত হয় প্রধানত কোন অঙ্গে?',
      questionEn: 'In which human organ is urea primarily synthesized?',
      options: ['বৃক্ক (Kidney)', 'যকৃৎ (Liver)', 'প্লীহা (Spleen)', 'ফুসফুস (Lungs)'],
      correctIndex: 1,
      explanation: 'যকৃতে অরনিথিন চক্রের (Ornithine cycle) মাধ্যমে বিষাক্ত অ্যামোনিয়া ও কার্বন ডাই-অক্সাইড যুক্ত হয়ে কম বিষাক্ত ইউরিয়া উৎপন্ন হয়।',
      category: 'knowledge',
      chapter: 'রেচন ও বর্জ্য',
      topic: 'Human Physiology (রেচন ও বর্জ্য)'
    },
    {
      id: 'bio-4',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'মেন্ডেলের দ্বিতীয় সূত্রের (স্বাধীনভাবে সঞ্চারণের সূত্র) জিনোটাইপিক অনুপাত কোনটি?',
      questionEn: 'What is the standard phenotypic dihybrid ratio of Mendel’s Second Law?',
      options: ['3 : 1', '9 : 3 : 3 : 1', '12 : 3 : 1', '9 : 7'],
      correctIndex: 1,
      explanation: 'দ্বি-সংকর বা ডাইহাইব্রিড ক্রসে F₂ জনুর ফিনোটাইপিক অনুপাত পাওয়া যায় 9 : 3 : 3 : 1।',
      category: 'comprehension',
      chapter: 'জিনতত্ত্ব ও বিবর্তন',
      topic: 'Genetics (জিনতত্ত্ব)'
    },
    {
      id: 'bio-5',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'নিচের কোন হরমোন রক্তের গ্লুকোজের মাত্রা হ্রাস করতে সাহায্য করে?',
      questionEn: 'Which hormone helps decrease blood glucose levels?',
      options: ['গ্লুকাগন', 'ইনসুলিন', 'থাইরক্সিন', 'অ্যাড্রেনালিন'],
      correctIndex: 1,
      explanation: 'অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যান্সের বিটা (β) কোষ থেকে নিঃসৃত ইনসুলিন রক্তে গ্লুকোজের রূপান্তর ঘটিয়ে গ্লাইকোজেন হিসেবে কোষে জমা রাখে।',
      category: 'knowledge',
      chapter: 'রক্ত ও সংবহন',
      topic: 'Human Physiology (সমন্বয় ও নিঃসরণ)'
    },
    {
      id: 'bio-6',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'উদ্ভিদে সালোকসংশ্লেষণের আলোক পর্যায়ে পানির সালোকবিভাজনে (Photolysis of water) কোন আয়নটির ভূমিকা রয়েছে?',
      questionEn: 'Which ions play a crucial catalytic role in the photolysis of water during photosynthesis?',
      options: ['Mn²⁺ ও Cl⁻', 'Fe²⁺ ও Cu²⁺', 'Mg²⁺ ও Na⁺', 'Zn²⁺ ও K⁺'],
      correctIndex: 0,
      explanation: 'ফটোসিস্টেম-২ এর অক্সিজেন ইভলভিং কমপ্লেক্সে ম্যাঙ্গানিজ (Mn) এবং ক্লোরাইড (Cl⁻) আয়ন পানির আলোক বিশ্লিষ্টকরণে ক্যাটালাইস্ট হিসেবে কাজ করে।',
      category: 'knowledge',
      chapter: 'উদ্ভিদ শারীরতত্ত্ব',
      topic: 'Plant Physiology (উদ্ভিদ শারীরতত্ত্ব)'
    },
    {
      id: 'bio-7',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'হৃৎপিণ্ডের কোন প্রকোষ্ঠ থেকে অক্সিজেনযুক্ত রক্ত মহাধমনী (Aorta) দিয়ে সারা দেহে পরিবাহিত হয়?',
      questionEn: 'From which chamber of the heart is oxygenated blood pumped into the aorta to the rest of the body?',
      options: ['ডান অলিন্দ', 'ডান নিলয়', 'বাম অলিন্দ', 'বাম নিলয়'],
      correctIndex: 3,
      explanation: 'ফুসফুস থেকে পালমোনারি শিরার মাধ্যমে অক্সিজেনসমৃদ্ধ রক্ত বাম অলিন্দে এবং পরে বাম নিলয়ে আসে, যেখান থেকে মহাধমনীর মাধ্যমে সারা দেহে ছড়িয়ে পড়ে।',
      category: 'comprehension',
      chapter: 'রক্ত ও সংবহন',
      topic: 'Circulation (রক্ত ও সংবহন)'
    },
    {
      id: 'bio-8',
      subjectId: 'biology',
      subjectName: 'Biology (জীববিজ্ঞান)',
      questionBn: 'DNA অণুর গুয়ানিন (G) ও সাইটোসিন (C) এর মধ্যে কয়টি হাইড্রোজেন বন্ধন বিদ্যমান থাকে?',
      questionEn: 'How many hydrogen bonds connect Guanine (G) and Cytosine (C) in a DNA molecule?',
      options: ['1টি', '2টি', '3টি', '4টি'],
      correctIndex: 2,
      explanation: 'ওয়াটসন-ক্রিক মডেল অনুসারে DNA-তে অ্যাডেনিন ও থাইমিনের মধ্যে ২টি হাইড্রোজেন বন্ধন (A=T) এবং গুয়ানিন ও সাইটোসিনের মধ্যে ৩টি হাইড্রোজেন বন্ধন (G≡C) থাকে।',
      category: 'knowledge',
      chapter: 'কোষ ও এর গঠন',
      topic: 'Molecular Biology (অণুজীব ও জেনেটিক্স)'
    }
  ],

  bangla: [
    {
      id: 'ban-1',
      subjectId: 'bangla',
      subjectName: 'Bangla (বাংলা)',
      questionBn: '\'বিদ্যালয়\' শব্দটির সঠিক সন্ধি বিচ্ছেদ কোনটি?',
      questionEn: 'What is the correct Sandhi of the word \'Biddaloy\'?',
      options: ['বিদ্ + আলয়', 'বিদ্যা + আলয়', 'বিদ্য + আলয়', 'বিদ্যা + লয়'],
      correctIndex: 1,
      explanation: 'আ-কার কিংবা আ-কারের পর আ-কার থাকলে উভয়ে মিলে আ-কার হয়। বিদ্যা + আলয় = বিদ্যালয়।',
      category: 'knowledge',
      topic: 'Bangla Grammar (সন্ধি)'
    },
    {
      id: 'ban-2',
      subjectId: 'bangla',
      subjectName: 'Bangla (বাংলা)',
      questionBn: '\'অপরিচিতা\' গল্পের কেন্দ্রীয় নারী চরিত্র কল্যাণীর পিতার নাম কী?',
      questionEn: 'In Rabindranath Tagore\'s short story \'Oporichita\', what is Kalyani\'s father\'s name?',
      options: ['হরিশ', 'শম্ভুনাথ সেন', 'অনুপম', 'বিনুদা'],
      correctIndex: 1,
      explanation: 'রবীন্দ্রনাথ ঠাকুরের বিখ্যাত ছোটগল্প \'অপরিচিতা\'-তে কল্যাণীর আত্মমর্যাদাসম্পন্ন পিতার নাম শম্ভুনাথ সেন।',
      category: 'knowledge',
      topic: 'Bangla Literature (গল্প সংকলন)'
    },
    {
      id: 'ban-3',
      subjectId: 'bangla',
      subjectName: 'Bangla (বাংলা)',
      questionBn: '\'পঙ্কজ\' শব্দটির সমাস ও সমাসের প্রকারভেদ কোনটি?',
      questionEn: 'Which compound type (Samas) does \'Pankaj\' belong to?',
      options: ['দ্বন্দ্ব সমাস', 'উপপদ তৎপুরুষ সমাস', 'কর্মধারয় সমাস', 'বহুব্রীহি সমাস'],
      correctIndex: 1,
      explanation: 'পঙ্কে জন্মে যা = পঙ্কজ। কৃদন্ত পদের পূর্বে উপপদ থাকলে তাকে উপপদ তৎপুরুষ সমাস বলা হয়।',
      category: 'comprehension',
      topic: 'Bangla Grammar (সমাস)'
    },
    {
      id: 'ban-4',
      subjectId: 'bangla',
      subjectName: 'Bangla (বাংলা)',
      questionBn: '\'তাহারেই পড়ে মনে\' কবিতায় কবি কোন ঋতুর আগমনের বন্দনা অনুপস্থিতির আক্ষেপ করেছেন?',
      questionEn: 'In Sufia Kamal\'s poem \'Tahare-i Pore Mone\', which seasonal arrival is depicted?',
      options: ['শরৎ', 'বসন্ত', 'বর্ষা', 'হেমন্ত'],
      correctIndex: 1,
      explanation: 'সুফিয়া কামালের \'তাহারেই পড়ে মনে\' কবিতায় প্রকৃতিতে বসন্তের শুভাগমন হলেও কবির প্রিয় বিয়োগব্যথায় হৃদয় শূন্য হয়ে থাকে।',
      category: 'comprehension',
      topic: 'Bangla Poetry (কবিতা)'
    },
    {
      id: 'ban-5',
      subjectId: 'bangla',
      subjectName: 'Bangla (বাংলা)',
      questionBn: 'যে নারীর স্বামী ও পুত্র নেই—এক কথায় প্রকাশ কী হবে?',
      questionEn: 'One word substitution for a woman who has neither husband nor son:',
      options: ['অসূর্যম্পশ্যা', 'বীরা', 'অবীরা', 'অনূঢ়া'],
      correctIndex: 2,
      explanation: 'যে নারীর স্বামী ও পুত্র নেই তাকে \'অবীরা\' বলা হয়। পক্ষান্তরে যে নারীর স্বামী ও পুত্র জীবিত তাকে \'বীরা\' বা \'পুরন্ধ্রী\' বলে।',
      category: 'knowledge',
      topic: 'Bangla Grammar (এক কথায় প্রকাশ)'
    },
    {
      id: 'ban-6',
      subjectId: 'bangla',
      subjectName: 'Bangla (বাংলা)',
      questionBn: 'কাজী নজরুল ইসলামের \'বিদ্রোহী\' কবিতাটি প্রথম কোন পত্রিকায় প্রকাশিত হয়?',
      questionEn: 'In which magazine was Kazi Nazrul Islam\'s poem \'Bidrohi\' first published?',
      options: ['সওগাত', 'বিজলী', 'কল্লোল', 'ধূমকেতু'],
      correctIndex: 1,
      explanation: '১৯২২ সালের ৬ জানুয়ারি সাপ্তাহিক \'বিজলী\' পত্রিকায় কাজী নজরুল ইসলামের যুগান্তকারী কবিতা \'বিদ্রোহী\' প্রথম প্রকাশিত হয়েছিল।',
      category: 'knowledge',
      topic: 'Bangla Literature (সাহিত্য ইতিহাস)'
    },
    {
      id: 'ban-7',
      subjectId: 'bangla',
      subjectName: 'Bangla (বাংলা)',
      questionBn: 'নিচের কোন বানানটি সম্পূর্ণ শুদ্ধ?',
      questionEn: 'Which of the following spellings is strictly correct?',
      options: ['মুহুর্ত', 'মুহূর্ত', 'মুহুর্থ', 'মুহুর্ত্ত'],
      correctIndex: 1,
      explanation: 'শুদ্ধ বানান হলো \'মুহূর্ত\' (ম-এ হ্রস্ব উ, হ-এ দীর্ঘ ঊ, রেফ-ত)।',
      category: 'knowledge',
      topic: 'Bangla Grammar (বানান শুদ্ধি)'
    }
  ],

  english: [
    {
      id: 'eng-1',
      subjectId: 'english',
      subjectName: 'English (ইংরেজি)',
      questionBn: 'Select the correct preposition: "He is adept ___ solving complex mathematical problems."',
      questionEn: 'Select the correct preposition: "He is adept ___ solving complex mathematical problems."',
      options: ['in', 'at', 'with', 'for'],
      correctIndex: 1,
      explanation: 'The adjective "adept" is followed by the preposition "at" (or occasionally "in") when referring to proficiency in a skill or activity: "adept at something".',
      category: 'knowledge',
      topic: 'Prepositions'
    },
    {
      id: 'eng-2',
      subjectId: 'english',
      subjectName: 'English (ইংরেজি)',
      questionBn: 'Choose the correct synonym of the word "BENEVOLENT":',
      questionEn: 'Choose the correct synonym of the word "BENEVOLENT":',
      options: ['Malicious', 'Altruistic', 'Indifferent', 'Hostile'],
      correctIndex: 1,
      explanation: 'Benevolent means well-meaning and kindly. Its closest synonym is Altruistic (selfless, charitable). Malicious and Hostile are direct antonyms.',
      category: 'knowledge',
      topic: 'Vocabulary & Synonyms'
    },
    {
      id: 'eng-3',
      subjectId: 'english',
      subjectName: 'English (ইংরেজি)',
      questionBn: 'Identify the sentence with correct Subject-Verb Agreement:',
      questionEn: 'Identify the sentence with correct Subject-Verb Agreement:',
      options: [
        'Neither the teacher nor the students was present.',
        'Neither the teacher nor the students were present.',
        'Neither the teacher nor the students has been present.',
        'Neither the teacher nor the students is present.'
      ],
      correctIndex: 1,
      explanation: 'When subjects are joined by "neither... nor", the verb agrees in number with the closer subject ("the students", which is plural, hence "were present").',
      category: 'comprehension',
      topic: 'Grammar (Subject-Verb Agreement)'
    },
    {
      id: 'eng-4',
      subjectId: 'english',
      subjectName: 'English (ইংরেজি)',
      questionBn: 'What is the meaning of the idiom "A bolt from the blue"?',
      questionEn: 'What is the meaning of the idiom "A bolt from the blue"?',
      options: [
        'A pleasant surprise',
        'An unexpected, sudden catastrophe or shock',
        'A flash of lightning during rain',
        'A clear blue sky'
      ],
      correctIndex: 1,
      explanation: '"A bolt from the blue" refers to an event, typically unpleasant or surprising, that occurs without any warning (বিনা মেঘে বজ্রপাত).',
      category: 'knowledge',
      topic: 'Idioms & Phrases'
    },
    {
      id: 'eng-5',
      subjectId: 'english',
      subjectName: 'English (ইংরেজি)',
      questionBn: 'Complete the conditional sentence: "If she had worked hard, she ___ the examination."',
      questionEn: 'Complete the conditional sentence: "If she had worked hard, she ___ the examination."',
      options: [
        'will pass',
        'would pass',
        'would have passed',
        'had passed'
      ],
      correctIndex: 2,
      explanation: 'Third conditional structure: If + past perfect ("had worked"), main clause = would/could/might + have + past participle ("would have passed").',
      category: 'comprehension',
      topic: 'Conditionals'
    },
    {
      id: 'eng-6',
      subjectId: 'english',
      subjectName: 'English (ইংরেজি)',
      questionBn: 'Choose the correct antonym of the word "TACITURN":',
      questionEn: 'Choose the correct antonym of the word "TACITURN":',
      options: ['Reticent', 'Garrulous', 'Silent', 'Reserved'],
      correctIndex: 1,
      explanation: 'Taciturn means reserved or uncommunicative in speech (অল্পভাষী). Garrulous means excessively talkative (বাচাল), which is the exact antonym.',
      category: 'knowledge',
      topic: 'Vocabulary & Antonyms'
    },
    {
      id: 'eng-7',
      subjectId: 'english',
      subjectName: 'English (ইংরেজি)',
      questionBn: 'Change into passive voice: "Who wrote this letter?"',
      questionEn: 'Change into passive voice: "Who wrote this letter?"',
      options: [
        'By whom was this letter written?',
        'By whom this letter was written?',
        'Who was written by this letter?',
        'Whom wrote this letter?'
      ],
      correctIndex: 0,
      explanation: 'Active with "Who" + past indefinite turns into: By whom + was/were + object + past participle? ("By whom was this letter written?").',
      category: 'comprehension',
      topic: 'Voice Change'
    }
  ]
};

export const SUBJECT_METADATA: Record<SubjectId, { nameEn: string; nameBn: string; color: string; icon: string }> = {
  physics: {
    nameEn: 'Physics',
    nameBn: 'পদার্থবিজ্ঞান',
    color: '#006a4e',
    icon: 'Atom'
  },
  chemistry: {
    nameEn: 'Chemistry',
    nameBn: 'রসায়ন',
    color: '#746294',
    icon: 'FlaskConical'
  },
  math: {
    nameEn: 'Higher Mathematics',
    nameBn: 'উচ্চতর গণিত',
    color: '#c27803',
    icon: 'Calculator'
  },
  biology: {
    nameEn: 'Biology',
    nameBn: 'জীববিজ্ঞান',
    color: '#059669',
    icon: 'Dna'
  },
  bangla: {
    nameEn: 'Bangla',
    nameBn: 'বাংলা',
    color: '#c8102e',
    icon: 'BookOpen'
  },
  english: {
    nameEn: 'English',
    nameBn: 'ইংরেজি',
    color: '#2563eb',
    icon: 'Languages'
  }
};

/**
 * Intelligent question selection:
 * 1. Filters by selected chapters if user opted for specific chapters
 * 2. When pool has > 5 questions: picks a balanced selection across categories (জ্ঞান, অনুধাবন, গাণিতিক)
 * 3. Exactly 5 questions picked per subject
 */
export function selectSubjectQuestions(
  subId: SubjectId,
  pool: Question[],
  selectedChapters?: string[]
): Question[] {
  // Step 1: Filter by chapters if selected
  let candidatePool = [...pool];
  if (selectedChapters && selectedChapters.length > 0) {
    const chapterFiltered = candidatePool.filter(q => q.chapter && selectedChapters.includes(q.chapter));
    if (chapterFiltered.length >= 5) {
      candidatePool = chapterFiltered;
    } else if (chapterFiltered.length > 0) {
      // Prioritize the chapter questions and backfill from general pool
      const remaining = candidatePool.filter(q => !chapterFiltered.some(cq => cq.id === q.id));
      candidatePool = [...chapterFiltered, ...remaining];
    }
  }

  // If candidatePool has <= 5 questions, return up to 5
  if (candidatePool.length <= 5) {
    return [...candidatePool].sort(() => Math.random() - 0.5).slice(0, 5);
  }

  // Step 2: Pool has > 5 questions: Balanced category selection
  // Group by categories: 'knowledge' (জ্ঞান), 'comprehension' (অনুধাবন), 'math' (গাণিতিক)
  const knowledge = candidatePool.filter(q => (q.category || 'knowledge') === 'knowledge').sort(() => Math.random() - 0.5);
  const comprehension = candidatePool.filter(q => q.category === 'comprehension').sort(() => Math.random() - 0.5);
  const math = candidatePool.filter(q => q.category === 'math').sort(() => Math.random() - 0.5);

  const selected: Question[] = [];

  // Try to pick at least 1 from each category if available
  if (knowledge.length > 0) selected.push(knowledge.pop()!);
  if (comprehension.length > 0) selected.push(comprehension.pop()!);
  if (math.length > 0) selected.push(math.pop()!);

  // Remaining pool of all remaining questions
  const remainingPool = [...knowledge, ...comprehension, ...math].sort(() => Math.random() - 0.5);

  while (selected.length < 5 && remainingPool.length > 0) {
    selected.push(remainingPool.pop()!);
  }

  // Shuffle final 5
  return selected.sort(() => Math.random() - 0.5);
}

/**
 * Generate 20 questions for the 4 chosen subjects
 */
export function generateExamQuestions(
  selectedSubjects: SubjectId[],
  allQuestionsMap: Record<SubjectId, Question[]>,
  chapterSelections?: Partial<Record<SubjectId, string[]>>
): Question[] {
  const result: Question[] = [];

  for (const subId of selectedSubjects) {
    const pool = allQuestionsMap[subId] || QUESTION_POOL[subId] || [];
    const chaptersForSubject = chapterSelections?.[subId];
    const picked = selectSubjectQuestions(subId, pool, chaptersForSubject);
    result.push(...picked);
  }

  return result;
}
