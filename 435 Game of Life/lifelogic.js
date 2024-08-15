class LifeLogic {
    constructor(game) {
        this.game = game;
        this.initialize();
        this.setupSpeedControl();
    }

    initialize() {
        this.lifeLogic = [];
        this.height = 100;
        this.width = 200;
        this.tickCount = 0;
        this.ticks = 0;
        this.speed = 50;
        this.setupLifeLogic();
    }

    setupSpeedControl() {
        const speedInput = document.getElementById('speed');
        speedInput.addEventListener('input', () => {
            this.speed = parseInt(speedInput.value);
        });
    }

    setupLifeLogic() {
        for (let col = 0; col < this.width; col++) {
            const column = [];
            for (let row = 0; row < this.height; row++) {
                column.push(Math.random() < 0.5 ? 0 : 1);
            }
            this.lifeLogic.push(column);
        }
    }

    countAliveNeighbors(col, row) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i !== 0 || j !== 0) && this.lifeLogic[col + i] && this.lifeLogic[col + i][row + j]) {
                    count++;
                }
            }
        }
        return count;
    }

    update() {
        if (this.tickCount++ >= this.speed && this.speed !== 120) {
            this.tickCount = 0;
            this.ticks++;
            this.updateTickDisplay();

            const nextLifeLogic = [];
            for (let col = 0; col < this.width; col++) {
                const column = [];
                for (let row = 0; row < this.height; row++) {
                    column.push(0);
                }
                nextLifeLogic.push(column);
            }

            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    const aliveNeighbors = this.countAliveNeighbors(col, row);
                    if (this.lifeLogic[col][row] && (aliveNeighbors === 2 || aliveNeighbors === 3)) {
                        nextLifeLogic[col][row] = 1;
                    }
                    if (!this.lifeLogic[col][row] && aliveNeighbors === 3) {
                        nextLifeLogic[col][row] = 1;
                    }
                }
            }
            this.lifeLogic = nextLifeLogic;
        }
    }

    updateTickDisplay() {
        document.getElementById('ticks').innerHTML = `Ticks: ${this.ticks}`;
    }

    draw(ctx) {
        const size = 8;
        const gap = 1;
        ctx.fillStyle = "red";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                if (this.lifeLogic[col][row]) {
                    ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
                }
            }
        }
    }
      addBlock(col, row) {
            this.automata[col][row] = 1;
            this.automata[col + 1][row] = 1;
            this.automata[col][row + 1] = 1;
            this.automata[col + 1][row + 1] = 1;
        };

        addHive(col, row, vert) {
            if (vert) {
                this.automata[col][row] = 1;
                this.automata[col + 1][row + 1] = 1;
                this.automata[col - 1][row + 1] = 1;
                this.automata[col + 1][row + 2] = 1;
                this.automata[col - 1][row + 2] = 1;
                this.automata[col][row + 3] = 1;
            } else {
                this.automata[col][row] = 1;
                this.automata[col + 1][row + 1] = 1;
                this.automata[col + 1][row - 1] = 1;
                this.automata[col + 2][row + 1] = 1;
                this.automata[col + 2][row - 1] = 1;
                this.automata[col + 3][row] = 1;
            }
        };

        addLoaf(col, row) {
            this.automata[col][row] = 1;
            this.automata[col + 1][row + 1] = 1;
            this.automata[col + 1][row - 1] = 1;
            this.automata[col + 2][row + 2] = 1;
            this.automata[col + 2][row - 1] = 1;
            this.automata[col + 3][row] = 1;
            this.automata[col + 3][row + 1] = 1;
        };

        addBoat(col, row) {
            this.automata[col][row] = 1;
            this.automata[col][row + 1] = 1;
            this.automata[col + 1][row] = 1;
            this.automata[col + 1][row + 2] = 1;
            this.automata[col + 2][row + 1] = 1;
        };


        addTub(col, row) {
            this.automata[col][row] = 1;
            this.automata[col + 1][row + 1] = 1;
            this.automata[col + 1][row - 1] = 1;
            this.automata[col + 2][row] = 1;
        };

        addBlinker(col, row, vert) {
            if (vert) {
                this.automata[col][row] = 1;
                this.automata[col][row + 1] = 1;
                this.automata[col][row + 2] = 1;
            } else {
                this.automata[col][row] = 1;
                this.automata[col + 1][row] = 1;
                this.automata[col + 2][row] = 1;
            }
        };

        addToad(col, row) {
            this.addBlinker(col, row);
            this.addBlinker(col + 1, row + 1);
        };

        addBeacon(col, row) {
            this.addBlock(col, row);
            this.addBlock(col + 2, row + 2);
        };

        addPulsar(col, row) {
            this.addBlinker(col, row, true);
            this.addBlinker(col + 5, row, true);
            this.addBlinker(col + 7, row, true);
            this.addBlinker(col + 12, row, true);
            this.addBlinker(col, row + 6, true);
            this.addBlinker(col + 5, row + 6, true);
            this.addBlinker(col + 7, row + 6, true);
            this.addBlinker(col + 12, row + 6, true);
            this.addBlinker(col + 2, row - 2, false);
            this.addBlinker(col + 2, row + 3, false);
            this.addBlinker(col + 2, row + 5, false);
            this.addBlinker(col + 2, row + 10, false);
            this.addBlinker(col + 8, row - 2, false);
            this.addBlinker(col + 8, row + 3, false);
            this.addBlinker(col + 8, row + 5, false);
            this.addBlinker(col + 8, row + 10, false);
        };

        addPenta(col, row) {
            this.automata[col][row] = 1;
            this.addBlinker(col - 1, row + 1);
            this.addBlinker(col - 2, row + 2);
            this.addBlinker(col, row + 2);
            this.addBlinker(col - 2, row + 9);
            this.addBlinker(col, row + 9);
            this.addBlinker(col - 1, row + 10);
            this.automata[col][row + 11] = 1;
        };

        addGosper(col, row) {
            this.addBlock(col, row);
            this.addBlinker(col + 10, row, true);
            this.automata[col + 11][row - 1] = 1;
            this.automata[col + 11][row + 3] = 1;
            this.automata[col + 12][row - 2] = 1;
            this.automata[col + 12][row + 4] = 1;
            this.automata[col + 13][row - 2] = 1;
            this.automata[col + 13][row + 4] = 1;
            this.automata[col + 14][row + 1] = 1;
            this.automata[col + 15][row - 1] = 1;
            this.automata[col + 15][row + 3] = 1;
            this.addBlinker(col + 16, row, true);
            this.automata[col + 17][row + 1] = 1;
            this.addBlinker(col + 20, row - 2, true);
            this.addBlinker(col + 21, row - 2, true);
            this.automata[col + 22][row - 3] = 1;
            this.automata[col + 22][row + 1] = 1;
            this.automata[col + 24][row - 3] = 1;
            this.automata[col + 24][row + 1] = 1;
            this.automata[col + 24][row - 4] = 1;
            this.automata[col + 24][row + 2] = 1;
            this.addBlock(col + 34, row - 2);
        };

        loadAutomata() {
            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    this.lifeLogic[col][row] = 0;
                }
            }

            this.addBlock(5, 5);
            this.addHive(9, 6, false);
            this.addHive(16, 5, true);
            this.addTub(5, 10);
            this.addLoaf(10, 11);
            this.addBoat(16, 11);

            this.addBlinker(25, 6);
            this.addToad(30, 6);
            this.addBeacon(36, 5);
            this.addPulsar(43, 6);
            this.addPenta(63, 4);

            this.addGosper(5, 40);
        };

    }