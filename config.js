/*
** Config
*/

config = {
	debug:			1,
	port:			"4242",
	ip:				"192.168.0.15",
	link_db:		"mongodb://localhost/mydb",
	dbpath:			"/Users/dbourdon/mongodb",
	logpath:		"./log.txt",
	other:			"none",
	search_path:	[
						"/Users/dbourdon/nascasa/public/images",
						"/Users/dbourdon/nascasa/public/images/test"
					]
}
exports.config = config