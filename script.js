// Each attraction's real content — every card passes its own id into
// showDetail() so the detail/book/confirm screens always match the card
// that was tapped, instead of the old hardcoded Volcano Rim Hike markup.
const ACTIVITIES = {
  volcano: {
    title: "Volcano Rim Hike",
    meta: "Half-day · Moderate difficulty · Ages 8+ · Meets at Merriton Landing",
    desc: "Guided hike to the rim of Taniti's volcano with a certified local guide. Water, transport, and safety gear included.",
    reviews: "★★★★☆ 128 reviews",
    price: 45,
    meetPoint: "Merriton Landing kiosk"
  },
  snorkel: {
    title: "Snorkeling, Yellow Leaf Bay",
    meta: "2 hours · Easy · All ages · Meets at Taniti City pier",
    desc: "Shallow-reef snorkeling in calm, clear water inside Yellow Leaf Bay. Gear and a guide included; great for first-timers.",
    reviews: "★★★★★ 95 reviews",
    price: 30,
    meetPoint: "Taniti City pier"
  },
  zipline: {
    title: "Rainforest Zip-line",
    meta: "3 hours · Moderate · Ages 10+ · Meets at Merriton Landing",
    desc: "Six-line zip-line course through the rainforest canopy, finishing near a lookout over the coast.",
    reviews: "★★★★☆ 61 reviews",
    price: 60,
    meetPoint: "Merriton Landing trailhead"
  }
};

let currentActivity = "volcano";

function showDetail(id){
  currentActivity = id;
  const a = ACTIVITIES[id];
  document.getElementById('d-title').textContent = a.title;
  document.getElementById('d-meta').textContent = a.meta;
  document.getElementById('d-desc').textContent = a.desc;
  document.getElementById('d-reviews').textContent = a.reviews;
  document.getElementById('d-book-btn').textContent = "Book Now — $" + a.price + "/person";
  document.getElementById('b-title').textContent = a.title;
  go('detail');
  updateSummary();
}

function updateSummary(){
  const a = ACTIVITIES[currentActivity];
  const party = document.getElementById('b-party').value || 1;
  document.getElementById('b-summary').innerHTML =
    "<b>Order Summary</b><br>" + party + " guests × $" + a.price + " = $" + (party * a.price);
  document.getElementById('c-summary').innerHTML =
    "<b>" + a.title + "</b><br>Saturday · 10:00 AM · " + party + " guests<br>" +
    "Confirmation #TN-0472<br>Meet at " + a.meetPoint;
}

function go(id){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// Explore-page filters. Multiple selected filters are combined.
// Example: Family-friendly + Under $50 shows only matching activities.
const activeFilters = new Set(["family"]);

function activityMatchesFilters(card) {
  for (const filter of activeFilters) {
    if (filter === "family" && card.dataset.family !== "true") return false;
    if (filter === "beach" && card.dataset.category !== "beach") return false;
    if (filter === "rainforest" && card.dataset.category !== "rainforest") return false;
    if (filter === "under3" && Number(card.dataset.duration) >= 3) return false;
    if (filter === "under50" && Number(card.dataset.price) >= 50) return false;
  }
  return true;
}

function applyExploreFilters() {
  const cards = [...document.querySelectorAll("#explore .listcard")];
  let visibleCount = 0;

  cards.forEach(card => {
    const visible = activityMatchesFilters(card);
    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  const count = document.getElementById("results-count");
  if (count) {
    count.textContent =
      visibleCount === 1 ? "Showing 1 activity" : `Showing ${visibleCount} activities`;
  }
}

document.querySelectorAll("#explore .chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;

    if (activeFilters.has(filter)) {
      activeFilters.delete(filter);
      chip.classList.remove("on");
      chip.setAttribute("aria-pressed", "false");
    } else {
      activeFilters.add(filter);
      chip.classList.add("on");
      chip.setAttribute("aria-pressed", "true");
    }

    applyExploreFilters();
  });
});

applyExploreFilters();

