import { Injectable } from '@angular/core';

export interface Technology {
  name: string;
  description: string;
  unlocked: boolean;
  unlockCondition: () => boolean;
  onUnlock?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private technologies: Technology[] = [
    {
      name: "Drop Pod",
      description: "Congratulations. You've arrived on the planet. Now what?",
      unlocked: true,
      unlockCondition: () => true
    },
    {
      name: "Iron Mining",
      description: "Unlock the ability to mine iron.",
      unlocked: false,
      unlockCondition: () => false
    },
    {
      name: "Copper Mining",
      description: "Unlock the ability to mine copper.",
      unlocked: false,
      unlockCondition: () => false
    }
  ];

  getTechnologies(): Technology[] {
    return this.technologies;
  }

  isTechnologyUnlocked(techName: string): boolean {
    const tech = this.technologies.find(t => t.name === techName);
    return tech ? tech.unlocked : false;
  }

  isTechnologyVisible(techName: string): boolean {
    const tech = this.technologies.find(t => t.name === techName);
    return tech ? tech.unlockCondition() && !tech.unlocked : false;
  }

  unlockTechnology(techName: string) {
    const tech = this.technologies.find(t => t.name === techName);
    if (tech && tech.unlockCondition()) {
      tech.unlocked = true;
    }
  }

  saveTechnologies(): any {
    return this.technologies;
  }

  loadTechnologies(state: any): void {
    this.technologies = state;
  }
}
