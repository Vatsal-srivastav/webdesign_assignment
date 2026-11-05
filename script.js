// Add events here; startsAt is the single source for the displayed date and countdown.
const events = [
  {
    id: 'long-table-supper',
    title: 'The long table supper',
    category: 'food',
    categoryLabel: 'Food & drink',
    startsAt: '2026-12-14T18:30:00',
    venue: 'Juniper & Rye',
    address: '18 Orchard Street',
    price: '$38',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=82',
    alt: 'A candlelit long table set for a shared dinner',
    description: 'One long table, a seasonal menu made for passing around, and strangers who won’t be strangers for long. Come hungry, leave with new names in your phone.',
    search: 'dinner supper restaurant community seasonal gathering'
  },
  {
    id: 'slow-sunday-studio',
    title: 'Slow Sunday studio',
    category: 'wellbeing',
    categoryLabel: 'Wellbeing',
    startsAt: '2026-12-20T10:00:00',
    venue: 'Stillwater Studio',
    address: '204 West 11th Street',
    price: '$24',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=82',
    alt: 'A calm, light-filled room set up for a restorative yoga session',
    description: 'A gentle morning reset with movement, a little guided breathing, and absolutely no pressure to touch your toes. Tea and a soft landing included.',
    search: 'yoga meditation mindful wellness movement relaxation'
  },
  {
    id: 'listening-room',
    title: 'The listening room',
    category: 'music',
    categoryLabel: 'Music',
    startsAt: '2027-01-08T20:00:00',
    venue: 'Side B Records',
    address: '42 Mercer Avenue',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1000&q=82',
    alt: 'A musician performing live in a softly lit listening room',
    description: 'An intimate night of live acoustic sets, deep cuts, and the kind of sound that makes you forget to check your phone. Local artists, close-up seats.',
    search: 'live music singer concert performance acoustic records'
  },
  {
    id: 'make-something-saturday',
    title: 'Make something Saturday',
    category: 'culture',
    categoryLabel: 'Culture',
    startsAt: '2027-01-16T13:00:00',
    venue: 'Soft Corner Workshop',
    address: '7 E. 4th Street',
    price: '$32',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1000&q=82',
    alt: 'A colorful creative workshop with art materials laid out on a table',
    description: 'No experience, no blank-page panic. Just an afternoon of playful making, good materials, and the permission to make something gloriously imperfect.',
    search: 'art craft workshop drawing painting creative hands-on'
  },
  {
    id: 'market-after-hours',
    title: 'Market after hours',
    category: 'food',
    categoryLabel: 'Food & drink',
    startsAt: '2027-01-22T18:00:00',
    venue: 'The Glasshouse Market',
    address: '90 Greenpoint Avenue',
    price: '$12',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1000&q=82',
    alt: 'A lively indoor market filled with small independent food and maker stalls',
    description: 'The market, after the shutters stay up. Meet the makers, try a little of everything, and find the kind of small-batch thing you’ll tell everyone about.',
    search: 'market food vendor small business shopping tasting local makers'
  },
  {
    id: 'city-in-color',
    title: 'The city in color',
    category: 'culture',
    categoryLabel: 'Culture',
    startsAt: '2027-01-30T11:00:00',
    venue: 'Meet at the Old Post Office',
    address: '1 Franklin Square',
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=82',
    alt: 'Colorful city buildings lining a lively urban street',
    description: 'A slow wander through the streets you thought you knew, led by a local photographer. Notice the overlooked details, bring a camera or just your eyes.',
    search: 'city walk photography architecture neighborhood explore tour'
  }
];

const cardDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
const detailDateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
const eventTimeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

function getEventSchedule(event) {
  const startsAt = new Date(event.startsAt);
  const cardDate = cardDateFormatter.formatToParts(startsAt);
  return {
    day: cardDate.find((part) => part.type === 'day').value,
    month: cardDate.find((part) => part.type === 'month').value.toUpperCase(),
    date: detailDateFormatter.format(startsAt),
    time: eventTimeFormatter.format(startsAt)
  };
}

const grid = document.querySelector('#event-grid');
const searchInput = document.querySelector('#event-search');
const resultCount = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const dialog = document.querySelector('#event-dialog');
const registrationForm = document.querySelector('#registration-form');
const successMessage = document.querySelector('#success-message');
const categoryButtons = [...document.querySelectorAll('.filter-chip')];
let activeCategory = 'all';
let searchTerm = '';

function renderEvents() {
  const matchingEvents = events.filter((event) => {
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const searchableText = `${event.title} ${event.venue} ${event.categoryLabel} ${event.description} ${event.search}`.toLowerCase();
    return matchesCategory && searchableText.includes(searchTerm);
  });

  grid.innerHTML = matchingEvents.map((event, index) => {
    const schedule = getEventSchedule(event);
    return `
    <article class="event-card" data-event-id="${event.id}" tabindex="0" role="button" aria-label="View details and register for ${event.title}" style="animation-delay:${index * 55}ms">
      <div class="event-image-wrap">
        <img class="event-image" src="${event.image}" alt="${event.alt}" loading="lazy" />
        <div class="event-date-badge"><span class="date-month">${schedule.month}</span><span class="date-day">${schedule.day}</span></div>
        <span class="event-category">${event.categoryLabel}</span>
      </div>
      <div class="card-content">
        <div class="card-topline"><time class="card-time" datetime="${event.startsAt}"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>${schedule.time}</time><span>${schedule.month} ${schedule.day}</span></div>
        <h3>${event.title}</h3>
        <p class="card-description">${event.description}</p>
        <div class="card-bottom"><span class="card-venue"><strong>${event.venue}</strong> · ${event.price}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
      </div>
    </article>
  `;
  }).join('');

  const total = String(matchingEvents.length).padStart(2, '0');
  resultCount.textContent = `${total} ${matchingEvents.length === 1 ? 'EVENT' : 'EVENTS'} TO LOOK FORWARD TO`;
  emptyState.hidden = matchingEvents.length > 0;
  grid.hidden = matchingEvents.length === 0;
}

function setCategory(button) {
  activeCategory = button.dataset.category;
  categoryButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  renderEvents();
}

function clearFilters() {
  searchInput.value = '';
  searchTerm = '';
  setCategory(categoryButtons[0]);
}

function openEvent(eventId) {
  const event = events.find((item) => item.id === eventId);
  if (!event) return;
  const schedule = getEventSchedule(event);

  document.querySelector('#dialog-image').src = event.image;
  document.querySelector('#dialog-image').alt = event.alt;
  document.querySelector('#dialog-category').textContent = event.categoryLabel;
  document.querySelector('#dialog-title').textContent = event.title;
  document.querySelector('#dialog-description').textContent = event.description;
  document.querySelector('#dialog-date').textContent = `${schedule.date} · ${schedule.time}`;
  document.querySelector('#dialog-venue').textContent = `${event.venue}, ${event.address}`;
  document.querySelector('#dialog-price').textContent = event.price;
  registrationForm.reset();
  document.querySelector('#selected-event').value = event.id;
  registrationForm.hidden = false;
  successMessage.hidden = true;
  document.querySelector('#registration-storage-error').hidden = true;
  clearValidation();
  dialog.showModal();
}

function clearValidation() {
  registrationForm.querySelectorAll('input:not([type="hidden"])').forEach((input) => input.removeAttribute('aria-invalid'));
  registrationForm.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
}

function validateField(input) {
  let message = '';
  const value = input.value.trim();
  if (input.required && !value) {
    message = 'Please fill this in.';
  } else if (input.name === 'name' && value.length < 2) {
    message = 'Please enter at least 2 characters.';
  } else if (input.name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = 'That email address doesn’t look quite right.';
  } else if (input.name === 'phone' && value) {
    const digitCount = value.replace(/\D/g, '').length;
    if (!/^\+?[\d\s().-]+$/.test(value) || digitCount < 7 || digitCount > 15) {
      message = 'Please enter a valid phone number with 7 to 15 digits.';
    }
  }

  const error = registrationForm.querySelector(`[data-error-for="${input.id}"]`);
  error.textContent = message;
  input.setAttribute('aria-invalid', String(Boolean(message)));
  return !message;
}

categoryButtons.forEach((button) => button.addEventListener('click', () => setCategory(button)));
searchInput.addEventListener('input', () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  renderEvents();
});
document.querySelectorAll('.clear-filters').forEach((button) => button.addEventListener('click', clearFilters));
grid.addEventListener('click', (event) => {
  const card = event.target.closest('[data-event-id]');
  if (card) openEvent(card.dataset.eventId);
});
grid.addEventListener('keydown', (event) => {
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-event-id]')) {
    event.preventDefault();
    openEvent(event.target.dataset.eventId);
  }
});
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
registrationForm.querySelectorAll('input:not([type="hidden"])').forEach((input) => {
  input.addEventListener('blur', () => { if (input.value || input.required) validateField(input); });
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validateField(input);
  });
});
registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputs = [...registrationForm.querySelectorAll('input:not([type="hidden"])')];
  const isValid = inputs.map(validateField).every(Boolean);
  if (!isValid) {
    registrationForm.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  const registration = {
    name: document.querySelector('#participant-name').value.trim(),
    email: document.querySelector('#participant-email').value.trim(),
    phone: document.querySelector('#participant-phone').value.trim(),
    eventId: document.querySelector('#selected-event').value,
    submittedAt: new Date().toISOString()
  };
  if (!saveRegistration(registration)) {
    document.querySelector('#registration-storage-error').hidden = false;
    return;
  }
  registrationForm.hidden = true;
  successMessage.hidden = false;
});

// Registration is demo-only: no data leaves this browser without a backend.
function saveRegistration(registration) {
  try {
    const stored = localStorage.getItem('commonGroundRegistrations');
    const registrations = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(registrations)) return false;
    registrations.push(registration);
    localStorage.setItem('commonGroundRegistrations', JSON.stringify(registrations));
    return true;
  } catch {
    return false;
  }
}

document.querySelector('.theme-toggle').addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  try {
    localStorage.setItem('commonGroundTheme', isDark ? 'dark' : 'light');
  } catch {
    // Theme switching still works for the current page if storage is unavailable.
  }
  document.querySelector('.theme-toggle').setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
});
let savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('commonGroundTheme') || 'light';
} catch {
  // Use the default theme when browser storage is unavailable.
}
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  document.querySelector('.theme-toggle').setAttribute('aria-label', 'Switch to light mode');
}

function updateCountdown() {
  const nextEvent = events.find((event) => new Date(event.startsAt).getTime() > Date.now());
  const countdown = document.querySelector('[data-countdown]');
  if (!nextEvent) {
    document.querySelector('[data-next-event]').textContent = 'More good things soon';
    countdown.textContent = 'MORE EVENTS COMING SOON';
    return;
  }
  document.querySelector('[data-next-event]').textContent = nextEvent.title;
  const remaining = new Date(nextEvent.startsAt).getTime() - Date.now();
  if (remaining <= 0) {
    countdown.textContent = 'HAPPENING SOON';
    return;
  }
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  countdown.textContent = `${days} DAYS, ${hours} HRS`; 
}

renderEvents();
updateCountdown();
setInterval(updateCountdown, 60000);
