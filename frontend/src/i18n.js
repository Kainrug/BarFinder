import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				city: 'Filter By City',
				sortBy: 'Sort By',
				latest: 'Newest',
				bestRated: 'Best Rated',
				oldest: 'Oldest',
				worstRated: 'Worst Rated',
				filter: 'Filter',
				details: 'Details',
				noFiltering: 'No Filtering',
				searchBarsLabel: 'Search bars by name...',
				searching: 'Searching...',
				search: 'Search',
				noResults: 'No results to display.',
				fetchBarsError: 'Error fetching bars.',
				searchError: 'Error during bar search.',
			},
		},
		pl: {
			translation: {
				city: 'Filtruj Po Mieście',
				sortBy: 'Sortuj według',
				latest: 'Najnowsze',
				bestRated: 'Najlepiej oceniane',
				oldest: 'Najstarsze',
				worstRated: 'Najgorzej oceniane',
				filter: 'Filtruj',
				details: 'Szczegóły',
				noFiltering: 'Brak filtrowania',
				searchBarsLabel: 'Szukaj barów po nazwie...',
				searching: 'Szukanie...',
				search: 'Szukaj',
				noResults: 'Brak wyników do wyświetlenia.',
				fetchBarsError: 'Błąd podczas pobierania barów.',
				searchError: 'Błąd podczas wyszukiwania barów.',
			},
		},
	},
	lng: 'en',
})

export default i18n
