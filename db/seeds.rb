# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv' 
 
csv_text = File.read(Rails.root.join('lib', 'seeds', 'Partnership_DB.csv')) 
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1') 
csv.each do |row| 
  t = Dummy.new 
  t.first_name = row['First Name'] 
  t.last_name = row['Last Name'] 
  t.email = row['Email'] 
  t.current_occupation = row['Position/Organization/School'] 
  t.save 
  puts "#{t.first_name}, #{t.last_name} saved" 
end 
 
puts "There are now #{Dummy.count} rows in the transactions table" 

