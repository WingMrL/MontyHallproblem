const SHEEP = '羊羊';
const CAR = '汽车';
const doors = [SHEEP, SHEEP, CAR];

const shuffle = (arr) => {
  let m = arr.length;
  while (m > 1){
      let index = Math.floor(Math.random() * m--);
      [arr[m] , arr[index]] = [arr[index] , arr[m]]
  }
  return arr;
}

let notChangeWinCount = 0;
let changeDoorWinCount = 0;

const experiment = (originDoors) => {
  // 乱序
  const [A, B, C] = shuffle([...originDoors]);
  // 你随机选一扇门 firstSelected, 剩下两扇门分别是 leftDoor1 和 leftDoor2
  const [firstSelected, leftDoor1, leftDoor2] = shuffle([A, B, C]);
  // 我从 leftDoor1, leftDoor2 找出是羊羊的，打开
  const shouldOpenLeftDoor1 = leftDoor1 === SHEEP;

  // 不换门
  if (firstSelected === CAR) {
    notChangeWinCount ++;
  }

  // 换门
  if (shouldOpenLeftDoor1) { // 我打开的是 leftDoor1
    // 换门的话，你打开 leftDoor2
    if (leftDoor2 === CAR) {
      changeDoorWinCount ++;
    }
  } else { // 我打开的是 leftDoor2
    // 换门的话，你打开 leftDoor1
    if (leftDoor1 === CAR) {
      changeDoorWinCount ++;
    }
  }
};

const experimentCount = 1000000;

for (let i = 0; i < experimentCount; i++) {
  experiment(doors);
}

const FIX = 2;

console.log(`实验次数：${experimentCount}`);
console.log(`不换赢的次数:换门赢的次数 -> ${notChangeWinCount}:${changeDoorWinCount}`);
console.log(`不换赢的概率：${(notChangeWinCount/experimentCount*100).toFixed(FIX)}%`);
console.log(`换门赢的概率：${(changeDoorWinCount/experimentCount*100).toFixed(FIX)}%`);


