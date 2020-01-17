const disabledStyleClass = ' disabled';

// Den übergebenen Button deaktivieren
export function disableButton(button) {
    button.disabled = true;
    button.className += disabledStyleClass;
}

// Den übergebenen Button aktivieren
export function enableButton(button) {
    button.disabled = false;
    button.className = button.className.replace(disabledStyleClass, '');
}
