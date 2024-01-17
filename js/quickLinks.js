const quickLinksList = document.querySelector(".quick-links-list");
const addQuickLinkButton = document.querySelector(".add-quick-link-button");

const newQuickLinkForm = document.querySelector(".new-quick-link-form");
const newQuickLinkCancel = document.querySelector(".new-quick-link-cancel");
const newQuickLinkSubmit = document.querySelector(".new-quick-link-submit");
const newQuickLinkTitle = document.querySelector("#new-quick-link-title");
const newQuickLinkUrl = document.querySelector("#new-quick-link-url");
const missingTitleErrorMessage = document.querySelector(
  ".new-quick-link-title-wrapper h4"
);
const missingUrlErrorMessage = document.querySelector(
  ".new-quick-link-url-wrapper h4"
);

//Extra TODO: add edit quick link below remove

const checkQuickLinkMoveButtons = () => {
  //Reset all
  quickLinksList.childNodes.forEach((quickLink) => {
    const moveQuickLinkUpButton = quickLink.querySelector(
      ".move-quick-link-up-button"
    );
    moveQuickLinkUpButton.classList.remove("move-quick-link-button-disabled");
    moveQuickLinkUpButton.disabled = false;

    const moveQuickLinkDownButton = quickLink.querySelector(
      ".move-quick-link-down-button"
    );
    moveQuickLinkDownButton.classList.remove("move-quick-link-button-disabled");
    moveQuickLinkDownButton.disabled = false;
  });

  //Hide correct
  if (quickLinksList.childElementCount > 0) {
    const firstQuickLinkUpButton = quickLinksList.firstChild.querySelector(
      ".move-quick-link-up-button"
    );
    firstQuickLinkUpButton.classList.add("move-quick-link-button-disabled");
    firstQuickLinkUpButton.disabled = true;

    const lastQuickLinkDownButton = quickLinksList.lastChild.querySelector(
      ".move-quick-link-down-button"
    );
    lastQuickLinkDownButton.classList.add("move-quick-link-button-disabled");
    lastQuickLinkDownButton.disabled = true;
  }
};

const removeQuickLink = (event) => {
  event.preventDefault();

  const quickLinkObject = event.target.closest(".quick-link");
  const quickLinkId = quickLinkObject.id;

  const userQuickLinks =
    JSON.parse(localStorage.getItem("user-quick-links")) || [];

  localStorage.setItem(
    "user-quick-links",
    JSON.stringify(
      userQuickLinks.filter((quickLink) => quickLink.id != quickLinkId)
    )
  );

  quickLinksList.removeChild(quickLinkObject);
  checkQuickLinkMoveButtons();
};

const moveQuickLinkUp = (event) => {
  event.preventDefault();

  const quickLinkObject = event.target.closest(".quick-link");
  const previousSibling = quickLinkObject.previousSibling;
  if (previousSibling) {
    quickLinksList.insertBefore(quickLinkObject, previousSibling);

    //Update saved order
    const userQuickLinks =
      JSON.parse(localStorage.getItem("user-quick-links")) || [];

    const quickLinkObjectIndex = userQuickLinks.findIndex(
      (x) => x.id == quickLinkObject.id
    );
    const previousSiblingIndex = userQuickLinks.findIndex(
      (x) => x.id == previousSibling.id
    );

    const tempQuickLinkObject = userQuickLinks[quickLinkObjectIndex];
    userQuickLinks[quickLinkObjectIndex] = userQuickLinks[previousSiblingIndex];
    userQuickLinks[previousSiblingIndex] = tempQuickLinkObject;

    localStorage.setItem("user-quick-links", JSON.stringify(userQuickLinks));
    checkQuickLinkMoveButtons();
  }
};

const moveQuickLinkDown = (event) => {
  event.preventDefault();

  const quickLinkObject = event.target.closest(".quick-link");
  const nextSibling = quickLinkObject.nextSibling;
  if (nextSibling) {
    quickLinksList.insertBefore(quickLinkObject, nextSibling.nextSibling);

    //Update saved order
    const userQuickLinks =
      JSON.parse(localStorage.getItem("user-quick-links")) || [];

    const quickLinkObjectIndex = userQuickLinks.findIndex(
      (x) => x.id == quickLinkObject.id
    );
    const nextSiblingIndex = userQuickLinks.findIndex(
      (x) => x.id == nextSibling.id
    );

    const tempQuickLinkObject = userQuickLinks[quickLinkObjectIndex];
    userQuickLinks[quickLinkObjectIndex] = userQuickLinks[nextSiblingIndex];
    userQuickLinks[nextSiblingIndex] = tempQuickLinkObject;

    localStorage.setItem("user-quick-links", JSON.stringify(userQuickLinks));
    checkQuickLinkMoveButtons();
  }
};

const loadSingleQuickLink = (quickLinkData) => {
  const quickLink = document.createElement("a");
  quickLink.classList.add("quick-link");
  quickLink.href = `${
    quickLinkData.url.startsWith("http://") ||
    quickLinkData.url.startsWith("https://")
      ? quickLinkData.url
      : "http://" + quickLinkData.url
  }`;
  quickLink.target = "_blank";
  quickLink.id = `${quickLinkData.id}`;

  const quickLinkFaviconTitleWrapper = document.createElement("div");
  quickLinkFaviconTitleWrapper.classList.add(
    "quick-link-favicon-title-wrapper"
  );

  const quickLinkFavicon = document.createElement("img");
  quickLinkFavicon.classList.add("quick-link-favicon");
  quickLinkFavicon.src = `https://s2.googleusercontent.com/s2/favicons?domain_url=${quickLinkData.url}`;
  quickLinkFavicon.alt = `${quickLinkData.title} icon`;
  quickLinkFaviconTitleWrapper.appendChild(quickLinkFavicon);

  const quickLinkTitle = document.createElement("h3");
  quickLinkTitle.classList.add("quick-link-title");
  quickLinkTitle.textContent = `${quickLinkData.title}`;
  quickLinkFaviconTitleWrapper.appendChild(quickLinkTitle);
  quickLink.appendChild(quickLinkFaviconTitleWrapper);

  const quickLinkControls = document.createElement("div");
  quickLinkControls.classList.add("quick-link-controls");

  const removeQuickLinkButton = document.createElement("button");
  removeQuickLinkButton.classList.add("remove-quick-link-button");
  removeQuickLinkButton.type = "button";
  removeQuickLinkButton.title = "Ta bort snabblänk";
  removeQuickLinkButton.addEventListener("click", removeQuickLink);

  const removeQuickLinkButtonIcon = document.createElement("i");
  removeQuickLinkButtonIcon.classList.add("material-symbols-outlined");
  removeQuickLinkButtonIcon.textContent = "do_not_disturb_on";
  removeQuickLinkButton.appendChild(removeQuickLinkButtonIcon);

  quickLinkControls.appendChild(removeQuickLinkButton);

  const moveQuickLinkControls = document.createElement("div");
  moveQuickLinkControls.classList.add("move-quick-link-controls");

  const moveQuickLinkUpButton = document.createElement("button");
  moveQuickLinkUpButton.classList.add("move-quick-link-up-button");
  moveQuickLinkUpButton.type = "button";
  moveQuickLinkUpButton.title = "Flytta up snabblänk";
  moveQuickLinkUpButton.addEventListener("click", moveQuickLinkUp);

  const moveQuickLinkUpButtonIcon = document.createElement("i");
  moveQuickLinkUpButtonIcon.classList.add("material-symbols-outlined");
  moveQuickLinkUpButtonIcon.textContent = "arrow_drop_up";
  moveQuickLinkUpButton.appendChild(moveQuickLinkUpButtonIcon);
  moveQuickLinkControls.appendChild(moveQuickLinkUpButton);

  const moveQuickLinkDownButton = document.createElement("button");
  moveQuickLinkDownButton.classList.add("move-quick-link-down-button");
  moveQuickLinkDownButton.type = "button";
  moveQuickLinkDownButton.title = "Flytta ner snabblänk";
  moveQuickLinkDownButton.addEventListener("click", moveQuickLinkDown);

  const moveQuickLinkDownButtonIcon = document.createElement("i");
  moveQuickLinkDownButtonIcon.classList.add("material-symbols-outlined");
  moveQuickLinkDownButtonIcon.textContent = "arrow_drop_down";
  moveQuickLinkDownButton.appendChild(moveQuickLinkDownButtonIcon);
  moveQuickLinkControls.appendChild(moveQuickLinkDownButton);

  quickLinkControls.appendChild(moveQuickLinkControls);
  quickLink.appendChild(quickLinkControls);

  quickLinksList.appendChild(quickLink);
};

const loadQuickLinks = () => {
  quickLinksList.innerHTML = "";

  const userQuickLinks =
    JSON.parse(localStorage.getItem("user-quick-links")) || [];

  userQuickLinks.forEach((quickLinkData) => {
    loadSingleQuickLink(quickLinkData);
  });
  checkQuickLinkMoveButtons();
};

loadQuickLinks();

const showAddNewQuickLink = () => {
  newQuickLinkForm.style.display = "flex";
  newQuickLinkTitle.value = "";
  newQuickLinkUrl.value = "";

  quickLinksList.style.display = "none";
  addQuickLinkButton.style.display = "none";
};
addQuickLinkButton.addEventListener("click", showAddNewQuickLink);

const hideAddNewQuickLink = () => {
  newQuickLinkForm.style.display = "none";

  quickLinksList.style.display = "flex";
  addQuickLinkButton.style.display = "flex";

  missingTitleErrorMessage.classList.remove("error-message-active");
  missingUrlErrorMessage.classList.remove("error-message-active");
};
newQuickLinkCancel.addEventListener("click", hideAddNewQuickLink);

const addQuickLink = (event) => {
  event.preventDefault();

  missingTitleErrorMessage.classList.remove("error-message-active");
  missingUrlErrorMessage.classList.remove("error-message-active");
  if (newQuickLinkTitle.value.length < 1 || newQuickLinkUrl.value.length < 1) {
    if (newQuickLinkTitle.value.length < 1)
      missingTitleErrorMessage.classList.add("error-message-active");
    if (newQuickLinkUrl.value.length < 1)
      missingUrlErrorMessage.classList.add("error-message-active");
    return;
  }

  const newQuickLink = {
    id: Date.now(),
    title: newQuickLinkTitle.value,
    url: newQuickLinkUrl.value,
  };

  const userQuickLinks =
    JSON.parse(localStorage.getItem("user-quick-links")) || [];

  localStorage.setItem(
    "user-quick-links",
    JSON.stringify([...userQuickLinks, newQuickLink])
  );

  loadSingleQuickLink(newQuickLink);
  checkQuickLinkMoveButtons();
  hideAddNewQuickLink();
};
newQuickLinkSubmit.addEventListener("click", addQuickLink);
