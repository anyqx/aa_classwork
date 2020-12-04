class PolyTreeNode
    attr_reader :parent,:value, :children
    def initialize(str)
        @parent = nil
        @children = []
        @value = str
    end

    def parent=(other_node)
        self.parent = other_node.parent
        @children = @children << other_node.children

    end

end