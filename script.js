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
