export function generateNumbrix(N, M) {
    const board = Array.from({ length: N }, () => Array(M).fill(0));
    const total = N * M;
    let recursiveCalls = 0;
    const maxRecursiveCalls = 1000;  // Adjust as needed

    function isSafe(x, y, num) {
        if (x >= 0 && y >= 0 && x < N && y < M && board[x][y] === 0) {
            if (num === 1) return true;
            if (x > 0 && board[x - 1][y] === num - 1) return true;
            if (y > 0 && board[x][y - 1] === num - 1) return true;
            if (x < N - 1 && board[x + 1][y] === num - 1) return true;
            if (y < M - 1 && board[x][y + 1] === num - 1) return true;
        }
        return false;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function solve(x, y, num) {
        recursiveCalls++;
        if (recursiveCalls > maxRecursiveCalls) return false;

        if (num > total) return true;

        const directions = [
            [0, 1],  // right
            [1, 0],  // down
            [0, -1], // left
            [-1, 0]  // up
        ];
        
        shuffleArray(directions);

        for (let [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (isSafe(newX, newY, num)) {
                board[newX][newY] = num;
                if (solve(newX, newY, num + 1)) return true;
                board[newX][newY] = 0;  // backtrack
            }
        }

        return false;
    }

    const startX = Math.floor(Math.random() * N);
    const startY = Math.floor(Math.random() * M);

    board[startX][startY] = 1;
    if (!solve(startX, startY, 2)) {
        return []
    }

    return board;
}

const N = 5, M = 5;
console.log(generateNumbrix(N, M));


export const removeValues = (N,M, board) => {
    const newBoard = JSON.parse(JSON.stringify(board))
    let erasedCells = 0
    const removalProbability = 0.8; // Random value between 0.5 and 0.8
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (Math.random() < removalProbability) {
                newBoard[i][j] = 0;
            } else {
                erasedCells++
            }
        }
    }
    return newBoard
}
