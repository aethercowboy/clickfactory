import { Injectable } from '@angular/core';
import { InventoryService } from './inventory.service';

export interface Building {
  name: string;
  cost: {material: string, amount: number}[];
  built: number;
}

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private buildings: Building[] = [
    {
      name: "HUB",
      cost: [{material: "HUB Parts", amount: 1}],
      built: 0
    }
  ];

  constructor(private inventoryService: InventoryService) {}

  getBuildings(): Building[] {
    return this.buildings;
  }

  canBuild(building: Building): boolean {
    return building.cost.every(item => {
      return this.inventoryService.hasMaterial(item.material, item.amount)
    });
  }

  build(buildingName: string): boolean {
    const building = this.buildings.find(b => b.name === buildingName);

    if (building && this.canBuild(building)) {
      building.cost.forEach(item => {
        this.inventoryService.removeMaterial(item.material, item.amount);
      });
      building.built++;

      return true;
    }

    return false;
  }

  getAvailableBuildings() : Building[] {
    return this.buildings.filter(b => this.canBuild(b));
  }
}
