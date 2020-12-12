# o(n^2)

def bad_two_sum?(arr, target_sum)
    # your code here...
    arr.each_index do |idx1|
        num1 = arr[idx1]
        (idx1+1...arr.length).each do |idx2|
            num2 = arr[idx2]
            if num1 + num2 == target_sum
                return true
            end
        end
    end
    return false
end

#sorting n log n
def okay_two_sum?(arr,target)

end



def two_sum?(arr,target)
    hash = Hash.new()

    arr.each do |ele|
        return true if hash[target - ele]
        hash[ele] = target - ele
    end
    return false
end

def two_sum2?(arr, target)
  hash = Hash.new(0)

  arr.each do |ele|
    hash[ele] = target - ele
  end

  hash.each_value do |v|
    return true if arr.any?(v)
  end

  false
end

arr = [0, 1, 5, 7]

p two_sum?(arr, 6) # => should be true
p two_sum?(arr, 10) # => should be false
