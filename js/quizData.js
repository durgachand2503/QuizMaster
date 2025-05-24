// Quiz Categories and Questions
const categories = [
  {
    id: 'general',
    name: 'General Knowledge',
    icon: '🧠',
    description: 'Test your knowledge on a variety of topics',
    color: 'var(--color-category-general)'
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Questions about physics, chemistry, and biology',
    color: 'var(--color-category-science)'
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    description: 'Events and people that shaped our world',
    color: 'var(--color-category-history)'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Computers, software, and digital innovations',
    color: 'var(--color-category-technology)'
  }
];

const questions = [
  // General Knowledge
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
    explanation: 'Paris is the capital and most populous city of France, situated on the Seine River in the north-central part of the country.',
    category: 'general',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 2,
    question: 'Which of these is NOT a primary color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correctAnswer: 3,
    explanation: 'Yellow is not a primary color in the RGB color model used for digital displays. The primary colors in RGB are Red, Green, and Blue.',
    category: 'general',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 3,
    question: 'Which planet is known as the "Red Planet"?',
    options: ['Jupiter', 'Venus', 'Mars', 'Saturn'],
    correctAnswer: 2,
    explanation: 'Mars is called the Red Planet because of its reddish appearance, which is due to iron oxide (rust) on its surface.',
    category: 'general',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 4,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctAnswer: 1,
    explanation: 'The Mona Lisa was painted by Leonardo da Vinci between 1503 and 1519. It is one of the most famous paintings in the world.',
    category: 'general',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 5,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 3,
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth\'s surface.',
    category: 'general',
    difficulty: 'medium',
    timeLimit: 20
  },
  
  // Science
  {
    id: 6,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Au', 'Ag', 'Gd'],
    correctAnswer: 1,
    explanation: 'The chemical symbol for gold is "Au," which comes from the Latin word "aurum," meaning shining dawn.',
    category: 'science',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 7,
    question: 'What is the hardest natural substance on Earth?',
    options: ['Titanium', 'Platinum', 'Diamond', 'Quartz'],
    correctAnswer: 2,
    explanation: 'Diamond is the hardest known natural material, scoring 10 on the Mohs scale of mineral hardness.',
    category: 'science',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 8,
    question: 'Which of the following is NOT a state of matter?',
    options: ['Solid', 'Liquid', 'Gas', 'Mineral'],
    correctAnswer: 3,
    explanation: 'Mineral is not a state of matter. The four common states of matter are solid, liquid, gas, and plasma.',
    category: 'science',
    difficulty: 'medium',
    timeLimit: 20
  },
  {
    id: 9,
    question: 'Who developed the theory of relativity?',
    options: ['Isaac Newton', 'Albert Einstein', 'Niels Bohr', 'Galileo Galilei'],
    correctAnswer: 1,
    explanation: 'Albert Einstein developed both the Special Theory of Relativity (1905) and the General Theory of Relativity (1915).',
    category: 'science',
    difficulty: 'medium',
    timeLimit: 20
  },
  {
    id: 10,
    question: 'What is the approximate speed of light in a vacuum?',
    options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s'],
    correctAnswer: 0,
    explanation: 'Light travels at approximately 299,792,458 meters per second (about 300,000 km/s) in a vacuum.',
    category: 'science',
    difficulty: 'medium',
    timeLimit: 20
  },
  
  // History
  {
    id: 11,
    question: 'In which year did World War II end?',
    options: ['1943', '1945', '1947', '1950'],
    correctAnswer: 1,
    explanation: 'World War II ended in 1945 with the surrender of Nazi Germany in May and Japan in September.',
    category: 'history',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 12,
    question: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
    correctAnswer: 2,
    explanation: 'George Washington was the first President of the United States, serving from 1789 to 1797.',
    category: 'history',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 13,
    question: 'The ancient city of Rome was built on how many hills?',
    options: ['Five', 'Six', 'Seven', 'Nine'],
    correctAnswer: 2,
    explanation: 'Ancient Rome was built on seven hills: Aventine, Caelian, Capitoline, Esquiline, Palatine, Quirinal, and Viminal.',
    category: 'history',
    difficulty: 'medium',
    timeLimit: 20
  },
  {
    id: 14,
    question: 'Which empire was ruled by Genghis Khan?',
    options: ['Roman Empire', 'Ottoman Empire', 'Mongol Empire', 'Byzantine Empire'],
    correctAnswer: 2,
    explanation: 'Genghis Khan founded and ruled the Mongol Empire, which became the largest contiguous land empire in history.',
    category: 'history',
    difficulty: 'medium',
    timeLimit: 20
  },
  {
    id: 15,
    question: 'The Renaissance period began in which country?',
    options: ['France', 'England', 'Italy', 'Spain'],
    correctAnswer: 2,
    explanation: 'The Renaissance began in Italy in the late 13th century before spreading to the rest of Europe.',
    category: 'history',
    difficulty: 'hard',
    timeLimit: 25
  },
  
  // Technology
  {
    id: 16,
    question: 'What does CPU stand for?',
    options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Process Unit', 'Central Processor Unit'],
    correctAnswer: 0,
    explanation: 'CPU stands for Central Processing Unit, which is the primary component of a computer that processes instructions.',
    category: 'technology',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 17,
    question: 'Which company created the iPhone?',
    options: ['Microsoft', 'Google', 'Apple', 'Samsung'],
    correctAnswer: 2,
    explanation: 'The iPhone was created by Apple Inc. and was first released in 2007 by Steve Jobs.',
    category: 'technology',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 18,
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
    correctAnswer: 0,
    explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.',
    category: 'technology',
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 19,
    question: 'Which of these is NOT a programming language?',
    options: ['Java', 'Python', 'Photoshop', 'Ruby'],
    correctAnswer: 2,
    explanation: 'Photoshop is not a programming language; it is a graphics editing software developed by Adobe.',
    category: 'technology',
    difficulty: 'medium',
    timeLimit: 20
  },
  {
    id: 20,
    question: 'What year was the World Wide Web invented?',
    options: ['1989', '1991', '1995', '2000'],
    correctAnswer: 0,
    explanation: 'The World Wide Web was invented by Tim Berners-Lee in 1989 while working at CERN.',
    category: 'technology',
    difficulty: 'medium',
    timeLimit: 20
  }
];