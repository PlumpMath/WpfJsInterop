# Require any additional compass plugins here.

require "susy"

base_path = File.dirname(__FILE__) + "/"
public_path = "www/"
output_path = base_path + public_path

# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "sass"

css_dir = "application"
css_path = output_path + "application"

images_dir = public_path + "images"
images_path = output_path + "images"

javascripts_dir = output_path + "javascripts"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass
