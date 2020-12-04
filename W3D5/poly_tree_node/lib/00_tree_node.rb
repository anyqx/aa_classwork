class PolyTreeNode
    attr_reader :parent,:value, :children
    def initialize(str)
        @parent = nil
        @children = []
        @value = str
    end

    def parent=(parent1)
        if @parent == parent1
            return
        end
        if @parent != nil
            @parent.children.delete(self)
        else
            @parent = parent1
        end

    end

end