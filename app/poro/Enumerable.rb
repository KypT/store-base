module Enumerable
  def each_cycle(window, start=0)
    (start...length + start).each do |i|
      yield((i..i + window).map {|n| self[n % length]})
    end
  end
end