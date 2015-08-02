# used to generate json for cities for cl model
cities_string = <<-eof
philadelpia
atlanta
hartford
pittsburgh
minneapolis
detroit
cleveland
salt lake city
san antonio
houston
phoenix
las vegas
baltimore
eof

cities_string.split("\n").sort.each do |city|
	puts "#{city.gsub(/\s+/, '_')} : {display : '#{city.split(/ |\_/).map(&:capitalize).join(" ")}', url : '#{city.gsub(/\s+/, '')}'},"
end