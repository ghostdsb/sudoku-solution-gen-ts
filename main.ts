import {
  sample as _sample,
  times as _times,
  sortedUniqBy as _sortedUniqBy
} from 'lodash';

let total = 81;
let size = 9;
let third = 3;
let validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
*
*/
interface coord {
  i: number;
  j: number;
};

/**
*
*/
class SudokuCell {
  value: Number = 0;
  position: coord;
  neighbors: Array<coord> = [];

  constructor (position: coord) {
    this.position = position;
    this.value = 0;

    // identify cell neighbors
    const iBase = Math.floor(position.i / third) * third;
    const jBase = Math.floor(position.j / third) * third;
    const cellNeighbors = [];
    _times(size, (index: number) => {
      const i = Math.floor(index / third) + iBase;
      const j = (index % third) + jBase;

      if(i !== position.i || j !== position.j) {
        cellNeighbors.push({i, j});
      }
    });


    // identify row neighbors
    const rowNeighbors = _times(size, (i) => {
      return {i: i, j: position.j};
    });
    rowNeighbors.splice(position.i, 1);

    // identify col neighbors
    const colNeighbors = _times(size, (j) => {
      return {i: position.i, j: j};
    });
    colNeighbors.splice(position.j, 1);

    // all neighbors
    this.neighbors = _sortedUniqBy([
      ...rowNeighbors,
      ...colNeighbors,
      ...cellNeighbors
    ], (c) => `${c.i}:${c.j}`);
  }
}


/**
*
*/
class SudokuBoard {
  private cells: SudokuCell[];

  constructor (){
      this.cells = _times(total, (index) => {
      const position = this.resolveIndex(index);
      return new SudokuCell(position);
    });
  }

  print() {
    const line = '--------------------------';
    console.log(line)
    _times(size, (i) => {
      _times(size, (j) => {
        const cell = this.cells[this.resolvePosition({i, j})];

        if ( j % third === 0) {
          process.stdout.write('| ');
        }
        process.stdout.write(`${cell.value} `);
      });
      process.stdout.write('|\n');
      if ( i % third === 2) {
        console.log(line);
      }
    });
  }

  fill () {
    if(!this.doFillCells(this.cells)) {
      console.error('Unable to fill board');
    }
  }

  doFillCells(cells: SudokuCell[]) {
    const cell = cells[0];

    return false;
  }

  resolveIndex(index: number) : coord {
    return {
      i: Math.floor(index / size),
      j: (index % size),
    }
  }

  resolvePosition(position: coord) : number {
    return position.i * size + position.j;
  }

  /**
  *
  */
  at(c: coord): SudokuCell {
    return this.cells[c.i][c.j];
  }

  atIndex(index: number): SudokuCell {
    return this.cells[index];
  }

  set(c: coord, v: number) {
    this.cells[c.i][c.j].value = v;
  }
}

let board = new SudokuBoard();

board.print();
