#!/usr/bin/env ruby

def exec(cmd)
  puts cmd
  system cmd
end

unless `git status --short`.chomp.empty?
  puts 'working directory does not clean!'
  exit 1
end


puts 'start deploy'
puts


files = %w[
  build/main.js
  node_modules/bootstrap/dist/css/bootstrap.min.css
]

puts "start git add"
puts

files.each do |f|
  cmd =  "git add --force #{f}"
  unless exec(cmd)
    puts "`#{cmd}` failed."
    exit 1
  end
end

unless exec 'git commit -m "deploy by script"'
  puts 'git commit failed.'
  exit 1
end


exec "git push --force origin #{`git symbolic-ref --short HEAD`.chomp}:gh-pages"

exec 'git reset @~'
