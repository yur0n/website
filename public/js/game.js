const sword = {
    name: 'sword',
    damage: 21,
}
const dagger = {
    name: 'dagger',
    damage: 23,
}

class Player {
    hp = 100
    strength = 25
    gold = 100
    med = 1
    constructor(name, weapon) {
        this.name = name
        this.weapon = weapon
    }
    fight() {
        let damageTaken = Math.floor(Math.random() * 101)
        let damageDealt = this.weapon.damage
        console.log(`нанесено ${this.weapon.damage} урона`)
        this.hp = this.hp - damageTaken
        if (this.hp < 1) console.log('you are dead')
    }
    heal() {
        if (this.med > 0 && this.hp > 0) {
            this.hp = this.hp + 25
            this.med -= 1
        } else {
            console.log('no meds')
        }
        if (this.hp > 100) this.hp = 100
    }
    changeWeapon(weapon) {
        this.weapon = weapon
        console.log(`выбран ${weapon.name}`)
    }
}

let player = new Player('Yuri', sword)
// player.fight()
// console.log(player.hp)
// player.heal()
// console.log(player.hp)
// player.changeWeapon(dagger)
// player.fight()
// console.log(player.hp)
