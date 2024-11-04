import { create } from "zustand";

interface Problems {
    issueName: string;
    current: boolean;
    checked: boolean;
}

interface ProblemsStore {
    problems: Problems[];
    currentIndex: number; // To track the current task index
    nextProblem: () => void; // Move to the next problem
    lastProblem: () => void; // Move to the previous problem
    checkCurrentProblem: () => void; // Mark current problem as checked
    setProblems: (problems: number[]) => void; // Initialize problems
}

export const useOperatorStore = create<ProblemsStore>((set, get) => ({
    problems: [],
    currentIndex: 0,

    setProblems: (problems) => {
        const sortedProblems: Problems[] = problems.map((item) => ({
            issueName: `Задача #${item}`,
            current: false,
            checked: false,
        }));
        set({ problems: sortedProblems, currentIndex: 0 }); // Set problems and reset current index
    },

    nextProblem: () => {
        set((state) => {
            const nextIndex = (state.currentIndex + 1) % state.problems.length; // Loop to first
            const updatedProblems = state.problems.map((problem, index) => ({
                ...problem,
                current: index === nextIndex,
            }));
            return { problems: updatedProblems, currentIndex: nextIndex };
        });
    },

    lastProblem: () => {
        set((state) => {
            const prevIndex = (state.currentIndex - 1 + state.problems.length) % state.problems.length; // Loop to last
            const updatedProblems = state.problems.map((problem, index) => ({
                ...problem,
                current: index === prevIndex,
            }));
            return { problems: updatedProblems, currentIndex: prevIndex };
        });
    },

    checkCurrentProblem: () => {
        set((state) => {
            const updatedProblems = state.problems.map((problem, index) => ({
                ...problem,
                checked: index === state.currentIndex ? !problem.checked : problem.checked, // Toggle checked for current
            }));
            return { problems: updatedProblems };
        });
    },
}));