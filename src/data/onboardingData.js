export const onboardingQuestions = [
    {
        id: 'self_esteem',
        category: '자아존중감',
        title: '나 자신에 대해 어떻게 생각하시나요?',
        questions: [
            {
                id: 'se_1',
                text: '나는 내가 가치 있는 사람이라고 생각한다.',
                options: [
                    { value: 1, label: '전혀 그렇지 않다' },
                    { value: 2, label: '그렇지 않다' },
                    { value: 3, label: '보통이다' },
                    { value: 4, label: '그렇다' },
                    { value: 5, label: '매우 그렇다' }
                ]
            },
            {
                id: 'se_2',
                text: '나는 대체로 나 자신에게 만족한다.',
                options: [
                    { value: 1, label: '전혀 그렇지 않다' },
                    { value: 2, label: '그렇지 않다' },
                    { value: 3, label: '보통이다' },
                    { value: 4, label: '그렇다' },
                    { value: 5, label: '매우 그렇다' }
                ]
            }
        ]
    },
    {
        id: 'stress',
        category: '스트레스 대처',
        title: '힘든 일이 있을 때 어떻게 하시나요?',
        questions: [
            {
                id: 'st_1',
                text: '스트레스를 받으면 쉽게 짜증이 나거나 우울해진다.',
                options: [
                    { value: 1, label: '전혀 그렇지 않다' },
                    { value: 2, label: '그렇지 않다' },
                    { value: 3, label: '보통이다' },
                    { value: 4, label: '그렇다' },
                    { value: 5, label: '매우 그렇다' }
                ]
            },
            {
                id: 'st_2',
                text: '힘든 일이 생기면 주변 사람들에게 도움을 요청한다.',
                options: [
                    { value: 1, label: '전혀 그렇지 않다' },
                    { value: 2, label: '그렇지 않다' },
                    { value: 3, label: '보통이다' },
                    { value: 4, label: '그렇다' },
                    { value: 5, label: '매우 그렇다' }
                ]
            }
        ]
    },
    {
        id: 'relationship',
        category: '대인관계',
        title: '다른 사람들과의 관계는 어떠신가요?',
        questions: [
            {
                id: 'rel_1',
                text: '새로운 사람을 만나는 것이 즐겁다.',
                options: [
                    { value: 1, label: '전혀 그렇지 않다' },
                    { value: 2, label: '그렇지 않다' },
                    { value: 3, label: '보통이다' },
                    { value: 4, label: '그렇다' },
                    { value: 5, label: '매우 그렇다' }
                ]
            },
            {
                id: 'rel_2',
                text: '나는 내 감정을 솔직하게 표현하는 편이다.',
                options: [
                    { value: 1, label: '전혀 그렇지 않다' },
                    { value: 2, label: '그렇지 않다' },
                    { value: 3, label: '보통이다' },
                    { value: 4, label: '그렇다' },
                    { value: 5, label: '매우 그렇다' }
                ]
            }
        ]
    }
];

// Flatten for compatibility with Onboarding.jsx
export const onboardingData = onboardingQuestions.flatMap(section =>
    section.questions.map(q => ({
        id: q.id,
        category: section.category,
        question: q.text,
        options: q.options
    }))
);

