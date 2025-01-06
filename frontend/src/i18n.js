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
				enterCity: 'Enter city',
				fetchBarsError: 'Error fetching bars',
				viewDetails: 'View Details',
				barsInThisLocation: 'Bars in this location',
				enterLocation: 'Enter Location',
				detailsBar: 'Bar Details',
				matchTransmision: 'Match Transmision',
				home: 'Home',
				bars: 'Bars',
				loading: 'Loading',
				noRating: 'No Rating',
				barDescription: 'Bar Description',
				city: 'City',
				viewMenu: 'View Menu',
				addMatch: 'Add Match',
				matchSchedule: 'Match Schedule',
				leaveComment: 'Leave a comment',
				submitReview: 'Submit Review',
				editReview: 'Edit Review',
				saveChanges: 'Save Changes',
				cancel: 'Cancel',
				edit: 'Edit',
				delete: 'Delete',
				reviewSubmitted: 'Review submitted successfully',
				reviewAddError: 'Error submitting review',
				reviewDeleted: 'Review deleted',
				loadingReviews: 'Loading reviews...',
				noReviewsYet: 'No reviews yet',
				matchAssigned: 'Match assigned successfully',
				matchAssignError: 'Error assigning match',
				matchAssign: 'Assign Match',
				chooseMatch: 'Choose Match',
				addReview: 'Add Review',
				yourReview: 'Your Review',
				stars: 'stars',
				addYourReview: 'Write your review...',
				back: 'Back',
				addItem: 'Add Item',
				menuTitle: 'Bar Menu',
				noItemsInMenu: 'No menu items available.',
				addNewItem: 'Add New Item',
				name: 'Name',
				description: 'Description',
				price: 'Price',
				imageUrl: 'Image URL',
				add: 'Add',
				team1: 'Team 1',
				team2: 'Team 2',
				matchDate: 'Match Date',
				closeForm: 'Close Form',
				matchAdded: 'Match has been added!',
				matchDeleted: 'Match has been deleted!',
				matchDeleteError: 'Error deleting match.',
				formError: 'Please fix the errors in the form.',
				matchDateRequired: 'Match date is required.',
				matchDateFuture: 'Match date must be in the future.',
				team1Required: 'Team 1 is required.',
				team2Required: 'Team 2 is required.',
				sportRequired: 'Sport is required.',
				subscriptionSuccess: 'Successfully subscribed {numberOfUsers} people to this match!',
				subscriptionError: 'Failed to subscribe. Please try again.',
				errorFetchingMatchDetails: 'Error fetching match details:',
				barsBroadcastingMatch: 'Bars broadcasting the match',
				numberOfPeople: 'Number of people',
				subscribeToMatch: 'Subscribe to match',
				noBarsBroadcasting: 'No bars are broadcasting this match.',
				matchNotFound: 'Match not found.',
				noSignings: 'You have no signings',
				match: 'Match',
				user: 'User',
				yourSubscriptions: 'Your Subscriptions',
				matches: 'Matches',
				signUp: 'Sign Up',
				addBar: 'Add Bar',
				subs: 'Subscriptions',
				signOut: 'Sign Out',
				usernameLabel: 'Username',
				passwordLabel: 'Password',
				alreadyHaveAccount: 'Already have an account?',
				login: 'Log in',
				selectRole: 'Select Role',
				barOwnerRole: 'Bar Owner',
				doNotHaveAcc: 'You do not have account',
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
				enterCity: 'Wprowadź miasto',
				fetchBarsError: 'Błąd podczas pobierania barów',
				viewDetails: 'Zobacz szczegóły',
				barsInThisLocation: 'Bary w tej lokalizacji',
				enterLocation: 'Wpisz Lokalizację',
				detailsBar: 'Szczegóły Baru',
				matchTransmision: 'Repertuar meczów',
				home: 'Strona główna',
				bars: 'Bary',
				loading: 'Ładowanie',
				noRating: 'Brak ocen',
				barDescription: 'Opis baru',
				city: 'Miasto',
				viewMenu: 'Zobacz menu',
				addMatch: 'Dodaj mecz do repertuaru',
				matchSchedule: 'Harmonogram meczów',
				leaveComment: 'Zostaw komentarz',
				submitReview: 'Zatwierdź opinię',
				editReview: 'Edytuj opinię',
				saveChanges: 'Zapisz zmiany',
				cancel: 'Anuluj',
				edit: 'Edytuj',
				delete: 'Usuń',
				reviewSubmitted: 'Opinia została pomyślnie wysłana',
				reviewAddError: 'Błąd podczas dodawania opinii',
				reviewDeleted: 'Opinia została usunięta',
				loadingReviews: 'Ładowanie opinii...',
				noReviewsYet: 'Brak opinii',
				matchAssigned: 'Mecz został przypisany pomyślnie',
				matchAssignError: 'Błąd podczas przypisywania meczu',
				matchAssign: 'Przypisz mecz do baru',
				chooseMatch: 'Wybierz mecz',
				addReview: 'Dodaj opinię',
				yourReview: 'Twoja Ocena',
				stars: 'gwiazdek',
				addYourReview: 'Napisz swoją opinię...',
				back: 'Powrót',
				addItem: 'Dodaj pozycję',
				menuTitle: 'Menu Baru',
				noItemsInMenu: 'Brak dostępnych pozycji w menu.',
				addNewItem: 'Dodaj nową pozycję',
				name: 'Nazwa',
				description: 'Opis',
				price: 'Cena',
				imageUrl: 'URL Obrazu',
				add: 'Dodaj',
				team1: 'Drużyna 1',
				team2: 'Drużyna 2',
				matchDate: 'Data meczu',
				closeForm: 'Zamknij formularz',
				matchAdded: 'Mecz został dodany!',
				matchDeleted: 'Mecz został usunięty!',
				matchDeleteError: 'Błąd podczas usuwania meczu.',
				formError: 'Popraw błędy w formularzu.',
				matchDateRequired: 'Data meczu jest wymagana.',
				matchDateFuture: 'Data meczu musi być w przyszłości.',
				team1Required: 'Pierwsza drużyna jest wymagana.',
				team2Required: 'Druga drużyna jest wymagana.',
				sportRequired: 'Dyscyplina sportowa jest wymagana.',
				subscriptionSuccess: 'Zapisano {numberOfUsers} osób na mecz!',
				subscriptionError: 'Nie udało się zapisać. Spróbuj ponownie.',
				errorFetchingMatchDetails: 'Błąd podczas pobierania szczegółów meczu:',
				barsBroadcastingMatch: 'Bary transmitujące mecz',
				numberOfPeople: 'Liczba osób',
				subscribeToMatch: 'Zapisz się na mecz',
				noBarsBroadcasting: 'Brak barów transmitujących ten mecz.',
				matchNotFound: 'Mecz nie znaleziony.',
				noSignings: 'Nie masz żadnych zapisów',
				match: 'Mecz',
				user: 'Użytkownik',
				yourSubscriptions: 'Twoje Subskrybcje',
				matches: 'Mecze',
				signUp: 'Zarejestruj się',
				addBar: 'Dodaj Bar',
				subs: 'Subskrybcje',
				signOut: 'Wyloguj się',
				usernameLabel: 'Nazwa użytkownika',
				passwordLabel: 'Hasło',
				alreadyHaveAccount: 'Masz już konto?',
				login: 'Zaloguj się',
				selectRole: 'Wybierz rolę',
				barOwnerRole: 'Właściciel Baru',
				doNotHaveAcc: 'Nie masz konta',
			},
		},
	},
	lng: 'pl',
})

export default i18n
