import { create } from 'zustand';

export const useTicketStore = create((set) => ({
    ticketStats: null,
    fetchTicketStats: async (movieName) => {
        try {
            const response = await fetch(`/api/tickets/${encodeURIComponent(movieName)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch ticket statistics');
            }
            const data = await response.json();
            set({ ticketStats: data.data }); // Assuming the response structure
        } catch (error) {
            console.error('Error fetching ticket stats:', error);
            set({ ticketStats: null }); // Reset stats on error
        }
    },
    resetTicketStats: () => set({ ticketStats: null }), // Optional: reset stats
}));