new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: []
        },
    methods: {
        startGame: function(){
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(){
            this.playerAttack(3, 10)
            if(this.checkVictory()){
                return;
            }

            this.monsterAttack();

        },
        specialAttack: function(){
            this.playerAttack(10, 20)
            if(this.checkVictory()){
                return;
            }

            this.monsterAttack();
        },
        heal: function(){
            var startingHealth = this.playerHealth;
            this.playerHealth += 10
            if(this.playerHealth > 100){
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: "You heal yourself for " + (this.playerHealth - startingHealth) + " HP."
            })
            if(this.checkVictory()){
                return;
            }

            this.monsterAttack();
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        playerAttack: function(min, max){
            var damage = this.calculateDamage(min, max);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "You hit the monster for " + damage + " damage."
            })
        },
        monsterAttack: function(){
            var damage = this.calculateDamage(5, 15);
            console.log(damage);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: "The monster hits you for " + damage + " damage."
            })
            this.checkVictory();
        },
        checkVictory: function(){
            if(this.monsterHealth <= 0){
                if(confirm("You won! Start a new game?")){
                    this.startGame();
                }else{
                    this.isGameRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm("You lost :( Start a new game?")){
                    this.startGame();
                }else{
                    this.isGameRunning = false;
                }
                return true;
            } return false;
        },
        giveUp: function(){
            this.isGameRunning = false;
            this.turns = [];
        }
    }
});