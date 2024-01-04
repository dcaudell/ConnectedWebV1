function gridInit(initModel, el) {
    console.log("Grid init called with " + initModel);
    return new Grid(initModel, el);
}
var Grid = /** @class */ (function () {
    function Grid(initModel, el) {
        if (initModel == null)
            throw "Grid(): null initModel.";
        if (el == null)
            throw "Grid(): null el.";
        this.el = el;
        this.redim(initModel);
    }
    Grid.prototype.redim = function (gridModel) {
        this.gridModel = gridModel;
        this.buildGrid();
        var conductive = this.isConductive(this.gridModel);
        this.updateForm(conductive);
    };
    Grid.prototype.buildGrid = function () {
        var _this = this;
        while (this.el.firstChild) {
            this.el.removeChild(this.el.lastChild);
        }
        var _loop_1 = function (row) {
            var rowEl = document.createElement("div");
            rowEl.className = "row";
            this_1.el.appendChild(rowEl);
            var _loop_2 = function (col) {
                var wrapper = document.createElement("div");
                wrapper.className = "column";
                var colEl = document.createElement("div");
                colEl.className = (this_1.gridModel[row][col] == 1) ? 'green-column' : 'red-column';
                colEl.id = 'grid-' + row + '-' + col;
                colEl.onclick = function () { return _this.gridClick(row, col, colEl); };
                colEl.textContent = row + ", " + col + " = " + this_1.gridModel[row][col];
                wrapper.appendChild(colEl);
                rowEl.appendChild(wrapper);
            };
            for (var col = 0; col < this_1.gridModel[row].length; col++) {
                _loop_2(col);
            }
        };
        var this_1 = this;
        for (var row = 0; row < this.gridModel.length; row++) {
            _loop_1(row);
        }
    };
    Grid.prototype.gridClick = function (row, col, el) {
        console.log("Clicked: " + row, col);
        this.gridModel[row][col] = this.gridModel[row][col] == 1 ? 0 : 1;
        console.log("Grid model is " + this.gridModel);
        el.textContent = row + ", " + col + " = " + this.gridModel[row][col];
        el.className = (this.gridModel[row][col] == 1) ? 'green-column' : 'red-column';
        var isConductive = this.isConductive(this.gridModel);
        console.log("The grid " + (isConductive ? "is" : "isn't") + " conductive.");
        this.updateForm(isConductive);
    };
    Grid.prototype.isConductive = function (grid) {
        this.clearIndicators();
        for (var i = 0; i < grid[0].length; i++)
            if (this.traverseWithIndicator(grid, i, 0, null))
                return true;
        return false;
    };
    Grid.prototype.traverseWithIndicator = function (grid, xPosition, yPosition, traversed) {
        var isConductive = this.traverse(grid, xPosition, yPosition, traversed);
        this.indicateConductive(xPosition, yPosition, isConductive);
        return isConductive;
    };
    Grid.prototype.traverse = function (grid, xPosition, yPosition, traversed) {
        if (traversed == null)
            traversed = new Array();
        var traversedStr = xPosition + "," + yPosition;
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
    };
    Grid.prototype.indicateConductive = function (xPosition, yPosition, isConductive) {
        var qs = document.querySelector('#' + this.el.id);
        var el = qs.querySelector('#grid-' + yPosition + '-' + xPosition);
        el.style.border = isConductive ? "thick solid blue" : "none";
    };
    Grid.prototype.clearIndicators = function () {
        for (var row = 0; row < this.gridModel.length; row++)
            for (var col = 0; col < this.gridModel[row].length; col++)
                this.indicateConductive(col, row, false);
    };
    Grid.prototype.updateForm = function (isConductive) {
        var formModel = document.getElementById('xgrid_gridmodel');
        if (formModel != null)
            formModel.value = JSON.stringify(this.gridModel);
        var formIsConnected = document.getElementById('xgrid_is_connected');
        if (formIsConnected != null)
            formIsConnected.value = (isConductive) ? '1' : '0';
        var formNumRows = document.getElementById('xgrid_num_rows');
        if (formNumRows != null)
            formNumRows.value = this.gridModel.length + '';
        var formNumCols = document.getElementById('xgrid_num_cols');
        if (formNumCols != null)
            formNumCols.value = this.gridModel[0].length + '';
    };
    Grid.prototype.addRow = function () {
        var newRow = [];
        for (var i = 0; i < this.gridModel[0].length; i++)
            newRow.push(1);
        this.gridModel.push(newRow);
        this.redim(this.gridModel);
    };
    Grid.prototype.delRow = function () {
        if (this.gridModel.length < 2)
            return;
        this.gridModel.pop();
        this.redim(this.gridModel);
    };
    Grid.prototype.addCol = function () {
        for (var row = 0; row < this.gridModel.length; row++)
            this.gridModel[row].push(1);
        this.redim(this.gridModel);
    };
    Grid.prototype.delCol = function () {
        if (this.gridModel[0].length < 2)
            return;
        for (var row = 0; row < this.gridModel.length; row++)
            this.gridModel[row].pop();
        this.redim(this.gridModel);
    };
    return Grid;
}());
