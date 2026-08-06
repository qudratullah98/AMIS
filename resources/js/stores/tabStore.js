// stores/tabStore.js
import { create } from 'zustand';

const useTabStore = create((set) => ({
    activeTab: 'certificates',
    changeTab: (tab) => {
        set({ activeTab: tab });
    },
}));

export default useTabStore;