var vm = new Vue({
    el: '#maze',
    data: {
        maze: [],
        dimension: "3", /* default set to 3x3 Maze */
        mazeTable: "",
        max_num_obstacles: 2, /* max num of obstacles in the maze */
        num_obstacles: 0
    },
    methods: {
        /*
        This function displays a given maze
        in a table format on the webpage
        using the images provided in img folder
        */
        displayMazeTable: function (maze) {
            var dimension = maze.length;
            var out = "<table class='m-4'>";
            /* TODO: Task A */
            for (let i = 0; i < this.dimension; i++) {
                out += "<tr>"
                for (let k = 0; k < this.dimension; k++) {
                    let s = this.maze[i][k];
                    let add = "";
                    if (s === 1)
                        add = "obstacle.png";
                    else if (s === 'E')
                        add = "end.png";
                    else if (s === 'S')
                        add = "mario.png";
                    else
                        add = "empty.png";
                    out += `<td><img src="${add}" alt="img"></td>`
                }
                out += "</tr>"
            }
            out += "</table>";
            this.mazeTable = out;
        },
        /*
        This function generates a maze
        having the dimension selected by the user
        */
        generateMaze: function () {
            // reset maze array
            this.maze = [];
            let obs_count = this.max_num_obstacles;
            const noCells = this.dimension * this.dimension;

            let pos_of_start = Math.floor(Math.random() * noCells + 1);
            let pos_of_end = -1;

            while (pos_of_end < 0 || pos_of_end === pos_of_start)
                pos_of_end = Math.floor(Math.random() * noCells + 1);
            console.log(`pos_of_start: ${pos_of_start}, pos_of_end: ${pos_of_end}`)
            let idx = 0;
            for (let i = 0; i < this.dimension; i++) {
                let rowToAdd = [];
                for (let k = 0; k < this.dimension; k++) {
                    if (idx === pos_of_start) {
                        rowToAdd.push('S')
                    } else if (idx === pos_of_end) {
                        rowToAdd.push('E')
                    }
                    else if (obs_count > 0 && Math.random() < (this.max_num_obstacles / noCells) ) {
                        rowToAdd.push(1);
                        obs_count -= 1;
                    } else {
                        rowToAdd.push(0);
                    }
                    idx += 1;
                }
                this.maze.push(rowToAdd);
            }

            // this.maze = [
            //     [0, 1, 1],
            //     [0, 0, 0],
            //     [0, 'E', 'S']
            // ]

            /* TODO: Task B */
            // invokes displayMazeTable to display the array as a table
            this.displayMazeTable(this.maze);
        }
    }
})