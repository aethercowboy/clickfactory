import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../game-state.service';
import { InventoryService, InventorySlot } from '../inventory.service';
import { Technology, TechnologyService } from '../technology.service';
import { Building, BuildingService } from '../building.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  slots: InventorySlot[] = [];
  technologies: Technology[] = [];
  buildings: Building[] = [];
  availableBuildings: Building[] = [];

  world: {[key: string] : number} = {
    "HUB Parts": 1
  };

  constructor(
    private inventoryService: InventoryService, 
    private gameStateService: GameStateService,
    private technologyService: TechnologyService,
    private buildingService: BuildingService
  ) {
  }

  ngOnInit(): void {
    this.slots = this.inventoryService.getSlots();
    this.technologies = this.technologyService.getTechnologies();
    this.buildings = this.buildingService.getBuildings();
    this.loadGame();
  }

  hasWorldItem(item: string) {
    return this.world[item] > 0;
  }

  pickUp(item: string) {
    this.inventoryService.addMaterial(item, 1);
    this.updateSlots();

    if (this.world[item] > 0) {
      this.world[item]--;
    }

    if (this.world[item] == 0) {
      delete this.world[item];
    }
  }

  mine(item: string) {
    this.inventoryService.addMaterial(item, 1);
    this.updateSlots();
  }

  hasItem(item: string) : boolean {
    var val =  this.inventoryService.hasMaterial(item, 1);

    return val;
  }

  unlockTechnology(techName: string) {
    this.technologyService.unlockTechnology(techName);
    this.updateTechnologies();
  }

  saveGame() {
    const gameState = {
      world: this.world,
      slots: this.inventoryService.getSlots(),
      technologies: this.technologyService.saveTechnologies()
    };

    this.gameStateService.saveState(gameState);
  }

  loadGame() {
    const gameState = this.gameStateService.loadState();

    if(gameState) {
      if (gameState.world) {
        this.world = gameState.world;
      }

      if (gameState.slots) {
        gameState.slots.forEach((slot: InventorySlot, index: number) => {
          if (index < this.slots.length) {
            this.slots[index] = slot;
          }
        });
      }

      if (gameState.technologies) {
        this.technologyService.loadTechnologies(gameState.technologies);
        this.updateTechnologies();
      }
    }
  }

  clearGame() {
    this.gameStateService.clearState();
    window.location.reload();
  }

  isTechnologyUnlocked(techName: string) : boolean {
    return this.technologyService.isTechnologyUnlocked(techName);
  }

  isTechnologyVisible(techName: string) : boolean {
    return this.technologyService.isTechnologyVisible(techName);
  }

  private updateSlots() {
    this.slots = this.inventoryService.getSlots();
    this.availableBuildings = this.buildingService.getAvailableBuildings();
  }

  private updateTechnologies() {
    this.technologies = this.technologyService.getTechnologies();
  }

  private updateBuildings() {
    this.buildings = this.buildingService.getBuildings();
  }

  build(item: string) {
    if (this.buildingService.build(item)) {
      this.updateSlots();
      this.updateBuildings();
    }
  }
}
