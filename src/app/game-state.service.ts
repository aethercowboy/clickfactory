import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private storageKey = "clickfactory-state";

  saveState(state: any) : void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  loadState(): any {
    const state = localStorage.getItem(this.storageKey);
    return state ? JSON.parse(state): null;
  }

  clearState(): void {
    localStorage.removeItem(this.storageKey);
  }
}
