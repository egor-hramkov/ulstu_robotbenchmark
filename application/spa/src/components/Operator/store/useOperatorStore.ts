import { ProblemUser } from "@/shared/api";
import { create } from "zustand";

interface Problems {
    issueName: string;
    current: boolean;
    checked: boolean;
}

interface ProblemsStore {
    problems: ProblemUser[];
    currentIndex: number; // To track the current task index
    currentProblem?: ProblemUser;
    nextProblem: () => void; // Move to the next problem
    lastProblem: () => void; // Move to the previous problem
    setCurrentProblem: (problem: ProblemUser) => void;
    checkCurrentProblem: () => void; // Mark current problem as checked
    setProblems: (problems: ProblemUser[]) => void; // Initialize problems
}

export const useOperatorStore = create<ProblemsStore>((set, get) => ({
    problems: [],
    currentIndex: 0,

    setProblems: (problems) => {
        set({ problems: problems, currentIndex: 0 }); // Set problems and reset current index
    },

    nextProblem: () => {
        set((state) => {
            const nextIndex = (state.currentIndex + 1) % state.problems.length; // Loop to first
            const nextProblem = state.problems[nextIndex];
            console.log(nextProblem);
            return { currentProblem: nextProblem, currentIndex: nextIndex };
        });
    },

    lastProblem: () => {
        set((state) => {
            const prevIndex = (state.currentIndex - 1 + state.problems.length) % state.problems.length; // Loop to last
            const prevProblem = state.problems[prevIndex];
            return { currentProblem: prevProblem, currentIndex: prevIndex };
        });
    },

    checkCurrentProblem: () => {
        set((state) => {
            const updatedProblems = state.problems.map((problem, index) => ({
                ...problem,
                checked: index === state.currentIndex ? !problem.status : problem.checked, // Toggle checked for current
            }));
            return { problems: updatedProblems };
        });
    },

    setCurrentProblem: (problem: ProblemUser) => {
        set({currentProblem: problem});
    }
}));