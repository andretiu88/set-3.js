/**
 * Set 3
 *
 * This assignment will develop your ability to manipulate data.
 * You should be ready for JS tutorials on more advanced topics after this.
 *
 * Please refer to the `module4/sample-data/set3-sample-data.js` file for examples of:
 * - the `socialGraph` parameter for `relationshipStatus`
 * - the `board` parameter for `ticTacToe`
 * - the `routeMap` parameter for `eta`
 */

/**
 * Relationship status
 *
 * Let's pretend that you are building a new app with social media functionality.
 * Users can have relationships with other users.
 *
 * The two guidelines for describing relationships are:
 * 1. Any user can follow any other user.
 * 2. If two users follow each other, they are considered friends.
 *
 * This function describes the relationship that two users have with each other.
 *
 * Please see the sample data for examples of `socialGraph`.
 *
 * @param {string} fromMember The subject member
 * @param {string} toMember The object member
 * @param {object} socialGraph The relationship data
 * @returns {string} "follower" if fromMember follows toMember;
 * "followed by" if fromMember is followed by toMember;
 * "friends" if fromMember and toMember follow each other;
 * "no relationship" otherwise.
 */

function relationshipStatus(fromMember, toMember, socialGraph) {
    if (!socialGraph[fromMember]) {
        return "no relationship";
    }
    
    let fromFollows = false;
    let toFollows = false;
    
    if (socialGraph[fromMember].following.includes(toMember)) {
        fromFollows = true;
    }
    
    if (socialGraph[toMember] && socialGraph[toMember].following.includes(fromMember)) {
        toFollows = true;
    }
    
    if (fromFollows && toFollows) {
        return "friends";
    } else if (fromFollows) {
        return "follower";
    } else if (toFollows) {
        return "followed by";
    } else {
        return "no relationship";
    }
}
/**
 * Tic tac toe
 *
 * Tic Tac Toe is a common paper-and-pencil game.
 * Players must attempt to draw a line of their symbol across a grid.
 * The player that does this first is considered the winner.
 *
 * This function evaluates a Tic Tac Toe game board and returns the winner.
 *
 * Please see the sample data for examples of `board`.
 *
 * @param {Array} board The representation of the Tic Tac Toe board as a square array of arrays. The size of the array will range between 3x3 to 6x6.
 * The board will never have more than 1 winner.
 * There will only ever be 2 unique symbols at the same time.
 * @returns {string} the symbol of the winner, or "NO WINNER" if there is no winner.
 */

function ticTacToe(board) {
    const n = board.length;

    // Check rows for a winner
    for (let i = 0; i < n; i++) {
        let rowWinner = true;
        for (let j = 1; j < n; j++) {
            if (board[i][j] !== board[i][0] || board[i][j] === "") {
                rowWinner = false;
                break;
            }
        }
        if (rowWinner) {
            return board[i][0];
        }
    }

    // Check columns for a winner
    for (let i = 0; i < n; i++) {
        let colWinner = true;
        for (let j = 1; j < n; j++) {
            if (board[j][i] !== board[0][i] || board[j][i] === "") {
                colWinner = false;
                break;
            }
        }
        if (colWinner) {
            return board[0][i];
        }
    }

    // Check diagonals for a winner
    let diagonal1Winner = true;
    let diagonal2Winner = true;
    for (let i = 1; i < n; i++) {
        if (board[i][i] !== board[0][0] || board[i][i] === "") {
            diagonal1Winner = false;
        }
        if (board[i][n - 1 - i] !== board[0][n - 1] || board[i][n - 1 - i] === "") {
            diagonal2Winner = false;
        }
    }
    if (diagonal1Winner) {
        return board[0][0];
    }
    if (diagonal2Winner) {
        return board[0][n - 1];
    }

    // If no winner, return "NO WINNER"
    return "NO WINNER";
}

/**
 * ETA
 *
 * A shuttle van service is tasked to travel one way along a predefined circular route.
 * The route is divided into several legs between stops.
 * The route is fully connected to itself.
 *
 * This function returns how long it will take the shuttle to arrive at a stop after leaving anothe rstop.
 *
 * Please see the sample data for examples of `routeMap`.
 *
 * @param {string} firstStop the stop that the shuttle will leave
 * @param {string} secondStop the stop that the shuttle will arrive at
 * @param {object} routeMap the data describing the routes
 * @returns {Number} the time that it will take the shuttle to travel from firstStop to secondStop
 */
function eta(firstStop, secondStop, routeMap) {
    let travelTime = 0;
    const stops = Object.keys(routeMap).map(route => route.split(',')[0]);
  
    let currentIndex = stops.indexOf(firstStop);
    const targetIndex = stops.indexOf(secondStop);
  
    if (currentIndex === -1 || targetIndex === -1) {
      return "NO ROUTE";
    }
  
    while (currentIndex !== targetIndex) {
      const nextStop = (currentIndex + 1) % stops.length;
      const routeKey = `${stops[currentIndex]},${stops[nextStop]}`;
  
      if (!routeMap[routeKey]) {
        return "NO ROUTE";
      }
  
      travelTime += routeMap[routeKey].travel_time_mins;
      currentIndex = nextStop;
  
      if (currentIndex === stops.indexOf(firstStop)) {
        return "NO ROUTE";
      }
    }
  
    return travelTime;
  }
  