import { Injectable } from '@angular/core';
import { Material, Iron, Copper, HubParts } from './game/materials/material';

export interface InventorySlot {
  material: Material | null;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private slots: InventorySlot[] = [];

  private materials: {[key: string]: Material} = {};

  private maxSlots = 1;

  constructor() { 
    for (let i = 0; i < this.maxSlots; i++) {
      this.slots.push({ material: null, quantity: 0 });
    }

    this.materials["HUB Parts"] = new HubParts();
    this.materials["Iron"] = new Iron();
    this.materials["Copper"] = new Copper();
  }

  addMaterial( materialName : string, amount: number) {
    const material = this.materials[materialName];
    for (let slot of this.slots) {
      if (slot.material === material && slot.quantity < material.stackSize) {
        const remainingSpace = material.stackSize - slot.quantity;
        const amountToAdd = Math.min(remainingSpace, amount);
        slot.quantity += amountToAdd;
        amount -= amountToAdd;

        if (amount <= 0) return;
      }
    }

    for (let slot of this.slots) {
      if (slot.material === null && amount > 0) {
        const amountToAdd = Math.min(material.stackSize, amount);
        slot.material = material;
        slot.quantity = amountToAdd;
        amount -= amountToAdd;

        if (amount <= 0) return;
      }
    }

    console.error("Not enough space in inventory");
  }

  getSlots(): InventorySlot[] {
    return this.slots;
  }

  increaseSlots(count: number): void {
    this.maxSlots += count;
    
    for (let i = 0; i < count; i++) {
      this.slots.push({ material: null, quantity: 0 });
    }
  }

  hasMaterial(item: string, amount: number): boolean {
    let total = 0;

    for (let slot of this.slots) {
      if (slot.material?.name === item) {
        total += slot.quantity;

        if (total >= amount) return true;
      }
    }

    return false;
  }

  removeMaterial(item: string, amount: number) {
    for (let slot of this.slots) {
      if (slot.material?.name === item) {
        if (slot.quantity >= amount) {
          slot.quantity -= amount;
          if (slot.quantity == 0) {
            slot.material = null
          }
          return;
        } else {
          amount -= slot.quantity;
          slot.quantity = 0;
          slot.material = null;
        }
      }
    }
  }
}
