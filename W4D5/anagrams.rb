# time complexity = o(n!)
def first_anagram?(str1, str2)
    str1.split("").permutation.to_a.include?(str2.split(''))
end

# n * 2m => nm # similar to n^2 / quadratic
def second_anagram?(str1, str2)
    split1 = str1.split('')
    split2 = str2.split('')
  
    split1.each do |letter| # n
        letter_index = split2.find_index(letter) # m
        return false if !letter_index
        split2.delete_at(letter_index) # m
    end

    split2.empty?
end

# log-linear
# n log n linearithmic
# nlogn + 2m
def third_anagram?(str1, str2)
  sorted1 = str1.chars.sort.join #chars =>n #sort:  n log n #join: n
  sorted2 = str2.chars.sort.join # n + n log n + n
  sorted1 == sorted2
end

# o(n + m) linear
def fourth_anagram?(str1, str2)
    hash1= Hash.new(0)
    hash2 = Hash.new(0)

    str1.each_char {|char| hash1[char] += 1}
    str2.each_char {|char| hash2[char] += 1}

    hash1 == hash2

end

# o(n) linear, space advantage
# o(1) space complexity; fixed number: 26 alphabets
def fifth_anagram?(str1, str2)
    hash = Hash.new(0)

    str1.each_char {|char| hash[char] += 1}
    str2.each_char {|char| hash[char] -= 1}

    hash.values.all? {|v| v == 0 }
end

p fifth_anagram?("gizmo", "sally")    #=> false
p fifth_anagram?("elvis", "lives")    #=> true


