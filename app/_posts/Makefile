# Usage: make T=yourfile.md
# Creates a file "yourfile.md.html" so you can check all your formatting, links and included images

default:
	echo '<!DOCTYPE HTML><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body>' `markdown $(T) | sed 's/\/assets/..\/assets/g'` '</body></html>'> $(T).html

