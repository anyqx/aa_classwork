class KnightPathFinder
    def self.valid_moves(pos)
        @considered_positions = [@start,pos]
        @possible_moves = []
        @possible_moves << [row-1][col-2], [row-1][col+2], [row+1][col-2],[row+1][col+2],[row-2][col+1],[row-2][col-1],[row+2][col+1],[row+2][col-1]
    end
    
    def initialize(start)
        @start = start#start is a position , eg : [0,0], it is root node
        
    end

    def [](pos)
        row, col = pos
        pos[row][col]
    end
     
    def build_move_tree

    end
end