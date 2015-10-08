ignore /^node_modules/, /^typings/, /^emterpreter/, /^asyncify/, /^streamlinejs/, /^\.git/

def sh(*args)
  cmd = args.join ' '
  puts cmd
  system cmd
end

guard :shell do
  watch %r[^dist/] do |m|
    puts "#{Time.now}: #{m[0]}"
    sh "cp #{m[0]} example/node_modules/react-vimjs/dist/"
  end

  watch %r[^package\.json$] do |m|
    puts "#{Time.now}: #{m[0]}"
    sh 'cp package.json example/node_modules/react-vimjs/'
  end

  watch %r[^src/.+\.tsx?$] do |m|
    puts "#{Time.now}: #{m[0]}"
    sh './node_modules/.bin/tsc -p src'
  end

  watch %r[^example/(index.jsx|node_modules/react-vimjs/dist/main.js)$] do |m|
    puts "#{Time.now}: #{m[0]}"
    sh 'cd example && ./node_modules/.bin/browserify -t babelify -d -o index.js index.jsx'
  end
end
