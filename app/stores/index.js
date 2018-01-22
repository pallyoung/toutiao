'use strict'
import TouTiaoConstants from './../constants/TouTiaoConstants'
export default [
	{
		name:'tags',
		defaultValue:[0,1,2,3,4,5,6,7,8,9,10,11],
		storage:true
	},
	{
		name:'allTags',
		defaultValue:TouTiaoConstants.tags
	},
	{
		name:'news'
	}
]
/**
 * StoreManager.user.get('mobile')
 * 
 * StoreManager.user.set('mobile','13566667777')
 * 
 * StoreManager.user.assign({'mobile':'13566667777',userName:'hello'})
 * 
 * StoreManager.user.copy() //return {'mobile':'13566667777',userName:'hello'}
 */