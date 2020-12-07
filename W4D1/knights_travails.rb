require_relative '../W3D5/poly_tree_node/lib/00_tree_node.rb'

class KnightPathFinder
    attr_reader :start , :considered_positions

    MOVES = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]

    def self.valid_moves(pos)
        i, j = pos
        valid = []
        MOVES.each do |move|
            im,jm = move
            if  (i + im).between?(0,7) && (j + jm).between?(0,7)
                valid << [i + im, j + jm]
            end
        end
        valid
        # @possible_moves = [[i-1,j-2], [i-1,j+2], [i+1,j-2], [i+1,j+2],[i-2,j+1],[i-2,j-1],[i+2,j+1],[i+2,j-1]]
        ## need to consider edge cases where i/j < 2 etc


        # filter out positions that are in @considered_positions
        # @considered_positions.each do |ele|
        #     @possible_moves.delete(ele) if @considered_positions.include?(ele)
        # end
        # @possible_moves
    end
    
    def initialize(start)
        @start = start#start is a position , eg : [0,0], it is root node
        @considered_positions = [@start]
    end

    def new_move_positions(pos)
        #call self.valid_moves? 
        #if valid, put the positions in the array, add new positions to considered_positons
        new_positions = KnightPathFinder.valid_moves(pos)
        new_arr = new_positions.select {|pos| !considered_positions.include?(pos)}

        @considered_positions += new_arr
        new_arr
    end
     
    def build_move_tree
        #set up a tree
        root_node = PolyTreeNode.new(@start)
        queue = [root_node]
        until queue.empty?
            current_node = queue.shift

            pos = self.new_move_positions(current_node.value) 
            #new positions, we will need to turn the positions into nodes
            #for each node, add_child (parent/child relation)
            pos.each do |next_pos|
               next_node = PolyTreeNode.new(next_pos)
               current_node.add_child(next_node)
               queue << next_node
            end
            
        end
        nil
    end
end

knight1 = KnightPathFinder.new([0,0])
knight1.build_move_tree
p knight1.considered_positions.length