'use strict'
import TouTiaoConstants from './../constants/TouTiaoConstants'
export default [
	{
		name:'tags',
		type:'storage',
		defaultValue:[0,1,2,3,4,5,6,7,8,9,10,11],
	},
	{
		name:'allTags',
		defaultValue:TouTiaoConstants.tags
	},
	{
		name:'news'
	}
]