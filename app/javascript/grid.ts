function gridInit(
    initModel:number[][],
    el:HTMLElement
) {
    console.log("Grid init called with " + initModel);
    return new Grid(initModel, el);
}

class Grid {
    private gridModel:number[][];
    private el:HTMLElement;

    constructor(initModel, el) {

        if (initModel == null)
            throw "Grid(): null initModel.";
        if (el == null)
            throw "Grid(): null el."

        this.el = el;
        this.redim(initModel);
    }

    private redim(
        gridModel:number[][]
    ){
        this.gridModel = gridModel;
        this.buildGrid();
        let conductive = this.isConductive(this.gridModel);
        this.updateForm(conductive);
    }

    private buildGrid() {
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }

        for (let row = 0; row < this.gridModel.length; row++) {
            let rowEl = <HTMLDivElement> document.createElement("div");
            rowEl.className = "row";
            this.el.appendChild(rowEl);
            for (let col = 0; col < this.gridModel[row].length; col++) {
                let wrapper = <HTMLDivElement> document.createElement("div");
                wrapper.className = "column";

                let colEl = <HTMLDivElement> document.createElement("div");
                colEl.className = (this.gridModel[row][col] == 1) ? 'green-column' : 'red-column';
                colEl.id = 'grid-' + row + '-' + col;
                colEl.onclick = () => this.gridClick(row, col, colEl);
                colEl.textContent = row + ", " + col + " = " + this.gridModel[row][col];
                wrapper.appendChild(colEl)
                rowEl.appendChild(wrapper);
            }
        }
    }

    public gridClick(row, col, el) {
        console.log("Clicked: " + row, col);
        this.gridModel[row][col] = this.gridModel[row][col] == 1 ? 0 : 1;
        console.log("Grid model is " + this.gridModel);

        el.textContent = row + ", " + col + " = " + this.gridModel[row][col];
        el.className = (this.gridModel[row][col] == 1) ? 'green-column' : 'red-column';
        let isConductive:boolean = this.isConductive(this.gridModel);
        console.log("The grid " + (isConductive ? "is" : "isn't") + " conductive." );
        this.updateForm(isConductive);
    }

    private isConductive (
        grid:number[][]
    ) {
        this.clearIndicators();
        for (let i = 0; i < grid[0].length; i++)
            if (this.traverseWithIndicator(grid, i, 0, null))
                return true;
        return false;
    }

    private traverseWithIndicator(
        grid:number[][],
        xPosition:number,
        yPosition:number,
        traversed:Array<string>
    ) {
        let isConductive:boolean = this.traverse(grid, xPosition, yPosition, traversed);
        this.indicateConductive(xPosition, yPosition, isConductive);
        return isConductive;
    }

    private traverse(
        grid:number[][],
        xPosition:number,
        yPosition:number,
        traversed:Array<string>
    ) {
        if (traversed == null)
            traversed = new Array<string>();

        let traversedStr = xPosition + "," + yPosition;
        if (traversed.indexOf(traversedStr) > -1)
            return false;

        traversed.push(traversedStr);

        if (grid[yPosition][xPosition] != 1)
            return false;

        if (yPosition == grid.length - 1)
            return true;

        if (grid[yPosition + 1][xPosition] == 1)
            if (this.traverseWithIndicator(grid, xPosition, yPosition + 1, traversed))
                return true;

        if ((xPosition > 0) && (grid[yPosition][xPosition - 1] == 1))
            if (this.traverseWithIndicator(grid, xPosition - 1, yPosition, traversed))
                return true;

        if ((xPosition < (grid[yPosition].length - 1)) && (grid[yPosition][xPosition + 1] == 1))
            if (this.traverseWithIndicator(grid, xPosition + 1, yPosition, traversed))
                return true;

        if ((yPosition > 0) && (grid[yPosition - 1][xPosition] == 1))
            if (this.traverseWithIndicator(grid, xPosition, yPosition - 1, traversed))
                return true;

        return false;
    }

    private indicateConductive(
        xPosition: number,
        yPosition: number,
        isConductive: boolean
    ) {
        let qs = document.querySelector('#' + this.el.id);
        let el:HTMLElement = qs.querySelector('#grid-' + yPosition + '-' + xPosition);
        el.style.border = isConductive ? "thick solid blue" : "none";
    }

    private clearIndicators() {
        for (let row = 0; row < this.gridModel.length; row++)
            for (let col = 0; col < this.gridModel[row].length; col++)
                this.indicateConductive(col, row, false);
    }

    private updateForm(isConductive: boolean) {
        let formModel = <HTMLInputElement> document.getElementById('xgrid_gridmodel');
        if (formModel != null)
            formModel.value = JSON.stringify(this.gridModel);

        let formIsConnected = <HTMLInputElement> document.getElementById('xgrid_is_connected');
        if (formIsConnected != null)
            formIsConnected.value = (isConductive) ? '1' : '0';

        let formNumRows = <HTMLInputElement> document.getElementById('xgrid_num_rows');
        if (formNumRows != null)
            formNumRows.value = this.gridModel.length + '';

        let formNumCols = <HTMLInputElement> document.getElementById('xgrid_num_cols');
        if (formNumCols != null)
            formNumCols.value = this.gridModel[0].length + '';
    }

    public addRow() {
        let newRow:number[] = [];
        for (let i = 0; i < this.gridModel[0].length; i++)
            newRow.push(1);
        this.gridModel.push(newRow);
        this.redim(this.gridModel);
    }

    public delRow() {
        if (this.gridModel.length < 2)
            return;
        this.gridModel.pop();
        this.redim(this.gridModel);
    }

    public addCol() {
        for (let row = 0; row < this.gridModel.length; row++)
            this.gridModel[row].push(1);
        this.redim(this.gridModel);
    }

    public delCol() {
        if (this.gridModel[0].length < 2)
            return;
        for (let row = 0; row < this.gridModel.length; row++)
            this.gridModel[row].pop();
        this.redim(this.gridModel);
    }

    public randomize() {
        for (let row = 0; row < this.gridModel.length; row++)
            for (let col = 0; col < this.gridModel.length; col++)
                this.gridModel[row][col] = Math.floor(Math.random() * 2);

        this.redim(this.gridModel);
    }
}
