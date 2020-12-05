class PolyTreeNode
    attr_reader :parent,:value, :children
    def initialize(str)
        @parent = nil
        @children = []
        @value = str
    end

    # reassign parent for children (children given )
    def parent=(parent1)

        if @parent == parent1
            return
        end
        if @parent != nil

            @parent.children.delete(self)
            
        end
        if parent1 != nil
            parent1.children << self
        end
            @parent = parent1
        
        

    end

    def add_child

    end

end