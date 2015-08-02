categories_string = <<-eof
fun
eof

categories_string.split("\n").each do |category|
	puts "else if(word.match(/\\b" + category + "\\b/gi)){" + "\n\treturn '" + category.capitalize.gsub(/\W/, '') + "';\n}"
end
