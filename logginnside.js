import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

/* SUPABASE */
const supabase = createClient(
  "https://enqtcoensqhabwxdqiba.supabase.co",
  "sb_publishable_0kBQILhwtUU4r9Xxwz1SqQ_XHCTO5GW",
);

/* ELEMENTER */
const panel = document.getElementById("authPanel");
const openBtn = document.getElementById("openAuth");
const closeBtn = document.getElementById("closeAuth");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginMsg = document.getElementById("loginMsg");
const signupMsg = document.getElementById("signupMsg");

const tabs = document.querySelectorAll("[data-tab]");

/* PANEL */
openBtn.onclick = () => panel.classList.add("open");
closeBtn.onclick = () => panel.classList.remove("open");

/* TABS */
tabs.forEach((btn) => {
  btn.onclick = () => {
    tabs.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    loginForm.style.display = tab === "login" ? "" : "none";
    signupForm.style.display = tab === "signup" ? "" : "none";
  };
});

/* LOGIN */
loginForm.onsubmit = async (e) => {
  e.preventDefault();
  loginMsg.textContent = "Logger inn...";

  const email = loginEmail.value.trim();
  const password = loginPass.value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    loginMsg.textContent = "Feil: " + error.message;
    return;
  }

  loginMsg.textContent = "Innlogget ✅";
  window.location.href =
    "https://eriksamjr2-pixel.github.io/tverrfaglig-prosjekt/index.html";
};

/* SIGNUP */
signupForm.onsubmit = async (e) => {
  e.preventDefault();
  signupMsg.textContent = "Oppretter konto...";

  const email = signupEmail.value.trim();
  const password = signupPass.value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  signupMsg.textContent = error
    ? "Feil: " + error.message
    : "Konto opprettet ✅ Du kan logge inn nå";
};

/* AUTO-REDIRECT HVIS INNLOGGET */
const {
  data: { user },
} = await supabase.auth.getUser();

if (user) {
  window.location.href =
    "https://eriksamjr2-pixel.github.io/tverrfaglig-prosjekt/index.html";
}
