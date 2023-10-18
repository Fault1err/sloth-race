export function addInvisibility(): void {
  const winnerField: HTMLElement | null = document.querySelector('.winner-field');
  winnerField?.classList.add('invisible');
}

export function getGarageBlockCleared(): void {
  const headingContainer: HTMLElement | null = document.querySelector('.heading-container');
  if (headingContainer) {
    headingContainer.innerHTML = '';
  }
  const garageElscontainer: HTMLElement | null = document.querySelector('.garage-els-wrapper');
  if (garageElscontainer) {
    garageElscontainer.innerHTML = '';
  }
}

export function getGarageBlockClearedByRemove(): void {
  const headingContainer: HTMLElement | null = document.querySelector('.heading-container');
  if (headingContainer) {
    headingContainer.remove();
  }
  const garageElscontainer: HTMLElement | null = document.querySelector('.garage-els-wrapper');
  if (garageElscontainer) {
    garageElscontainer.remove();
  }
}
