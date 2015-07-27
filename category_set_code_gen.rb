categories_string = <<-eof
guitar
piano
eof

categories_string.split("\n").each do |category|
	puts "else if(word.match(/\\b" + category + "\\b/gi)){" + "\n\treturn '" + category.capitalize + "';\n}"
end
