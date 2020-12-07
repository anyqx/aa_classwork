require_relative 'PolyTreeNode'
class KnightPathFinder
    attr_reader: start
    def self.valid_moves(pos)
        i, j = pos
        @possible_moves = [[i-1,j-2], [i-1,j+2], [i+1,j-2], [i+1,j+2],[i-2,j+1],[i-2,j-1],[i+2,j+1],[i+2,j-1]]
        ## need to consider edge cases where i/j < 2 etc


        # filter out positions that are in @considered_positions
        @considered_positions.each do |ele|
            @possible_moves.delete(ele) if @considered_positions.include?(ele)
        end
        @possible_moves
    end
    
    def initialize(start)
        @start = start#start is a position , eg : [0,0], it is root node
        @considered_positions = [@start]
    end

    def new_move_positions(pos)
        #call self.valid_moves? 
        #if valid, put the positions in the array, add new positions to considered_positons
        new_positions = KnightPathFinder.valid_moves(pos)
        @considered_positions += new_positions
        new_positions
    end
     
    def build_move_tree
        #set up a tree
        root_node = PolyTreeNode.new(@start)
        queue = [root_node]
        until queue.empty?
            current_node = queue.shift

            self.new_move_positions(current_node.value) 
            #new positions, we will need to turn the positions into nodes
            #for each node, add_child (parent/child relation)
            child.children.each do |ele|
                queue << ele
            end
        end
        nil

        until 
    end
end