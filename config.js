/*
** Config Publique
*/

config = {
	debug:			1,
	port:			"4242",
	ip:				"192.168.0.15",
	link_db:		"mongodb://mongo/nascasa",
	dbpath:			"/Users/dbourdon/mongodb",
	logpath:		"./log.txt",
	other:			"none",
	search_path:	[
						"/app/public/images",
						"/Users/dbourdon/nascasa/public/images",
						"/Users/dbourdon/nascasa/public/images/test",
						"D:\\Documents\\GitHub\\nascasa\\public\\images"
					]
}
exports.config = config